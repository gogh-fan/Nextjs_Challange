"use client";

import { likePost } from "@/app/tweet/[id]/actions";
import { dislikePost } from "@/app/tweet/[id]/actions";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { startTransition, useOptimistic } from "react";

interface LikeBtnProps {
    tweetId: number;
    userId: number;
    isLiked: boolean;
    likeCount: number;
}

export default function LikeBtn({ tweetId, userId, isLiked, likeCount }: LikeBtnProps) {
    const [state, reducerFn] = useOptimistic(
        { isLiked, likeCount },
        (previousState) => ({
            isLiked: !previousState.isLiked,
            likeCount: previousState.isLiked
                ? previousState.likeCount - 1
                : previousState.likeCount + 1,
        })
    );

    const likeBtnClickHandler = () => {
        startTransition(() => {
            reducerFn(undefined);
            if (state.isLiked) {
                dislikePost(tweetId, userId);
            } else {
                likePost(tweetId, userId);
            }
        });
    }
    return (
        <>
            <span>{state.likeCount}명이 좋아합니다</span>
            <button onClick={likeBtnClickHandler}
                className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors`}
            >
                {state.isLiked ? (
                    <HandThumbUpIcon className="size-5" />
                ) : (
                    <OutlineHandThumbUpIcon className="size-5" />
                )}
            </button>
        </>
    );
}