import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { statusesSelector } from '../../store/Statuses/statusesSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import { getCategories } from '../../store/Categories/categoriesSaga';
// import { ButtonCustom } from '../../components/shared';
import StatusModal from '../../components/statusModal/StatusModal';
import Table from '../../components/Table/Table';
import './StatusesPage.css';

const FilterInputName = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование'
  />
);

const FilterInputCategory = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование категории'
  />
);

const StatusesPage = () => {
  const statuses = useSelector(statusesSelector.selectAll);
  const dispatch = useDispatch();

  const data = [
    {
      key: 'statusTitle',
      name: 'Наименование',
      filter: <FilterInputName />,
    },
    {
      key: 'category.categoryTitle',
      name: 'Категория',
      filter: <FilterInputCategory />,
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <StatusModal />
      <div className='d-flex flex-column'>
        <Table categories={data} data={statuses} actions={actions} />
        <div className='d-flex justify-content-center'>
          <button
            className='pt-4 custom__priority-button'
            onClick={() => dispatch(setCurrentType({ type: 'add' }))}
          >
            + Добавить статус
          </button>
        </div>
      </div>
    </>

    // <>
    //   <StatusModal />
    //   <div className='d-flex flex-column'>
    //     <ButtonCustom
    //       className='custom__button-tables'
    //       onClick={() => dispatch(setCurrentType({ type: 'add' }))}
    //     >
    //       + Добавить статус
    //     </ButtonCustom>
    //     {statuses.map((status) => (
    //       <div
    //         className='d-flex align-items-center justify-content-around test__style rounded'
    //         key={status.id}
    //       >
    //         <div>Наименование: {status.statusTitle}</div>
    //         <div>Категория: {status.category.categoryTitle}</div>
    //         <BsPencilFill
    //           style={{ cursor: 'pointer' }}
    //           onClick={() => {
    //             dispatch(setCurrentType({ type: 'edit', id: status.id }));
    //           }}
    //         />
    //         <BsTrashFill
    //           style={{ cursor: 'pointer' }}
    //           onClick={() => {
    //             dispatch(setCurrentType({ type: 'delete', id: status.id }));
    //           }}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </>
  );
};

export default StatusesPage;
