import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import toast from 'react-hot-toast';
import LoadingButton from "../components/LoadingButton";
import { useGoogleLogin } from '@react-oauth/google';
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { AuthService } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
function Login() {
   const [inputs, setInputs] = useState({ email: "", password: "" });
   const [loggingIn, setLoggingIn] = useState(false)
   const { login } = AuthService()
   const navigate = useNavigate()

   const onInputChange = (e) => {
      const { name, value } = e.target;
      setInputs(prev => {
         return { ...prev, [name]: value }
      });
   }

   const onSubmit = (e) => {
      e.preventDefault();
   }

   const onEmailLogin = async () => {
      console.log(inputs);
      if (!validateInputs(inputs)) return;
      setLoggingIn(true)
      await login(inputs)
      setLoggingIn(false);
   }

   const onGoogleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
         console.log(tokenResponse);
         navigate("/register/phone", { state: { token: tokenResponse.access_token } })
      },
      onError: () => toast.error("Login failed!")
   });

   return (
      <div className="min-h-screen w-full p-2 flex items-center justify-center">
         <form className="w-full max-w-96 shadow-md p-4 border" onSubmit={onSubmit}>
            <h3 className="text-blue-900 text-2xl font-extrabold mb-5">
               MyToDo - Sign in
            </h3>

            <div className="space-y-4">
               <Input name="email" type="email" placeholder="Email address" value={inputs.email} onChange={onInputChange} />
               <Input name="password" type="password" placeholder="Password" value={inputs.password} onChange={onInputChange} />
            </div>

            <div className="mt-5">
               {
                  loggingIn ? <LoadingButton text="Logging in..." /> : <Button text="Login" onClick={onEmailLogin} />
               }
            </div>

            <div className="my-4 flex items-center gap-4">
               <hr className="w-full border-2" />
               <p className="text-sm text-text-light-secondary uppercase dark:text-text-dark-secondary text-center">or</p>
               <hr className="w-full border-2" />
            </div>

            <button
               type="button"
               className='active:scale-98 hover:bg-blue-100 mb-3 hs-XqwWvWI-3ad3e02c8d29hs-XqwWvWI- w-full hs-XqwWvWI-3ad3e02c8dhs-XqwWvWI- hs-XqwWvWI-8c9b928e0a29hs-XqwWvWI- flex hs-XqwWvWI-8c9b928e0ahs-XqwWvWI- hs-XqwWvWI-8fa3992b2029hs-XqwWvWI- items-center hs-XqwWvWI-8fa3992b20hs-XqwWvWI- hs-XqwWvWI-f9a4827d4d29hs-XqwWvWI- justify-center hs-XqwWvWI-f9a4827d4dhs-XqwWvWI- hs-XqwWvWI-e577dc2bef29hs-XqwWvWI- gap-4 hs-XqwWvWI-e577dc2befhs-XqwWvWI- hs-XqwWvWI-8395fae57b29hs-XqwWvWI- py-3 hs-XqwWvWI-8395fae57bhs-XqwWvWI- hs-XqwWvWI-ccddc7d62629hs-XqwWvWI- px-6 hs-XqwWvWI-ccddc7d626hs-XqwWvWI- hs-XqwWvWI-36ff319a6829hs-XqwWvWI- text-sm hs-XqwWvWI-36ff319a68hs-XqwWvWI- hs-XqwWvWI-6f1bbbe2f729hs-XqwWvWI- tracking-wide hs-XqwWvWI-6f1bbbe2f7hs-XqwWvWI- hs-XqwWvWI-b7c9ae9a9029hs-XqwWvWI- text-text-light-secondary dark:text-text-dark-secondary hs-XqwWvWI-b7c9ae9a90hs-XqwWvWI- hs-XqwWvWI-9ff09b5fd029hs-XqwWvWI- border-2 hs-XqwWvWI-9ff09b5fd0hs-XqwWvWI- hs-XqwWvWI-1b1ab7973029hs-XqwWvWI- border-border-light-primary dark:border-border-dark-primary hs-XqwWvWI-1b1ab79730hs-XqwWvWI- hs-XqwWvWI-d05034dc4d29hs-XqwWvWI- rounded-md hs-XqwWvWI-d05034dc4dhs-XqwWvWI- hs-XqwWvWI-8e263205c629hs-XqwWvWI- bg-bg-light-primary dark:bg-bg-dark-primary hs-XqwWvWI-8e263205c6hs-XqwWvWI- hs-XqwWvWI-8e06a6b0a629hs-XqwWvWI- hover:bg-hover-light-primary dark:hover:bg-hover-dark-primary hs-XqwWvWI-8e06a6b0a6hs-XqwWvWI- hs-XqwWvWI-5d4084d3cd29hs-XqwWvWI- focus:outline-none hs-XqwWvWI-5d4084d3cdhs-XqwWvWI-'
               onClick={() => onGoogleLogin()}
            >
               <FaGoogle />
               Continue with google
            </button>

            <p className="text-center text-sm mt-4">
               New member?  
               <Link className="text-blue-600 hover:underline font-semibold" to={"/register"}> Create new account</Link>
            </p>
         </form>
      </div>
   )
}

export default Login;

function validateInputs({ email, password }) {
   if (email.trim() === "") {
      toast.error("Email is required!")
      return false;
   } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      toast.error("Invalid email address!")
      return false;
   }

   if (password.trim() === "") {
      toast.error("Password is required!")
      return false;
   } else if (password.trim().length < 8) {
      toast.error("Password must have atleast 8 characters!")
      return false;
   }
   return true;
}
