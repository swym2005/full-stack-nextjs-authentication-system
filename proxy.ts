// ****************************
// This is a middleware file Jisko Proxy kahenge.
// ****************************


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest){
// Grab the paths..
const path = request.nextUrl.pathname;

// Defining that these paths are public paths..
const isPublicPath = path === '/login' || path === '/signup';

// Grabbing the token from the user
const token = request.cookies.get("token")?.value || "";

// So the logic is gonna be like if you are having a token and you're trying to access the public paths
// then you should be redirected somewhere.

if(isPublicPath && token)
{
    return NextResponse.redirect(new URL('/', request.nextUrl))
}

// If you dont have the token and not on the Public path and trying to access the private ones then go to login..
if(!isPublicPath && !token)
{
    return NextResponse.redirect(new URL('/login', request.nextUrl));
}




}

// The matching portion
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}