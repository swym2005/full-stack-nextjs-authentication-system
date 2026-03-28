"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";


export default function ProfilePage() {

    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Success");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
            
        }
    }

    const renderUserDetails = async () => {
            const response = await axios.get('/api/users/me');
            console.log(response.data);
            // response has a field data in which we name a field data which contains _id so...
            setData(response.data.data._id);
    }

    const [data, setData] = useState("nothing");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page </p>
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold
            py-2 px-4 rounded">Logout</button>
             <button onClick={renderUserDetails} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold
            py-2 px-4 rounded">Go to UserDetails</button>
            <Toaster position="bottom-right"/>
        </div>
    )
}