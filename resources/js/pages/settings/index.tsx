import CustomInput from '@/components/custom/CustomInput';
import Custommodal from '@/components/custom/Custommodal';
import CustomtextArea from '@/components/custom/CustomtextArea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react'
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SettingsForm {
    website_name: string;
    description: string;
    keywords: string;
    logo: File | null;
    phone: string;
    address: string;
    email: string;
    currency_en: string;
    currency_ar: string;
    meta_description: string;
    meta_keywords: string;
    meta_author: string;
    maintenance_mode: boolean;
    about_us: string;
    copyright: string;
}

export default function Settings({ settings }: any) {

    const modalRef = useRef<HTMLDialogElement>(null);
    const { t } = useTranslation();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('settings'),
            href: '/dashboard',
        },
    ];




    const { data, setData, post, processing, errors } = useForm<any>({
        website_name: settings.website_name || '',
        description: settings.description || '',
        keywords: settings.keywords || '',
        logo: '',
        phone: settings.phone || '',
        address: settings.address || '',
        email: settings.email || '',
        currency_en: settings.currency_en || '',
        currency_ar: settings.currency_ar || '',
        meta_description: settings.meta_description || '',
        meta_keywords: settings.meta_keywords || '',
        meta_author: settings.meta_author || '',
        maintenance_mode: settings.maintenance_mode || false,
        about_us: settings.about_us || '',
        copyright: settings.copyright || '',
    })

    const update_settings = (e: any) => {
        e.preventDefault()
        post(route('settings.update'), {
            forceFormData: true,
            onSuccess: () => {
                if (modalRef.current) {
                    modalRef.current.showModal();
                }
            },
        })
    }


   


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('settings')} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 arabic-font">{t('settings')}</h1>
                            <p className="text-sm text-gray-500 mt-1 arabic-font">
                                {t('manage_your_website_settings')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <form onSubmit={update_settings} className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                            {/* General Information Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b arabic-font">
                                    {t('general_information')}
                                </h2>
                                <div className="space-y-4">
                                    <CustomInput
                                        label={t('website-name')}
                                        type='text'
                                        placeholder={t('website-name')}
                                        value={data.website_name}
                                        onChange={(e: any) => setData('website_name', e.target.value)}
                                    />
                                    <CustomtextArea
                                        label={t('description')}
                                        value={data.description}
                                        onChange={(e: any) => setData('description', e.target.value)}
                                        placeholder={t('description')}
                                        error={errors.description as string || ''}
                                    // error={typeof errors.description === 'string' ? errors.description : ''}
                                    />
                                    <CustomtextArea
                                        label={t('keywords')}
                                        value={data.keywords}
                                        onChange={(e: any) => setData('keywords', e.target.value)}
                                        placeholder={t('keywords')}
                                        error={errors.keywords || ''}
                                    />
                                </div>
                            </div>

                            {/* Contact Information Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b arabic-font">
                                    {t('contact_information')}
                                </h2>
                                <div className="space-y-4">
                                    <CustomInput
                                        label={t('phone')}
                                        type='text'
                                        placeholder={t('phone')}
                                        value={data.phone}
                                        onChange={(e: any) => setData('phone', e.target.value)}
                                    />
                                    <CustomInput
                                        label={t('email')}
                                        type='text'
                                        placeholder={t('email')}
                                        value={data.email}
                                        onChange={(e: any) => setData('email', e.target.value)}
                                    />
                                    <CustomtextArea
                                        label={t('address')}
                                        value={data.address}
                                        onChange={(e: any) => setData('address', e.target.value)}
                                        placeholder={t('address')}
                                        error={errors.address || ''}
                                    />
                                </div>
                            </div>

                            {/* Currency Settings Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b arabic-font">
                                    {t('setting.currency_settings')}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <CustomInput
                                        label={t('setting.currency_english')}
                                        type='text'
                                        placeholder={t('currency_english')}
                                        value={data.currency_en}
                                        onChange={(e: any) => setData('currency_en', e.target.value)}
                                    />
                                    <CustomInput
                                        label={t('setting.currency_arabic')}
                                        type='text'
                                        placeholder={t('setting.currency_arabic')}
                                        value={data.currency_ar}
                                        onChange={(e: any) => setData('currency_ar', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* SEO Settings Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b arabic-font">
                                    {t('setting.seo_settings')}
                                </h2>
                                <div className="space-y-4">
                                    <CustomtextArea
                                        label={t('setting.meta_description')}
                                        value={data.meta_description}
                                        onChange={(e: any) => setData('meta_description', e.target.value)}
                                        placeholder={t('meta_description')}
                                        error={errors.meta_description || ''}
                                    />
                                    <CustomtextArea
                                        label={t('setting.meta_keywords')}
                                        value={data.meta_keywords}
                                        onChange={(e: any) => setData('meta_keywords', e.target.value)}
                                        placeholder={t('meta_keywords')}
                                        error={errors.meta_keywords || ''}
                                    />
                                    <CustomInput
                                        label={t('setting.meta_author')}
                                        type='text'
                                        placeholder={t('meta_author')}
                                        value={data.meta_author}
                                        onChange={(e: any) => setData('meta_author', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Website Content Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b arabic-font">
                                    {t('setting.website_content')}
                                </h2>
                                <div className="space-y-4">
                                    <CustomtextArea
                                        label={t('setting.about_us')}
                                        value={data.about_us}
                                        onChange={(e: any) => setData('about_us', e.target.value)}
                                        placeholder={t('about_us')}
                                        error={errors.about_us || ''}
                                    />
                                    <CustomtextArea
                                        label={t('setting.copyright')}
                                        value={data.copyright}
                                        onChange={(e: any) => setData('copyright', e.target.value)}
                                        placeholder={t('copyright')}
                                        error={errors.copyright || ''}
                                    />
                                </div>
                            </div>

                            {/* System Settings Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b arabic-font">
                                    {t('setting.system_settings')}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="maintenance_mode"
                                        checked={data.maintenance_mode}
                                        onCheckedChange={(checked) => setData('maintenance_mode', checked)}
                                    />
                                    <Label htmlFor="maintenance_mode" className="arabic-font">
                                        {t('setting.maintenance_mode')}
                                    </Label>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 arabic-font">
                                    {t('setting.maintenance_mode_description')}
                                </p>
                            </div>

                            {/* Save Button */}
                            <div className='flex justify-end pt-4 border-t'>
                                <Button className="bg-black hover:bg-orange-600 px-8" disabled={processing}>
                                    {processing ? t('saving') : t('save')}
                                </Button>

                            </div>
                        </form>
                    </div>

                    {/* Logo Upload Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b arabic-font">
                                {t('website_logo')}
                            </h2>
                            <label
                                className='group cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg flex flex-col justify-center items-center p-8 transition-all duration-200 hover:bg-blue-50'
                                htmlFor="logo"
                            >
                                <input
                                    className='hidden'
                                    id="logo"
                                    type='file'
                                    onChange={(e: any) => setData('logo', e.target.files[0])}
                                    accept="image/*"
                                />

                            

                                {settings.logo ? (
                                    <div className="relative">
                                        <img
                                            src={`${settings.logo}`}
                                            alt="Website Logo"
                                            className='w-40 h-40 object-contain rounded-lg'
                                        />
                                        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
                                            <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">Change Logo</span>
                                        </div> */}
                                    </div>
                                ) : (
                                    <div className='flex flex-col items-center justify-center gap-3 text-gray-400 group-hover:text-blue-500'>
                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className='text-sm font-medium arabic-font'>{t('no-logo')}</span>
                                        <span className='text-xs text-gray-400'>Click to upload</span>
                                    </div>
                                )}
                            </label>
                            <p className="text-xs text-gray-500 mt-3 text-center">Recommended: PNG or SVG format, max 2MB</p>
                        </div>
                    </div>
                </div>
            </div>

            <Custommodal modalname={modalRef} message={t('updated-successfully')} />



        </AppLayout>
    );
}
