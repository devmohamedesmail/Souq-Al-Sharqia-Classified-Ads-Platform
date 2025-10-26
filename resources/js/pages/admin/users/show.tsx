import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FiArrowLeft, FiEdit, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

export default function UsersShow({ user }: Props) {
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
        {
            title: user.name,
            href: `/users/${user.id}`,
        },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('user')}: ${user.name}`} />
            
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {t('user_details')}
                    </h1>
                    <div className="flex items-center gap-3">
                        <Link href={`/users/${user.id}/edit`}>
                            <Button className="flex items-center gap-2">
                                <FiEdit className="w-4 h-4" />
                                {t('edit')}
                            </Button>
                        </Link>
                        <Link href="/users">
                            <Button variant="outline" className="flex items-center gap-2">
                                <FiArrowLeft className="w-4 h-4" />
                                {t('back')}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Information */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FiUser className="w-5 h-5" />
                                    {t('user_information')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {t('user_id')}
                                        </span>
                                        <Badge variant="secondary">#{user.id}</Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {t('name')}
                                        </span>
                                        <span className="text-sm font-medium">{user.name}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                            <FiMail className="w-4 h-4" />
                                            {t('email')}
                                        </span>
                                        <span className="text-sm font-medium">{user.email}</span>
                                    </div>

                                    {user.phone && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <FiPhone className="w-4 h-4" />
                                                {t('phone')}
                                            </span>
                                            <span className="text-sm font-medium">{user.phone}</span>
                                        </div>
                                    )}

                                    {user.role && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {t('role')}
                                            </span>
                                            <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                                                {user.role === 'admin' ? t('admin') : t('user')}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Account Details */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FiCalendar className="w-5 h-5" />
                                    {t('account_details')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                                            {t('created_at')}
                                        </span>
                                        <span className="text-sm">{formatDate(user.created_at)}</span>
                                    </div>

                                    <div>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                                            {t('last_updated')}
                                        </span>
                                        <span className="text-sm">{formatDate(user.updated_at)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
