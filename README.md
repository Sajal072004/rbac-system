# VRV Security Project

This is a Next.js application developed for an assignment at **VRV Security**. The project consists of both a frontend and backend that work together to provide a secure and responsive web application.

## Deployment

The project is deployed and can be accessed at the following URL:

[**Deployed Application**](https://rbac-system-plum.vercel.app/)

You can visit the link to see the live version of the application.

[**Video Demo**]((https://youtu.be/IWG3U4UnJjs))




#Frontend
The frontend is built using Next.js, providing a modern and responsive user interface. Key features of the frontend include:

A clean and simple design optimized for both desktop and mobile users.
A dynamic layout that adjusts based on user roles and permissions.
Integration with the backend for secure data fetching.

#Folder Structure
The app/ folder contains pages, components, and styles for the frontend.

#Backend
The backend is built using Node.js and communicates with a PostgreSQL database. It handles user authentication, role management, and data operations securely.

#Database Configuration
In the .env file, you will find the following environment variables used for connecting to the PostgreSQL database and setting up JWT authentication:

```bash
DATABASE_URL="your url"
JWT_SECRET="secret_key"

```

DATABASE_URL: This is the connection string used to connect to the PostgreSQL database.
JWT_SECRET: This secret key is used for signing and verifying JSON Web Tokens (JWT) for secure authentication.


## About the Project

This project is focused on providing a secure web application with the following features:

- **User Authentication**: A secure login and registration system using JWT tokens.
- **Role-Based Access Control**: Different user roles (e.g., Admin, User) with distinct permissions.
- **Dynamic User Interface**: The frontend adapts based on the user's role, offering an intuitive user experience.

### Detailed Working

#### **Authentication System**

The authentication system is built using **JWT (JSON Web Tokens)** for secure user login and registration. Here is how the authentication flow works:

1. **Signup Process**:
   - During the registration, users can choose their role. For demo purposes, users can sign up as an **Admin** or a **User**.
   - The password entered by the user is **hashed** using a secure hashing algorithm (such as bcrypt) before being stored in the database.
   - The hashed password ensures that even if the database is compromised, user passwords remain secure.

2. **Login Process**:
   - After signing up, users can log in using their credentials (email and password).
   - When a user logs in, the system compares the entered password with the hashed password stored in the database.
   - If the credentials are valid, the system generates a **JWT token** and returns it to the user.
   - This JWT token is then stored on the client-side (typically in the browser's localStorage or cookies), and it is used for authenticating the user on subsequent requests.

#### **Role-Based Access Control (RBAC)**

Role-based access control is implemented to differentiate between users with different permissions:

- **Admin**: Admin users have the highest level of control over the application. They can view and manage other users, including changing their roles.
- **User**: Regular users have limited access, typically only to their own data and actions.

When a user logs in, the backend checks their assigned role and returns relevant data based on their permissions. For example:

- Regular users can only see their own data.
- Admin users can access a special **admin dashboard** that displays all users and allows them to modify user roles.

#### **Admin Controls**

If the logged-in user is an **Admin**, they are given access to a special section of the application where they can perform the following actions:

- **View All Users**: Admins can view a list of all registered users in the system.
- **Change User Roles**: Admins can modify the roles of other users. For example, they can upgrade a user to an Admin role or demote an Admin to a regular user.

The admin interface includes a list of users, each with a dropdown menu to change their role. The user list and roles are dynamically fetched from the backend and displayed in the UI.

### Summary

- **JWT Authentication**: Ensures secure login and registration with hashed passwords and JWT tokens.
- **Role Selection During Signup**: Users can choose to sign up as an Admin or a regular User.
- **Admin Controls**: Admin users can view and modify the roles of other users.

---

## Future Enhancements

- **Additional Roles**: Introduce more roles with specific permissions to allow finer-grained access control.
- **Password Reset**: Implement a password reset functionality for users who forget their password.
- **User Profile Management**: Allow users to update their profile information, such as their name, email, and password.
- **Audit Logs**: Introduce logging of user actions, especially for Admin users, to track any changes made to user roles or data.

---




You can easily deploy this app on Vercel, the platform created by the creators of Next.js:

Deploy on Vercel
For more information on deploying your app, refer to the Next.js Deployment Documentation.


