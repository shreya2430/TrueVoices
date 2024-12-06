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
        className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] text-sm rounded-md focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--ring))] px-3 py-1"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;