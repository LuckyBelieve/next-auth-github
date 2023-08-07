"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [githubInfo, setGithubInfo] = useState({
    avatar_url: "",
    bio: "",
    followers: "",
    following: "",
    login: "",
    username: "",
    public_repos: "",
  });
  if (!session) {
    router.push("/");
  }
  useEffect(() => {
    const fetchGithubUsername = async () => {
      const res = await fetch(`/api/profile/${email}`);
      const userInfo = await res.json();
      const response = await fetch(
        `https://api.github.com/users/${userInfo[0].username}`
      );
      const githubUserInfo = await response.json();
      setGithubInfo({
        avatar_url: githubUserInfo.avatar_url,
        bio: githubUserInfo.bio,
        followers: githubUserInfo.followers,
        following: githubUserInfo.following,
        login: githubUserInfo.login,
        username: githubUserInfo.name,
        public_repos: githubUserInfo.public_repos,
      });
    };
    fetchGithubUsername();
  }, []);
  return (
    <div className="px-5 py-3 flex flex-col items-center justify-center">
      <h1 className="head_text text-center w-full">
        welcome to your personalised profile page from your GitHub account
      </h1>
      <div className="mt-5 flex items-center flex-col gap-3 w-[60%]">
        <img
          src={`${githubInfo?.avatar_url}`}
          alt="profile picture"
          className="rounded-full w-[200px] h-[200px]"
        />
        <div>
          <h2 className="font-semibold text-xl opacity-80 ">
            {githubInfo?.username}
          </h2>
          <h3 className="opacity-50">{githubInfo?.login}</h3>
        </div>
        <p className=" font-light opacity-70 w-[60%] border rounded-sm">
          {githubInfo?.bio}
        </p>
        <div className="self-start flex justify-between w-full px-3">
          <div className="w-full flex flex-col gap-2 items-center justify-end">
            <h2>followers</h2>
            <h3>{githubInfo?.followers}</h3>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-end">
            <h2>following</h2>
            <h3>{githubInfo?.following}</h3>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-end">
            <h2>public repositories</h2>
            <h3>{githubInfo?.public_repos}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
