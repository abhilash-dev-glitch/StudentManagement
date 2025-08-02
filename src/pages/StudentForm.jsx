import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, editStudent } from '../features/students/studentSlice';
import { User, Mail, Phone } from 'lucide-react'; // make sure to install lucide-react

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const student = useSelector(state =>
    state.students.students.find(s => s.id == id)
  );

  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (isEdit && student) {
      setForm({ name: student.name, email: student.email, phone: student.phone });
    }
  }, [isEdit, student]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !/\S+@\S+\.\S+/.test(form.email)) {
      alert('Please provide valid name and email.');
      return;
    }

    if (isEdit) {
      await dispatch(editStudent({ ...form, id: Number(id) }));
    } else {
      await dispatch(addStudent(form));
    }

    navigate('/students');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-100 p-4">
      <div className="bg-white w-full max-w-md shadow-2xl rounded-xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {isEdit ? 'Edit Student' : 'Register New Student'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {isEdit ? 'Update' : 'Add'} Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
