import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { FiEdit, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    users: User[];
}

export default function AdsPage({ ads }: any) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('ads'),
            href: '/users',
        },
    ];

    const handleDelete = (ad: any) => {
        if (confirm(`${t('confirm_delete_ad')} ${ad.title}؟`)) {
            router.get(`/delete/ad/${ad.id}`, {

            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ads')} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 arabic-font">
                            {t('ads')}
                        </h1>
                        <p className="text-gray-600 arabic-font">
                            {t('manage_ads')}
                        </p>
                    </div>

                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold text-gray-900 arabic-font">
                            {t('ads_list')} ({ads.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('name')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('email')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('phone')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('title')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('type')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('status')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ads.length > 0 ? (
                                    ads.map((ad: any) => (
                                        <tr key={ad.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 text-center arabic-font">
                                                    {ad.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {ad.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {ad.phone || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {ad.title}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {ad.featured == 1 ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {t('featured')}
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            {t('not_featured')}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>



                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {ad.status === "pending" && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                            {t('pending')}
                                                        </span>
                                                    )}

                                                    {ad.status === "approved" && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {t('approved')}
                                                        </span>
                                                    )}

                                                    {ad.status === "rejected" && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            {t('rejected')}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>






                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">

                                                <button className="btn btn-primary" popoverTarget="popover-1">
                                                    {t('actions')}
                                                </button>

                                                <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                                                    popover="auto" id="popover-1">

                                                    <li className='py-1 bg-gray-200'>
                                                        <Link
                                                            href={`/ads/details/page/${ad.id}`}
                                                            className=""
                                                        >
                                                            <FiEye className="w-3 h-3" />
                                                            {t('view')}
                                                        </Link>
                                                    </li>


                                                    <li className='py-1 bg-gray-200'>
                                                        <Link
                                                            href={`/ads/publish/ad/${ad.id}`}
                                                            className=""
                                                        >
                                                            <FiEye className="w-3 h-3" />
                                                            {t('publish')}
                                                        </Link>
                                                    </li>



                                                    <li className='py-1 bg-gray-200'>
                                                        {ad.featured == 1 ? (
                                                            <Link
                                                                href={`/boost/ad/${ad.id}`}
                                                                className=""
                                                            >
                                                                <FiEdit className="w-3 h-3" />
                                                                {t('admin_disboost')}
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={`/boost/ad/${ad.id}`}
                                                                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                                            >
                                                                <FiEdit className="w-3 h-3" />
                                                                {t('admin_boost')}
                                                            </Link>
                                                        )}
                                                    </li>

                                                    <li className='py-1 bg-gray-200'>
                                                        <button
                                                            onClick={() => handleDelete(ad)}
                                                            className=""
                                                        >
                                                            <FiTrash2 className="w-3 h-3" />
                                                            {t('delete')}
                                                        </button>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <p className="text-lg font-medium">{t('no_users_found')}</p>
                                                <p className="text-sm">{t('add_users_to_manage_system')}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
