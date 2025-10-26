import React from 'react'
import { Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaMoneyBillWave, FaCalculator, FaChartLine, FaShieldAlt, FaHandshake, FaExclamationTriangle } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function WebsiteCommission() {
    const { t } = useTranslation()
    
    const commissionRates = [
        {
            category: t('website_commission.cars'),
            rate: '2%',
            minFee: 50,
            maxFee: 500,
            description: t('website_commission.cars_desc')
        },
        {
            category: t('website_commission.real_estate'),
            rate: '1.5%',
            minFee: 100,
            maxFee: 2000,
            description: t('website_commission.real_estate_desc')
        },
        {
            category: t('website_commission.electronics'),
            rate: '3%',
            minFee: 25,
            maxFee: 300,
            description: t('website_commission.electronics_desc')
        },
        {
            category: t('website_commission.fashion'),
            rate: '4%',
            minFee: 15,
            maxFee: 200,
            description: t('website_commission.fashion_desc')
        },
        {
            category: t('website_commission.home_garden'),
            rate: '2.5%',
            minFee: 20,
            maxFee: 250,
            description: t('website_commission.home_garden_desc')
        },
        {
            category: t('website_commission.jobs'),
            rate: '5%',
            minFee: 100,
            maxFee: 1000,
            description: t('website_commission.jobs_desc')
        }
    ]

    const paymentMethods = [
        { name: t('website_commission.bank_card'), fee: '0%', time: t('website_commission.instant') },
        { name: t('website_commission.bank_transfer'), fee: '0%', time: t('website_commission.work_days') },
        { name: t('website_commission.mada'), fee: '0%', time: t('website_commission.instant') },
        { name: t('website_commission.apple_pay'), fee: '0%', time: t('website_commission.instant') }
    ]

    return (
        <>
            <Head title={t('website_commission.title')} />
            <TopHeader />
            <MiddleHeader />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
                            <FaMoneyBillWave className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('website_commission.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('website_commission.subtitle')}</p>
                    </div>

                    {/* Commission Overview */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="flex items-center mb-6">
                            <FaChartLine className="text-green-500 text-2xl ml-3" />
                            <h2 className="text-2xl font-bold text-gray-800">{t('website_commission.commission_system')}</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('website_commission.how_it_works')}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3 space-x-reverse">
                                        <div className="bg-green-100 p-2 rounded-full">
                                            <span className="text-green-600 font-bold">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{t('website_commission.free_posting')}</h4>
                                            <p className="text-gray-600 text-sm">{t('website_commission.free_posting_desc')}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3 space-x-reverse">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <span className="text-blue-600 font-bold">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{t('website_commission.successful_sale')}</h4>
                                            <p className="text-gray-600 text-sm">{t('website_commission.successful_sale_desc')}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3 space-x-reverse">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <span className="text-purple-600 font-bold">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{t('website_commission.automatic_deduction')}</h4>
                                            <p className="text-gray-600 text-sm">{t('website_commission.automatic_deduction_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                                <h3 className="text-lg font-semibold text-green-800 mb-4">{t('website_commission.system_features')}</h3>
                                <ul className="space-y-2 text-green-700">
                                    <li className="flex items-center">
                                        <span className="text-green-500 ml-2">✓</span>
                                        {t('website_commission.no_posting_fees')}
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 ml-2">✓</span>
                                        {t('website_commission.commission_on_sale')}
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 ml-2">✓</span>
                                        {t('website_commission.competitive_prices')}
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 ml-2">✓</span>
                                        {t('website_commission.full_transparency')}
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 ml-2">✓</span>
                                        {t('website_commission.continuous_support')}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Commission Rates Table */}
                    {/* <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="flex items-center mb-6">
                            <FaCalculator className="text-blue-500 text-2xl ml-3" />
                            <h2 className="text-2xl font-bold text-gray-800">{t('website_commission.commission_table')}</h2>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-right px-6 py-4 font-semibold text-gray-800">{t('website_commission.category')}</th>
                                        <th className="text-right px-6 py-4 font-semibold text-gray-800">{t('website_commission.commission_rate')}</th>
                                        <th className="text-right px-6 py-4 font-semibold text-gray-800">{t('website_commission.minimum')}</th>
                                        <th className="text-right px-6 py-4 font-semibold text-gray-800">{t('website_commission.maximum')}</th>
                                        <th className="text-right px-6 py-4 font-semibold text-gray-800">{t('website_commission.details')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {commissionRates.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-6 py-4 font-semibold text-gray-800">{item.category}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                    {item.rate}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.minFee} {t('website_commission.aed')}</td>
                                            <td className="px-6 py-4 text-gray-600">{item.maxFee} {t('website_commission.aed')}</td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">{item.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center">
                                <FaExclamationTriangle className="text-yellow-600 ml-2" />
                                <p className="text-yellow-800 text-sm">
                                    <strong>{t('website_commission.note')}:</strong> {t('website_commission.note_desc')}
                                </p>
                            </div>
                        </div>
                    </div> */}

                    {/* Commission Calculator */}
                    {/* <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="flex items-center mb-6">
                            <FaCalculator className="text-purple-500 text-2xl ml-3" />
                            <h2 className="text-2xl font-bold text-gray-800">{t('website_commission.commission_calculator')}</h2>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('website_commission.sale_price')}</label>
                                    <input
                                        type="number"
                                        placeholder="1000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('website_commission.category')}</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                        <option>{t('website_commission.choose_category')}</option>
                                        {commissionRates.map((item, index) => (
                                            <option key={index} value={item.rate}>{item.category}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('website_commission.estimated_commission')}</label>
                                    <div className="bg-white px-4 py-3 border border-gray-300 rounded-lg">
                                        <span className="text-purple-600 font-bold">- {t('website_commission.aed')}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-center">
                                <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300">
                                    {t('website_commission.calculate_commission')}
                                </button>
                            </div>
                        </div>
                    </div> */}

                    {/* Payment Methods */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="flex items-center mb-6">
                            <FaShieldAlt className="text-indigo-500 text-2xl ml-3" />
                            <h2 className="text-2xl font-bold text-gray-800">{t('website_commission.payment_methods')}</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-6">
                            {paymentMethods.map((method, index) => (
                                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                                    <div className="text-3xl mb-3">💳</div>
                                    <h4 className="font-semibold text-gray-800 mb-2">{method.name}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{t('website_commission.additional_fees')}: {method.fee}</p>
                                    <p className="text-sm text-gray-500">{t('website_commission.processing_time')}: {method.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="flex items-center mb-6">
                            <FaHandshake className="text-teal-500 text-2xl ml-3" />
                            <h2 className="text-2xl font-bold text-gray-800">{t('website_commission.terms_conditions')}</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('website_commission.commission_terms')}</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.commission_on_confirmed_sale')}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.report_sale_48h')}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.non_refundable')}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.review_suspicious')}
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('website_commission.user_protection')}</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.full_protection')}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.rating_system')}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.technical_support')}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-teal-500 ml-2 mt-1">•</span>
                                        {t('website_commission.refund_guarantee')}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
                            <h2 className="text-3xl font-bold mb-4">{t('website_commission.have_questions')}</h2>
                            <p className="text-xl mb-6">{t('website_commission.support_ready')}</p>
                            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                                <a
                                    href="/contact"
                                    className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300"
                                >
                                    {t('website_commission.contact_us')}
                                </a>
                                <a
                                    href="mailto:commission@souqalsharqia.com"
                                    className="bg-green-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-300 transition-colors duration-300"
                                >
                                    {t('website_commission.email_directly')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomNavbar />
        </>
    )
}

export default WebsiteCommission
