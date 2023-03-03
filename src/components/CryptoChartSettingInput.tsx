import React, { useState } from 'react';
import { chartCoin } from '../types';
const CryptoChartSettingInput: React.FC<any> = ({
  coinName,
  coinList,
  setCoinList,
}) => {
  console.log('ADAMMMMMMM');
  console.log(coinList);
  const newCoinInitialInvestmentHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoinList({ ...coinList, [coinName]: e.target.value });
  };
  return (
    <div>
      <p>{coinName}</p>
      <label htmlFor='initial-investment'>Initial Investment</label>
      <input
        id='initial-investment'
        type='number'
        onBlur={newCoinInitialInvestmentHandler}
        defaultValue={coinList[coinName].initialInvestment}
      />
    </div>
  );
};
export default CryptoChartSettingInput;
