import { authOptions } from "@/app/lib/auth"
import { getServerSession } from "next-auth"


export const ManageTicket = async()=>{
    const session = await getServerSession(authOptions);



    return(
        <div>
            <h1>Manage Ticket</h1>
            <div>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900"/>
            </div>
        </div>
    )
}