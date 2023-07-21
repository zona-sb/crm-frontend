import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonCustom } from '../../shared';
import { deletePriority } from '../../../store/Priorities/prioritiesSaga';

const Delete = ({ onHide, id, status, isLoading }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePriority(id));
  };
  return (
    <div>
      <p className='priority__title'>Удаление приоритета</p>
      {status === 'idle' && (
        <>
          <p>Вы действительно хотите удалить приоритет?</p>
          <div className='d-flex justify-content-between'>
            <ButtonCustom onClick={handleDelete} disabled={isLoading}>
              Удалить
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              Отмена
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>Приоритет удален.</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>Закрыть</ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>Произошла ошибка!</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>Закрыть</ButtonCustom>
          </div>
        </>
      )}
    </div>
  );
};

export default Delete;
