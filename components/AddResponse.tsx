"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addResponse } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Response, User } from "./ResponseSection";
import { z } from "zod";
import { responseSchema } from "@/app/schem";

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {

    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="sm"
        >
            {isSubmitting ? "등록 중..." : "댓글 등록"}
        </Button>
    );
}

type ResponseType = z.infer<typeof responseSchema>;

export default function AddResponse({ tweetId, reducer, user }: { tweetId: number, reducer: (action: Response) => void, user: User }) {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitting }, reset } = useForm<ResponseType>({ resolver: zodResolver(responseSchema) });
    const addResponseInterceptor = handleSubmit(async (data: ResponseType) => {
        const formData = new FormData();
        formData.append("payload", data.payload);
        reducer({
            user,
            payload: data.payload,
            created_at: new Date(),
            updated_at: new Date(),
            userId: user.id,
            tweetId: tweetId,
            id: 0,
        });
        await addResponse(formData, user.id, tweetId);
        reset();
    });

    const [charactersLeft, setCharactersLeft] = useState(280);
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputLength = e.target.value.length;
        setCharactersLeft(280 - inputLength);
    };

    return (
        <Card className="mb-6">
            <CardContent className="pt-4 pb-4">
                <form action={async () => await addResponseInterceptor()}>
                    <div className="space-y-2">
                        <div>
                            <textarea
                                {...register("payload", { onChange: handleInputChange })}
                                className="w-full h-16 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="댓글을 입력하세요"
                                maxLength={280}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <div className={`text-xs ${charactersLeft < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {charactersLeft}자 남음
                                </div>
                                <div><SubmitButton isSubmitting={isSubmitting} /></div>
                            </div>
                        </div>

                        {errors.payload?.message && (
                            <div className={`p-2 rounded-md text-sm ${isSubmitSuccessful ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {errors.payload?.message}
                            </div>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
} 