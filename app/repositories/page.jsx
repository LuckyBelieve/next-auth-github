"use client";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RepoLayout from "@/components/repoLayout";
const RepositoriesPage = () => {
  const { data: session } = useSession();
  const email = session?.user.email;
  const router = useRouter();
  const [repos, setRepos] = useState([]);
  if (!session) router.push("/");
  useEffect(() => {
    const fetchrepositories = async () => {
      const res = await fetch(`/api/profile/${email}`);
      const userInfo = await res.json();
      const response = await fetch(
        `https://api.github.com/users/${userInfo[0]?.username}/repos`
      );
      const repositories = await response.json();
      console.log(repositories);
      setRepos(repositories);
    };
    fetchrepositories();
  }, []);
  return (
    <div className=" flex flex-col items-center">
      <h3 className="head_text">
        these are your repositories and some of the information you would like
        to know about them
      </h3>
      <div className="mt-5">
        <h3>
          you can only view the information about your repos but you can not
          edit them here
        </h3>
        <Suspense
          fallback={
            <div>
              <p>Loading repos...</p>
            </div>
          }
        >
        <div>
          {repos ? (
            <div>
              {repos.map((repo) => (
                <RepoLayout
                  key={repo.id}
                  name={repo.name}
                  description={repo.description}
                  language={repo.language}
                  starGazers={repo.stargazers_count}
                  visibility={repo.visibility}
                  updateTime={repo.updated_at}
                />
              ))}
            </div>
          ) : (
            <div>
              <h2>you don't have any repository on your github account</h2>
            </div>
          )}
        </div>
        </Suspense>
      </div>
    </div>
  );
};

export default RepositoriesPage;
