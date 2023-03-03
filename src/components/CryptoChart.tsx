import React, { FC } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Chart, registerables } from 'chart.js';
import { useState, useEffect, useReducer } from 'react';

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

const CryptoChart: FC<any> = ({ APIData }) => {
  const [seriesOptions, setSeriesOptions] = useState<Object[]>([]);
  useEffect(() => {
    if (!APIData) return;
    let tempSeriesOptions: Object[] = [];
    console.log(APIData);
    Object.keys(APIData).forEach((id, i) => {
      if (!APIData[id]) return;
      console.log('PRICES');
      console.log(APIData[id].prices);
      tempSeriesOptions[i] = {
        name: id,
        data: APIData[id].prices,
      };
    });
    setSeriesOptions(tempSeriesOptions);
    console.log(tempSeriesOptions);
  }, [APIData]);

  // const [chartState, chartDispatch] = useReducer(chartReducer, initialChartState)
  const options = {
    title: {
      text: 'My stock chart',
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>${point.y}</b><br/>',
      // valueDecimals: 2,
      // split: true,
    },
    series: seriesOptions,
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
  };
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
      {/* {data && <Line data={data} />} */}
    </>
  );
};
export default CryptoChart;
