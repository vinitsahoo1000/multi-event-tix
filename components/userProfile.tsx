import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export const UserProfile = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
        <div className="flex items-center justify-center min-h-screen text-center text-red-500 text-lg">
            You are not logged in.
        </div>
        );
    }

    const user = session.user;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md text-center">
            <img
            src={ "https://res.cloudinary.com/dbbrijt9o/image/upload/v1744457216/cover-photos/yppv8kfbraal32a1rawa.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-300"
            />
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
        </div>
        </div>
    );
};
