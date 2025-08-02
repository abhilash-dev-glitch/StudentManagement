import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/collage.png'; ✅


const Home = () => {
  return (
    <div className="min-h-screen pt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">FullStack University</span>
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 drop-shadow-sm">
          Your ultimate portal to manage and access student information efficiently.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/students"
            className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 hover:text-black transition"
          >
            View Students
          </Link>
          <Link
            to="/add"
            className="bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-purple-700 transition"
          >
            Add Student
          </Link>
        </div>

        <div className="mt-12">
          <img
              src={heroImage}
            alt="University"
            className="w-full max-w-lg mx-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
