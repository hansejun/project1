import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCoin, getPrice } from "../api";
import Loading from "../components/Loading";
import Chart from "./Chart";
import Price from "./Price";

const Wrapper = styled.div<{ height?: number }>`
  width: 390px;
  height: ${(props) => props.height || "600"}px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  padding: 4rem 2rem 3rem 2rem;
  overflow: hidden;
  position: relative;
  box-shadow: 20px 70px 40px 20px rgba(0, 0, 0, 0.2);
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #1e1c29;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #252635;
    border-radius: 15px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #1e1f2c;
  }
`;
const ICons = styled.div`
  width: 100%;
  margin: 0 0 2.3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    &:nth-child(2) {
      margin: 0 1rem;
    }
  }
`;
const Icon = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  background-color: #333366;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    svg {
      opacity: 1;
    }
  }
  svg {
    color: white;
    width: 1.6rem;
    opacity: 0.6;
    transition: opacity 0.3s ease-in;
  }
`;
const Title = styled.h1`
  font-size: 2.7em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 2px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CoinInfo = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #333366;
`;
const PriceInfo = styled(CoinInfo)`
  background: ${(props) => props.theme.btnColor};
`;
const CoinInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:nth-child(2) {
    //border-left: 1px solid rgba(255, 255, 255, 0.2);
    //border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-left: 1px solid #1e1c29;
    border-right: 1px solid #1e1c29;
  }
  span {
    &:first-child {
      color: rgba(255, 255, 255, 0.7);
      font-size: 13px;
      margin-bottom: 8px;
    }
    &:last-child {
      color: white;
      font-size: 16px;
      transition: color 0.5s ease-in;
      cursor: pointer;
    }
  }
`;
const CoinGraph = styled.div`
  width: 100%;
  height: 40vh;
  background-color: #333366;
  border-radius: 15px;
  margin: 5rem 0 3rem 0;
  cursor: pointer;
  position: relative;
`;
const CoinGraphBtns = styled.div`
  position: absolute;

  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  background-color: #15141d;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 25px;
`;
const CoinGraphBtn = styled.span<{ isActive?: boolean }>`
  position: relative;
  //
  border-radius: 25px;
  &:last-child {
    position: absolute;
    background: linear-gradient(
      30deg,
      rgba(66, 53, 190, 1) 0%,
      rgba(119, 107, 245, 1) 100%
    );
    left: ${(props) => (props.isActive ? "0" : "50%")};
    transition: left 0.3s ease-in;
    width: 50%;
    height: 100%;
  }
  span {
    display: block;
    text-align: center;
    padding: 1em;
  }
`;
const CoinGraphContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface ICoin {
  name: string;
  rank: number;
  symbol: string;
}
interface ICoinPrice {
  quotes: {
    USD: {
      ath_price: number;
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const { state: location } = useLocation();
  const { data: coin, isLoading: coinLoading } = useQuery<ICoin>("coin", () =>
    getCoin(coinId as any)
  );
  const { data: price, isLoading: priceLoading } = useQuery<ICoinPrice>(
    "price",
    () => getPrice(coinId as any)
  );
  const [btn, setBtn] = useState(true);

  return (
    <Wrapper height={window.innerHeight}>
      <ICons>
        <Link to="">
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="white"
                d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"
              />
            </svg>
          </Icon>
        </Link>
        <Link to={"/"}>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="white"
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              />
            </svg>
          </Icon>
        </Link>
        <Link to="">
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="white"
                d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"
              />
            </svg>
          </Icon>
        </Link>
      </ICons>
      <Title>{location || coinId}</Title>
      {coinLoading && priceLoading ? (
        <Loading />
      ) : (
        <Container>
          <CoinInfo>
            <CoinInfoItem>
              <span>Rank</span>
              <span>{coin?.rank || "0"}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>PRICE</span>
              <span>{price?.quotes.USD.price.toFixed(2)}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>ATH</span>
              <span>{price?.quotes.USD.ath_price.toFixed(2)}</span>
            </CoinInfoItem>
          </CoinInfo>
          <CoinGraph>
            <CoinGraphBtns>
              <CoinGraphBtn onClick={() => setBtn((prev) => !prev)}>
                <span>Price</span>
              </CoinGraphBtn>
              <CoinGraphBtn onClick={() => setBtn((prev) => !prev)}>
                <span>Chart</span>
              </CoinGraphBtn>
              <CoinGraphBtn isActive={btn}>
                <span>{btn ? "Price" : "Chart"}</span>
              </CoinGraphBtn>
            </CoinGraphBtns>
            <CoinGraphContainer>
              {btn ? <Price /> : <Chart />}
            </CoinGraphContainer>
          </CoinGraph>
          <PriceInfo>
            <CoinInfoItem>
              <span>Hour</span>
              <span>{price?.quotes.USD.percent_change_1h}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>Day</span>
              <span>{price?.quotes.USD.percent_change_24h}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>Week</span>
              <span>{price?.quotes.USD.percent_change_30d}</span>
            </CoinInfoItem>
          </PriceInfo>
        </Container>
      )}
    </Wrapper>
  );
}

export default Coin;
