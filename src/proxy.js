import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { cookies, headers } from "next/headers"; 

export async function proxy(request) {
    const { pathname } = request.nextUrl;
   const session = await auth.api.getSession({
    headers: await headers()
   });

   if (!session && pathname.startsWith('/dashboard')) {
     return NextResponse.redirect(new URL('/signin', request.url));
   }

   if (session) {
     const userRole = session.user.role; // 
     if (pathname.startsWith('/dashboard/freelancer') && userRole !== 'freelancer') {
       return NextResponse.redirect(new URL('/dashboard/client/tasks', request.url));
     }

     if (pathname.startsWith('/dashboard/client') && userRole !== 'client') {
       return NextResponse.redirect(new URL('/dashboard/freelancer', request.url));
     }
   }

   return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile']
};