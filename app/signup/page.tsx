"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import axios, { AxiosError } from "axios";

export default function SignupPage() {

    const router = useRouter();

    // Simple state management in here.
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  })  

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const[loading, setLoading] = React.useState(false);

//   onSignUp function is for doing something when the user hits the signUp button..
// This will do some talking to the database
    const onSignUp = async () => {

        try {
            setLoading(true)
            // Taking the data from frontend and putting it to backend.
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup Successful");
            // Now the user should be pushed onto the login screen so..
            router.push("/login");

        } catch (error: any) {
            console.log("SignUp failed", error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }

    // SignUp button ko tabhi chalu karo jab kuch likha pada ho else keep button disabled.
    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
            id="username"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
             type="text" 
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username" />

             <label htmlFor="email">email</label>
            <input
            id="email"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
             type="email" 
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email" />

             <label htmlFor="password">password</label>
            <input
            id="password"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
             type="password" 
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password" />
            
            <button disabled={buttonDisabled || loading} onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50">{buttonDisabled ? "No SignUp" : "SignUp"}</button>
            <Toaster position="bottom-right" />
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}