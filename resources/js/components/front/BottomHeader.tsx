import { Link } from '@inertiajs/react';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { router } from '@inertiajs/react';

function BottomHeader() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (search.trim()) {
            router.get(route('search'), { q: search });
        }
    };
    return (
        <div className="bg-[#074799] container m-auto flex flex-col md:flex-row items-center justify-between py-2 px-2">

            <div className="w-full my-3 md:my-0 flex justify-start">
                <form onSubmit={handleSubmit} className="w-full md:w-1/3">
                    <div className="flex items-center gap-0 flex-row-reverse">
                        <input
                            type="search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full py-2 px-4 rounded-r-full border border-main/20 bg-white text-right focus:outline-none focus:ring-2 focus:ring-main transition"
                            placeholder={t('search')}
                        />
                        <button
                            type="submit"
                            className="py-2 px-6 rounded-l-full bg-gradient-to-r from-second to-yellow-500 text-white font-bold shadow hover:from-yellow-500 hover:to-second transition"
                        >
                            {t('search')}
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col md:flex-row w-full md:justify-end">

                <Link href="/post/new/ads"
                    className="bg-second px-2 py-2 rounded-md mx-1 text-white  shadow-sm font-bold my-1 text-center">

                    {t('add_without_account')}
                </Link>

                {/* <Link href="/boost/ads" className="bg-second px-2 py-2 rounded-md mx-1 text-white  shadow-sm my-1 text-center">

                    {t('boost')}
                </Link> */}



            </div>





        </div>
    )
}

export default BottomHeader