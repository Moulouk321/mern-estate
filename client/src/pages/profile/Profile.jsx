import { React, useState, useRef, useEffect } from 'react'
import { app } from '../../firebase'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import './profile.css'

const Profile = ({ openPopUp, closePopUp }) => {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  // const [enable, setEnable] = useState(true)
  const [fileUploadError, setFileUploadError] = useState(false)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault() //preventing the default action of the submit which is refereshing
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
       const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  return (
    <div className='main-container'>
      <div
        id='ModelContainer'
        onClick={handlelosePopUp}
        className='fixed inset-0 flex justify-end items-center bg-opacity-20 main-container'>
        <div className=' popup bg-blue-50 w-full md:w-1/3 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5 slide-top'>
          <form onSubmit={handleSubmit}>
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
              <input type="text" name='username' id="username" defaultValue={currentUser.username}
                className='fs-16 text-black' required onChange={handleChange} />
              <label>Username</label>
            </div>
            <div className='estate__popup-content'>
              <input type="email" name='email' id="email" defaultValue={currentUser.email}
                className='fs-16 text-black' required onChange={handleChange} />
              <label>Email</label>
            </div>
            <div className='popup-content_submit'>
              <button disabled={loading} className='text-black fs-16 update-button disabled:text-gray-700'>
                {loading ? 'Loading...' : 'Update'}
              </button>
            </div>
          </form>
          <div className="red-links flex justify-between items-center mt-2">
            <span className='fs-12'>Delete account</span>
            <span className='fs-12'>Sign out</span>
          </div>
          <p className='text-red-700 text-sm mt-3'>{error ? error : ''}</p>
          <p className='text-green-700 text-sm mt-3'>
            {updateSuccess ? 'User is updated successfully' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile