import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import './profile.css'

const Profile = ({ openPopUp, closePopUp }) => {
  const { currentUser } =  useSelector((state) => state.user)
  const [enable, setEnable] = useState(true)

  // const handleUpdate = (e) =>{
  //   enable ? setEnable(false) :
  //   console.log('Update')
  // }

  const handlelosePopUp = (e) => {
    if (e.target.id === 'ModelContainer') {
      closePopUp();
    }
  }

  if (openPopUp !== true) return null

  return (
     <div
      id='ModelContainer'
      onClick={handlelosePopUp}
      className='fixed inset-0 flex justify-end items-center bg-opacity-20'>
      <div className=' popup bg-blue-50 w-full md:w-1/3 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5 slide-top'>
        <div className='w-full flex flex-col p-3 justify-center items-center'>
          <img src= { currentUser.avatar } alt="profile" className='rounded-full' />
          <p className='username fs-18'> Hi { currentUser.username }!</p>
        </div>
        <form>
          <div className='estate__popup-content'>
            <input type="text" disabled={enable} name='username' id="username" value={ currentUser.username }
             className='fs-16 text-black'required  />
            <label>Username</label>
          </div>
          <div className='estate__popup-content'>
            <input type="email" disabled={enable} name='email' id="email" value={ currentUser.email } className='fs-16 text-black'required  />
            <label>Email</label>
          </div>
          <div className='popup-content_submit'>
            <button className='text-black fs-16 update-button'>
              Update
            </button>
          </div>
          <div className="red-links flex justify-between items-center mt-2">
            <span className='fs-12'>Delete account</span>
            <span className='fs-12'>Sign out</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile