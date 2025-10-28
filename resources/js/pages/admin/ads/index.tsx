import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiTrash2, FiPlus, FiEye, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { Input } from '@/components/ui/input';


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
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [featuredFilter, setFeaturedFilter] = useState('');
    const [selectedAd, setSelectedAd] = useState<any>(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        reason: ''
    });

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

    // Filter ads based on search term and filters
    const filteredAds = ads.filter((ad: any) => {
        const matchesSearch = searchTerm === '' ||
            ad.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.phone?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === '' || ad.status === statusFilter;
        const matchesFeatured = featuredFilter === '' ||
            (featuredFilter === 'true' && ad.featured == 1) ||
            (featuredFilter === 'false' && ad.featured != 1);

        return matchesSearch && matchesStatus && matchesFeatured;
    });

    const handleDelete = (ad: any) => {
        if (confirm(`${t('confirm_delete_ad')} ${ad.title}؟`)) {
            router.get(`/delete/ad/${ad.id}`, {

            });
        }
    };

    const handleRejectAd = (ad: any) => {
        setSelectedAd(ad);
        setData('reason', '');
        reset('reason');
        (document.getElementById('reject_modal') as HTMLDialogElement)?.showModal();
    };

    const confirmRejectAd = () => {
        if (selectedAd && data.reason.trim()) {
            console.log('Rejecting ad:', selectedAd.id, 'with reason:', data.reason);
            post(`/reject/ad/${selectedAd.id}`, {
                onSuccess: () => {
                    console.log('Ad rejected successfully');
                    (document.getElementById('reject_modal') as HTMLDialogElement)?.close();
                    setSelectedAd(null);
                    reset();
                },
                onError: (errors) => {
                    console.log('Error rejecting ad:', errors);
                }
            });
        } else {
            console.log('Cannot reject ad - missing ad or reason');
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

                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <div className="absolute mt-2 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder={t('search_by_title_name_email_phone')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-main focus:border-main arabic-font"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-main focus:border-main arabic-font"
                            >
                                <option value="">{t('all')}</option>
                                <option value="pending">{t('pending')}</option>
                                <option value="approved">{t('approved')}</option>
                                <option value="rejected">{t('rejected')}</option>
                            </select>
                        </div>

                        {/* Featured Filter */}
                        <div>
                            <select
                                value={featuredFilter}
                                onChange={(e) => setFeaturedFilter(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-main focus:border-main arabic-font"
                            >
                                <option value="">{t('all')}</option>
                                <option value="true">{t('featured')}</option>
                                <option value="false">{t('not_featured')}</option>
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        <div>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('');
                                    setFeaturedFilter('');
                                }}
                                className="w-full px-4 py-2 bg-main text-white rounded-md hover:bg-main-dark transition-colors arabic-font"
                            >
                                {t('clear_filters')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold text-gray-900 arabic-font">
                            {t('ads_list')} ({filteredAds.length} {t('of')} {ads.length})
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
                                {filteredAds.length > 0 ? (
                                    filteredAds.map((ad: any) => (
                                        <tr key={ad.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 text-center arabic-font">
                                                    {ad.name}
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

                                                <button className="btn btn-primary" popoverTarget={`popover-${ad.id}`}>
                                                    {t('actions')}
                                                </button>

                                                <ul className="dropdown dropdown-end menu w-52 rounded-box bg-base-100 shadow-sm"
                                                    popover="auto" id={`popover-${ad.id}`}>

                                                    <li className='py-1 bg-gray-100'>
                                                        <Link
                                                            href={`/ads/details/page/${ad.id}`}
                                                            className=""
                                                        >
                                                            <FiEye className="w-3 h-3" />
                                                            {t('view')}
                                                        </Link>
                                                    </li>


                                                    <li className='py-1 bg-gray-100'>
                                                        <Link
                                                            href={`/ads/publish/ad/${ad.id}`}
                                                            className=""
                                                        >
                                                            <FiEye className="w-3 h-3" />
                                                            {t('publish')}
                                                        </Link>
                                                    </li>



                                                    <li className='py-1 bg-gray-100'>
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

                                                    <li className='py-1 bg-gray-100'>
                                                        <button
                                                            onClick={() => handleDelete(ad)}
                                                            className=""
                                                        >
                                                            <FiTrash2 className="w-3 h-3" />
                                                            {t('delete')}
                                                        </button>
                                                    </li>


                                                    <li className='py-1 bg-gray-100'>
                                                        <button
                                                            onClick={() => handleRejectAd(ad)}
                                                            className=""
                                                        >
                                                            <RxCross2 className="w-3 h-3" />
                                                            {t('reject_ad')}
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
                                                <p className="text-lg font-medium">{t('no_ads_found')}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reject Ad Modal */}
                <dialog id="reject_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg arabic-font">{t('reject_ad')}</h3>
                        <p className="py-4 arabic-font">{t('reject_ad_message')}</p>
                        <Input
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            placeholder={t('enter_reject_reason')}
                            className="w-full mb-4"
                        />
                        {errors.reason && <p className="text-red-500 text-sm mb-2">{errors.reason}</p>}
                        <div className="flex gap-2 justify-end mt-10">
                            <button 
                                className="btn btn-ghost arabic-font"
                                onClick={() => (document.getElementById('reject_modal') as HTMLDialogElement)?.close()}
                                disabled={processing}
                            >
                                {t('cancel')}
                            </button>
                            <button 
                                className="btn btn-primary arabic-font"
                                onClick={confirmRejectAd}
                                disabled={!data.reason.trim() || processing}
                            >
                                {processing ? t('processing') : t('confirm')}
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

            </div>
        </AppLayout>
    );
}
