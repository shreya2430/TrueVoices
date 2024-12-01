import { Button } from '../ui/button';

const features = [
  {
    title: 'Collect and Display Testimonials',
    subtitle: 'All in one solution',
    description: 'Create a dedicated landing page for your business. Share the page link easily via email, social media, or SMS. Setup can be done in two minutes.',
  },
  {
    title: 'Easy to Manage',
    subtitle: 'A dashboard to manage all testimonials',
    description: 'You will have a simple & clean dashboard to manage all testimonials in one place. It\'s like your email inbox, but designed for your social proof!',
  },
  {
    title: 'Track the Metrics',
    subtitle: 'Understand how video testimonials are performing',
    description: 'Track metrics from all embedded videos, help your marketing team understand performance, and promote the best-performing videos.',
    note: '* Available in the Ultimate plan',
  },
  {
    title: 'More Social Proof',
    subtitle: 'Not only text and video testimonials',
    description: 'Manage testimonials from social media, video platforms, and review sites in a single place!',
  },
  {
    title: 'Embed the Wall of Love',
    subtitle: 'The best testimonials all in one place',
    description: 'Showcase all your favorite testimonials. Embed it on your website in under a minute with no coding knowledge required!',
  },
];

const Features = () => {
  return (
    <section className="py-7" id="features">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border shadow-xl flex flex-col bg-white dark:bg-gray-800"
            >
              {/* Card Header */}
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
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
                <Button color="primary" className="w-full">
                  Try it for Free
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
