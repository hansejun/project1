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
function Chart({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<ITimePrice[]>(
    "timePrice",
    () => getTimePrice(coinId),
    {
      retry: 2,
    }
  );

  return (
    <ChartBox>
      {isLoading ? (
        <SmallLoading />
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data:
                (data && data?.map((item) => +(+item.close).toFixed(3))) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 280,
              width: 330,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
              colors: ["#7b6cff"],
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories:
                (data &&
                  data?.map((item) =>
                    new Date(item.time_close * 1000).toISOString()
                  )) ??
                [],
            },
            colors: ["#7b6cff"],
          }}
        />
      )}
    </ChartBox>
  );
}
export default Chart;
