import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto text-center max-w-2xl">
        <h1 className="text-lg font-bold sm:text-5xl tracking-wide [word-spacing:0.2em]">
          {t('hero.title')}
        </h1>

        <p className="mt-6 font-bold text-xl tracking-wide [word-spacing:0.15em]">
          {t('hero.subtitle')}
        </p>

        <p className="mt-4 text-m text-muted-foreground [word-spacing:0.1em]">
          {t('hero.paragraph1')}
        </p>
        <p className="mt-2 text-m text-muted-foreground [word-spacing:0.1em]">
          {t('hero.paragraph2')}
        </p>

        <div className="mt-10 flex justify-center space-x-6">
          <button
            onClick={() => navigate('/register')}
            className="h-10 px-6 font-semibold rounded-md bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition"
          >
            {t('hero.buttonSignUp')}
          </button>
          <button
            className="h-10 px-5 font-semibold rounded-md shadow-md border border-primary text-primary hover:bg-primary/10 transition"
          >
            {t('hero.buttonLearnMore')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;