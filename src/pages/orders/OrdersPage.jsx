import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragAndDrop from '../../components/dragAndDrop/DragAndDrop';
import { getCategories, getTasks } from '../../store/Tasks/tasksSaga';
import { categoriesSelector } from '../../store/Categories/categoriesSlice';
import './OrdersPage.css';
import { getStatuses } from '../../store/Statuses/statusesSaga';
import { statusesSelector } from '../../store/Statuses/statusesSlice';
import TaskModal from '../../components/taskModal/TaskModal';
import { tasksSelector } from '../../store/Tasks/tasksSlice';

const OrdersPage = () => {
  const [idCategory, setIdCategory] = useState(null);
  const categories = useSelector(categoriesSelector.selectAll);
  const statuses = useSelector(statusesSelector.selectAll);
  const tasks = useSelector(tasksSelector.selectAll);
  const correctTasks = tasks.filter((task) => task.category.id === idCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    if (idCategory !== null) {
      const objCategoryId = { id: idCategory };
      dispatch(getTasks(objCategoryId));
    }
  }, [idCategory]);

  const correctStatuses = statuses
    .filter((item) => item.category.id === idCategory)
    .sort(({ id: id1 }, { id: id2 }) => id1 - id2);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getStatuses());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setIdCategory(categories[0].id);
    }
  }, [categories]);

  return (
    <>
      <TaskModal category={idCategory} />
      {categories.map(({ id, categoryTitle }) => (
        <button
          className={`navOrders ${idCategory === id ? 'activeCategory' : ''}`}
          href='#'
          key={id}
          onClick={() => setIdCategory(id)}
        >
          {categoryTitle}
        </button>
      ))}
      <DragAndDrop statuses={correctStatuses} tasks={correctTasks} />
    </>
  );
};

export default OrdersPage;
