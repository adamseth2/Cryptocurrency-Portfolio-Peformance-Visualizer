import React, { FC } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { useState, useEffect, useReducer, useMemo } from 'react';
import CryptoChart from '../../components/CryptoChart';
import CryptoChartSetting from '../../components/CryptoChartSetting';

import { chartCoin, coinGeckoHistoricalData } from '../../types';

const CreatePortfolio: FC = () => {
  const [coinList, setCoinList] = useState<{ [key: string]: chartCoin }>({});
  const [APIData, setAPIData] = useState<{
    [id: string]: coinGeckoHistoricalData;
  }>();

  const [error, setError] = useState<any>(null);
  useEffect(() => {
    //  ~1577865600   1/1/2020 0:00:00
    const startTime = 1577779200;
    // coinList: string[],
    const endTime = Math.floor(Date.now() / 1000);
    let coinListKeys = Object.keys(coinList);
    if (coinListKeys.length === 0) {
      console.log('AHHHHHHHHHHHHHHHHHHHHHHHH');
      return;
    }
    coinListKeys.forEach(id => {
      console.log('ID is: ' + id);
      if (APIData) {
        if (APIData[id]) {
          return;
        }
      }
      console.log('CalledAPI');
      console.log(coinList[id].year);
      let boughtPrice: any;
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/history?date=1-1-${coinList[id].year}&localization=false`
      )
        .then(res => res.json())
        .then(data => {
          if (!data.market_data) {
            alert(`${data.name} was not buyable on January 1, ${coinList[id].year} \n
            Please choose a different year`);
            let tempCoinList = coinList;
            delete tempCoinList[id];
            setCoinList({ ...tempCoinList });
            return;
          }
          boughtPrice = data.market_data.current_price.usd;
          console.log(data);
          console.log(boughtPrice);
        });
      console.log('IT REACHED HERE');
      if (!coinList[id]) {
        return;
      }
      console.log('IT REACHED???');

      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max&interval=daily`
      )
        .then(res => res.json())
        .then((data: coinGeckoHistoricalData) => {
          let tempAPIData = {
            ...APIData,
            [id]: { ...data, yearPrice: [boughtPrice, coinList[id].year] },
          };
          console.log(`tempAPIDAta:  ${tempAPIData}`);
          setAPIData(tempAPIData);
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
      <CryptoChart {...{ APIData, coinList }} />
      <CryptoChartSetting {...{ coinList, setCoinList }} />
    </>
  );
};
export default CreatePortfolio;
