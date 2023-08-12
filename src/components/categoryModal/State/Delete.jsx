import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { deleteCategory } from '../../../store/Categories/categoriesSaga';

const Delete = ({ onHide, id, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteCategory(id));
  };
  return (
    <div>
      <p className='category__title'>{t('categoriesModal.deleteTitle')}</p>
      {status === 'idle' && (
        <>
          <p>{t('categoriesModal.deleteText')}</p>
          <div className='custom__modals-two-buttons'>
            <ButtonCustom onClick={handleDelete} disabled={isLoading}>
              {t('categoriesModal.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('categoriesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('categoriesModal.successDeleteText')}</p>
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
    </div>
  );
};

export default Delete;
