import mongoose from "mongoose";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async ({ params }) => {
  try {
    await connectToDB();
    const user = await User.find({ email: params.email }).populate("email");
    console.log(user);
    return new Response(JSON.stringify(user), { status: 200})
  } catch (error) {
    return new Response("Failed to fetch user", { status: 500 })
  }
};
