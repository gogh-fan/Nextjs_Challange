"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function likePost(tweetId: number, userId: number) {
    try {
        await db.like.create({
            data: {
                tweetId,
                userId,
            },
        });
        revalidatePath(`/tweet/${tweetId}`);
    } catch (e) { }
};
export async function dislikePost(tweetId: number, userId: number) {
    try {
        await db.like.delete({
            where: {
                id: {
                    tweetId,
                    userId,
                },
            },
        });
        revalidatePath(`/tweet/${tweetId}`);
    } catch (e) { }
};

export async function deleteResponse(responseId: number, tweetId: number) {
    try {
        await db.response.delete({
            where: {
                id: responseId,
            },
        });
        revalidatePath(`/tweet/${tweetId}`);
    } catch (e) { }
};