from flask import Flask, request
import flask_cors
import pickle
import numpy as np
import time

app = Flask(__name__)
flask_cors.CORS(app)

model = pickle.load(open("model.pkl", "rb"))


@app.route("/")
def index():
    return "Welcome To Cardiovascular Disease Prediction!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    # Calculate BMI from Height and Weight
    data["BMI"] = data["Weight_kg"] / ((data["Height_cm"] / 100) ** 2)
    data["BMI_Category"] = (
        0
        if data["BMI"] < 18.5
        else 1 if data["BMI"] < 24.9 else 2 if data["BMI"] < 29.9 else 3
    )
    data["Lifestyle_Score"] = (
        data["Exercise"]
        - data["Smoking_History"]
        + data["Fruit_Consumption"] / 10
        + data["Green_Vegetables_Consumption"] / 10
        - data["Fried_Potatoes_Consumption"] / 10
    )
    data["Diet_Score"] = (
        data["Fruit_Consumption"] / 10
        + data["Green_Vegetables_Consumption"] / 10
        - data["Fried_Potatoes_Consumption"] / 10
    )
    data["Bad_Habbit_Score"] = (
        data["Alcohol_Consumption"] / 10 + data["Smoking_History"]
    )

    # create a numpy array from the data
    values = [
        data["General_Health"],
        data["Exercise"],
        data["Skin_Cancer"],
        data["Other_Cancer"],
        data["Depression"],
        data["Diabetics"],
        data["Arthritis"],
        data["Sex"],
        data["Age"],
        data["Height_cm"],
        data["Weight_kg"],
        data["BMI"],
        data["Smoking_History"],
        data["Alcohol_Consumption"],
        data["Fruit_Consumption"],
        data["Green_Vegetables_Consumption"],
        data["Fried_Potatoes_Consumption"],
        data["BMI_Category"],
        data["Lifestyle_Score"],
        data["Diet_Score"],
        data["Bad_Habbit_Score"],
    ]
    model_input = np.array([values])
    prediction = model.predict(model_input)
    time.sleep(5)
    return {"prediction": str(prediction[0])}


if __name__ == "__main__":
    app.run()


# data = array([[  4.  ,   1.  ,   0.  ,   0.  ,   0.  ,   0.  ,   0.  ,   1.  ,
#           7.  , 163.  ,  60.78,  23.  ,   1.  ,   0.  ,  20.  ,   4.  ,
#          16.  ,   1.  ,   0.8 ,   0.8 ,   1.  ]])

# General_Health                    4.00
# Exercise                          1.00
# Skin_Cancer                       0.00
# Other_Cancer                      0.00
# Depression                        0.00
# Diabetes                          0.00
# Arthritis                         0.00
# Sex                               1.00
# Age_Category                      7.00
# Height_(cm)                     163.00
# Weight_(kg)                      60.78
# BMI                              23.00
# Smoking_History                   1.00
# Alcohol_Consumption               0.00
# Fruit_Consumption                20.00
# Green_Vegetables_Consumption      4.00
# FriedPotato_Consumption          16.00
# BMI_Category                      1.00
# Lifestyle_Score                   0.80
# Diet_Score                        0.80
# Bad_Habbit_Score                  1.00
