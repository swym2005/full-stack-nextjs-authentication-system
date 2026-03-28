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
    email: "",
    password: "",
  })  

//   onSignUp function is for doing something when the user hits the signUp button..
// This will do some talking to the database
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Login success", response.data);
            toast.success("Login Success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

     const [buttonDisabled, setButtonDisabled] = React.useState(false);
      const[loading, setLoading] = React.useState(false);

      React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
      }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            
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
            
            <button disabled={buttonDisabled || loading} onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50">{buttonDisabled ? 'No Login' : 'Login Here'}</button>
            <Toaster position="bottom-right"/>
            <Link href="/signup">Visit SignUp Page</Link>
        </div>
    )
}