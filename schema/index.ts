import z from "zod";


export const EventSchema = z.object({
    EventName : z.string().min(2),
    Date: z.string(),
    Time: z.string(),
    description: z.string(),
    location: z.string().min(5)
})