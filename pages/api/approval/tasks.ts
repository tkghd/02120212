import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({tasks:[{id:1,title:'Task1',status:'pending'}]}); }
