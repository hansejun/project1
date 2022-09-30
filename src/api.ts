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
