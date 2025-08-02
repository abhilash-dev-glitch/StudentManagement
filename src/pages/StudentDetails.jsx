import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserIcon, MailIcon, PhoneIcon } from 'lucide-react';

const StudentDetails = () => {
  const { id } = useParams();
  const student = useSelector(state => state.students.students.find(s => s.id == id));

  return student ? (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-r from-white to-blue-50 p-8 rounded-2xl shadow-xl transition hover:shadow-2xl duration-300 ease-in-out">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold shadow-md">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-700">{student.name}</h1>
          <p className="text-sm text-gray-500">Student Details</p>
        </div>
      </div>

      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-3">
          <MailIcon className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Email:</span> {student.email}
        </div>
        <div className="flex items-center gap-3">
          <PhoneIcon className="w-5 h-5 text-green-500" />
          <span className="font-medium">Phone:</span> {student.phone}
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/students"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
        >
          ← Back to List
        </Link>
      </div>
    </div>
  ) : (
    <div className="text-center mt-20 text-gray-600 text-lg">
      Student not found.
      <div className="mt-4">
        <Link to="/students" className="text-blue-600 hover:underline">
          Go back to list
        </Link>
      </div>
    </div>
  );
};

export default StudentDetails;
