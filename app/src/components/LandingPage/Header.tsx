import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="border-b bg-card text-card-foreground shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Title and LanguageSwitcher */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{t('header.title')}</h1>
          <LanguageSwitcher />
        </div>

        {/* Navbar */}
        <nav className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            aria-label={t('header.home')}
          >
            {t('header.home')}
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            aria-label={t('header.features')}
          >
            {t('header.features')}
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            aria-label={t('header.pricing')}
          >
            {t('header.pricing')}
          </a>
          <button
            onClick={() => navigate('/login')}
            className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition"
            aria-label={t('header.signIn')}
          >
            {t('header.signIn')}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;