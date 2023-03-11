import React, { FC } from 'react';
import { Coin } from '../../types';
import CryptoRow from './CryptoRow';
import { useState } from 'react';
import { useEffect } from 'react';
import center from '../../center.module.css';
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
} from '@mui/material';

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer sx={{ width: '70%' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>

              <TableCell></TableCell>
              <TableCell align='right'>Coin</TableCell>
              <TableCell align='right'>Symbol</TableCell>
              <TableCell align='right'>Current Price</TableCell>
              <TableCell align='right'>Price Change 1 day</TableCell>
              <TableCell align='right'>Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinsInfo &&
              coinsInfo.map(coin => (
                <TableRow
                  key={coin.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <img src={coin.image} width='100px' />
                  </TableCell>
                  <TableCell />
                  {/* <TableCell>{coin.name}</TableCell> */}
                  <TableCell align='right'>{coin.name}</TableCell>
                  <TableCell align='right'>
                    {coin.symbol.toUpperCase()}
                  </TableCell>
                  <TableCell align='right'>{coin.current_price}</TableCell>
                  <TableCell align='right'>{coin.price_change_24h}</TableCell>
                  <TableCell align='right'>{coin.market_cap}</TableCell>
                </TableRow>
                //     <th>
                //     <img src={coin.image} alt='' />
                //   </th>
                //   <th>{coin.name}</th>
                //   <th>{coin.symbol.toUpperCase()}</th>
                //   <th>${coin.current_price}</th>
                //   <th>{coin.price_change_24h}</th>
                //   <th>{coin.market_cap}</th>
                // </tr>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <table>
        <tr>
          <th> </th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Current Price</th>
          <th>Price Change 1 day</th>
          <th>Market Cap</th>
        </tr>
        {coinsInfo && coinsInfo.map(coin => <CryptoRow coin={coin} />)}
      </table> */}
    </div>
  );
};

export default CryptoTable;
