import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { FaChevronDown, FaMapMarkerAlt, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, removeFavourite } from '@/redux/FavouriteSlice'

function AdItemHorzintal({ ad }: any) {
  const { t, i18n } = useTranslation()
  const { app_settings }: any = usePage().props

  // Redux for favourites
  const dispatch = useDispatch()
  const favourites = useSelector((state: any) => state.favourites.items)
  const isFavourite = favourites.some((fav: any) => fav.id === ad.id)

  // Parse images if needed
  let images: string[] = []
  if (Array.isArray(ad.images)) {
    images = ad.images
  } else if (typeof ad.images === 'string') {
    try {
      images = JSON.parse(ad.images)
    } catch {
      images = []
    }
  }

  const handleFavourite = () => {
    isFavourite
      ? dispatch(removeFavourite(ad.id))
      : dispatch(addFavourite(ad))
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 p-4 border border-main/10 hover:shadow-2xl transition"
    >
      {/* Image */}
      <div className="w-full md:w-48 h-40 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        {images[0] ? (
          <img src={images[0]} alt={ad.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">{t('no-image')}</span>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 w-full flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Category */}
          {ad.category && (
            <span className="bg-main/10 text-main px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              {ad.category.image && (
                <img src={ad.category.image} alt={ad.category.title_ar} className="w-4 h-4 rounded-full" />
              )}
              {ad.category.title_ar}
            </span>
          )}
          {/* Subcategory */}
          {ad.subcategory && (
            <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
              {ad.subcategory.title_ar}
            </span>
          )}
          {/* Places */}
          {ad.places && ad.places.map((place: any) => (
            <span
              key={place.id}
              className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs"
            >
              <FaMapMarkerAlt className="text-yellow-400" />
              {place.name}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-bold text-main truncate">{ad.title}</h2>
        <div className="text-green-600 font-semibold text-base">
          {ad.price}
          {i18n.language === 'en' ? app_settings.currency_en : app_settings.currency_ar}
        </div>
        <p className="text-gray-600 line-clamp-2">{ad.description}</p>
      </div>
      {/* Actions */}
      <div className="flex flex-col gap-2 md:items-end w-full md:w-auto">
        <Link
          href={`/show/ad/details/${ad.slug}/${ad.id}`}
          className="bg-main text-white px-6 py-2 rounded-full font-bold hover:bg-main/90 transition text-center"
        >
          {t('details')}
        </Link>
        <button
          onClick={handleFavourite}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-bold shadow transition-all duration-200
            ${isFavourite
              ? 'bg-red-100 text-red-500 hover:bg-red-200'
              : 'bg-gray-100 text-gray-500 hover:bg-main/10 hover:text-main'
            }`}
          title={isFavourite ? t('remove-from-favourites') : t('add-to-favourites')}
        >
          {isFavourite ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
          {isFavourite ? t('') : t('')}
        </button>
      </div>
    </div>
  )
}

export default AdItemHorzintal