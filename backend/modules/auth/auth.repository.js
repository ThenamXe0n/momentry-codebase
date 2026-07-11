import User from "./auth.model.js";

export const findByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() });
};

export const findByUsername = async (username) => {
  return await User.findOne({ username: username.toLowerCase() });
};

export const findById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};
