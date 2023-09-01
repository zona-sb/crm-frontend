import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';

const ModalBulkDelete = ({
  onHide,
  partDelete,
  allDelete,
  flag,
  status,
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <p className='priority__title'>
        {flag
          ? t('modalBulkDelete.deleteAllTitle')
          : t('modalBulkDelete.deleteTitle')}
      </p>
      {status === 'idle' && (
        <>
          <p>
            {flag
              ? t('modalBulkDelete.deleteAllText')
              : t('modalBulkDelete.deleteText')}
          </p>
          <div className='custom__modals-two-buttons'>
            <ButtonCustom
              onClick={flag ? allDelete : partDelete}
              disabled={isLoading}
            >
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
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('modalBulkDelete.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('modalBulkDelete.failedText')}</p>
          <div className='custom__modals-button'>
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
