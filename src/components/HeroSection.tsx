'use client';

import Image from 'next/image';

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt="Cast iron cookware on rustic table"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="relative text-center lg:text-left z-10">
            {/* Glass overlay behind text (placed behind via negative z-index) */}
            <div className="pointer-events-none absolute -inset-x-4 -inset-y-4 lg:-left-6 lg:right-auto lg:w-[110%] rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] -z-10"></div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-sm">
              Traditional
              <span className="text-orange-600 block">Iron Cookware</span>
              <span className="text-2xl md:text-4xl font-medium text-white/90">
                Crafted with Passion
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Experience the authentic taste of traditional cooking with our handcrafted iron cookware.
              Each piece is meticulously forged using time-honored techniques, bringing the heritage of
              Indian kitchens to your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToProducts}
                className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Explore Products
              </button>
              <button className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-200">
                Learn Our Story
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-gray-600 text-sm">Handcrafted</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-orange-600">25+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="text-center lg:text-left col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-orange-600">5000+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative z-10 w-full max-w-[520px]">
              <div className="bg-white p-5 md:p-6 lg:p-8 rounded-3xl shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero-card.jpg"
                    alt="Cast iron mushrooms cooking"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 bg-orange-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-amber-200 rounded-full opacity-40"></div>

            {/* Floating Cards */}
            <div className="absolute top-4 -left-4 bg-white p-3 rounded-xl shadow-md hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">100% Natural</span>
              </div>
            </div>

            <div className="absolute bottom-4 -right-4 bg-white p-3 rounded-xl shadow-md hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Lifetime Durability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToProducts}
          className="text-orange-600 hover:text-orange-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;