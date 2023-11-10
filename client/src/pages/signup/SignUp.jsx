import React from 'react'
import './signup.css'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='estate__signup back-darkest'>
      {/* <div className='estate__signup-content'> */}
        <h1 className='estate__signup-content_title text-white text-center font-semibold fs-30'>Sign Up</h1>
        <form className='estate__signup-content_form'>
          <div className='estate__signup-content_form-box'>
            <input type="text" name='username' id="username" className='fs-16 text-white' required/>
            <label>Username</label>
          </div>
          <div className='estate__signup-content_form-box'>
            <input type="email" name='email' id="email" className='fs-16 text-white' required/>
            <label>Email</label>
          </div>
          <div className='estate__signup-content_form-box'>
            <input type="password" name='password' id="password" className='fs-16 text-white' required/>
            <label>Password</label>
          </div>
          <div className='estate__signup-content_form-box_submit'>
            <button disabled className='text-white fs-16 signup-in-button'>Sign Up</button>
          </div>
        </form>
      {/* </div> */}
      <div className='text-center my-2'>
        <p className='text-white my-1 italic'>Already have an account?</p>
        <Link to='/sign-in' className=' italic color-light-blue'>Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp