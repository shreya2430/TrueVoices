import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from '@/components/ui/form';
import { useRegisterMutation } from "@/store/user-store";
import  { User, UserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const RegisterForm = () => {

    const { t } = useTranslation(); //initializing the translation hook 

    const form = useForm<User>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })
    const navigate = useNavigate()
    const [registerUser, state] = useRegisterMutation()
    const onSubmit = (data: User) => {
        console.log(data)
        registerUser(data)
    }
    useEffect(() =>{
        if (state.isSuccess) {
            console.log(t("registerForm.successMessage"))
            navigate('/login')
        }
        if (state.isError) {
            console.log(t("registerForm.errorMessage"))
        }
    }, [state.isSuccess, state.isError])

    return (
        <div className = "flex items-center justify-center bg-gray-100 ">
            <Card className = "mx-auto max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-500">{t('registerForm.signUp')}</CardTitle> {/* Translated Text */}
                    <CardDescription>{t('registerForm.enterDetails')}</CardDescription> {/* Translated Text */}
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-2 gap-4" >
                            <FormInput 
                                label={t('registerForm.firstName')}  // Translated label
                                type="text"
                                name="firstName"
                                placeholder={t('registerForm.firstNamePlaceholder')} // Translated placeholder
                            />
                            <FormInput 
                                label={t('registerForm.lastName')}
                                type="text"
                                name="lastName"
                                placeholder={t('registerForm.lastNamePlaceholder')}  // Translated placeholder
                            />
                            <FormInput 
                                label={t('registerForm.username')}// Translated label
                                type="text"
                                name="username"
                                placeholder={t('usernamePlaceholder')} // Translated placeholder
                            />
                            <FormInput 
                                label={t('registerForm.email')}  // Translated label
                                type="email"
                                name="email"
                                placeholder={t('registerForm.emailPlaceholder')} // Translated placeholder
                            />
                            <FormInput 
                                label={t('registerForm.password')} // Translated label
                                type="password"
                                name="password"
                                placeholder={t('registerForm.passwordPlaceholder')}  // Translated placeholder
                            />
                            <FormInput 
                                label={t('registerForm.confirmPassword')}  // Translated label
                                type="password"
                                name="confirmPassword"
                                placeholder={t('registerForm.confirmPasswordPlaceholder')} // Translated placeholder
                            />
                            <div className="col-span-2">
                                <Button 
                                    variant={'default'}
                                    type="submit"
                                    className="w-full mt-4"
                                >
                                    {t('registerForm.signUpButton')}  {/* Translated Button Text */}
                                </Button>
                                {/* Sign-in link */}
                                <p className="mt-4 text-sm text-center">
                                    {t('registerForm.alreadyHaveAccount')}  {/* Translated Text */}
                                    <Link to="/login" className="text-blue-500 hover:underline">
                                        {t('registerForm.signIn')}  {/* Translated Link Text */}
                                    </Link>
                                </p>
                            </div>         
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )

}
