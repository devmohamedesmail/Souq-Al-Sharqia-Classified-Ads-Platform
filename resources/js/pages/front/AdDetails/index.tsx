import BottomHeader from '@/components/front/BottomHeader';
import BottomNavbar from '@/components/front/BottomNavbar';
import Footer from '@/components/front/Footer';
import MiddleHeader from '@/components/front/MiddleHeader';
import TopHeader from '@/components/front/TopHeader';
import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import React, { use, useState } from 'react';

function AdDetails({ ad }: any) {
  // const images: string[] = ad.images ? JSON.parse(ad.images) : [];
  const subcategory = ad.subcategory;
  const [current, setCurrent] = useState(0);
  const { app_settings }: any = usePage().props;
  const { t, i18n } = useTranslation();
 
 

  // Slider navigation
  const prevImage = () => setCurrent((prev) => (prev === 0 ? ad.images.length - 1 : prev - 1));
  const nextImage = () => setCurrent((prev) => (prev === ad.images.length - 1 ? 0 : prev + 1));

 



  return (
    <>
      <Head title={ad.title} />
      <TopHeader />
      <MiddleHeader />
      <BottomHeader />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Image Slider */}
        <div className="relative mb-6">
          {ad.images.length > 0 ? (
            <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
              <img
                src={ad.images[current]}
                alt={ad.title}
                className="object-contain w-full h-full transition-all duration-300"
              />
              {ad.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-main/80 text-white rounded-full p-2 shadow hover:bg-main transition"
                    aria-label="Previous"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-main/80 text-white rounded-full p-2 shadow hover:bg-main transition"
                    aria-label="Next"
                  >
                    &#8594;
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {ad.images.map((_: any, idx: number) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full ${idx === current ? 'bg-main' : 'bg-white border border-main'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-72 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400">
              {t('no-image')}
            </div>
          )}
        </div>

        {/* Title, Price, Subcategory */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">{ad.title}</h1>
          <br />
         
        </div>

         <h5 className="text-xl mb-5 text-primary font-semibold">
            {ad.price ? `${ad.price} ${i18n.language === 'en' ? app_settings.currency_en : app_settings.currency_en}` : ''}
          </h5>

        {subcategory && (
          <div className="mb-3">
            <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
              {subcategory.title_en}
            </span>
          </div>
        )}

        {/* Places */}
        {ad.places && ad.places.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {ad.places.map((place: any) => (
              <span
                key={place.id}
                className="bg-main/10 text-main px-3 py-1 rounded-full text-sm font-medium"
              >
                {place.name}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {/* <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">{t('description')}</h2>
          <p className="text-gray-600 whitespace-pre-line">{ad.description}</p>
        </div> */}

        {ad.subcategory && (
          <div className="mb-3">
            <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
              {ad.subcategory.title_en}
            </span>
          </div>
        )}

        {/* General Tips */}
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow flex flex-col gap-2">
          <h3 className="font-bold text-yellow-700 mb-1">{t('general-tips-title')}</h3>
          <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
            <li>{t('general-tip-public')}</li>
            <li>{t('general-tip-no-money')}</li>
            <li>{t('general-tip-check-product')}</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2 mb-8">
          {ad.phone && (
            <div className={`flex ${i18n.language === 'ar' ? 'flex-row-reverse' :''}`}>
              <span className="font-semibold text-gray-700 mx-2"> {t("common.phone")}  </span>
              <a href={`tel:${ad.phone}`} className="text-main hover:underline mx-2">{ad.phone}</a>
            </div>
          )}
          {ad.email && (
            <div className={`flex ${i18n.language === 'ar' ? 'flex-row-reverse' :''}`}>
              <span className="font-semibold text-gray-700">{t('common.email')}  </span>
              <a href={`mailto:${ad.email}`} className="text-main hover:underline mx-2">{ad.email}</a>
            </div>
          )}
        </div>

        
      
      </div>
      <Footer />
      <BottomNavbar />
    </>
  );
}

export default AdDetails;