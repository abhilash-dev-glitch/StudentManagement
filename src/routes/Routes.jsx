// routes/Routes.jsx
<Routes>
  <Route path="/" element={<Navigate to="/students" />} />
  <Route path="/students" element={<StudentList />} />
  <Route path="/student/:id" element={<StudentDetails />} />
  <Route path="/add" element={<StudentForm />} />
  <Route path="/edit/:id" element={<StudentForm />} />
</Routes>
