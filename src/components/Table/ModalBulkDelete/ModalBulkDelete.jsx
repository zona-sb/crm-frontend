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
              {t('modalBulkDelete.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('modalBulkDelete.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('modalBulkDelete.successDeleteText')}</p>
          <div className='custom__Priority-button'>
            <ButtonCustom onClick={onHide}>
              {t('modalBulkDelete.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('modalBulkDelete.failedText')}</p>
          <div className='custom__Priority-button'>
            <ButtonCustom onClick={onHide}>
              {t('modalBulkDelete.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default ModalBulkDelete;
