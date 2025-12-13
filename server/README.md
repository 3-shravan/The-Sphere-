# 🌐 **The Sphere - Social Media Platform**

A full-stack social media platform built with Node.js, Express, React, and MongoDB. The platform features user authentication, post sharing, real-time messaging, group chats, and social interactions.

---

## 📋 **Table of Contents**

- [🚀 Features](#-features)
- [🏗️ Project Structure](#️-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🛠️ Environment Variables](#️-environment-variables)
- [📖 API Documentation](#-api-documentation)
  - [Authentication APIs](#authentication-apis)
  - [User APIs](#user-apis)
  - [Post APIs](#post-apis)
  - [Chat APIs](#chat-apis)
- [🔧 Technologies Used](#-technologies-used)
- [📝 License](#-license)

---

## 🚀 **Features**

### 🔐 **Authentication**

- User registration with email/phone verification
- Secure login with JWT tokens
- Password reset functionality
- OTP-based verification

### 👥 **User Management**

- Profile management with image uploads
- Follow/Unfollow system
- User blocking functionality
- Search and discover users

### 📱 **Posts & Feed**

- Create posts with images or text thoughts
- Like and save posts
- Comment system with nested replies
- Personalized feed and following feed

### 💬 **Real-time Messaging**

- One-on-one chat messaging
- Group chat functionality
- Image sharing in messages
- Message deletion

### 🎯 **Additional Features**

- Automated cleanup tasks
- Image optimization with Cloudinary
- Input validation and error handling
- CORS support for web clients

---

## 🏗️ **Project Structure**

```
THE SPHERE/
├── client/                    # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                    # Node.js backend application
│   ├── src/
│   │   ├── Automation/        # Cron jobs and cleanup tasks
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   │   ├── chats/
│   │   │   └── feed/
│   │   ├── db/                # Database connection
│   │   ├── middlewares/       # Custom middleware
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── user/
│   │   │   ├── chats/
│   │   │   └── feed/
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helper functions
│   │   └── validations/       # Input validation schemas
│   ├── server.js              # Entry point
│   └── package.json
└── README.md
```

---

## ⚙️ **Installation & Setup**

### **Prerequisites**

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)
- Email service (for notifications)
- Twilio account (for SMS/phone verification)

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd THE\ SPHERE
```

### **2. Backend Setup**

```bash
cd server
npm install
```

### **3. Frontend Setup**

```bash
cd ../client
npm install
```

### **4. Environment Configuration**

Create `server/src/config/config.env` file with the required environment variables (see below).

### **5. Run the Application**

**Development Mode:**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

**Production Mode:**

```bash
# Backend
cd server
npm start

# Frontend (build first)
cd client
npm run build
npm run preview
```

---

## 🛠️ **Environment Variables**

Create `server/src/config/config.env` file with the following variables:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
COMPASS_MONGO_URI=mongodb://localhost:27017/the-sphere
ATLAS_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Client URLs (for CORS)
LOCAL_HOST_URL=http://localhost:5173
BUILD_PREVIEW__URL=http://localhost:4173
CLIENT_URL= (soon)

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Twilio (SMS/Phone Verification)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 📖 **API Documentation**

### **Base URL**

```
http://localhost:8000/api/v1
```

---

## **Authentication APIs**

### **🔐 Register User**

Creates a new user account with email or phone verification.

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "name": "john_doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123",
  "verificationMethod": "email"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Verification code sent to john@example.com"
}
```

---

### **✅ Verify OTP**

Verifies the OTP sent during registration.

**Endpoint:** `POST /auth/verify-otp`

**Request Body:**

```json
{
  "email": "john@example.com",
  "otp": 123456
}
```

**Response:**

```json
{
  "success": true,
  "message": "Account Successfully Verified",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "john_doe",
    "email": "john@example.com",
    "accountVerified": true
  }
}
```

---

### **🔑 Login User**

Authenticates user and returns JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login Successfull",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### **🚪 Logout User**

Invalidates the current JWT token.

**Endpoint:** `GET /auth/logout`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### **👤 Get User Profile**

Retrieves current user's profile information.

**Endpoint:** `GET /auth/profile`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "john_doe",
    "email": "john@example.com",
    "profilePicture": "https://cloudinary.com/image.jpg"
  }
}
```

---

### **🔄 Forgot Password**

Initiates password reset process.

**Endpoint:** `POST /auth/forget-password`

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Reset password link is sent to john@example.com"
}
```

---

### **📱 Verify Reset Password OTP**

Verifies OTP for phone-based password reset.

**Endpoint:** `POST /auth/forget-password/verify-otp`

**Request Body:**

```json
{
  "phone": "+1234567890",
  "otp": 123456
}
```

**Response:**

```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

---

### **🔐 Reset Password (Email)**

Resets password using email token.

**Endpoint:** `PUT /auth/reset-password/email/:token`

**Request Body:**

```json
{
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### **📞 Reset Password (Phone)**

Resets password using phone verification.

**Endpoint:** `PUT /auth/reset-password/phone/:phone`

**Request Body:**

```json
{
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

---

## **User APIs**

### **👥 Get All Users**

Retrieves list of users with optional search.

**Endpoint:** `GET /users?search=john`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": {
    "users": [
      {
        "_id": "user_id",
        "name": "john_doe",
        "profilePicture": "https://cloudinary.com/image.jpg",
        "followers": [],
        "following": []
      }
    ]
  }
}
```

---

### **💡 Get Suggested Users**

Retrieves suggested users to follow.

**Endpoint:** `GET /users/suggested`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **👤 Get My Profile**

Retrieves current user's complete profile with posts.

**Endpoint:** `GET /users/profile`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Profile fetched",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "john_doe",
      "email": "john@example.com",
      "profilePicture": "https://cloudinary.com/image.jpg",
      "posts": [],
      "followers": [],
      "following": []
    }
  }
}
```

---

### **👀 Get User Profile by Username**

Retrieves another user's profile.

**Endpoint:** `GET /users/profile/:username`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **✏️ Update Profile**

Updates user profile information and picture.

**Endpoint:** `PUT /users/update`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

```
name: john_doe_updated
fullName: John Doe Updated
bio: Software developer
gender: male
dob: 1990-01-15
profilePicture: <image_file>
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "john_doe_updated",
      "fullName": "John Doe Updated",
      "bio": "Software developer"
    }
  }
}
```

---

### **➕ Follow/Unfollow User**

Follow or unfollow another user.

**Endpoint:** `PUT /users/:id/follow`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Followed successfully"
}
```

---

### **🚫 Block/Unblock User**

Block or unblock another user.

**Endpoint:** `PUT /users/:id/block`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **🗑️ Delete Profile Picture**

Removes user's profile picture.

**Endpoint:** `DELETE /users/profile-picture`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **❌ Delete Account**

Permanently deletes user account.

**Endpoint:** `DELETE /users/delete`

**Headers:**

```
Authorization: Bearer <token>
```

---

## **Post APIs**

### **📋 Get All Posts**

Retrieves all posts with pagination.

**Endpoint:** `GET /posts?page=1&limit=10`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Posts fetched successfully",
  "data": {
    "posts": [
      {
        "_id": "post_id",
        "author": {
          "_id": "user_id",
          "name": "john_doe",
          "profilePicture": "https://cloudinary.com/image.jpg"
        },
        "caption": "Beautiful sunset!",
        "media": "https://cloudinary.com/post-image.jpg",
        "likes": [],
        "comments": [],
        "createdAt": "2024-01-15T12:00:00.000Z"
      }
    ],
    "currentPage": 1,
    "totalPages": 5,
    "hasMore": true
  }
}
```

---

### **👥 Get Following Posts**

Retrieves posts from followed users.

**Endpoint:** `GET /posts/following?page=1&limit=10`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **💾 Get Saved Posts**

Retrieves user's saved posts.

**Endpoint:** `GET /posts/saved`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **📝 Get My Posts**

Retrieves current user's posts.

**Endpoint:** `GET /posts/me?page=1&limit=10`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **🔍 Get Post by ID**

Retrieves a specific post by ID.

**Endpoint:** `GET /posts/:postId`

**Response:**

```json
{
  "success": true,
  "message": "Post fetched successfully",
  "data": {
    "post": {
      "_id": "post_id",
      "author": {
        "_id": "user_id",
        "name": "john_doe",
        "profilePicture": "https://cloudinary.com/image.jpg"
      },
      "caption": "Beautiful sunset!",
      "media": "https://cloudinary.com/post-image.jpg",
      "likes": [],
      "isSaved": false
    }
  }
}
```

---

### **📷 Create New Post**

Creates a new post with image.

**Endpoint:** `POST /posts`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

```
image: <image_file>
caption: Beautiful sunset at the beach!
location: Miami Beach
tags: ["sunset", "beach", "photography"]
```

**Response:**

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": {
      "_id": "new_post_id",
      "author": {
        "_id": "user_id",
        "name": "john_doe",
        "profilePicture": "https://cloudinary.com/image.jpg"
      },
      "caption": "Beautiful sunset at the beach!",
      "media": "https://cloudinary.com/new-post-image.jpg",
      "location": "Miami Beach",
      "tags": ["sunset", "beach", "photography"]
    }
  }
}
```

---

### **💭 Create Thought Post**

Creates a text-only thought post.

**Endpoint:** `POST /posts/thought`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "thoughts": "Just had an amazing day! Life is beautiful. 🌟"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thought shared successfully",
  "data": {
    "post": {
      "_id": "thought_post_id",
      "author": {
        "_id": "user_id",
        "name": "john_doe",
        "profilePicture": "https://cloudinary.com/image.jpg"
      },
      "postType": "thought",
      "thoughts": "Just had an amazing day! Life is beautiful. 🌟",
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

---

### **✏️ Update Post**

Updates an existing post.

**Endpoint:** `PUT /posts/:postId`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

```
caption: Updated caption for my post
location: Updated Location
tags: ["updated", "tags"]
image: <new_image_file> (optional)
```

---

### **❤️ Like/Unlike Post**

Likes or unlikes a post.

**Endpoint:** `PUT /posts/:postId/like`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Post liked successfully"
}
```

---

### **💾 Save/Unsave Post**

Saves or unsaves a post.

**Endpoint:** `PUT /posts/:postId/save`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Post saved successfully"
}
```

---

### **🗑️ Delete Post**

Deletes a post.

**Endpoint:** `DELETE /posts/:postId`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

## **Comment APIs**

### **💬 Get Post Comments**

Retrieves all comments for a post.

**Endpoint:** `GET /posts/:postId/comments`

**Response:**

```json
{
  "success": true,
  "message": "Comments fetched successfully",
  "data": {
    "comments": [
      {
        "_id": "comment_id",
        "comment": "Great post!",
        "author": {
          "_id": "user_id",
          "name": "jane_doe",
          "profilePicture": "https://cloudinary.com/image.jpg"
        },
        "replies": [
          {
            "_id": "reply_id",
            "comment": "Thanks!",
            "author": {
              "_id": "post_author_id",
              "name": "john_doe",
              "profilePicture": "https://cloudinary.com/image.jpg"
            },
            "replies": []
          }
        ],
        "createdAt": "2024-01-15T12:00:00.000Z"
      }
    ]
  }
}
```

---

### **➕ Add Comment**

Adds a comment to a post.

**Endpoint:** `POST /posts/:postId/comments`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "comment": "Great post! Love the sunset.",
  "parentId": null
}
```

**Response:**

```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "comment": {
      "_id": "new_comment_id",
      "comment": "Great post! Love the sunset.",
      "author": {
        "_id": "user_id",
        "name": "jane_doe",
        "profilePicture": "https://cloudinary.com/image.jpg"
      },
      "post": "post_id",
      "parentComment": null,
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

---

### **🗑️ Delete Comment**

Deletes a comment.

**Endpoint:** `DELETE /posts/:postId/comments/:commentId`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

---

## **Chat APIs**

### **🔗 Get Connections**

Retrieves all chat connections/conversations.

**Endpoint:** `GET /chats/connections`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Chats fetched successfully",
  "data": {
    "connections": [
      {
        "_id": "chat_id",
        "isGroupChat": false,
        "users": [
          {
            "_id": "other_user_id",
            "name": "jane_doe",
            "profilePicture": "https://cloudinary.com/image.jpg"
          }
        ],
        "lastMessage": {
          "_id": "message_id",
          "content": "Hello there!",
          "sender": {
            "_id": "sender_id",
            "name": "jane_doe",
            "profilePicture": "https://cloudinary.com/image.jpg"
          },
          "createdAt": "2024-01-15T12:00:00.000Z"
        },
        "updatedAt": "2024-01-15T12:00:00.000Z"
      }
    ]
  }
}
```

---

### **💬 Get Chat**

Retrieves a specific chat by ID.

**Endpoint:** `GET /chats/:chatId?includeMessages=true`

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

- `includeMessages`: (optional) Set to `true` to include recent messages

**Response:**

```json
{
  "success": true,
  "message": "Chat fetched successfully",
  "data": {
    "chat": {
      "_id": "chat_id",
      "isGroupChat": false,
      "users": [
        {
          "_id": "user_id",
          "name": "john_doe",
          "profilePicture": "https://cloudinary.com/image.jpg"
        },
        {
          "_id": "other_user_id",
          "name": "jane_doe",
          "profilePicture": "https://cloudinary.com/image.jpg"
        }
      ],
      "messages": [
        {
          "_id": "message_id",
          "content": "Hello!",
          "sender": {
            "_id": "sender_id",
            "name": "jane_doe",
            "profilePicture": "https://cloudinary.com/image.jpg"
          },
          "createdAt": "2024-01-15T12:00:00.000Z"
        }
      ]
    }
  }
}
```

---

### **🗑️ Delete Chat**

Deletes a private chat.

**Endpoint:** `POST /chats/:chatId`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Chat deleted successfully"
}
```

---

## **Message APIs**

### **📋 Fetch Messages**

Retrieves messages from a chat with pagination.

**Endpoint:** `GET /chats/messages/:chatId?page=1&limit=50`

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Messages per page (default: 50)

**Response:**

```json
{
  "success": true,
  "message": "Messages fetched successfully",
  "data": {
    "messages": [
      {
        "_id": "message_id",
        "content": "Hello there!",
        "sender": {
          "_id": "sender_id",
          "name": "jane_doe",
          "profilePicture": "https://cloudinary.com/image.jpg"
        },
        "media": null,
        "createdAt": "2024-01-15T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "hasMore": false
    }
  }
}
```

---

### **📤 Send Message**

Sends a message to a user or group chat.

**Endpoint:** `POST /chats/messages/:receiverId`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

```
content: Hello! How are you doing?
image: <image_file> (optional)
```

**Response:**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "message": {
      "_id": "new_message_id",
      "content": "Hello! How are you doing?",
      "sender": {
        "_id": "sender_id",
        "name": "john_doe",
        "profilePicture": "https://cloudinary.com/image.jpg"
      },
      "chat": "chat_id",
      "media": null,
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

---

### **🗑️ Delete Message**

Deletes a message.

**Endpoint:** `DELETE /chats/messages/:messageId`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

## **Group Chat APIs**

### **👥 Create Group Chat**

Creates a new group chat.

**Endpoint:** `POST /chats/group`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

```
groupName: My Awesome Group
groupDescription: A group for awesome people
users: ["user_id_1", "user_id_2", "user_id_3"]
groupPicture: <image_file> (optional)
```

**Response:**

```json
{
  "success": true,
  "message": "Group chat created successfully",
  "data": {
    "groupChat": {
      "_id": "group_chat_id",
      "groupName": "My Awesome Group",
      "groupDescription": "A group for awesome people",
      "groupPicture": "https://cloudinary.com/group-image.jpg",
      "isGroupChat": true,
      "users": [
        {
          "_id": "user_id",
          "name": "john_doe",
          "profilePicture": "https://cloudinary.com/image.jpg"
        }
      ],
      "admins": [
        {
          "_id": "user_id",
          "name": "john_doe",
          "profilePicture": "https://cloudinary.com/image.jpg"
        }
      ],
      "groupCreatedBy": {
        "_id": "user_id",
        "name": "john_doe",
        "profilePicture": "https://cloudinary.com/image.jpg"
      }
    }
  }
}
```

---

### **✏️ Update Group**

Updates group name and description.

**Endpoint:** `PATCH /chats/:chatId`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "groupName": "Updated Group Name",
  "groupDescription": "Updated description"
}
```

---

### **🖼️ Change Group Picture**

Updates group picture.

**Endpoint:** `PATCH /chats/:chatId/picture`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

```
groupPicture: <image_file>
```

---

### **➕ Add Members to Group**

Adds new members to group.

**Endpoint:** `PATCH /chats/:chatId/members`

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "users": ["user_id_1", "user_id_2"]
}
```

---

### **➖ Remove Member from Group**

Removes a member from group.

**Endpoint:** `PATCH /chats/:chatId/members/:userId`

**Headers:**

```
Authorization: Bearer <token>
```

---

### **👑 Update Admin Status**

Adds or removes admin privileges.

**Endpoint:** `PATCH /chats/:chatId/admins/:userId`

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "User added as admin successfully"
}
```

---

## 🔧 **Technologies Used**

### **Backend**

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Joi** - Input validation
- **Multer** - File uploads
- **Sharp** - Image processing
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Twilio** - SMS service
- **Node-cron** - Scheduled tasks
- **bcrypt** - Password hashing

### **Frontend**

- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Query** - Data fetching
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Radix UI** - UI components
- **Vite** - Build tool
- **PWA** - Progressive Web App

---

## 📝 **License**

This project is licensed under the ISC License.

---

## 👨‍💻 **Author**

**Shravan Yadav**

---

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 **Issues**

If you encounter any issues, please create an issue on GitHub with a detailed description of the problem.

---

## 📞 **Support**

For support and questions, please contact the development team.

---

_Last updated: January 2024_
