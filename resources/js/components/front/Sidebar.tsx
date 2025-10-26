import React from 'react'
import { useTranslation } from 'react-i18next'
import LastAdItem from '../items/LastAdItem';
import { Link } from '@inertiajs/react';

function Sidebar({lastAds}:any) {
  const {t}=useTranslation();
  return (
    <div className="side-bar col-span-3 px-2">
          <div className="p-2 flex justify-center bg-gray-100">
            <Link href="/post/new/ads" className="bg-second py-2 px-10">
              <span> {t('add_without_account')}</span>
              <i className="fa-solid fa-user-plus"></i>
            </Link>
          </div>
          <div className=" mt-3 pb-0">
            <h5 className="bg-main p-2 text-center text-white">
              {t('last-added')}
            </h5>
            <div className="items">
              {lastAds && lastAds.map((item: any) => (
                <LastAdItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
  )
}

export default Sidebar