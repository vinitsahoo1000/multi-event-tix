import { getEventByAdminEmail } from "@/app/lib/admin/event";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { Appbar } from "./Appbar";


export const AdminDashboard = async()=>{
    const session = await getServerSession(authOptions)
    
        if(!session){
            return <div>return you are not logged in</div>
        }
    
        const admin = session.user;
        console.log(admin)
        const events = await getEventByAdminEmail(admin.email)

    return( 
        <div>
        <div className="fixed w-full z-50">
            <Appbar isUser={false} />
        </div>
        <div className="pt-20 px-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome, {admin.name || "Admin"}</h1>
            <p className="mb-4 text-gray-600">Email: {admin.email}</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Events</h2>

            {events.length === 0 ? (
            <p className="text-gray-500">No events created yet.</p>
            ) : (
            <ul className="space-y-4">
                {events.map((event) => (
                <li
                    key={event.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                    <h3 className="text-xl font-semibold">{event.EventName}</h3>
                    <p className="text-gray-600">
                    {event.Date} at {event.Time}
                    </p>
                    <p className="text-gray-500">{event.location}</p>
                    <p className="mt-2">{event.description}</p>
                </li>
                ))}
            </ul>
            )}
        </div>
        </div>

    )
}