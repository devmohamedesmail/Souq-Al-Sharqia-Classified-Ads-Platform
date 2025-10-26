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

export default function UsersIndex({ users }: Props) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('users'),
            href: '/users',
        },
    ];

    const handleDelete = (user: User) => {
        if (confirm(`${t('confirm_delete_user')} ${user.name}؟`)) {
            router.delete(`/users/${user.id}`, {
                onSuccess: () => {

                    alert(t('user_deleted_successfully'));
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
                            {t('users')}
                        </h1>
                        <p className="text-gray-600 arabic-font">
                            {t('manage_users_and_accounts')}
                        </p>
                    </div>
                    <Link href="/users/create">
                        <Button className="inline-flex items-center gap-2">
                            <FiPlus className="w-4 h-4" />
                            {t('create_user')}
                        </Button>
                    </Link>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold text-gray-900 arabic-font">
                            {t('users_list')} ({users.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                        {t('name')}
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                        {t('email')}
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                        {t('phone')}
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                        {t('registration_date')}
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                        {t('actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 text-center">
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center">
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center">
                                                    {user.phone || '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700 text-center">
                                                    {new Date(user.created_at).toLocaleDateString('en-US')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/users/${user.id}`}
                                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                                    >
                                                        <FiEye className="w-3 h-3" />
                                                        {t('view')}
                                                    </Link>
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                                    >
                                                        <FiEdit className="w-3 h-3" />
                                                        {t('edit')}
                                                    </Link>
                                                    <Link
                                                        href={`/delete/user/${user.id}`}
                                                        onClick={(e) => {
                                                            if (!confirm(`${t('confirm_delete_user')} ${user.name}?`)) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                                    >
                                                        <FiTrash2 className="w-3 h-3" />
                                                        {t('delete')}
                                                    </Link>
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
