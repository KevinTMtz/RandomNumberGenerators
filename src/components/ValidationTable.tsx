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
} from '@mui/material';
import { CSVLink } from 'react-csv';

import { divStyleRows } from '../styles/styles';
import {
  KolmogorovSmirnovCell,
  KolmogorovSmirnovData,
} from '../Interfaces/Validators/KolmogorovSmirnovData';
import {
  ChiSquareCell,
  ChiSquareData,
} from '../Interfaces/Validators/ChiSquareData';

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

  const kolmogorovSmirnovHeaders = {
    cdf: 'CDF',
    cdf_empirical: 'CDF Empirical',
    deviation_plus: 'Deviation +',
    deviation_minus: 'Deviation -',
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
        filename='randoms.csv'
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
