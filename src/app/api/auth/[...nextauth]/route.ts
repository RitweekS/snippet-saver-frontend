import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers:[
    GoogleProvider({
        clientId:"1028456781412-ctbuo83r7vkmr8f8mgu2n2nhhop0of3b.apps.googleusercontent.com",
        clientSecret:"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"
    })]
})

export { handler as GET, handler as POST }  