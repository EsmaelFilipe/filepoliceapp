"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: {
  email: string;
  password: string;
  name: string;
}) => {
  const { email, password, name } = values;

  try {
    await connectDB();

    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    return {
      success: true,
      user: {
        name: savedUser.name,
        email: savedUser.email,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      error: "An error occurred while registering the user.",
    };
  }
};
