import { Link, usePage } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaUser, FaHome, FaPlusCircle, FaHeart, FaEllipsisH } from 'react-icons/fa';

function BottomNavbar() {
  const {t}=useTranslation();
  const {auth}:any=usePage().props;
  return (
   
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden ">
      <div className="backdrop-blur-md bg-white/90 border-t border-gray-200 shadow-lg flex justify-between items-center px-2 py-4">
        
         {/* Home */}
        <Link
          href="/"
          className="flex flex-col items-center text-gray-500 hover:text-main transition-colors duration-200 flex-1"
        >
          <FaHome className="text-base mb-0.5" />
          <span className="text-[10px] font-medium">{t('home')}</span>
        </Link>
        
        {/* Account */}
        <Link
          href={auth.user ? '/account/page/' : '/login'}
          className="flex flex-col items-center text-gray-500 hover:text-main transition-colors duration-200 flex-1"
        >
          <FaUser className="text-base mb-0.5" />
          <span className="text-[10px] font-medium">{t('my-account')}</span>
        </Link>
       
        {/* Add Post (center, standout) */}
        <Link
          href="/post/new/ads"
          className="relative -mt-6 bg-main rounded-full p-1 shadow-xl flex flex-col items-center text-white hover:bg-main/90 transition-all duration-200 border-4 border-white flex-1"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
        >
          <FaPlusCircle className="text-lg mb-0.5" />
          <span className="text-[10px] font-medium">{t('add-ad')}</span>
        </Link>
        {/* Favorites */}
        <Link
          href="/show/favourites/page"
          className="flex flex-col items-center text-gray-500 hover:text-main transition-colors duration-200 flex-1"
        >
          <FaHeart className="text-base mb-0.5" />
          <span className="text-[10px] font-medium">{t('my-favourite')}</span>
        </Link>
        {/* More */}
        <Link 
          href={route('show.all.ads')}
          className="flex flex-col items-center text-gray-500 hover:text-main transition-colors duration-200 flex-1"
        >
          <FaEllipsisH className="text-base mb-0.5" />
          <span className="text-[10px] font-medium">{t('all-ads')}</span>
        </Link>
      </div>
    </div>
  )
}

export default BottomNavbar