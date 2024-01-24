// import React from 'react'
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header'
import './home.css'
import { Link } from 'react-router-dom';
import ListingItem from '../../components/ListingItem';

const Home = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false)
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const shouldFixHeader = scrollPosition > 100
      setIsHeaderFixed(shouldFixHeader)
    }

    window.addEventListener('scroll', handleScroll)

    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  
  }, []);

  return (
    <div className="main-conatiner">
      <Header className={isHeaderFixed ? 'fixed-header' : ''} homePage={true} />
      <div className="main-image-cont">
        <div className="text">
          <h1 className='fs-60 text-white'>Find your next perfect
          <br />
          place with ease</h1>
          <Link to={'/search'} className='text-xs sm:text-sm text-white hover:underline'>
            See latest properties...
          </Link>
        </div>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold color-darkest fs-30'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4 cards'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold color-darkest fs-30'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4 cards'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold color-darkest fs-30'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4 cards'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home