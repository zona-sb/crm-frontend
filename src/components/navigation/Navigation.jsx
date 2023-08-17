import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import { routes } from '../../utils/routes';
import account from '../../assets/icons/account.svg';
import './Navigation.css';

const Navigation = () => {
  const [activeLink, setActiveLink] = useState('');
  const [burgerMenu, setBurgerMenu] = useState(false);

  const { t } = useTranslation();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (burgerMenu) {
      setBurgerMenu(false);
    }
  };

  const handleBurgerClick = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <div className='main_container'>
      <header className='header'>
        <nav className='navigation'>
          <input
            className='navigation_search'
            type='search'
            placeholder={t('navigation.search')}
          />
          <ul className={burgerMenu ? 'link_list-burger' : 'link_list'}>
            <li>
              <NavLink
                className={activeLink === 'orders' ? 'link-active' : 'link'}
                onClick={() => handleLinkClick('orders')}
                to='#'
              >
                {t('navigation.orders')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={activeLink === 'archive' ? 'link-active' : 'link'}
                onClick={() => handleLinkClick('archive')}
                to='#'
              >
                {t('navigation.archive')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={activeLink === 'clients' ? 'link-active' : 'link'}
                onClick={() => handleLinkClick('clients')}
                to={routes.clients()}
              >
                {t('navigation.clients')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={activeLink === 'workers' ? 'link-active' : 'link'}
                onClick={() => handleLinkClick('workers')}
                to={routes.workers()}
              >
                {t('navigation.workers')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={activeLink === 'tasks' ? 'link-active' : 'link'}
                onClick={() => handleLinkClick('tasks')}
                to={routes.tasks()}
              >
                {t('navigation.tasks')}
              </NavLink>
            </li>
            <li>
              <button className='account' type='button'>
                <img src={account} alt={t('navigation.alt_account')} />
              </button>
            </li>
          </ul>
          <button className='burger-btn' onClick={() => handleBurgerClick()}>
            {burgerMenu ? (
              <AiOutlineClose size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navigation;
