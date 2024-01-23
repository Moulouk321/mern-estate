import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import './header.css'
import Profile from '../../pages/profile/Profile';

export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const HandleRemovePopUp = () => setOpenPopup(false)
  const [isHeaderFixed, setIsHeaderFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const shouldFixHeader = scrollPosition > 100
      setIsHeaderFixed(shouldFixHeader)
    }

    window.addEventListener('scroll', handleScroll)

    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  return (
    <header className={isHeaderFixed ? 'fixed-header' : ''}>
        <div className='estate__header'>
            <div className='estate__header-upper shadow-md back-original py-1'>
              <div className='main-container flex items-center justify-between'>
                <Link to='./'>
                  <h1 className='estate__header-upper_logo font-bold fs-40 flex justify-start'>
                    <span className='color-text'>MK</span>
                    <span className='color-text_back'>Estate</span>
                  </h1>
                </Link>
                <form onSubmit={handleSubmit} className='flex items-center px-3 py-2 rounded-xl header-form'>
                  <input
                  type="text"
                  placeholder='Search'
                  className='bg-transparent focus:outline-none w-29 sm:w-64'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button><FaSearch /></button>
                </form>
                <div className='estate__header-upper_links flex items-center'>
                  <div className='flex items-center justify-between py-2'>
                    <div className='estate__header-lower_links flex items-center justify-center flex-1'>
                      <Link to='./' className='fs-18 pointer color-basic-text'>Home</Link>
                      <Link to='./about' className='fs-18 pointer color-basic-text'>About</Link>
                      {/* <Link to='./offers' className='fs-18 pointer color-basic-text'>Offers</Link> */}
                    </div>
                  </div>
                  <Link to='./sign-up' className='fs-18 pointer'>Sign Up</Link>
                  {/* <Link to='./profile' className='fs-18 pointer'> */}
                    { currentUser ? (
                      <img src={ currentUser.avatar } alt="profile" onClick={() => 
                        !openPopup ?
                        setOpenPopup(true) : setOpenPopup(false)
                      }/>
                    ) :
                    <Link to='./sign-in' className='fs-18 pointer'><span>Sign In</span></Link>
                    }
                  {/* </Link> */}
                </div>
              </div>
            </div>
            {/* <div className='estate__header-lower shadow-lg'>
              <div className='main-container flex items-center justify-between py-2'>
                <div className='estate__header-lower_links flex items-center justify-center flex-1'>
                  <Link to='./' className='fs-18 mx-4 pointer color-basic-text'>Home</Link>
                  <Link to='./about' className='fs-18 mx-4 pointer color-basic-text'>About</Link>
                  <Link to='./offers' className='fs-18 mx-4 pointer color-basic-text'>Offers</Link>
                </div>
              </div>
            </div> */}
            <Profile openPopUp={openPopup} closePopUp={HandleRemovePopUp} />
        </div>
    </header>
  )
}
