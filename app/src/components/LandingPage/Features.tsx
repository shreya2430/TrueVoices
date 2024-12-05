import React from 'react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

// Define the type for each feature
type Feature = {
  title: string;
  subtitle: string;
  description: string;
  note?: string | null;
};

const Features = () => {
  const { t } = useTranslation();

  // Fetch features with type assertion
  const features: Feature[] = t('features', { returnObjects: true }) as Feature[];
  
  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900" id="features">
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
                {feature.note && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {feature.note}
                  </p>
                )}
              </div>

              {/* Call to Action */}
              <div className="mt-auto">
                <Button
                  color="primary"
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2"
                >
                  {t('tryForFree')} {/* Add a key for "Try it for Free" */}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;