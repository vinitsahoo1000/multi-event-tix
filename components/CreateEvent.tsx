"use client"
import axios from "axios";
import { useState } from "react";
import { InputBox } from "./inputbox";



export const CreateEvent = ()=>{
    const [EventName,setEventName] = useState("");
    const [description,setDescription] = useState("");
    const [Date,setDate] = useState("");
    const [location,setLocation] = useState("");
    const [time,setTime] = useState("");

    const submitEvent = async()=>{
        try{
        const response = await axios.post('http://localhost:3000/api/admin/createEvents',{
        EventName,
        Date,
        description,
        location,
        Time: time
        })
        if(response.data){
            setEventName("");
            setDate("");
            setLocation("");
            setDescription("")
            setTime("")
        }
        }catch(error){
            console.error(error)
        }
    }

    return( 
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Organize a New Event
        </h1>
        <div className="space-y-4">
            <InputBox value={EventName} label="Event Name" onChange={(e)=>{setEventName(e.target.value)}}/>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
            <input
                value={Date}
                type="date"
                onChange={(e)=>{setDate(e.target.value)}}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900"
            />
            </div>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Time</label>
            <input
                type="time"
                value={time}
                onChange={(e)=>{setTime(e.target.value)}}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900"
            />
            </div>
            <InputBox value={location} onChange={(e)=>{setLocation(e.target.value)}} label="Location" />
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className="w-full border rounded-xl border-gray-300 h-24 p-2 resize-none"/>
            <div className="flex items-center justify-center w-full">
            <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 mb-4 text-gray-500"
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
                <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG 
                </p>
                </div>
                <input id="file-upload" type="file" className="hidden" />
            </label>
            </div>
            <button
            onClick={submitEvent}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
            Create Event
            </button>
        </div>
        </div>
    )
}