import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="relative">
      <select
        onChange={handleLanguageChange}
        value={i18n.language}
        className="bg-gray-100 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 px-3 py-1 ml-29"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
};
export default LanguageSwitcher;