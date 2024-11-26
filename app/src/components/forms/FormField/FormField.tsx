import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormFieldProps = {
    id: string;
    label: string;
    type: string;
    placeholder:string;
    value: string;
    required: boolean;
    onChange: (id: string, value: string) => void;
}

export const FormField: React.FC<FormFieldProps> =({
    id, 
    label, 
    type,
    placeholder, 
    value, 
    required, 
    onChange,
}) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id} className="text-blue-500">{label}</Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
                required={required}
            />
        </div>
    )
}