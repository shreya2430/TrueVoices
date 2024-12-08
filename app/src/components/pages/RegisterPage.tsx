import { RegisterForm } from '@/components/forms/RegisterForm/RegisterForm';
import Header from '../LandingPage/Header';
import { useTranslation } from 'react-i18next';  // Import useTranslation hook


export function RegisterPage() {
    // const handleFormSubmit = (formData: { [key: string]: string }) => {
    //     console.log(formData);
    // };

    const { t } = useTranslation(); // Initialize translation hook

    return (
        <><Header />
            <div className="register-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center mb-6 mt-6">
                    <h2 className="text-2xl font-bold mb-2">{t('registerForm.signUpForFree')}</h2> {/* Translated Heading */}
                    <p className="text-gray-600">
                        {t('registerForm.freeCredits')} {/* Translated Subheading */}
                    </p>
                </div>
                <RegisterForm />
            </div>
        </> 
    )    
}