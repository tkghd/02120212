import { NextResponse } from 'next/server';
export async function GET(){ return NextResponse.json({transfers:[{type:'bank',amount:1000},{type:'crypto',amount:0.5}]}); }
