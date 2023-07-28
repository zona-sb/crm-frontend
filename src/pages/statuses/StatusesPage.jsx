import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { statusesSelector } from '../../store/Statuses/statusesSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import { getCategories } from '../../store/Categories/categoriesSaga';
import { ButtonCustom } from '../../components/shared';
import StatusModal from '../../components/statusModal/StatusModal';
import './StatusesPage.css';

const StatusesPage = () => {
  const statuses = useSelector(statusesSelector.selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <StatusModal />
      <div className='d-flex align-items-center flex-column'>
        <ButtonCustom
          className='custom__button-tables'
          onClick={() => dispatch(setCurrentType({ type: 'add' }))}
        >
          + Добавить статус
        </ButtonCustom>
        {statuses.map((status) => (
          <div
            className='d-flex align-items-center justify-content-around test__style rounded'
            key={status.id}
          >
            <div>Наименование: {status.statusTitle}</div>
            <div>Категория: {status.category.categoryTitle}</div>
            <BsPencilFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'edit', id: status.id }));
              }}
            />
            <BsTrashFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'delete', id: status.id }));
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default StatusesPage;
