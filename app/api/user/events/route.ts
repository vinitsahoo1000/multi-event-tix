import { authOptions } from "@/app/lib/auth";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest) {
    try{
        const session = await getServerSession(authOptions);

        if(session){
            return NextResponse.json({
                            msg: "You are not logged in!!"
                        },
                    {
                        status: 401
                    })
        }

        const events = await prisma.event.findMany({})

        return NextResponse.json({
            msg: "All Events!!!!",
            events: events
        })
        
    }catch(error){
        return NextResponse.json({
            error: "Internal server error!!!!"
        },{
            status: 500
        })
    }
}