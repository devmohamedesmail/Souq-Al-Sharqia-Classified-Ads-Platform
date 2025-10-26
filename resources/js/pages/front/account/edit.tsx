import BottomNavbar from '@/components/front/BottomNavbar'
import Footer from '@/components/front/Footer'
import MiddleHeader from '@/components/front/MiddleHeader'
import TopHeader from '@/components/front/TopHeader'
import React, { useState, useRef } from 'react'
import { useForm } from '@inertiajs/react'
import CustomAnimatedInput from '@/components/custom/CustomAnimatedInput'
import { useTranslation } from 'react-i18next'
import CustomMultiSelect from '@/components/custom/CustomMultiSelect'
import { FaTimes, FaBullhorn } from 'react-icons/fa'
import Custommodal from '@/components/custom/Custommodal'

function EditAd({ ad, places, categories, subcategories }: any) {

    const { t, i18n } = useTranslation();
    const modalRef = useRef<HTMLDialogElement>(null);



    type AdForm = {
        name: string,
        email: string,
        phone: string,
        price: string,
        title: string,
        description: string,
        type: string,
        images: (File | string)[];
        places: string[];
        category_id: number | null,
        subcategory_id: number | null,
    };


    const initialImages = ad.images ? JSON.parse(ad.images) : [];

    const { data, setData, post, processing, errors, reset } = useForm<AdForm>({
        name: ad.name || '',
        email: ad.email || '',
        phone: ad.phone || '',
        price: ad.price || '',
        title: ad.title || '',
        description: ad.description || '',
        type: ad.type || '',
        images: initialImages,
        // places: initialPlaces,

        places: ad.places ? ad.places.map((p: any) => p.id) : [], category_id: ad.category_id || null,
        subcategory_id: ad.subcategory_id || null,
    });

    // For preview: show both existing and new images
    const [previewImages, setPreviewImages] = useState<string[]>(
        initialImages.length ? initialImages : []
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData('images', [...data.images.filter(img => typeof img === 'string'), ...files]);
            setPreviewImages([
                ...previewImages,
                ...files.map(file => URL.createObjectURL(file))
            ]);
        }
    };

    const selectedCategory = categories.find((cat: any) => cat.id === data.category_id);
    const filteredSubcategories = selectedCategory?.subcategories || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('edit.ad.confirm', [ad.slug, ad.id]), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreviewImages([]);
                if (modalRef.current) {
                     modalRef.current.close(); 
                    modalRef.current.showModal();
                }
            },
        })
    };



    return (
        <div className="min-h-screen bg-gray-50">
            <TopHeader />
            <MiddleHeader />

            {/* Creative Banner */}
            <div className="relative flex justify-center items-center py-8 px-4">
                <div className="w-full max-w-xl rounded-2xl bg-gradient-to-r from-main to-sky-400 shadow-xl flex items-center gap-4 p-6 animate-fade-in-up">
                    <div className="flex-shrink-0 bg-white/80 rounded-full p-4 shadow-lg animate-bounce-slow">
                        <FaBullhorn className="text-main text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">{t('edit-your-ad')}</h1>
                        <p className="text-white/90 text-sm md:text-base">
                            {t('edit-banner-message')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center py-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl space-y-6 border border-main/10"
                >
                    <h2 className="text-2xl font-bold text-center text-main mb-4 tracking-wide">{t('edit-ad')}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <CustomAnimatedInput
                            label={t('name')}
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            error={errors.name}
                        />
                        <CustomAnimatedInput
                            label={t('email')}
                            name="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            error={errors.email}
                        />
                        <CustomAnimatedInput
                            label={t('phone')}
                            name="phone"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            error={errors.phone}
                        />
                        <CustomAnimatedInput
                            label={t('price')}
                            type='number'
                            name="price"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                            error={errors.price}
                        />
                    </div>

                    <CustomAnimatedInput
                        label={t('ad-title')}
                        name="title"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        error={errors.title}
                    />
                    <textarea
                        name="description"
                        placeholder={t('ad-description')}
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-main"
                        rows={3}
                    />

                    <CustomMultiSelect
                        label={t('places')}
                        items={places}
                        value={data.places}
                        onChange={(val) => setData('places', val)}
                        valueKey="id"
                        labelKey="name"
                        error={errors.places}
                    />

                    <div>
                        <label className="block mb-1 font-semibold text-main">{t('select-category')}</label>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat: any) => (
                                <button
                                    type="button"
                                    key={cat.id}
                                    onClick={() => {
                                        setData({ ...data, category_id: cat.id, subcategory_id: null });
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition
                    ${data.category_id === cat.id
                                            ? 'bg-main text-white border-main shadow'
                                            : 'bg-gray-50 border-gray-200 hover:border-main hover:bg-main/10'}
                  `}
                                >
                                    <img src={cat.image} alt={cat.title_en} className="w-8 h-8 rounded-full border" />
                                    <span>{i18n.language === "ar" ? cat.title_ar : cat.title_en}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {data.category_id && (
                        <div>
                            <label className="block mb-1 font-semibold text-main">{t('select-subcategory')}</label>
                            <select
                                value={data.subcategory_id !== null ? data.subcategory_id : ''}
                                onChange={e => setData({ ...data, subcategory_id: e.target.value ? Number(e.target.value) : null })}
                                className="w-full border rounded px-3 py-2 focus:outline-main bg-gray-50"
                            >
                                <option value="">{t('select-subcategory')}</option>
                                {filteredSubcategories.map((sub: any) => (
                                    <option key={sub.id} value={sub.id}>{i18n.language === "ar" ? sub.title_ar : sub.title_en}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Images Upload */}
                    <div>
                        <label className="block mb-1 font-semibold text-main">{t('images')}</label>
                        <div
                            className="w-full border-2 border-dashed border-main/40 rounded-lg p-4 bg-main/5 flex flex-col items-center justify-center cursor-pointer hover:bg-main/10 transition group"
                            onClick={() => document.getElementById('ad-images-input')?.click()}
                        >
                            <input
                                id="ad-images-input"
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <span className="text-main font-medium group-hover:underline">{t('drag-images')}</span>
                            <span className="text-xs text-gray-400 mt-1">{t('select-many')}</span>
                        </div>
                        {previewImages.length > 0 && (
                            <div className="flex gap-3 mt-4 flex-wrap">
                                {previewImages.map((src, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={src}
                                            alt=""
                                            className="w-20 h-20 object-cover rounded-lg border-2 border-main/20 shadow"
                                        />
                                        <button
                                            type="button"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setPreviewImages(previewImages.filter((_, i) => i !== idx));
                                                setData('images', data.images.filter((_: any, i: number) => i !== idx));
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                                            title="Remove"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-main text-white py-2 rounded font-semibold hover:bg-main/90 transition"
                    >
                        {processing ? t('saving') : t('save-changes')}
                    </button>
                </form>
                <Custommodal modalname={modalRef} message={t('ad-updated-successfully')} />
               
            </div>

            <Footer />
            <BottomNavbar />
        </div>
    )
}

export default EditAd