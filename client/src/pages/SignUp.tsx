import React, { useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

export default function SignUp() {
    const [username, setUsername] = useState<String>("");
    const [fullName, setFullName] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [confirmPassword, setConfirmPassword] = useState<String>("");
    const [gender, setGender] = useState<String>("");

    const { signUp } = useSignUp();

   async function handleSubmit(e: any){
        e.preventDefault();
        console.log(password, confirmPassword)
        
        await signUp({fullName, username, password, confirmPassword, gender})
    }
  return (
    <div className='flex items-center justify-between flex-col md:flex-row'>
       <div className='w-full h-full'>
       <center><img src='./logo.png' alt='img' height={250} width={250} /></center>
       <form className="card-body h-[70%]" onSubmit={handleSubmit}>
       <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input type="text" id='namel' placeholder="Email here" className="input input-bordered input-success w-full " onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" id='username' placeholder="Email here" className="input input-bordered input-success w-full " onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='grid grid-cols-2 gap-2'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" id='password' placeholder="Password here" className="input input-bordered input-success w-full " onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type="password" id='confirmpassword' placeholder="Password here" className="input input-bordered input-success w-full " onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex gap-3'><input onClick={() => setGender("male")} type="radio" name="radio-5" className="radio radio-success"  /><span>Male</span></div>
              <div className='flex gap-3'><input onClick={() => setGender("female")} type="radio" name="radio-5" className="radio radio-success"  /><span>Female</span></div>
          </div>
          {/* <input type="text" id='username' placeholder="Email here" className="input input-bordered input-success w-full " onChange={(e) => setUsername(e.target.value)} required /> */}
        </div>
        <label className="label">
        <NavLink to={'/login'}><a href="#" className="label-text-alt link link-hover">Already have an account?</a></NavLink>
          </label>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-success">Sign Up</button>
        </div>
      </form>
       </div>
                {/* <div className="mockup-phone border-success">
                    <div className="camera"></div> 
                    <div className="display">
                        <div className="artboard artboard-demo phone-1">Hi.</div>
                    </div>
            </div> */}
            <img src='./login.png' alt='img' height={600} width={600} />
    </div>
  )
}
