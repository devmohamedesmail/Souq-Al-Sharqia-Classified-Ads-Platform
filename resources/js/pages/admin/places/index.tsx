import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FiSave, FiEdit, FiTrash2, FiMapPin, FiPlus } from 'react-icons/fi';
function Places() {
    const { t } = useTranslation();
    const { places }: any = usePage().props;
    const [showForm, setShowForm] = useState(false);
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('places'),
            href: '/places/page',
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        post('/place/store', {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const handleDeleteConfirm = (place: any) => {
        if (confirm(`${t('are-you-sure-delete')} "${place.name}"?`)) {
            window.location.href = `/place/delete/${place.id}`;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('places')} />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 arabic-font">
                            <FiMapPin className="w-6 h-6 text-blue-600" />
                            {t('places')}
                        </h1>
                        <p className="text-gray-600 mt-1 arabic-font">
                            {t('manage_places_description')}
                        </p>
                    </div>
                    <Button 
                        onClick={() => setShowForm(!showForm)}
                        className="inline-flex items-center gap-2"
                    >
                        <FiPlus className="w-4 h-4" />
                        {showForm ? t('cancel') : t('add_place')}
                    </Button>
                </div>

                {/* Add Place Form */}
                {showForm && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 arabic-font">
                                <FiPlus className="w-5 h-5" />
                                {t('place-details')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{t('place-name')} *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e: any) => {
                                                const nameValue = e.target.value;
                                                setData({
                                                    ...data,
                                                    name: nameValue,
                                                    slug: nameValue.trim().toLowerCase().replace(/\s+/g, '-'),
                                                });
                                            }}
                                            className={errors.name ? 'border-red-500' : ''}
                                            placeholder={t('enter_place_name')}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="slug">{t('slug')} *</Label>
                                        <Input
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            onChange={(e: any) => setData('slug', e.target.value)}
                                            className={errors.slug ? 'border-red-500' : ''}
                                            placeholder={t('enter_slug')}
                                        />
                                        {errors.slug && (
                                            <p className="text-sm text-red-600">{errors.slug}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="description">{t('description')}</Label>
                                        <Input
                                            id="description"
                                            type="text"
                                            value={data.description}
                                            onChange={(e: any) => setData('description', e.target.value)}
                                            className={errors.description ? 'border-red-500' : ''}
                                            placeholder={t('enter_description')}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">{t('address')}</Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            value={data.address}
                                            onChange={(e: any) => setData('address', e.target.value)}
                                            className={errors.address ? 'border-red-500' : ''}
                                            placeholder={t('enter_address')}
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-red-600">{errors.address}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-4 pt-6">
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                        <FiSave className="w-4 h-4" />
                                        {processing ? t('saving') : t('save')}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Places Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className='arabic-font'>{t('places_list')} ({places?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font ">
                                            {t('name')}
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                            {t('slug')}
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                            {t('description')}
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                            {t('address')}
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font">
                                            {t('actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {places && places.length > 0 ? (
                                        places.map((place: any) => (
                                            <tr key={place.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 arabic-font text-center">
                                                        {place.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-700 arabic-font text-center">
                                                        {place.slug}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-700 max-w-xs truncate arabic-font text-center">
                                                        {place.description || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-700 max-w-xs truncate arabic-font text-center">
                                                        {place.address || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-2 justify-center">
                                                        <Link 
                                                            href={`/place/edit/${place.slug}/${place.id}`}
                                                            className="inline-flex arabic-font items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                                        >
                                                            <FiEdit className="w-3 h-3" />
                                                            {t('edit')}
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteConfirm(place)}
                                                            className="inline-flex arabic-font items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                                        >
                                                            <FiTrash2 className="w-3 h-3" />
                                                            {t('delete')}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <div className="text-gray-500">
                                                    <FiMapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                    <p className="text-lg font-medium">{t('no_places_found')}</p>
                                                    <p className="text-sm">{t('add_first_place')}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

export default Places