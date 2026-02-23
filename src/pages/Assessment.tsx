import Navbar from "../components/Navbar"
import AssessmentComp from "../components/AssessmentComp"
const Assessment = () => {
  return (
    <div className="lg:px-40 lg:pt-10 pt-5 background h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-4 mt-24">
        <p className="font-semibold text-zinc-400">Assessments</p>
        <p className="text-5xl font-semibold">Check your <span className="textBackground">Organs's Age</span></p>
        <div className="flex gap-2 mt-10">
          <AssessmentComp heading="Organ Biological Age Detection System" para="It takes following parameters and tells biological age of organs:-" list={["Age", "Heart Rate", "Creatinine", "ALT Liver", "Cognitive Score ", "Glucose", "Muscle Strength", "Testosterone/Estrogen Index"]} />
          <AssessmentComp heading="Epigenetic Multi-Organ Biological Aging Simulation" para="It takes following parameters and tells biological age of organs:-" list={["Age", "Heart Rate", "Glucose", "Stress", "Screen Time", "Muscle Strength", "Sleep Hours"]} />
        </div>
      </div>
    </div>
  )
}

export default Assessment