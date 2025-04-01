import { useState, useEffect } from "react";
import api from "../api";

export default function TodoInput() {
  const [allTodo, setAllTodo] = useState([]);
  const [data, setData] = useState({ title: "", content: "" });

  const [editingTodo, setEditingTodo] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("api/todos/", data);
      setAllTodo([...allTodo, response.data]);
      setData({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  useEffect(() => {
    const fetchAllTodo = async () => {
      try {
        const response = await api.get("api/todos/");
        setAllTodo(response.data);
      } catch (error) {
        console.error("Error fetching all todos:", error);
      }
    };
    fetchAllTodo();
  }, []);

  async function deleteTodo(id) {
    try {
      await api.delete(`api/todos/${id}/`);
      setAllTodo(allTodo.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function updateTodo(e) {
    e.preventDefault();
    try {
      const response = await api.put(`api/todos/${editingTodo.id}/`, editData);
      setAllTodo(
        allTodo.map((todo) =>
          todo.id === editingTodo.id ? response.data : todo
        )
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  return (
    <div className="mt-7 flex flex-col items-center space-y-4">
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Title"
          className="w-64 p-1 text-lg px-2 border-b-4 border-indigo-500 outline-none"
        />
        <input
          type="text"
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
          placeholder="Content"
          className="w-64 p-1 text-lg px-2 border-b-4 border-indigo-500 outline-none"
        />
        <button className="mt-4 w-64 p-2 cursor-pointer transform duration-300 bg-indigo-400 text-white rounded-lg hover:bg-indigo-600">
          Add
        </button>
      </form>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {allTodo.map((todo) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white shadow-lg rounded-lg p-4 border border-gray-200 items-center"
            key={todo.id}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {todo.title}
              </h3>
            </div>
            <div>
              <p className="text-gray-600">{todo.content}</p>
            </div>
            <div className="flex space-x-2 justify-center sm:justify-end">
              <button
                onClick={() => {
                  setEditingTodo(todo);
                  setEditData({ title: todo.title, content: todo.content });
                }}
                className="bg-blue-500 cursor-pointer transform duration-300 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 cursor-pointer transform duration-300 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal  */}
      {editingTodo && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Todo
            </h2>
            <form onSubmit={updateTodo} className="space-y-4">
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Title"
              />
              <input
                type="text"
                value={editData.content}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Content"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTodo(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
