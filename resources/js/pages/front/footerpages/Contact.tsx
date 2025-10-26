import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaUser, FaComments } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function Contact() {
    const { t } = useTranslation()
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/contact', {
            onSuccess: () => {
                reset()
            }
        })
    }

    return (
        <>
            <Head title={t('contact.title')} />
            <TopHeader />
            <MiddleHeader />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-6">
                            <FaComments className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('contact.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('contact.subtitle')}</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.contact_information')}</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <FaPhone className="text-blue-600 text-lg" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{t('contact.phone')}</h3>
                                            <p className="text-gray-600">+971 52 546 6900</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <FaEnvelope className="text-green-600 text-lg" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{t('contact.email')}</h3>
                                            <p className="text-gray-600">info@souqalsharqia.com</p>
                                            <p className="text-gray-600">support@souqalsharqia.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <div className="bg-purple-100 p-3 rounded-lg">
                                            <FaMapMarkerAlt className="text-purple-600 text-lg" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{t('contact.address')}</h3>
                                            <p className="text-gray-600">
                                                {t('contact.address_line1')}<br />
                                                {t('contact.address_line2')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <div className="bg-orange-100 p-3 rounded-lg">
                                            <FaClock className="text-orange-600 text-lg" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{t('contact.working_hours')}</h3>
                                            <p className="text-gray-600">
                                                {t('contact.weekdays')}<br />
                                                {t('contact.weekends')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-800 mb-2">{t('contact.response_time')}</h4>
                                    <p className="text-blue-700 text-sm">
                                        {t('contact.response_content')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.send_message')}</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name and Email */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <FaUser className="inline ml-2" />
                                                {t('contact.full_name')} *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder={t('contact.enter_name')}
                                                required
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <FaEnvelope className="inline ml-2" />
                                                {t('contact.email')} *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder={t('contact.enter_email')}
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone and Subject */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                <FaPhone className="inline ml-2" />
                                                {t('contact.phone_number')}
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder={t('contact.enter_phone')}
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                {t('contact.message_subject')} *
                                            </label>
                                            <select
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                required
                                            >
                                                <option value="">{t('contact.choose_subject')}</option>
                                                <option value="general">{t('contact.general_inquiry')}</option>
                                                <option value="support">{t('contact.technical_support')}</option>
                                                <option value="advertising">{t('contact.advertising')}</option>
                                                <option value="billing">{t('contact.billing')}</option>
                                                <option value="complaint">{t('contact.complaint')}</option>
                                                <option value="suggestion">{t('contact.suggestion')}</option>
                                                <option value="partnership">{t('contact.partnership')}</option>
                                                <option value="other">{t('contact.other')}</option>
                                            </select>
                                            {errors.subject && (
                                                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {t('contact.message')} *
                                        </label>
                                        <textarea
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder={t('contact.enter_message')}
                                            required
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 space-x-reverse"
                                        >
                                            <FaPaperPlane className="text-sm" />
                                            <span>{processing ? t('contact.sending') : t('contact.send_message_btn')}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-12">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('contact.faq')}</h2>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">{t('contact.how_to_post')}</h4>
                                        <p className="text-gray-600 text-sm">
                                            {t('contact.post_answer')}
                                        </p>
                                    </div>
                                    
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">{t('contact.edit_ad')}</h4>
                                        <p className="text-gray-600 text-sm">
                                            {t('contact.edit_answer')}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">{t('contact.boost_cost')}</h4>
                                        <p className="text-gray-600 text-sm">
                                            {t('contact.boost_answer')}
                                        </p>
                                    </div>
                                    
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">{t('contact.report_ad')}</h4>
                                        <p className="text-gray-600 text-sm">
                                            {t('contact.report_answer')}
                                        </p>
                                    </div>
                                </div>
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

export default Contact
