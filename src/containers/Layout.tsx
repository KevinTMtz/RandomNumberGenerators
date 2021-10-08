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
import RandomsList from '../components/RandomsList';
import { RNGOptions } from '../enums/RNGOptions';
import { GeneratorValues, InputValues } from '../Interfaces/data/types';
import { convertInputToValues } from '../utils/convertInputToValues';
import { LinearCongruential } from '../classes/Generators/LinearCongruential';
import { CombinedCongruential } from '../classes/Generators/CombinedCongruential';
import { MixedCongruential } from '../classes/Generators/MixedCongruential';
import { MiddleSquares } from '../classes/Generators/MiddleSquares';
import { MultiplicativeCongruential } from '../classes/Generators/MultiplicativeCongruential';

const rootDivStyle = css({
  margin: '32px 24px',
  '@media (max-width: 600px)': {
    margin: '24px 16px',
  },
  '& > *': {
    width: '100%',
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

  const [randomsList, setRandomsList] = useState<number[]>([]);

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

    let numOfG = '';
    handleChangeGenerators(numOfG, option);
    setNumOfGenerators(numOfG);

    validateCompleteInput([emptyObjectValues]);
  };

  const handleChangeNumOfRandom = (strNumOfRandom: string) => {
    const number = Number(strNumOfRandom);
    if (!number && strNumOfRandom !== '') return;

    setNumOfRandoms(strNumOfRandom);

    validateCompleteInput(inputValues);
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

    validateCompleteInput(newArr);
  };

  const validateCompleteInput = (inputVals: InputValues[]) => {
    let check = true;

    inputVals.forEach((values) =>
      requiredByOption[optionRNG].forEach(
        (key) => (check = check && (values as any)[key] !== ''),
      ),
    );

    setInputNotComplete(!check);
  };

  const generateRandoms = async () => {
    const numOfRandomsValue =
      numOfRandoms === '' ? undefined : Number(numOfRandoms);

    if (optionRNG === RNGOptions.CombinedCongruential) {
      await CombinedCongruential.generateRandoms(
        convertInputToValues(inputValues),
      ).then(
        (randoms) => {
          setRandomsList(randoms);
        },
        (error) => console.log(error),
      );
    } else {
      const valuesObj: GeneratorValues =
        convertInputToValues(inputValues)[0];

      if (optionRNG === RNGOptions.MiddleSquares) {
        await MiddleSquares.generateRandoms(
          valuesObj,
          numOfRandomsValue,
        ).then(
          (randoms) => {
            setRandomsList(randoms);
          },
          (error) => console.log(error),
        );
      } else if (optionRNG === RNGOptions.LinearCongruential) {
        await LinearCongruential.generateRandoms(
          valuesObj,
          numOfRandomsValue,
        ).then(
          (randoms) => {
            setRandomsList(randoms);
          },
          (error) => console.log(error),
        );
      } else if (optionRNG === RNGOptions.MixedCongruential) {
        await MixedCongruential.generateRandoms(
          valuesObj,
          numOfRandomsValue,
        ).then(
          (randoms) => {
            setRandomsList(randoms);
          },
          (error) => console.log(error),
        );
      } else if (optionRNG === RNGOptions.MultiplicativeCongruential) {
        await MultiplicativeCongruential.generateRandoms(
          valuesObj,
          numOfRandomsValue,
        ).then(
          (randoms) => {
            setRandomsList(randoms);
          },
          (error) => console.log(error),
        );
      }
    }
  };

  const clean = () => {
    setRandomsList([]);
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
              value={optionRNG}
              label='Random Number Generator'
              onChange={handleRNGChange}
              disabled={randomsList.length > 0}
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
            disabled={randomsList.length > 0}
          />

          {RNGOptions.CombinedCongruential === optionRNG && (
            <TextField
              label='Number of generators'
              variant='outlined'
              value={numOfGenerators}
              onChange={(event) =>
                handleChangeGenerators(event.target.value, optionRNG)
              }
              disabled={randomsList.length > 0}
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
              randomsListLength={randomsList.length}
            />
          ))}

          {randomsList.length === 0 && (
            <Button
              variant='contained'
              onClick={generateRandoms}
              disabled={inputNotComplete}
            >
              Generate randoms
            </Button>
          )}

          {randomsList.length > 0 && (
            <Button
              variant='contained'
              color='error'
              onClick={clean}
              disabled={inputNotComplete}
            >
              Start again
            </Button>
          )}
        </form>

        <br />

        {randomsList.length > 0 && (
          <>
            <h1>Random numbers generated</h1>
            <p>
              Total randoms generated:{' '}
              <strong>{randomsList.length}</strong>
            </p>
            <RandomsList numsList={randomsList} />
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
