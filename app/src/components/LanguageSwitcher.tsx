import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')} className="px-4 py-2 m-2 bg-blue-500 text-white rounded">
        English
      </button>
      <button onClick={() => changeLanguage('hi')} className="px-4 py-2 m-2 bg-green-500 text-white rounded">
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;