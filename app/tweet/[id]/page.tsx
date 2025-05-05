import { getTweet } from "@/lib/db";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function TweetDetail({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { page?: string };
}) {
    const session = await getSession();
    if (!session.id) {
        redirect("/login");
    }

    const tweetId = parseInt(params.id);
    const tweet = await getTweet(tweetId);
    const { page } = await searchParams;

    if (!tweet) {
        return (
            <div className="flex justify-center items-center min-h-screen p-6">
                <Card className="w-full max-w-xl">
                    <CardContent className="pt-6">
                        <h1 className="text-2xl font-bold text-center mb-4">트윗을 찾을 수 없습니다</h1>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button variant="outline" asChild>
                            <Link href="/">
                                홈으로 돌아가기
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex justify-center p-6 min-h-screen">
            <Card className="w-full max-w-xl">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-xl font-bold">{tweet.user.username}</h1>
                            {tweet.user.bio && (
                                <p className="text-gray-500 text-sm">{tweet.user.bio}</p>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            {new Date(tweet.createdAt).toLocaleString("ko-KR")}
                        </p>
                    </div>
                    <p className="text-lg mb-6">{tweet.tweet}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        <span>{tweet.Like.length}명이 좋아합니다</span>
                    </div>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button variant="outline" asChild>
                        <Link href={`/?page=${page || 1}`}>
                            ← 목록으로 돌아가기
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
} 