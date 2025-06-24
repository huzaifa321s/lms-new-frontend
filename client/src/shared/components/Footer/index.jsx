import { Link } from 'react-router-dom';
import { footerLink1, footerLink2, footerSocial } from '../data/data';
import logo from '../../../assets/images/logo-light.png';
import app from '../../../assets/images/app.png';
import play from '../../../assets/images/play.png';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-900 dark:bg-slate-800 p-10 flex justify-center items-center">
            <div className="container relative">
                <div className="grid grid-cols-1">
                    <div className="relative py-16">
                        <div className="relative w-full">
                            <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                                
                                {/* First Column */}
                                <div className="lg:col-span-4 md:col-span-12">
                                    <Link to="#" className="text-[22px] focus:outline-none">
                                        <img src={logo} alt="Logo" />
                                    </Link>
                                    <p className="mt-6 text-gray-300">
                                        Discover a world of knowledge and opportunities with our online education platform pursue a new career.
                                    </p>

                                    <div className="flex mt-6">
                                        <i className="iconoir-map-pin align-middle text-2xl text-violet-600 me-2"></i>
                                        <div>
                                            <h6 className="text-gray-300">C/54 Northwest Freeway, <br /> Houston, USA 485</h6>
                                        </div>
                                    </div>

                                    <div className="flex mt-4">
                                        <i className="iconoir-phone align-middle text-2xl text-violet-600 me-2"></i>
                                        <div>
                                            <Link to="tel:+152534-468-854" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                                                +152 534-468-854
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Column */}
                                <div className="lg:col-span-2 md:col-span-3">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold text-lg">Usefull Links</h5>
                                    <ul className="list-none footer-list mt-6">
                                        {footerLink1.map((item, index) => (
                                            <li key={index} className="mt-[10px] first:mt-0">
                                                <i className="iconoir-nav-arrow-right text-gray-400 align-middle me-1"></i>
                                                <Link to="#" onClick={(e) => e.preventDefault()} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Third Column */}
                                <div className="lg:col-span-2 md:col-span-3">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold text-lg">Our Institute</h5>
                                    <ul className="list-none footer-list mt-6">
                                        {footerLink2.map((item, index) => (
                                            <li key={index} className="mt-[10px] first:mt-0">
                                                <i className="iconoir-nav-arrow-right text-gray-400 align-middle me-1"></i>
                                                <Link to="#" onClick={(e) => e.preventDefault()} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Fourth Column */}
                                <div className="lg:col-span-4 md:col-span-6">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold text-lg">Get In Touch</h5>
                                    <div className="mt-6">
                                        <Link to="#" onClick={(e) => e.preventDefault()}>
                                            <img src={app} className="h-12 inline-block mb-1" alt="App Store" />
                                        </Link>
                                        <Link to="#" onClick={(e) => e.preventDefault()}>
                                            <img src={play} className="h-12 inline-block mb-1" alt="Play Store" />
                                        </Link>
                                    </div>
                                    <ul className="list-none mt-4">
                                        {footerSocial.map((item, index) => (
                                            <li key={index} className="inline mx-[2px]">
                                                <a href={item.link} aria-label="btn" target="_blank" rel="noopener noreferrer" className="size-7 inline-flex justify-center items-center text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-violet-600 dark:hover:border-violet-600 hover:bg-violet-600 dark:hover:bg-violet-600">
                                                    <i className={item.icon}></i>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700 flex">
                <div className="container relative text-center">
                    <div className="grid md:grid-cols-2 items-center gap-6">
                        <div className="md:text-start text-center">
                            <p className="mb-0 text-gray-300">
                                © {year} Edupath. Design & Develop with <i className="mdi mdi-heart text-red-600"></i> by <a href="https://shreethemes.in/" target="_blank" rel="noopener noreferrer" className="text-reset">Shreethemes</a>.
                            </p>
                        </div>

                        <ul className="list-disc footer-list md:text-end text-center space-x-3">
                            <li className="inline-block">
                                <i className="mdi mdi-circle-medium text-gray-400"></i>
                                <Link to="/terms" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">Terms</Link>
                            </li>
                            <li className="inline-block mt-[10px] md:mt-0">
                                <i className="mdi mdi-circle-medium text-gray-400"></i>
                                <Link to="/privacy" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">Privacy</Link>
                            </li>
                            <li className="inline-block mt-[10px] md:mt-0">
                                <i className="mdi mdi-circle-medium text-gray-400"></i>
                                <Link to="/login" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
