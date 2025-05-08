"use server";

import { z } from "zod";
import { createTweet, createResponse } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { responseSchema } from "./schem";

const tweetSchema = z.object({
    content: z
        .string()
        .min(1, "트윗 내용을 입력해주세요")
        .max(280, "트윗은 280자 이하여야 합니다"),
});

export async function addTweet(prevState: any, formData: FormData) {
    try {
        const session = await getSession();
        if (!session.id) {
            return { success: false, message: "로그인이 필요합니다" };
        }

        const content = formData.get("content") as string;
        const validation = tweetSchema.safeParse({ content });

        if (!validation.success) {
            return {
                success: false,
                message: validation.error.errors[0].message,
            };
        }

        await createTweet(session.id, content);
        revalidatePath("/");

        return { success: true, message: "트윗이 등록되었습니다" };
    } catch (error) {
        console.error("트윗 작성 오류:", error);
        return { success: false, message: "오류가 발생했습니다. 다시 시도해주세요" };
    }
}

export async function addResponse(formData: FormData, userId: number, tweetId: number) {
    const payload = formData.get("payload") as string;
    const validation = responseSchema.safeParse({ payload, tweetId });

    if (!validation.success) return validation.error.flatten()

    await createResponse(userId, tweetId, payload);
    revalidatePath(`/tweet/${tweetId}`);
} 