"use client"
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";

export const Signin = () => {

    const handleLogin = (role: "Admin" | "User")=>{
        Cookies.set("role",role);

        if(role === "User"){
            signIn("google",{ callbackUrl: "/user/profile" })
        }
        if(role === "Admin"){
            signIn("google",{ callbackUrl: "/admin/dashboard" })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">Login</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <button
                        onClick={()=>handleLogin("User")}
                        className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200 shadow-md"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                        </svg>
                        Sign in as User
                    </button>
                    
                    <button
                        onClick={() => handleLogin("Admin")}
                        className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition duration-200 shadow-md"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">

                        </svg>
                        Sign in as Admin
                    </button>
                </div>
            </div>
        </div>
    );
}