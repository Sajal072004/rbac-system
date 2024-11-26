"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white -mt-40"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      {/* Background Mask */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 sm:p-6 z-10">
        <h1 className="text-4xl font-extrabold">Welcome to RoleAccess</h1>
        <div className="flex gap-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition-all shadow-lg"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-all shadow-lg"
            onClick={handleSignupClick}
          >
            Signup
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex flex-col items-center text-center gap-8 sm:gap-12 p-8 sm:p-12 rounded-lg mx-4 sm:mx-auto max-w-4xl z-10 mt-32 sm:mt-40">
        <p className="text-2xl sm:text-3xl font-semibold sm:mt-32 md:mt-32">
          Secure and Streamlined Role-Based Access Control (RBAC) for Your
          Organization.
        </p>
        <ul className="text-lg sm:text-xl font-medium text-left space-y-4 list-disc pl-6">
          <li>Effortlessly manage user roles and permissions.</li>
          <li>Provide scalable access tailored to employees and teams.</li>
          <li>Ensure secure and role-based access to resources.</li>
          <li>Enhance team productivity with streamlined management.</li>
          <li>Customizable solutions for organizations of any size.</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-all shadow-lg"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-500 transition-all shadow-lg"
            onClick={handleSignupClick}
          >
            Know More
          </button>
        </div>
      </main>
    </div>
  );
}
