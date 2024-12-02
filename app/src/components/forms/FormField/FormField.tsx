import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormFieldProps = {
    id: string;
    label: string;
    type: string;
    placeholder:string;
    value: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    value,
    required = false,
    onChange,
  }) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} className="text-blue-500">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}