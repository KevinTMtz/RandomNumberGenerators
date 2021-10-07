/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@mui/styled-engine';
import { TextField } from '@mui/material';
import { InputValues } from '../Interfaces/components/types';
import { RNGOptions } from '../enums/RNGOptions';

const rngInputsStyle = css({
  display: 'flex',
  width: '100%',
  gap: '16px',
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
}

const InputRNG = (props: InputRNGProps) => {
  const handleInputChange = (name: string, strNumber: string) => {
    const number = Number(strNumber);
    if (!number && strNumber !== '') return;

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
      <div css={rngInputsStyle}>
        <TextField
          label='Seed'
          variant='outlined'
          value={props.inputValuesArr[props.index].seed}
          onChange={(event) =>
            handleInputChange('seed', event.target.value)
          }
        />
        {props.optionRNG !== RNGOptions.MiddleSquares && (
          <>
            <TextField
              label='A'
              variant='outlined'
              value={props.inputValuesArr[props.index].a}
              onChange={(event) =>
                handleInputChange('a', event.target.value)
              }
            />
            {props.optionRNG !== RNGOptions.MultiplicativeCongruential && (
              <TextField
                label='C'
                variant='outlined'
                value={props.inputValuesArr[props.index].c}
                onChange={(event) =>
                  handleInputChange('c', event.target.value)
                }
              />
            )}
            <TextField
              label='M'
              variant='outlined'
              value={props.inputValuesArr[props.index].m}
              onChange={(event) =>
                handleInputChange('m', event.target.value)
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputRNG;
