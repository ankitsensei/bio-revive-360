import Navbar from '../components/Navbar'
import { FaArrowCircleRight } from "react-icons/fa";


const Hero = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <div className='flex flex-col gap-8 justify-center text-center w-full h-3/4'>
        <div className='w-full text-center text-2xl lg:text-6xl font-semibold'>
          <h2>Transform <span className="textBackground">Healthcare</span> Efficiency</h2>
          <h2>with Cutting-Edge Technology</h2>
        </div>
        <p className='text-gray-500'>Manage patients, staff, finances, and more with our comprehensive, user-friendly system.</p>
        <div className='flex gap-2 justify-center'>
          <button className='flex justify-between items-center gap-2 rounded-full bg-black text-white px-2 py-2'>
            <p className='ps-2'>Get Started</p><FaArrowCircleRight className='text-4xl' />
          </button>
        </div>
      </div>
    </div >
  )
}

export default Hero