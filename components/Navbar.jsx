"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Users, Image, Home, Menu, X, ContactIcon, Car, User, } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BASE_URL } from "@/apis/api";


const Navbar = () => {
  const location = usePathname()
  const desktop = location.includes("/admin")
  

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("guest@example.com");

  const userMenuRef = useRef(null);
  const router = useRouter()

  async function fetchUser() {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        credentials: "include",
      });
      // console.log(response)
      if (response.ok) {
        const data = await response.json();
        // Set user info if logged in
        setUserName(data.name);
        setUserEmail(data.email);
        setLoggedIn(true);
      } else if (response.status === 401) {
        // User not logged in
        setUserName("Guest User");
        setUserEmail("guest@example.com");
        setLoggedIn(false);
      } else {
        // Handle other error statuses if needed
        console.error("Error fetching user info:", response.status);
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUserIconClick = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logged out successfully");
        // Optionally reset local state
        setLoggedIn(false);
        setUserName("Guest User");
        setUserEmail("guest@example.com");
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // window.addEventListener("click",handleUserIconClick)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navigation = [
    [
      { name: 'Home', href: '/'},
      { name: 'About Us', href: '/about' },
      { name: "Your-Bookings", href: "/your-bookings" },
      { name: "Tour", href: "/tours"},
      { name: 'Contact', href: '/contact'},
    ],
    [
      { name: 'Bookings', href: '/admin', icon: Users },
      { name: 'Image Gallery', href: '/admin/gallery', icon: Image },
      { name: "Query", href: "/admin/query", icon: ContactIcon },
      { name: "Tour", href: "/admin/tour", icon: Car },
      { name: 'Home', href: '/', icon: Home },
    ]
  ];

  const isActive = (href) => location === href;

  return (
    <div className={`${desktop? 'bg-gray-50':''}`}>
      {/* Navigation */}
      <nav className={` p-5
        ${desktop ? "bg-white shadow-lg border-b border-gray-200":"fixed top-0 left-0 right-0 z-50  bg-transparent "}
        ${scrolled?"bg-white  backdrop-blur-sm shadow-sm p-3":""}
         `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{desktop ? "AP" :"HB"}</span>
                </div>
                <span className="ml-3 text-xl font-semibold text-gray-900">{desktop ? "Admin Panel":"Holiday Vibes"}</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:space-x-8">

                { desktop ? (
                <>
                  {navigation[1].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-blue-400 border-b-2 border-transparent'
                          }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    );
                  })}
                </>
                ) : (
                <>
                  {navigation[0].map((item) => {
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`inline-flex text-black  items-center px-1 pt-1 font-medium transition-colors duration-200 ${isActive(item.href)
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : ' hover:border-gray-300 border-b-2 border-transparent'
                          }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </>
                )}
                <div className="relative" ref={userMenuRef}>
                  <div
                    onClick={handleUserIconClick}
                    className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer">
                    {userName !== "Guest User" ? (<span className="text-blue-600 font-semibold text-sm">
                      {userName.toUpperCase().split(' ').map(n => n[0]).join('')}
                    </span>
                    ) : (
                      <User color="blue" />
                    )
                    }
                  </div>

                  {showUserMenu && (
                    <div className="absolute top-[50px] bg-gray-100 border-[1px] border-gray-400 rounded-[6px] shadow-sm z-50 min-w-[150px] md:right-0 px-2">
                      {loggedIn ? (
                        <>
                          {/* Display name & email if logged in */}
                          <div className="flex overflow-hidden gap-1 px-2 py-4 cursor-pointer text-gray-600 whitespace-nowrap flex-col">
                            <span className="font-bold text-gray-700">{userName}</span>
                            <span className="text-[14px] text-blue-400">{userEmail}</span>
                          </div>
                          <div className="border-t border-gray-500" />
                          <div
                            className="flex overflow-hidden gap-1 px-2 py-4 cursor-pointer text-gray-600 whitespace-nowrap login-btn"
                            onClick={handleLogout}
                          >
                            {/* <FaSignOutAlt className="menu-item-icon" /> */}
                            <div className=''></div>
                            <span>Logout</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Show Login if not logged in */}
                          <div
                            className="flex overflow-hidden gap-1 px-2 py-4  text-gray-600 whitespace-nowrap  login-btn cursor-pointer"
                            onClick={() => {
                              router.push("/login");
                              setShowUserMenu(false);
                            }}
                          >
                            <div className='menu-item-icon'></div>
                            <span>Login</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-5">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition duration-150 ease-in-out"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <div className="relative" ref={userMenuRef}>
                <div
                  onClick={handleUserIconClick}
                  className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer">
                  {userName !== "Guest User" ? (<span className="text-blue-600 font-semibold text-sm">
                    {userName.toUpperCase().split(' ').map(n => n[0]).join('')}
                  </span>
                  ) : (
                    <User color="blue" />
                  )
                  }
                </div>

                {showUserMenu && (
                  <div className="absolute top-[50px] right-0 bg-gray-100 border-[1px] border-gray-400 rounded-[6px] shadow-sm z-50 min-w-[150px] md:right-0 px-2">
                    {loggedIn ? (
                      <>
                        {/* Display name & email if logged in */}
                        <div className="flex overflow-hidden gap-1 px-2 py-4 cursor-pointer text-gray-600 whitespace-nowrap flex-col">
                          <span className="font-bold text-gray-700">{userName}</span>
                          <span className="text-[14px] text-blue-400">{userEmail}</span>
                        </div>
                        <div className="border-t border-gray-500" />
                        <div
                          className="flex overflow-hidden gap-1 px-2 py-4 cursor-pointer text-gray-600 whitespace-nowrap login-btn"
                          onClick={handleLogout}
                        >
                          {/* <FaSignOutAlt className="menu-item-icon" /> */}
                          <div className=''></div>
                          <span>Logout</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Show Login if not logged in */}
                        <div
                          className="flex overflow-hidden gap-1 px-2 py-4  text-gray-600 whitespace-nowrap  login-btn cursor-pointer"
                          onClick={() => {
                            router.push("/login");
                            setShowUserMenu(false);
                          }}
                        >
                          <div className='menu-item-icon'></div>
                          <span>Login</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className=" my-1 flex flex-col px-2 py-2  space-y-1 sm:px-3 bg-white border-t border-gray-200 hover:bg-blue-400 hover:text-white">
               { desktop ? (
                <>
                  {navigation[1].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`inline-flex items-center px-2 rounded-sm py-1 text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                          ? 'bg-blue-400 text-white '
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                          }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    );
                  })}
                </>
                ) : (
                <>
                  {navigation[0].map((item) => {
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`m-1 inline-flex text-black  items-center px-2 rounded-sm pt-1 font-medium transition-colors duration-200 ${isActive(item.href)
                          ? 'bg-blue-400 text-white '
                          : ' hover:border-gray-300 border-b-2 border-transparent'
                          }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </>
                )}

            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
