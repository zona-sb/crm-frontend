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

const OrdersPage = () => {
  const [idCategory, setIdCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const categories = useSelector(categoriesSelector.selectAll);
  const tasks = useSelector(tasksSelector.selectAll);

  const dispatch = useDispatch();

  useEffect(() => {
    if (idCategory !== null) {
      const objCategoryId = { id: idCategory };
      dispatch(getTasks(objCategoryId));
      setIsLoading(true);
    }
  }, [idCategory]);

  useEffect(() => {
    dispatch(getStatuses());
    dispatch(getCategories());
  }, []);
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
          disabled={isLoading}
          className={`navOrders ${isLoading ? 'notActive' : ''} ${
            idCategory === id ? 'activeCategory' : ''
          }`}
          href='#'
          key={id}
          onClick={() => setIdCategory(id)}
        >
          {categoryTitle}
        </button>
      ))}
      {tasks.length > 0 &&
        tasks[0].category.id === idCategory &&
        idCategory && (
          <DragAndDrop
            idCategory={idCategory}
            tasks={tasks}
            setIsLoading={setIsLoading}
          />
        )}
    </>
  );
};

export default OrdersPage;
