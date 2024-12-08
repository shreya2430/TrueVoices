import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Define the type for each feature
type Feature = {
  title: string;
  subtitle: string;
  description: string;
   isComingSoon: boolean;
};

const Features = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fetch features with type assertion
  const features: Feature[] = t('features', { returnObjects: true }) as Feature[];

  // Function to handle navigation based on login status
  const handleNavigation = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      // User is signed in, navigate to the route page
      navigate('/dashboard')
    } else {
      // User is not signed in, navigate to the register page
      navigate('/register');
    }
  };

 return (
    <section className="py-10 bg-background" id="features">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          {t('ourFeatures')} {/* Add a key for "Our Features" */}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col"
            >
              {/* Card Header */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.subtitle}
                </p>
              </div>

              {/* Card Content */}
              <div className="flex-1 mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-auto">
                {feature.isComingSoon ? (
                  <Button
                    disabled
                    className="w-full bg-gray-300 text-gray-980 cursor-not-allowed rounded-md py-2"
                  >
                    {t('comingSoon')} {/* Add a key for "Coming Soon" */}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2"
                    onClick={handleNavigation}
                  >
                    {t('tryForFree')} {/* Add a key for "Try it for Free" */}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;