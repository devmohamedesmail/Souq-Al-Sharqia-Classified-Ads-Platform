import React, { useState, useRef } from 'react'
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next';

function DrawerCategories({ categories, ads }: any) {
    const [openCategory, setOpenCategory] = useState<number | null>(null);
    const adsContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const { t } = useTranslation()
    const getAdsForSubcategory = (subId: number) =>
        ads.filter((ad: any) => ad.subcategory_id === subId);

    const scrollAds = (direction: 'left' | 'right', subId: number) => {
        const ref = adsContainerRefs.current[subId];
        if (ref) {
            const scrollAmount = 280;
            ref.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="w-full h-full bg-white overflow-hidden flex flex-col p-0">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-main/5 to-main/10">
                <h2 className="text-main font-bold text-2xl text-center mb-1">{t('categories')}</h2>
                <p className="text-gray-600 text-sm text-center">{t('select-category-desc')}</p>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-0 pb-24">
                <div className="space-y-3">
                    {categories.map((cat: any) => (
                        <div key={cat.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-all duration-200"
                                onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                            >
                                <div className="flex items-center gap-3">
                                    {cat.image && (
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-main/20 shadow-sm">
                                            <img src={cat.image} alt={cat.title_ar} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <span className="font-semibold text-gray-800 text-lg">{cat.title_ar}</span>
                                </div>
                                <FaChevronDown
                                    className={`text-main transition-transform duration-300 ${openCategory === cat.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Subcategories Accordion */}
                            <div className={`transition-all duration-500 overflow-hidden ${openCategory === cat.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="p-4 pt-0 space-y-4">
                                    {cat.subcategories?.map((sub: any) => (
                                        <div key={sub.id} className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                                            {/* Subcategory Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    {sub.image && (
                                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                                                            <img src={sub.image} alt={sub.title_ar} className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                    <h3 className="font-semibold text-gray-800">{sub.title_ar}</h3>
                                                </div>
                                                <span className="bg-main text-white rounded-full px-3 py-1 text-xs font-bold">
                                                    {getAdsForSubcategory(sub.id).length}
                                                </span>
                                            </div>

                                            {/* Ads Section */}
                                            {getAdsForSubcategory(sub.id).length === 0 ? (
                                                <div className="text-center py-8 text-gray-500">
                                                    <div className="text-4xl mb-2">📭</div>
                                                    <p className="text-sm"> {t('no_ads_found')}  </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {/* Ads Container */}
                                                    <div
                                                        ref={el => { adsContainerRefs.current[sub.id] = el; }}
                                                        className="overflow-x-auto scrollbar-hide"
                                                        style={{
                                                            WebkitOverflowScrolling: 'touch',
                                                            touchAction: 'pan-x',
                                                            scrollbarWidth: 'none',
                                                            msOverflowStyle: 'none',
                                                        }}
                                                    >
                                                        <div className="flex gap-4 pb-2" style={{ minWidth: 'max-content' }}>
                                                            {getAdsForSubcategory(sub.id).map((ad: any) => {
                                                                // const adImages = ad.images ? JSON.parse(ad.images) : [];
                                                                return (
                                                                    <div
                                                                        key={ad.id}
                                                                        className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 w-64 flex-shrink-0 group"
                                                                    >
                                                                        {/* Image */}
                                                                        <div className="relative h-32 bg-gray-100 rounded-t-lg overflow-hidden">
                                                                            {ad.images && ad.images.length > 0 ? (
                                                                                <img
                                                                                    src={ad.images[0]}
                                                                                    alt={ad.title}
                                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                                                />
                                                                            ) : (
                                                                                <div className="w-full h-full flex items-center justify-center">
                                                                                    <div className="text-center text-gray-400">
                                                                                        <div className="text-2xl mb-1">🖼️</div>
                                                                                        <span className="text-xs"> {t('no_image')}  </span>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        {/* Content */}
                                                                        <div className="p-3 space-y-2">
                                                                            <h4 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
                                                                                {ad.title}
                                                                            </h4>

                                                                            <div className="text-green-600 font-bold text-lg">
                                                                                {ad.price} درهم
                                                                            </div>

                                                                            {ad.places && ad.places.length > 0 && (
                                                                                <div className="flex items-center gap-1 text-gray-500">
                                                                                    <FaMapMarkerAlt className="text-yellow-500 text-xs flex-shrink-0" />
                                                                                    <span className="text-xs truncate">
                                                                                        {ad.places[0].name}
                                                                                    </span>
                                                                                </div>
                                                                            )}

                                                                            <Link
                                                                                href={`/ads/${ad.slug}`}
                                                                                className="block w-full bg-main hover:bg-main/90 text-white text-sm font-medium py-2.5 rounded-lg text-center transition-colors duration-200 mt-3"
                                                                            >
                                                                                
                                                                                {t('details')}
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>

                                                    {/* Navigation Buttons */}
                                                    {getAdsForSubcategory(sub.id).length > 1 && (
                                                        <div className="flex justify-center items-center gap-3 pt-2">
                                                            <button
                                                                onClick={() => scrollAds('left', sub.id)}
                                                                className="bg-white hover:bg-main text-main hover:text-white border border-main/30 hover:border-main rounded-full p-2.5 shadow-sm hover:shadow-md transition-all duration-200"
                                                                aria-label="السابق"
                                                            >
                                                                <FaChevronLeft size={16} />
                                                            </button>

                                                            <div className="flex gap-1">
                                                                <div className="w-2 h-2 bg-main rounded-full"></div>
                                                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                                            </div>

                                                            <button
                                                                onClick={() => scrollAds('right', sub.id)}
                                                                className="bg-white hover:bg-main text-main hover:text-white border border-main/30 hover:border-main rounded-full p-2.5 shadow-sm hover:shadow-md transition-all duration-200"
                                                                aria-label="التالي"
                                                            >
                                                                <FaChevronRight size={16} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>
                {`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `}
            </style>
        </div>
    )
}

export default DrawerCategories