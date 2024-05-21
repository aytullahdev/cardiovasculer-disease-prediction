import React, { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    key: "General_Health",
    title: "General Health",
    type: "options",
    options: [
      { title: "Poor", value: 0 },
      { title: "Fair", value: 1 },
      { title: "Good", value: 2 },
      { title: "Very Good", value: 3 },
      { title: "Excellent", value: 4 },
    ],
  },

  {
    key: "Exercise",
    title: "Exercise",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },

  {
    key: "Skin_Cancer",
    title: "Skin Cancer",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "Other_Cancer",
    title: "Other Cancer",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "Depression",
    title: "Depression",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "Diabetics",
    title: "Diabetics",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "Arthritis",
    title: "Arthritis",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },
  {
    key: "Sex",
    title: "Sex",
    type: "options",
    options: [
      { title: "Male", value: 1 },
      { title: "Female", value: 0 },
    ],
  },
  {
    key: "Age",
    title: "Age",
    type: "options",
    options: [
      { title: "18-24", value: 0 },
      { title: "25-29", value: 1 },
      { title: "30-34", value: 2 },
      { title: "35-39", value: 3 },
      { title: "40-44", value: 4 },
      { title: "45-49", value: 5 },
      { title: "50-54", value: 6 },
      { title: "55-59", value: 7 },
      { title: "60-64", value: 8 },
      { title: "65-69", value: 9 },
      { title: "70-74", value: 10 },
      { title: "75-79", value: 11 },
      { title: "80+", value: 12 },
    ],
  },
  {
    key: "Height_cm",
    title: "Height (cm)",
    type: "number",
    options: [],
  },
  {
    key: "Weight_kg",
    title: "Weight (kg)",
    type: "number",
    options: [],
  },
  {
    key: "Smoking_History",
    title: "Smoking History",
    type: "options",
    options: [
      { title: "No", value: 0 },
      { title: "Yes", value: 1 },
    ],
  },

  {
    key: "Alcohol_Consumption",
    title: "Alcohol Consumption",
    type: "number",
    options: [],
  },
  {
    key: "Fruit_Consumption",
    title: "Fruit Consumption",
    type: "number",
    options: [],
  },
  {
    key: "Green_Vegetables_Consumption",
    title: "Green Vegetables Consumption",
    type: "number",
    options: [],
  },

  {
    key: "Fried_Potatoes_Consumption",
    title: "Fried Potatoes Consumption",
    type: "number",
    options: [],
  },
];
const InputForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const currentStepData = steps[currentStep];
  const [isPredictionComplited, setIsPredictionComplited] = useState(false);
  const handleNext = () => {
    setIsPredictionComplited(false);
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
            <img
              src="/images/doctor.png"
              width={200}
              alt="loading"
              className="mx-auto"
            />
            {isPredictionLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <>
                {isPredictionComplited && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">Prediction</h2>
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
