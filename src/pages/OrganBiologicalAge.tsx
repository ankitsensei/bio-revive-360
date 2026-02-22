import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

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

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ mode: "onBlur" });

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

    const heartDev = Math.abs((data.heartRate - ideal.heartRate) / ideal.heartRate);
    const kidneyDev = Math.abs((data.creatinine - ideal.creatinine) / ideal.creatinine);
    const liverDev = Math.abs((data.altLiver - ideal.altLiver) / ideal.altLiver);
    const brainDev = Math.abs((ideal.cognitiveScore - data.cognitiveScore) / ideal.cognitiveScore);
    const metabolicDev = Math.abs((data.glucose - ideal.glucose) / ideal.glucose);
    const muscleDev = Math.abs((ideal.muscleStrength - data.muscleStrength) / ideal.muscleStrength);
    const hormoneDev = Math.abs((data.hormoneIndex - ideal.hormoneIndex) / ideal.hormoneIndex);

    const heartAge = Math.round(data.age + heartDev * 25);
    const kidneyAge = Math.round(data.age + kidneyDev * 20);
    const liverAge = Math.round(data.age + liverDev * 15);
    const brainAge = Math.round(data.age + brainDev * 25);
    const metabolicAge = Math.round(data.age + metabolicDev * 20);
    const muscleAge = Math.round(data.age + muscleDev * 18);
    const hormoneAge = Math.round(data.age + hormoneDev * 18);

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
    if (diff <= 0) return "#22c55e"; // green → excellent
    if (diff <= 5) return "#eab308"; // yellow → good
    if (diff <= 15) return "#f97316"; // orange → caution
    return "#ef4444"; // red → alert
  };

  const getHealthMessage = (overall: number, chrono: number) => {
    const diff = overall - chrono;
    if (diff <= 0) return "✅ Excellent! Your biological markers are strong.";
    if (diff <= 5) return "👍 Good! Some markers could be optimized.";
    if (diff <= 15) return "⚠️ Caution! Some markers are above ideal levels.";
    return "🚨 Alert! Your biological age is significantly higher than your chronological age.";
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F7F8FA] p-6">
      <p className="text-3xl font-semibold mb-6">Enter your health parameters</p>

      <div className="w-125 max-w-3xl bg-white p-8 shadow-2xl rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Age & Heart Rate */}
          <div className="flex gap-6">
            <div className="flex flex-col w-full">
              <label>Age</label>
              <input
                type="number"
                defaultValue={20}
                className="inputField"
                {...register("age", {
                  valueAsNumber: true,
                  required: "Age is required.",
                  min: { value: 18, message: "Age must be at least 18 years." },
                  max: { value: 120, message: "Age cannot exceed 120 years." },
                })}
              />
              {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
            </div>

            <div className="flex flex-col w-full">
              <label>Heart Rate (bpm)</label>
              <input
                type="number"
                className="inputField"
                {...register("heartRate", {
                  valueAsNumber: true,
                  required: "Heart rate is required.",
                  min: { value: 30, message: "Minimum 30 bpm." },
                  max: { value: 220, message: "Maximum 220 bpm." },
                })}
              />
              {errors.heartRate && <p className="text-sm text-red-500">{errors.heartRate.message}</p>}
            </div>
          </div>

          {/* Creatinine & ALT */}
          <div className="flex gap-6">
            <div className="flex flex-col w-full">
              <label>Creatinine (mg/dL)</label>
              <input
                type="number"
                step="0.01"
                className="inputField"
                {...register("creatinine", {
                  valueAsNumber: true,
                  required: "Creatinine level is required.",
                  min: { value: 0.1, message: "Minimum 0.1 mg/dL." },
                  max: { value: 15, message: "Maximum 15 mg/dL." },
                })}
              />
              {errors.creatinine && <p className="text-sm text-red-500">{errors.creatinine.message}</p>}
            </div>

            <div className="flex flex-col w-full">
              <label>ALT Liver (U/L)</label>
              <input
                type="number"
                className="inputField"
                {...register("altLiver", {
                  valueAsNumber: true,
                  required: "ALT level is required.",
                  min: { value: 5, message: "Minimum 5 U/L." },
                  max: { value: 1000, message: "Maximum 1000 U/L." },
                })}
              />
              {errors.altLiver && <p className="text-sm text-red-500">{errors.altLiver.message}</p>}
            </div>
          </div>

          {/* Cognitive & Glucose */}
          <div className="flex gap-6">
            <div className="flex flex-col w-full">
              <label>Cognitive Score (0–100)</label>
              <input
                type="number"
                className="inputField"
                {...register("cognitiveScore", {
                  valueAsNumber: true,
                  required: "Cognitive score is required.",
                  min: { value: 0, message: "Cannot be negative." },
                  max: { value: 100, message: "Cannot exceed 100." },
                })}
              />
              {errors.cognitiveScore && <p className="text-sm text-red-500">{errors.cognitiveScore.message}</p>}
            </div>

            <div className="flex flex-col w-full">
              <label>Glucose (mg/dL)</label>
              <input
                type="number"
                className="inputField"
                {...register("glucose", {
                  valueAsNumber: true,
                  required: "Glucose level is required.",
                  min: { value: 20, message: "Minimum 20 mg/dL." },
                  max: { value: 600, message: "Maximum 600 mg/dL." },
                })}
              />
              {errors.glucose && <p className="text-sm text-red-500">{errors.glucose.message}</p>}
            </div>
          </div>

          {/* Muscle & Hormone */}
          <div className="flex gap-6">
            <div className="flex flex-col w-full">
              <label>Muscle Strength (kg)</label>
              <input
                type="number"
                className="inputField"
                {...register("muscleStrength", {
                  valueAsNumber: true,
                  required: "Muscle strength is required.",
                  min: { value: 1, message: "Minimum 1 kg." },
                  max: { value: 500, message: "Maximum 500 kg." },
                })}
              />
              {errors.muscleStrength && <p className="text-sm text-red-500">{errors.muscleStrength.message}</p>}
            </div>

            <div className="flex flex-col w-full">
              <label>Hormone Index</label>
              <input
                type="number"
                step="0.01"
                className="inputField"
                {...register("hormoneIndex", {
                  valueAsNumber: true,
                  required: "Hormone index is required.",
                  min: { value: 0, message: "Cannot be negative." },
                  max: { value: 1000, message: "Value too high." },
                })}
              />
              {errors.hormoneIndex && <p className="text-sm text-red-500">{errors.hormoneIndex.message}</p>}
            </div>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Analyze Organ Age
          </button>
        </form>

        {/* RESULT SECTION */}
        {organAges && (
          <div className="mt-12 space-y-10">

            {/* Overall Age Bar */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Overall Biological Age</h2>

              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Biological Age</span>
                <span
                  className="font-bold text-2xl"
                  style={{ color: getAgeBarColor(organAges.overall, chronologicalAge) }}
                >
                  {organAges.overall} years
                </span>
              </div>

              {/* Age Bar */}
              <div className="w-full bg-gray-200 h-4 rounded-full mb-2">
                <div
                  className="h-4 rounded-full transition-all"
                  style={{
                    width: `${Math.min((organAges.overall / 100) * 100, 100)}%`,
                    backgroundColor: getAgeBarColor(organAges.overall, chronologicalAge),
                  }}
                />
              </div>

              {/* Dynamic Message */}
              <div className="text-center text-gray-700 text-sm mt-2">
                {getHealthMessage(organAges.overall, chronologicalAge)}
              </div>
            </div>

            {/* Organ Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Organ Breakdown</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
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
  );
};

export default OrganBiologicalAge;
