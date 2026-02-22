import MainLogo from "../assets/bioRevive360.png"

const Navbar = () => {
  return (
    <div className='flex justify-between items-center'>
      <p className="flex justify-center items-center gap-4"><img src={MainLogo} alt="logo" className="w-12" />Bio Revive 360</p>
      <ul className="flex gap-12">
        <li>Produce</li>
        <li>Services</li>
        <li>Activity</li>
        <li>Support</li>
      </ul>
      <button className="rounded-full bg-black text-white px-5 py-2">Get Started</button>
    </div>
  )
}

export default Navbar