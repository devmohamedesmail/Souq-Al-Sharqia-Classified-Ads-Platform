import React from 'react'
import LangSwitcher from './LangSwitcher'
import { Link, usePage } from '@inertiajs/react';

function TopHeader() {
    const {app_settings}: any = usePage().props;
  return (
    <div>
        <div className="container px-5 m-auto flex items-center justify-between py-2 ">
            <Link href={route('home')} className='flex flex-col items-center gap-2'>
                <img src={`${app_settings.logo}`} className='w-20' alt={app_settings.website_name} />
                {/* <h4 className='font-bold'> {app_settings.website_name} </h4> */}
            </Link>
            <div>
                <LangSwitcher />
            </div>
        </div>

    </div>
  )
}

export default TopHeader