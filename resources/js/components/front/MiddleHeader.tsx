import React from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

function MiddleHeader({ place }: any) {
    const { t } = useTranslation();
    const { auth }: any = usePage().props;

    return (
        <div className="top-header container m-auto bg-gradient-to-t from-gray-200 to-white  px-5 py-3 flex justify-between">


            {/* <div className="flex items-center">
                <p className="text-primary font-bold">
                    {t('favorite')}
                </p>
                <p>
                    <i className="fa-solid fa-star text-yellow-400"></i>
                </p>
            </div> */}
            {/* <Link
  href="/favourites"
  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-main/10 hover:from-main/20 hover:to-yellow-200 px-5 py-2 rounded-full shadow-md transition-all duration-200 group"
>
  <svg className="w-6 h-6 text-yellow-400 group-hover:text-yellow-500 transition" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
  <span className="text-main font-extrabold text-base group-hover:text-yellow-600 transition">{t('favorite')}</span>
</Link> */}

            <Link
                href="/show/favourites/page"
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-main/10 hover:bg-main/20 transition"
            >
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                <span className="text-main font-bold">{t('favorite')}</span>
            </Link>




            <div className="flex flex-row items-end justify-between">



                {place && (
                    <div className="flex items-center gap-2 mx-2">
                        <span className="inline-flex items-center gap-1 bg-main/10 text-main font-bold px-4 py-1 rounded-full shadow-sm border border-main/20 text-base">
                            <svg className="w-4 h-4 text-main" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                            {place}
                        </span>
                        <span className="text-main font-semibold">{t('you-are')}</span>
                    </div>
                )}

                {auth.user ? (
                    <div className="flex items-center gap-2">
                        <Link href={route('account.page')} className="flex items-center">
                            <FaChevronCircleLeft color="orange" />
                            <p className="text-primary font-bold mx-1">
                                {t('my-account')}
                            </p>
                        </Link>
                        <button
                            onClick={() => router.post(route('logout'))}
                            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-full shadow transition-all duration-200 text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                            </svg>
                            {t('logout')}
                        </button>
                    </div>
                ) : (
                    <Link href={route('login')} className="flex items-center">
                        <FaChevronCircleLeft color="orange" />
                        <p className="text-primary font-bold mx-1">
                            {t('login')}
                        </p>
                    </Link>
                )}



            </div>
        </div>
    )
}

export default MiddleHeader