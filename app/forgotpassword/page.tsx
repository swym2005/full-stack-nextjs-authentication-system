"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {

    const router = useRouter();

    // Simple state management in here.
  const [user, setUser] = React.useState({ 
    newPassword: "",
  })  

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [token, setToken] = React.useState("");

const onReset = async () => {
try {
    const response = await axios.post('/api/users/forgotpassword', { token, newPassword: user.newPassword });
    console.log("Your password is reset");
    toast.success("Your password is successfully changed");
    router.push('/login');
} catch (error: any) {
    console.log("Reset request failed");
            toast.error(error.message);
}
}

React.useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || "");
}, [])

React.useEffect(() => {
    if(user.newPassword.length > 0)
    {
        setButtonDisabled(false);
    }
    else
    {
        setButtonDisabled(true);
    }
}, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Reset your Password</h1>
            <hr />
            
             <label htmlFor="newpassword">New Password</label>
            <input
            id="newpassword"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
             type="password" 
            value={user.newPassword}
            onChange={(e) => setUser({...user, newPassword: e.target.value})}
            placeholder="New Password" />
            
            <button disabled={buttonDisabled} onClick={onReset} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50">Reset Password</button>
            <Toaster position="bottom-right"/>
        </div>
    )
}