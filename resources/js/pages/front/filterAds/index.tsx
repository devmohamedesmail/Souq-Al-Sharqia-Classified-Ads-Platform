import BottomNavbar from '@/components/front/BottomNavbar'
import Footer from '@/components/front/Footer'
import MiddleHeader from '@/components/front/MiddleHeader'
import TopHeader from '@/components/front/TopHeader'
import React, { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from '@inertiajs/react'
import AdItemHorzintal from '@/components/items/AdItemHorzintal'
import { useTranslation } from 'react-i18next'

function FilterAds({ place, category, subcategory, ads }: any) {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      <TopHeader />
      <MiddleHeader />
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">

          {/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}


          <div className='flex justify-between container m-auto mt-5 px-4'>
            {/* <p>{place?.name}</p> */}
            <p className="inline-flex items-center gap-2 bg-main/10 text-main font-extrabold text-sm px-6 py-2 rounded-full shadow-md border border-main/20 my-4">
              <svg className="w-5 h-5 text-main" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              {place?.name}
            </p>
            <label
              htmlFor="my-drawer"
              className="inline-flex items-center gap-2 text-xs bg-gradient-to-r from-main to-sky-400 text-white font-bold py-2 px-6 rounded-full shadow-lg cursor-pointer hover:from-sky-400 hover:to-main hover:scale-105 transition-all duration-200 "
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {t('show-subcategories')}
            </label>
          </div>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <div className="bg-gradient-to-br from-main/10 to-sky-100 rounded-2xl shadow-xl p-0 mb-6 sticky top-8 overflow-hidden border border-main/10">
              <div className="bg-gradient-to-r from-main to-sky-400 py-5 px-4 text-center">
                <h2 className="text-white font-extrabold text-xl tracking-wide drop-shadow">
                  {category ? (category.title_ar || category.title_en) : "التصنيفات الفرعية"}
                </h2>
              </div>
              <ul className="space-y-1 py-4 px-2">
                <li>
                  <button
                    className={`
            w-full text-right px-4 py-2 rounded-lg font-bold
            bg-white/80 hover:bg-main/10 text-main shadow-sm
            transition-all duration-200 border border-transparent hover:border-main
          `}
                  >
                    الكل
                  </button>
                </li>
                {category.subcategories.map((sub: any) => (
                  <li key={sub.id}>
                    <Link
                      href={route('filter', {
                        place_slug: place?.slug ? place.slug : 0,
                        category_slug: category?.slug,
                        subcategory_slug: sub?.slug,
                      })}


                      className={`
                          w-full text-right px-4 py-2 rounded-lg font-semibold flex items-center gap-3
                          bg-white/70 hover:bg-sky-50 text-sky-800 hover:text-main
                          border border-transparent hover:border-sky-300 shadow-sm
                          transition-all duration-200
                        `}
                    >
                      {sub.image && (
                        <img src={sub.image} alt={sub.title_ar} className="w-8 h-8 rounded-full border-2 border-sky-200 shadow" />
                      )}
                      <span className="flex-1">{sub.title_ar || sub.title_en}</span>
                      <span className="text-xs bg-main/10 text-main px-2 py-0.5 rounded-full font-bold">
                        {sub.ads?.length ?? 0}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-2 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar: Subcategories */}



        <main className="flex-1">
          <div className="flex flex-col gap-6">
            {ads && ads.data.length > 0 ? (
              ads.data.map((ad: any) => (
                <AdItemHorzintal key={ad.id} ad={ad} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-md border border-main/10">
                <svg width="80" height="80" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#f1f5f9" />
                  <path d="M8 15h8M9 9h.01M15 9h.01" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="text-main text-2xl font-bold mt-4 mb-2">{t('no-ads')}  </h3>
                <Link
                  href="/post/new/ads"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-main to-sky-400 text-white font-bold py-2 px-8 rounded-full shadow-lg hover:from-sky-400 hover:to-main hover:scale-105 transition-all duration-200 text-lg"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  {t('add-ad')}
                </Link>
              </div>
            )}
          </div>
        </main>

        <aside className="md:w-1/4 w-full">
          <div className="bg-gradient-to-br from-main/10 to-sky-100 rounded-2xl shadow-xl p-0 mb-6 sticky top-8 overflow-hidden border border-main/10">
            <div className="bg-gradient-to-r from-main to-sky-400 py-5 px-4 text-center">
              <h2 className="text-white font-extrabold text-xl tracking-wide drop-shadow">
                {category ? (category.title_ar || category.title_en) : "التصنيفات الفرعية"}
              </h2>
            </div>
            <ul className="space-y-1 py-4 px-2">
              <li>
                <button
                  className={`
            w-full text-right px-4 py-2 rounded-lg font-bold
            bg-white/80 hover:bg-main/10 text-main shadow-sm
            transition-all duration-200 border border-transparent hover:border-main
          `}
                >
                  الكل
                </button>
              </li>
              {category.subcategories.map((sub: any) => (
                <li key={sub.id}>
                  <Link
                    href={route('filter', {
                      place_slug: place?.slug ? place.slug : 0,
                      category_slug: category?.slug,
                      subcategory_slug: sub?.slug,
                    })}


                    className={`
                          w-full text-right px-4 py-2 rounded-lg font-semibold flex items-center gap-3
                          bg-white/70 hover:bg-sky-50 text-sky-800 hover:text-main
                          border border-transparent hover:border-sky-300 shadow-sm
                          transition-all duration-200
                        `}
                  >
                    {sub.image && (
                      <img src={sub.image} alt={sub.title_ar} className="w-8 h-8 rounded-full border-2 border-sky-200 shadow" />
                    )}
                    <span className="flex-1">{sub.title_ar || sub.title_en}</span>
                    <span className="text-xs bg-main/10 text-main px-2 py-0.5 rounded-full font-bold">
                      {sub.ads?.length ?? 0}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>




      </div>


      <Footer />
      <BottomNavbar />
    </div>
  )
}

export default FilterAds