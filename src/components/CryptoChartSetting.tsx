import React, { useState, useEffect } from 'react';
import { chartCoin } from '../types';
import CryptoChartSettingInput from './CryptoChartSettingInput';
const CryptoChartSetting: React.FC<any> = ({ coinList, setCoinList }) => {
  const [newCoinName, setNewCoinName] = useState('');
  const [newCoinInitialInvestment, setNewCoinInitialInvestment] =
    useState<number>(100);
  const addNewCoinHandler = () => {
    const newItem: chartCoin = {
      initialInvestment: newCoinInitialInvestment,
    };
    setCoinList({ ...coinList, [newCoinName]: newItem });
  };
  const newCoinNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoinName(e.target.value);
  };
  const newCoinInitialInvestmentHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCoinInitialInvestment(parseInt(e.target.value));
  };
  useEffect(() => {
    console.log('ADAMMMMMM');
    console.log(coinList);
    console.log(Object.keys(coinList));
  }, [coinList]);

  return (
    <div>
      <label htmlFor='coin-name'>Coin name</label>
      <input
        id='coin-name'
        type='text'
        onChange={newCoinNameHandler}
        defaultValue=''
      />
      <label htmlFor='initial-investment'>Initial Investment</label>
      <input
        id='initial-investment'
        type='number'
        onChange={newCoinInitialInvestmentHandler}
        defaultValue='100'
      />
      <input
        type='submit'
        onClick={e => addNewCoinHandler()}
        value='Add item'
      />

      {Object.keys(coinList).map(coinName => (
        <CryptoChartSettingInput {...{ coinName, coinList, setCoinList }} />
      ))}
    </div>
  );
};
export default CryptoChartSetting;
