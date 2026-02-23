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
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F7F8FA] lg:px-40 lg:pt-10 pb-20 pt-5 px-2 md:px-0">
      <Navbar />
      <div>
        <h1 className="text-3xl font-semibold mb-6 mt-20 text-center">Lifestyle Biological Age Analyzer</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 sm:p-10 rounded-4xl shadow-xl w-full max-w-3xl grid grid-cols-2 gap-6"
        >
          {[
            ["age", "Age", 18, 120],
            ["heartRate", "Heart Rate (bpm)", 40, 200],
            ["glucose", "Glucose (mg/dL)", 50, 400],
            ["stress", "Stress Level (0–10)", 0, 10],
            ["screenTime", "Screen Time (hrs/day)", 0, 24],
            ["muscleStrength", "Muscle Strength (kg)", 1, 300],
            ["sleepHours", "Sleep Hours", 0, 24],
          ].map(([name, label, min, max]) => (
            <div key={name} className="flex flex-col w-full">
              <label className="font-medium mb-1">{label}</label>
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

          {/* Submit button spans both columns */}
          <button
            type="submit"
            className="col-span-2 bg-black text-white py-3 rounded-full w-full hover:bg-blue-700 transition"
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