import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { updateCategory } from '../../../store/Categories/categoriesSaga';
import getSchema from '../../../utils/validation';
import { categoriesSelector } from '../../../store/Categories/categoriesSlice';

const Edit = ({ onHide, id, data, status, isLoading }) => {
  const currentCategory = useSelector((state) =>
    categoriesSelector.selectById(state, id)
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: getSchema('modifyCategory', t, data)(),
    initialValues: {
      categoryTitle: currentCategory.categoryTitle,
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (userData) => {
      const updateData = { ...userData, id: currentCategory.id };
      dispatch(updateCategory(updateData));
    },
  });

  return (
    <>
      <p className='category__title'>{t('categoriesModal.editTitle')}</p>
      {status === 'idle' && (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='categoryTitle' className='category__lables'>
              {t('categoriesModal.inputTitle')}
            </Form.Label>
            <Form.Control
              type='text'
              id='categoryTitle'
              isInvalid={
                formik.errors.categoryTitle && formik.touched.categoryTitle
              }
              onChange={formik.handleChange('categoryTitle')}
              value={formik.values.categoryTitle}
              onBlur={formik.handleBlur('categoryTitle')}
              className='category__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.categoryTitle}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='custom__modals-two-buttons'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('categoriesModal.buttonSave')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('categoriesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </Form>
      )}
      {status === 'success' && (
        <>
          <p>{t('categoriesModal.successEditText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('categoriesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('categoriesModal.failedText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('categoriesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Edit;
