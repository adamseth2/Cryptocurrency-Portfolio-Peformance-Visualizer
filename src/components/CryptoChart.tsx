import React, { FC, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Chart, registerables } from 'chart.js';
import { useState, useEffect, useReducer } from 'react';
import { Stack, Typography, Switch } from '@mui/material';
import { coinGeckoHistoricalData } from '../types';

// const initialChartState: { [key: string]: chartCoin } = {
//   bitcoin: { initialInvestment: 100 },
// };
// interface chartState {}
// type ACTION =
//   | { type: 'ADD_NEW_COIN' }
//   | { type: 'UPDATE_COIN_INPUT' }
//   | { type: 'DELETE_COIN' };

// const chartReducer = (chartState: typeof initialChartState, action: ACTION) => {
//   switch (action.type) {
//     case 'ADD_NEW_COIN': {
//       break;
//     }
//     case 'UPDATE_COIN_INPUT': {
//       break;
//     }
//     case 'DELETE_COIN': {
//       break;
//     }
//   }
// };

interface series {
  name: string;
  data: Array<Array<number>>;
}

const getUNIXFromYear = (year: number) => {
  return Math.floor(new Date(`${year}.01.01`).getTime());
};

const CryptoChart: FC<any> = ({ APIData, coinList }) => {
  const [isCumulativeGraph, setIsCumulativeGraph] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState<any>([[], []]);
  const [seriesOptionsNumber, setSeriesOptionsNumber] = useState<number>(1);
  const [isShowBalance, setIsShowBalance] = useState<boolean>(true);
  const [chartOption, setChartOption] = useState<any>();
  const chartComponent = useRef<any>();
  useEffect(() => {
    console.log('ADAMMMMMMMMMMMMM!!!');
    console.log(APIData);
    if (!APIData) return;
    let tempSeriesOptions: any = [[], []];
    console.log(APIData);
    Object.keys(APIData).forEach((id, i) => {
      if (!APIData[id]) return;

      console.log('priceArray');
      let priceArray: [number[]] = APIData[id].prices;
      console.log(priceArray);
      let diff = getUNIXFromYear(coinList[id].year) - priceArray[0][0];
      console.log(diff);
      let closestIndex = Math.floor(diff / 86400000) - 1;
      let historicalBalanceTemp: any /*[number[]]*/ = [];
      let priceBought = priceArray[closestIndex][1];
      let initialInvest = coinList[id].initialInvestment;
      for (let i = closestIndex; i < priceArray.length; i++) {
        let [currTime, currPrice] = priceArray[i];
        let currValue =
          ((currPrice - priceBought) / priceBought) * initialInvest +
          initialInvest;
        historicalBalanceTemp.push([currTime, currValue]);
      }
      console.log(`CLOSEST: ${closestIndex}`);
      // APIData[id].prices.forEach((priceArray :number[]) => {

      // })
      console.log('PRICES');
      console.log(APIData[id].prices);
      console.log(historicalBalanceTemp);
      tempSeriesOptions[0][i] = {
        name: id,
        data: APIData[id].prices,
      };
      tempSeriesOptions[1][i] = {
        name: id,
        data: historicalBalanceTemp,
      };
    });

    setSeriesOptions(tempSeriesOptions);
    console.log(tempSeriesOptions);
  }, [APIData]);
  useEffect(() => {
    console.log('no render??');

    const chart = chartComponent.current?.chart;
    if (chart) chart.reflow(false);
    // console.log(isShowBalance);
    // if (isShowBalance) {
    //   setSeriesOptionsNumber(1);
    // } else {
    //   setSeriesOptionsNumber(0);
    // }
  }, [isShowBalance]);

  // const [chartState, chartDispatch] = useReducer(chartReducer, initialChartState)
  useEffect(() => {
    const options = {
      title: {
        text: 'Custom Crypto Portfolio',
      },
      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b><br/>',
        // valueDecimals: 2,
        // split: true,
      },
      series: isShowBalance ? seriesOptions[1] : seriesOptions[0],
    };
    setChartOption(options);
  }, [seriesOptions, isShowBalance]);

  // ...seriesOptions,
  //
  // series: [{
  //   data: [1, 2, 5, 10, 20, 50, 100, -100, 100, -100]
  // }, {
  //   data: [100, -50, -15, 15, -50, -20, -30, 100, -100, 100]
  // }]
  // {
  //   name: 'AAPL',
  //   data: [1, 2, 3, 5, 6],
  // },
  // {
  //   name: 'BL',
  //   data: [5, 8, 9, 1, 9],
  // },
  return (
    <>
      <Stack direction='row' spacing={1} alignItems='center'>
        <Typography>Show Prices</Typography>
        <Switch
          defaultChecked
          size={'medium'}
          onChange={(e, val) => {
            setIsShowBalance(val);
            console.log('hellooo');
          }}
        />
        <Typography>Show Balance</Typography>
      </Stack>
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={chartOption}
        oneToOne={[true]}
      />
    </>
  );
};
export default CryptoChart;
