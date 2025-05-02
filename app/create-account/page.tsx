"use client"

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { useActionState, useState } from "react";
import LoginInput from "@/components/LoginInput"
import { Button } from "@/components/ui/button";
import { handleCreateAccount } from "./actions";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export default function CreateAccountForm() {
    const [state, action] = useActionState(handleCreateAccount, null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <form action={action} className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <h2 className="text-2xl font-bold text-center mb-4">계정 만들기</h2>
                        <LoginInput
                            name="email"
                            id="email"
                            placeholder="Email"
                            type="email"
                            required
                            errors={state?.fieldErrors?.email}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <LoginInput
                            name="username"
                            id="username"
                            placeholder="Username"
                            required
                            errors={state?.fieldErrors?.username}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <LoginInput
                            name="password"
                            id="password"
                            placeholder="Password"
                            type="password"
                            required
                            errors={state?.fieldErrors?.password}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <LoginInput
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            required
                            errors={state?.fieldErrors?.confirmPassword}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 justify-center">
                    <SubmitButton text="계정 생성하기" />
                    <Link href="/" className="w-full">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-full transition-colors"
                        >
                            로그인으로 돌아가기
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </form>
    )
}
