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
import { Edit3, Save, X, ArrowLeft, FolderOpen } from 'lucide-react';
function EditCategory({ category }: any) {
    const { t } = useTranslation();
    const { places }: any = usePage().props
    const modalRef = useRef<HTMLDialogElement>(null);
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('categories'),
            href: '/categories/page',
        },
        {
            title: t('edit_category'),
            href: `/category/${category.id}/edit`,
        },
    ];

    type CategoryForm = {
        title_en: string;
        title_ar: string;
        slug: string;
        image: string | File | null;
        description: string;
        is_active: boolean;
        sort_order: number;
        parent_id: string;
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        meta_image: string;
        meta_robots: string;
        meta_canonical: string;
        meta_author: string;
        meta_open_graph_title: string;
        meta_open_graph_description: string;
        places: string[];
    };

    const { data, setData, post, processing, errors } = useForm<CategoryForm>({
        title_en: category.title_en || '',
        title_ar: category.title_ar || '',
        slug: category.slug || '',
        image: '',
        description: category.description || '',
        is_active: category.is_active || true,
        sort_order: category.sort_order || 0,
        parent_id: category.parent_id || '',
        meta_title: category.meta_title || '',
        meta_description: category.meta_description || '',
        meta_keywords: category.meta_keywords || '',
        meta_image: '',
        meta_robots: category.meta_robots || 'index, follow',
        meta_canonical: category.meta_canonical || '',
        meta_author: category.meta_author || '',
        meta_open_graph_title: category.meta_open_graph_title || '',
        meta_open_graph_description: category.meta_open_graph_description || '',
        places: category.places ? category.places.map((p: any) => p.id) : [],
    });

    const submit = (e: any) => {
        e.preventDefault()

        post(route('category.edit.confirm', category.id), {
            onSuccess: () => {
                // Redirect to categories page after successful update
                window.location.href = '/categories/page';
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('edit_category')}: ${category.title_en}`} />
            
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
                                        {t('edit_category')}
                                    </h1>
                                    <p className="text-gray-600 text-sm">
                                        {t('update_category_information')}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="secondary" className="text-xs">
                                            ID: {category.id}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {category.slug}
                                        </Badge>
                                        <Badge variant={category.is_active ? "default" : "secondary"} className="text-xs">
                                            {category.is_active ? t('active') : t('inactive')}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <Link href="/categories/page">
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
                                <FolderOpen className="w-5 h-5 text-gray-600" />
                                {t('category-details')}
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
                                                const titleValue = e.target.value;
                                                setData({
                                                    ...data,
                                                    title_en: titleValue,
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
                                                setData({
                                                    ...data,
                                                    title_ar: e.target.value,
                                                    slug: e.target.value.trim().toLowerCase().replace(/\s+/g, '-'),
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

                                    {/* Sort Order */}
                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order" className="text-sm font-medium text-gray-700">
                                            {t('sort_order')}
                                        </Label>
                                        <Input
                                            id="sort_order"
                                            type="number"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                            className="transition-colors focus:border-blue-500"
                                            placeholder="0"
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
                                    {category.image && (
                                        <div className="space-y-2">
                                            <p className="text-xs text-gray-500">{t('current_image')}:</p>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={`${category.image}`}
                                                    alt={category.title_en}
                                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                />
                                                <div className="text-sm text-gray-600">
                                                    <p className="font-medium">{t('current_category_image')}</p>
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

                                {/* Places Multi-Select */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">
                                        {t('places')} <span className="text-red-500">*</span>
                                    </Label>
                                    <CustomMultiSelect
                                        label=""
                                        items={places}
                                        value={data.places}
                                        onChange={(val) => setData('places', val)}
                                        valueKey="id"
                                        labelKey="name"
                                        error={errors.places}
                                    />
                                </div>

                                {/* Meta Information Section */}
                                <div className="border-t pt-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4">{t('meta_information')}</h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_title" className="text-xs text-gray-600">
                                                {t('meta_title')}
                                            </Label>
                                            <Input
                                                id="meta_title"
                                                type="text"
                                                value={data.meta_title}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                className="text-sm"
                                                placeholder={t('meta_title')}
                                            />
                                        </div>
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
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                                    <Link href="/categories/page">
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

                    <Custommodal modalname={modalRef} message={t('category-updated-successfully')} />
                </div>
            </div>
        </AppLayout>
    )
}

export default EditCategory