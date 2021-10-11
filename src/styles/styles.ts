import { css } from '@mui/styled-engine';

export const divStyleRows = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '& > *': {
    width: '100%',
  },
});

export const divStyleColumns = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  '& > *': {
    width: '100%',
  },
  '@media (max-width: 550px)': {
    flexDirection: 'column',
  },
});
