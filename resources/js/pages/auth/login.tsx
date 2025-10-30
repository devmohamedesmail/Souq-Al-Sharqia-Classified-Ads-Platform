import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title={t('login')} description="">
            <Head title={t('login')} />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('email')}</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('email')}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">{t('password')}</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={t('password')}
                        />
                        <InputError message={errors.password} />
                    </div>
                    {canResetPassword && (
                        <TextLink href={route('password.request')} className="ml-auto text-sm text-center arabic-font" tabIndex={5}>
                            {t('forget-password')}
                        </TextLink>
                    )}

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">{t('remember-me')}</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {t('login')}
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    {t('no-account')} {' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        {t('sign-up')}
                    </TextLink>
                </div>



            </form>
           

            <div className="mt-6 space-y-3">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500 arabic-font">{t('or-continue-with')}</span>
                    </div>
                </div>

                <a href="/auth/google/redirect" 
                  className='flex items-center arabic-font justify-center w-full border-2 border-gray-200 rounded-lg py-3 px-4 gap-3 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md group'>
                    <FcGoogle size={24} className="group-hover:scale-105 transition-transform duration-200" />
                    <span className="font-medium text-gray-700">{t('login-with-google')}</span>
                </a>

                <a href="/auth/facebook/redirect" 
                  className='flex items-center arabic-font justify-center w-full border-2 border-blue-200 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-4 gap-3 transition-all duration-200 shadow-sm hover:shadow-md group'>
                    <FaFacebook size={24} className="text-white group-hover:scale-105 transition-transform duration-200" />
                    <span className="font-medium text-white">{t('login-with-facebook')}</span>
                </a>
            </div>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
