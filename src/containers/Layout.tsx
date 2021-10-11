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
import { InputValues } from '../Interfaces/data/types';
import { convertInputToValues } from '../utils/convertInputToValues';
import { LinearCongruential } from '../classes/Generators/LinearCongruential';
import { CombinedCongruential } from '../classes/Generators/CombinedCongruential';
import { MixedCongruential } from '../classes/Generators/MixedCongruential';
import { MiddleSquares } from '../classes/Generators/MiddleSquares';
import { MultiplicativeCongruential } from '../classes/Generators/MultiplicativeCongruential';
import ValidationTable from '../components/ValidationTable';
import { divStyleColumns, divStyleRows } from '../styles/styles';
import { KolmogorovSmirnovData } from '../Interfaces/Validators/KolmogorovSmirnovData';
import { ChiSquareData } from '../Interfaces/Validators/ChiSquareData';
import { HullDobell } from '../Interfaces/Validators/HullDobell';
import WarningModal from '../components/WarningModal';

const rootDivStyle = css({
  margin: '32px 24px',
  '@media (max-width: 600px)': {
    margin: '24px 16px',
  },
  '& > *': {
    width: '100%',
  },
});

const Layout = () => {
  const emptyObjectValues = { seed: '', a: '', c: '', m: '' };
  const emptyHullDobell = {
    rule1: { areRelativePrimes: false },
    rule2: { primeDivision: false },
    rule3: { mDivision: false, aDivision: false },
    general: { check: false },
  };

  const [optionRNG, setOptionRNG] = useState<string>('1');
  const [numOfRandoms, setNumOfRandoms] = useState('');
  const [numOfGenerators, setNumOfGenerators] = useState('1');
  const [inputValues, setInputValues] = useState<InputValues[]>([
    emptyObjectValues,
  ]);

  const [inputNotComplete, setInputNotComplete] = useState(true);

  const [hullDobell, setHullDobell] = useState<HullDobell>(emptyHullDobell);
  const [randomsList, setRandomsList] = useState<number[]>([]);
  const [validationData, setValidationData] = useState<
    KolmogorovSmirnovData | ChiSquareData
  >({} as any);
  const [alphaStr, setAlphaStr] = useState('0.05');
  const [openModal, setOpenModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let requiredByOption: { [key: string]: string[] } = {};
  requiredByOption[RNGOptions.MiddleSquares] = ['seed'];
  requiredByOption[RNGOptions.LinearCongruential] = ['seed', 'a', 'c', 'm'];
  requiredByOption[RNGOptions.MixedCongruential] = ['seed', 'a', 'c', 'm'];
  requiredByOption[RNGOptions.CombinedCongruential] = ['seed', 'a', 'm'];
  requiredByOption[RNGOptions.MultiplicativeCongruential] = ['seed', 'a', 'm'];

  const handleRNGChange = (event: SelectChangeEvent) => {
    const option = event.target.value;

    setOptionRNG(option);

    let numOfG = option !== RNGOptions.CombinedCongruential ? '1' : '2';
    handleChangeGenerators(numOfG, option);
    setNumOfGenerators('');

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
      (strNumOfGenerators === '1' && option === RNGOptions.CombinedCongruential)
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

  const getCurrentRNG = () => {
    if (optionRNG === RNGOptions.MiddleSquares) return MiddleSquares;
    else if (optionRNG === RNGOptions.LinearCongruential)
      return LinearCongruential;
    else if (optionRNG === RNGOptions.MixedCongruential)
      return MixedCongruential;
    else if (optionRNG === RNGOptions.MultiplicativeCongruential)
      return MultiplicativeCongruential;
    else return CombinedCongruential;
  };

  const handleChangeAlpha = (value: string) => {
    if (isNaN(Number(value))) return;

    setAlphaStr(value);
  };

  const generateRandoms = async () => {
    const numOfRandomsValue =
      numOfRandoms === '' ? undefined : Number(numOfRandoms);

    let valuesObj =
      optionRNG === RNGOptions.CombinedCongruential
        ? convertInputToValues(inputValues)
        : convertInputToValues(inputValues)[0];

    await getCurrentRNG()
      .generateRandoms(valuesObj, numOfRandomsValue)
      .then(
        (randoms) => {
          setRandomsList(randoms);

          if (optionRNG === RNGOptions.MixedCongruential) {
            setHullDobell(MixedCongruential.validHullDobell());
          }
        },
        (error) => {
          console.log(error);
          handleOpen('Error during generation', error);
        },
      );
  };

  const makeValidation = (validationType: string, alpha: number) => {
    (
      getCurrentRNG() as
        | typeof LinearCongruential
        | typeof MultiplicativeCongruential
        | typeof MixedCongruential
    )
      .validate(validationType as 'CS' | 'KS', alpha)
      .then(
        (data) => {
          setValidationData(data);
        },
        (error) => {
          console.log(error);
          setValidationData({} as any);
          handleOpen('Error during validation', error);
        },
      );
  };

  const clean = () => {
    setRandomsList([]);
    setValidationData({} as any);
    setHullDobell(emptyHullDobell);
  };

  const handleOpen = (title: string, message: string) => {
    setOpenModal(true);
    setErrorTitle(title);
    setErrorMessage(message);
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
        <form css={divStyleRows}>
          <FormControl
            fullWidth
            focused={
              randomsList.length > 0 ? !(randomsList.length > 0) : undefined
            }
          >
            <InputLabel>Random Number Generator</InputLabel>
            <Select
              value={optionRNG}
              label='Random Number Generator'
              onChange={handleRNGChange}
              inputProps={{
                readOnly: randomsList.length > 0,
              }}
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
            onChange={(event) => handleChangeNumOfRandom(event.target.value)}
            InputProps={{
              readOnly: randomsList.length > 0,
            }}
            focused={
              randomsList.length > 0 ? !(randomsList.length > 0) : undefined
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
              InputProps={{
                readOnly: randomsList.length > 0,
              }}
              focused={
                randomsList.length > 0 ? !(randomsList.length > 0) : undefined
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
            {optionRNG === RNGOptions.MixedCongruential && (
              <>
                <h1>Hull–Dobell Theorem</h1>
                <p>
                  The generator{' '}
                  <strong>
                    {hullDobell.general.check ? 'has' : 'does not have'} full
                    period
                  </strong>
                </p>
                <ol>
                  <li>
                    <strong>{inputValues[0].c}</strong> and{' '}
                    <strong>{inputValues[0].m}</strong> are{' '}
                    {hullDobell.rule1.areRelativePrimes ? '' : 'not'} relative
                    primes
                  </li>
                  <li>
                    All primes that divide <strong>{inputValues[0].m}</strong>,{' '}
                    {hullDobell.rule2.primeDivision ? '' : 'do not'} divide (
                    <strong>{inputValues[0].a}</strong> - 1){' '}
                  </li>
                  <li>
                    4{' '}
                    {hullDobell.rule3.mDivision ? `divides` : 'does not divide'}{' '}
                    <strong>{inputValues[0].m}</strong>,{' '}
                    {hullDobell.rule3.mDivision
                      ? hullDobell.rule3.aDivision
                        ? `so 4 divides`
                        : `but 4 does not divide`
                      : 'so it does not have to divide'}{' '}
                    (<strong>{inputValues[0].a}</strong> - 1)
                  </li>
                </ol>
                <br />
              </>
            )}

            <h1>Random Numbers Generated</h1>
            <p>
              Total randoms generated: <strong>{randomsList.length}</strong>
            </p>
            <RandomsList numsList={randomsList} />

            <br />

            {(optionRNG === RNGOptions.LinearCongruential ||
              optionRNG === RNGOptions.MultiplicativeCongruential ||
              optionRNG === RNGOptions.MixedCongruential) && (
              <>
                <h1>Validation</h1>
                <div css={divStyleRows}>
                  <TextField
                    label='Alpha'
                    variant='outlined'
                    value={alphaStr}
                    onChange={(event) => handleChangeAlpha(event.target.value)}
                  />

                  <div css={divStyleColumns}>
                    <Button
                      variant='contained'
                      onClick={() => makeValidation('CS', Number(alphaStr))}
                      disabled={randomsList.length < 10}
                    >
                      Chi Square
                    </Button>
                    <Button
                      variant='contained'
                      onClick={() => makeValidation('KS', Number(alphaStr))}
                    >
                      Kolmogorov Smirnov
                    </Button>
                  </div>

                  {validationData.table && (
                    <ValidationTable data={validationData} />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <WarningModal
        open={openModal}
        setOpen={setOpenModal}
        title={errorTitle}
        message={errorMessage}
      />
    </div>
  );
};

export default Layout;
