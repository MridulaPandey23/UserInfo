import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "./components/Input";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required").min(1, "Enter a valid age"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().matches(/^[0-9]+$/, "Only digits allowed").required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", age: "", email: "", phone: "" },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (editingIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = values;
        setUsers(updatedUsers);
        setEditingIndex(null);
      } else {
        setUsers([...users, values]);
      }
      resetForm();
      setShowForm(false);
    },
  });

  const handleEdit = (index) => {
    formik.setValues(users[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const filteredUsers =
    searchQuery.trim() === ""
      ? users
      : users.filter((user) =>
          Object.values(user).some((val) =>
            val.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold underline text-center mb-10 text-indigo-800 drop-shadow-md">User Info Manager</h1>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 text-lg bg-green-300 hover:bg-green-400 text-green-900 font-medium rounded-lg"
            >
              {showForm ? "Cancel" : "Add New Entry"}
            </button>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="px-6 py-2 text-lg bg-green-300 hover:bg-green-400 text-green-900 font-medium rounded-lg"
            >
              {showSearch ? "Close Search" : "Search"}
            </button>
          </div>

          {showSearch && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, age, email or phone"
              className="px-5 py-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-1/2 text-gray-700"
            />
          )}
        </div>

        {/* Formik Form */}
        {showForm && (
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg mb-10 flex flex-wrap justify-center gap-4 border border-gray-200"
          >
            <div className="flex flex-col">
              <Input
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-48"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                name="age"
                placeholder="Age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-48"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-64"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                name="phone"
                placeholder="Phone No"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-64"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2 text-lg mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </form>
        )}

        {/* Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold border-r border-indigo-500">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-r border-indigo-500">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-r border-indigo-500">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-r border-indigo-500">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-blue-800 text-white px-4 py-1 rounded hover:bg-blue-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No matching entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
