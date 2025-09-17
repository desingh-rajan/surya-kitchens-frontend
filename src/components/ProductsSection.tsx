'use client';

import Image from 'next/image';
import { products } from '@/data/products';

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-orange-100/60 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-2 h-full flex flex-col">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-60 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Quick View Button */}
        <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{product.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-orange-600">{product.price}</span>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(255,115,0,0.06),transparent_60%),radial-gradient(60%_60%_at_80%_90%,rgba(244,63,94,0.06),transparent_60%)] from-orange-50 via-rose-50 to-amber-50 bg-gradient-to-b scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-orange-600">Premium</span> Collection
          </h2>
          <p className="text-xl text-gray-700 dark:text-white/90 max-w-3xl mx-auto">
            Discover our handcrafted iron cookware collection, each piece carefully forged
            to bring authentic flavors and traditional cooking methods to your kitchen.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <button className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            View All Products
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm border border-orange-100/60 rounded-2xl">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-orange-200">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Handcrafted Excellence</h3>
            <p className="text-gray-700">Each piece is carefully forged by skilled artisans using traditional techniques passed down through generations.</p>
          </div>

          <div className="text-center p-6 bg-white/80 backdrop-blur-sm border border-orange-100/60 rounded-2xl">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-orange-200">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
            <p className="text-gray-700">Premium iron construction ensures durability and superior heat retention for authentic cooking experience.</p>
          </div>

          <div className="text-center p-6 bg-white/80 backdrop-blur-sm border border-orange-100/60 rounded-2xl">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-orange-200">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Health & Tradition</h3>
            <p className="text-gray-700">Iron cookware naturally enriches food with iron and maintains traditional cooking methods for healthier meals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;