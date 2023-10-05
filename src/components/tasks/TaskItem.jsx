import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ButtonCustom } from '../shared';
import './TaskItem.css';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';

const getItemStyle = (isDragging) => ({
  background: isDragging ? 'AliceBlue' : '',
});
const handler = (item, dispatch) => {
  dispatch(openModal());
  dispatch(setCurrentType({ type: 'edit', id: item.id }));
};
const TaskItem = ({ item, snapshot }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    // ругается на кликабельный див(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='taskItem'
      style={getItemStyle(snapshot.isDragging)}
      onClick={(event) => {
        if (event.detail === 2) {
          handler(item, dispatch);
        }
      }}
    >
      <div
        style={{ backgroundColor: item.priority.color }}
        className='priority'
      />
      <div className='dataItem'>
        <div className='dataAddress'>
          <span className='dataTitle'>{t('tasksItem.address')}</span>{' '}
          {item.address}
        </div>
        <div className='dataContent'>
          <span className='dataTitle'>{t('tasksItem.client')}</span>{' '}
          {item.client.person.name}
        </div>
        <div className='dataContent'>
          <span className='dataTitle'>{t('tasksItem.phone')}</span>{' '}
          {item.client.person.phone}
        </div>
        <div className='dataComment'>
          <span className='dataTitle'>{t('tasksItem.comment')}</span>{' '}
          {item.comment}
        </div>
        <div className='dataContent'>
          <span className='dataTitle'>{t('tasksItem.date')}</span> {item.date}
        </div>
      </div>
      <ButtonCustom type='submit' className={{ buttons: true }}>
        {t('tasksItem.buttonNotification')}
      </ButtonCustom>
    </div>
  );
};
export default TaskItem;
