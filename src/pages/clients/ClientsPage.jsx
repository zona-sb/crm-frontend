import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { clientsSelector } from '../../store/Clients/clientsSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import { ButtonCustom } from '../../components/shared';
import ClientModal from '../../components/clientModal/ClientModal';
import './ClientsPage.css';

const ClientsPage = () => {
  const clients = useSelector(clientsSelector.selectAll);
  const dispatch = useDispatch();

  return (
    <>
      <ClientModal />
      <div className='d-flex align-items-center flex-column'>
        <ButtonCustom
          className='custom__button-tables'
          onClick={() => dispatch(setCurrentType({ type: 'add' }))}
        >
          + Добавить клиента
        </ButtonCustom>
        {clients.map((client) => (
          <div
            className='d-flex gap-2 align-items-center justify-content-around rounded'
            key={client.id}
          >
            <div>ФИО: {client.person.name}</div>
            <div>Компания: {client.company}</div>
            <div>Номер телефона: {client.person.phone}</div>
            <div>Email: {client.person.email}</div>
            <div>Комментарий: {client.comment}</div>
            <BsPencilFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'edit', id: client.id }));
              }}
            />
            <BsTrashFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'delete', id: client.id }));
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ClientsPage;
