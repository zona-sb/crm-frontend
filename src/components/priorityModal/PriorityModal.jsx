import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import { prioritiesSelector } from '../../store/Priorities/prioritiesSlice';
import { getPriorities } from '../../store/Priorities/prioritiesSaga';
import { close } from '../../store/Modal/ModalSlice';
import { ModalCustom } from '../shared';
import './PriorityModal.css';

const PriorityModal = () => {
  const prioities = useSelector(prioritiesSelector.selectAll);
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPriorities());
  }, [dispatch]);

  const modals = {
    add: Add,
    delete: Delete,
    edit: Edit,
  };

  const CurrentModal = modals[data.type];

  return (
    <ModalCustom show={isModalShow} onHide={() => dispatch(close())}>
      <CurrentModal
        id={data.id}
        data={prioities}
        isLoading={isLoading}
        status={status}
        onHide={() => dispatch(close())}
      />
    </ModalCustom>
  );
};

export default PriorityModal;
