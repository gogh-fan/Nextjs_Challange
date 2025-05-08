import { getTweets } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AddTweet from "@/components/AddTweet";

export default async function Home({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const session = await getSession();
    if (!session.id) {
        redirect("/login");
    }

    const { page } = await searchParams;
    const { tweets, totalPages, currentPage } = await getTweets(parseInt(page) || 1);

    return (
        <div className="flex justify-center p-6 min-h-screen">
            <Card className="w-full max-w-xl">
                <CardContent className="pt-6">
                    <h1 className="text-2xl font-bold text-center mb-6">트윗 목록</h1>
                    <div className="flex justify-end mb-4 gap-2">
                        <Link href="/profile">
                            <Button className="rounded-full hover:cursor-pointer">프로필</Button>
                        </Link>
                    </div>

                    <AddTweet />

                    <div className="w-full space-y-4">
                        {tweets.length === 0 ? (
                            <p className="text-center text-gray-500">트윗이 없습니다.</p>
                        ) : (
                            tweets.map((tweet) => (
                                <Link
                                    href={`/tweet/${tweet.id}?page=${currentPage}`}
                                    key={tweet.id}
                                    className="block"
                                >
                                    <Card className="hover:bg-slate-50 transition">
                                        <CardContent className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold">{tweet.user.username}</p>
                                                    <p className="mt-2">{tweet.tweet}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-500">
                                                        {tweet.like.length} 좋아요
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {new Date(tweet.createdAt).toLocaleString("ko-KR")}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                </CardContent>

                {totalPages > 1 && (
                    <CardFooter className="justify-center gap-15 relative">
                        {currentPage > 1 && <Button
                            variant="outline"
                            asChild
                            size="sm"
                            className="absolute left-1/3 -translate-x-1/5 top-0.5"
                        >
                            <Link href={`/?page=${currentPage > 1 ? currentPage - 1 : 1}`}>
                                ← 이전
                            </Link>
                        </Button>}
                        <span className="text-sm absolute top-1.5 left-1/2 -translate-x-1/2">
                            {currentPage} / {totalPages}
                        </span>
                        {currentPage < totalPages && <Button
                            variant="outline"
                            asChild
                            size="sm"
                            className="absolute right-1/3 translate-x-1/5 top-0.5"
                        >
                            <Link href={`/?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}>
                                다음 →
                            </Link>
                        </Button>}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
} 