/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import { CSVLink } from 'react-csv';

const RandomsListDiv = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

interface RandomsListProps {
  numsList: number[];
}

const RandomsList = (props: RandomsListProps) => {
  const rowHeight = 30;

  const renderRow = (rowProps: ListChildComponentProps) => {
    const { index, style } = rowProps;

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton
          style={{ height: `${rowHeight}px` }}
          onClick={() => {
            navigator.clipboard.writeText(
              props.numsList[index].toString(),
            );
          }}
        >
          <ListItemText primary={props.numsList[index]} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div css={RandomsListDiv}>
      <Box>
        <FixedSizeList
          height={350}
          width='100%'
          itemSize={rowHeight}
          itemCount={props.numsList.length}
          overscanCount={10}
        >
          {renderRow}
        </FixedSizeList>
      </Box>

      <CSVLink
        data={[['Randoms'], ...props.numsList.map((random) => [random])]}
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

export default RandomsList;
