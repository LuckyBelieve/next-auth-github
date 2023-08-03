import mongoose from "mongoose";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (request,{ params }) => {
  try {
    await connectToDB();
    const user = await User.find({email:params.email}).populate("email");
    return new Response(JSON.stringify(user), { status: 200})
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
};
