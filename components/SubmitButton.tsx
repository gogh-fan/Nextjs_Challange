import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface SubmitButtonProps {
    text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className={`w-full rounded-full ${pending ? "opacity-50" : ""} transition-colors`}
            disabled={pending}
        >
            {pending ? "Loading..." : text}
        </Button>
    );
}