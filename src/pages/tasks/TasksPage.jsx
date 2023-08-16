import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routes } from '../../utils/routes';
import './TasksPage.css';

const TasksPage = () => {
  const [activeLink, setActiveLink] = useState('categories');

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    navigate(routes.categories());
  }, []);

  return (
    <>
      <nav className='tasks_link_list'>
        <NavLink
          className={
            activeLink === 'categories' ? 'tasks_link-active' : 'tasks_link'
          }
          onClick={() => handleLinkClick('categories')}
          to={routes.categories()}
        >
          {t('navigation.categories')}
        </NavLink>
        <NavLink
          className={
            activeLink === 'statuses' ? 'tasks_link-active' : 'tasks_link'
          }
          onClick={() => handleLinkClick('statuses')}
          to={routes.statuses()}
        >
          {t('navigation.statuses')}
        </NavLink>
        <NavLink
          className={
            activeLink === 'priorities' ? 'tasks_link-active' : 'tasks_link'
          }
          onClick={() => handleLinkClick('priorities')}
          to={routes.priorities()}
        >
          {t('navigation.priorities')}
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default TasksPage;
