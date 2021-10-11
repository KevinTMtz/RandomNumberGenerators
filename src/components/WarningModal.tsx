/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@mui/styled-engine';
import { Modal } from '@mui/material';

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
      <div>
        <h1>{props.title}</h1>
        <p>{props.message}</p>
      </div>
    </Modal>
  );
};

export default WarningModal;
