import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './PriorityModal.css';
import Table from '../Tables/Table';
import { ButtonCustom, ModalCustom } from '../shared/index';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';

const Priority = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState({});
  const [data, setData] = useState([
    { name: 'Test', number: '5', color: '#000000' },
    { name: 'Test 2', number: '1', color: '#cc0000' },
    { name: 'Test 3', number: '2', color: '#ccf000' },
    { name: 'Test 3', number: '3', color: '#ccf000' },
  ]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const { name, number, color } = e.target;
    const userData = {
      name: name.value,
      number: number.value,
      color: color.value,
    };

    setData([userData, ...data]);
    setShowModal(false);
  };

  const handlerEdit = (e) => {
    e.preventDefault();
    const { name, number, color } = e.target;
    const userData = {
      name: name.value,
      number: number.value,
      color: color.value,
    };
    const newData = [...data];
    const indexP = newData.findIndex((p) => p.number === number.value);
    newData[indexP] = userData;
    setData(newData);
    setShowModal(false);
  };

  const modals = {
    add: Add,
    delete: Delete,
    edit: Edit,
  };

  const CurrentModal = modals[content.type];

  const handlerDelete = (number) => {
    const newData = data.filter((p) => p.number !== number);
    setData(newData);
    setShowModal((prev) => !prev);
  };

  return (
    <div className='d-flex justify-content-center align-items-center flex-column bg-warning'>
      <Table
        data={data}
        onShown={() => {
          setShowModal((prev) => !prev);
          setContent({ type: 'add' });
        }}
        onDelete={(number) => {
          setShowModal((prev) => !prev);
          setContent({ type: 'delete', data: number });
        }}
        onEdit={(prioity) => {
          setShowModal((prev) => !prev);
          setContent({ type: 'edit', data: prioity });
        }}
      />
      {/* <ButtonCustom onClick={() => setShowModal((prev) => !prev)}>
        Добавить приоритет
      </ButtonCustom> */}
      <ModalCustom
        show={showModal}
        onHide={() => setShowModal((prev) => !prev)}
      >
        {showModal && (
          <CurrentModal
            data={content.data}
            onHide={() => setShowModal((prev) => !prev)}
            handlerSubmit={handlerSubmit}
            handlerEdit={handlerEdit}
            handlerDelete={handlerDelete}
          />
        )}
      </ModalCustom>
    </div>
  );
};

export default Priority;
