import React from 'react';
import ReactModal from 'react-modal';

const Modal: React.FC<any> = ({ children, open, onClose, element }) => {
  return (
    <ReactModal
      appElement={element}
      isOpen={open}
      onRequestClose={onClose}
      // style={{ content: { background: colors?.bg } }}
      contentLabel="Example Modal"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
