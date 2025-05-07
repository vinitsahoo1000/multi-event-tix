import prisma from "@/db";
import GoogleProviders from "next-auth/providers/google";
import { cookies } from "next/headers";



export const authOptions = {
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    pages:{
        signIn: "/signin",
    },
    secret: process.env.JWT_SECRET,

    callbacks: {
        async signIn({profile,}:any){
            const cookieStore = await cookies();
            const role = cookieStore.get("role")?.value || "User"

            const existingUser = await prisma.user.findUnique({
                where:{
                    email: profile.email
                }
            })

            if(!existingUser){
                await prisma.user.create({
                    data:{
                        name: profile.name,
                        email: profile.email,
                        profilePhoto: profile.picture,
                        role: role==="Admin"?"Admin":"User"
                    }
                })
                return true
            }
            return true
        },

        async jwt({token,user}:any){
            if(user){
                const dbUser = await prisma.user.findUnique({
                    where:{
                        email: user.email
                    }
                });

                token.role = dbUser?.role
            }
            return token
        },

        async session({token,session}:any){
            session.user.id = token.sub;
            session.user.role = token.role;
            return session;
        }
    }
}