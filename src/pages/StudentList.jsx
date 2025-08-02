import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchStudents, deleteStudent } from '../features/students/studentSlice';
import Loader from '../components/Loader';
import { Eye, Pencil, Trash2, Plus } from 'lucide-react';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector(state => state.students);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🎓 Student Directory</h1>
        <button
          onClick={() => navigate('/add')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-semibold shadow-sm">
                {student.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{student.name}</h2>
                <p className="text-sm text-gray-600">{student.email}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigate(`/student/${student.id}`)}
                className="flex items-center gap-1 text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              >
                <Eye size={16} /> View
              </button>
              <button
                onClick={() => navigate(`/edit/${student.id}`)}
                className="flex items-center gap-1 text-sm bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="flex items-center gap-1 text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
