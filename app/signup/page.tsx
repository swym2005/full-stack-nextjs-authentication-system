"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

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
            // Now the user should be pushed onto the login screen so..
            router.push("/login");

        } catch (error:any) {
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
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
             type="text" 
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username" />

             <label htmlFor="email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
             type="email" 
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email" />

             <label htmlFor="password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
             type="password" 
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password" />
            
            <button onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No SignUp" : "SignUp"}</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}