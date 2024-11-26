"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // Effect to check authentication and fetch the current user
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      router.push("/");
    }
  }, [router]);

  // Effect to fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}`);
          const data = await response.json();
          setCurrentUser(data || null);

          if (data?.role?.id) {
            const roleResponse = await fetch(
              `/api/roles/${data.role.id}/permissions`
            );
            const roleData = await roleResponse.json();
            setRolePermissions(roleData.permissions || []);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []); // Only run once when the component mounts

  // Effect to fetch users data, excluding the current user
  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      if (currentUser) {
        try {
          const usersResponse = await fetch("/api/users");
          const usersData = await usersResponse.json();

          const filteredUsers = usersData.filter(
            (user) => user.id !== currentUser.id // Exclude the current user
          );
          setUsers(filteredUsers || []);
        } catch (error) {
          console.error("Error fetching users or roles:", error);
        }
      }
    };

    fetchUsersAndRoles();
  }, [currentUser]); // This runs every time `currentUser` changes

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    router.push("/");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="w-full flex flex-wrap justify-between items-center p-4 sm:p-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center sm:text-left w-full sm:w-auto">
            Dashboard
          </h1>
          <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-blue-500 transition-all shadow-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="relative z-10 p-6 flex-grow rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-6">Current User</h2>
              {currentUser ? (
                <>
                  <p>Name: {currentUser.name}</p>
                  <p>Email: {currentUser.email}</p>
                  <p>Role: {currentUser.role?.name}</p>
                </>
              ) : (
                <p>Loading user information...</p>
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg bg-opacity-50 text-center">
              <h2 className="text-xl font-semibold mb-6">User Permissions</h2>
              {currentUser?.role?.name !== "Admin" && rolePermissions.length > 0 ? (
                <ul>
                  {rolePermissions.map((permission, index) => (
                    <li key={index} className="mb-2">
                      {permission.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p></p>
              )}
              {currentUser?.role?.name === "Admin" && (
                <p>As an admin you have all the permissions</p>
              )}
            </div>
          </div>

          {currentUser?.role?.name === "Admin" && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Admin Controls</h2>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Link href={"/dashboard"}>
                  <h3 className="text-xl font-semibold mb-6 underline">
                    Manage Roles
                  </h3>
                </Link>

                <table className="min-w-full bg-gray-700 rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Delete User</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-600">
                          <td className="px-4 py-2">
                            <div className="flex flex-col items-center">
                              <p>{user.name}</p>
                              <p className="text-sm text-gray-300">
                                {user.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-500 transition-all"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-4 py-2 text-center">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
