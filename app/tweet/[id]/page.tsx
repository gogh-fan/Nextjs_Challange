import { getTweet, getResponses, getIsLiked, getUser } from "@/lib/db";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LikeBtn from "@/components/likeBtn";
import { unstable_cache } from "next/cache";
import ResponseSection from "@/components/ResponseSection";

const getCachedTweet = unstable_cache(getTweet, ["tweet-detail"], {
    tags: ["tweet-detail"],
    revalidate: 60,
});

const getCachedResponses = unstable_cache(getResponses, ["tweet-responses"], {
    tags: ["tweet-responses"],
    revalidate: 60,
});

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
    const userId = session.id;
    const user = await getUser(userId);
    if (!user) return notFound();
    const { id } = await params;
    const tweetId = parseInt(id);
    const { page } = await searchParams;

    const tweet = await getCachedTweet(tweetId);
    const isLiked = await getIsLiked(tweetId);
    const likeCount = tweet?.like.length || 0;
    const responses = await getCachedResponses(tweetId);

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
                    <div className="flex justify-end gap-3 items-center text-sm text-gray-500">
                        <LikeBtn tweetId={tweetId} userId={userId} isLiked={isLiked} likeCount={likeCount} />
                    </div>

                    <div className="flex justify-center mt-6 mb-8">
                        <Button variant="outline" asChild>
                            <Link href={`/?page=${page || 1}`}>
                                ← 목록으로 돌아가기
                            </Link>
                        </Button>
                    </div>
                    <ResponseSection responses={responses} tweetId={tweetId} user={user} />
                </CardContent>
            </Card>
        </div>
    );
} 