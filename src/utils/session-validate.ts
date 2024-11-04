import { NextAuthConfig } from "@/config/next-auth-config";
import { getServerSession } from "next-auth";

export async function sessionValidation() {
    try {
        const session = await getServerSession(NextAuthConfig);
        return !!session?.user?.email;
    } catch (error) {
        console.error("Session validation error:", error);
        return false;
    }
}
