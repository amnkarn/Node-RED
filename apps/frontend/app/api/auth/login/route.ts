import { BACKEND_URL } from '@/app/config';
import { NextResponse } from 'next/server';

//this route send otp to email, needs to verify
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const res = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({
            message: "Otp sent on your email"
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        NextResponse.json({
            error: 'Authentication failed'
        }, { status: 500 })
    }
}