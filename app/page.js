"use client";

import { useRouter } from "next/navigation";

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
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-green-500 transition-all shadow-lg"
              onClick={handleSignupClick}
            >
              Signup
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center text-center gap-4 sm:gap-8 p-6 sm:p-12 mx-4 sm:mx-auto max-w-4xl mt-4 sm:mt-12">
          <p className="text-xl sm:text-2xl font-semibold">
            Secure and Streamlined Role-Based Access Control (RBAC) for Your
            Organization.
          </p>
          <ul className="text-base sm:text-lg font-medium text-left space-y-2 sm:space-y-4 list-disc pl-6">
            <li>Effortlessly manage user roles and permissions.</li>
            <li>Provide scalable access tailored to employees and teams.</li>
            <li>Ensure secure and role-based access to resources.</li>
            <li>Enhance team productivity with streamlined management.</li>
            <li>Customizable solutions for organizations of any size.</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 w-full justify-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-500 transition-all shadow-lg"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gray-500 transition-all shadow-lg"
              onClick={handleSignupClick}
            >
              Know More
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
