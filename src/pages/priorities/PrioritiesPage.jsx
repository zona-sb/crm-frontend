import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import PriorityModal from '../../components/priorityModal/PriorityModal';
import { prioritiesSelector } from '../../store/Priorities/prioritiesSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import './PrioritiesPage.css';
import { ButtonCustom } from '../../components/shared';

const PrioritiesPage = () => {
  const prioities = useSelector(prioritiesSelector.selectAll);
  const dispatch = useDispatch();
  return (
    <>
      <PriorityModal />
      <div className='d-flex align-items-center flex-column'>
        <ButtonCustom
          className='custom__button-tables'
          onClick={() => dispatch(setCurrentType({ type: 'add' }))}
        >
          + Добавить приоритет
        </ButtonCustom>
        {prioities.map(({ title, weight, color, id }) => (
          <div
            className='d-flex align-items-center justify-content-around test__style rounded'
            key={id}
          >
            <div>Наименование: {title}</div>
            <div>Вес приоритета: {weight}</div>
            <div
              style={{
                backgroundColor: color,
                width: '15px',
                height: '15px',
                borderRadius: '50%',
              }}
            />
            <BsPencilFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'edit', id }));
              }}
            />
            <BsTrashFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'delete', id }));
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PrioritiesPage;
