import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Custommodal from '@/components/custom/Custommodal';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import Buttons from 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import CustomMultiSelect from '@/components/custom/CustomMultiSelect';
import CustomImagePicker from '@/components/custom/CustomImagePicker';
import { Plus, Layers, Search, Edit, Trash2, Eye, X, ChevronDown, ChevronUp } from 'lucide-react';
function SubCategories({ categories, subcategories }: any) {
    const { t } = useTranslation();
    const { places }: any = usePage().props
    const modalRef = useRef<HTMLDialogElement>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
        {
            title: t('subcategories'),
            href: '/subcategories/page',
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

    const { data, setData, post, processing, errors, reset } = useForm<SubCategoryForm>({
        title_en: '',
        title_ar: '',
        slug: '',
        image: '',
        description: '',
        meta_description: '',
        meta_keywords: '',
        meta_image: '',
        meta_robots: '',
        categories: []
    });

    const submit = (e: any) => {
        e.preventDefault()

        post(route('subcategories.store'), {
            onSuccess: () => {
                reset();
                setShowAddForm(false);
                if (modalRef.current) {
                    modalRef.current.showModal();
                }
            },
        })
    }

    DataTable.use(DT);
    DataTable.use(Buttons);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('subcategories')} />
            
            <div className="min-h-screen bg-gray-50/50">
                <div className="container mx-auto p-6">
                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Layers className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1 arabic-font">
                                        {t('subcategories')}
                                    </h1>
                                    <p className="text-gray-600 text-sm arabic-font">
                                        {t('manage_your_subcategories')}
                                    </p>
                                </div>
                            </div>
                            <Button 
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                            >
                                {showAddForm ? (
                                    <>
                                        <X className="w-4 h-4" />
                                        {t('cancel')}
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        {t('add_subcategory')}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Add Subcategory Form - Collapsible */}
                    {showAddForm && (
                        <Card className="shadow-sm border-gray-200 mb-6">
                            <CardHeader className="bg-gray-50/50 border-b border-gray-200">
                                <CardTitle className="flex items-center gap-2 text-lg arabic-font">
                                    <Plus className="w-5 h-5 text-gray-600" />
                                    {t('add_new_subcategory')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form onSubmit={submit} className="space-y-6">
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

                                    {/* Image Upload */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-700">
                                            {t('image')}
                                        </Label>
                                        <CustomImagePicker
                                            label=""
                                            value={data.image}
                                            onChange={file => setData('image', file)}
                                            error={errors.image}
                                        />
                                    </div>

                                    {/* Meta Information - Collapsible */}
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
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            onClick={() => setShowAddForm(false)}
                                            className="min-w-[100px]"
                                        >
                                            {t('cancel')}
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            disabled={processing} 
                                            className="min-w-[120px] bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            {processing ? t('saving') : t('add_subcategory')}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Subcategories Table */}
                    <Card className="shadow-sm border-gray-200 p-4">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Search className="w-5 h-5 text-gray-600" />
                                {t('subcategories_list')}
                                <Badge variant="secondary" className="ml-2">
                                    {subcategories?.length || 0}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {subcategories && subcategories.length > 0 ? (
                                <div className="overflow-hidden">
                                    <DataTable
                                        className="w-full"
                                        options={{
                                            dom: 'Bfrtip',
                                            buttons: [
                                                {
                                                    extend: 'copyHtml5',
                                                    text: t('copy'),
                                                    className: 'btn btn-sm bg-blue-600 text-white hover:bg-blue-700 border-0 rounded-md px-3 py-1 mr-2',
                                                },
                                                {
                                                    extend: 'excelHtml5',
                                                    text: t('export-to-excel'),
                                                    className: 'btn btn-sm bg-green-600 text-white hover:bg-green-700 border-0 rounded-md px-3 py-1 mr-2',
                                                },
                                                {
                                                    extend: 'csvHtml5',
                                                    text: t('export-to-CSV'),
                                                    className: 'btn btn-sm bg-orange-600 text-white hover:bg-orange-700 border-0 rounded-md px-3 py-1 mr-2',
                                                },
                                                {
                                                    extend: 'pdfHtml5',
                                                    text: t('export-to-pdf'),
                                                    className: 'btn btn-sm bg-red-600 text-white hover:bg-red-700 border-0 rounded-md px-3 py-1 mr-2',
                                                },
                                                {
                                                    extend: 'print',
                                                    text: t('print'),
                                                    className: 'btn btn-sm bg-gray-600 text-white hover:bg-gray-700 border-0 rounded-md px-3 py-1',
                                                }
                                            ],
                                            responsive: true,
                                            pageLength: 10,
                                            language: {
                                                search: t('search') + ':',
                                                lengthMenu: t('show') + ' _MENU_ ' + t('entries'),
                                                info: t('showing') + ' _START_ ' + t('to') + ' _END_ ' + t('of') + ' _TOTAL_ ' + t('entries'),
                                                paginate: {
                                                    first: t('first'),
                                                    last: t('last'),
                                                    next: t('next'),
                                                    previous: t('previous')
                                                }
                                            }
                                        }}
                                    >
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{t('title_en')}</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{t('title_ar')}</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{t('image')}</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{t('categories')}</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{t('actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {subcategories.map((sub: any) => (
                                                <tr key={sub.id} className="hover:bg-gray-50">
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{sub.title_en}</td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{sub.title_ar}</td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        {sub.image ? (
                                                            <img
                                                                src={sub.image}
                                                                alt={sub.title_ar}
                                                                className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <Eye className="w-4 h-4 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <div className="flex flex-wrap gap-1">
                                                            {sub.categories && sub.categories.length > 0 ? (
                                                                sub.categories.slice(0, 2).map((category: any, index: number) => (
                                                                    <Badge key={index} variant="outline" className="text-xs">
                                                                        {category.title_ar}
                                                                    </Badge>
                                                                ))
                                                            ) : (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    {t('no_categories')}
                                                                </Badge>
                                                            )}
                                                            {sub.categories && sub.categories.length > 2 && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    +{sub.categories.length - 2}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                        <div className="flex items-center gap-2">
                                                            <Link href={`/subcategory/edit/${sub.slug}/${sub.id}`}>
                                                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                                    <Edit className="w-3 h-3" />
                                                                    {t('edit')}
                                                                </Button>
                                                            </Link>
                                                            <Link
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (window.confirm(t('are-you-sure-delete'))) {
                                                                        // Add delete functionality here
                                                                    }
                                                                }}
                                                            >
                                                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1">
                                                                    <Trash2 className="w-3 h-3" />
                                                                    {t('delete')}
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </DataTable>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('no_subcategories_found')}</h3>
                                    <p className="text-gray-600 mb-4">{t('create_your_first_subcategory')}</p>
                                    <Button 
                                        onClick={() => setShowAddForm(true)}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t('add_subcategory')}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Custommodal modalname={modalRef} message={t('subcategory-added-successfully')} />
                </div>
            </div>
        </AppLayout>
    )
}

export default SubCategories