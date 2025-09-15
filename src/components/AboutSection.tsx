'use client';

import Image from 'next/image';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Crafting <span className="text-orange-600">Tradition</span>
              <br />Since Generations
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Surya Kitchens, we believe that the best flavors come from the heart of tradition.
              For over two decades, our family has been dedicated to preserving the ancient art of
              iron cookware crafting, bringing you authentic pieces that connect you to the roots
              of Indian cooking.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Heritage Craftsmanship</h3>
                  <p className="text-gray-600">Every piece is handforged using techniques passed down through generations of skilled artisans.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality Iron</h3>
                  <p className="text-gray-600">We source only the finest quality iron to ensure durability and superior cooking performance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Practices</h3>
                  <p className="text-gray-600">Our eco-friendly manufacturing process respects both tradition and the environment.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors duration-200">
                Learn More About Us
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-orange-600 hover:text-orange-600 transition-colors duration-200">
                View Our Process
              </button>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Main Image */}
            <div className="relative z-10 w-full max-w-[560px]">
              <Image
                src="/images/about-main.jpg"
                alt="Traditional Iron Cookware Crafting"
                width={560}
                height={640}
                className="rounded-3xl object-cover shadow-xl"
              />
            </div>

            {/* Overlay Image */}
            <div className="absolute -bottom-6 -left-6 z-20">
              <div className="bg-white p-3 rounded-2xl shadow-lg">
                <Image
                  src="/images/about-overlay.jpg"
                  alt="Artisan at Work"
                  width={180}
                  height={180}
                  className="rounded-xl object-cover"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 md:w-32 md:h-32 bg-orange-200 rounded-full opacity-30"></div>
            <div className="absolute top-1/2 -right-4 w-16 h-16 md:w-20 md:h-20 bg-amber-200 rounded-full opacity-40"></div>

            {/* Stats Card */}
            <div className="absolute top-6 -left-6 bg-white p-5 rounded-xl shadow-md z-20">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">25+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-100">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">5000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-gray-600">Product Varieties</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-600">Handcrafted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;