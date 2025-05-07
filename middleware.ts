import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req:NextRequest){
    const token = await getToken({req, secret: process.env.JWT_SECRET})

    console.log(token?.role)

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    const isUserRoute = req.nextUrl.pathname.startsWith('/user');

    if(isAdminRoute){
        if(!token || token.role !== "Admin"){
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    if(isUserRoute){
        if(!token || token.role !== "User"){
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"],
};
