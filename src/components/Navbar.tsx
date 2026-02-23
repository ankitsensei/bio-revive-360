import { useState, useEffect } from "react"
import { NavLink } from "react-router";
import MainLogo from "../assets/bioRevive360.png"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  return (
    <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-0 relative z-50">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <NavLink className="flex items-center gap-3"
          to="/"
        >
          <img src={MainLogo} alt="logo" className="w-10 sm:w-12 rounded-full" />
          <span className="font-semibold text-lg sm:text-xl">
            Bio Revive 360
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-12 font-medium">
          <NavLink
            to="/Assessment"
          >
            Assessment
          </NavLink>
          <NavLink
            to="/Modules"
          >
            Modules
          </NavLink>
          <NavLink
            to="/Lifestyle"
          >
            Lifestyle
          </NavLink>
          <NavLink
            to="/Vision"
          >
            Visions
          </NavLink>
        </ul>

        {/* Desktop Button */}
        <button className="hidden md:block rounded-full bg-black text-white px-5 py-2 hover:scale-105 transition">
          Get Started
        </button>

        {/* Mobile Icon */}
        <div
          className="md:hidden text-2xl cursor-pointer z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white flex flex-col justify-center items-center gap-10 
        transform transition-all duration-500 ease-in-out
        ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        md:hidden`}
      >

        <ul className="flex flex-col items-center gap-8 text-2xl font-semibold">
          <li className="cursor-pointer hover:text-gray-500 transition">Assessment</li>
          <li className="cursor-pointer hover:text-gray-500 transition">Modules</li>
          <li className="cursor-pointer hover:text-gray-500 transition">Lifestyle</li>
          <li className="cursor-pointer hover:text-gray-500 transition">Vision</li>
        </ul>

        <button className="mt-6 rounded-full bg-black text-white px-8 py-3 text-lg hover:scale-105 transition">
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default Navbar