import { NextRequest, NextResponse } from "next/server"
import { getSession } from "./lib/session"

interface Routes {
    [key: string]: boolean
}

const publicUrls: Routes = {
    "/login": true,
    "/create-account": true,
}

export default async function middleware(request: NextRequest) {
    const session = await getSession()
    const exists = publicUrls[request.nextUrl.pathname]
    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    } else {
        if (exists) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

