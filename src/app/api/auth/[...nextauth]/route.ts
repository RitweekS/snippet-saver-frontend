import { NextAuthConfig } from "@/config/next-auth-config";
import NextAuth from "next-auth";

const handler = NextAuth(NextAuthConfig)

export { handler as GET, handler as POST }  