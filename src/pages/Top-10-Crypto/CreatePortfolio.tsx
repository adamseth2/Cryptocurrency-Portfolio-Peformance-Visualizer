import React, { FC } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { useState, useEffect, useReducer, useMemo } from 'react';
import CryptoChart from '../../components/CryptoChart';
import CryptoChartSetting from '../../components/CryptoChartSetting';

import { chartCoin } from '../../types';
interface coinGeckoHistoricalData {
  market_caps: Array<Array<Array<number>>>;
  prices: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
}

const CreatePortfolio: FC = () => {
  const [coinList, setCoinList] = useState<{ [key: string]: chartCoin }>({});
  const [APIData, setAPIData] = useState<{
    [id: string]: coinGeckoHistoricalData;
  }>();

  const [error, setError] = useState<any>(null);
  useEffect(() => {
    //  1641024000 1/1/2022
    const startTime = 1577865600;
    // coinList: string[],
    const endTime = 1677801661;
    let coinListKeys = Object.keys(coinList);
    if (coinListKeys.length == 0) {
      console.log('AHHHHHHHHHHHHHHHHHHHHHHHH');
      return;
    }
    coinListKeys.forEach(id => {
      console.log('ID is: ' + id);
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`
      )
        .then(res => res.json())
        .then((data: coinGeckoHistoricalData) => {
          setAPIData({ ...APIData, [id]: data });
          //   const xDataTemp: any[] = [];
          //   const yDataTemp: number[] = [];
          //   data.prices.forEach((curr: number[]) => {
          //     console.log(curr[0]);
          //     //Change to javascript milisecond
          //     xDataTemp.push(new Date(curr[0] * 1000));
          //     yDataTemp.push(curr[1]);
          //   });
          //   setXData(xDataTemp);
          //   setYData(yDataTemp);
        });
    });
  }, [coinList]);

  return (
    <>
      <CryptoChart APIData={APIData} />
      <CryptoChartSetting {...{ coinList, setCoinList }} />
    </>
  );
};
export default CreatePortfolio;
