import { authOptions } from "@/app/lib/auth";
import prisma from "@/db";
import { EventSchema } from "@/schema";
import { headers } from 'next/headers';
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/utils/cloudinary";
import streamifier from 'streamifier';
import { UploadApiResponse } from "cloudinary";


export async function POST(req:NextRequest){
    try{
        const session = await getServerSession({ req: { headers: headers() }, ...authOptions });

        const formData = await req.formData();
        const file = formData.get("coverImage") as File;
        
        const formFields: Record<string, any> = {};
        formData.forEach((value, key) => {
        if (typeof value === 'string') {
            formFields[key] = value;
        }
        });

        const EventPayload = EventSchema.parse(formFields);

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

        let upload: UploadApiResponse | null = null;

        if(file){
            const buffer = Buffer.from(await file.arrayBuffer());

            upload = await new Promise((resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream((error,result)=>{
                    if(error) return reject(error);
                    resolve(result ?? null);
                });

                streamifier.createReadStream(buffer).pipe(uploadStream);
            });
        }

        const NewEvent = await prisma.event.create({
            data:{
                EventName: EventPayload.EventName,
                Date: EventPayload.Date,
                Time: EventPayload.Time,
                description: EventPayload.description ,
                location: EventPayload.location,
                imageUrl: upload?.secure_url || null,
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