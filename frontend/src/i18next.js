import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

i18next
  .use(initReactI18next)
  .init({
    resources, // передаем переводы текстов интерфейса в формате JSON
    lng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // экранирование уже есть в React, поэтому отключаем
    },
  });

export default i18next;
