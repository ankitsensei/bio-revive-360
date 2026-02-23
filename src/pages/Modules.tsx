import Navbar from "../components/Navbar"
import ModuleFloating from "../assets/modulesFloating.jpeg"
const Modules = () => {
  return (
    <div className="lg:px-40 lg:pt-10 pt-5 background h-full">
      <Navbar />
      <div className="w-full h-screen">
        <p>Core Biological Aging Modules</p>
        <p>Bio-Revive 360° analyzes organ-level biological age using multi-parameter models combining physiological, metabolic, and lifestyle signals.</p>
        <img src={ModuleFloating} alt="moduleFloating" className="rounded-4xl shadow-2xl shadow-zinc-700" />
      </div>
      <div className="w-full h-screen ">
        <h1 className="text-4xl font-semibold text-center">Modules</h1>
        <p>❤️ Cardiovascular Aging Module</p>
        <div>
          <p>What it Measures</p>
          <ul>
            <li>HRV</li>
            <li>Resting heart rate</li>
            <li>Blood pressure variability</li>
          </ul>
        </div>
        <div>
          <p>Why It Ages Faster</p>
        </div>
        <div>
          <p>Correction Strategy</p>
        </div>
      </div>
    </div>
  )
}

export default Modules