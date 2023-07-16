import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalCustom.css';

const ModalCustom = (props) => (
  <Modal
    {...props}
    aria-labelledby='contained-modal-title-vcenter'
    centered
    className='custom__modal'
  >
    {props.children}
  </Modal>
);

export default ModalCustom;
