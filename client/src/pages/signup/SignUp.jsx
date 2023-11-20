import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../../components/oauth/OAuth'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, [e.target.id]: e.target.value
      }
    )
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault(); //to prevent refreshing the page after clicking submit
    try {
      setLoading(true)
      const res = await fetch('api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        setLoading(false)
        setError(data.message)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className='estate__signup back-darkest'>
      {/* <div className='estate__signup-content'> */}
      <h1 className='estate__signup-content_title text-white text-center font-semibold fs-30'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='estate__signup-content_form'>
        <div className='estate__signup-content_form-box'>
          <input type="text" name='username' id="username" className='fs-16 text-white' onChange={handleChange} required  />
          <label>Username</label>
        </div>
        <div className='estate__signup-content_form-box'>
          <input type="email" name='email' id="email" className='fs-16 text-white' onChange={handleChange} required  />
          <label>Email</label>
        </div>
        <div className='estate__signup-content_form-box'>
          <input type="password" name='password' id="password" className='fs-16 text-white' onChange={handleChange} required  />
          <label>Password</label>
        </div>
        <div className='estate__signup-content_form-box_submit'>
          <button disabled={loading} className='text-white fs-16 signup-in-button disabled:text-gray-700'>
            {loading ? 'loading...' : 'Sign Up'}
          </button>
        </div>
        <div className='estate__signin-content_form-box_oauth'>
          <OAuth />
        </div>
      </form>
      {/* </div> */}
      <div className='text-center my-2 flex justify-center items-center'>
        <p className='text-white my-1 italic'>Already have an account?</p>
        <Link to='/sign-in' className=' italic color-light-blue'>Sign in</Link>
      </div>
      {error && <p className='text-red-500 mt-5'> { error } </p>}
    </div>
  )
}

export default SignUp