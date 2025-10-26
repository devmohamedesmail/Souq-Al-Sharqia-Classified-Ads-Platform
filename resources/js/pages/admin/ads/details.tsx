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

export default function AdDetails({ ad }: any) {
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

    const handleDelete = (user: User) => {
        if (confirm(`${t('confirm_delete_user')} ${user.name}؟`)) {
            router.delete(`/users/${user.id}`, {
                onSuccess: () => {
                    // Success message will be handled by flash messages
                },
                onError: () => {
                    alert(t('error_deleting_user'));
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('users')} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {t('ad_details')}
                        </h1>
                    </div>
                </div>


                {/* Ad Details Content */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Main Ad Information */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                        {/* Ad Title */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                                {ad.title}
                            </h2>
                        </div>

                        {/* Ad Description */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-3">{t('description')}</h3>
                            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-md">
                                {ad.description || 'No description available'}
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700 mb-3">{t('contact_information')}</h3>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">{t('name')}:</span>
                                    <span className="text-gray-900">{ad.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">{t('phone')}:</span>
                                    <span className="text-gray-900">{ad.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">{t('email')}:</span>
                                    <span className="text-gray-900">{ad.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ad Images */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">{t('ad_images')}</h3>
                        {ad.images && ad.images.length > 0 ? (
                            <div className="grid gap-4">
                                {ad.images.map((img: any, index: number) => (
                                    <div key={index} className="relative group">
                                        <img 
                                            src={img} 
                                            alt={`Ad image ${index + 1}`}
                                            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                        />
                                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="text-center">
                                    <FiEye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500 font-medium">{t('no-image')}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </AppLayout>
    );
}
