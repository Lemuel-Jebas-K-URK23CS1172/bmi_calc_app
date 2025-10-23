import { useState } from "react";
import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight!");
      return;
    }
    if (height <= 0 || weight <= 0) {
      alert("Height and weight must be positive values!");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    let bmiStatus = "";
    if (bmiValue < 18.5) bmiStatus = "Underweight";
    else if (bmiValue >= 18.5 && bmiValue <= 24.9) bmiStatus = "Normal weight";
    else if (bmiValue >= 25 && bmiValue <= 29.9) bmiStatus = "Overweight";
    else bmiStatus = "Obese";

    setStatus(bmiStatus);
  };

  const getColor = () => {
    switch (status) {
      case "Underweight":
        return "blue";
      case "Normal weight":
        return "green";
      case "Overweight":
        return "orange";
      case "Obese":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div className="app">
      <h1>BMI Calculator</h1>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculate BMI</button>
      </div>

      {bmi && (
        <div className="result">
          <h2>Your BMI: {bmi}</h2>
          <h3 style={{ color: getColor() }}>{status}</h3>
        </div>
      )}
    </div>
  );
}

export default App;