"use client";

import { useOptimistic } from "react";
import AddResponse from "./AddResponse";
import ResponseList from "./ResponseList";

export interface User {
    id: number;
    username: string;
}

export type Response = {
    id: number;
    payload: string;
    created_at: Date;
    updated_at: Date;
    userId: number;
    tweetId: number;
    user: {
        id: number;
        username: string;
    };
};

type OptimisticResponseAction =
    | { type: "ADD"; payload: Response }
    | { type: "REMOVE"; payload: number };

export default function ResponseSection({ responses, tweetId, user }: { responses: Response[], tweetId: number, user: User }) {
    const [state, reducerFn] = useOptimistic(
        responses,
        (previousState, action: OptimisticResponseAction): Response[] => {
            switch (action.type) {
                case "ADD":
                    return [...previousState, action.payload];
                case "REMOVE":
                    return previousState.filter(response => response.id !== action.payload);
            }
        }
    );

    const addResponse = (response: Response) => {
        reducerFn({ type: "ADD", payload: response });
    };

    const removeResponse = (id: number) => {
        reducerFn({ type: "REMOVE", payload: id });
    };

    return (
        <div className="pt-6">
            <AddResponse tweetId={tweetId} reducer={addResponse} user={user} />
            <ResponseList responses={state} reducer={removeResponse} tweetId={tweetId} user={user} />
        </div>
    )
}
