const Footer = () => {
  return (
    <footer className="border-t py-4 mt-16">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <a href="#" className="text-sm text-gray-700 mx-4 hover:underline" aria-label="About page">
            About
          </a>
          <a href="#" className="text-sm text-gray-700 mx-4 hover:underline" aria-label="Privacy Policy page">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-700 mx-4 hover:underline" aria-label="Contact Us page">
            Contact Us
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} TrueVoices. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
