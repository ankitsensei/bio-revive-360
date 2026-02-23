import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Navbar from "../components/Navbar";

type Inputs = {
  age: number;
  heartRate: number;
  creatinine: number;
  altLiver: number;
  cognitiveScore: number;
  glucose: number;
  muscleStrength: number;
  hormoneIndex: number;
};

type OrganAges = {
  heart: number;
  kidney: number;
  liver: number;
  brain: number;
  metabolic: number;
  muscle: number;
  hormone: number;
  overall: number;
};

const OrganBiologicalAge = () => {
  const [organAges, setOrganAges] = useState<OrganAges | null>(null);
  const [chronologicalAge, setChronologicalAge] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" });

  const calculateOrganAges = (data: Inputs) => {
    setChronologicalAge(data.age);

    const ideal = {
      heartRate: 70,
      creatinine: 1.0,
      altLiver: 25,
      cognitiveScore: 90,
      glucose: 90,
      muscleStrength: 40,
      hormoneIndex: 1.0,
    };

    const heartAge = Math.round(data.age + Math.abs((data.heartRate - ideal.heartRate) / ideal.heartRate) * 25);
    const kidneyAge = Math.round(data.age + Math.abs((data.creatinine - ideal.creatinine) / ideal.creatinine) * 20);
    const liverAge = Math.round(data.age + Math.abs((data.altLiver - ideal.altLiver) / ideal.altLiver) * 15);
    const brainAge = Math.round(data.age + Math.abs((ideal.cognitiveScore - data.cognitiveScore) / ideal.cognitiveScore) * 25);
    const metabolicAge = Math.round(data.age + Math.abs((data.glucose - ideal.glucose) / ideal.glucose) * 20);
    const muscleAge = Math.round(data.age + Math.abs((ideal.muscleStrength - data.muscleStrength) / ideal.muscleStrength) * 18);
    const hormoneAge = Math.round(data.age + Math.abs((data.hormoneIndex - ideal.hormoneIndex) / ideal.hormoneIndex) * 18);

    const overall = Math.round(
      (heartAge + kidneyAge + liverAge + brainAge + metabolicAge + muscleAge + hormoneAge) / 7
    );

    setOrganAges({
      heart: heartAge,
      kidney: kidneyAge,
      liver: liverAge,
      brain: brainAge,
      metabolic: metabolicAge,
      muscle: muscleAge,
      hormone: hormoneAge,
      overall,
    });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => calculateOrganAges(data);

  const getAgeBarColor = (overall: number, chrono: number) => {
    const diff = overall - chrono;
    if (diff <= 0) return "#22c55e";
    if (diff <= 5) return "#eab308";
    if (diff <= 15) return "#f97316";
    return "#ef4444";
  };

  const getHealthMessage = (overall: number, chrono: number) => {
    const diff = overall - chrono;
    if (diff <= 0) return "Excellent! Your biological markers are strong.";
    if (diff <= 5) return "Good! Some markers could be optimized.";
    if (diff <= 15) return "Caution! Some markers are above ideal levels.";
    return "Alert! Your biological age is significantly higher than your chronological age.";
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F8FA]">
      <Navbar />
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-8 flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 mt-6">
          Enter your health parameters
        </h1>

        <div className="w-full md:w-125 max-w-4xl bg-white rounded-3xl shadow-xl p-5 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 md:grid-cols-2 gap-6">

            {/* Responsive Input Row Component */}
            {[
              ["age", "Age", 18, 120],
              ["heartRate", "Heart Rate (bpm)", 30, 220],
              ["creatinine", "Creatinine (mg/dL)", 0.1, 15],
              ["altLiver", "ALT Liver (U/L)", 5, 1000],
              ["cognitiveScore", "Cognitive Score (0–100)", 0, 100],
              ["glucose", "Glucose (mg/dL)", 20, 600],
              ["muscleStrength", "Muscle Strength (kg)", 1, 500],
              ["hormoneIndex", "Hormone Index", 0, 1000],
            ].map(([name, label, min, max]) => (
              <div key={name} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{label}</label>
                <input
                  type="number"
                  step="any"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  {...register(name as keyof Inputs, {
                    valueAsNumber: true,
                    required: `${label} is required.`,
                    min: { value: Number(min), message: `Minimum ${min}.` },
                    max: { value: Number(max), message: `Maximum ${max}.` },
                  })}
                />
                {errors[name as keyof Inputs] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[name as keyof Inputs]?.message as string}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="col-span-2 w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
            >
              Analyze Organ Age
            </button>
          </form>

          {/* RESULTS */}
          {organAges && (
            <div className="mt-12 space-y-8">

              {/* Overall Card */}
              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Overall Biological Age
                </h2>

                <div className="flex justify-between items-center mb-2 text-sm sm:text-base">
                  <span>Biological Age</span>
                  <span
                    className="font-bold text-xl sm:text-2xl"
                    style={{
                      color: getAgeBarColor(
                        organAges.overall,
                        chronologicalAge
                      ),
                    }}
                  >
                    {organAges.overall} years
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-3 sm:h-4 rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (organAges.overall / 100) * 100,
                        100
                      )}%`,
                      backgroundColor: getAgeBarColor(
                        organAges.overall,
                        chronologicalAge
                      ),
                    }}
                  />
                </div>

                <p className="text-center text-sm mt-3">
                  {getHealthMessage(
                    organAges.overall,
                    chronologicalAge
                  )}
                </p>
              </div>

              {/* Breakdown Grid */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-4">
                  Organ Breakdown
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm sm:text-base">
                  <div>❤️ Heart: {organAges.heart}</div>
                  <div>🧠 Brain: {organAges.brain}</div>
                  <div>🩺 Kidney: {organAges.kidney}</div>
                  <div>🧪 Liver: {organAges.liver}</div>
                  <div>🍬 Metabolic: {organAges.metabolic}</div>
                  <div>💪 Muscle: {organAges.muscle}</div>
                  <div>🧬 Hormone: {organAges.hormone}</div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganBiologicalAge;