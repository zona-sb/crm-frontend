import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clientsSelector } from '../../store/Clients/clientsSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import ClientModal from '../../components/clientModal/ClientModal';
import Table from '../../components/Table/Table';
import './ClientsPage.css';

const FilterInputName = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование'
  />
);

const FilterInputCompany = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите компанию'
  />
);

const FilterInputPhone = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите номер'
  />
);

const FilterInputEmail = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите email'
  />
);

const FilterInputComment = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите комментарий'
  />
);

const ClientsPage = () => {
  const clients = useSelector(clientsSelector.selectAll);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data = [
    {
      key: 'person.name',
      name: 'ФИО',
      filter: <FilterInputName />,
    },
    {
      key: 'company',
      name: 'Компания',
      filter: <FilterInputCompany />,
    },
    {
      key: 'person.phone',
      name: 'Номер телефона',
      filter: <FilterInputPhone />,
    },
    {
      key: 'person.email',
      name: 'Email',
      filter: <FilterInputEmail />,
    },
    {
      key: 'comment',
      name: 'Комментарий',
      filter: <FilterInputComment />,
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  return (
    <>
      <ClientModal />
      <div className='d-flex flex-column'>
        <Table
          categories={data}
          data={clients}
          actions={actions}
          width={1200}
        />
        <div className='d-flex justify-content-center'>
          <button
            className='pt-4 custom__priority-button'
            onClick={() => dispatch(setCurrentType({ type: 'add' }))}
          >
            {t('clientsModal.addClient')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ClientsPage;
