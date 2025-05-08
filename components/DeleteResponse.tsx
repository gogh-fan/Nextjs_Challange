"use client";

import { deleteResponse } from "@/app/tweet/[id]/actions";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { startTransition } from "react";

export default function DeleteResponse({ responseId, tweetId, reducer }: { responseId: number, tweetId: number, reducer: (id: number) => void }) {
    const deleteResponseHandler = async () => {
        if (confirm("삭제하시겠습니까?")) {
            startTransition(async () => {
                reducer(responseId);
                await deleteResponse(responseId, tweetId);
            });
        }
    }

    return (
        <button onClick={deleteResponseHandler}>
            <XMarkIcon className="size-5" />
        </button>
    )
}
