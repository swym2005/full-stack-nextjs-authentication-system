"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
           await axios.post("/api/users/verifyemail", { token })
           setVerified(true);
           setError(false);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    // Pehle token loge then token set hogi
    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");

        setToken(urlToken || "");
    }, [])
    
    // Set hone ke baad backend call hoga and page change hoga..(status update karega)
    useEffect(() => {
        if(token.length > 0)
        {
            verifyEmail();
        }
    }, [token])


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No Token"} </h2>

        {/* What when the user is verified.. */}
        {verified && (<div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href="/login">
            Login
            </Link>
        </div>)}

          {error && (<div>
            <h2 className="text-2xl bg-red-500 text-black">Error</h2>
            
        </div>)}

        </div>
    )

}


