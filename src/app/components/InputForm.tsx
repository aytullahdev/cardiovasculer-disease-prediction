import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    key: "SEX",
    title: "Sex",
    type: "options",
    options: [
      { title: "Male", value: 1 },
      { title: "Female", value: 0 },
    ],
  },

  {
    key: "TOTCHOL",
    title: "Total Cholesterol (mg/dL)",
    type: "number",
    options: [],
  },
  {
    key: "AGE",
    title: "Age",
    type: "number",
    options: [],
  },
  {
    key: "SYSBP",
    title: "Systolic Blood Pressure (mmHg)",
    type: "number",
    options: [],
  },
  {
    key: "DIABP",
    title: "Diastolic Blood Pressure (mmHg)",
    type: "number",
    options: [],
  },
  {
    key: "CURSMOKE",
    title: "Current Smoker",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "CIGPDAY",
    title: "Cigarettes Per Day",
    type: "number",
    options: [],
  },
  {
    key: "BMI",
    title: "Body Mass Index",
    type: "number",
    options: [],
  },
  {
    key: "DIABETES",
    title: "Diabetes",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "BPMEDS",
    title: "Blood Pressure Medication",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "HEARTRTE",
    title: "Heart Rate (bpm)",
    type: "number",
    options: [],
  },
  {
    key: "GLUCOSE",
    title: "Blood Glucose (mg/dL)",
    type: "number",
    options: [],
  },
  {
    key: "PREVCHD",
    title: "Previous Coronary Heart Disease",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "PREVAP",
    title: "Previous Angina Pectoris",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "PREVMI",
    title: "Previous Myocardial Infarction",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "PREVSTRK",
    title: "Previous Stroke",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "PREVHYP",
    title: "Previous Hypertension",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },

  {
    key: "ANGINA",
    title: "Angina Pectoris",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "HOSPMI",
    title: "Hospitalized Myocardial Infarction",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "MI_FCHD",
    title: "Myocardial Infarction or Fatal CHD",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "ANYCHD",
    title: "Any Coronary Heart Disease",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "STROKE",
    title: "Stroke",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "HYPERTEN",
    title: "Hypertension",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
];

const InputForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const currentStepData = steps[currentStep];
  const [isPredictionComplited, setIsPredictionComplited] = useState(false);
  const handleNext = () => {
    setIsPredictionComplited(false);
    if (currentStep === steps.length - 1) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };
  const handleInputChange = async (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    handleNext();
  };
  const handleNumberInputChange = async (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  const [prediction, setPrediction] = useState<string>("0");
  const handlePredict = () => {
    setIsPredictionComplited(false);
    // check if we have input for the current step
    if (formData[currentStepData.key] || formData[currentStepData.key] >= 0) {
      // send the data to the server
      setIsPredictionLoading(true);
      fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setPrediction(data.prediction);
          setIsPredictionComplited(true);
        })
        .finally(() => {
          setIsPredictionLoading(false);
        });

      return;
    }
    alert("Please fill the input");
  };
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center py-10">
        Cardiovascular Disease Prediction
      </h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {currentStepData.title}
          </label>
          {currentStepData.type === "options" && (
            <motion.div className="flex flex-wrap">
              {currentStepData.options.map((option) => (
                <motion.button
                  layoutId={option.title}
                  layout
                  onClick={() => {
                    handleInputChange(currentStepData.key, option.value);
                  }}
                  className={`border backdrop-blur-md backdrop-brightness-150  text-black font-bold py-2 px-4 w-40 h-10 rounded m-2 ${
                    formData[currentStepData.key] === option.value
                      ? "bg-gray-300/60 animate-pulse"
                      : ""
                  }`}
                >
                  {option.title}
                </motion.button>
              ))}
            </motion.div>
          )}
          {currentStepData.type === "number" && (
            <input
              type="number"
              key={currentStepData.key}
              required
              defaultValue={formData[currentStepData.key] || 0}
              min={0}
              onChange={(e) => {
                handleNumberInputChange(currentStepData.key, e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        </div>
        <div>
          <>
            {isPredictionLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <>
                {isPredictionComplited && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">PREDICT</h2>
                    <p
                      className={`text-xl font-bold ${
                        prediction === "1" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {prediction === "1" ? "High Risk" : "Low Risk"}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                handlePredict();
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Predict
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputForm;
