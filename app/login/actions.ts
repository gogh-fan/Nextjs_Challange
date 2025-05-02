"use server"

import db, { existUserEmail, existUsername } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt"
import { getSession } from "@/lib/session";

const checkPassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            password: true,
        },
    })
    const ok = await bcrypt.compare(password, user!.password)
    if (ok) {
        const session = await getSession()
        session.id = user!.id
        await session.save()
        return true
    } else {
        return false
    }
}

const loginZod = z.object({
    email: z
        .string()
        .email()
        .refine(async (email) => {
            const user = await existUserEmail(email)
            return Boolean(user)
        }, {
            message: "Invalid email",
        }),
    username: z
        .string()
        .refine(async (username) => {
            const user = await existUsername(username)
            return Boolean(user)
        }, {
            message: "Invalid username",
        }),
    password: z
        .string()
});

const passwordZod = z.object({
    email: z
        .string(),
    username: z
        .string(),
    password: z
        .string()
}).refine(checkPassword, { message: "Invalid password", path: ["password"] })

export const handleSubmit = async (prevState: any, formData: FormData) => {
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")
    const result = await loginZod.safeParseAsync({ email, username, password })
    if (!result.success) return result.error.flatten()
    const result2 = await passwordZod.safeParseAsync({ email, username, password })
    if (!result2.success) return result2.error.flatten()
    redirect("/profile");
}