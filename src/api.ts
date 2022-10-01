export async function getCoins() {
  let data = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
  return data;
}

export async function getCoin(coinId: string) {
  const data = await (
    await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  ).json();
  return data;
}

export async function getPrice(coinId: string) {
  const data = await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();
  return data;
}

export async function getPages(curIdx: number) {
  let data = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
  let prev = data[curIdx - 1]?.id;
  let next = data[curIdx + 1]?.id;
  return [prev, next];
}

export async function getTimePrice(coinId: string) {
  let data = await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  ).json();
  return data;
}
