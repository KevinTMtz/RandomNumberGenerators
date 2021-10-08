/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import {
  AppBar,
  SelectChangeEvent,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from '@mui/material';

import InputRNG from '../components/InputRNG';
import { RNGOptions } from '../enums/RNGOptions';
import { InputValues } from '../Interfaces/components/types';
import RandomsList from '../components/RandomsList';

const rootDivStyle = css({
  margin: '32px 24px',
  '@media (max-width: 600px)': {
    margin: '24px 16px',
  },
});

const formStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '& > *': {
    width: '100%',
  },
});

const Layout = () => {
  const emptyObjectValues = { seed: '', a: '', c: '', m: '' };

  const [optionRNG, setOptionRNG] = useState<string>('1');
  const [numOfRandoms, setNumOfRandoms] = useState('');
  const [numOfGenerators, setNumOfGenerators] = useState('1');
  const [inputValues, setInputValues] = useState<InputValues[]>([
    emptyObjectValues,
  ]);

  const [inputNotComplete, setInputNotComplete] = useState(true);

  let requiredByOption: { [key: string]: string[] } = {
    1: ['seed'],
    2: ['seed', 'a', 'c', 'm'],
    3: ['seed', 'a', 'c', 'm'],
    4: ['seed', 'a', 'c', 'm'],
    5: ['seed', 'a', 'm'],
  };

  const handleRNGChange = (event: SelectChangeEvent) => {
    const option = event.target.value;

    setOptionRNG(option);

    let numOfG = option !== RNGOptions.CombinedCongruential ? '1' : '2';
    handleChangeGenerators(numOfG, option);
    setNumOfGenerators(numOfG);

    validateCompleteInput([emptyObjectValues], '');
  };

  const handleChangeNumOfRandom = (strNumOfRandom: string) => {
    const number = Number(strNumOfRandom);
    if (!number && strNumOfRandom !== '') return;

    setNumOfRandoms(strNumOfRandom);

    validateCompleteInput(inputValues, strNumOfRandom);
  };

  const handleChangeGenerators = async (
    strNumOfGenerators: string,
    option: string,
  ) => {
    const newArr = [];
    let number = Number(strNumOfGenerators);
    if (!number && strNumOfGenerators !== '') return;

    if (
      strNumOfGenerators === '' ||
      (strNumOfGenerators === '1' &&
        option === RNGOptions.CombinedCongruential)
    ) {
      setNumOfGenerators(strNumOfGenerators);
      number = 2;
    } else {
      setNumOfGenerators(String(number));
    }

    for (let i = 0; i < number; i++) newArr.push(emptyObjectValues);

    setInputValues(newArr);

    validateCompleteInput(newArr, numOfRandoms);
  };

  const validateCompleteInput = (
    inputVals: InputValues[],
    numOfRan?: string,
  ) => {
    if (numOfRan === undefined) numOfRan = numOfRandoms;

    let check = numOfRan !== '';

    inputVals.forEach((values) => {
      requiredByOption[optionRNG].forEach(
        (key) => (check = check && (values as any)[key] !== ''),
      );
    });

    setInputNotComplete(!check);
  };

  const generateRandoms = async () => {
    console.log('Generate Randoms');
  };

  return (
    <div>
      <header>
        <AppBar position='static'>
          <Toolbar variant='dense'>
            <Typography variant='h6' color='inherit' component='div'>
              Random Number Generator
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <div css={rootDivStyle}>
        <form css={formStyle}>
          <FormControl fullWidth>
            <InputLabel>Random Number Generator</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              value={optionRNG}
              label='Random Number Generator'
              onChange={handleRNGChange}
            >
              <MenuItem value={RNGOptions.MiddleSquares}>
                Middle Squares
              </MenuItem>
              <MenuItem value={RNGOptions.LinearCongruential}>
                Linear Congruential
              </MenuItem>
              <MenuItem value={RNGOptions.MixedCongruential}>
                Mixed Congruential
              </MenuItem>
              <MenuItem value={RNGOptions.CombinedCongruential}>
                Combined Congruential
              </MenuItem>
              <MenuItem value={RNGOptions.MultiplicativeCongruential}>
                Multiplicative Congruential
              </MenuItem>
            </Select>
          </FormControl>

          <br />

          <TextField
            label='Number of randoms'
            variant='outlined'
            value={numOfRandoms}
            onChange={(event) =>
              handleChangeNumOfRandom(event.target.value)
            }
          />

          {RNGOptions.CombinedCongruential === optionRNG && (
            <TextField
              label='Number of generators'
              variant='outlined'
              value={numOfGenerators}
              onChange={(event) =>
                handleChangeGenerators(event.target.value, optionRNG)
              }
            />
          )}

          {inputValues.map((_, index) => (
            <InputRNG
              key={`input-values-${index}`}
              inputValuesArr={inputValues}
              setInputValues={
                setInputValues as React.Dispatch<
                  React.SetStateAction<InputValues[]>
                >
              }
              index={index}
              optionRNG={optionRNG}
              validateCompleteInput={validateCompleteInput}
            />
          ))}

          <Button
            variant='contained'
            onClick={generateRandoms}
            disabled={inputNotComplete}
          >
            Generate randoms
          </Button>
        </form>

        <br />

        <h1>Random numbers generated</h1>
        <RandomsList
          numsList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        />
      </div>
    </div>
  );
};

export default Layout;
