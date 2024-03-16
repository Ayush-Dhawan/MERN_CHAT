import React, { useState } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function Login() {
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    const {login} = useLogin();

    async function handleSubmit(e: any){
        e.preventDefault();
        await login({username, password})
    }
  return (
    <div className='flex items-center justify-between flex-col md:flex-row'>
       <div className='w-full'>
       <center><img src='./logo.png' alt='img' height={250} width={250} /></center>
       <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" id='email' placeholder="Email here" className="input input-bordered input-success w-full " onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" id='password' placeholder="Password here" className="input input-bordered input-success w-full " onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <label className="label">
            <NavLink to={'/signUp'}><a href="#" className="label-text-alt link link-hover">Don't have an account?</a></NavLink>
          </label>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-success">Login</button>
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
