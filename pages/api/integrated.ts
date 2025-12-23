import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({status:'synced', timestamp:Date.now()}); }
export async function POST(req:Request){
  const {taskId,status} = await req.json();
  return NextResponse.json({status:'ok',taskId,newStatus:status});
}
