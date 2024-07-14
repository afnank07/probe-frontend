import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const metricOptions = [
    { value: 'social_dominance_total', label: 'Social Dominance' },
    { value: 'transaction_volume', label: 'Volume' },
  ];
  
const tokenOptions = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
];

const intervalOptions = [
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
];

export default function Home() {
    const [token, setToken] = useState('');
    const [metrics, setMetrics] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [interval, setInterval] = useState('');
    const [response, setResponse] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await axios.post('https://probe-backend-uc9u.onrender.com/analyze', {
          token: token.value,
          metrics: metrics.map(m => m.value),
          startDate,
          endDate,
          interval: interval.value
        });
        setResponse(result.data.analysis);
      } catch (error) {
        setResponse('An error occurred while fetching the analysis.');
      }
    };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">probe-blocks: Crypto Intelligence</h1>
        <p className="text-xl text-gray-300 mb-4">Harness the power of AI for smarter crypto investing</p>
      <Link to="/waitlist" className="text-blue-400 hover:text-blue-300">Join our waitlist</Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Analyze Crypto Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-300">Token</label>
            <Select
              name="token"
              options={tokenOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setToken}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
                  borderColor: '#4B5563',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#4B5563' : '#374151',
                  color: 'white',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
              }}
            />
          </div>
          <div>
            <label htmlFor="metrics" className="block mb-2 text-sm font-medium text-gray-300">Metrics</label>
            <Select
              isMulti
              name="metrics"
              options={metricOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setMetrics}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
                  borderColor: '#4B5563',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#4B5563' : '#374151',
                  color: 'white',
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: '#4B5563',
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                multiValueRemove: (provided) => ({
                  ...provided,
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#6B7280',
                    color: 'white',
                  },
                }),
              }}
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-300">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-300">End Date</label>
            <input
              type="date"
              id="endDate"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="interval" className="block mb-2 text-sm font-medium text-gray-300">Interval</label>
            <Select
              name="interval"
              options={intervalOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={setInterval}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
                  borderColor: '#4B5563',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#374151',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#4B5563' : '#374151',
                  color: 'white',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
              }}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Analyze
          </button>
        </form>
      </div>

      {response && (
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Analysis Result</h2>
          <p className="text-gray-300">{response}</p>
        </div>
      )}
    </main>
  );
}