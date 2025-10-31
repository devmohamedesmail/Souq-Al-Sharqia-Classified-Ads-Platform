import React, { useState, useRef } from 'react'
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';







function CategoriesSideBar({ categories, ads }: any) {
  const { t } = useTranslation()
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const adsContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const getAdsForSubcategory = (subId: number) =>
    ads.filter((ad: any) => ad.subcategory_id === subId);

  // Pass subcategory id to scrollAds
  const scrollAds = (direction: 'left' | 'right', subId: number) => {
    const ref = adsContainerRefs.current[subId];
    if (ref) {
      const scrollAmount = 250;
      ref.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside className="md:w-1/4 w-full order-2 md:order-1">
      <div className="bg-white rounded-2xl shadow p-4 sticky top-8">
        <h2 className="text-main font-bold text-lg mb-4 text-center"> {t('categories')}</h2>
        <ul className="space-y-2">
          {categories.map((cat: any, idx: number) => (
            <li key={cat.id}>
              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition font-semibold text-main bg-main/5 hover:bg-main/10 mb-1`}
                onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
              >
                <span className="flex items-center gap-2">
                  {cat.image && (
                    <img src={cat.image} alt={cat.title_ar} className="w-7 h-7 rounded-full border" />
                  )}
                  
                  {i18n.language === 'ar' ? cat.title_ar : cat.title_en}
                </span>
                <FaChevronDown className={`transition-transform ${openCategory === cat.id ? 'rotate-180' : ''}`} />
              </button>
              {/* Accordion: Subcategories */}
              <div
                className={`overflow-hidden transition-all duration-300 ${openCategory === cat.id ? 'max-h-[1000px] py-2' : 'max-h-0 py-0'}`}
              >
                <ul className="pl-6 space-y-1">
                  {cat.subcategories && cat.subcategories.map((sub: any) => (
                    <li key={sub.id}>
                      <div className="font-semibold text-sky-700 flex items-center gap-2 py-1">
                        {sub.image && (
                          <img src={sub.image} alt={sub.title_ar} className="w-5 h-5 rounded-full border" />
                        )}
                        {sub.title_ar} 
                        <span className="ml-2 bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5 text-xs font-bold">
                          {getAdsForSubcategory(sub.id).length}
                        </span>
                      </div>
                      {/* Ads for this subcategory */}
                      {getAdsForSubcategory(sub.id).length === 0 ? (
                        <div className="text-xs text-gray-400 pl-6">{t('no_ads_found')}</div>
                      ) : (
                        <div>
                          <div
                            ref={el => { adsContainerRefs.current[sub.id] = el; }}
                            className="overflow-x-auto py-2"
                            style={{
                              WebkitOverflowScrolling: 'touch',
                              touchAction: 'pan-x',
                              scrollbarWidth: 'none', // Firefox
                              msOverflowStyle: 'none', // IE 10+
                            }}
                          >
                            <ul
                              className="flex space-x-4 min-w-full"
                              style={{
                                scrollSnapType: 'x mandatory',
                              }}
                            >
                              {getAdsForSubcategory(sub.id).map((ad: any) => {
                                // const adImages = ad.images ? JSON.parse(ad.images) : [];
                                return (
                                  <li
                                    key={ad.id}
                                    className="bg-white rounded-xl shadow-md flex flex-col w-56 min-w-[14rem] max-w-xs items-center gap-2 p-2 border border-main/10 hover:shadow-lg transition-all duration-200"
                                    style={{
                                      scrollSnapAlign: 'start',
                                    }}
                                  >
                                    {/* Image */}
                                    <div className="w-full h-28 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                      {ad.images && ad.images.length > 0 ? (
                                        <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover" />
                                      ) : (
                                        <span className="text-gray-400 text-xs"> {t('no_image')} </span>
                                      )}
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 w-full flex flex-col gap-0.5">
                                      <h3 className="text-main font-bold text-sm truncate">{ad.title}</h3>
                                      <div className="text-green-600 font-semibold text-xs">{ad.price} درهم</div>
                                      <div className="flex flex-wrap gap-1">
                                        {ad.places && ad.places.map((place: any) => (
                                          <span
                                            key={place.id}
                                            className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs"
                                          >
                                            <FaMapMarkerAlt className="text-yellow-400" />
                                            {place.name}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    {/* View Button */}
                                    <Link
                                      href={`/ads/${ad.slug}`}
                                      className="bg-main text-white px-3 py-1 rounded-full font-bold hover:bg-main/90 transition text-center text-xs mt-1"
                                    >
                                    
                                      {t('details')}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            <style>
                              {`
                                /* Hide scrollbar for Chrome, Safari and Opera */
                                div::-webkit-scrollbar {
                                  display: none;
                                }
                              `}
                            </style>
                          </div>
                          {/* Scroll Buttons */}
                          <div className="flex justify-center gap-4 mt-2">
                            <button
                              onClick={() => scrollAds('left', sub.id)}
                              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 flex items-center justify-center border-2 border-white hover:border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              aria-label="Scroll left"
                            >
                              <FaChevronLeft size={22} className="drop-shadow" />
                            </button>
                            <button
                              onClick={() => scrollAds('right', sub.id)}
                              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 flex items-center justify-center border-2 border-white hover:border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              aria-label="Scroll right"
                            >
                              <FaChevronRight size={22} className="drop-shadow" />
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default CategoriesSideBar