import { Card, CardContent } from "@/components/ui/card";
import DeleteResponse from "./DeleteResponse";
import { Response, User } from "./ResponseSection";

export default function ResponseList({ responses, reducer, tweetId, user }: { responses: Response[], reducer: (id: number) => void, tweetId: number, user: User }) {
    if (responses.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                아직 댓글이 없습니다.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-lg">댓글 ({responses.length})</h3>
            {responses.map((response) => (
                <Card key={response.id} className="bg-gray-50">
                    <CardContent className="p-3">
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <p className="font-medium text-sm">{response.user.username}</p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-xs text-gray-500">
                                        {new Date(response.created_at).toLocaleString("ko-KR")}
                                    </p>
                                    {response.userId === user.id && <DeleteResponse responseId={response.id} tweetId={tweetId} reducer={reducer} />}
                                </div>
                            </div>
                            <p className="mt-1 text-sm">{response.payload}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 