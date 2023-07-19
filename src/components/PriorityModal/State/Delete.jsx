import React from 'react';
import Form from 'react-bootstrap/Form';
import { ButtonCustom } from '../../shared';

const Delete = ({ onHide, handlerDelete, data }) => {
  return (
    <div>
      <p className='priority__title'>Удаление приоритета</p>
      <p>Вы действительно хотите удалить приоритет?</p>
      <div className='d-flex justify-content-between'>
        <ButtonCustom onClick={() => handlerDelete(data)}>Удалить</ButtonCustom>
        <ButtonCustom color='reject' onClick={onHide}>
          Отмена
        </ButtonCustom>
      </div>
    </div>
  );
};

export default Delete;
