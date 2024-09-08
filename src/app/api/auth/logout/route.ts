import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const cookieStore = cookies()
        cookieStore.delete('authToken')
        return NextResponse.json({message: 'logout success'}, { status: 200 });
    }

    catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}