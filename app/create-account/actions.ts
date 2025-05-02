"use server"

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";

const createAccountZod = z.object({
    email: z
        .string()
        .email()
        .refine(async (email) => email.endsWith("@zod.com"), {
            message: "Only @zod.com email are allowed",
        }),
    username: z
        .string()
        .min(5, {
            message: 'Username should be at least 5 characters long.',
        }),
    password: z
        .string()
        .min(10, {
            message: 'Password must be at least 10 characters',
        })
        .refine(async p => /\d/.test(p), {
            message: 'Password must contain at least one number',
        }),
    confirmPassword: z
        .string()
}).refine(async (data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
}).superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
    if (user) {
        ctx.addIssue({
            code: "custom",
            message: "This email is already taken",
            path: ["email"],
            fatal: true,
        });
    }
    return z.NEVER;
}).superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });
    if (user) {
        ctx.addIssue({
            code: "custom",
            message: "This username is already taken",
            path: ["username"],
            fatal: true,
        });
    }
    return z.NEVER;
})

export const handleCreateAccount = async (prevState: any, formData: FormData) => {
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    const result = await createAccountZod.safeParseAsync({
        email,
        username,
        password,
        confirmPassword
    });

    if (!result.success) {
        return result.error.flatten()
    } else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword,
            },
            select: {
                id: true,
            },
        });
        const session = await getSession();
        session.id = user.id;
        await session.save();
        redirect("/profile");
    }
}