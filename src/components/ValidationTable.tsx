/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@mui/styled-engine';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from '@mui/material';
import { CSVLink } from 'react-csv';

import { divStyleColumns, divStyleRows } from '../styles/styles';
import { KolmogorovSmirnovData } from '../Interfaces/Validators/KolmogorovSmirnovData';
import { ChiSquareData } from '../Interfaces/Validators/ChiSquareData';

const TableStyle = css({
  border: '1px solid #ccc',
  borderRadius: '4px',
  '&:hover': {
    border: '1px solid black',
  },
});

interface ValidationTableProps {
  data: KolmogorovSmirnovData | ChiSquareData;
}

const ValidationTable = (props: ValidationTableProps) => {
  const chiSquareHeaders = {
    start: 'Start',
    end: 'End',
    absolute: 'FAbsolute',
    probability: 'Probability',
    theoretical: 'Theoretical',
    result: 'Result',
  };

  const chiSquareValues: { [key: string]: string } = {
    X0: 'X0',
    X1: 'X1',
    classes: 'Classes',
    k: 'K',
    range: 'Range',
    isValid: 'Valid',
  };

  const kolmogorovSmirnovHeaders = {
    cdf: 'CDF',
    cdf_empirical: 'CDF Empirical',
    deviation_plus: 'Deviation +',
    deviation_minus: 'Deviation -',
  };

  const kolmogorovValues: { [key: string]: string } = {
    deviation_max_plus: 'D +',
    deviation_max_minus: 'D -',
    deviation_max: 'Dmax',
    deviation_critical: 'D Critical',
    isValid: 'Valid',
  };

  const isChiSquare = () => {
    return 'classes' in props.data;
  };

  const getValidationHeaders = (): { [key: string]: string } => {
    return 'classes' in props.data
      ? chiSquareHeaders
      : kolmogorovSmirnovHeaders;
  };

  return (
    <div css={divStyleRows}>
      <h3>{isChiSquare() ? 'Chi Square' : 'Kolmogorov Smirnov'}</h3>

      <div css={divStyleColumns}>
        {Object.keys(isChiSquare() ? chiSquareValues : kolmogorovValues).map(
          (key) => (
            <TextField
              key={`chi-square-value-${key}`}
              label={(isChiSquare() ? chiSquareValues : kolmogorovValues)[key]}
              variant='outlined'
              value={(props.data as any)[key]}
              InputProps={{
                readOnly: true,
              }}
              color={
                key === 'isValid'
                  ? (props.data as any)[key]
                    ? 'success'
                    : 'error'
                  : undefined
              }
              focused={key === 'isValid'}
            />
          ),
        )}
      </div>

      <TableContainer css={TableStyle} sx={{ maxHeight: 350 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              {Object.keys(getValidationHeaders()).map((header, index) => (
                <TableCell
                  key={`validation-table-header-${index}`}
                  align='left'
                >
                  {getValidationHeaders()[header]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.table.map((row, index) => (
              <TableRow
                key={`validation-table-row-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(getValidationHeaders()).map((key, i) => (
                  <TableCell
                    key={`validation-table-cell-${index}-${i}`}
                    align='left'
                  >
                    {(row as any)[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CSVLink
        data={props.data.table}
        filename='validation.csv'
        style={{ textDecoration: 'none' }}
      >
        <Button variant='outlined' fullWidth>
          Save as CSV
        </Button>
      </CSVLink>
    </div>
  );
};

export default ValidationTable;
