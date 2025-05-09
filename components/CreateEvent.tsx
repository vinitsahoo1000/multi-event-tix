"use client"
import axios from "axios";
import React, { useState } from "react";
import { InputBox } from "./inputbox";
import { Appbar } from "./Appbar";



export const CreateEvent = ()=>{
    const [EventName,setEventName] = useState("");
    const [description,setDescription] = useState("");
    const [Date,setDate] = useState("");
    const [location,setLocation] = useState("");
    const [time,setTime] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const submitEvent = async()=>{
        try{
            const formData = new FormData();

            formData.append("EventName", EventName);
            formData.append("Date", Date);
            formData.append("Time", time);
            formData.append("location", location);
            formData.append("description", description);

            if (selectedFile) {
            formData.append("coverImage", selectedFile);
            }

            const response = await axios.post('http://localhost:3000/api/admin/createEvents',formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if(response.data){
                setEventName("");
                setDate("");
                setLocation("");
                setDescription("");
                setTime("");
                setSelectedFile(null)
            }
        }catch(error){
            console.error(error)
        }
    }

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            setSelectedFile(file)
        }
    }

    return( 
        <div className="min-h-screen bg-gray-100">
        <div className="fixed w-full">
            <Appbar isUser={false} />
        </div>
        <div className="container mx-auto px-4 py-10 flex justify-center">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 mt-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Organize a New Event
            </h1>

            <div className="space-y-5">
                <InputBox 
                value={EventName} 
                label="Event Name" 
                onChange={(e) => setEventName(e.target.value)} 
                />
                <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
                    <input
                    type="date"
                    value={Date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                </div>

                <div className="w-1/2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Time</label>
                    <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900"
                    />
                </div>
                </div>
                <InputBox 
                value={location} 
                label="Location" 
                onChange={(e) => setLocation(e.target.value)} 
                />
                <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 h-28 resize-none"
                />
                </div>

                <div className="flex items-center justify-center">
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 mb-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2h-2m-4-4h6"
                        ></path>
                    </svg>
                    <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                        {selectedFile?.name || "PNG, JPG up to 5MB"}
                    </p>
                    </div>
                    <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    />
                </label>
                </div>

                <button
                onClick={submitEvent}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                Create Event
                </button>
            </div>
            </div>
        </div>
        </div>

    )
}