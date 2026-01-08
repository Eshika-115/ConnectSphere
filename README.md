# ConnectSphere - Full-Stack Social Media Platform

ConnectSphere is a full-featured, responsive social media web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and powered by **Redux** for predictable global state management and **JWT** for secure user authentication.

---

> [!IMPORTANT]
> ### 🚀 Quick Evaluation & Demo Login Credentials
> Evaluators and reviewers can log in directly using the pre-seeded account to explore the dynamic timeline, posts, memes, and interactions:
>
> | Parameter | Value |
> | :--- | :--- |
> | **Email / Username** | `testing@gmail.com` |
> | **Password** | `password123` |
> | **Pre-configured Profile** | **Eshika Mathur** *(Cloud & Backend Engineer)* |
>
> *(Contains 20 realistic posts, developer memes, active follower network, and interactive like counts)*

---

## 📸 Application Preview

### 🏠 Dynamic Home Feed & Interactive Timeline
![ConnectSphere Home Feed](./screenshots/home_feed.png)

### 👤 User Profile & Social Network View
![ConnectSphere User Profile](./screenshots/profile_view.png)

---

## Key Features

- **User Authentication & Authorization**: Secure signup and login with hashed passwords via `bcrypt` and stateless session management with JSON Web Tokens (JWT).
- **Interactive Post Feed (Timeline)**: Dynamically displays posts from followed users alongside personal posts in chronological order.
- **Media Uploads**: Post photos and profile media handled via `Multer` with static serving.
- **Social Engagement**:
  - Like and unlike posts with real-time reaction counter.
  - Follow and unfollow users with dynamic follower/following statistics.
  - Suggested users carousel and dynamic profile cards.
- **Profile Management**: Customizable user profile including bio, location, relationship status, workplace, and profile/cover pictures.
- **Responsive UI**: Designed with modern CSS and Material-UI components for responsive layout on all devices.

---

## Tech Stack

### Frontend
- **React.js 18** (Functional components, Hooks)
- **Redux & Redux Thunk** (Global state management, asynchronous dispatching)
- **Material-UI (MUI) & Mantine** (UI components and icons)
- **Axios** (Configured HTTP client with base URL proxy)
- **React Router Dom v6** (Client-side routing and protected routes)

### Backend
- **Node.js & Express.js** (RESTful API architecture)
- **MongoDB & Mongoose ODM** (Document-based database modeling and queries)
- **JWT (jsonwebtoken)** (Stateless authorization middleware)
- **Bcrypt** (Secure password hashing and salting)
- **Multer** (Multipart/form-data file handling)
- **Cors & Body-Parser** (Middleware for secure cross-origin requests)

---

## System Architecture & Data Flow

```
[ React + Redux Client ] (Port 3000)
         |
         |  HTTP Requests (Axios)
         v
[ Express.js REST API ] (Port 4000)
    ├── /auth      -> Registration, Login, JWT Issuing
    ├── /user      -> Profile retrieval, Updates, Follow/Unfollow
    ├── /post      -> Post CRUD, Like/Unlike, Timeline Feed
    └── /upload    -> Multer file upload storage
         |
         v
[ MongoDB Database ] (Port 27017)
    ├── Users Collection
    └── Posts Collection
```

---

## REST API Reference

### Authentication (`/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user account |
| `POST` | `/auth/login` | Authenticate credentials and receive JWT |

### Users (`/user`)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/user/` | No | Fetch all registered users |
| `GET` | `/user/:id` | No | Fetch user profile by ID |
| `PUT` | `/user/:id` | Yes (JWT) | Update user profile data |
| `DELETE` | `/user/:id` | Yes (JWT) | Delete user account |
| `PUT` | `/user/:id/follow` | Yes (JWT) | Follow a specific user |
| `PUT` | `/user/:id/unfollow`| Yes (JWT) | Unfollow a specific user |

### Posts (`/post`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/post` | Create a new post |
| `GET` | `/post/:id` | Retrieve a single post by ID |
| `PUT` | `/post/:id` | Update an existing post |
| `DELETE` | `/post/:id` | Delete a post |
| `PUT` | `/post/:id/like_dislike` | Toggle like/unlike on a post |
| `GET` | `/post/:id/timeline` | Fetch combined timeline feed for a user |

### Uploads (`/upload`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/upload/` | Upload image file using Multer |

---

## Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) running locally or MongoDB Atlas connection URI

### 1. Backend Configuration
1. Navigate to the `Server` directory:
   ```bash
   cd Server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify or create `.env` file in `Server/.env`:
   ```env
   PORT = 4000
   MONGO_DB = mongodb+srv://eshikamathur01_db_user:r09ZJOIwvbm09HrM@cluster0.ngncqvg.mongodb.net/socialmedia?retryWrites=true&w=majority&appName=Cluster0
   JWT_KEY = socialmediasecretkey2024
   ```
4. Populate initial database with demo posts & test users:
   ```bash
   node seedData.js
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
   *The backend will start and listen on port 4000.*

### 2. Frontend Configuration
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will start on http://localhost:3000.*

---

## Developer
- **Author**: **Eshika Mathur**
- **GitHub**: [@Eshika-115](https://github.com/Eshika-115)
- **LinkedIn**: [Eshika Mathur](https://linkedin.com/in/eshika-mathur-0a8502265)
- **Email**: eshikamathur01@gmail.com