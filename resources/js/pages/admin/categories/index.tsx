import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CustomMultiSelect from '@/components/custom/CustomMultiSelect';
import CustomImagePicker from '@/components/custom/CustomImagePicker';
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
import { Plus, FolderOpen, Search, Edit, Trash2, Eye, X, ChevronDown, ChevronUp } from 'lucide-react';
function Categories({ categories }: any) {
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
            title: t('categories'),
            href: '/categories/page',
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

    const { data, setData, post, processing, errors, reset } = useForm<CategoryForm>({
        title_en: '',
        title_ar: '',
        slug: '',
        image: '',
        description: '',
        is_active: true,
        sort_order: 0,
        parent_id: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        meta_image: '',
        meta_robots: 'index, follow',
        meta_canonical: '',
        meta_author: '',
        meta_open_graph_title: '',
        meta_open_graph_description: '',
        places: [],
    });

    const submit = (e: any) => {
        e.preventDefault()

        post(route('category.store'), {
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
            <Head title={t('categories')} />
            
            <div className="min-h-screen bg-gray-50/50">
                <div className="container mx-auto p-6">
                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <FolderOpen className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1 arabic-font">
                                        {t('categories')}
                                    </h1>
                                    <p className="text-gray-600 text-sm arabic-font">
                                        {t('manage_your_categories')}
                                    </p>
                                </div>
                            </div>
                            <Button 
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="bg-main hover:bg-main/90 flex items-center gap-2"
                            >
                                {showAddForm ? (
                                    <>
                                        <X className="w-4 h-4" />
                                        {t('cancel')}
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        {t('add_category')}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Add Category Form - Collapsible */}
                    {showAddForm && (
                        <Card className="shadow-sm border-gray-200 mb-6">
                            <CardHeader className="bg-gray-50/50 border-b border-gray-200">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Plus className="w-5 h-5 text-gray-600" />
                                    {t('add_new_category')}
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

                                    {/* Meta Information - Collapsible */}
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
                                            {processing ? t('saving') : t('add_category')}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Categories Table */}
                    <Card className="shadow-sm border-gray-200 p-4">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-200">
                            <CardTitle className="flex items-center gap-2 text-lg arabic-font">
                                <Search className="w-5 h-5 text-gray-600" />
                                {t('categories_list')}
                                <Badge variant="secondary" className="ml-2">
                                    {categories?.length || 0}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {categories && categories.length > 0 ? (
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
                                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font'>{t('title_en')}</th>
                                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font'>{t('title_ar')}</th>
                                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font'>{t('image')}</th>
                                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font'>{t('status')}</th>
                                                <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider arabic-font'>{t('actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {categories.map((category: any) => (
                                                <tr key={category.id} className="hover:bg-gray-50">
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{category.title_en}</td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{category.title_ar}</td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        {category.image ? (
                                                            <img
                                                                src={`${category.image}`}
                                                                alt={category.title_en}
                                                                className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <Eye className="w-4 h-4 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        <Badge variant={category.is_active ? "default" : "secondary"}>
                                                            {category.is_active ? t('active') : t('inactive')}
                                                        </Badge>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                        <div className="flex items-center gap-2">
                                                            <Link href={`/category/${category.id}/edit`}>
                                                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                                                    <Edit className="w-3 h-3" />
                                                                    {t('edit')}
                                                                </Button>
                                                            </Link>
                                                            <Link
                                                                href={`/category/${category.id}/delete`}
                                                                onClick={(e) => {
                                                                    if (!window.confirm(t('are-you-sure-delete'))) {
                                                                        e.preventDefault();
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
                                    <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('no_categories_found')}</h3>
                                    <p className="text-gray-600 mb-4">{t('create_your_first_category')}</p>
                                    <Button 
                                        onClick={() => setShowAddForm(true)}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t('add_category')}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Custommodal modalname={modalRef} message={t('category-added-successfully')} />
                </div>
            </div>
        </AppLayout>
    )
}

export default Categories