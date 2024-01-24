import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import './header.css'
import Profile from '../../pages/profile/Profile';
import PropTypes from 'prop-types';

export default function Header({ homePage }) {
  const headerClassName = homePage ? 'home-header' : 'default-header estate__header-upper shadow-md py-1 ';
  const headerHome = homePage ? 'main-home-header estate__header' : 'estate__header';
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const HandleRemovePopUp = () => setOpenPopup(false)
  const [isHeaderFixed, setIsHeaderFixed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
        <div className={headerHome}>
            <div className={headerClassName}>
              <div className='main-container flex items-center justify-between'>
                <Link to='/'>
                  <h1 className='estate__header-upper_logo font-bold fs-40 flex justify-start'>
                    <span className='color-text'>MK</span>
                    <span className='color-text_back'>Estate</span>
                  </h1>
                </Link>
                <form onSubmit={handleSubmit} className='flex items-center px-3 py-2 rounded-xl header-form'>
                  <input
                  type="text"
                  placeholder='Search'
                  className='bg-transparent focus:outline-none w-29 sm:w-64 search-input'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button><FaSearch /></button>
                </form>
                <div className='estate__header-upper_links flex items-center'>
                  <div className='flex items-center justify-between links-desktop py-2'>
                    <div className='estate__header-lower_links flex items-center justify-center flex-1'>
                      <Link to='/' className='fs-18 pointer color-basic-text'>Home</Link>
                      <Link to='/about' className='fs-18 pointer color-basic-text'>About</Link>
                      {/* <Link to='./offers' className='fs-18 pointer color-basic-text'>Offers</Link> */}
                    </div>
                  </div>
                  {/* <Link to='./sign-up' className='fs-18 pointer'>Sign Up</Link> */}
                  {/* <Link to='./profile' className='fs-18 pointer'> */}
                    { currentUser ? (
                      <img src={ currentUser.avatar } alt="profile" className='profile' onClick={() => 
                        !openPopup ?
                        setOpenPopup(true) : setOpenPopup(false)
                      }/>
                    ) :
                    <Link to='/sign-in' className='fs-18 pointer'><span>Sign In</span></Link>
                    }
                    <div className='estate__header-mobile'>
                      <img src={menuOpen ? "https://static.thenounproject.com/png/2971446-200.png" : "https://icon-library.com/images/hamburger-menu-icon-svg/hamburger-menu-icon-svg-17.jpg"} alt="menu-burger" className='menu-burger'  onClick={() => setMenuOpen(!menuOpen)}/>
                      <div className={menuOpen ? 'estate__header-mobile_links flex flex-col items-center justify-center flex-1 scale-up-center' : 'display-none estate__header-mobile_links scale-up-center'}>
                        <Link to='/' className='fs-18 pointer color-basic-text'>Home</Link>
                        <Link to='/about' className='fs-18 pointer color-basic-text'>About</Link>
                        {/* <Link to='./offers' className='fs-18 pointer color-basic-text'>Offers</Link> */}
                      </div>
                    </div>
                  {/* </Link> */}
                </div>
              </div>
            </div>
            
            <Profile openPopUp={openPopup} closePopUp={HandleRemovePopUp} />
        </div>
    </header>
  )
}

Header.propTypes = {
  homePage: PropTypes.bool.isRequired,
}