import React, { useState } from 'react'
import { useForm, Head } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import TopHeader from '@/components/front/TopHeader';
import MiddleHeader from '@/components/front/MiddleHeader';
import Footer from '@/components/front/Footer';
import BottomNavbar from '@/components/front/BottomNavbar';

function BoostAd() {
  const { t } = useTranslation()
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    link: '',
    subject: '',
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    post(route('boost-ad.store'), {
      onSuccess: () => {
        setSuccess(true);
        reset();
      }
    });
  };

  return (
    <>
    <Head title={t('boost_form.title')} />
    <TopHeader />
    <MiddleHeader />
    <div className="min-h-screen bg-gradient-to-br from-main/5 to-yellow-50 flex items-center justify-center py-12 px-4">
        
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-main mb-6 text-center">🚀 {t('boost_form.title')}</h1>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center font-bold">
            {t('boost_form.success_message')}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-bold text-main">{t('boost_form.name')} <span className="text-red-500">*</span></label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded border ${errors.name ? 'border-red-400' : 'border-main/20'} focus:outline-none focus:ring-2 focus:ring-main`}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              placeholder={t('boost_form.name_placeholder')}
              required
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>
          <div>
            <label className="block mb-1 font-bold text-main">{t('boost_form.phone')} <span className="text-red-500">*</span></label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded border ${errors.phone ? 'border-red-400' : 'border-main/20'} focus:outline-none focus:ring-2 focus:ring-main`}
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
              placeholder={t('boost_form.phone_placeholder')}
              required
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
          </div>
          <div>
            <label className="block mb-1 font-bold text-main">{t('boost_form.ad_link')} <span className="text-red-500">*</span></label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded border ${errors.link ? 'border-red-400' : 'border-main/20'} focus:outline-none focus:ring-2 focus:ring-main`}
              value={data.link}
              onChange={e => setData('link', e.target.value)}
              placeholder={t('boost_form.ad_link_placeholder')}
              required
            />
            {errors.link && <div className="text-red-500 text-xs mt-1">{errors.link}</div>}
          </div>
          <div>
            <label className="block mb-1 font-bold text-main">{t('boost_form.email')}</label>
            <input
              type="email"
              className={`w-full px-4 py-2 rounded border ${errors.email ? 'border-red-400' : 'border-main/20'} focus:outline-none focus:ring-2 focus:ring-main`}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder={t('boost_form.email_placeholder')}
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block mb-1 font-bold text-main">{t('boost_form.subject')}</label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded border ${errors.subject ? 'border-red-400' : 'border-main/20'} focus:outline-none focus:ring-2 focus:ring-main`}
              value={data.subject}
              onChange={e => setData('subject', e.target.value)}
              placeholder={t('boost_form.subject_placeholder')}
            />
            {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 bg-gradient-to-r from-main to-yellow-500 text-white font-bold rounded-full shadow hover:from-yellow-500 hover:to-main transition-all text-lg"
          >
            {processing ? t('boost_form.sending') : t('boost_form.boost_now')}
          </button>
        </form>
      </div>
    </div>
    <Footer />
    <BottomNavbar/>
    </>
  )
}

export default BoostAd