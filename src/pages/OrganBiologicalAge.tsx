import React from "react";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#F7F8FA] p-6">
      <p className="text-3xl font-semibold mb-6">
        Enter your health parameters
      </p>

      <div className="w-125 max-w-2xl bg-white p-8 shadow-2xl rounded-xl shadow-zinc-500/30">
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
      </div>
    </div>
  );
};

export default OrganBiologicalAge;