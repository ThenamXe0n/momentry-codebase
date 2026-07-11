import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ENV } from "../../config/env.js";
import * as authRepository from "./auth.repository.js";

export const register = async (userData) => {
  const existingEmail = await authRepository.findByEmail(userData.email);
  if (existingEmail) {
    throw new Error("Email already registered");
  }

  const existingUsername = await authRepository.findByUsername(userData.username);
  if (existingUsername) {
    throw new Error("Username already taken");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await authRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
};

export const login = async (email, password) => {
  // Find by email or username
  let user = await authRepository.findByEmail(email);
  if (!user) {
    user = await authRepository.findByUsername(email);
  }

  if (!user) {
    throw new Error("Invalid email/username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email/username or password");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    ENV.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
      bio: user.bio,
    },
  };
};
