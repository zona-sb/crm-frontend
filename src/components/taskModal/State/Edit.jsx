import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { getClients } from '../../../store/Clients/clientsSaga';
import { clientsSelector } from '../../../store/Clients/clientsSlice';
import { prioritiesSelector } from '../../../store/Priorities/prioritiesSlice';
import { getPriorities } from '../../../store/Priorities/prioritiesSaga';
import { tasksSelector } from '../../../store/Tasks/tasksSlice';
import { updateTask } from '../../../store/Tasks/tasksSaga';
import { openModal, setCurrentType } from '../../../store/Modal/ModalSlice';

const Edit = ({ onHide, id, status, isLoading }) => {
  const currentTask = useSelector((state) =>
    tasksSelector.selectById(state, id)
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const clients = useSelector(clientsSelector.selectAll);
  const priorities = useSelector(prioritiesSelector.selectAll);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getPriorities());
  }, [dispatch]);

  const formik = useFormik({
    validationSchema: getSchema('modifyTask', t)(),
    initialValues: {
      address: currentTask.address,
      date: currentTask.date,
      operationNumber: currentTask.operationNumber ?? '',
      comment: currentTask.comment ?? '',
      completed: currentTask.completed,
      statusId: currentTask.status.id,
      categoryId: currentTask.category.id,
      priorityId: currentTask.priority.id,
      clientId: currentTask.client.id,
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (taskData) => {
      const updateData = { ...taskData, id: currentTask.id };
      dispatch(updateTask(updateData));
    },
  });

  return (
    <>
      <p className='task__title'>
        {t('tasksModal.editTitle')}
        {status === 'idle' && (
          <ButtonCustom
            color='reject'
            style={{
              width: '30%',
            }}
            onClick={onHide}
          >
            {t('tasksModal.buttonCancel')}
          </ButtonCustom>
        )}
      </p>
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
              value={formik.values.address}
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
              {t('tasksModal.buttonSave')}
            </ButtonCustom>
            <ButtonCustom
              color=''
              style={{
                backgroundColor: '#8B0000',
              }}
              onClick={() => {
                dispatch(openModal());
                dispatch(
                  setCurrentType({ type: 'delete', id: currentTask.id })
                );
              }}
            >
              {t('tasksModal.buttonDelete')}
            </ButtonCustom>
          </div>
        </Form>
      )}
      {status === 'success' && (
        <>
          <p>{t('tasksModal.successEditText')}</p>
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

export default Edit;
