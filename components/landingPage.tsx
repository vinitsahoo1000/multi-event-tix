"use client"
import { useRouter } from "next/navigation";


export const LandingPage = ()=>{
    const router = useRouter();
    
        return (
            <div className="w-full">
            <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl font-extrabold mb-4">Multievent Tix</h1>
                <p className="text-lg max-w-2xl mx-auto mb-8">
                From music festivals to tech conferences – explore, book, and attend events with ease.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                <button
                    className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
                    onClick={() => router.push("/signin")}
                >
                    Explore Events
                </button>
                <button
                    className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
                    onClick={() => router.push("/signin")}
                >
                    Organize Your Event
                </button>
                </div>
            </section>
        
            <section className="bg-gray-100 py-16 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-10">How It Works</h2>
                <div className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto">
                {[
                    {
                    title: "Browse Events",
                    desc: "Explore a wide range of events near you – concerts, sports, workshops, and more.",
                    },
                    {
                    title: "Book Instantly",
                    desc: "Secure your tickets online with fast and secure checkout.",
                    },
                    {
                    title: "Attend & Enjoy",
                    desc: "Show your e-ticket at the venue and enjoy the experience!",
                    },
                ].map((step, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition max-w-sm">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                    </div>
                ))}
                </div>
            </section>
        
            <section className="bg-white py-16 px-6 text-center">
                <h2 className="text-2xl font-bold text-indigo-700 mb-10">🔥 Trending Events This Week</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5 shadow hover:bg-gray-100 transition">
                    <div className="h-40 bg-gray-300 rounded mb-4"></div>
                    <h3 className="text-lg font-semibold mb-1">Sample Event</h3>
                    <p className="text-sm text-gray-600">Mumbai • 21/02/2026</p>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                        Book Now
                    </button>
                    </div>
                ))}
                </div>
            </section>
        
            <section className="bg-blue-50 py-16 px-6 text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">🎤 Hosting an Event? We've Got You Covered.</h2>
                <p className="text-blue-800 max-w-xl mx-auto mb-8">
                Create your event in minutes and start selling tickets today. Track sales, manage attendees, and promote with ease.
                </p>
                <button
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                onClick={() => router.push("/signin/?role=admin")}
                >
                Create an Event
                </button>
            </section>
        
            <section className="bg-gray-900 text-white py-16 px-6 text-center">
                <h2 className="text-2xl font-bold mb-6">Why Multievent Tix?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                    "Seamless Booking Experience",
                    "Secure Payments",
                    "Easy Event Management",
                    "Real-Time Ticket Tracking",
                    "24/7 Support",
                    "Promote Your Events",
                ].map((benefit, i) => (
                    <div key={i} className="p-4">
                    <span className="text-yellow-400 text-xl">✔️</span>
                    <p className="mt-2">{benefit}</p>
                    </div>
                ))}
                </div>
            </section>
        
            <section className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white py-12 px-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Ready to experience your next big event?</h2>
                <div className="flex justify-center gap-4 flex-wrap">
                <button
                    className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
                    onClick={() => router.push("/signin/?role=user")}
                >
                    Browse Events
                </button>
                <button
                    className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
                    onClick={() => router.push("/signin/?role=admin")}
                >
                    Sign Up as Organizer
                </button>
                </div>
            </section>
            </div>)
}