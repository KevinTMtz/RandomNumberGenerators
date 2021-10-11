/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@mui/styled-engine';
import { TextField } from '@mui/material';
import { InputValues } from '../Interfaces/data/types';
import { RNGOptions } from '../enums/RNGOptions';
import { divStyleColumns } from '../styles/styles';

const rngInputsStyle = css({
  ...divStyleColumns,
  '& > *': {
    flexGrow: 1,
  },
});

interface InputRNGProps {
  inputValuesArr: any[];
  setInputValues: React.Dispatch<React.SetStateAction<InputValues[]>>;
  index: number;
  optionRNG: string;
  validateCompleteInput: (
    inputVals: InputValues[],
    numOfRan?: string | undefined,
  ) => void;
  randomsListLength: number;
}

const InputRNG = (props: InputRNGProps) => {
  const handleInputChange = (name: string, strNumber: string) => {
    const number = Number(strNumber);
    if (isNaN(number) && strNumber !== '') return;

    const updatedArr = [...props.inputValuesArr];
    let updatedObject: { [key: string]: string } = {
      ...updatedArr[props.index],
    };
    updatedObject[name] = strNumber;

    updatedArr[props.index] = updatedObject;
    props.setInputValues(updatedArr);

    props.validateCompleteInput(updatedArr);
  };

  return (
    <div>
      <div css={[rngInputsStyle]}>
        <TextField
          label='Seed'
          variant='outlined'
          value={props.inputValuesArr[props.index].seed}
          onChange={(event) => handleInputChange('seed', event.target.value)}
          InputProps={{
            readOnly: props.randomsListLength > 0,
          }}
          focused={
            props.randomsListLength > 0
              ? !(props.randomsListLength > 0)
              : undefined
          }
          required
        />
        {props.optionRNG !== RNGOptions.MiddleSquares && (
          <>
            <TextField
              label='A'
              variant='outlined'
              value={props.inputValuesArr[props.index].a}
              onChange={(event) => handleInputChange('a', event.target.value)}
              InputProps={{
                readOnly: props.randomsListLength > 0,
              }}
              focused={
                props.randomsListLength > 0
                  ? !(props.randomsListLength > 0)
                  : undefined
              }
              required
            />
            {props.optionRNG !== RNGOptions.MultiplicativeCongruential &&
              props.optionRNG !== RNGOptions.CombinedCongruential && (
                <TextField
                  label='C'
                  variant='outlined'
                  value={props.inputValuesArr[props.index].c}
                  onChange={(event) =>
                    handleInputChange('c', event.target.value)
                  }
                  InputProps={{
                    readOnly: props.randomsListLength > 0,
                  }}
                  focused={
                    props.randomsListLength > 0
                      ? !(props.randomsListLength > 0)
                      : undefined
                  }
                  required
                />
              )}
            <TextField
              label='M'
              variant='outlined'
              value={props.inputValuesArr[props.index].m}
              onChange={(event) => handleInputChange('m', event.target.value)}
              InputProps={{
                readOnly: props.randomsListLength > 0,
              }}
              focused={
                props.randomsListLength > 0
                  ? !(props.randomsListLength > 0)
                  : undefined
              }
              required
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputRNG;
