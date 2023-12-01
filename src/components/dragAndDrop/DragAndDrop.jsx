import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragAndDrop.css';
import { useDispatch } from 'react-redux';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import TaskItem from '../tasks/TaskItem';
import { setCorrectStatus } from '../../store/Tasks/tasksSlice';
import { updateTask } from '../../store/Tasks/tasksSaga';

// const reorder = (list, startIndex, endIndex) => {если нужно будет перемещение в колонке
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : '',
  overflow: 'auto',
  maxHeight: '70vh',
  paddingRight: '8px',
  paddingLeft: '8px',
  marginRight: '9px',
});
const Row = ({ item, index }) => (
  <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <TaskItem item={item} snapshot={snapshot} />
        </div>
      </div>
    )}
  </Draggable>
);

const DragAndDrop = (props) => {
  const { idCategory, tasks, status, setIsLoading, isLoading } = props;
  const [state, setState] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const correctTaskStatuses = {};
  const dispatch = useDispatch();

  useEffect(() => {
    const statuses1 = status
      .filter((item) => item.category.id === idCategory)
      .sort(({ id: id1 }, { id: id2 }) => id1 - id2);
    const arrayStatuses = statuses1.map(({ id, statusTitle }) => {
      correctTaskStatuses[id] = [];
      return { id, statusTitle };
    });
    setStatuses(arrayStatuses);
    tasks.forEach((task) => {
      const currentTasks = correctTaskStatuses[task.status.id];
      correctTaskStatuses[task.status.id] = currentTasks
        ? [...currentTasks, task]
        : [task];
    });
    const arrayTasks = Object.values(correctTaskStatuses);
    arrayTasks.forEach((arr) => {
      arr.sort(
        ({ priority: { weight: w1 } }, { priority: { weight: w2 } }) => w1 - w2
      );
    });
    setState(arrayTasks);
    setIsLoading(false);
  }, [tasks]);
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    // if (sInd === dInd) { если нужно будет перемещение в колонке
    //   const items = reorder(state[sInd], source.index, destination.index);
    //   const newState = [...state];
    //   newState[sInd] = items;
    //   setState(newState);
    // } else {
    if (sInd !== dInd) {
      const reorderTask = state[sInd][source.index];
      const taskData = {
        id: reorderTask.id,
        address: reorderTask.address,
        date: reorderTask.date,
        operationNumber: reorderTask.operationNumber ?? '',
        comment: reorderTask.comment,
        completed: reorderTask.completed,
        categoryId: reorderTask.category.id,
        priorityId: reorderTask.priority.id,
        clientId: reorderTask.client.id,
        statusId: +statuses[dInd].id,
      };
      dispatch(updateTask(taskData));
      const r = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = r[sInd];
      newState[dInd] = r[dInd];
      setState(newState);
    }
  };

  return (
    !isLoading && (
      <div>
        <div className='boxDnD'>
          <DragDropContext onDragEnd={onDragEnd}>
            {state.map((el, ind) => (
              <div key={statuses[ind].id}>
                <div className='droppable'>
                  <div className='titleColumn'>{`${statuses[ind].statusTitle} (${el.length})`}</div>
                  <Droppable droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {el.map((item, index) => (
                          <Row key={item.id} item={item} index={index} />
                        ))}
                        <div
                          style={{
                            minHeight: '5px',
                          }}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className='d-flex'>
                    <button
                      className='custom__add-dnd-button'
                      onClick={() => {
                        dispatch(openModal());
                        dispatch(setCurrentType({ type: 'add' }));
                        dispatch(setCorrectStatus(statuses[ind].id));
                      }}
                    >
                      + Добавить задачу
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>
    )
  );
};
export default DragAndDrop;
