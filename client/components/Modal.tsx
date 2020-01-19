import React from 'react';
import ReactModal from 'react-modal';

const Modal: React.FC<any> = ({ children, open, onClose, element }) => {
  // const store = useStoreState((store) => store)
  // console.log('TCL: store', store)
  // const { Component } = useStoreState((state) => state.modal)
  // const closeModal = () => onClose(false)
  // const openModal = () => setModal(true)
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
