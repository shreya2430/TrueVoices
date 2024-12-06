import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Team from './Team';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';



const LandingPage = () => {

    const location = useLocation();

  useEffect(() => {
    // Check if the location state contains `scrollTo`
    if (location.state?.scrollTo === 'features') {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Team />   
      <Footer />
    </div>
  );
};

export default LandingPage;