import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { FaComments, FaExclamationTriangle, FaBug, FaLightbulb, FaStar, FaPaperPlane, FaUser, FaEnvelope } from 'react-icons/fa'
import TopHeader from '@/components/front/TopHeader'
import MiddleHeader from '@/components/front/MiddleHeader'
import Footer from '@/components/front/Footer'
import BottomNavbar from '@/components/front/BottomNavbar'

function Complaints() {
    const { t } = useTranslation()
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        type: '',
        priority: '',
        subject: '',
        description: '',
        ad_id: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/complaints', {
            onSuccess: () => {
                reset()
            }
        })
    }

    const complaintTypes = [
        { value: 'complaint', label: t('complaints.complaint_type'), icon: FaExclamationTriangle, color: 'red' },
        { value: 'suggestion', label: t('complaints.suggestion_type'), icon: FaLightbulb, color: 'yellow' },
        { value: 'bug', label: t('complaints.bug_type'), icon: FaBug, color: 'orange' },
        { value: 'feedback', label: t('complaints.feedback_type'), icon: FaStar, color: 'green' }
    ]

    return (
        <>
            <Head title={t('complaints.title')} />
            <TopHeader />
            <MiddleHeader />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-6">
                            <FaComments className="text-white text-3xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('complaints.title')}</h1>
                        <p className="text-gray-600 text-lg">{t('complaints.subtitle')}</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <div className="text-blue-500 text-2xl mb-2">📊</div>
                            <div className="text-2xl font-bold text-gray-800">2,500+</div>
                            <div className="text-sm text-gray-600">{t('complaints.evaluations_received')}</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <div className="text-green-500 text-2xl mb-2">✅</div>
                            <div className="text-2xl font-bold text-gray-800">95%</div>
                            <div className="text-sm text-gray-600">{t('complaints.resolved')}</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <div className="text-yellow-500 text-2xl mb-2">⚡</div>
                            <div className="text-2xl font-bold text-gray-800">24</div>
                            <div className="text-sm text-gray-600">{t('complaints.response_hours')}</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <div className="text-purple-500 text-2xl mb-2">💡</div>
                            <div className="text-2xl font-bold text-gray-800">150+</div>
                            <div className="text-sm text-gray-600">{t('complaints.suggestions_implemented')}</div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('complaints.send_complaint')}</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FaUser className="inline ml-2" />
                                        {t('common.full_name')} *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t('common.full_name_placeholder')}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FaEnvelope className="inline ml-2" />
                                        {t('common.email')} *
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t('common.email_placeholder')}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Type Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">
                                    {t('complaints.message_type')} *
                                </label>
                                <div className="grid md:grid-cols-4 gap-4">
                                    {complaintTypes.map((type) => {
                                        const IconComponent = type.icon
                                        return (
                                            <label
                                                key={type.value}
                                                className={`relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all duration-200 ${
                                                    data.type === type.value
                                                        ? `border-${type.color}-500 bg-${type.color}-50`
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={type.value}
                                                    checked={data.type === type.value}
                                                    onChange={(e) => setData('type', e.target.value)}
                                                    className="sr-only"
                                                />
                                                <IconComponent 
                                                    className={`mx-auto mb-2 text-2xl ${
                                                        data.type === type.value 
                                                            ? `text-${type.color}-500` 
                                                            : 'text-gray-400'
                                                    }`} 
                                                />
                                                <div className={`font-semibold ${
                                                    data.type === type.value ? `text-${type.color}-700` : 'text-gray-700'
                                                }`}>
                                                    {type.label}
                                                </div>
                                            </label>
                                        )
                                    })}
                                </div>
                                {errors.type && (
                                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                )}
                            </div>

                            {/* Priority and Phone */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('complaints.priority')}
                                    </label>
                                    <select
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">{t('complaints.choose_priority')}</option>
                                        <option value="low">{t('complaints.low')}</option>
                                        <option value="medium">{t('complaints.medium')}</option>
                                        <option value="high">{t('complaints.high')}</option>
                                        <option value="urgent">{t('complaints.urgent')}</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('common.phone')}
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t('common.phone_optional_placeholder')}
                                    />
                                </div>
                            </div>

                            {/* Subject and Ad ID */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('complaints.subject')} *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t('complaints.enter_subject')}
                                        required
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('complaints.ad_number')}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.ad_id}
                                        onChange={(e) => setData('ad_id', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t('complaints.enter_ad_number')}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('complaints.details')} *
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder={t('complaints.enter_details')}
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Guidelines */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-2">{t('complaints.important_guidelines')}</h4>
                                <ul className="text-blue-700 text-sm space-y-1">
                                    {(t('complaints.guidelines', { returnObjects: true }) as string[]).map((guideline: string, index: number) => (
                                        <li key={index}>• {guideline}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 space-x-reverse"
                                >
                                    <FaPaperPlane className="text-sm" />
                                    <span>{processing ? t('common.sending') : t('common.send_message')}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Success Stories */}
                    <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('complaints.success_stories')}</h2>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                                <div className="text-3xl mb-3">🔍</div>
                                <h4 className="font-semibold text-green-800 mb-2">{t('complaints.search_improvement')}</h4>
                                <p className="text-green-700 text-sm">
                                    {t('complaints.search_story')}
                                </p>
                            </div>
                            
                            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="text-3xl mb-3">📱</div>
                                <h4 className="font-semibold text-blue-800 mb-2">{t('complaints.mobile_app')}</h4>
                                <p className="text-blue-700 text-sm">
                                    {t('complaints.mobile_story')}
                                </p>
                            </div>
                            
                            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="text-3xl mb-3">💬</div>
                                <h4 className="font-semibold text-purple-800 mb-2">{t('complaints.live_chat')}</h4>
                                <p className="text-purple-700 text-sm">
                                    {t('complaints.chat_story')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BottomNavbar/>
        </>
    )
}

export default Complaints
