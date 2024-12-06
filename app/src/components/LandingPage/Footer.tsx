import React from 'react';
import { useTranslation } from 'react-i18next';

// Define the type for footer links
type FooterLink = {
  text: string;
  href: string;
  ariaLabel: string;
};

const Footer = () => {
  const { t } = useTranslation();

  // Fetch links array and copyright text
  const links: FooterLink[] = t('footer.links', { returnObjects: true }) as FooterLink[];
  const copyright: string = t('footer.copyright', {
    year: new Date().getFullYear(),
  });

  return (
    <footer className="border-t bg-background py-4 ">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm text-gray-700 mx-4 hover:underline"
              aria-label={link.ariaLabel}
            >
              {link.text}
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">{copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;