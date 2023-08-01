"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
const ProfilePage = ({ params }) => {
  const { data: session } = useSession();
  const [githubUsername, setGithubUsername] = useState("");
  const [githubInfo, setGithubInfo] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    const fetchGithubUsername = async () => {
      if (params?.email === session?.user.email) {
        res = await fetch(`/api/profile/${email}`);
        setGithubUsername(await res.json());
      }
    };

    fetchGithubUsername();
    const fetchGithubInfo = async () => {
      if (githubUsername) {
        const userInfo = await fetch(
          `https://api.github.com/users/${githubUsername}/`
        );
      }
    };
    fetchGithubInfo();
  }, []);
  return (
    <div className="px-5 py-3">
      <h1 className="head_text">
        On GitView, your account is linked to your github account, here is your
        stats on your github account
      </h1>
    </div>
  );
};

export default ProfilePage;
