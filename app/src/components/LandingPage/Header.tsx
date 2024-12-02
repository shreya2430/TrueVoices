import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="border-b bg-card text-card-foreground shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold">TrueVoices</h1>

        <nav className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            aria-label="Go to Home"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            aria-label="Go to Features"
          >
            Features
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            aria-label="Go to Pricing"
          >
            Pricing
          </a>
          <button
            onClick={() => navigate('/login')}
            className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition"
            aria-label="Sign In"
          >
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
