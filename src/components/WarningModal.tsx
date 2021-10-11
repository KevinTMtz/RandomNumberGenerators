/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@mui/styled-engine';
import { Modal, Typography } from '@mui/material';

const modalStyle = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: 'white',
  boxShadow: '24px',
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  '&:hover': {
    border: '1px solid black',
  },
});

interface ModalProps {
  title: string;
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WarningModal = (props: ModalProps) => {
  const handleClose = () => props.setOpen(false);
  return (
    <Modal open={props.open} onClose={handleClose}>
      <div css={modalStyle}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {props.title}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {props.message}
        </Typography>
      </div>
    </Modal>
  );
};

export default WarningModal;
