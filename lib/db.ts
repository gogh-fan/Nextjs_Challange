import { PrismaClient } from "./generated/prisma";

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
            Like: {
                select: {
                    id: true,
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
            Like: {
                select: {
                    id: true,
                    userId: true,
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

export default db;