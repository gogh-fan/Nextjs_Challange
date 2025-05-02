"use client"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { handleSubmit } from "./actions"
import { useActionState, useState } from "react";
import SubmitButton from "@/components/SubmitButton"
import LoginInput from "@/components/LoginInput"
import CreateAccountButton from "@/components/CreateAccountButton"

export default function CardWithForm() {
  const [state, action] = useActionState(handleSubmit, null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={action} className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <LoginInput name="email" id="email" placeholder="Email" type="email" required errors={state?.fieldErrors?.email}
              value={email} onChange={e => setEmail(e.target.value)} />
            <LoginInput name="username" id="username" placeholder="Username" required errors={state?.fieldErrors?.username}
              value={username} onChange={e => setUsername(e.target.value)} />
            <div className="flex flex-col gap-2">
              <LoginInput name="password" id="password" placeholder="Password" type="password" required errors={state?.fieldErrors?.password}
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 justify-center">
          <SubmitButton text="로그인" />
          <CreateAccountButton />
        </CardFooter>
      </Card>
    </form>
  )
}