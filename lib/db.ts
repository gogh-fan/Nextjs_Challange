import { PrismaClient } from "./generated/prisma";
import { getSession } from "./session";

const db = new PrismaClient();

export async function getUser(id: number) {
    return await db.user.findUnique({
        where: {
            id,
        },
    });
}

export async function existUsername(username: string) {
    return await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });
}
export async function existUserEmail(email: string) {
    return await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
}

export async function getTweets(page: number = 1, pageSize: number = 2) {
    const skip = (page - 1) * pageSize;
    const tweets = await db.tweet.findMany({
        skip,
        take: pageSize,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            },
            like: {
                select: {
                    userId: true,
                    tweetId: true,
                }
            }
        }
    });

    const totalTweets = await db.tweet.count();
    const totalPages = Math.ceil(totalTweets / pageSize);

    return {
        tweets,
        totalPages,
        currentPage: page,
    };
}

export async function getTweet(id: number) {
    return await db.tweet.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    bio: true,
                }
            },
            like: {
                select: {
                    userId: true,
                    tweetId: true,
                }
            }
        }
    });
}

export async function createTweet(userId: number, content: string) {
    return await db.tweet.create({
        data: {
            tweet: content,
            userId: userId,
        },
    });
}

export async function getIsLiked(tweetId: number) {
    const session = await getSession();
    const like = await db.like.findUnique({
        where: {
            id: {
                tweetId,
                userId: session.id!,
            },
        },
    });
    return Boolean(like);
}

export async function createResponse(userId: number, tweetId: number, content: string) {
    return await db.response.create({
        data: {
            payload: content,
            userId,
            tweetId,
        },
    });
}

export async function getResponses(tweetId: number) {
    return await db.response.findMany({
        where: {
            tweetId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                }
            },
        },
        orderBy: {
            created_at: 'desc'
        },
    });
}

export default db;