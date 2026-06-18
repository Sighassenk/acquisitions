# Acquisition API

A secure and scalable REST API built with Node.js, Express.js, PostgreSQL, and Drizzle ORM.

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Drizzle ORM

### Security

* Helmet
* CORS
* Cookie Parser
* JSON Web Tokens (JWT)
* Bcrypt
* Arcjet

### Validation

* Zod

### Logging & Monitoring

* Winston
* Morgan

### Code Quality

* ESLint
* Prettier

---

# Features

* User CRUD operations
* PostgreSQL database integration
* Drizzle ORM schema management
* JWT Authentication
* Password hashing with bcrypt
* Request validation using Zod
* Request logging with Morgan
* Application logging with Winston
* Security headers using Helmet
* Cross-Origin Resource Sharing (CORS)
* Cookie management
* Rate limiting and bot protection using Arcjet
* Clean architecture (Routes → Controllers → Services → Database)

---

## Project Structure

```text
src/
│
├── config/
│   ├── arcjet.js          # Arcjet security configuration
│   ├── database.js        # Drizzle/PostgreSQL connection
│   └── logger.js          # Winston logger configuration
│
├── controllers/
│   ├── auth.controller.js
│   └── users.controller.js
│
├── middleware/
│   └── security.middleware.js
│
├── models/
│   └── user.model.js      # Drizzle schema definitions
│
├── routes/
│   ├── auth.routes.js
│   └── users.routes.js
│
├── services/
│   ├── auth.service.js
│   └── users.services.js
│
├── utils/
│   ├── cookies.js         # Cookie helpers
│   ├── format.js          # Formatting utilities
│   └── jwt.js             # JWT helpers
│
├── validations/
│   └──                   # Zod schemas and validators
│
├── app.js                # Express application configuration
├── server.js             # Server initialization
└── index.js              # Application entry point
```

## Architecture

The project follows a layered architecture:

```text
Client Request
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
Database (Drizzle ORM)
      │
      ▼
PostgreSQL
```

### config/

Contains application-wide configurations.

| File        | Purpose                                 |
| ----------- | --------------------------------------- |
| arcjet.js   | Arcjet security and rate-limiting setup |
| database.js | PostgreSQL connection through Drizzle   |
| logger.js   | Winston logger configuration            |

### controllers/

Controllers handle incoming HTTP requests and responses.

Examples:

* User registration
* Login
* Fetching users
* Updating users
* Deleting users

Controllers should contain minimal business logic.

### middleware/

Contains reusable middleware.

Current middleware:

* Security middleware
* Arcjet protection
* Rate limiting
* Bot detection
* Request inspection

### models/

Database schemas using Drizzle ORM.

Example:

```js
export const users = pgTable("users", {
  ...
});
```

### routes/

Defines API endpoints.

Examples:

```http
GET    /api/users
GET    /api/users/:id
POST   /api/auth/register
POST   /api/auth/login
PUT    /api/users/:id
DELETE /api/users/:id
```

### services/

Contains business logic.

Examples:

* Database queries
* User creation
* Authentication logic
* Password verification
* JWT generation

Services communicate directly with the database layer.

### utils/

Reusable helper functions.

| File       | Purpose                           |
| ---------- | --------------------------------- |
| jwt.js     | Token generation and verification |
| cookies.js | Cookie management helpers         |
| format.js  | Utility formatting functions      |

### validations/

Contains Zod schemas for request validation.

Examples:

```js
registerSchema
loginSchema
createUserSchema
updateUserSchema
```

### app.js

Configures Express and middleware.

Typically includes:

```js
helmet()
cors()
cookieParser()
morgan()
express.json()
```

Registers routes and global middleware.

### server.js

Starts the HTTP server.

Example:

```js
app.listen(PORT);
```

### index.js

Main application entry point.

Responsible for:

* Loading environment variables
* Connecting services
* Bootstrapping the application
* Starting the server

```
```


# Packages Explanation

## Drizzle ORM

Drizzle ORM is a TypeScript-first ORM for SQL databases.

Used for:

* Defining database schemas
* Writing SQL queries safely
* Migrations
* Type-safe database operations

Example:

```js
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
});
```

---

## ESLint

ESLint analyzes your code and helps detect:

* Syntax errors
* Unused variables
* Bad coding practices
* Inconsistent styles

Run:

```bash
npm run lint
```

---

## Prettier

Prettier automatically formats your code.

Benefits:

* Consistent formatting
* Better readability
* Team collaboration

Run:

```bash
npm run format
```

---

## Winston

Professional logging library.

Used for:

* Application logs
* Error logs
* File logging
* Environment-aware logging

Example:

```js
logger.info("Server started");
logger.error("Database connection failed");
```

---

## Morgan

HTTP request logger middleware.

Logs:

* Request method
* URL
* Status code
* Response time

Example log:

```text
GET /api/users 200 15ms
```

---

## Helmet

Protects Express applications by setting secure HTTP headers.

Helps prevent:

* Cross-Site Scripting (XSS)
* Clickjacking
* MIME sniffing attacks

Usage:

```js
app.use(helmet());
```

---

## CORS

Cross-Origin Resource Sharing.

Allows frontend applications from different domains to access the API.

Example:

```js
app.use(cors());
```

---

## Cookie Parser

Parses cookies attached to requests.

Usage:

```js
app.use(cookieParser());
```

Access cookies:

```js
req.cookies
```

---

## JWT (jsonwebtoken)

Used for stateless authentication.

Workflow:

1. User logs in
2. Server generates token
3. Client stores token
4. Protected routes verify token

Generate token:

```js
jwt.sign(payload, process.env.JWT_SECRET);
```

Verify token:

```js
jwt.verify(token, process.env.JWT_SECRET);
```

---

## Zod

Schema validation library.

Used to validate:

* Request body
* Query parameters
* Route parameters

Example:

```js
const userSchema = z.object({
  name: z.string(),
  email: z.email(),
});
```

Benefits:

* Prevents invalid data
* Cleaner controllers
* Better error handling

---

## Bcrypt

Password hashing library.

Never store passwords in plain text.

Hash password:

```js
const hash = await bcrypt.hash(password, 10);
```

Compare password:

```js
await bcrypt.compare(password, hash);
```

---

# Arcjet Security

Arcjet provides advanced security and abuse protection.

## Installation

```js
import arcjet, {
  shield,
  detectBot,
  slidingWindow,
} from "@arcjet/node";

import { isSpoofedBot } from "@arcjet/inspect";
```

---

## Shield

Protects against:

* Common attacks
* Malicious requests
* Suspicious traffic

```js
shield()
```

---

## Bot Detection

Detects automated traffic.

```js
detectBot()
```

Useful for:

* Scrapers
* Crawlers
* Automated attacks

---

## Bot Spoofing Detection

```js
isSpoofedBot()
```

Identifies fake user agents pretending to be legitimate bots.

---

## Sliding Window Rate Limiting

Rate limiting strategy that limits requests over a moving time window.

Example:

```js
slidingWindow({
  interval: "1m",
  max: 100,
});
```

Prevents:

* Abuse
* Brute-force attacks
* API flooding

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

NODE_ENV=development

LOG_LEVEL=info

JWT_SECRET=your_jwt_secret

# Database
DATA_BASE_URL=postgresql://username:password@localhost:5432/database

# Arcjet
ARCJET_KEY=your_arcjet_key
```

---

# Installation

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

---

# Database Migration

Generate migration:

```bash
npx drizzle-kit generate
```

Run migration:

```bash
npx drizzle-kit migrate
```

---

# Start Development Server

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

---

# Example API Routes

## Get All Users

```http
GET /api/users
```

---

## Get User By Id

```http
GET /api/users/:id
```

---

## Create User

```http
POST /api/users
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Update User

```http
PUT /api/users/:id
```

---

## Delete User

```http
DELETE /api/users/:id
```

---

# Security Best Practices

* Store secrets in environment variables
* Hash passwords with bcrypt
* Validate all incoming data using Zod
* Use JWT expiration times
* Enable Arcjet protection
* Enable Helmet
* Restrict CORS origins
* Log all important events with Winston

---

# Author

Si Ghassen

Built with Express.js, PostgreSQL, Drizzle ORM, JWT Authentication, Arcjet Security, and modern Node.js best practices.
