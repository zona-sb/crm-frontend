import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import { clientsSelector } from '../../store/Clients/clientsSlice';
import { getClients } from '../../store/Clients/clientsSaga';
import { close } from '../../store/Modal/ModalSlice';
import { ModalCustom } from '../shared';
import './ClientModal.css';

const ClientsModal = () => {
  const clients = useSelector(clientsSelector.selectAll);
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const modals = {
    add: Add,
    delete: Delete,
    edit: Edit,
  };

  const CurrentModal = modals[data.type];

  return (
    <ModalCustom show={isModalShow} onHide={() => dispatch(close())}>
      {isModalShow && (
        <CurrentModal
          id={data.id}
          data={clients}
          isLoading={isLoading}
          status={status}
          onHide={() => dispatch(close())}
        />
      )}
    </ModalCustom>
  );
};

export default ClientsModal;
