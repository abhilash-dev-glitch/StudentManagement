// src/features/students/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Load from localStorage if exists
const loadLocalStudents = () => {
  const saved = localStorage.getItem("students");
  return saved ? JSON.parse(saved) : null;
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: loadLocalStudents() || [],
    loading: false,
    error: null
  },
  reducers: {
    addStudent(state, action) {
      const newStudent = { ...action.payload, id: Date.now() };
      state.students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    editStudent(state, action) {
      const index = state.students.findIndex(s => s.id == action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
        localStorage.setItem("students", JSON.stringify(state.students));
      }
    },
    deleteStudent(state, action) {
      state.students = state.students.filter(s => s.id !== action.payload);
      localStorage.setItem("students", JSON.stringify(state.students));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        // Only load if localStorage is empty
        if (state.students.length === 0) {
          state.students = action.payload;
          localStorage.setItem("students", JSON.stringify(state.students));
        }
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
