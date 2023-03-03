import React, { FC } from 'react';
import { Coin } from '../../types';
import CryptoRow from './CryptoRow';
import { useState } from 'react';
import { useEffect } from 'react';
const CryptoTable: FC = () => {
  const [coinsInfo, setCoinsData] = useState<Array<Coin>>([]);
  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h'
    )
      .then(res => res.json())
      .then((coinGeckoAPICoinData: Array<Coin>) =>
        setCoinsData(coinGeckoAPICoinData)
      );
  }, []);
  useEffect(() => {
    console.log(coinsInfo);
  }, [coinsInfo]);

  return (
    <table>
      <tr>
        <th> </th>
        <th>Coin</th>
        <th>Symbol</th>
        <th>Current Price</th>
        <th>Price Change 1 day</th>
        <th>Market Cap</th>
      </tr>
      {coinsInfo && coinsInfo.map(coin => <CryptoRow coin={coin} />)}
    </table>
  );
};

export default CryptoTable;
