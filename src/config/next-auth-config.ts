import axios from "axios";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const NextAuthConfig : AuthOptions = {
    providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_ID||"",
        clientSecret:process.env.GOOGLE_SECRET||""
    })],
    callbacks: {
        async signIn({ user }) {
            const response = await axios.post("http://localhost:8080/v1/auth/signin",{
                name:user.name,
                email:user.email,
                image:user.image
            })            
            if(response.data?.response_data && response.data.response_data?.id){
                user.id = response.data.response_data.id
            } 

            return true
        },
        jwt({token,user}){
            if(user?.id){
                token.id = user.id
            }
            return token
        },
        async session({ session, token }:any) {
            if (token?.id && session.user) {
                session.user.id = token.id
            }
            return session;
        }
    },
    secret:process.env.JWT_SECRET
}
