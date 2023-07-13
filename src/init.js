import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/auth.js';

import App from './App';
import resources from './locales/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  return (
    <AuthProvider>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default init;
