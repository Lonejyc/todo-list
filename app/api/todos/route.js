import { NextRequest, NextResponse } from 'next/server';

const todos = [
    { text: 'Learn JavaScript' },
    { text: 'Create an API' },
    { text: 'Test some code'}
]

export async function GET(req) {
    return NextResponse.json(
        todos,
        { status: 200 }
    );
}

export async function POST(req) {
    const todo = await req.json();

    todos.push(todo);

    return NextResponse.json(
        todos,
        { status: 200 }
    );
}