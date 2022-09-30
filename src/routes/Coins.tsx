import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getCoins } from "../api";
import Loading from "../components/Loading";

export const Wrapper = styled.div<{ height?: number }>`
  width: 390px;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  padding: 4rem 2rem 2rem 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    display: none;
  }
`;

export const Title = styled.h1`
  font-size: 2.7em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 2px;
`;

export const BoxContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Box = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 1.2rem;
  border-radius: 15px;
  transition: box-shadow 0.4s ease-in;
  //transition: background-color 0.5s ease-in;

  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  a {
    font-size: 1.2em;
    display: flex;
    align-items: center;
    padding: 1.3rem;
    transition: color 0.5s ease-in;
    letter-spacing: 1px;
    img {
      width: 30px;
      margin-right: 20px;
    }
  }
  &:hover {
    // background-color: #3c2c9d;
    box-shadow: inset 0 0px 120px 0px #3c2c9d;
  }
`;
const opactiyAni = keyframes`
  0%{
  opacity: 0.3;
  }50%{
    opacity: 1;
  }100%{
    opacity: 0.3;
  }`;
const Icon = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  background-color: #333366;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 1.2rem;
  &:hover {
    svg {
      opacity: 1;
    }
  }
  svg {
    color: white;
    width: 1.5rem;
    opacity: 0.6;
    animation: ${opactiyAni} 1.5s linear infinite;
    transition: opacity 0.3s linear;
    transform: rotateZ(90deg);
  }
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data: coins } = useQuery<ICoins[]>("coins", getCoins);
  const [end, setEnd] = useState(7);
  const addEnd = () => setEnd((prev) => prev + 7);
  return (
    <>
      <Wrapper height={window.innerHeight}>
        <Title>COIN</Title>
        {isLoading ? (
          <Loading />
        ) : (
          <BoxContainer>
            {coins?.slice(0, end)?.map((coin, i) => (
              <Box key={i}>
                <Link to={`/${coin.id}`} state={coin.name}>
                  <img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.id}
                  />
                  <span>{coin?.name}</span>
                </Link>
              </Box>
            ))}
            <Icon onClick={addEnd}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="white"
                  d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"
                />
              </svg>
            </Icon>
          </BoxContainer>
        )}
      </Wrapper>
    </>
  );
}
export default Coins;
