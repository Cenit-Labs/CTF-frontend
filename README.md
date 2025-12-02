# Learning Gamification Platform - Complete Architecture & API Specification

**Project**: Campus Learning Community with Gamified Experience  
**Stack**: Node.js (Backend) | Next.js (Frontend) | MongoDB (Database)  
**Status**: MVP | Date: Dec 2024

---

## 1. HIGH-LEVEL SYSTEM ARCHITECTURE

### 1.1 Architecture Diagram (Text)

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT TIER                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js Frontend (Client-Side Rendering + SSR)      │   │
│  │  - Auth Pages (Login, Google OAuth)                  │   │
│  │  - Dashboard (Personalized)                          │   │
│  │  - Learning Path Grid (Candy Crush-style)           │   │
│  │  - Leaderboard (Ranking System)                      │   │
│  │  - Campus Community Feed                            │   │
│  │  - Profile (Badges, Rewards)                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ (HTTP/REST)
┌─────────────────────────────────────────────────────────────┐
│                    GATEWAY TIER                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Gateway / Rate Limiter                          │   │
│  │  - JWT Validation                                    │   │
│  │  - Request Logging                                  │   │
│  │  - CORS Handling                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ (Internal)
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Node.js Express API Server                          │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Auth Service (JWT, Google OAuth)              │  │   │
│  │  │ User Service (Profile, Stats)                 │  │   │
│  │  │ Learning Path Engine (Progress Tracking)      │  │   │
│  │  │ Gamification Service (Badges, Rewards)        │  │   │
│  │  │ Ranking & Leaderboard Service                 │  │   │
│  │  │ Community Service (Posts, Comments)           │  │   │
│  │  │ CTF Enquiry Service (Optional)                │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │ Cache Layer (Redis)                           │  │   │
│  │  │ - Leaderboard Cache (sorted sets)             │  │   │
│  │  │ - Session Cache                               │  │   │
│  │  │ - Rate limit counters                         │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ (Mongoose ODM)
┌─────────────────────────────────────────────────────────────┐
│                    DATA TIER                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MongoDB (NoSQL Document Store)                      │   │
│  │  - Users Collection                                 │   │
│  │  - Learning Paths Collection                        │   │
│  │  - User Progress Collection                         │   │
│  │  - Badges Collection                                │   │
│  │  - Rewards Collection                               │   │
│  │  - Community Posts Collection                       │   │
│  │  - Rankings View (aggregated)                       │   │
│  │  - CTF Enquiries Collection (optional)              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Architecture Rationale

- **Monolithic with Modular Services**: Single Node.js instance with service-oriented modules. Scales to microservices later if needed.
- **Redis Caching**: Essential for leaderboard queries and rate limiting.
- **JWT + OAuth**: Stateless auth; no session server overhead.
- **MongoDB Document Model**: Flexible schema for evolving requirements; denormalization for read performance.

---

## 2. FOLDER & COMPONENT STRUCTURE

### 2.1 Backend (Node.js + Express)

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js           # MongoDB connection
│   │   ├── redis.js             # Redis client
│   │   ├── google-oauth.js       # Google OAuth config
│   │   └── constants.js          # APP_URL, JWT_SECRET, etc.
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Global error handling
│   │   ├── rateLimiter.js       # Rate limiting (Redis-backed)
│   │   └── requestLogger.js     # Request/response logging
│   │
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── LearningPath.js
│   │   ├── Badge.js
│   │   ├── Reward.js
│   │   ├── UserProgress.js
│   │   ├── CommunityPost.js
│   │   ├── CTFEnquiry.js
│   │   └── index.js             # Export all models
│   │
│   ├── services/
│   │   ├── authService.js       # Login, register, token generation
│   │   ├── userService.js       # User CRUD, stats
│   │   ├── learningPathService.js
│   │   ├── gamificationService.js # Badge logic, reward calc
│   │   ├── rankingService.js    # Leaderboard computation
│   │   ├── communityService.js  # Posts, comments
│   │   └── ctfService.js        # CTF enquiry logic
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── learningPathController.js
│   │   ├── gamificationController.js
│   │   ├── rankingController.js
│   │   ├── communityController.js
│   │   └── ctfController.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── learning.js
│   │   ├── gamification.js
│   │   ├── community.js
│   │   ├── ctf.js
│   │   └── index.js             # Main router aggregator
│   │
│   ├── utils/
│   │   ├── validators.js        # Input validation schemas
│   │   ├── tokenManager.js      # JWT sign/verify
│   │   ├── errors.js            # Custom error classes
│   │   └── helpers.js
│   │
│   ├── jobs/                     # Optional: scheduled tasks
│   │   ├── rankingRecalculation.js
│   │   └── scheduler.js
│   │
│   └── app.js                    # Express app factory
│
├── .env.example
├── .env.local                    # Local env vars
├── package.json
└── server.js                     # Entry point

```

### 2.2 Frontend (Next.js)

```
frontend/
├── app/                          # App Router (Next.js 13+)
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx         # Login form + Google OAuth
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── page.tsx         # OAuth redirect handler
│   │
│   ├── (authenticated)/
│   │   ├── layout.tsx           # Protected layout
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Personalized dashboard
│   │   ├── learning/
│   │   │   ├── page.tsx         # Learning path grid
│   │   │   ├── [pathId]/
│   │   │   │   ├── page.tsx     # Path details
│   │   │   │   └── [levelId]/
│   │   │   │       └── page.tsx # Level content
│   │   ├── leaderboard/
│   │   │   └── page.tsx         # Rankings
│   │   ├── community/
│   │   │   ├── page.tsx         # Feed
│   │   │   └── [postId]/
│   │   │       └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx         # User profile + badges
│   │   └── ctf-enquiry/         # Optional
│   │       └── page.tsx
│   │
│   ├── api/                      # API routes (optional, for internal use)
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts     # OAuth callback handler
│   │
│   └── layout.tsx               # Root layout
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── GoogleOAuthButton.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── learning/
│   │   ├── LearningPathGrid.tsx  # Candy Crush-style grid
│   │   ├── LevelCard.tsx
│   │   ├── LevelProgressBar.tsx
│   │   └── LevelContent.tsx
│   │
│   ├── gamification/
│   │   ├── BadgeDisplay.tsx
│   │   ├── RewardNotification.tsx
│   │   ├── ProgressRing.tsx
│   │   └── AchievementModal.tsx
│   │
│   ├── community/
│   │   ├── PostCard.tsx
│   │   ├── PostForm.tsx
│   │   ├── CommentThread.tsx
│   │   └── Feed.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── NavBar.tsx
│   │
│   └── common/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── LoadingSpinner.tsx
│
├── hooks/
│   ├── useAuth.ts               # Auth context
│   ├── useLearningPath.ts       # Fetch + cache learning paths
│   ├── useLeaderboard.ts        # Fetch rankings (with polling)
│   └── useUser.ts               # User profile + stats
│
├── lib/
│   ├── api.ts                   # Axios instance + interceptors
│   ├── auth.ts                  # Auth logic (JWT storage)
│   ├── validation.ts            # Client-side validators
│   └── helpers.ts
│
├── context/
│   ├── AuthContext.tsx
│   └── AppContext.tsx
│
├── styles/
│   ├── globals.css
│   ├── tailwind.config.js       # If using Tailwind
│   └── theme.css
│
├── public/
│   ├── images/
│   └── icons/
│
├── .env.local
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 3. DATABASE SCHEMA DEFINITIONS

### 3.1 MongoDB Collections & Indexes

#### **Users Collection**

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "authType", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        email: { bsonType: "string" },
        password: { bsonType: "string" },  // Hashed (null for Google OAuth)
        name: { bsonType: "string" },
        authType: { enum: ["email", "google"] },
        googleId: { bsonType: "string" },  // null for email auth
        avatar: { bsonType: "string" },    // URL
        bio: { bsonType: "string" },
        college: { bsonType: "string" },
        points: { bsonType: "int" },       // Total earned points
        currentRank: { bsonType: "int" },  // Rank index (1-based)
        level: { bsonType: "int" },        // User level (for progression)
        badges: {
          bsonType: "array",
          items: { bsonType: "objectId" }  // Badge IDs
        },
        streak: { bsonType: "int" },       // Consecutive days
        lastActivityAt: { bsonType: "date" },
        isActive: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ googleId: 1 }, { sparse: true });
db.users.createIndex({ points: -1 });  // For leaderboard
db.users.createIndex({ createdAt: -1 });
```

#### **LearningPaths Collection**

```javascript
db.createCollection("learningPaths", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "levels"],
      properties: {
        _id: { bsonType: "objectId" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        icon: { bsonType: "string" },       // Emoji or image URL
        color: { bsonType: "string" },      // Hex color for UI
        difficulty: { enum: ["beginner", "intermediate", "advanced"] },
        topic: { bsonType: "string" },      // e.g., "Python", "Web Dev"
        totalLevels: { bsonType: "int" },
        levels: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              levelId: { bsonType: "int" },         // 1-indexed
              title: { bsonType: "string" },
              content: { bsonType: "string" },      // Markdown
              videoUrl: { bsonType: "string" },     // Optional
              quizzes: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  properties: {
                    question: { bsonType: "string" },
                    options: {
                      bsonType: "array",
                      items: { bsonType: "string" }
                    },
                    correctOption: { bsonType: "int" },  // Index
                    points: { bsonType: "int" }
                  }
                }
              },
              unlocksAtPoints: { bsonType: "int" }, // 0 for all, >0 for gated
              rewardPoints: { bsonType: "int" },
              badges: {
                bsonType: "array",
                items: { bsonType: "objectId" }      // Badge rewards
              }
            }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.learningPaths.createIndex({ topic: 1 });
db.learningPaths.createIndex({ difficulty: 1 });
```

#### **UserProgress Collection**

```javascript
db.createCollection("userProgress", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "pathId", "levelId"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        pathId: { bsonType: "objectId" },
        levelId: { bsonType: "int" },
        status: { enum: ["locked", "in_progress", "completed"] },
        completedAt: { bsonType: "date" },  // null until completed
        quizAttempts: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              attemptNum: { bsonType: "int" },
              score: { bsonType: "int" },   // 0-100
              answeredAt: { bsonType: "date" },
              answers: {
                bsonType: "array",
                items: { bsonType: "int" }   // Selected option indices
              }
            }
          }
        },
        bestScore: { bsonType: "int" },     // Best quiz score
        pointsEarned: { bsonType: "int" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.userProgress.createIndex({ userId: 1, pathId: 1 }, { unique: true });
db.userProgress.createIndex({ userId: 1, status: 1 });
db.userProgress.createIndex({ completedAt: 1 });
```

#### **Badges Collection**

```javascript
db.createCollection("badges", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "icon"],
      properties: {
        _id: { bsonType: "objectId" },
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        icon: { bsonType: "string" },       // Emoji or URL
        type: { enum: ["achievement", "milestone", "challenge", "social"] },
        criteria: {
          bsonType: "object",
          properties: {
            criteriaType: { enum: ["points", "levels_completed", "streak", "referrals"] },
            threshold: { bsonType: "int" }
          }
        },
        rarity: { enum: ["common", "rare", "epic", "legendary"] },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.badges.createIndex({ type: 1 });
```

#### **Rewards Collection**

```javascript
db.createCollection("rewards", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "type", "amount"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        type: { enum: ["points", "badge", "achievement"] },
        amount: { bsonType: "int" },       // Points or 1 for badge
        badgeId: { bsonType: "objectId" }, // If type == "badge"
        reason: { bsonType: "string" },    // "level_completed", "quiz_perfect", etc.
        metadata: {
          bsonType: "object"                // Context (pathId, levelId, etc.)
        },
        claimedAt: { bsonType: "date" },   // null if unclaimed
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.rewards.createIndex({ userId: 1, createdAt: -1 });
```

#### **CommunityPosts Collection**

```javascript
db.createCollection("communityPosts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["authorId", "content"],
      properties: {
        _id: { bsonType: "objectId" },
        authorId: { bsonType: "objectId" },
        content: { bsonType: "string" },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        likes: { bsonType: "int" },
        likedBy: {
          bsonType: "array",
          items: { bsonType: "objectId" }  // User IDs
        },
        comments: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              commentId: { bsonType: "objectId" },
              authorId: { bsonType: "objectId" },
              content: { bsonType: "string" },
              createdAt: { bsonType: "date" }
            }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.communityPosts.createIndex({ authorId: 1, createdAt: -1 });
db.communityPosts.createIndex({ createdAt: -1 });  // For feed
db.communityPosts.createIndex({ tags: 1 });
```

#### **CTFEnquiries Collection** (Optional)

```javascript
db.createCollection("ctfEnquiries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "teamName"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        teamName: { bsonType: "string" },
        teamMembers: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              memberId: { bsonType: "objectId" },
              role: { bsonType: "string" }
            }
          }
        },
        eventDate: { bsonType: "date" },
        status: { enum: ["pending", "approved", "rejected"] },
        enquiryDetails: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.ctfEnquiries.createIndex({ userId: 1 });
db.ctfEnquiries.createIndex({ status: 1 });
```

---

## 4. API ENDPOINTS SPECIFICATION

### 4.1 Authentication Endpoints

#### **POST /api/auth/register**
```
Register with email & password

Request:
{
  "email": "user@college.edu",
  "password": "hashed_client_side",
  "name": "John Doe"
}

Response 201:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k",
    "email": "user@college.edu",
    "name": "John Doe",
    "points": 0,
    "currentRank": null,
    "badges": [],
    "createdAt": "2024-12-03T10:30:00Z"
  }
}

Error 409:
{ "error": "Email already registered" }

Error 400:
{ "error": "Weak password or invalid email format" }

Validation:
- email: valid email format
- password: 8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
- name: 2-50 chars

Rate Limit: 5 per hour per IP
```

#### **POST /api/auth/login**
```
Login with email & password

Request:
{
  "email": "user@college.edu",
  "password": "hashed_client_side"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... (as above) }
}

Error 401:
{ "error": "Invalid credentials" }

Rate Limit: 10 per hour per IP
```

#### **GET /api/auth/google/url**
```
Get Google OAuth authorization URL

Response 200:
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}

Rate Limit: 100 per hour per IP
```

#### **POST /api/auth/google/callback**
```
Handle Google OAuth callback

Request:
{
  "code": "4/0AY0e-g...",
  "state": "state_value"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... (as above) },
  "isNewUser": true
}

Error 401:
{ "error": "Invalid authorization code" }

Rate Limit: 10 per hour per IP
```

#### **POST /api/auth/logout**
```
Logout (client-side token deletion)

Auth: Required (JWT)

Response 200:
{ "success": true }

Rate Limit: 50 per hour per user
```

---

### 4.2 User Endpoints

#### **GET /api/users/me**
```
Get current authenticated user

Auth: Required (JWT)

Response 200:
{
  "id": "65a1b2c3d4e5f6g7h8i9j0k",
  "email": "user@college.edu",
  "name": "John Doe",
  "avatar": "https://...",
  "bio": "Learning web development",
  "college": "Model Engineering College",
  "points": 450,
  "currentRank": 23,
  "level": 5,
  "badges": [
    {
      "id": "65b1c2d3e4f5g6h7i8j9k0l",
      "name": "First Steps",
      "icon": "🎯"
    }
  ],
  "streak": 7,
  "lastActivityAt": "2024-12-03T10:30:00Z",
  "createdAt": "2024-11-15T08:00:00Z"
}

Rate Limit: 100 per hour per user
```

#### **PUT /api/users/me**
```
Update user profile

Auth: Required (JWT)

Request:
{
  "name": "Updated Name",
  "bio": "Updated bio",
  "college": "MEC",
  "avatar": "https://cdn.example.com/avatar.jpg"
}

Response 200:
{ "success": true, "user": { ... updated user } }

Validation:
- name: 2-50 chars
- bio: max 300 chars
- avatar: valid URL or null

Rate Limit: 20 per hour per user
```

#### **GET /api/users/:userId**
```
Get public user profile

Auth: Optional (JWT)

Response 200:
{
  "id": "65a1b2c3d4e5f6g7h8i9j0k",
  "name": "John Doe",
  "avatar": "https://...",
  "bio": "Learning web development",
  "college": "MEC",
  "points": 450,
  "currentRank": 23,
  "badges": [ ... ],
  "level": 5,
  "createdAt": "2024-11-15T08:00:00Z"
}

Error 404:
{ "error": "User not found" }

Rate Limit: 500 per hour per IP
```

#### **GET /api/users/:userId/stats**
```
Get user learning statistics

Auth: Optional

Response 200:
{
  "userId": "65a1b2c3d4e5f6g7h8i9j0k",
  "totalPathsStarted": 5,
  "totalPathsCompleted": 2,
  "totalLevelsCompleted": 18,
  "totalPoints": 450,
  "currentStreak": 7,
  "longestStreak": 14,
  "averageQuizScore": 87.5,
  "topicsProgress": [
    {
      "topic": "Python",
      "levelsCompleted": 8,
      "totalLevels": 12
    }
  ]
}

Rate Limit: 200 per hour per user
```

---

### 4.3 Learning Path Endpoints

#### **GET /api/learning-paths**
```
List all learning paths

Auth: Optional

Query Params:
- difficulty: [beginner, intermediate, advanced]
- topic: string
- limit: int (default 20, max 100)
- skip: int (default 0)

Response 200:
{
  "paths": [
    {
      "id": "65c1d2e3f4g5h6i7j8k9l0m",
      "title": "Python Fundamentals",
      "description": "Learn Python basics...",
      "icon": "🐍",
      "color": "#3776ab",
      "difficulty": "beginner",
      "topic": "Python",
      "totalLevels": 12,
      "progress": {
        "completed": 5,
        "inProgress": 1,
        "locked": 6
      }
    }
  ],
  "total": 45,
  "page": 1
}

Rate Limit: 500 per hour per IP
```

#### **GET /api/learning-paths/:pathId**
```
Get learning path with levels

Auth: Optional

Response 200:
{
  "id": "65c1d2e3f4g5h6i7j8k9l0m",
  "title": "Python Fundamentals",
  "description": "...",
  "totalLevels": 12,
  "levels": [
    {
      "levelId": 1,
      "title": "Introduction to Python",
      "content": "# Python Basics\n...",
      "videoUrl": "https://...",
      "status": "completed",
      "unlocksAtPoints": 0,
      "rewardPoints": 50,
      "badges": []
    },
    {
      "levelId": 2,
      "title": "Variables & Data Types",
      "status": "locked",
      "unlocksAtPoints": 100
    }
  ]
}

Rate Limit: 200 per hour per user
```

#### **GET /api/learning-paths/:pathId/:levelId**
```
Get specific level content with quizzes

Auth: Optional

Response 200:
{
  "levelId": 1,
  "title": "Introduction to Python",
  "content": "# Python Basics\n...",
  "videoUrl": "https://...",
  "quizzes": [
    {
      "quizId": "q1",
      "question": "What is Python?",
      "options": [
        "A programming language",
        "A snake",
        "A game",
        "None of the above"
      ],
      "points": 10
    }
  ],
  "rewardPoints": 50,
  "userProgress": {
    "status": "completed",
    "completedAt": "2024-11-25T14:30:00Z",
    "bestScore": 95,
    "quizAttempts": 1
  }
}

Rate Limit: 300 per hour per user
```

---

### 4.4 Progress & Quiz Endpoints

#### **POST /api/learning-paths/:pathId/:levelId/submit-quiz**
```
Submit quiz answers

Auth: Required (JWT)

Request:
{
  "answers": [0, 1, 2, 0]  // Option indices
}

Response 200:
{
  "score": 85,
  "passed": true,
  "pointsEarned": 42,
  "levelCompleted": true,
  "rewards": [
    {
      "type": "badge",
      "badgeId": "65d1e2f3g4h5i6j7k8l9m0n",
      "badgeName": "Quiz Master",
      "badgeIcon": "🎓"
    }
  ],
  "nextLevelUnlocked": true,
  "userPoints": 450
}

Validation:
- answers: array of ints, length matches quiz count
- Each answer: 0 <= answer < option count

Rate Limit: 5 per level per day per user
Error 429: { "error": "Quiz already attempted today" }
```

#### **POST /api/users/me/progress/mark-level-complete**
```
Mark level as complete (alternative endpoint)

Auth: Required (JWT)

Request:
{
  "pathId": "65c1d2e3f4g5h6i7j8k9l0m",
  "levelId": 5
}

Response 200:
{
  "success": true,
  "userProgress": { ... },
  "rewards": [ ... ]
}

Rate Limit: 50 per day per user
```

#### **GET /api/users/me/progress**
```
Get user's learning progress

Auth: Required (JWT)

Query Params:
- pathId: string (optional, filter by path)

Response 200:
{
  "progress": [
    {
      "pathId": "65c1d2e3f4g5h6i7j8k9l0m",
      "pathTitle": "Python Fundamentals",
      "levelsCompleted": 5,
      "totalLevels": 12,
      "percentComplete": 41.67,
      "levels": [
        {
          "levelId": 1,
          "status": "completed",
          "pointsEarned": 50,
          "completedAt": "2024-11-20T10:00:00Z"
        }
      ]
    }
  ]
}

Rate Limit: 100 per hour per user
```

---

### 4.5 Gamification Endpoints

#### **GET /api/gamification/badges**
```
List all badge types

Auth: Optional

Response 200:
{
  "badges": [
    {
      "id": "65d1e2f3g4h5i6j7k8l9m0n",
      "name": "First Steps",
      "description": "Complete your first level",
      "icon": "👣",
      "type": "achievement",
      "criteria": {
        "criteriaType": "levels_completed",
        "threshold": 1
      },
      "rarity": "common"
    },
    {
      "id": "65d1e2f3g4h5i6j7k8l9m0o",
      "name": "Quiz Master",
      "description": "Score 100% on 10 quizzes",
      "icon": "🎓",
      "type": "achievement",
      "criteria": {
        "criteriaType": "perfect_quizzes",
        "threshold": 10
      },
      "rarity": "epic"
    }
  ]
}

Rate Limit: 500 per hour per IP
```

#### **GET /api/users/me/badges**
```
Get user's earned badges

Auth: Required (JWT)

Response 200:
{
  "badges": [
    {
      "id": "65d1e2f3g4h5i6j7k8l9m0n",
      "name": "First Steps",
      "icon": "👣",
      "earnedAt": "2024-11-15T08:30:00Z",
      "rarity": "common"
    }
  ],
  "totalBadges": 3
}

Rate Limit: 100 per hour per user
```

#### **GET /api/users/me/rewards**
```
Get pending & claimed rewards

Auth: Required (JWT)

Query Params:
- status: [pending, claimed] (default all)
- limit: int (default 20)

Response 200:
{
  "rewards": [
    {
      "id": "65e1f2g3h4i5j6k7l8m9n0o",
      "type": "points",
      "amount": 50,
      "reason": "level_completed",
      "metadata": {
        "pathId": "65c1d2e3f4g5h6i7j8k9l0m",
        "levelId": 3
      },
      "claimedAt": "2024-11-25T10:00:00Z"
    }
  ]
}

Rate Limit: 100 per hour per user
```

---

### 4.6 Ranking & Leaderboard Endpoints

#### **GET /api/rankings/leaderboard**
```
Get global leaderboard

Auth: Optional

Query Params:
- limit: int (default 100, max 500)
- offset: int (default 0)
- timeframe: [all_time, monthly, weekly] (default all_time)

Response 200:
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "65a1b2c3d4e5f6g7h8i9j0k",
      "name": "Alice",
      "avatar": "https://...",
      "points": 5000,
      "badges": 12,
      "level": 15
    },
    {
      "rank": 2,
      "userId": "65a1b2c3d4e5f6g7h8i9j0l",
      "name": "Bob",
      "points": 4800,
      "badges": 10,
      "level": 14
    }
  ],
  "generatedAt": "2024-12-03T10:00:00Z"
}

Cache: 5 minutes (Redis)
Rate Limit: 1000 per hour per IP
```

#### **GET /api/rankings/user/:userId**
```
Get user's rank and nearby competitors

Auth: Optional

Response 200:
{
  "userRank": 23,
  "userPoints": 450,
  "globalTotal": 1000,
  "percentile": 97.7,
  "nearbyRanks": [
    { "rank": 22, "name": "Charlie", "points": 460 },
    { "rank": 23, "name": "You", "points": 450 },
    { "rank": 24, "name": "Diana", "points": 440 }
  ]
}

Cache: 5 minutes
Rate Limit: 500 per hour per IP
```

#### **GET /api/rankings/leaderboard/by-topic/:topic**
```
Get leaderboard for specific topic

Auth: Optional

Response 200:
{
  "topic": "Python",
  "leaderboard": [ ... (same structure as global) ]
}

Cache: 5 minutes
Rate Limit: 500 per hour per IP
```

---

### 4.7 Community Endpoints

#### **GET /api/community/posts**
```
Get community feed

Auth: Optional

Query Params:
- limit: int (default 20)
- skip: int (default 0)
- tag: string (optional filter)

Response 200:
{
  "posts": [
    {
      "id": "65f1g2h3i4j5k6l7m8n9o0p",
      "authorId": "65a1b2c3d4e5f6g7h8i9j0k",
      "authorName": "John Doe",
      "authorAvatar": "https://...",
      "content": "Just completed Python fundamentals! 🎉",
      "tags": ["python", "milestone"],
      "likes": 24,
      "userLiked": false,
      "commentCount": 5,
      "createdAt": "2024-12-03T08:30:00Z"
    }
  ],
  "total": 342
}

Cache: 1 minute
Rate Limit: 500 per hour per IP
```

#### **POST /api/community/posts**
```
Create community post

Auth: Required (JWT)

Request:
{
  "content": "Just completed Python fundamentals! 🎉",
  "tags": ["python", "milestone"]
}

Response 201:
{
  "id": "65f1g2h3i4j5k6l7m8n9o0p",
  "authorId": "65a1b2c3d4e5f6g7h8i9j0k",
  "content": "...",
  "tags": ["python", "milestone"],
  "likes": 0,
  "createdAt": "2024-12-03T08:30:00Z"
}

Validation:
- content: 1-500 chars
- tags: max 5, each 1-20 chars

Rate Limit: 20 per day per user
```

#### **POST /api/community/posts/:postId/like**
```
Like/unlike a post

Auth: Required (JWT)

Request:
{
  "liked": true
}

Response 200:
{
  "success": true,
  "likes": 25,
  "userLiked": true
}

Rate Limit: 500 per hour per user
```

#### **POST /api/community/posts/:postId/comments**
```
Add comment to post

Auth: Required (JWT)

Request:
{
  "content": "Great achievement! Keep going!"
}

Response 201:
{
  "commentId": "65g1h2i3j4k5l6m7n8o9p0q",
  "content": "...",
  "authorName": "You",
  "createdAt": "2024-12-03T08:35:00Z"
}

Validation:
- content: 1-300 chars

Rate Limit: 100 per day per user
```

---

### 4.8 CTF Enquiry Endpoints (Optional)

#### **POST /api/ctf/enquiries**
```
Create CTF team enquiry

Auth: Required (JWT)

Request:
{
  "teamName": "Quantum Coders",
  "teamMembers": [
    { "memberId": "65a1b2c3d4e5f6g7h8i9j0k", "role": "Lead" },
    { "memberId": "65a1b2c3d4e5f6g7h8i9j0l", "role": "Developer" }
  ],
  "eventDate": "2024-12-15T18:00:00Z",
  "enquiryDetails": "We are interested in participating..."
}

Response 201:
{
  "id": "65h1i2j3k4l5m6n7o8p9q0r",
  "userId": "65a1b2c3d4e5f6g7h8i9j0k",
  "teamName": "Quantum Coders",
  "status": "pending",
  "createdAt": "2024-12-03T09:00:00Z"
}

Validation:
- teamName: 2-50 chars
- teamMembers: 1-5 members
- eventDate: future date only

Rate Limit: 5 per day per user
```

#### **GET /api/ctf/enquiries/me**
```
Get user's CTF enquiries

Auth: Required (JWT)

Response 200:
{
  "enquiries": [
    {
      "id": "65h1i2j3k4l5m6n7o8p9q0r",
      "teamName": "Quantum Coders",
      "status": "pending",
      "createdAt": "2024-12-03T09:00:00Z"
    }
  ]
}

Rate Limit: 100 per hour per user
```

---

## 5. GAMIFICATION LOGIC MODEL

### 5.1 Badge System

```javascript
// Badge Types & Criteria

BADGE_TYPES = {
  ACHIEVEMENT: "achievement",      // Single completion
  MILESTONE: "milestone",          // Cumulative threshold
  CHALLENGE: "challenge",          // Specific behavior
  SOCIAL: "social"                 // Community interaction
};

BADGES = [
  {
    id: "first_steps",
    name: "First Steps",
    icon: "👣",
    type: "achievement",
    criteria: { type: "levels_completed", threshold: 1 },
    rarity: "common"
  },
  {
    id: "century",
    name: "Century Club",
    icon: "💯",
    type: "milestone",
    criteria: { type: "total_points", threshold: 100 },
    rarity: "rare"
  },
  {
    id: "streak_king",
    name: "Streak King",
    icon: "🔥",
    type: "challenge",
    criteria: { type: "consecutive_days", threshold: 7 },
    rarity: "epic"
  },
  {
    id: "helper",
    name: "Community Helper",
    icon: "🤝",
    type: "social",
    criteria: { type: "post_likes", threshold: 50 },
    rarity: "rare"
  },
  {
    id: "perfect_quiz",
    name: "Quiz Master",
    icon: "🎓",
    type: "achievement",
    criteria: { type: "perfect_score_quizzes", threshold: 5 },
    rarity: "epic"
  }
];

// Badge Check Logic
async function checkAndAwardBadges(userId) {
  const user = await User.findById(userId);
  const progress = await UserProgress.find({ userId });
  
  for (const badge of BADGES) {
    const alreadyHas = user.badges.includes(badge.id);
    if (alreadyHas) continue;
    
    const earned = await evaluateBadgeCriteria(badge.criteria, userId);
    if (earned) {
      await awardBadge(userId, badge);
    }
  }
}

async function evaluateBadgeCriteria(criteria, userId) {
  const { type, threshold } = criteria;
  
  switch (type) {
    case "levels_completed":
      const completed = await UserProgress.countDocuments({
        userId,
        status: "completed"
      });
      return completed >= threshold;
      
    case "total_points":
      const user = await User.findById(userId);
      return user.points >= threshold;
      
    case "consecutive_days":
      const streak = await calculateStreak(userId);
      return streak >= threshold;
      
    case "perfect_score_quizzes":
      const perfectQuizzes = await UserProgress.countDocuments({
        userId,
        bestScore: 100
      });
      return perfectQuizzes >= threshold;
      
    default:
      return false;
  }
}
```

### 5.2 Rewards System

```javascript
// Points Distribution Rules

REWARD_RULES = {
  LEVEL_COMPLETE: {
    basePoints: 50,
    multiplier: 1.0  // 1x for first attempt
  },
  QUIZ_PERFECT: {
    bonus: 25        // +25 points for 100% score
  },
  QUIZ_GOOD: {
    bonus: 10        // +10 points for 80%+
  },
  DAILY_STREAK: {
    points: 15       // Daily login bonus after 3 days
  },
  COMMUNITY_POST: {
    perLike: 1,      // 1 point per like (capped at 50/post)
    maxPerPost: 50
  }
};

// Reward Calculation
function calculateReward(levelScore, isFirstAttempt, streak) {
  let points = REWARD_RULES.LEVEL_COMPLETE.basePoints;
  
  // First attempt multiplier
  if (!isFirstAttempt) {
    points *= 0.7;  // 70% of base on retries
  }
  
  // Quiz performance bonus
  if (levelScore === 100) {
    points += REWARD_RULES.QUIZ_PERFECT.bonus;
  } else if (levelScore >= 80) {
    points += REWARD_RULES.QUIZ_GOOD.bonus;
  }
  
  // Streak bonus (max 1.5x multiplier at 7+ day streak)
  const streakMultiplier = Math.min(1 + (streak * 0.05), 1.5);
  points *= streakMultiplier;
  
  return Math.floor(points);
}

// Reward Distribution
async function distributeReward(userId, pathId, levelId, score) {
  const points = calculateReward(score, true, user.streak);
  
  // Update user points
  await User.updateOne(
    { _id: userId },
    { $inc: { points } }
  );
  
  // Create reward record
  const reward = new Reward({
    userId,
    type: "points",
    amount: points,
    reason: "level_completed",
    metadata: { pathId, levelId, score },
    createdAt: new Date()
  });
  
  await reward.save();
  
  // Check for badges
  await checkAndAwardBadges(userId);
  
  return { points, rewards: [ ... ] };
}
```

### 5.3 Rank Progression Algorithm

```javascript
// Rank Calculation (Leaderboard Strategy)

// Strategy: Top N ranks based on points (all-time)
// With monthly/weekly views based on recent activity

async function calculateRanks(timeframe = "all_time") {
  let query = { isActive: true };
  let sortField = "points";
  
  if (timeframe === "monthly") {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    query.lastActivityAt = { $gte: thirtyDaysAgo };
  } else if (timeframe === "weekly") {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    query.lastActivityAt = { $gte: sevenDaysAgo };
  }
  
  const rankings = await User
    .find(query)
    .sort({ [sortField]: -1 })
    .select("_id name points level badges");
  
  // Update rank in database
  const bulkOps = rankings.map((user, idx) => ({
    updateOne: {
      filter: { _id: user._id },
      update: { $set: { currentRank: idx + 1 } }
    }
  }));
  
  await User.bulkWrite(bulkOps);
  
  // Cache in Redis
  const key = `leaderboard:${timeframe}`;
  await redis.setex(
    key,
    300,  // 5 minute TTL
    JSON.stringify(rankings)
  );
  
  return rankings;
}

async function getUserRank(userId, timeframe = "all_time") {
  const key = `leaderboard:${timeframe}`;
  let leaderboard = await redis.get(key);
  
  if (!leaderboard) {
    leaderboard = await calculateRanks(timeframe);
  } else {
    leaderboard = JSON.parse(leaderboard);
  }
  
  const userRank = leaderboard.findIndex(u => u._id.toString() === userId) + 1;
  return userRank;
}

// Level Progression (separate from rank)
async function calculateUserLevel(userId) {
  const user = await User.findById(userId);
  const level = Math.floor(user.points / 200) + 1;  // New level every 200 points
  
  if (level !== user.level) {
    await User.updateOne({ _id: userId }, { $set: { level } });
    // Trigger level-up notification
  }
  
  return level;
}
```

---

## 6. LEARNING PATH ENGINE

### 6.1 Level Model & Structure

```javascript
// Level Data Model

LEVEL_MODEL = {
  levelId: 1,                 // Sequential number
  title: "Introduction",
  content: "# Markdown content",
  videoUrl: "https://...",    // Optional
  
  // Unlock logic
  unlocksAtPoints: 0,         // 0 = unlocked by default, >0 = gated
  prerequisiteLevelId: null,  // Alternative: require previous level
  
  // Reward logic
  rewardPoints: 50,
  badgeIds: ["badge_id_1"],   // Badges on completion
  
  // Quiz structure
  quizzes: [
    {
      question: "What is X?",
      options: ["A", "B", "C", "D"],
      correctOption: 0,  // Index
      points: 10
    }
  ]
};

// Level Unlock Logic
async function getLevelStatus(userId, pathId, levelId) {
  const user = await User.findById(userId);
  const level = await getLevelData(pathId, levelId);
  
  // Check prerequisites
  if (level.unlocksAtPoints > 0 && user.points < level.unlocksAtPoints) {
    return { status: "locked", reason: `Need ${level.unlocksAtPoints} points` };
  }
  
  // Check previous level completion
  if (level.prerequisiteLevelId) {
    const prevProgress = await UserProgress.findOne({
      userId,
      pathId,
      levelId: level.prerequisiteLevelId,
      status: "completed"
    });
    
    if (!prevProgress) {
      return { status: "locked", reason: "Complete previous level first" };
    }
  }
  
  // Check user progress
  const userProgress = await UserProgress.findOne({
    userId,
    pathId,
    levelId
  });
  
  if (!userProgress) {
    return { status: "available" };
  }
  
  return { status: userProgress.status };
}
```

### 6.2 Unlock Logic

```javascript
// Progressive Unlock Strategy

UNLOCK_STRATEGIES = {
  LINEAR: {
    // Unlock next level after completing current
    check: async (pathId, levelId, userId) => {
      const currentLevel = await UserProgress.findOne({
        userId, pathId, levelId: levelId - 1, status: "completed"
      });
      return !!currentLevel;
    }
  },
  
  POINTS_GATE: {
    // Unlock based on total points
    check: async (pathId, levelId, userId) => {
      const level = await LearningPath.findOne(
        { _id: pathId, "levels.levelId": levelId },
        { "levels.$": 1 }
      );
      
      const user = await User.findById(userId);
      return user.points >= level.levels[0].unlocksAtPoints;
    }
  },
  
  HYBRID: {
    // Combine linear + points
    check: async (pathId, levelId, userId) => {
      const linearCheck = await UNLOCK_STRATEGIES.LINEAR.check(pathId, levelId, userId);
      const pointsCheck = await UNLOCK_STRATEGIES.POINTS_GATE.check(pathId, levelId, userId);
      return linearCheck && pointsCheck;
    }
  }
};

// Default: LINEAR unlock
```

### 6.3 Progress Tracking

```javascript
// UserProgress Recording

async function recordLevelProgress(userId, pathId, levelId, quizAnswers) {
  // Calculate score
  const level = await getLevelData(pathId, levelId);
  let score = 0;
  const totalPoints = level.quizzes.reduce((sum, q) => sum + q.points, 0);
  
  level.quizzes.forEach((quiz, idx) => {
    if (quizAnswers[idx] === quiz.correctOption) {
      score += quiz.points;
    }
  });
  
  const scorePercent = Math.round((score / totalPoints) * 100);
  
  // Find or create progress record
  let progress = await UserProgress.findOne({
    userId, pathId, levelId
  });
  
  if (!progress) {
    progress = new UserProgress({
      userId, pathId, levelId, status: "in_progress"
    });
  }
  
  // Record attempt
  progress.quizAttempts.push({
    attemptNum: progress.quizAttempts.length + 1,
    score: scorePercent,
    answeredAt: new Date(),
    answers: quizAnswers
  });
  
  progress.bestScore = Math.max(
    progress.bestScore || 0,
    scorePercent
  );
  
  // Mark complete if score >= 60%
  if (scorePercent >= 60) {
    progress.status = "completed";
    progress.completedAt = new Date();
    
    // Calculate rewards
    const points = calculateReward(scorePercent, true, user.streak);
    progress.pointsEarned = points;
  }
  
  await progress.save();
  
  // Update user stats
  const rewardData = await distributeReward(userId, pathId, levelId, scorePercent);
  
  return {
    progress,
    rewards: rewardData,
    levelComplete: progress.status === "completed"
  };
}

// Get user's learning dashboard
async function getUserDashboard(userId) {
  const user = await User.findById(userId);
  
  const progress = await UserProgress.aggregate([
    { $match: { userId: ObjectId(userId) } },
    {
      $group: {
        _id: "$pathId",
        completed: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] }
        },
        total: { $sum: 1 },
        lastActivity: { $max: "$updatedAt" }
      }
    },
    {
      $lookup: {
        from: "learningPaths",
        localField: "_id",
        foreignField: "_id",
        as: "path"
      }
    }
  ]);
  
  return {
    user: {
      name: user.name,
      points: user.points,
      rank: user.currentRank,
      level: user.level,
      streak: user.streak
    },
    pathProgress: progress,
    stats: {
      totalPathsStarted: progress.length,
      totalPathsCompleted: progress.filter(p => p.completed === p.total).length,
      totalLevelsCompleted: progress.reduce((sum, p) => sum + p.completed, 0)
    }
  };
}
```

---

## 7. SECURITY MODEL

### 7.1 Authentication & Authorization

```javascript
// JWT Strategy

JWT_CONFIG = {
  algorithm: "HS256",
  expiresIn: "7d",
  refreshExpiresIn: "30d"
};

// Token Generation
function generateTokens(userId) {
  const accessToken = jwt.sign(
    { userId, type: "access" },
    process.env.JWT_SECRET,
    { expiresIn: JWT_CONFIG.expiresIn }
  );
  
  const refreshToken = jwt.sign(
    { userId, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: JWT_CONFIG.refreshExpiresIn }
  );
  
  return { accessToken, refreshToken };
}

// Middleware: JWT Verification
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Role-based Access Control (RBAC)
const ROLES = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator"
};

function requireRole(...allowedRoles) {
  return async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}
```

### 7.2 OAuth Configuration

```javascript
// Google OAuth Setup

const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: `${process.env.APP_URL}/api/auth/google/callback`
};

// OAuth Flow
async function handleGoogleCallback(code) {
  try {
    // Exchange code for tokens
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        redirect_uri: GOOGLE_CONFIG.redirectUri,
        grant_type: "authorization_code"
      }
    );
    
    const { id_token } = response.data;
    
    // Verify and decode ID token
    const googleUser = jwt.decode(id_token);
    
    // Find or create user
    let user = await User.findOne({ googleId: googleUser.sub });
    const isNewUser = !user;
    
    if (!user) {
      user = new User({
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        authType: "google",
        googleId: googleUser.sub,
        points: 0,
        badges: [],
        level: 1,
        createdAt: new Date()
      });
      await user.save();
    }
    
    const tokens = generateTokens(user._id);
    
    return { user, tokens, isNewUser };
  } catch (error) {
    throw new Error("Google OAuth failed: " + error.message);
  }
}
```

### 7.3 Rate Limiting & Security

```javascript
// Rate Limiting Strategy

const RATE_LIMITS = {
  auth: { windowMs: 60 * 60 * 1000, max: 5 },      // 5 per hour
  login: { windowMs: 60 * 60 * 1000, max: 10 },    // 10 per hour
  api: { windowMs: 60 * 1000, max: 100 },          // 100 per minute
  quiz: { windowMs: 24 * 60 * 60 * 1000, max: 5 }  // 5 per day
};

function rateLimiter(limits) {
  return async (req, res, next) => {
    const key = `ratelimit:${req.ip}:${req.path}`;
    const current = await redis.incr(key);
    
    if (current === 1) {
      await redis.expire(key, Math.ceil(limits.windowMs / 1000));
    }
    
    res.set("X-RateLimit-Limit", limits.max);
    res.set("X-RateLimit-Remaining", Math.max(0, limits.max - current));
    
    if (current > limits.max) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: await redis.ttl(key)
      });
    }
    
    next();
  };
}

app.post("/api/auth/login", rateLimiter(RATE_LIMITS.login), loginHandler);
app.post("/api/quiz/submit", rateLimiter(RATE_LIMITS.quiz), quizHandler);
```

### 7.4 Data Protection

```javascript
// Password Hashing

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Input Validation & Sanitization
const sanitizer = require("express-sanitize");
app.use(sanitizer());

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));

// HTTP Security Headers
const helmet = require("helmet");
app.use(helmet());
```

---

## 8. PERFORMANCE & SCALABILITY CONSIDERATIONS

### 8.1 Caching Strategy

```javascript
// Redis Caching Layers

CACHE_KEYS = {
  LEADERBOARD: "leaderboard:{timeframe}",        // TTL: 5 min
  USER_PROFILE: "user:{userId}",                 // TTL: 10 min
  LEARNING_PATHS: "paths:{topic}:{difficulty}", // TTL: 30 min
  BADGES: "badges:all",                         // TTL: 1 hour
  USER_PROGRESS: "progress:{userId}",           // TTL: 5 min
};

// Cache Invalidation on Updates
async function updateUser(userId, data) {
  await User.updateOne({ _id: userId }, data);
  await redis.del(`user:${userId}`);
  await redis.del("leaderboard:all_time");  // Invalidate leaderboards
  await redis.del("leaderboard:monthly");
  await redis.del("leaderboard:weekly");
}

// Preemptive Cache Warming (Scheduled Job)
async function warmCaches() {
  // Preload frequently accessed data
  const badges = await Badge.find();
  await redis.setex("badges:all", 3600, JSON.stringify(badges));
  
  const paths = await LearningPath.find();
  await redis.setex("paths:all", 1800, JSON.stringify(paths));
  
  // Recalculate leaderboards
  await calculateRanks("all_time");
  await calculateRanks("monthly");
  await calculateRanks("weekly");
}

// Run every 5 minutes
setInterval(warmCaches, 5 * 60 * 1000);
```

### 8.2 Database Indexing Strategy

```javascript
// Critical Indexes for Performance

// User queries
db.users.createIndex({ email: 1 });
db.users.createIndex({ points: -1 });
db.users.createIndex({ lastActivityAt: -1 });

// Learning progress queries
db.userProgress.createIndex({ userId: 1, pathId: 1 });
db.userProgress.createIndex({ userId: 1, status: 1 });
db.userProgress.createIndex({ completedAt: -1 });

// Community queries
db.communityPosts.createIndex({ createdAt: -1 });
db.communityPosts.createIndex({ authorId: 1, createdAt: -1 });
db.communityPosts.createIndex({ tags: 1 });

// Rewards tracking
db.rewards.createIndex({ userId: 1, createdAt: -1 });

// Compound indexes for common queries
db.userProgress.createIndex({ userId: 1, pathId: 1, levelId: 1 });
```

### 8.3 Query Optimization

```javascript
// Aggregation Pipeline (avoid N+1 queries)

// Instead of:
const progress = await UserProgress.find({ userId });
const paths = [];
for (const p of progress) {
  const path = await LearningPath.findById(p.pathId);  // N queries!
  paths.push(path);
}

// Use:
const pathProgress = await UserProgress.aggregate([
  { $match: { userId: ObjectId(userId) } },
  {
    $lookup: {
      from: "learningPaths",
      localField: "pathId",
      foreignField: "_id",
      as: "path"
    }
  },
  { $unwind: "$path" },
  {
    $project: {
      pathId: 1,
      pathTitle: "$path.title",
      status: 1,
      completedAt: 1
    }
  }
]);

// Pagination for large result sets
async function getPaginatedLeaderboard(skip = 0, limit = 50) {
  return User
    .find({ isActive: true })
    .select("name points level badges avatar")
    .sort({ points: -1 })
    .skip(skip)
    .limit(limit)
    .lean();  // .lean() for read-only docs (faster)
}
```

### 8.4 Scalability Path

```
Phase 1 (Current):
├─ Single Node.js server
├─ MongoDB on single instance
├─ Redis for caching
└─ Horizontal: Load balancer with multiple instances

Phase 2 (Medium scale):
├─ Separate auth service
├─ Separate gamification service
├─ MongoDB replication (replica set)
└─ Redis cluster

Phase 3 (Large scale):
├─ Full microservices (auth, learning, gamification, social)
├─ Message queue (RabbitMQ/Kafka) for async tasks
├─ MongoDB sharding by userId
├─ CDN for static assets
└─ Read replicas for leaderboard queries
```

---

## 9. ENVIRONMENT VARIABLES (.env template)

```bash
# Server
NODE_ENV=development
PORT=5000
APP_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db_name?retryWrites=true
MONGOOSE_POOL_SIZE=10

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=info

# Security
BCRYPT_ROUNDS=12
CORS_ORIGIN=http://localhost:3000
```

---

## 10. DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All endpoints tested with Postman/Insomnia
- [ ] Error handling comprehensive
- [ ] Logging configured (Winston/Pino)
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] JWT secrets rotated (not in repo)
- [ ] MongoDB indexes created in production
- [ ] Redis configured for persistence
- [ ] Environment variables set
- [ ] Database migrations tested
- [ ] Security headers (Helmet) enabled

### Post-Deployment Monitoring

- [ ] Set up APM (New Relic/Datadog)
- [ ] Alert on 500 errors
- [ ] Monitor Redis memory
- [ ] MongoDB query performance logs
- [ ] User authentication success rate
- [ ] Leaderboard calculation performance
- [ ] API response times (p95, p99)

---

## 11. MVP FEATURE PRIORITIZATION

| Priority | Feature | Effort | Timeline |
|----------|---------|--------|----------|
| P0 | Auth (email + Google) | 3d | Week 1 |
| P0 | Learning path structure | 2d | Week 1 |
| P0 | Quiz + progress tracking | 2d | Week 1 |
| P0 | Points system | 1d | Week 2 |
| P1 | Leaderboard (global) | 2d | Week 2 |
| P1 | Badges (3-5 types) | 1d | Week 2 |
| P1 | Dashboard UI | 3d | Week 2-3 |
| P2 | Community posts (basic) | 2d | Week 3 |
| P2 | Gamification polish | 2d | Week 3 |
| P3 | CTF enquiry module | 1d | Week 4 |
| P3 | Mobile optimization | 2d | Week 4 |

---

**END SPECIFICATION**

This document provides a complete, production-ready architecture for your learning platform. Implement in phases; focus on P0 features first. All code examples are pseudo-code for clarity—adapt to your specific framework versions.
