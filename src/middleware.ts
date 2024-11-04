import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isSignInPage = path === "/api/auth/signin";

    const session = await getToken({
        req: request,
        secret: process.env.JWT_SECRET,
    });

    if (!session && !isSignInPage) {
        // If there's no session and the user is not on the sign-in page, redirect to sign-in
        const url = new URL('/api/auth/signin', request.url);
        return NextResponse.redirect(url);
    } 

    if (session && isSignInPage) {
        // If there is a session and the user is on the sign-in page, redirect to the homepage
        const url = new URL('/', request.url);
        return NextResponse.redirect(url);
    }

    // Allow the request to continue if no conditions match
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/api/auth/signin"],
};
