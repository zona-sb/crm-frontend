import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { statusesSelector } from '../../store/Statuses/statusesSlice';
import { getStatuses } from '../../store/Statuses/statusesSaga';
import { closeModal } from '../../store/Modal/ModalSlice';
import { ModalCustom } from '../shared';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import './StatusModal.css';

const StatusModal = () => {
  const statuses = useSelector(statusesSelector.selectAll);
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatuses());
  }, [dispatch]);

  const modals = {
    add: Add,
    delete: Delete,
    edit: Edit,
  };

  const CurrentModal = modals[data.type];

  return (
    <ModalCustom show={isModalShow} onHide={() => dispatch(closeModal())}>
      {isModalShow && (
        <CurrentModal
          id={data.id}
          data={statuses}
          isLoading={isLoading}
          status={status}
          onHide={() => dispatch(closeModal())}
        />
      )}
    </ModalCustom>
  );
};

export default StatusModal;
