// import React from 'react'
import { useState } from 'react'
import './createListing.css'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase'

export default function CreateListing() {
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  })
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(files, imageUploadError)

  const handleImageSubmit = (e) => {
    e.preventDefault()
    if(files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData, imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
          
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)', err);
          setUploading(false);
        });
    }
    else {
      setImageUploadError('You have to upload 1 image minimum and 6 maximum.');
      setUploading(false);
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className='main-container'>
        <h1 className='fs-30 color-basic-text title'>Create a Listing</h1>
        <form className="createListingForm">
          <div className="inputs flex flex-col gap-6">
            <div className="form-box">
              <input type="text"
              className='focus:outline-none'
              id="name"
              maxLength='62'
              minLength='10'
              required/>
              <label className='fs-16'>Name</label>
            </div>
            <div className="form-box">
              <textarea type="text"
              className='focus:outline-none'
              id="description"
              required/>
              <label className='fs-16'>Description</label>
            </div>
            <div className="form-box">
              <input type="text"
              className='focus:outline-none'
              id="address"
              required/>
              <label className='fs-16'>Address</label>
            </div>
            <div className='flex gap-6 flex-wrap checkboxes'>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className='w-5'
                />
                <span className='fs-16'>Sell</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='rent'
                  className='w-5'
                />
                <span className='fs-16'>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  className='w-5'
                />
                <span className='fs-16'>Parking spot</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='furnished'
                  className='w-5'
                />
                <span className='fs-16'>Furnished</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='offer'
                  className='w-5'
                />
                <span className='fs-16'>Offer</span>
              </div>
            </div>
            <div className='flex flex-wrap gap-6 numbers'>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bedrooms'
                  min='1'
                  max='10'
                  required
                  className='p-3'
                />
                <p className='fs-16'>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bathrooms'
                  min='1'
                  max='10'
                  required
                  className='p-3'
                />
                <p className='fs-16'>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='regularPrice'
                  min='50'
                  max='10000000'
                  required
                  className='p-3'
                />
                <div className='flex flex-col items-center'>
                  <p className='fs-16'>Regular price</p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='50'
                  max='10000000'
                  required
                  className='p-3'
                />
                <div className='flex flex-col items-center'>
                  <p className='fs-16'>Discounted price</p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 right-part'>
          <p className='font-semibold fs-16'>
            Images:
            <span className='font-normal text-gray-600 ml-2 fs-16'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 fs-16 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80'
            >{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
          <p className='text-red-700 text-sm'> {imageUploadError && imageUploadError} </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 fs-16 rounded-lg hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            className='p-3 hover:opacity-95 disabled:opacity-80 update-button fs-16'
          >Create listing</button>
        </div>
        </form>
    </main>
  )
}
