import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '../../redux/user/userSlice'
import './signin.css'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      dispatch(signInStart()) //setLoading(true)
      const res = await fetch('api/auth/signin', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data.message)) //setLoading(false); setError(data.message)
        return;
      }
      dispatch(signInSuccess(data)) //setLoading(false); setError(null)
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message)) //setLoading(false); setError(error.message)
    }
  }
  return (
    <div className='estate__signin back-darkest'>
      {/* <div className='estate__signin-content'> */}
      <h1 className='estate__signin-content_title text-white text-center font-semibold fs-30'>Sign In</h1>
      <form onSubmit={handleSubmit} className='estate__signin-content_form'>
        <div className='estate__signin-content_form-box'>
          <input type="email" name='email' id="email" className='fs-16 text-white' onChange={handleChange} required  />
          <label>Email</label>
        </div>
        <div className='estate__signin-content_form-box'>
          <input type="password" name='password' id="password" className='fs-16 text-white' onChange={handleChange} required  />
          <label>Password</label>
        </div>
        <div className='estate__signin-content_form-box_submit'>
          <button disabled={loading} className='text-white fs-16 signup-in-button disabled:text-gray-700'>
          {loading ? 'loading...' : 'Sign In'}
          </button>
        </div>
      </form>
      {/* </div> */}
      <div className='text-center my-2 flex justify-center items-center'>
        <p className='text-white my-1 italic'>Dont have an account?</p>
        <Link to='/sign-up' className=' italic color-light-blue'>Sign up</Link>
      </div>
      {error && <p className='text-red-500 mt-5'> { error } </p>}
    </div>
  )
}

export default SignIn