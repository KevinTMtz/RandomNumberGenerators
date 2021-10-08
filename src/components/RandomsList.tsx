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

const RandomsListBox = css({
  border: '1px solid #ccc',
  borderRadius: '4px',
  '&:hover': {
    border: '1px solid black',
  },
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
            navigator.clipboard.writeText(String(props.numsList[index]));
          }}
        >
          <ListItemText primary={props.numsList[index]} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div css={RandomsListDiv}>
      <Box css={RandomsListBox}>
        <FixedSizeList
          height={Math.min(300, props.numsList.length * 30)}
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
