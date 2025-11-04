import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight.");
      return;
    }
    if (height <= 0 || weight <= 0) {
      alert("Height and weight must be positive values.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus("Underweight");
      setColor("#3498db");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setStatus("Normal weight");
      setColor("#2ecc71");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setStatus("Overweight");
      setColor("#f1c40f");
    } else {
      setStatus("Obese");
      setColor("#e74c3c");
    }
  };

  // Load Tenor script whenever the BMI status changes
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [status]);

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <div className="input-group">
        <label>Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter your height"
        />
      </div>

      <div className="input-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight"
        />
      </div>

      <button onClick={calculateBMI}>Calculate BMI</button>

      {bmi && (
        <div className="result fade-in">
          <h2>Your BMI: {bmi}</h2>
          <p style={{ color }}>{status}</p>

          {(status === "Overweight" || status === "Obese") && (
            <div className="meme fade-in">
              <div
                className="tenor-gif-embed"
                data-postid="15012595"
                data-share-method="host"
                data-aspect-ratio="1.77778"
                data-width="100%"
              >
                <a href="https://tenor.com/view/damn-boi-he-thicc-anthony-fantano-thats-a-thicc-ass-boi-melon-the-needledrop-gif-15012595">
                  Damn Boi He Thicc Anthony Fantano GIF
                </a>{" "}
                from{" "}
                <a href="https://tenor.com/search/damn+boi+he+thicc-gifs">
                  Damn Boi He Thicc GIFs
                </a>
              </div>
              <p className="friendly-note">
                Damn Boi U Thicc. Lose some Weight.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
