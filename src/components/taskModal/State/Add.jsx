import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { addTask } from '../../../store/Tasks/tasksSaga';
import { clientsSelector } from '../../../store/Clients/clientsSlice';
import { getClients } from '../../../store/Clients/clientsSaga';
import { prioritiesSelector } from '../../../store/Priorities/prioritiesSlice';
import { getPriorities } from '../../../store/Priorities/prioritiesSaga';

const Add = ({ onHide, data, status, isLoading, categoryId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const clients = useSelector(clientsSelector.selectAll);
  const priorities = useSelector(prioritiesSelector.selectAll);
  const statusId = useSelector((state) => state.tasks.setCorrectStatus);
  // console.log(priorities);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getPriorities());
  }, [dispatch]);

  const formik = useFormik({
    validationSchema: getSchema('modifyTask', t, data)(),
    initialValues: {
      address: '',
      date: '',
      operationNumber: '',
      comment: '',
      completed: false,
      statusId,
      categoryId,
      priorityId: '',
      clientId: '',
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (taskData) => {
      console.log(taskData);
      dispatch(addTask(taskData));
    },
  });
  // useEffect(
  //   () => console.log(formik.values.clientId),
  //   [formik.values.clientId]
  // );
  useEffect(() => {
    formik.values.clientId = clients[0] ? clients[0].id : '';
    formik.values.priorityId = priorities[0] ? priorities[0].id : '';
  });
  return (
    <>
      <p className='task__title'>{t('tasksModal.addTitle')}</p>
      {status === 'idle' && (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='address' className='task__labels'>
              {t('tasksModal.inputAddress')}
            </Form.Label>
            <Form.Control
              type='text'
              id='address'
              isInvalid={formik.errors.address && formik.touched.address}
              onChange={formik.handleChange('address')}
              value={formik.values.name}
              onBlur={formik.handleBlur('address')}
              className='task__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='date' className='task__labels'>
              {t('tasksModal.inputDate')}
            </Form.Label>
            <Form.Control
              type='date'
              id='date'
              isInvalid={formik.errors.date && formik.touched.date}
              onChange={formik.handleChange('date')}
              value={formik.values.date}
              onBlur={formik.handleBlur('date')}
              className='task__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='clientId' className='task__labels'>
              {t('tasksModal.clientId')}
            </Form.Label>
            <Form.Control
              as='select'
              id='clientId'
              onChange={formik.handleChange('clientId')}
              value={formik.values.clientId}
              className='task__input task__input-select'
            >
              {clients.map((client) => (
                <option value={client.id} key={client.id}>
                  {client.person.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='priorityId' className='task__labels'>
              {t('tasksModal.clientId')}
            </Form.Label>
            <Form.Control
              as='select'
              id='priorityId'
              onChange={formik.handleChange('priorityId')}
              value={formik.values.priorityId}
              className='task__input task__input-select'
            >
              {priorities.map((priority) => (
                <option value={priority.id} key={priority.id}>
                  {priority.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='operationNumber' className='task__labels'>
              {t('tasksModal.inputOperationNumber')}
            </Form.Label>
            <Form.Control
              type='number'
              id='operationNumber'
              isInvalid={
                formik.errors.operationNumber && formik.touched.operationNumber
              }
              onChange={formik.handleChange('operationNumber')}
              value={formik.values.operationNumber}
              onBlur={formik.handleBlur('operationNumber')}
              className='task__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.operationNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='comment' className='task__labels'>
              {t('tasksModal.inputComment')}
            </Form.Label>
            <Form.Control
              as='textarea'
              id='comment'
              isInvalid={formik.errors.comment && formik.touched.comment}
              onChange={formik.handleChange('comment')}
              value={formik.values.comment}
              onBlur={formik.handleBlur('comment')}
              className='task__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.comment}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='completed' className='task__labels'>
              {t('tasksModal.inputCompleted')}
            </Form.Label>
            <Form.Check
              type='checkbox'
              id='completed'
              onChange={formik.handleChange('completed')}
              value={formik.values.completed}
              onBlur={formik.handleBlur('completed')}
              className='task__check'
            />
            {formik.values.completed && (
              <div type='invalid'>{t('tasksModal.completed')}</div>
            )}
          </Form.Group>

          <div className='custom__modals-two-buttons'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('tasksModal.buttonCreate')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('tasksModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </Form>
      )}
      {status === 'success' && (
        <>
          <p>{t('tasksModal.successCreateText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('tasksModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('tasksModal.failedText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('tasksModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Add;
