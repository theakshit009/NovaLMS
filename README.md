# 🚀 NovaLMS — Full Stack Learning Management System

NovaLMS is a fully functional, full-stack **Learning Management System** built with modern web technologies like **React**, **Node.js**, **MongoDB**, **Stripe**, and **Clerk**. It allows mentors to create structured video courses and students to enroll, preview, and track their learning progress with ease.

---

## 🧠 Features

- 🔐 **Clerk Authentication (JWT + OAuth + Session)**
- 💳 **Stripe Payment Integration**
- 👥 **Role-based Access** for Mentors & Students
- 🧑‍🏫 **Mentor Dashboard** for creating courses, chapters, and lectures
- 🎬 **Lecture Playback** using YouTube Player (with preview support)
- ✅ **Course Progress Tracking** per student
- ⭐ **Rate & Review System**
- 📱 **Responsive UI** (Mobile & Desktop)
- 🧪 **Secure, Scalable API Architecture**

---

## 📸 Preview

(https://github.com/theakshit009/NovaLMS/issues/1#issue-3285575196)

---

## 🛠️ Tech Stack

| Tech            | Role                          |
|-----------------|-------------------------------|
| React           | Frontend UI                   |
| Node.js         | Backend runtime               |
| Express.js      | REST API framework            |
| MongoDB         | NoSQL database                |
| Stripe          | Payment gateway integration   |
| Clerk           | Auth & session management     |
| YouTube iFrame API | Video player integration  |

---

## 📦 Project Structure

```bash
NovaLMS/
├── Frontend/         # React frontend
├── Backend/         # Node.js backend (Express + MongoDB)
├── package.json    # Dependencies
└── README.md       # You're here!
```

---

## 🚀 Getting Started (Local Development)

1. Clone the Repo
   ```bash
   git clone https://github.com/theakshit009/NovaLMS
   cd NovaLMS
   ```
2. Set Up Backend
   ```bash
   cd server
   npm install
   npm run dev
   ```
🔑 Create a .env file with:
    ```bash
    MONGO_URI=your_mongodb_uri
    STRIPE_SECRET_KEY=your_stripe_secret_key
    CLERK_SECRET_KEY=your_clerk_secret
    CLERK_PUBLISHABLE_KEY=your_clerk_publishable
    ```
3. Set Up Frontend
  ```bash
    cd client
    npm install
    npm run dev
  ```
🔑 Create a .env file with:
  ```bash
    VITE_BACKEND_URL=http://localhost:5000
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable
  ```

---


## 🌐 Live Demo
🎯 Deployed Link https://nova-lms-frontrend.vercel.app/

---

## 🤝 Contribution
Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

---

## Built with ❤️ by Akshit Panchal



