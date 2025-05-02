import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?: number;
}

export async function getSession() {
    return getIronSession<SessionContent>(await cookies(), {
        cookieName: "chal",
        password: process.env.COOKIE_PASSWORD!,
    });
}

export async function sessionLogin(id: number) {
    const session = await getSession();
    session.id = id;
    await session.save();
}