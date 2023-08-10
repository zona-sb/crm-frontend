import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';

const ModalBulkDelete = ({ onHide, bulkDelete, status, isLoading }) => {
  const { t } = useTranslation();
  return (
    <>
      <p className='priority__title'>{t('modalBulkDelete.deleteTitle')}</p>
      {status === 'idle' && (
        <>
          <p>{t('modalBulkDelete.deleteText')}</p>
          <div className='custom__Priority-many-buttons'>
            <ButtonCustom onClick={bulkDelete} disabled={isLoading}>
              {t('prioritiesModal.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('prioritiesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('prioritiesModal.successDeleteText')}</p>
          <div className='custom__Priority-button'>
            <ButtonCustom onClick={onHide}>
              {t('prioritiesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('prioritiesModal.failedText')}</p>
          <div className='custom__Priority-button'>
            <ButtonCustom onClick={onHide}>
              {t('prioritiesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default ModalBulkDelete;
