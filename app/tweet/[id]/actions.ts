"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function likePost(tweetId: number, userId: number) {
    await db.like.create({
        data: {
            tweetId,
            userId,
        },
    });
    revalidatePath(`/tweet/${tweetId}`);
};
export async function dislikePost(tweetId: number, userId: number) {
    await db.like.delete({
        where: {
            id: {
                tweetId,
                userId,
            },
        },
    });
    revalidatePath(`/tweet/${tweetId}`);
};

export async function deleteResponse(responseId: number, tweetId: number) {
    await db.response.delete({
        where: {
            id: responseId,
        },
    });
    revalidatePath(`/tweet/${tweetId}`);
};