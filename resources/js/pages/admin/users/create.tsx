import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';

export default function UsersCreate() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    
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
            title: t('create_user'),
            href: '/users/create',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('create_user')} />
            
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {t('create_user')}
                    </h1>
                    <Link href="/users">
                        <Button variant="outline" className="flex items-center gap-2">
                            <FiArrowLeft className="w-4 h-4" />
                            {t('back')}
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('user_information')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('name')} *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-red-500' : ''}
                                        placeholder={t('enter_name')}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('email')} *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={errors.email ? 'border-red-500' : ''}
                                        placeholder={t('enter_email')}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">{t('phone')}</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className={errors.phone ? 'border-red-500' : ''}
                                        placeholder={t('enter_phone')}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">{t('password')} *</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className={errors.password ? 'border-red-500' : ''}
                                            placeholder={t('enter_password')}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        >
                                            {showPassword ? t('hide') : t('show')}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="password_confirmation">{t('confirm_password')} *</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className={errors.password_confirmation ? 'border-red-500' : ''}
                                        placeholder={t('confirm_password')}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-4 pt-6">
                                <Link href="/users">
                                    <Button variant="outline" type="button">
                                        {t('cancel')}
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                    <FiSave className="w-4 h-4" />
                                    {processing ? t('saving') : t('save')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
