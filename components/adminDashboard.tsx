import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";


export const AdminDashboard = async()=>{
    const session = await getServerSession(authOptions)
    
        if(!session){
            return <div>return you are not logged in</div>
        }
    
        const admin = session.user;

    return( 
        <div>
            {admin.name}
        </div>
    )
}