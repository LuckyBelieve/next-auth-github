"use client"
import React from "react";
import {FaStar} from "react-icons/fa"
const RepoLayout = ({
  name,
  description,
  visibility,
  updateTime,
  starGazers,
  language,
}) => {
  const date = updateTime;
  const updatedOn = new Date(date);
  const month = updatedOn.toLocaleString("default", { month: "short" });
  const day = updatedOn.getDate();
  const formattedDate = `${month} ${day}`;
  return (
    <div className=" p-3 border rounded-md mt-5">
      <div className="flex gap-2 mb-2">
        <h2 className=" font-semibold">{name}</h2>
        <h3 className="border rounded-xl px-2 py-1 text-xs">{visibility}</h3>
      </div>
      <p className="my-2">{description}</p>
      <div className="flex gap-3 text-xs">
        <h3 className=" font-bold">{language}</h3>
        <h3 className="flex gap-1  justify-center"><FaStar className="mt-[0.1px]"/> {starGazers}</h3>
        <h3>updated on {formattedDate}</h3>
      </div>
    </div>
  );
};

export default RepoLayout;
