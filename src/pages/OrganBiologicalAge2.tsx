import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Navbar from "../components/Navbar";

type Inputs = {
  age: number;
  heartRate: number;
  glucose: number;
  stress: number;
  screenTime: number;
  muscleStrength: number;
  sleepHours: number;
};

type Results = {
  heart: number;
  brain: number;
  kidney: number;
  liver: number;
  pancreas: number;
  muscle: number;
  hormonal: number;
  overall: number;
  status: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

// const normalize = (value: number, ideal: number, tolerance: number) => {
//   return clamp(Math.abs(value - ideal) / tolerance, 0, 1);
// };

export default function OrganBiologicalAge2() {
  const [results, setResults] = useState<Results | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const ideal = {
      heartRate: 65,
      glucose: 85,
      stress: 2,
      screenTime: 2,
      muscleStrength: 45,
      sleep: 8,
    };

    const tolerance = {
      heartRate: 30,
      glucose: 60,
      stress: 8,
      screenTime: 10,
      muscleStrength: 40,
      sleep: 4,
    };

    const deviation = (value: number, ideal: number, tol: number) => {
      return clamp((value - ideal) / tol, -1.2, 1.2);
    };

    // Non-linear biological curve
    const bioCurve = (d: number) => {
      if (d > 0) return Math.pow(d, 2);        // bad aging accelerates fast
      return -Math.pow(Math.abs(d), 1.3);      // improvement is slower
    };

    const MAX_SHIFT = 25;

    // --- Organ specific logic ---

    const heartScore =
      bioCurve(deviation(data.heartRate, ideal.heartRate, tolerance.heartRate)) +
      bioCurve(deviation(data.stress, ideal.stress, tolerance.stress)) * 0.6;

    const brainScore =
      bioCurve(deviation(data.screenTime, ideal.screenTime, tolerance.screenTime)) +
      bioCurve(deviation(ideal.sleep - data.sleepHours, 0, tolerance.sleep));

    const kidneyScore =
      bioCurve(deviation(data.glucose, ideal.glucose, tolerance.glucose)) * 0.8 +
      bioCurve(deviation(data.stress, ideal.stress, tolerance.stress)) * 0.3;

    const liverScore =
      bioCurve(deviation(data.glucose, ideal.glucose, tolerance.glucose)) * 0.7 +
      bioCurve(deviation(data.screenTime, ideal.screenTime, tolerance.screenTime)) * 0.2;

    const pancreasScore =
      bioCurve(deviation(data.glucose, ideal.glucose, tolerance.glucose));

    const muscleScore =
      bioCurve(deviation(ideal.muscleStrength - data.muscleStrength, 0, tolerance.muscleStrength));

    const hormonalScore =
      bioCurve(deviation(data.sleepHours, ideal.sleep, tolerance.sleep)) +
      bioCurve(deviation(data.stress, ideal.stress, tolerance.stress)) * 0.7;

    const applyShift = (score: number) =>
      +(data.age + clamp(score, -1, 1) * MAX_SHIFT).toFixed(1);

    const heartAge = applyShift(heartScore);
    const brainAge = applyShift(brainScore);
    const kidneyAge = applyShift(kidneyScore);
    const liverAge = applyShift(liverScore);
    const pancreasAge = applyShift(pancreasScore);
    const muscleAge = applyShift(muscleScore);
    const hormonalAge = applyShift(hormonalScore);

    const overall = +(
      (heartAge +
        brainAge +
        kidneyAge +
        liverAge +
        pancreasAge +
        muscleAge +
        hormonalAge) / 7
    ).toFixed(1);

    const diff = overall - data.age;

    let status = "";
    if (diff <= -4) status = "Biologically Younger";
    else if (diff <= 3) status = "Optimal Aging";
    else if (diff <= 8) status = "Mild Acceleration";
    else if (diff <= 15) status = "Moderate Acceleration";
    else status = "⚠ Severe Accelerated Aging";

    setResults({
      heart: heartAge,
      brain: brainAge,
      kidney: kidneyAge,
      liver: liverAge,
      pancreas: pancreasAge,
      muscle: muscleAge,
      hormonal: hormonalAge,
      overall,
      status,
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F7F8FA] lg:px-40 lg:pt-10 pb-20 pt-5 background">
      <Navbar />
      <div>


        <h1 className="text-3xl font-semibold mb-6 mt-20 text-center">Lifestyle Biological Age Analyzer</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-10 rounded-4xl shadow-xl w-full max-w-3xl space-y-6"
        >

          {/* Age + Heart Rate */}
          <div className="flex gap-6">
            <div className="flex flex-col w-full">
              <label className="font-medium">Age</label>
              <input
                type="number"
                className="inputField"
                {...register("age", {
                  valueAsNumber: true,
                  required: "Age is required.",
                  min: { value: 18, message: "Minimum age is 18." },
                  max: { value: 120, message: "Maximum age is 120." },
                })}
              />
              {errors.age && (
                <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="font-medium">Heart Rate (bpm)</label>
              <input
                type="number"
                className="inputField"
                {...register("heartRate", {
                  valueAsNumber: true,
                  required: "Heart rate is required.",
                  min: { value: 40, message: "Too low. Minimum 40 bpm." },
                  max: { value: 200, message: "Too high. Maximum 200 bpm." },
                })}
              />
              {errors.heartRate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.heartRate.message}
                </p>
              )}
            </div>
          </div>

          {/* Glucose + Stress */}
          <div className="flex gap-6">
            <div className="flex flex-col w-full">
              <label className="font-medium">Glucose (mg/dL)</label>
              <input
                type="number"
                className="inputField"
                {...register("glucose", {
                  valueAsNumber: true,
                  required: "Glucose level is required.",
                  min: { value: 50, message: "Too low. Minimum 50 mg/dL." },
                  max: { value: 400, message: "Too high. Maximum 400 mg/dL." },
                })}
              />
              {errors.glucose && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.glucose.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="font-medium">Stress Level (0–10)</label>
              <input
                type="number"
                className="inputField"
                {...register("stress", {
                  valueAsNumber: true,
                  required: "Stress level is required.",
                  min: { value: 0, message: "Cannot be negative." },
                  max: { value: 10, message: "Maximum stress level is 10." },
                })}
              />
              {errors.stress && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.stress.message}
                </p>
              )}
            </div>
          </div>

          {/* Screen Time + Muscle */}
          <div className="flex gap-6">
            <div className="flex flex-col w-full">
              <label className="font-medium">Screen Time (hrs/day)</label>
              <input
                type="number"
                className="inputField"
                {...register("screenTime", {
                  valueAsNumber: true,
                  required: "Screen time is required.",
                  min: { value: 0, message: "Cannot be negative." },
                  max: { value: 24, message: "Cannot exceed 24 hours." },
                })}
              />
              {errors.screenTime && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.screenTime.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="font-medium">Muscle Strength (kg)</label>
              <input
                type="number"
                className="inputField"
                {...register("muscleStrength", {
                  valueAsNumber: true,
                  required: "Muscle strength is required.",
                  min: { value: 1, message: "Must be at least 1 kg." },
                  max: { value: 300, message: "Maximum allowed is 300 kg." },
                })}
              />
              {errors.muscleStrength && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.muscleStrength.message}
                </p>
              )}
            </div>
          </div>

          {/* Sleep */}
          <div className="flex flex-col w-full">
            <label className="font-medium">Sleep Hours</label>
            <input
              type="number"
              className="inputField"
              {...register("sleepHours", {
                valueAsNumber: true,
                required: "Sleep hours are required.",
                min: { value: 0, message: "Cannot be negative." },
                max: { value: 24, message: "Cannot exceed 24 hours." },
              })}
            />
            {errors.sleepHours && (
              <p className="text-sm text-red-500 mt-1">
                {errors.sleepHours.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-full w-full hover:bg-blue-700 transition"
          >
            Analyze
          </button>
        </form>

        {results && (
          <div className="mt-10 bg-white p-8 rounded-xl shadow-xl w-full max-w-xl space-y-2">
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            <div>Heart Age: {results.heart}</div>
            <div>Brain Age: {results.brain}</div>
            <div>Kidney Age: {results.kidney}</div>
            <div>Liver Age: {results.liver}</div>
            <div>Pancreas Age: {results.pancreas}</div>
            <div>Muscle Age: {results.muscle}</div>
            <div>Hormonal Age: {results.hormonal}</div>

            <div className="mt-4 font-bold text-lg">
              Full Body Aging Index: {results.overall}
            </div>

            <div className="text-orange-600 font-semibold">
              {results.status}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}