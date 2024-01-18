// import React from 'react'
import './createListing.css'

export default function CreateListing() {
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
                  className='w-5 fs-16'
                />
                <span>Sell</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='rent'
                  className='w-5 fs-16'
                />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  className='w-5 fs-16'
                />
                <span>Parking spot</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='furnished'
                  className='w-5 fs-16'
                />
                <span>Furnished</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='offer'
                  className='w-5 fs-16'
                />
                <span>Offer</span>
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
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              className='p-3 border border-gray-300 w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              className='p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80'
            >Upload
            </button>
          </div>
          <button
            className='p-3 hover:opacity-95 disabled:opacity-80 update-button fs-16'
          >
            Create listing
          </button>
        </div>
        </form>
    </main>
  )
}
