import React, { FC } from 'react';
import { Coin } from '../../types';

interface Props {
  coin: Coin;
}

const CryptoRow: FC<Props> = ({ coin }) => {
  return (
    <tr>
      <th>
        <img src={coin.image} alt='' />
      </th>
      <th>{coin.name}</th>
      <th>{coin.symbol.toUpperCase()}</th>
      <th>${coin.current_price}</th>
      <th>{coin.price_change_24h}</th>
      <th>{coin.market_cap}</th>
    </tr>
  );
};
export default CryptoRow;
