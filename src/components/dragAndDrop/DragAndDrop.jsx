import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import './DragAndDrop.css';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import TaskItem from '../tasks/taskItem';
import { setCorrectStatus } from '../../store/Tasks/tasksSlice';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
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
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : '#FFF',
  overflow: 'auto',
  maxHeight: '90vh',
});

const DragAndDrop = (props) => {
  const { category, tasks } = props;
  const correctTaskStatuses = {};
  tasks.forEach((task) => {
    const currentTasks = correctTaskStatuses[task.status.id];
    correctTaskStatuses[task.status.id] = currentTasks
      ? [...currentTasks, task]
      : [task];
  });
  const arrayTasks = Object.values(correctTaskStatuses);
  const arrayStatuses = Object.keys(correctTaskStatuses);

  // const [state, setState] = useState([getItems(10), getItems(5, 10)]);
  const [state, setState] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    // console.log(tasks);
    setState(arrayTasks);
    setStatuses(arrayStatuses);
  }, [tasks]);
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    // if (sInd === dInd) {
    //   const items = reorder(state[sInd], source.index, destination.index);
    //   const newState = [...state];
    //   newState[sInd] = items;
    //   setState(newState);
    // } else {
    if (sInd !== dInd) {
      console.log(state[sInd]);
      console.log(statuses[sInd]);
      console.log(statuses[dInd]);
      const r = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = r[sInd];
      newState[dInd] = r[dInd];
      setState(newState);
    }
  };

  return (
    <div>
      <div className='boxDnD'>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <div key={ind}>
              <div className='droppable'>
                <div className='titleColumn'>{statuses[ind]}</div>
                <Droppable droppableId={`${ind}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      {el.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={`${item.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                }}
                              >
                                {item.content}
                                <button
                                  type='button'
                                  onClick={() => {
                                    const newState = [...state];
                                    newState[ind].splice(index, 1);
                                    setState(
                                      newState.filter((group) => group.length)
                                    );
                                  }}
                                >
                                  delete
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div className='d-flex'>
                  <button
                    className='custom__add-dnd-button'
                  // onClick={() => {
                  //   dispatch(openModal());
                  //   dispatch(setCurrentType({ type: 'add' }));
                  //   dispatch(setCorrectStatus(id));
                  // }}
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
  );
};
export default DragAndDrop;
