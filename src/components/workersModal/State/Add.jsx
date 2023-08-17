import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { addWorker } from '../../../store/Workers/workersSaga';
import initPhoneMask from '../../../utils/phoneMask';

const Add = ({ onHide, data, status, isLoading }) => {
  const [phone, setPhone] = useState('');
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

  const handleChangePhone = () => {
    formik.values.phone = `+${phone.unmaskedValue}`;
  };

  useEffect(() => {
    setPhone(initPhoneMask());
  }, []);

  return (
    <>
      <p className='worker__title'>{t('workersModal.addTitle')}</p>
      {status === 'idle' && (
        <Form onSubmit={formik.handleSubmit}>
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
              onChange={handleChangePhone}
              onPaste={handleChangePhone}
              onInput={handleChangePhone}
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
          <div className='custom__modals-two-buttons'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('workersModal.buttonCreate')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('workersModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </Form>
      )}
      {status === 'success' && (
        <>
          <p>{t('workersModal.successCreateText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('workersModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('workersModal.failedText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('workersModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Add;
