import axios from "axios";

const baseURL = "http://localhost:3003/api/tasks";

const generateConfig = (token) => {
  return {
    headers: {
      authorization: `bearer ${token}`,
    },
  };
};

const getAllTasks = async (token) => {
  const response = await axios.get(baseURL, generateConfig(token));
  return response.data;
};

const createTask = async (newTask, token) => {
  const response = await axios.post(baseURL, newTask, generateConfig(token));
  return response.data;
};

const updateTask = async (id, newTask, token) => {
  const response = await axios.put(
    `${baseURL}/${id}`,
    newTask,
    generateConfig(token)
  );
  return response.data;
};

const moveTask = async (taskId, sourceListId, newListId, token) => {
  const response = await axios.put(
    `${baseURL}/${taskId}/move`,
    { sourceListId, newListId },
    token
  );

  return response.data;
};

// remove a task to trash (not really deletion in Task collection)
const removeTask = async (id, task, list, token) => {
  const updatedTask = { ...task, removed: true };
  const response = await axios.put(
    `${baseURL}/${id}`,
    updatedTask,
    generateConfig(token)
  );

  return response.data;
};

const deleteTask = async (id, token) => {
  const response = await axios.delete(
    `${baseURL}/${id}`,
    generateConfig(token)
  );

  return response.data;
};

export default {
  getAllTasks,
  createTask,
  updateTask,
  moveTask,
  removeTask,
  deleteTask,
};
