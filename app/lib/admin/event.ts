import prisma from "@/db"


export const getEventByAdminEmail = async(email: string) =>{
    return prisma.event.findMany({
        where:{admin:{
            email
        }},
        orderBy: {Date: "asc"}
    });
}