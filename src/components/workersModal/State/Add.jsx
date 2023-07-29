import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { addWorker } from '../../../store/Workers/workersSaga';

const Add = ({ onHide, data, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: getSchema('modifyWorkers', t, data)(),
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (userData) => {
      dispatch(addWorker(userData));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <p className='worker__title'>{t('workersModal.addTitle')}</p>
      {status === 'idle' && (
        <>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='name' className='worker__lables'>
              {t('workersModal.inputName')}
            </Form.Label>
            <Form.Control
              type='text'
              id='name'
              isInvalid={formik.errors.name && formik.touched.name}
              onChange={formik.handleChange('name')}
              value={formik.values.name}
              onBlur={formik.handleBlur('name')}
              className='worker__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='phone' className='worker__lables'>
              {t('workersModal.inputPhone')}
            </Form.Label>
            <Form.Control
              type='text'
              id='phone'
              isInvalid={formik.errors.phone && formik.touched.phone}
              onChange={formik.handleChange('phone')}
              value={formik.values.phone}
              onBlur={formik.handleBlur('phone')}
              className='worker__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='email' className='worker__lables'>
              {t('workersModal.inputEmail')}
            </Form.Label>
            <Form.Control
              type='text'
              id='email'
              isInvalid={formik.errors.email && formik.touched.email}
              onChange={formik.handleChange('email')}
              value={formik.values.email}
              onBlur={formik.handleBlur('email')}
              className='worker__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex justify-content-between'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('workersModal.buttonCreate')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('workersModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('workersModal.successCreateText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('workersModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('workersModal.failedText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('workersModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </Form>
  );
};

export default Add;
