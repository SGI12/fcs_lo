import {NextRequest, NextResponse} from "next/server";

import axios from "axios";

export async function middleware(req: NextRequest) {
    try {
        const cookie = req.cookies.get('authToken')
        const response = await axios.get('http://localhost:3000/api/auth/isAuth', {
            headers: {
                "Content-Type": "application/json",
                Cookie: `authToken=${cookie?.value}`,
            },
        });
        if (response.status === 200) {
            console.log('auth success', new Date())
            return NextResponse.next();
        } else {
            console.log(response.status)
            return NextResponse.redirect(new URL('/login', req.url))
        }
    } catch (error) {
        console.log('auth failed')
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/home', '/home/judges'],
};