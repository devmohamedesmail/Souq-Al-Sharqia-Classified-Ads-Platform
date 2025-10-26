import React from 'react';
import { Head, Link } from '@inertiajs/react';
import TopHeader from '@/components/front/TopHeader';
import MiddleHeader from '@/components/front/MiddleHeader';
import Footer from '@/components/front/Footer';
import BottomNavbar from '@/components/front/BottomNavbar';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function SearchResults({ ads, query }: any) {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={t('search-results')} />
            <TopHeader />
            <MiddleHeader />

            <div className="container mx-auto px-4 py-10">

                <div className="flex items-center gap-3 mb-8  justify-center">
                    <FaSearch className="text-main text-2xl" />
                    <h1 className="text-2xl font-extrabold text-main text-center">  {t('search-results')} <span className="text-second">{query}</span></h1>
                </div>



                {ads.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-md border border-main/10">
                        <FaSearch className="text-5xl text-main mb-4" />
                        <h3 className="text-main text-xl font-bold mb-2">{t('no-results')}  </h3>
                        <p className="text-gray-500 text-base">{t('no-results-description')} </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ads.data.map((ad: any) => {
                            const images = ad.images ? (Array.isArray(ad.images) ? ad.images : JSON.parse(ad.images)) : [];
                            return (
                                <div key={ad.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-xl transition">
                                    <Link href={`/show/ad/details/${ad.slug}/${ad.id}`}>
                                        <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                                            {images[0] ? (
                                                <img src={images[0]} alt={ad.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-gray-400 text-sm">لا صورة</span>
                                            )}
                                        </div>
                                        <h2 className="text-main font-bold text-lg mb-1 truncate">{ad.title}</h2>
                                        <p className="text-gray-600 line-clamp-2 mb-2">{ad.description}</p>
                                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                            <span className="bg-main/10 text-main px-2 py-1 rounded-full font-semibold">{ad.price} درهم</span>
                                            {ad.category && (
                                                <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full">{ad.category.title_ar}</span>
                                            )}
                                            {ad.subcategory && (
                                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{ad.subcategory.title_ar}</span>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    {ads.links && ads.links.map((link: any, idx: any) =>
                        link.url ? (
                            <Link
                                key={idx}
                                href={link.url}
                                className={`mx-1 px-3 py-1 rounded ${link.active ? 'bg-main text-white' : 'bg-white text-main border border-main/20'} transition`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span key={idx} className="mx-1 px-3 py-1 text-gray-400" dangerouslySetInnerHTML={{ __html: link.label }} />
                        )
                    )}
                </div>
            </div>

            <Footer />
            <BottomNavbar />
        </div>
    );
}