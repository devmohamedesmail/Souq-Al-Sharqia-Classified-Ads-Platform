import { Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaMapMarkerAlt } from 'react-icons/fa';

function Places_section({ places }: any) {
    const { t } = useTranslation();
    return (
        <div className="container m-auto px-5 py-8">

            <div className="mb-10 text-center">
                <h2 className="text-xl md:text-3xl font-extrabold text-main mb-3 drop-shadow flex items-center justify-center gap-2">
                    <span role="img" aria-label="earth" className="animate-bounce">🌍</span>
                    {t('choose-place')}
                </h2>
                <p className="text-sm md:text-md text-gray-600 font-medium max-w-2xl mx-auto mt-2">
                    {t('choose-place-desc')}
                </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {places && places.map((place: any) => (
                    <Link
                        href={`/place/categories/${place.slug}/${place.id}`}
                        key={place.id}
                        className="
                            bg-gradient-to-br from-main/10 to-sky-50 shadow-sm rounded-2xl p-6 flex flex-col items-center  h-48 justify-center
                            transition-all duration-300 ease-in-out
                             hover:shadow-md 
                            cursor-pointer group
                        "
                    >
                        <FaMapMarkerAlt className="text-main text-3xl mb-2 group-hover:text-yellow-500 transition" />
                        <p className="text-gray-500 text-base mb-1">{t('see-ads-in')}</p>
                        <p className="text-main text-2xl font-extrabold group-hover:text-yellow-600 transition">{place.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Places_section