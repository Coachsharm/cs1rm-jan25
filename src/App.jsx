import React, { useState } from 'react'
    import { Bar } from 'react-chartjs-2'
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js'
    import ChartDataLabels from 'chartjs-plugin-datalabels'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { faWeightScale, faRedo } from '@fortawesome/free-solid-svg-icons'

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      ChartDataLabels
    )

    const formulas = {
      Epley: (weight, reps) => weight * (1 + reps / 30),
      Brzycki: (weight, reps) => weight * (36 / (37 - reps)),
      Lombardi: (weight, reps) => weight * Math.pow(reps, 0.1)
    }

    const App = () => {
      const [weight, setWeight] = useState(100)
      const [reps, setReps] = useState(5)
      const [formula, setFormula] = useState('Epley')

      const calculate1RM = () => formulas[formula](weight, reps)
      const oneRM = calculate1RM()

      const percentages = [90, 80, 70, 60, 50, 40, 30, 20].map(p => ({
        percentage: p,
        weight: (oneRM * p / 100).toFixed(1)
      }))

      const chartData = {
        labels: percentages.map(p => `${p.percentage}%`),
        datasets: [{
          label: 'Weight',
          data: percentages.map(p => p.weight),
          backgroundColor: [
            '#3b82f6', // Light Blue
            '#2563eb', // Medium Blue
            '#1d4ed8', // Darker Blue
            '#1e40af', // Even Darker Blue
            '#1e3a8a', // Dark Blue
            '#1e3a8a', // Dark Blue
            '#1e3a8a', // Dark Blue
            '#1e3a8a'  // Dark Blue
          ]
        }]
      }

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
          datalabels: {
            display: true,
            color: 'white',
            anchor: 'end',
            align: 'top',
            formatter: (value) => `${value} kg`
          }
        }
      }

      return (
        <div className="min-h-screen bg-gradient-to-b from-[#1E0A2E] to-[#08010F]">
          <div className="min-h-screen p-4 text-white">
            <header className="text-center mb-10 header-animation">
              <div className="mb-4"></div>
              <div className="mb-4"></div>
              <h1 className="gradient-text text-5xl font-bold mb-3">
                1RM Calculator
              </h1>
              <p className="text-gray-400 text-lg mb-1 font-light tracking-wide">
                Unleash Your Lifting Potential
              </p>
              <p className="text-red-500 text-sm italic mt-1">
                by Coach Sharm and Body Thrive
              </p>
              <div className="max-w-2xl mx-auto mt-6">
                <p className="text-yellow-400 text-center text-sm leading-relaxed">
                  Estimate your 1RM in seconds:
                  <br />
                  - <span className="font-bold">Enter</span> weight and reps.
                  <br />
                  - <span className="font-bold">Select</span> a formula.
                  <br />
                  - Get instant results.
                </p>
              </div>
            </header>

            <div className="max-w-2xl mx-auto">
              <section className="mb-10 card-box">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="input-container">
                    <FontAwesomeIcon icon={faWeightScale} className="input-icon" />
                    <label className="block mb-2 text-gray-300">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={e => setWeight(Number(e.target.value))}
                      className="w-full p-3 border rounded bg-gray-800 border-gray-700 input-shadow focus:outline-none focus:border-teal-300 transition-shadow input-field"
                      placeholder="Enter weight in kg"
                    />
                  </div>
                  <div className="input-container">
                    <FontAwesomeIcon icon={faRedo} className="input-icon" />
                    <label className="block mb-2 text-gray-300">Reps</label>
                    <input
                      type="number"
                      value={reps}
                      onChange={e => setReps(Number(e.target.value))}
                      min="1"
                      max="20"
                      className="w-full p-3 border rounded bg-gray-800 border-gray-700 input-shadow focus:outline-none focus:border-teal-300 transition-shadow input-field"
                      placeholder="Enter reps (1-20)"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block mb-2 text-gray-300">Formula</label>
                  <select
                    value={formula}
                    onChange={e => setFormula(e.target.value)}
                    className="w-full p-3 border rounded bg-gray-800 border-gray-700 input-shadow focus:outline-none focus:border-teal-300 transition-shadow input-field"
                  >
                    {Object.keys(formulas).map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-200">Your 1RM</h2>
                <div className="text-5xl font-bold mb-6">
                  {oneRM.toFixed(1)} kg
                </div>
                <div className="h-72">
                  <Bar
                    data={chartData}
                    options={chartOptions}
                  />
                </div>
              </section>

              <section className="flex justify-center">
                <button
                  onClick={() => {
                    setWeight(100)
                    setReps(5)
                    setFormula('Epley')
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded button-shadow focus:outline-none transition-shadow hover:scale-105"
                >
                  Reset
                </button>
              </section>
            </div>

            <footer className="text-center mt-12 text-gray-400 text-sm">
              Stay safe. Lift responsibly.
            </footer>
          </div>
        </div>
      )
    }

    export default App
