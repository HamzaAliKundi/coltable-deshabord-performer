import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-[#1D1D1D] text-white py-10 px-8 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Address Section */}
          <div className="">
            <img
              src="/footer/footer-logo.png"
              alt="DragSpace Logo"
              width={309}
              height={70}
            />
            <div className="mt-6 md:mt-[90px] text-[15px] font-spaceGrotesk space-y-1">
            <p className="flex items-center gap-1 lg:whitespace-nowrap">
              <img src="/footer/location.png" />
              2000 West Loop S, Suite 2200 <br />
              Houston, TX 77027
            </p>
              <p className="flex items-center gap-2">
                <img src="/footer/email.png" />
                info@dragspace.com
              </p>
              <p className="flex items-center gap-2">
                <img src="/footer/phone.png" />1 (844) 713-DRAG (3724)
              </p>
            </div>
            <h3 className="mt-12 text-[24px] font-bold capitalize">
            Check Out Our Socials!
          </h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=61574105501530" target="_blank" rel="noopener noreferrer">
              <img
                src="/footer/facebook.png"
                alt="Facebook"
                className="w-[9.98px] h-[27px] cursor-pointer"
              />
            </a>
            <a href="https://x.com/Yourdragspace" target="_blank" rel="noopener noreferrer">
              <img
                src="/footer/twitter.png"
                alt="Twitter"
                className="w-[18.61px] h-[27px] cursor-pointer"
              />
            </a>
            <a href="https://www.instagram.com/officialdragspace" target="_blank" rel="noopener noreferrer">
              <img
                src="/footer/instagram.png"
                alt="Instagram"
                className="w-[16.36px] h-[27px] cursor-pointer"
              />
            </a>
          </div>
          </div>
  
          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold">Useful Links</h3>
            <ul className="mt-4 space-y-2 text-[15px] font-spaceGrotesk">
              <li className="flex flex-col">
                <div className="flex items-center gap-4 cursor-pointer text-[#878787]">
                  <img src="/footer/arrow.png" alt="arrow" /> Home
                </div>
                <div className="w-[310px] border-b border-[#878787] mt-2"></div>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-4 cursor-pointer text-[#878787]">
                  <img src="/footer/arrow.png" alt="arrow" /> Performers
                </div>
                <div className="w-[310px] border-b border-[#878787] mt-2"></div>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-4 cursor-pointer text-[#878787]">
                  <img src="/footer/arrow.png" alt="arrow" /> Venues
                </div>
                <div className="w-[310px] border-b border-[#878787] mt-2"></div>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-4 cursor-pointer text-[#878787]">
                  <img src="/footer/arrow.png" alt="arrow" /> Events
                </div>
                <div className="w-[310px] border-b border-[#878787] mt-2"></div>
              </li>
              <li className="flex flex-col">
                <div className="flex items-center gap-4 cursor-pointer text-[#878787]">
                  <img src="/footer/arrow.png" alt="arrow" /> FAQ's
                </div>
                <div className="w-[310px] border-b border-[#878787] mt-2"></div>
              </li>
            </ul>
          </div>
  
          {/* Instagram Section */}
          <div>
            <h3 className="text-xl font-bold">Instagram</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <img
                src="/footer/insta1.png"
                width={110}
                height={103}
                alt="Instagram 1"
              />
              <img
                src="/footer/insta2.png"
                width={110}
                height={103}
                alt="Instagram 2"
              />
              <img
                src="/footer/insta3.png"
                width={110}
                height={103}
                alt="Instagram 3"
              />
              <img
                src="/footer/insta4.png"
                width={110}
                height={103}
                alt="Instagram 4"
              />
              <img
                src="/footer/insta5.png"
                width={110}
                height={103}
                alt="Instagram 5"
              />
              <img
                src="/footer/insta6.png"
                width={110}
                height={103}
                alt="Instagram 6"
              />
            </div>
            <p className="mt-4 text-sm">Follow Our Instagram</p>
          </div>
        </div>
        <div className="mt-8 py-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
            <span className="text-sm">DragSpace, LLC</span>
            <span className="text-sm">|</span>
            <Link to="/privacy" className="text-sm hover:text-[#FF00A2] underline">Privacy Policy</Link>
            <span className="text-sm">|</span>
            <Link to="/terms" className="text-sm hover:text-[#FF00A2] underline">Terms And Conditions</Link>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  