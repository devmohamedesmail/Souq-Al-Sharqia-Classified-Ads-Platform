// import React from 'react'

// function Banner() {
//   return (
//     <div 
//       className=' container m-auto  flex flex-col md:flex-row items-center justify-center bg-contain md:bg-cover bg-no-repeat h-52 md:h-96 '
//       style={{backgroundImage: "url('/assets/images/banner.jpeg')"}}>

//     </div>
//   )
// }

// export default Banner



// import React from 'react';
// import { FaBullhorn, FaTags, FaUsers } from 'react-icons/fa';

// function Banner() {
//   return (
//     <div
//       className="container mx-auto my-8 rounded-2xl overflow-hidden relative flex items-center justify-center h-60 md:h-96 shadow-lg"
//       style={{ backgroundImage: "url('/assets/images/banner.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
//     >
     
//       <div className="absolute inset-0 bg-gradient-to-r from-main/80 via-sky-700/60 to-sky-400/60 opacity-90"></div>

 
//       <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4">
//         <div className="flex items-center justify-center gap-4 mb-4">
//           <FaBullhorn className="text-white text-4xl animate-bounce" />
//           <FaTags className="text-yellow-300 text-3xl animate-pulse" />
//           <FaUsers className="text-white text-3xl animate-bounce-slow" />
//         </div>
//         <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
//           Boost Your Business Today!
//         </h1>
//         <p className="text-white/90 text-base md:text-lg mb-4 max-w-2xl mx-auto drop-shadow">
//           Post your ad now and reach thousands of buyers and sellers in your area. It's fast, easy, and free!
//         </p>
//         <a
//           href="#post-ad"
//           className="inline-block bg-yellow-400 hover:bg-yellow-500 text-main font-bold px-8 py-3 rounded-full shadow-lg transition text-lg"
//         >
//           Post Your Ad Now
//         </a>
//       </div>

    
//       <img
//         src="/assets/images/megaphone.png"
//         alt=""
//         className="hidden md:block absolute left-8 bottom-4 w-24 h-24 opacity-80 animate-float"
//       />
//       <img
//         src="/assets/images/market.png"
//         alt=""
//         className="hidden md:block absolute right-8 top-4 w-24 h-24 opacity-80 animate-float-slow"
//       />
//     </div>
//   );
// }
// export default Banner;


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
      <div className="absolute inset-0 bg-gradient-to-r from-main/90 via-sky-700/70 to-second/90 opacity-90"></div>

      {/* Decorative floating images */}
      <img
        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80"
        alt="Megaphone"
        className="hidden md:block absolute left-8 bottom-4 w-24 h-24 rounded-full border-4 border-white shadow-lg opacity-90 animate-float"
      />
      <img
        src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80"
        alt="Market"
        className="hidden md:block absolute right-8 top-4 w-24 h-24 rounded-full border-4 border-white shadow-lg opacity-90 animate-float-slow"
      />

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