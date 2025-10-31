import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBullhorn, FaTags, FaUsers } from 'react-icons/fa';

function Banner() {

  const {t}=useTranslation()
  return (
    <div
      className="container mx-auto w-[99%]  my-8 rounded-2xl overflow-hidden relative flex items-center justify-center h-60 md:h-96 shadow-xl"
      style={{
        backgroundImage: "url('/assets/images/banner.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-main/90 via-sky-700/70 to-second/90 opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <FaBullhorn className="text-white text-4xl animate-bounce" />
          <FaTags className="text-yellow-300 text-3xl animate-pulse" />
          <FaUsers className="text-white text-3xl animate-bounce-slow" />
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg tracking-wide">
          
          {t('boost-your-business')}
        </h1>
        <p className="text-white/90 text-base md:text-lg mb-4 max-w-2xl mx-auto drop-shadow">
          
          {t('banner-title')}
        </p>
        <a
          href="#post-ad"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-main font-bold px-8 py-3 rounded-full shadow-lg transition text-lg animate-pulse"
        >
          {t('add_without_account')}
        </a>
      </div>
    </div>
  );
}

export default Banner;