import LanguageSwitcher from '@/components/LanguageSwitcher';
import { CircleUserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
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
		<header className="border-b bg-card text-card-foreground shadow-sm">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<div className="flex items-center space-x-4">
					<h1 className="text-xl font-semibold">{t('header.title')}</h1>
					<LanguageSwitcher />
				</div>

				<nav className="flex items-center space-x-4">
					<button
						onClick={() => navigate('/')}
						className="text-sm font-medium hover:text-primary transition-colors"
						aria-label={t('header.home')}
					>
						{t('header.home')}
					</button>
					<button
						onClick={navigateToFeatures}
						className="text-sm font-medium hover:text-primary transition-colors"
						aria-label={t('header.features')}
					>
						{t('header.features')}
					</button>
					<button
						onClick={() => navigate('/pricing')}
						className="text-sm font-medium hover:text-primary transition-colors"
						aria-label={t('header.pricing')}
					>
						{t('header.pricing')}
					</button>

					{/* Theme Toggle */}
					<button
						onClick={toggleTheme}
						className="text-sm font-medium p-2 rounded-full hover:bg-muted transition"
						aria-label="Toggle Theme"
					>
						{theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
					</button>

					{isLoggedIn ? (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant={'ghost'} size={'icon'} className='[&_svg]:size-8 size-7 rounded-full gap-0'>
										<CircleUserRound className='text-primary'/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent side='bottom' align="center" sideOffset={10}>
									<DropdownMenuItem onClick={() => navigate('/dashboard')}>
										{t('header.dropdown.dashboard')}
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => navigate('/profile')}>
										{t('header.dropdown.profile')}
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => navigate('/pricing')}>
										{t('header.dropdown.upgrade')}
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleLogout}>
										{t('header.dropdown.logout')}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<button
							onClick={() => navigate('/login')}
							className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary transition"
							aria-label={t('header.signIn')}
						>
							{t('header.signIn')}
						</button>
					)}
				</nav>
			</div>
		</header>
	)
};

export default Header;