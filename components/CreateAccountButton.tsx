import { Button } from "./ui/button";
import Link from "next/link";

export default function CreateAccountButton() {
    return (
        <Link href="/create-account" className="w-full">
            <Button
                type="button"
                variant="outline"
                className="w-full rounded-full transition-colors"
            >
                계정 만들기
            </Button>
        </Link>
    );
} 