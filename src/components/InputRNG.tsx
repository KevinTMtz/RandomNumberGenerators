/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@mui/styled-engine';
import { TextField } from '@mui/material';

import { InputValues } from '../Interfaces/data/types';
import { divStyleColumns } from '../styles/styles';

const rngInputsStyle = css({
  ...divStyleColumns,
  '& > *': {
    flexGrow: 1,
  },
});

interface InputRNGProps {
  inputValuesArr: InputValues[];
  setInputValues: React.Dispatch<React.SetStateAction<InputValues[]>>;
  index: number;
  requiredByOption: string[];
  validateCompleteInput: (
    inputVals: InputValues[],
    numOfRan?: string | undefined,
  ) => void;
  hasResults: boolean;
}

const InputRNG = (props: InputRNGProps) => {
  const labels: { [key: string]: string } = {
    seed: 'Seed',
    a: 'A',
    c: 'C',
    m: 'M',
  };

  const handleInputChange = (name: string, strNumber: string) => {
    strNumber = strNumber.replace(/[ .]/g, '');
    const number = Number(strNumber);
    if (isNaN(number) && strNumber !== '') return;

    const updatedArr = [...props.inputValuesArr];
    let updatedObject = {
      ...updatedArr[props.index],
      [name]: strNumber,
    };

    updatedArr[props.index] = updatedObject;
    props.setInputValues(updatedArr);

    props.validateCompleteInput(updatedArr);
  };

  return (
    <div css={[rngInputsStyle]}>
      {props.requiredByOption.map((inputStr, index) => (
        <TextField
          key={`input-${index}-${inputStr}`}
          label={labels[inputStr]}
          variant='outlined'
          value={props.inputValuesArr[props.index][inputStr]}
          onChange={(event) => handleInputChange(inputStr, event.target.value)}
          InputProps={{
            readOnly: props.hasResults,
          }}
          focused={props.hasResults ? false : undefined}
          required
        />
      ))}
    </div>
  );
};

export default InputRNG;
