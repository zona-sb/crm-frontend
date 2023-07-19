import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ButtonCustom } from '../../shared';

const Edit = ({ onHide, handlerEdit, data }) => {
  const [value, setValue] = useState(data.name);

  const handlerChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Form onSubmit={handlerEdit}>
      <p className='priority__title'>Создание приоритета</p>
      <Form.Group className='mb-2' controlId='name'>
        <Form.Label className='priority__lables'>Наименование</Form.Label>
        <Form.Control
          type='text'
          placeholder='Введите наименование'
          onChange={handlerChange}
          value={value}
          className='priority__input'
        />
      </Form.Group>
      <Form.Group className='mb-2' controlId='number'>
        <Form.Label className='priority__lables'>Номер приоритета</Form.Label>
        <Form.Control
          type='number'
          min='0'
          placeholder='Выбрать приоритет'
          value={data.number}
          className='priority__input'
        />
      </Form.Group>

      <Form.Group className='d-flex flex-column mb-3' controlId='color'>
        <Form.Label className='priority__lables'>Цвет</Form.Label>
        <Form.Control
          type='color'
          value={data.color}
          placeholder='Выбрать приоритет'
          className='priority__input form-control w-100'
        />
      </Form.Group>

      <div className='d-flex justify-content-between'>
        <ButtonCustom type='submit'>Сохранить</ButtonCustom>
        <ButtonCustom color='reject' onClick={onHide}>
          Отмена
        </ButtonCustom>
      </div>
    </Form>
  );
};

export default Edit;
