// components/UserTable.jsx
import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
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
          {users.map((user, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.age}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-r border-gray-200">{user.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(index)}
                    className="bg-blue-800 text-white px-4 py-1 rounded hover:bg-blue-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No matching entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
