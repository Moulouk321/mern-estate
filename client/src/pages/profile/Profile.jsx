import { React, useState, useRef, useEffect } from 'react'
import { app } from '../../firebase'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import './profile.css'

const Profile = ({ openPopUp, closePopUp }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [enable, setEnable] = useState(true)
  const [fileUploadError, setFileUploadError] = useState(false)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [formData, setFormData] = useState({});

  // const handleUpdate = (e) =>{
  //   enable ? setEnable(false) :
  //   console.log('Update')
  // }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    )
  }

  const handlelosePopUp = (e) => {
    if (e.target.id === 'ModelContainer') {
      closePopUp();
    }
  }

  if (openPopUp !== true) return null

  return (
    <div className='main-container'>
      <div
        id='ModelContainer'
        onClick={handlelosePopUp}
        className='fixed inset-0 flex justify-end items-center bg-opacity-20 main-container'>
        <div className=' popup bg-blue-50 w-full md:w-1/3 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5 slide-top'>
          <form>
            <div className='w-full flex flex-col p-3 justify-center items-center'>
              <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
              <img onClick={() => fileRef.current.click()} src={ formData.avatar || currentUser.avatar}
                alt="profile" className='rounded-full cursor' />
              <p> {fileUploadError ? (
                <span className='text-red-700 text-sm'> Error in uploading an image </span>
              )
                : filePerc > 0 && filePerc < 100 ? (
                  <span className='italic text-sm'> {`Uploading ${filePerc}%`} </span>
                )
                  : filePerc === 100 ? (
                    <span className='text-green-700 text-sm'>Image succesfully uploaded!</span>)
                    : (
                      ""
                    )

              }
              </p>
              <p className='username fs-18'> Hi {currentUser.username}!</p>
            </div>
            <div className='estate__popup-content'>
              <input type="text" disabled={enable} name='username' id="username" value={currentUser.username}
                className='fs-16 text-black' required />
              <label>Username</label>
            </div>
            <div className='estate__popup-content'>
              <input type="email" disabled={enable} name='email' id="email" value={currentUser.email} className='fs-16 text-black' required />
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
    </div>
  )
}

export default Profile