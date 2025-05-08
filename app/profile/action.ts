import { getUser } from "@/lib/db"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export async function getUserFromSession() {
    const session = await getSession()
    if (session.id) {
        const user = await getUser(session.id)
        if (user) return user
    } else {
        redirect("/login")
    }
}

export const handleLogout = async () => {
    "use server"
    const session = await getSession()
    session.destroy()
    redirect("/")
}