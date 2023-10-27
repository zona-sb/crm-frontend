import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragAndDrop from '../../components/dragAndDrop/DragAndDrop';
import { getTasks } from '../../store/Tasks/tasksSaga';
import { categoriesSelector } from '../../store/Categories/categoriesSlice';
import './OrdersPage.css';
import { getStatuses } from '../../store/Statuses/statusesSaga';
import TaskModal from '../../components/taskModal/TaskModal';
import { tasksSelector } from '../../store/Tasks/tasksSlice';
import { getCategories } from '../../store/Categories/categoriesSaga';
import { statusesSelector } from '../../store/Statuses/statusesSlice';

const OrdersPage = () => {
  const [idCategory, setIdCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const categories = useSelector(categoriesSelector.selectAll);
  const status = useSelector(statusesSelector.selectAll);
  const tasks = useSelector(tasksSelector.selectAll);

  const dispatch = useDispatch();

  useEffect(() => {
    if (idCategory !== null) {
      const objCategoryId = { id: idCategory };
      const f = async () => {
        await dispatch(getTasks(objCategoryId));
        dispatch(getStatuses());
        setIsLoading(true);
      };
      f();
    }
  }, [idCategory]);

  useEffect(() => {
    dispatch(getStatuses());
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    if (categories.length > 0) {
      dispatch(getTasks({ id: categories[0].id }));
      setIdCategory(categories[0].id);
    }
  }, [categories]);

  return (
    <>
      <TaskModal category={idCategory} />
      {categories.map(({ id, categoryTitle }) => (
        <button
          disabled={idCategory === id ? false : isLoading}
          className={`navOrders ${
            isLoading && idCategory !== id ? 'notActive' : ''
          } ${idCategory === id ? 'activeCategory' : ''}`}
          href='#'
          key={id}
          onClick={() => {
            setIsLoading(true);
            setIdCategory(id);
          }}
        >
          {categoryTitle}
        </button>
      ))}
      {idCategory && (
        <DragAndDrop
          idCategory={idCategory}
          tasks={tasks}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          status={status}
        />
      )}
    </>
  );
};

export default OrdersPage;
