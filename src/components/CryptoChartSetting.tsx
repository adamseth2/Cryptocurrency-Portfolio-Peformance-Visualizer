import React, { useState, useEffect } from 'react';
import { chartCoin } from '../types';
import {
  Autocomplete,
  TextField,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  FilledInput,
  ButtonGroup,
  Button,
} from '@mui/material';
import coinListData from '../json/coinListAPI.json';
import CryptoChartSettingInput from './CryptoChartSettingInput';
const coinYearOptions = ['2020', '2021', '2022', '2023'];
type coinListAPI = [{ id: string; symbol: string; name: string }];
type coinIdOptions = string[];
const CryptoChartSetting: React.FC<any> = ({ coinList, setCoinList }) => {
  const [newCoinName, setNewCoinName] = useState('');
  const [newCoinYear, setNewCoinYear] = useState<number>(2023);
  const [coinOption, setCoinOption] = useState<coinIdOptions>([
    'bitcoin',
    'ethereum',
  ]);
  const [newCoinInitialInvestment, setNewCoinInitialInvestment] =
    useState<number>(100);
  const addNewCoinHandler = () => {
    const newItem: chartCoin = {
      year: newCoinYear,
      initialInvestment: newCoinInitialInvestment,
    };
    setCoinList({ ...coinList, [newCoinName]: newItem });
  };
  const newCoinNameHandler = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      value = '';
    }
    setNewCoinName(value);
  };
  const newCoinInitialInvestmentHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCoinInitialInvestment(parseInt(e.target.value));
  };
  const newYearHandler = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value === null) {
      value = '';
    }
    setNewCoinYear(parseInt(value));
  };
  useEffect(() => {
    const coinOptionTemp: coinIdOptions = [];
    coinListData.forEach(coinData => {
      coinOptionTemp.push(coinData.id);
    });
    setCoinOption(coinOptionTemp);
  }, []);

  return (
    <ButtonGroup variant='contained' aria-label='outlined primary button group'>
      <Autocomplete
        disablePortal
        getOptionDisabled={option => {
          return coinList[option] !== undefined;
        }}
        id='coin-id-options'
        options={coinOption}
        sx={{ width: 300 }}
        onChange={newCoinNameHandler}
        renderInput={params => <TextField {...params} label='Coin Id' />}
      />
      <FormControl sx={{ m: 1 }} variant='filled'>
        <InputLabel htmlFor='filled-adornment-amount'>
          Initial Investment
        </InputLabel>
        <FilledInput
          id='filled-adornment-amount'
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          onChange={newCoinInitialInvestmentHandler}
          defaultValue='100'
        />
      </FormControl>
      <Autocomplete
        disablePortal
        id='coin-year-options'
        options={coinYearOptions}
        sx={{ width: 150 }}
        onChange={newYearHandler}
        renderInput={params => <TextField {...params} label='Year' />}
        defaultValue='2023'
      />
      <Button variant='contained' onClick={addNewCoinHandler}>
        Submit
      </Button>
      {/* {Object.keys(coinList).map(coinName => (
        <CryptoChartSettingInput {...{ coinName, coinList, setCoinList }} />
      ))} */}
    </ButtonGroup>
  );
};
export default CryptoChartSetting;
