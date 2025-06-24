import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import feather from 'feather-icons';

import logoDark from '../../../assets/images/logo-dark.png';
import logoLight from '../../../assets/images/logo-light.png';
import user from '../../../assets/images/team/1.jpg';
import demo1 from '../../../assets/images/demos/1.png';
import demo2 from '../../../assets/images/demos/2.png';
import demo3 from '../../../assets/images/demos/3.png';
import demo4 from '../../../assets/images/demos/4.png';
import demo5 from '../../../assets/images/demos/5.png';

const Navbar = ({ navLight, tagLine }) => {
  const location = useLocation();
  const current = location.pathname;

  const [toggle, setToggle] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [cart, setCart] = useState(false);
  const [userAccount, setUserAccount] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [openMenu, setOpenMenu] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    feather.replace();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const submenu = (item) => {
    setOpenMenu((prev) => (prev === item ? '' : item));
  };

  const isActive = (paths) => paths.includes(current) ? 'active' : '';

  return (
    <nav id="topnav" className={`defaultscroll is-sticky ${scroll ? 'nav-sticky' : ''} ${tagLine ? 'tagline-height' : ''}`}>
      <div className="container relative">
        <Link className="logo" to="/">
          {navLight ? (
            <span className="inline-block dark:hidden">
              <img src={logoDark} height="24" alt="" className="l-dark" />
              <img src={logoLight} height="24" alt="" className="l-light" />
            </span>
          ) : (
            <>
              <img src={logoDark} alt="" className="inline-block dark:hidden" />
              <img src={logoLight} alt="" className="hidden dark:inline-block" />
            </>
          )}
        </Link>

        <div className="menu-extras">
          <div className="menu-item">
            <button
              className={`navbar-toggle ${toggle ? 'open' : ''}`}
              onClick={() => setToggle(!toggle)}
              aria-label="toggle"
            >
              <div className="lines">
                <span></span><span></span><span></span>
              </div>
            </button>
          </div>
        </div>

        <ul className="buy-button list-none mb-0">
          {/* Search Button */}
          <li className="inline-block relative">
            <button className="text-[20px]" onClick={() => setSearchMenu(!searchMenu)} type="button" aria-label="search">
              <i className={`iconoir-search ${navLight ? 'align-middle login-btn-primary' : 'align-middle'}`}></i>
              {navLight && <i className="iconoir-search text-white align-middle login-btn-light"></i>}
            </button>
            <div className={`fixed w-full h-[100vh] top-0 left-0 flex justify-center ${searchMenu ? '' : 'hidden'}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-11/12 max-w-5xl mt-20 fixed">
                <div className="relative w-full h-auto">
                  <form method="dialog">
                    <button className="size-5 absolute top-0 end-0" onClick={() => setSearchMenu(false)} aria-label="close">
                      <i data-feather="x" className="size-4"></i>
                    </button>
                  </form>
                  <div className="p-6 text-center">
                    <form className="relative">
                      <i className="iconoir-search text-lg absolute top-2.5 end-0"></i>
                      <input type="text" className="w-full py-2 px-3 bg-transparent focus:outline-none rounded-md pe-6 h-10" placeholder="Search..." />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </li>

          {/* Cart */}
          <li className="dropdown inline-block relative mx-1">
            <button className="size-8 bg-violet-600 text-white rounded-full" onClick={() => setCart(!cart)} aria-label="cart">
              <i data-feather="shopping-cart" className="size-4"></i>
            </button>
            <div className={`dropdown-menu absolute end-0 mt-4 w-60 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 ${cart ? '' : 'hidden'}`}>
              <ul className="py-3 text-start">
                <li className="px-3">Your shopping cart is empty.</li>
              </ul>
            </div>
          </li>

          {/* User Menu */}
          <li className="dropdown inline-block relative">
            <button className="dropdown-toggle" onClick={() => setUserAccount(!userAccount)}>
              <span className="size-8 inline-flex items-center justify-center bg-violet-600 text-white rounded-full">
                <img src={user} className="rounded-full size-[30px]" alt="User" />
              </span>
            </button>
            <div className={`dropdown-menu absolute end-0 mt-4 w-44 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md overflow-hidden ${userAccount ? '' : 'hidden'}`}>
              <ul className="py-2 text-start">
                <li><a href="#!" className="flex items-center py-2 px-4"><i data-feather="user" className="size-4 me-2"></i>Profile</a></li>
                <li><a href="#!" className="flex items-center py-2 px-4"><i data-feather="settings" className="size-4 me-2"></i>Settings</a></li>
                <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                <li><a href="#!" className="flex items-center py-2 px-4"><i data-feather="lock" className="size-4 me-2"></i>Lockscreen</a></li>
                <li><a href="#!" className="flex items-center py-2 px-4"><i data-feather="log-out" className="size-4 me-2"></i>Logout</a></li>
              </ul>
            </div>
          </li>
        </ul>

        {/* Mobile navigation */}
        <div id="navigation" className={`${toggle ? 'block' : 'hidden'}`}>
          <ul className={`navigation-menu justify-start ${navLight ? 'nav-light' : ''}`}>
            <li className={`has-submenu parent-parent-menu-item ${isActive(['/', '/index-two', '/index-three', '/index-four', '/index-five'])}`}>
              <a href="#!" onClick={() => submenu('/home-item')}>Home</a><span className="menu-arrow"></span>
              <ul className={`submenu megamenu ${openMenu === '/home-item' ? 'open' : ''}`}>
                {[['/', demo1, 'Hero One'], ['/index-two', demo2, 'Hero Two'], ['/index-three', demo3, 'Hero Three'], ['/index-four', demo4, 'Hero Four'], ['/index-five', demo5, 'Hero Five']].map(([path, img, label]) => (
                  <li key={path}>
                    <Link to={path} className="sub-menu-item">
                      <div className="text-center">
                        <img src={img} alt={label} className="img-fluid rounded shadow-md hidden min-[992px]:block" />
                        <span className="mt-2 block">{label}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* More menu items like Courses, Pages, Contact Us, etc. would follow here */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
