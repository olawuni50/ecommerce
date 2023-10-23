"use client"
import {FC, useRef, useState} from 'react'
import { Button } from '@/components';
import axios from 'axios'
import {toast} from 'react-hot-toast'

interface SignUpProps{
    isSignupFormOpen: boolean;
    // function that returns nothing
    toggleForm: () => void
}


const SignUp :FC<SignUpProps> = props => {
      
      const {isSignupFormOpen, toggleForm} = props

      // disable button when form is submitting
      const [isFormSubmitting, setIsFormSubmit] = useState(false);
      const [loading, setLoading] = useState(false);

      const emailRef = useRef<HTMLInputElement>(null)
      const passwordRef = useRef<HTMLInputElement>(null)

  const signupHandler = async () => {
    if(!emailRef.current || !passwordRef.current) return;

    setIsFormSubmit(true);
    setLoading(true)

    try {
      const response = await axios.post("/api/sign-up", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(response)

      setIsFormSubmit(false);
      setLoading(false)
    

      if(response.data) toast.success(`${response.statusText}. Please sign in`)

    } catch (error) {
      setIsFormSubmit(false);
      setLoading(false)
      toast.error('Something went wrong')
      console.log("Error", error);

    }
    toggleForm()
  }

    return isSignupFormOpen ? (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 z-40">
          
            <div className="bg-white p-3 w-64 rounded shadow-lg">
                <h2 className="mb-3 text-lg font-bold flex justify-center">Sign up</h2>
                <form>
  

  <label className="block" >
    <span className="block text-md mb-2 font-medium text-slate-700">Email</span>
    <input type="email" ref={emailRef} id='email' className="peer ... p-2 rounded outline-none w-full bg-slate-200"/>
    <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>

  <label className="block" >
    <span className="block text-md mb-2 font-medium text-slate-700">Password</span>
    <input type="password" ref={passwordRef} id='password' className="peer ... p-2 outline-none w-full rounded bg-slate-200"/>
    
  </label>

  <div className="flex justify-evenly items-center mt-5">
    <h1 className="hover:border-2 hover:text-red-500 hover:bg-slate-100 bg-red-900 text-white py-2 px-4 rounded cursor-pointer">
      <span onClick={() => toggleForm()}>Cancel</span></h1>
    {/* <Button text="Sign up" handleClick={signupHandler}   /> */}
    <button  type="submit"  onClick={signupHandler} disabled={isFormSubmitting} 
    className="bg-purple-900 text-white py-2 px-4 rounded shadow-lg cursor-pointer">{loading ? "Loading..." : "Sign Up"}</button>
    
  </div>

</form>
            </div>

        </div>
    ): (
    <></>
    ) 
}

export default SignUp


// "use client";

// import { signIn } from "next-auth/react";
// import { ChangeEvent, useState } from "react";

// const SignUp = () => {
//   const [loading, setLoading] = useState(false);
//   const [formValues, setFormValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormValues({ name: "", email: "", password: "" });

//     try {
//       const res = await fetch("/api/sign-up", {
//         method: "POST",
//         body: JSON.stringify(formValues),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       setLoading(false);
//       if (!res.ok) {
//         setError((await res.json()).message);
//         return;
//       }

//       signIn(undefined, { callbackUrl: "/" });
//     } catch (error: any) {
//       setLoading(false);
//       setError(error);
//     }
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const input_style =
//     "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

//   return (
//     <form onSubmit={onSubmit}>
//       {error && (
//         <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
//       )}
//       <div className="mb-6">
//         <input
//           required
//           type="name"
//           name="name"
//           value={formValues.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className={`${input_style}`}
//         />
//       </div>
//       <div className="mb-6">
//         <input
//           required
//           type="email"
//           name="email"
//           value={formValues.email}
//           onChange={handleChange}
//           placeholder="Email address"
//           className={`${input_style}`}
//         />
//       </div>
//       <div className="mb-6">
//         <input
//           required
//           type="password"
//           name="password"
//           value={formValues.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className={`${input_style}`}
//         />
//       </div>
//       <button
//         type="submit"
//         style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
//         className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
//         disabled={loading}
//       >
//         {loading ? "loading..." : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default SignUp
