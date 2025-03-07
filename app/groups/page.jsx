'use client'
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Page = () => {
  const [activeTab, setActiveTab] = useState("recent");

  const recent = [
    {
      groupName: "Asknect Physics",
      shortDescription:
        "Asknect Physics is a student community for discussing and exploring physics concepts, solving problems, and sharing knowledge.",
      tags: "Asknect Physics, linear motion, newton's laws of motion, mechanical engineering",
      followers: 132,
      posts: 1230,
      questions: 1100,
      profileImage: "/assets/icons/favicon.png",
      slug:'asknect-physics'
    },
    {
      groupName: "Chill Coders",
      shortDescription:
        "For those who love coding, gaming, and discussing tech over coffee!",
      tags: "Coding, Tech, Gaming, Casual Chat",
      followers: 275,
      posts: 1200,
      questions: 850,
      profileImage: "/assets/profile/channels4_profile (1).jpg",
      slug:'chill-coders'
    },
    {
      groupName: "Mathematical Minds",
      shortDescription:
        "A community for math lovers to discuss problems, theories, and applications across disciplines.",
      tags: "Mathematics, Calculus, Algebra, Number Theory",
      followers: 420,
      posts: 1800,
      questions: 1400,
      profileImage: "/assets/profile/channels4_profile.jpg",
      slug:'mathematical-minds'
    },
    {
      groupName: "The Meme Scientists",
      shortDescription:
        "Where science meets humor! Physics, chemistry, and biology memes all in one place.",
      tags: "Science Memes, Physics, Chemistry, Biology",
      followers: 500,
      posts: 3000,
      questions: 2500,
      profileImage: "/assets/profile/unnamed (1).jpg",
      slug:'the-meme-scientists'
    },
  ];

  const popular = [
    {
      groupName: "Mathematical Minds",
      shortDescription:
        "A community for math lovers to discuss problems, theories, and applications across disciplines.",
      tags: "Mathematics, Calculus, Algebra, Number Theory",
      followers: 420,
      posts: 1800,
      questions: 1400,
      profileImage: "/assets/profile/channels4_profile.jpg",
      slug:'mathematical-minds'
    },
    {
      groupName: "The Meme Scientists",
      shortDescription:
        "Where science meets humor! Physics, chemistry, and biology memes all in one place.",
      tags: "Science Memes, Physics, Chemistry, Biology",
      followers: 500,
      posts: 3000,
      questions: 2500,
      profileImage: "/assets/profile/unnamed (1).jpg",
      slug:'the-meme-scientists'
    },
  ];

  const yourGroups = [
    {
      groupName: "Mathematical Minds",
      shortDescription:
        "A community for math lovers to discuss problems, theories, and applications across disciplines.",
      tags: "Mathematics, Calculus, Algebra, Number Theory",
      followers: 420,
      posts: 1800,
      questions: 1400,
      profileImage: "/assets/profile/channels4_profile.jpg",
      slug:'mathematical-minds'
    },
    {
      groupName: "The Meme Scientists",
      shortDescription:
        "Where science meets humor! Physics, chemistry, and biology memes all in one place.",
      tags: "Science Memes, Physics, Chemistry, Biology",
      followers: 500,
      posts: 3000,
      questions: 2500,
      profileImage: "/assets/profile/unnamed (1).jpg",
      slug:'the-meme-scientists'
    },
  ];


  return (
    <div className="container mt-16 mx-0 sm:mx-auto px-0 sm:px-4 pb-4">
      <div className="flex items-center justify-between shadow dark:bg-gray-800 py-2">
        <Link href="/create-group">
          <button className="text-white bg-black p-2 mx-2 small-text rounded-3xl ">
            + Create
          </button>
        </Link>
        <p className="dark:text-white mx-2">
          Join or Create Your Group
        </p>
      </div>

      <div className="container flex items-center justify-between mt-4">
        <button
          className={`border-b-2 small-text ${
            activeTab === "recent" ? "border-black dark:border-white" : "border-transparent"
          }`}
          onClick={() => setActiveTab("recent")}
        >
          Recent
        </button>

        <button
          className={`border-b-2 small-text ${
            activeTab === "popular" ? "border-black dark:border-white" : "border-transparent"
          }`}
          onClick={() => setActiveTab("popular")}
        >
          Popular
        </button>

          <button className={`border-b-2 small-text ${
            activeTab === "your groups" ? "border-black dark:border-white" : "border-transparent"
          }`}
          onClick={() => setActiveTab("your groups")}>
            Your Groups
          </button>

      </div>

      <div className="mt-4">
        {activeTab === "recent" && (
          <div>
            {recent.map((group, index) => (
              <div key={index} className="flex flex-col items-start gap-2 p-2 shadow dark:bg-gray-800 cursor-pointer mb-4 rounded">
                <div className="flex items-center">
                  <div>
                    <Image
                      src={group.profileImage}
                      alt={group.groupName}
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  </div>
                <h5 className="dark:text-white ml-2">{group.groupName}</h5>
                </div>
                <div>
                  <p className="text-gray-700 text-md dark:text-white">
                    {group.shortDescription}
                  </p>
                  <p className="text-black-700 text-xs dark:text-gray-500">
                    {group.followers} Followers • {group.posts} Posts •{" "}
                    {group.questions} Questions
                  </p>
                  <p className="text-gray-700 text-xs dark:text-gray-500">
                    {group.tags}
                  </p>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm px-3 py-1 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all ml-auto">
                  JOIN
                </button>
              </div>
            ))}
          </div>
        )}
        {activeTab === "popular" && <div>
          {popular.map((group, index) => (
              <div key={index} className="flex flex-col items-start gap-2 p-2 shadow dark:bg-gray-800 cursor-pointer mb-4 rounded">
                <div className="flex items-center">
                  <div>
                    <Image
                      src={group.profileImage}
                      alt={group.groupName}
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  </div>
                <h5 className="dark:text-white ml-2">{group.groupName}</h5>
                </div>
                <div>
                  <p className="text-gray-700 text-md dark:text-white">
                    {group.shortDescription}
                  </p>
                  <p className="text-black-700 text-xs dark:text-gray-500">
                    {group.followers} Followers • {group.posts} Posts •{" "}
                    {group.questions} Questions
                  </p>
                  <p className="text-gray-700 text-xs dark:text-gray-500">
                    {group.tags}
                  </p>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm px-3 py-1 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all ml-auto">
                  JOIN
                </button>
              </div>
            ))}

          </div>}

          {activeTab === "your groups" && <div>
          {yourGroups.map((group, index) => (
              <div key={index} className="flex flex-col items-start gap-2 p-2 shadow dark:bg-gray-800 cursor-pointer mb-4 rounded">
                <div className="flex items-center">
                  <div>
                    <Image
                      src={group.profileImage}
                      alt={group.groupName}
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  </div>
                <h5 className="dark:text-white ml-2">{group.groupName}</h5>
                </div>
                <div>
                  <p className="text-gray-700 text-md dark:text-white">
                    {group.shortDescription}
                  </p>
                  <p className="text-black-700 text-xs dark:text-gray-500">
                    {group.followers} Followers • {group.posts} Posts •{" "}
                    {group.questions} Questions
                  </p>
                  <p className="text-gray-700 text-xs dark:text-gray-500">
                    {group.tags}
                  </p>
                </div>
              </div>
            ))}

          </div>}

      </div>
    </div>
  );
};

export default Page;
