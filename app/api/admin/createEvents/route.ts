import { authOptions } from "@/app/lib/auth";
import prisma from "@/db";
import { EventSchema } from "@/schema";
import { headers } from 'next/headers';
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,res:NextResponse){
    try{
        const session = await getServerSession({ req: { headers: headers() }, ...authOptions });

        console.log("session: ",session)
        const json = await req.json();
        const EventPayload = EventSchema.parse(json);

        if(!session){
            return NextResponse.json({
                msg: "You are not logged in!!"
            },
        {
            status: 401
        })
        }

        const Admin = await prisma.user.findUnique({
            where:{
                email: session.user.email,
                role: "Admin"
            }
        })

        if(!Admin){
            return NextResponse.json({
                msg: "You are not authorized for this operation!!!"
            },{
                status: 401
            })
        }

        const NewEvent = await prisma.event.create({
            data:{
                EventName: EventPayload.EventName,
                Date: EventPayload.Date,
                Time: EventPayload.Time,
                description: EventPayload.description ,
                location: EventPayload.location,
                adminId: Admin.id
            }
        })

        if(!NewEvent){
            return NextResponse.json({
                message: "Error creating event!!!"
            },{
                status: 400
            })
        }

        return NextResponse.json({ message: "Event created successfully!!!" },{
            status: 201
        });
    }catch(error){
        console.error(error)
        return NextResponse.json({
            error: "Internal Server Error!!!"
        },{
            status: 500
        })
    }
}