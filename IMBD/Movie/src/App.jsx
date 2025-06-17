import React, { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import UserTable from "./components/UserTable"; // <-- Import the table component

const App = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", email: "", phone: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = form;
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, form]);
    }
    setForm({ name: "", age: "", email: "", phone: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
        <h1 className="text-5xl font-bold underline text-center mb-10 text-indigo-800 drop-shadow-md">
          User Info Manager
        </h1>

        {/* Action Buttons */}
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
              onChange={handleSearchChange}
              value={searchQuery}
              placeholder="Search by name, age, email or phone"
              className="px-5 py-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-1/2 text-gray-700"
            />
          )}
        </div>

        {/* Input Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-10 flex flex-wrap justify-center gap-4 border border-gray-200">
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-48"
            />
            <Input
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              className="w-48"
            />
            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-64"
            />
            <Input
              name="phone"
              placeholder="Phone No"
              value={form.phone}
              onChange={handleChange}
              className="w-64"
            />
            <button
              onClick={handleAddOrUpdate}
              className="px-6 py-2 text-lg mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        )}

        {/* User Table Component */}
        <UserTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
