import React, { FC } from 'react';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';

interface coinGeckoHistoricalData {
  market_caps: Array<Array<Array<number>>>;
  prices: Array<Array<number>>;
  total_volumes: Array<Array<number>>;
}

export const useHistoricalData = (
  coinList: string[],
  startTime = 1577901300,
  //  1641024000 1/1/2022
  endTime = Date.now()
) => {
  const [xData, setXData] = useState<any[]>([]);
  const [yData, setYData] = useState<number[]>([]);
  const [APIData, setAPIData] = useState<{
    [id: string]: coinGeckoHistoricalData;
  }>();
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    if (coinList.length == 0) {
      return;
    }
    coinList.forEach(id => {
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
  return { xData, yData, APIData, error };
};
