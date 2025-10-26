import BottomNavbar from '@/components/front/BottomNavbar';
import Footer from '@/components/front/Footer';
import MiddleHeader from '@/components/front/MiddleHeader';
import TopHeader from '@/components/front/TopHeader';
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle, FaEdit, FaTrash, FaCheck, FaTimes, FaTag, FaThLarge } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';

const mockUser = {
    name: 'Mohamed Ali',
    email: 'mohamed@example.com',
    phone: '00212666121998',
    avatar: '', // You can use a URL or leave empty for default icon
};



function Account({ userAds }: any) {
    const [user, setUser] = useState(mockUser);
    const [editMode, setEditMode] = useState(false);
    const [editUser, setEditUser] = useState(user);
    const { auth }: any = usePage().props;
    const { t } = useTranslation()

    const handleEditSave = () => {
        setUser(editUser);
        setEditMode(false);
    };


    return (
        <div>
            <TopHeader />
            <MiddleHeader />
            <div className="container mx-auto max-w-3xl px-4 py-8">
                {/* User Info Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="flex-shrink-0">
                        {user.avatar ? (
                            <img src={user.avatar} alt={auth.name} className="w-24 h-24 rounded-full border-4 border-main shadow" />
                        ) : (
                            <FaUserCircle className="w-24 h-24 text-main/70" />
                        )}
                    </div>
                    <div className="flex-1">
                        {editMode ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={auth.user.name}
                                    onChange={e => setEditUser({ ...editUser, name: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:outline-main"
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    value={auth.user.email}
                                    onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:outline-main"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    value={auth.user.phone}
                                    onChange={e => setEditUser({ ...editUser, phone: e.target.value })}
                                    className="w-full border rounded px-3 py-2 focus:outline-main"
                                    placeholder="Phone"
                                />
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={handleEditSave}
                                        className="bg-main text-white px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-main/90 transition"
                                    >
                                        <FaCheck /> Save
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-gray-300 transition"
                                    >
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-main mb-1">{auth.user.name}</h2>
                                <p className="text-gray-700 mb-1">{auth.user.email}</p>
                                <p className="text-gray-700 mb-2">{auth.user.phone}</p>
                                {/* <button
                                    onClick={() => setEditMode(true)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-main font-bold px-4 py-2 rounded-full shadow transition flex items-center gap-2"
                                >
                                    <FaEdit /> Edit Profile
                                </button> */}
                                <Link
                                    href="/post/new/ads"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-main to-sky-400 text-white font-bold py-2 px-8 rounded-full shadow-lg hover:from-sky-400 hover:to-main hover:scale-105 transition-all duration-200 text-lg"
                                >
                                    <FaPlusCircle className="text-white text-xl" />
                                    {t('add_ad')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Ads */}



                <div>
                    <h3 className="text-xl font-bold text-main mb-4">{t('your-ads')}</h3>
                    <div className="grid gap-6">
                        {userAds.length === 0 && (
                            <div className="text-center text-gray-400 py-8">
                                <p>
                                    {t('no-ads')}
                                </p>
                                <Link href="/post/new/ads" className="bg-second py-2 px-10">{t('add_without_account')}</Link>
                            </div>
                        )}
                        {userAds.map((ad: any) => {
                            const adImages = ad.images ? JSON.parse(ad.images) : [];
                            return (
                                <div
                                    key={ad.id}
                                    className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 items-center border-b-2 border-main/10 hover:shadow-lg transition relative"
                                >
                                    {/* Main Image */}
                                    <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden border border-main/10">
                                        {adImages[0] ? (
                                            <img src={adImages[0]} alt={ad.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-400 text-sm">No Image</span>
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-wrap gap-2 mb-1">
                                            {/* Category Badge */}
                                            {ad.category && (
                                                <span className="inline-flex items-center gap-1 bg-main/10 text-main px-2 py-1 rounded-full text-xs font-semibold">
                                                    {ad.category.image && (
                                                        <img src={ad.category.image} alt="" className="w-4 h-4 rounded-full" />
                                                    )}
                                                    <FaTag className="text-main" />
                                                    {ad.category.title_en}
                                                </span>
                                            )}
                                            {/* Subcategory Badge */}
                                            {ad.subcategory && (
                                                <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-semibold">
                                                    <FaThLarge className="text-sky-700" />
                                                    {ad.subcategory.title_en}
                                                </span>
                                            )}
                                            {/* Places */}
                                            {ad.places && ad.places.length > 0 && ad.places.map((place: any) => (
                                                <span
                                                    key={place.id}
                                                    className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium"
                                                >
                                                    {place.name}
                                                </span>
                                            ))}
                                        </div>
                                        <h4 className="text-lg font-bold text-main mb-1">
                                            {ad.title
                                                ? ad.title.split(' ').slice(0, 5).join(' ') + (ad.title.split(' ').length > 5 ? '...' : '')
                                                : ''}
                                        </h4>
                                        <p className="text-gray-700 mb-2">
                                            {ad.description
                                                ? ad.description.split(' ').slice(0, 10).join(' ') + (ad.description.split(' ').length > 10 ? '...' : '')
                                                : <span className="text-gray-400">No description</span>}
                                        </p>
                                        <span className="text-green-600 font-semibold">{ad.price} $</span>
                                    </div>
                                    {/* Actions */}
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={`/edit/ad/${ad.slug}/${ad.id}`}
                                            className="bg-main text-white px-4 py-1 rounded-full font-semibold flex items-center gap-2 hover:bg-main/90 transition"
                                        >
                                            <FaEdit /> {t('edit')}
                                        </Link>
                                        <Link
                                            onClick={e => {
                                                if (!window.confirm(t('are-you-sure-delete'))) {
                                                    e.preventDefault();
                                                }
                                            }}

                                            href={`/delete/ad/${ad.slug}/${ad.id}`}

                                            className="bg-red-500 text-white px-4 py-1 rounded-full font-semibold flex items-center gap-2 hover:bg-red-600 transition"
                                        >
                                            <FaTrash /> {t('delete')}
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
            <BottomNavbar />
        </div>

    );
}

export default Account;