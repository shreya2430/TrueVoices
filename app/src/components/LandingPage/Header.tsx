import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Apply theme on initial render and whenever it changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsLoggedIn(!!user.token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const navigateToFeatures = () => {
    navigate('/', { state: { scrollTo: 'features' } });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <header className="border-b bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{t('header.title')}</h1>
          <LanguageSwitcher />
        </div>

        <nav className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors" aria-label={t('header.home')}>
            {t('header.home')}
          </button>
          <button onClick={navigateToFeatures} className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors" aria-label={t('header.features')}>
            {t('header.features')}
          </button>
          <button onClick={() => navigate('/pricing')} className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors" aria-label={t('header.pricing')}>
            {t('header.pricing')}
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-sm font-medium p-2 rounded-full hover:bg-[hsl(var(--muted))] transition" aria-label="Toggle Theme">
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="flex items-center justify-center w-10 h-10 rounded-full text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))] transition" aria-label={t('header.profile')}>
                <FaUserCircle size={32} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] rounded shadow-lg">
                  <button onClick={() => navigate('/route')} className="block w-full px-4 py-2 text-sm text-left hover:bg-[hsl(var(--muted))]">
                    {t('header.dropdown.dashboard')}
                  </button>
                  <button onClick={() => navigate('/profile')} className="block w-full px-4 py-2 text-sm text-left hover:bg-[hsl(var(--muted))]">
                    {t('header.dropdown.profile')}
                  </button>
                  <button onClick={() => navigate('/pricing')} className="block w-full px-4 py-2 text-sm text-left hover:bg-[hsl(var(--muted))]">
                    {t('header.dropdown.upgrade')}
                  </button>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-left hover:bg-[hsl(var(--muted))]">
                    {t('header.dropdown.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="rounded-lg border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] shadow hover:bg-[hsl(var(--primary))] transition" aria-label={t('header.signIn')}>
              {t('header.signIn')}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;