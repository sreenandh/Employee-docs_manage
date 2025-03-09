Employee Document Management System – Secure Document Manager
Employee Document Management System is a full-stack web application designed to securely manage employee documents. It provides a robust platform for employees to upload, categorize, and download their personal documents while ensuring data protection and secure access. An intuitive admin dashboard enables streamlined oversight of document records and user activity.

Features
Secure User Authentication:
Users register and log in with secure JWT-based authentication. Passwords are hashed using bcrypt, and tokens are stored in local storage to maintain persistent sessions.

Document Uploads with Metadata:
Employees can upload documents along with metadata such as category, file size, and file type. File uploads are managed by Multer and stored on AWS S3, ensuring scalable and reliable storage of documents.

Dynamic Document Listing & Secure Downloads:
Users can view a list of their uploaded documents, complete with details like filename, category, and upload date. Secure, temporary download links (generated via signed URLs) ensure that documents can be safely accessed only by authorized users.

Admin Dashboard:
An admin panel provides comprehensive management of document records and user activity, ensuring that document handling remains efficient and secure.

Responsive Design:
The application features a modern, responsive React interface built with Vite and SCSS, ensuring an optimal user experience on any device.

Technologies
Backend:

Node.js, Express
MongoDB, Mongoose
JWT, bcrypt
Multer, AWS S3
Frontend:

React, Vite
React Router, SCSS
Fetch API, axios
Overview
The Employee Document Management System leverages a modern tech stack to provide a secure and scalable solution for managing employee documents. On the backend, Express handles API requests while MongoDB stores document metadata. AWS S3 is used for secure file storage, and JWT-based authentication ensures that only authorized users can access protected routes. The React-based frontend delivers a dynamic and responsive user interface, enabling employees to easily upload, view, and download documents, with an admin dashboard for overall system management.
