import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Custommodal from '@/components/custom/Custommodal';
import CustomMultiSelect from '@/components/custom/CustomMultiSelect';
import CustomImagePicker from '@/components/custom/CustomImagePicker';
import { Edit3, Save, X, ArrowLeft, Layers } from 'lucide-react';
function EditSubcategory({ categories, subCategory }: any) {
    const { t } = useTranslation();
    const { places }: any = usePage().props
    const modalRef = useRef<HTMLDialogElement>(null);
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('subcategories'),
            href: '/subcategories/page',
        },
        {
            title: t('edit_subcategory'),
            href: `/subcategory/edit/${subCategory.slug}/${subCategory.id}`,
        },
    ];

    type SubCategoryForm = {
        title_en: string;
        title_ar: string;
        slug: string;
        image: string | File | null;
        description: string;
        meta_description: string;
        meta_keywords: string;
        meta_image: string;
        meta_robots: string;
        categories: string[]
    };

    const { data, setData, post, processing, errors } = useForm<SubCategoryForm>({
        title_en: subCategory.title_en || '',
        title_ar: subCategory.title_ar || '',
        slug: subCategory.slug || '',
        image: '',
        description: subCategory.description || '',
        meta_description: subCategory.meta_description || '',
        meta_keywords: subCategory.meta_keywords || '',
        meta_image: subCategory.meta_image || '',
        meta_robots: subCategory.meta_robots || '',
        categories: subCategory.categories ? subCategory.categories.map((p: any) => p.id) : [],
    });

    const submit = (e: any) => {
        e.preventDefault()

        post(route('subcategories.update.confirm', subCategory.id), {
            onSuccess: () => {
                // Redirect to subcategories page after successful update
                window.location.href = '/subcategories/page';
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('edit_subcategory')}: ${subCategory.title_en}`} />
            
            <div className="min-h-screen bg-gray-50/50">
                <div className="container mx-auto p-6 max-w-4xl">
                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Edit3 className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                        {t('edit_subcategory')}
                                    </h1>
                                    <p className="text-gray-600 text-sm">
                                        {t('update_subcategory_information')}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="secondary" className="text-xs">
                                            ID: {subCategory.id}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {subCategory.slug}
                                        </Badge>
                                        {subCategory.categories && subCategory.categories.length > 0 && (
                                            <Badge variant="default" className="text-xs">
                                                {subCategory.categories.length} {t('categories')}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Link href="/subcategories/page">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    {t('back')}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Edit Form Card */}
                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Layers className="w-5 h-5 text-gray-600" />
                                {t('subcategory-details')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Main Information */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* English Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title_en" className="text-sm font-medium text-gray-700">
                                            {t('title_en')} <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="title_en"
                                            type="text"
                                            value={data.title_en}
                                            onChange={(e) => {
                                                const nameValue = e.target.value;
                                                setData({
                                                    ...data,
                                                    title_en: nameValue,
                                                });
                                            }}
                                            className={`transition-colors ${errors.title_en ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                            placeholder={t('enter_english_title')}
                                        />
                                        {errors.title_en && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.title_en}
                                            </p>
                                        )}
                                    </div>

                                    {/* Arabic Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title_ar" className="text-sm font-medium text-gray-700">
                                            {t('title_ar')} <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="title_ar"
                                            type="text"
                                            value={data.title_ar}
                                            onChange={(e) => {
                                                const nameValue = e.target.value;
                                                setData({
                                                    ...data,
                                                    title_ar: nameValue,
                                                    slug: nameValue.trim().toLowerCase().replace(/\s+/g, '-'),
                                                });
                                            }}
                                            className={`transition-colors ${errors.title_ar ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                            placeholder={t('enter_arabic_title')}
                                        />
                                        {errors.title_ar && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.title_ar}
                                            </p>
                                        )}
                                    </div>

                                    {/* Slug */}
                                    <div className="space-y-2">
                                        <Label htmlFor="slug" className="text-sm font-medium text-gray-700">
                                            {t('slug')} <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className={`transition-colors font-mono text-sm ${errors.slug ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                            placeholder={t('enter_slug')}
                                        />
                                        {errors.slug && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.slug}
                                            </p>
                                        )}
                                    </div>

                                    {/* Categories */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">
                                            {t('categories')} <span className="text-red-500">*</span>
                                        </Label>
                                        <CustomMultiSelect
                                            label=""
                                            items={categories}
                                            value={data.categories}
                                            onChange={(val) => setData('categories', val)}
                                            valueKey="id"
                                            labelKey="title_ar"
                                            error={errors.categories}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                        {t('description')}
                                    </Label>
                                    <Input
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="transition-colors focus:border-blue-500"
                                        placeholder={t('enter_description')}
                                    />
                                </div>

                                {/* Current Image and Upload */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-medium text-gray-700">
                                        {t('image')}
                                    </Label>
                                    
                                    {/* Current Image Display */}
                                    {subCategory.image && (
                                        <div className="space-y-2">
                                            <p className="text-xs text-gray-500">{t('current_image')}:</p>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={subCategory.image}
                                                    alt={subCategory.title_en}
                                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                />
                                                <div className="text-sm text-gray-600">
                                                    <p className="font-medium">{t('current_subcategory_image')}</p>
                                                    <p className="text-xs">{t('upload_new_to_replace')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* New Image Upload */}
                                    <CustomImagePicker
                                        label={t('upload_new_image')}
                                        value={data.image}
                                        onChange={file => setData('image', file)}
                                        error={errors.image}
                                    />
                                </div>

                                {/* Meta Information Section */}
                                <div className="border-t pt-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4">{t('meta_information')}</h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_description" className="text-xs text-gray-600">
                                                {t('meta_description')}
                                            </Label>
                                            <Input
                                                id="meta_description"
                                                type="text"
                                                value={data.meta_description}
                                                onChange={(e) => setData('meta_description', e.target.value)}
                                                className="text-sm"
                                                placeholder={t('meta_description')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_keywords" className="text-xs text-gray-600">
                                                {t('meta_keywords')}
                                            </Label>
                                            <Input
                                                id="meta_keywords"
                                                type="text"
                                                value={data.meta_keywords}
                                                onChange={(e) => setData('meta_keywords', e.target.value)}
                                                className="text-sm"
                                                placeholder={t('meta_keywords')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_image" className="text-xs text-gray-600">
                                                {t('meta_image')}
                                            </Label>
                                            <Input
                                                id="meta_image"
                                                type="text"
                                                value={data.meta_image}
                                                onChange={(e) => setData('meta_image', e.target.value)}
                                                className="text-sm"
                                                placeholder={t('meta_image')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_robots" className="text-xs text-gray-600">
                                                {t('meta_robots')}
                                            </Label>
                                            <Input
                                                id="meta_robots"
                                                type="text"
                                                value={data.meta_robots}
                                                onChange={(e) => setData('meta_robots', e.target.value)}
                                                className="text-sm"
                                                placeholder={t('meta_robots')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                                    <Link href="/subcategories/page">
                                        <Button variant="outline" type="button" className="min-w-[100px]">
                                            {t('cancel')}
                                        </Button>
                                    </Link>
                                    <Button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="min-w-[120px] bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {processing ? t('saving') : t('save_changes')}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Custommodal modalname={modalRef} message={t('subcategory-updated-successfully')} />
                </div>
            </div>
        </AppLayout>
    )
}

export default EditSubcategory