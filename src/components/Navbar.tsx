'use client';

import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/25 backdrop-blur-xl supports-[backdrop-filter]:bg-black/25 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 py-2">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => scrollToSection('#home')}
            role="button"
            aria-label="Go to home"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/suryas-cookware-logo.png"
                alt="Surya's Cookware Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-yellow-600" style={{
              textShadow: '0 0 10px rgba(251, 191, 36, 0.3), 0 2px 3px rgba(0, 0, 0, 0.3)',
              filter: 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.2))'
            }}>
              Surya&apos;s Cookware
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white drop-shadow hover:text-orange-300 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <button className="bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors duration-200 shadow-sm cursor-pointer">
                Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-3 pt-2 pb-4 space-y-1 sm:px-4 bg-white/80 backdrop-blur-xl border-t border-white/30">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-900 hover:text-orange-600 block px-3 py-3 text-base font-medium w-full text-left transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <button className="bg-orange-600 text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors duration-200 w-full shadow-sm">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;