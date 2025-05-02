import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { getUserFromSession, handleLogout } from "./action";
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function ProfilePage() {
    const user = await getUserFromSession()
    const session = await getSession()
    console.log(session.id)

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardContent className="pt-6">
                    <h1 className="text-2xl font-bold text-center mb-4">프로필</h1>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-500">사용자 이름</p>
                            <p className="font-medium">{user?.username}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">이메일</p>
                            <p className="font-medium">{user?.email}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-3 pt-2">
                    <Link href="/">
                        <Button
                            className="min-w-[5rem] w-full rounded-full hover:cursor-pointer"
                        >
                            트윗
                        </Button>
                    </Link>
                    <form action={handleLogout}>
                        <Button
                            type="submit"
                            className="min-w-[5rem] w-full rounded-full hover:cursor-pointer"
                        >
                            로그아웃
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}