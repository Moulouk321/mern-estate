import { useState, useRef, useEffect } from 'react'
import { app } from '../../firebase'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import PropTypes from 'prop-types';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import './profile.css'

const Profile = ({ openPopUp, closePopUp }) => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // const [enable, setEnable] = useState(true)
  const [fileUploadError, setFileUploadError] = useState(false)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // eslint-disable-next-line no-unused-vars
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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      closePopUp();
      navigate('/sign-in')
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      closePopUp();

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(true)
        return;
      }
      setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json()
      if (data.success === false) {
        console.log(data.message)
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='main-container'>
      <div
        id='ModelContainer'
        onClick={handlelosePopUp}
        className='fixed flex justify-end items-center bg-opacity-20 main-container'>
        <div className=' popup w-full md:w-1/3 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-5 scale-up-center'>
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
              <Link to={"create-listing"} className='flex justify-center text-black fs-16 update-button disabled:text-gray-700'>
                Create Listing
              </Link>
          </form>
          <div className="red-links flex justify-between items-center mt-2">
            <span onClick={handleDeleteUser} className='fs-12'>Delete account</span>
            <span onClick={handleSignOut} className='fs-12'>Sign out</span>
          </div>
          <p className='text-red-700 text-sm mt-3'>{error ? error : ''}</p>
          <p className='text-green-700 text-sm mt-3'>
            {updateSuccess ? 'User is updated successfully' : ''}
          </p>

          <button onClick={handleShowListings} className='text-green-700 fs-16 w-full'>
            Show my Listings
          </button>

          <p className='text-red-700 mt-5 fs-16'>
            {showListingsError ? 'Error showing listings' : ''}
          </p>

          {userListings && userListings.length > 0 && (
            <div className='flex flex-col gap-4'>
              <h1 className='text-center mt-7 fs-16 font-semibold'>
                Your Listings
              </h1>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className='border rounded-lg p-3 flex justify-between items-center gap-4'
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt='listing cover'
                      className='h-16 w-16 object-contain'
                    />
                  </Link>
                  <Link
                    className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>

                  <div className='flex flex-col item-center'>
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className='text-red-700 fs-16'>Delete</button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className='text-green-700 fs-16'>Edit</button>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      )}

        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  openPopUp: PropTypes.bool.isRequired, 
  closePopUp: PropTypes.func.isRequired,
}

export default Profile