import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { 
    FiUsers, 
    FiShoppingBag, 
    FiMapPin, 
    FiSettings, 
    FiBarChart,
    FiGrid,
    FiLayers
} from 'react-icons/fi';

export default function Dashboard() {
    const { t } = useTranslation();
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard'),
            href: '/dashboard',
        },
    ];

    const quickActions = [
        {
            title: t('categories'),
            description: 'إدارة الفئات الرئيسية',
            icon: FiGrid,
            href: '/categories/page',
            color: 'bg-blue-500'
        },
        {
            title: t('subcategories'),
            description: 'إدارة الفئات الفرعية',
            icon: FiLayers,
            href: '/subcategories/page',
            color: 'bg-green-500'
        },
        {
            title: t('places'),
            description: 'إدارة الأماكن والمناطق',
            icon: FiMapPin,
            href: '/places/page',
            color: 'bg-purple-500'
        },
        {
            title: t('settings'),
            description: 'إعدادات الموقع العامة',
            icon: FiSettings,
            href: '/settings',
            color: 'bg-gray-500'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard')} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            مرحباً بك في لوحة التحكم
                        </h1>
                        <p className="text-lg text-gray-600 mb-4">
                            سوق الشرقية - منصة الإعلانات المبوبة الرائدة
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <p className="text-gray-700 leading-relaxed">
                                مرحباً بك في لوحة التحكم الخاصة بموقع سوق الشرقية. من هنا يمكنك إدارة جميع جوانب الموقع بسهولة وفعالية. 
                                يمكنك إضافة وتعديل الفئات، إدارة الأماكن، وتخصيص إعدادات الموقع لضمان تجربة مستخدم مثالية.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                        الإجراءات السريعة
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => {
                            const IconComponent = action.icon;
                            return (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className="group block p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-all duration-200 hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {action.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-600 group-hover:text-gray-700">
                                        {action.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                            <FiBarChart className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">إحصائيات شاملة</h3>
                        <p className="text-gray-600 text-sm">
                            تتبع أداء الموقع والمحتوى بطريقة مفصلة ودقيقة
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                            <FiUsers className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">إدارة متقدمة</h3>
                        <p className="text-gray-600 text-sm">
                            أدوات قوية لإدارة المحتوى والمستخدمين بكفاءة
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                            <FiShoppingBag className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">تجربة مثالية</h3>
                        <p className="text-gray-600 text-sm">
                            واجهة بديهية وسهلة الاستخدام لإدارة فعالة
                        </p>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
