import React, { useState } from "react";
import styled from "styled-components";

const CounterBox = styled.div`
  color: black;
`;

function Counter() {
  const [num, setNum] = useState(0);
  const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.value == "true"
      ? setNum((prev) => prev + 1)
      : setNum((prev) => prev - 1);
  };
  return (
    <CounterBox>
      <span>{num}</span>
      <br />
      <button value="true" onClick={onClick}>
        +
      </button>
      <button value="false" onClick={onClick}>
        -
      </button>
    </CounterBox>
  );
}

export default Counter;
