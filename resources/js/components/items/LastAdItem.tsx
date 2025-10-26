import { Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, removeFavourite } from '@/redux/FavouriteSlice'
import { FaPhone, FaEnvelope } from "react-icons/fa";

function LastAdItem({ item }: any) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const favourites = useSelector((state: any) => state.favourites.items)
    const isFavourite = favourites.some((fav: any) => fav.id === item.id)

    const handleFavourite = () => {
        isFavourite
            ? dispatch(removeFavourite(item.id))
            : dispatch(addFavourite(item))
    }

    // const images = item.images ? JSON.parse(item.images) : []

    return (
        <div className="flex flex-col justify-between py-2 px-3 items-center   rounded-2xl   mb-6 border-b-4 border-main/10 hover:shadow-md transition-all duration-300 group">

            <div className='flex flex-row justify-between w-full '>
                {/* Image */}
                <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center bg-white rounded-xl overflow-hidden shadow border-2 border-main/10">
                    {item.images[0] ? (
                        <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">{t('no-image')}</span>
                    )}
                </div>
                {/* Content */}
                <div className="flex-1  w-full mx-1 ">
                    <Link
                        href={`/show/ad/details/${item.slug}/${item.id}`}
                        className="text-sm font-extrabold text-main hover:underline block mb-1 text-right transition-colors duration-200"
                    >
                        {item.title
                            ? item.title.split(' ').slice(0, 5).join(' ') + (item.title.split(' ').length > 5 ? '...' : '')
                            : ''}
                    </Link>
                    <h4 className="text-gray-700 text-right mb-2 text-xs font-medium">
                        {item.description
                            ? item.description.split(' ').slice(0, 10).join(' ') + (item.description.split(' ').length > 10 ? '...' : '')
                            : <span className="text-gray-400"></span>}
                    </h4>


                </div>
            </div>
            <div className="flex gap-3 mt-2">
                <Link
                    href={`/show/ad/details/${item.slug}/${item.id}`}
                    className="px-6 py-2 bg-gradient-to-r from-main to-sky-400 text-white rounded-full text-sm font-bold shadow hover:from-sky-400 hover:to-main hover:scale-105 transition-all"
                >
                    {t('details')}
                </Link>
                <button
                    onClick={handleFavourite}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold shadow transition-all duration-200
                            ${isFavourite
                            ? 'bg-red-100 text-red-500 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-main/10 hover:text-main'
                        }`}
                    title={isFavourite ? t('remove-from-favourites') : t('add-to-favourites')}
                >
                    {isFavourite ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                    )}
                    {isFavourite ? '' : ''}
                </button>
            </div>
        </div>
    )
}

export default LastAdItem