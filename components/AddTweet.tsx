"use client";

import { useFormStatus } from "react-dom";
import { addTweet } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActionState, useState } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full"
        >
            {pending ? "등록 중..." : "트윗 등록"}
        </Button>
    );
}

export default function AddTweet() {
    const [state, formAction] = useActionState(addTweet, {
        success: false,
        message: "",
    });
    const [charactersLeft, setCharactersLeft] = useState(280);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputLength = e.target.value.length;
        setCharactersLeft(280 - inputLength);
    };

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <form action={formAction}>
                    <div className="space-y-4">
                        <div>
                            <textarea
                                name="content"
                                className="w-full h-24 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleInputChange}
                                placeholder="트윗 내용 작성"
                                maxLength={280}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <div className={`text-sm ${charactersLeft < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {charactersLeft}자 남음
                                </div>
                                <div><SubmitButton /></div>
                            </div>
                        </div>

                        {state.message && (
                            <div className={`p-2 rounded-md ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {state.message}
                            </div>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
} 