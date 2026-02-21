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
  testosteroneEstrogenIndex: number;
};

const OrganBiologicalAge = () => {
  const [organAge, setOrganAge] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  // 🔬 Biological Age Formula
  const calculateOrganAge = (data: Inputs) => {
    const ideal = {
      heartRate: 70,
      creatinine: 1.0,
      altLiver: 25,
      cognitiveScore: 90,
      glucose: 90,
      muscleStrength: 40,
      testosteroneEstrogenIndex: 1.0,
    };

    const deviation = {
      heart: Math.abs((data.heartRate - ideal.heartRate) / ideal.heartRate),
      kidney: Math.abs((data.creatinine - ideal.creatinine) / ideal.creatinine),
      liver: Math.abs((data.altLiver - ideal.altLiver) / ideal.altLiver),
      brain: Math.abs((ideal.cognitiveScore - data.cognitiveScore) / ideal.cognitiveScore),
      metabolic: Math.abs((data.glucose - ideal.glucose) / ideal.glucose),
      muscle: Math.abs((ideal.muscleStrength - data.muscleStrength) / ideal.muscleStrength),
      hormone: Math.abs((data.testosteroneEstrogenIndex - ideal.testosteroneEstrogenIndex) / ideal.testosteroneEstrogenIndex),
    };

    const weightedScore =
      deviation.heart * 0.2 +
      deviation.kidney * 0.15 +
      deviation.liver * 0.1 +
      deviation.brain * 0.2 +
      deviation.metabolic * 0.15 +
      deviation.muscle * 0.1 +
      deviation.hormone * 0.1;

    const calculatedAge = Math.round(data.age + weightedScore * 20);

    setOrganAge(calculatedAge);
    setBreakdown(deviation);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    calculateOrganAge(data);
  };

  const getColor = () => {
    if (!organAge) return "text-gray-600";
    if (organAge < 30) return "text-green-600";
    if (organAge < 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F7F8FA] p-6">
      <p className="text-3xl font-semibold mb-6">
        Enter your health parameters
      </p>

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
              {errors.age && (
                <p className="text-sm text-red-500">{errors.age.message}</p>
              )}
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
              {errors.heartRate && (
                <p className="text-sm text-red-500">
                  {errors.heartRate.message}
                </p>
              )}
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
              {errors.creatinine && (
                <p className="text-sm text-red-500">
                  {errors.creatinine.message}
                </p>
              )}
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
              {errors.altLiver && (
                <p className="text-sm text-red-500">
                  {errors.altLiver.message}
                </p>
              )}
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
              {errors.cognitiveScore && (
                <p className="text-sm text-red-500">
                  {errors.cognitiveScore.message}
                </p>
              )}
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
              {errors.glucose && (
                <p className="text-sm text-red-500">
                  {errors.glucose.message}
                </p>
              )}
            </div>
          </div>

          {/* Muscle Strength & Hormone Index */}
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
              {errors.muscleStrength && (
                <p className="text-sm text-red-500">
                  {errors.muscleStrength.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label>Testosterone / Estrogen Index</label>
              <input
                type="number"
                step="0.01"
                className="inputField"
                {...register("testosteroneEstrogenIndex", {
                  valueAsNumber: true,
                  required: "Hormone index is required.",
                  min: { value: 0, message: "Cannot be negative." },
                  max: { value: 1000, message: "Value too high." },
                })}
              />
              {errors.testosteroneEstrogenIndex && (
                <p className="text-sm text-red-500">
                  {errors.testosteroneEstrogenIndex.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Analyze Organ Age
          </button>
        </form>

        {/* 🔥 RESULT SECTION */}
        {organAge && (
          <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">
              Biological Organ Age Result
            </h2>

            {/* Age Display */}
            <div className="flex items-center gap-4">
              <div className={`text-5xl font-bold ${getColor()}`}>
                {organAge}
              </div>
              <span className="text-gray-500 text-lg">years</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full bg-blue-500 transition-all"
                  style={{ width: `${Math.min((organAge / 100) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Interpretation */}
            <div className="mt-4 text-sm text-gray-600">
              {organAge < 30 && "Excellent! Your biological markers are strong."}
              {organAge >= 30 && organAge < 50 && "Moderate aging detected. Consider lifestyle optimization."}
              {organAge >= 50 && "Accelerated aging markers detected. Medical consultation recommended."}
            </div>

            {/* Organ Breakdown */}
            {breakdown && (
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>❤️ Heart Impact: {(breakdown.heart * 100).toFixed(1)}%</div>
                <div>🧠 Brain Impact: {(breakdown.brain * 100).toFixed(1)}%</div>
                <div>🩺 Kidney Impact: {(breakdown.kidney * 100).toFixed(1)}%</div>
                <div>🧪 Liver Impact: {(breakdown.liver * 100).toFixed(1)}%</div>
                <div>🍬 Metabolic Impact: {(breakdown.metabolic * 100).toFixed(1)}%</div>
                <div>💪 Muscle Impact: {(breakdown.muscle * 100).toFixed(1)}%</div>
                <div>🧬 Hormone Impact: {(breakdown.hormone * 100).toFixed(1)}%</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganBiologicalAge;

