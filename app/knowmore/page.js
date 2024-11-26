"use client";

import { useRouter } from "next/navigation";

export default function KnowMore() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      {/* Background Mask */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full flex flex-wrap justify-between items-center p-4 sm:p-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center sm:text-left w-full sm:w-auto">
            Welcome to RoleAccess
          </h1>
          <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-blue-500 transition-all shadow-lg"
              onClick={() => router.push("/")}>
              Homepage
            </button>
          </div>
        </header>

        {/* "Know More" Information Section */}
        <div className="relative z-10 flex justify-center items-center flex-grow py-8">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg sm:w-[90%] md:w-[60%] bg-opacity-90">
            <h2 className="text-2xl font-bold mb-6">About RoleAccess</h2>
            <p className="text-md mb-4">
              RoleAccess is a platform designed to streamline role management and access controls in organizations.
              Our platform allows you to manage different roles within your team, assign specific permissions, and ensure that everyone has access to the resources they need. Whether you're a regular user or an admin, we make it easy to manage your tasks, projects, and teams effectively.
            </p>
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 text-md">
              <li>User role management (Admin, User)</li>
              <li>Seamless project and task assignments</li>
              <li>Customizable user access controls</li>
              <li>Easy-to-use interface with modern UI</li>
            </ul>
            <p className="text-md mt-4">
              This platform is designed to help you manage your work efficiently and securely. By creating and assigning roles, you can ensure that sensitive data and resources are only accessible to the right people.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
