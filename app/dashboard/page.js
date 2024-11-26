"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  // Fetching users and roles when the page is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.users || []);
    };

    const fetchRoles = async () => {
      const response = await fetch("/api/roles");
      const data = await response.json();
      setRoles(data.roles || []);
    };

    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-6">
        <Button onClick={() => router.push("/users")} className="mr-4">
          Manage Users
        </Button>
        <Button onClick={() => router.push("/roles")} className="mr-4">
          Manage Roles
        </Button>
        <Button onClick={() => router.push("/permissions")}>
          Manage Permissions
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Users List</h2>
        <ul className="mt-4">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.name} - {user.email} - {user.role.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Roles List</h2>
        <ul className="mt-4">
          {roles.map((role) => (
            <li key={role.id} className="mb-2">
              {role.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
