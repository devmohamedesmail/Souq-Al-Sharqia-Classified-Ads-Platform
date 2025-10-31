import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Edit3, Save, X, ArrowLeft } from 'lucide-react';
function EditPlace({ place }: any) {
    const { t } = useTranslation();
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('places'),
            href: '/places/page',
        },
        {
            title: t('edit_place'),
            href: `/place/edit/${place.slug}/${place.id}`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name_en: place.name_en || '',
        name_ar: place.name_ar || '',
        slug: place.slug || '',
        description: place.description || '',
        address: place.address || '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(`/place/edit/confirm/${place.id}`, {
            onSuccess: () => {
                // Redirect to places page after successful update
                window.location.href = '/places/page';
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${t('edit_place')}: ${place.name_ar}`} />
            
            <div className="min-h-screen bg-gray-50/50">
                <div className="container mx-auto p-6 ">
                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Edit3 className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                        {t('edit_place')}
                                    </h1>
                                    <p className="text-gray-600 text-sm">
                                        {t('update_place_information')}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="secondary" className="text-xs">
                                            ID: {place.id}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {place.slug}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <Link href="/places/page">
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
                                <MapPin className="w-5 h-5 text-gray-600" />
                                {t('place-details')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Place Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                            {t('place-name-ar')} <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name_ar}
                                            onChange={(e: any) => {
                                                const nameValue = e.target.value;
                                                setData({
                                                    ...data,
                                                    name_ar: nameValue,
                                                    slug: nameValue.trim().toLowerCase().replace(/\s+/g, '-'),
                                                });
                                            }}
                                            className={`transition-colors ${errors.name_ar ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                            placeholder={t('enter_place_name')}
                                        />
                                        {errors.name_ar && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.name_ar}
                                            </p>
                                        )}
                                    </div>



                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                            {t('place-name-en')} <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name_en}
                                            onChange={(e: any) => {
                                                const nameValue = e.target.value;
                                                setData({
                                                    ...data,
                                                    name_en: nameValue,
                                                    // slug: nameValue.trim().toLowerCase().replace(/\s+/g, '-'),
                                                });
                                            }}
                                            className={`transition-colors ${errors.name_en ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                            placeholder={t('enter_place_name')}
                                        />
                                        {errors.name_en && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <X className="w-3 h-3" />
                                                {errors.name_en}
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
                                            onChange={(e: any) => setData('slug', e.target.value)}
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
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                        {t('description')}
                                    </Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e: any) => setData('description', e.target.value)}
                                        className={`transition-colors ${errors.description ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                        placeholder={t('enter_description')}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <X className="w-3 h-3" />
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                        {t('address')}
                                    </Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={data.address}
                                        onChange={(e: any) => setData('address', e.target.value)}
                                        className={`transition-colors ${errors.address ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                        placeholder={t('enter_address')}
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <X className="w-3 h-3" />
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                                    <Link href="/places/page">
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
                </div>
            </div>
        </AppLayout>
    );
}

export default EditPlace