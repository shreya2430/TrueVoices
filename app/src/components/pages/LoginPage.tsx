import React from "react";
import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import Header from "../LandingPage/Header";
import { useTranslation } from "react-i18next";

const fields = [
    {
        id: 'email', 
        label: 'loginPage.email', 
        type: 'email', 
        placeholder: 'loginPage.emailPlaceholder', 
        required: true
    }, 
    {
        id: 'password',
        label: 'loginPage.password',
        type: 'password',
        placeholder: 'loginPage.passwordPlaceholder',
        required: true
    },
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