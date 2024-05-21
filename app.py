from flask import Flask, request
import flask_cors
import pickle
import numpy as np
import time

app = Flask(__name__)
flask_cors.CORS(app)

model = pickle.load(open("xgb_model.pkl", "rb"))


@app.route("/")
def index():
    return "Welcome To Cardiovascular Disease Prediction!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    
    # Extract values in the specific sequence
    sequence = [
        data.get("SEX"),
        data.get("TOTCHOL"),
        data.get("AGE"),
        data.get("SYSBP"),
        data.get("DIABP"),
        data.get("CURSMOKE"),
        data.get("CIGPDAY"),
        data.get("BMI"),
        data.get("DIABETES"),
        data.get("BPMEDS"),
        data.get("HEARTRTE"),
        data.get("GLUCOSE"),
        data.get("PREVCHD"),
        data.get("PREVAP"),
        data.get("PREVMI"),
        data.get("PREVSTRK"),
       
    ]
    #  data.get("PREVHYP"),
    #     data.get("ANGINA"),
    #     data.get("HOSPMI"),
    #     data.get("MI_FCHD"),
    #     data.get("ANYCHD"),
    #     data.get("STROKE"),
    #     data.get("HYPERTEN"),
    print(sequence)
    # Convert to numpy array
    model_input = np.array([sequence])
    # Predict using the model
    prediction = model.predict(model_input)
    
    print(data)
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
