import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { updateClient } from '../../../store/Clients/clientsSaga';
import { clientsSelector } from '../../../store/Clients/clientsSlice';

const Add = ({ onHide, id, data, status, isLoading }) => {
  const currentClient = useSelector((state) =>
    clientsSelector.selectById(state, id)
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: getSchema('modifyClient', t, data)(),
    initialValues: {
      name: currentClient.person.name,
      company: currentClient.company,
      phone: currentClient.person.phone,
      email: currentClient.person.email,
      comment: currentClient.comment,
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (userData) => {
      const updateData = { ...userData, id: currentClient.id };
      dispatch(updateClient(updateData));
    },
  });
  return (
    <>
      <p className='client__title'>{t('clientsModal.editTitle')}</p>
      {status === 'idle' && (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='name' className='client__labels'>
              {t('clientsModal.inputName')}
            </Form.Label>
            <Form.Control
              type='text'
              id='name'
              isInvalid={formik.errors.name && formik.touched.name}
              onChange={formik.handleChange('name')}
              value={formik.values.name}
              onBlur={formik.handleBlur('name')}
              className='client__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='company' className='client__labels'>
              {t('clientsModal.inputCompany')}
            </Form.Label>
            <Form.Control
              type='text'
              id='company'
              isInvalid={formik.errors.company && formik.touched.company}
              onChange={formik.handleChange('company')}
              value={formik.values.company}
              onBlur={formik.handleBlur('company')}
              className='client__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.company}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='phone' className='client__labels'>
              {t('clientsModal.inputPhone')}
            </Form.Label>
            <Form.Control
              type='text'
              id='phone'
              isInvalid={formik.errors.phone && formik.touched.phone}
              onChange={formik.handleChange('phone')}
              value={formik.values.phone}
              onBlur={formik.handleBlur('phone')}
              className='client__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='email' className='client__labels'>
              {t('clientsModal.inputEmail')}
            </Form.Label>
            <Form.Control
              type='text'
              id='email'
              isInvalid={formik.errors.email && formik.touched.email}
              onChange={formik.handleChange('email')}
              value={formik.values.email}
              onBlur={formik.handleBlur('email')}
              className='client__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='comment' className='client__labels'>
              {t('clientsModal.inputComment')}
            </Form.Label>
            <Form.Control
              as='textarea'
              id='comment'
              isInvalid={formik.errors.comment && formik.touched.comment}
              onChange={formik.handleChange('comment')}
              value={formik.values.comment}
              onBlur={formik.handleBlur('comment')}
              className='client__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.comment}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='custom__modals-two-buttons'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('clientsModal.buttonSave')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('clientsModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </Form>
      )}
      {status === 'success' && (
        <>
          <p>{t('clientsModal.successEditText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('clientsModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('clientsModal.failedText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('clientsModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Add;
