import { useState } from "react";
import Button from "../components/Button";
import toast from 'react-hot-toast';
import LoadingButton from "../components/LoadingButton";
import { useLocation } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import Input from "../components/Input";

function Phone() {
   const [phone, setphone] = useState("");
   const [loading, setLoading] = useState(false);
   const location = useLocation();
   const token = location.state?.token;

   const { loginWithGoogle } = AuthService();

   const onPhoneChange = (e) => {
      setphone(e.target.value);
   };

   const onSubmit = async () => {
      if (!phone) {
         toast.error("Phone number is required!");
         return;
      } if (!token) {
         return;
      }
      setLoading(true);
      await loginWithGoogle({ token: token, phone: phone })
      setLoading(false)
   };

   return (
      <div className="min-h-screen w-full p-2 flex items-center justify-center">
            <div className="w-full max-w-96 shadow-md p-4 border">
               <h3 className="text-blue-900 text-2xl font-extrabold mb-5">
                  Enter Phone number
               </h3>

               <Input name="phone" type="text" placeholder="Phone number (+94xxxxxxxxx)" value={phone} onChange={onPhoneChange} />

               <div className="!mt-4">
                  {
                     loading ? (
                        <LoadingButton text="Saving..." />
                     ) : (
                        <Button text="Create account" onClick={onSubmit} />
                     )
                  }
               </div>
            </div>
      </div>
   );
}

export default Phone;