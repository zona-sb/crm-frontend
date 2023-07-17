import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ButtonCustom, ModalCustom } from '../../utils/shared/components';
import './PriorityModal.css';
import Table from './Tables/Table';

const Priority = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([
    { name: 'Test', number: '5', color: '#000000' },
    { name: 'Test 2', number: '1', color: '#cc0000' },
    // { name: 'Test 3', number: '2', color: '#ccf000' },
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

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center flex-column'>
      <ButtonCustom onClick={() => setShowModal((prev) => !prev)}>
        Добавить приоритет
      </ButtonCustom>
      <Table data={data} />
      <ModalCustom
        show={showModal}
        onHide={() => setShowModal((prev) => !prev)}
      >
        <Form onSubmit={handlerSubmit}>
          <p className='priority__title'>Создание приоритета</p>
          <Form.Group className='mb-2' controlId='name'>
            <Form.Label className='priority__lables'>Наименование</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите наименование'
              className='priority__input'
            />
          </Form.Group>
          <Form.Group className='mb-2' controlId='number'>
            <Form.Label className='priority__lables'>
              Номер приоритета
            </Form.Label>
            <Form.Control
              type='number'
              min='0'
              placeholder='Выбрать приоритет'
              className='priority__input'
            />
          </Form.Group>

          <Form.Group className='d-flex flex-column mb-3' controlId='color'>
            <Form.Label className='priority__lables'>Цвет</Form.Label>
            <Form.Control
              type='color'
              placeholder='Выбрать приоритет'
              className='priority__input form-control w-100'
            />
          </Form.Group>

          <div className='d-flex justify-content-between'>
            <ButtonCustom type='submit'>Создать</ButtonCustom>
            <ButtonCustom
              color='reject'
              onClick={() => setShowModal((prev) => !prev)}
            >
              Отмена
            </ButtonCustom>
          </div>
        </Form>
      </ModalCustom>
    </div>
  );
};

export default Priority;
