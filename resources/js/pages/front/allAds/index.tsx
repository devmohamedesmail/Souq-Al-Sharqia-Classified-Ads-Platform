import BottomNavbar from '@/components/front/BottomNavbar'
import Footer from '@/components/front/Footer'
import MiddleHeader from '@/components/front/MiddleHeader'
import TopHeader from '@/components/front/TopHeader'



import React, { useState } from 'react'

import AdItemHorzintal from '@/components/items/AdItemHorzintal'
import CategoriesSideBar from '@/components/front/CategoriesSideBar'
import { useTranslation } from 'react-i18next'
import DrawerCategories from '@/components/front/DrawerCategories'
import { Head } from '@inertiajs/react'

function AllAds({ ads, categories }: any) {
  const { t } = useTranslation()


  return (
    <div className="min-h-screen bg-gray-50">
      <Head title={t('allAds')} />
      <TopHeader />
      <MiddleHeader />


      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content  flex justify-end container mx-auto px-2 py-4">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-main to-blue-600 text-white font-semibold shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {t('categories')}
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <DrawerCategories categories={categories} ads={ads} />
          </ul>

        </div>
      </div>


      <div className="container mx-auto px-2 py-8 flex flex-col md:flex-row gap-8">


        {/* Categories Sidebar */}
        <CategoriesSideBar categories={categories} ads={ads} />

        {/* Optionally, you can show all ads in a grid on the left/main area */}
        <main className="flex-1 order-1 md:order-2 overflow-hidden">
          <h1 className="text-2xl font-bold text-main mb-6 text-center">كل الإعلانات</h1>
          <div className="flex flex-col gap-6">
            {ads.length === 0 && (
              <div className="text-center text-gray-400 py-12 text-lg">لا توجد إعلانات حالياً</div>
            )}
            {ads.map((ad: any) => (
              <AdItemHorzintal key={ad.id} ad={ad} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
      <BottomNavbar />
    </div>
  )
}

export default AllAds