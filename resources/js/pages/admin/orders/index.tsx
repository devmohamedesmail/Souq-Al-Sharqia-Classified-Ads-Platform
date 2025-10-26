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

export default function UsersIndex({ orders }: any) {
    const { t } = useTranslation();
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('orders'),
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
                        <h1 className="text-2xl font-bold text-gray-900 arabic-font">
                            {t('orders')}
                        </h1>
                        <p className="text-gray-600 arabic-font">
                            {t('manage_orders')}
                        </p>
                    </div>
                  
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold text-gray-900 arabic-font">
                            {t('orders_list')} ({orders.length})
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
                                        {t('link')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('subject')}
                                    </th>
                                    <th className="px-6 py-3 text-center arabic-font text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('registration_date')}
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
                                {orders.length > 0 ? (
                                    orders.map((order:any) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="text-sm font-medium text-gray-900 text-center arabic-font">
                                                    {order.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {order.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {order.phone || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {order.link || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {order.subject || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center arabic-font">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                

                                                {order.isRead ? 
                                                <div className="text-sm  bg-green-500 text-white text-center arabic-font">
                                                     {t('readed')}
                                                </div> : 
                                                <div className="text-sm  bg-red-500 text-white text-center arabic-font">
                                                      {t('not_readed')}

                                                </div>}

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link 
                                                        href={`/order/read/${order.id}`}
                                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors arabic-font"
                                                    >
                                                        <FiEye className="w-3 h-3" />
                                                        {t('read')}
                                                    </Link>
                                                  
                                                    {/* <button
                                                        onClick={() => handleDelete(user)}
                                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                                    >
                                                        <FiTrash2 className="w-3 h-3" />
                                                        {t('delete')}
                                                    </button> */}
                                                </div>
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
