import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { addStatus } from '../../../store/Statuses/statusesSaga';
import { categoriesSelector } from '../../../store/Categories/categoriesSlice';
import arrowDropdown from '../../../assets/icons/arrowDropdown.svg';

const Add = ({ onHide, data, status, isLoading }) => {
  const categories = useSelector(categoriesSelector.selectAll);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: getSchema('modifyStatus', t, data)(),
    initialValues: {
      statusTitle: '',
      categoryId: categories[0].id,
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (userData) => {
      dispatch(addStatus(userData));
    },
  });
  return (
    <>
      <p className='status__title'>{t('statusesModal.addTitle')}</p>
      {status === 'idle' && (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='statusTitle' className='status__labels'>
              {t('statusesModal.inputTitle')}
            </Form.Label>
            <Form.Control
              type='text'
              id='statusTitle'
              isInvalid={
                formik.errors.statusTitle && formik.touched.statusTitle
              }
              onChange={formik.handleChange('statusTitle')}
              value={formik.values.statusTitle}
              onBlur={formik.handleBlur('statusTitle')}
              className='status__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.statusTitle}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='categoryId' className='status__labels'>
              {t('statusesModal.category')}
            </Form.Label>
            <Form.Control
              as='select'
              id='categoryId'
              onChange={formik.handleChange('categoryId')}
              value={formik.values.categoryId}
              className='status__input'
            >
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.categoryTitle}
                </option>
              ))}
            </Form.Control>
            <img
              className='status__arrow'
              src={arrowDropdown}
              alt='Выпадающий список'
            />
          </Form.Group>

          <div className='d-flex justify-content-between'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('statusesModal.buttonCreate')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('statusesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </Form>
      )}
      {status === 'success' && (
        <>
          <p>{t('statusesModal.successCreateText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('statusesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('statusesModal.failedText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('statusesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Add;
