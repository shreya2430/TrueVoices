import React from "react";
import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import { useTranslation } from "react-i18next";
import Header from '@/components/LandingPage/Header';


const fields = [
    {
        id: 'email',
        label: 'loginPage.email',  // Correctly reference the label
        type: 'email',
        placeholder: 'loginPage.emailPlaceholder',  // Correctly reference the placeholder
        required: true
    },
    {
        id: 'password',
        label: 'loginPage.password',
        type: 'password',
        placeholder: 'loginPage.passwordPlaceholder',
        required: true
    }
];

export function LoginPage() {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-3xl font-semibold mb-4">{t('loginPage.welcomeBack')}</h2>
                <LoginForm fields={fields} />
            </div>
        </>
    );
}