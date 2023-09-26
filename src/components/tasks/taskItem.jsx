import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../shared';
import './TaskItem.css';

function getStyle({ provided, style, isDragging }) {
  const combined = {
    ...style,
    ...provided.draggableProps.style,
  };
  // console.log(combined.height);
  const marginBottom = 20;
  const withSpacing = {
    ...combined,
    height: isDragging ? combined.height : combined.height - marginBottom,
    width: '300px',
    marginBottom,
  };
  return withSpacing;
}
const TaskItem = ({ provided, item, style, isDragging }) => (
  // console.log(item);
  // const { t } = useTranslation();
  <div
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}
    style={getStyle({ provided, style, isDragging })}
    className='taskItem'
  // className={`taskItem item ${isDragging ? 'is-dragging' : ''}`}
  >
    <div className='priority' />
    <div className='dataItem'>
      <div className='dataAddress'>
        <span className='dataTitle'>Адрес:</span> {item.address}
      </div>
      <div className='dataContent'>
        <span className='dataTitle'>Клиент:</span> {item.client.person.name}
      </div>
      <div className='dataContent'>
        <span className='dataTitle'>Телефон:</span> {item.client.person.phone}
      </div>
      <div className='dataComment'>
        <span className='dataTitle'>Комментарий:</span> {item.comment}
      </div>
      <div className='dataContent'>
        <span className='dataTitle'>Дата взаимодействия:</span> {item.date}
      </div>
    </div>
    <ButtonCustom type='submit' className={{ buttons: true }}>
      Отправить уведомление
    </ButtonCustom>
    {/* {item.content} */}
  </div>
);
export default TaskItem;
