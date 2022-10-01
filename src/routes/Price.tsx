import { useQuery } from "react-query";
import { getTimePrice } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import SmallLoading from "../components/SmLoading";
export interface ICoinId {
  coinId: string;
}

const ChartBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

interface ITimePrice {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
function Price({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<ITimePrice[]>(
    "timePrice",
    () => getTimePrice(coinId),
    {
      retry: 2,
    }
  );

  //y:[+item.close]
  return (
    <ChartBox>
      {isLoading ? (
        <SmallLoading />
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                (data &&
                  data?.map((item) => {
                    return {
                      x: new Date(item.time_close * 1000),
                      y: [+item.open, +item.high, +item.low, +item.close],
                    };
                  })) ||
                [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 280,
              width: 330,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#7b6cff",
                  downward: "#1E1C29",
                },
              },
            },
          }}
        />
      )}
    </ChartBox>
  );
}
export default Price;
