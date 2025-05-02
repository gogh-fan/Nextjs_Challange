import { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

interface InputProps {
    name: string;
    errors?: string[];
}

export default function LoginInput({ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <>
            <Input name={name} {...rest} />
            {
                errors.map((error, index) => (
                    <span className="text-red-500 text-xxs ml-3" key={index}>{error}</span>
                ))
            }
        </>
    )
}