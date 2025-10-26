import { Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next'

function Category_item({ category, place }: any) {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-main/10 hover:border-main transition-all duration-300 m-3 overflow-hidden">
      <Link
        href={route('filter', {
          place_slug: place?.slug || 0,
          category_slug: category?.slug,
        })}
        className="flex items-center gap-3 px-4 py-4 bg-main/5 hover:bg-main/10 transition rounded-t-2xl"
      >
        <img
          src={category.image}
          width={48}
          height={48}
          alt={category.title_ar}
          className="rounded-full border-2 border-main/20 shadow"
        />
        <span className="flex-1 text-lg font-bold text-main group-hover:text-second transition">
          {i18n.language === 'en' ? category.title_en : category.title_ar}
        </span>
      </Link>

      {category.subcategories &&
        category.subcategories.slice(0, 3).map((subcategory: any) => (
          <Link
            key={subcategory.id}
            href={route('filter', {
              place_slug: place?.slug || 0,
              category_slug: category?.slug,
              subcategory_slug: subcategory?.slug,
            })}
            className="block px-4 py-2 text-right text-gray-600 hover:text-main transition font-medium border-b last:border-b-0"
          >
            {i18n.language === 'en' ? subcategory.title_en : subcategory.title_ar}
          </Link>
        ))}

      <Link
        href={route('filter', {
          place_slug: place?.slug || 0,
          category_slug: category?.slug,
        })}
        className="block px-4 py-2 text-right text-second hover:text-main font-semibold transition bg-main/5 rounded-b-2xl"
      >
        {t('see-more')}
      </Link>
    </div>
  )
}

export default Category_item