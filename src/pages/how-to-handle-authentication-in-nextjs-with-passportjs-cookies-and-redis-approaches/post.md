---
title: "How to handle Authentication in Next.js with Passport.js: Cookies and Redis Approaches"
date: "2024-08-03T18:30:00.284Z"
description: "How to handle Authentication in Next.js with Passport.js: Cookies and Redis Approaches"
filepath: "/how-to-handle-authentication-in-nextjs-with-passportjs-cookies-and-redis-approaches"
cover: "/images/blog/cover-auth.png"
---

# How to handle Authentication in Next.js with Passport.js: Cookies and Redis Approaches

Antonio Gioia, 2024

---

![Cover](https://antoniogioia.com/images/blog/cover-auth.png)

---

This article explores the implementation of authentication in a [Next.js](https://nextjs.org) application using [Passport](https://www.passportjs.org), a versatile authentication middleware for Node.js.

I have implemented authentication in several Next.js applications using Passport.js, including username/password authentication, social logins, and SAML strategy. If you need support or consultation for your Next.js authentication implementation, feel free to contact me at [info@antoniogioia.com](mailto:info@antoniogioia.com).

Authentication and session management are essential components of web application security and user experience. Authentication verifies a user's identity, while session management maintains the authenticated state across multiple requests.

Several solutions are available for implementing authentication in Next.js applications, from open source libraries to paid services. The choice depends on project constraints, budget, and development resources.

## Auth Libraries

Using libraries like Passport or NextAuth requires integration with your backend and UI, as well as ongoing maintenance. Implementing custom authentication can be viable if security best practices are followed and well-established libraries are used. Popular options include:

- [NextAuth.js](https://next-auth.js.org): A flexible authentication library for Next.js
- [Passport.js](https://www.passportjs.org): A widely-used authentication middleware for Node.js
- [Lucia Auth](https://lucia-auth.com): An auth library that simplifies session handling

## Paid Auth Solutions

Paid solutions offer quick implementation with pre-built UI components and managed security. However, they can become costly as active user numbers increase and may present challenges when migrating user data. Options include:

- [Auth0](https://auth0.com): A comprehensive identity platform SDK
- [Clerk](https://clerk.com): A complete user management and authentication service
- [Firebase](https://firebase.google.com): Google's authentication service
- [AWS Cognito](https://aws.amazon.com/cognito): Customer identity and access management by AWS

This article focuses on implementing an authentication system in a Next.js application using the library Passport.js with the local strategy (username and password). We'll cover two different approaches for session management:

1. Using cookies for simpler applications
2. Using [Redis](https://redis.io) for more scalable, distributed systems

## Prerequisites

- Basic knowledge of authentication and session management concepts
- A Next.js web application and familiarity with its development process
- An API server or database configured with your Next.js application for user data retrieval
- A Redis server (optional, for the Redis-based session approach)

The code examples in this article serve as a starting point to illustrate key concepts. They are not intended to be a comprehensive implementation of an authentication system.

## Table of Contents

1. Install dependencies
2. Passport.js Local Strategy
3. Session Management with Cookies
4. Alternative: Session Management with Redis
5. Authentication Middleware
6. Protected API Routes
7. Client-Side Authentication
8. Server-Side Authentication
9. Login endpoint
10. Conclusion

## 1. Install dependencies

Install the necessary dependencies:

```bash
npm install passport passport-local @hapi/iron cookie bcryptjs
```

If you're going to use Redis for session management, also install:

```bash
npm install redis ioredis uuid
```

## 2. Passport.js Local Strategy

Create a file `lib/passport/local.js`:

```javascript
import schema from "@/lib/schema/local";
import Local from "passport-local";

async function fetchUser({ email, password }) {
  try {
    // Validate the input using a schema
    const validate = schema.safeParse({ email, password });
    if (!validate.success) {
      // Example error message
      throw new Error("Not valid inputs");
    }

    // Fetch user from the database or API
    // This is just an example fetch()
    // You can replace it with your actual user fetching logic
    const result = await fetch(`${process.env.APP_URL}/api/get-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!result.ok) {
      const errorText = await result.text();
      throw new Error(errorText);
    }

    const data = await result.json();

    // Assuming your backend returns a user object with a "userId" key
    if (!data.userId) {
      throw new Error("User not found");
    }

    // Return user object
    // Do not return the whole user object from the database
    // Return only the required keys like: userId, email
    return data;
  } catch (error) {
    throw new Error(error.message || "User not found");
  }
}

// Define the Passport local strategy
export const localStrategy = new Local.Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    try {
      if (!email || !password) {
        throw new Error("Unable to login user");
      }

      // Attempt to fetch the user
      const user = await fetchUser({ email, password });

      if (user) {
        // If user is found, pass it to the passport middleware
        done(null, { userId: user.userId, email: user.email });
      }
    } catch (error) {
      // If there's an error, pass it to the passport middleware
      done(error.message || "User not found");
    }
  }
);
```

The `process.env.APP_URL` is an environment variable that you should add to your `.env` file. For development, you can add:

```bash
APP_URL="http://localhost:3000"
```

In production, you should change the value to your application domain. Do not forget to enable `https` on your server.

For validation, I use the [zod](https://zod.dev) library. Here's the local schema used for the validation.

File `lib/schema/local`:

```javascript
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().min(1).email(),
  password: z.string().trim().min(8).max(32),
});

export default schema;
```

## 3. Session Management with Cookies

Here's our cookie session library with all the functions related to session handling:

Create a file `lib/session.js`:

```javascript
import Iron from "@hapi/iron";
import { parse, serialize } from "cookie";
import { randomBytes } from "crypto";

const MAX_AGE = 60 * 60 * 8; // 8 hours
const TOKEN_NAME = "myapptoken"; // Set a token name

// Function to set the session cookie
function setCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
}

// Function to remove the session cookie
export function removeCookie(res) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}

// Function to parse cookies from the request
export function parseCookies(req) {
  if (req.cookies) return req.cookies;
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}

// Function to get the session cookie from the request
export function getCookie(req) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}

// Function to create and set a new session
export const setSession = async (res, session) => {
  const createdAt = Date.now();
  const payload = { ...session, createdAt, maxAge: MAX_AGE };

  // Encrypt the session data
  const token = await Iron.seal(
    payload,
    process.env.TOKEN_SECRET,
    Iron.defaults
  );

  setCookie(res, token);
};

// Function to get and decrypt the session data
export const getSession = async (req) => {
  const token = getCookie(req);

  if (!token) return;

  // Decrypt the session data
  const session = await Iron.unseal(
    token,
    process.env.TOKEN_SECRET,
    Iron.defaults
  );
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Check if the session has expired
  if (Date.now() > expiresAt) {
    throw new Error("Session expired");
  }

  return session;
};

// Function to refresh a session
export const refreshSession = async (req, res) => {
  const token = getCookie(req);

  if (!token) {
    throw new Error("No token found");
  }

  try {
    // Decrypt the current session data
    const session = await Iron.unseal(
      token,
      process.env.TOKEN_SECRET,
      Iron.defaults
    );

    // Generate a new CSRF token
    const newCsrfToken = randomBytes(32).toString("hex");

    // Create a new session with updated CSRF token and creation time
    const newSession = {
      ...session,
      csrfToken: newCsrfToken,
      createdAt: Date.now(),
    };

    // Encrypt the new session data
    const newToken = await Iron.seal(
      newSession,
      process.env.TOKEN_SECRET,
      Iron.defaults
    );

    // Set the new session cookie
    setCookie(res, newToken);

    return newSession;
  } catch (error) {
    console.error("Failed to refresh session:", error);
    throw new Error("Unable to refresh session");
  }
};
```

You need to add to your `.env` file a `TOKEN_SECRET` value set with a long random string.

## 4. Alternative: Session Management with Redis

For more scalable applications, you can use Redis to store session data. This approach allows for easier session management across multiple servers and provides more control over session lifecycle.

First, set up a Redis client. Create a file `lib/redis.js`:

```javascript
import { Redis } from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

export default redis;
```

Add `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` to your `.env` file. You should have these values from your Redis install or from your database provider.

Then, create a new file `lib/session-redis.js`:

```javascript
import { v4 as uuidv4 } from "uuid";
import redis from "@/lib/redis";

const SESSION_TTL = 3600; // 1 hour in seconds
const REFRESH_TOKEN_TTL = 2592000; // 30 days in seconds

// Function to create a new session and refresh token
export async function createSession(userId) {
  const sessionId = uuidv4();
  const refreshToken = uuidv4();

  const sessionData = JSON.stringify({
    userId,
    createdAt: Date.now(),
  });

  // Store session and refresh token in Redis
  await redis.setex(`session:${sessionId}`, SESSION_TTL, sessionData);
  await redis.setex(`refresh:${refreshToken}`, REFRESH_TOKEN_TTL, userId);

  return { sessionId, refreshToken };
}

// Function to get session data
export async function getSession(sessionId) {
  const session = await redis.get(`session:${sessionId}`);
  if (!session) return null;
  return JSON.parse(session);
}

// Function to delete a session
export async function deleteSession(sessionId) {
  await redis.del(`session:${sessionId}`);
}

// Function to refresh a session using a refresh token
export async function refreshSession(refreshToken) {
  const userId = await redis.get(`refresh:${refreshToken}`);
  if (!userId) return null;

  // Delete the old refresh token and create a new session
  await redis.del(`refresh:${refreshToken}`);
  return createSession(userId);
}
```

## 5. Authentication Middleware

Create a file `middleware/auth.js`. Here's the version for cookie-based sessions:

```javascript
import { getSession } from "@/lib/session";
import schema from "@/lib/schema/session";

export async function authMiddleware(req, res, next) {
  let session;
  try {
    // Attempt to get the session from the request
    session = await getSession(req);

    // Check if the session exists and contains necessary data
    if (!session || !session.userId || !session.email) {
      throw new Error("Invalid session");
    }

    // Validate the session data using a schema
    const validate = schema.safeParse({
      email: session.email,
      userId: session.userId,
    });

    if (!validate.success) {
      throw new Error("Invalid session");
    }

    // If everything is valid, attach the session to the request object
    req.session = session;
    next();
  } catch (error) {
    // Send the error response
    res
      .status(401)
      .json({ user: null, success: false, error: error || "Unauthorized" });
  }
}
```

Add a schema file to handle validation.
File `lib/schema/session`:

```javascript
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().min(1).email(),
  userId: z.string().regex(/^[0-9a-f]{24}$/),
});

export default schema;
```

For Redis-based sessions, modify the middleware as follows:

```javascript
import { getSession } from "@/lib/session-redis";

export async function authMiddleware(req, res, next) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const session = await getSession(sessionId);

  if (!session) {
    return res.status(401).json({ error: "Invalid session" });
  }

  req.userId = session.userId;
  next();
}
```

## 6. Protected API Routes

Create a file `pages/api/get-session.js`:

```javascript
import { createRouter, expressWrapper } from "next-connect";
import { authMiddleware } from "@/middleware/auth";

const router = createRouter();

// Use the authMiddleware to protect this route
router.use(expressWrapper(authMiddleware)).get(async (req, res) => {
  const session = req.session;

  const { userId, email } = session;

  try {
    // Fetch user data from the database
    // Replace with query to your database or api server
    const user = await getUserFromDatabase(userId, email);

    if (!user) {
      throw new Error("User not found");
    }

    // Send the user data in the response
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(404).json({
      success: false,
      error: error.message || "User not found",
      user: null,
    });
  }
});

// Error handling for the router
export default router.handler({
  onError: (err, req, res) => {
    res.status(err.statusCode || 500).end(err.message);
  },
});
```

In this NextJS API endpoint, we're using the [next-connect](https://www.npmjs.com/package/next-connect) library, which provides a promise-based method for routing and middleware management. This library is particularly useful because:

1. It integrates smoothly with Passport.js and other middleware written in the Express.js style.
2. It allows for easy chaining of different middleware based on the API's requirements.

The `createRouter()` function sets up our router, and we use `expressWrapper(authMiddleware)` to protect this route with our custom authentication middleware.

While this approach uses `next-connect`, you don't have to.
You can rewrite the auth middleware as an higher-order function and wrap your original API route handler with authentication logic.

Here's an example:

```javascript
export function withAuth(handler) {
  return async (req, res) => {
    let session;
    try {
      // Attempt to get the session from the request
      session = await getSession(req);

      // Check if the session exists and contains necessary data
      if (!session || !session.userId || !session.email) {
        throw new Error("Invalid session");
      }

      // Validate the session data using a schema
      const validate = schema.safeParse({
        email: session.email,
        userId: session.userId,
      });

      if (!validate.success) {
        throw new Error("Invalid session");
      }

      // If everything is valid, attach the session to the request object
      req.session = session;

      // Call the handler function
      return await handler(req, res);
    } catch (error) {
      // Handle error
    }
  };
}
```

And you can use it on an API route like this:

```javascript
import { withAuth } from "@/middleware/auth";

async function handler(req, res) {
  // Your protected API logic here
  const { userId, email } = req.session;

  // Example fetch user data
  const user = await getUserFromDatabase(userId, email);

  res.status(200).json({ success: true, user });
}

export default withAuth(handler);
```

Regardless of the method you choose, the underlying concept remains the same: protect your API routes, validate the session, and return the appropriate response based on the authentication status.

## 7. Client-Side Authentication

Create a custom React hook `hooks/useUser.js`:

```javascript
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/get-session");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else if (res.status === 401) {
          // Session expired, try to refresh
          const refreshRes = await fetch("/api/refresh", {
            method: "POST",
          });
          if (refreshRes.ok) {
            // Refresh successful, retry loading user
            loadUser();
          } else {
            // Refresh failed, redirect to login
            router.push("/login");
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, loading };
}
```

### Using `useUser` in the App Router

Here's an example of how to use the `useUser` hook in a component with the App Router:

```javascript
"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login page if user is not authenticated
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

In this example, we're using the `useUser` hook in a client component. The component shows a loading state while the user data is being fetched, redirects to the login page if no user is found, and displays the user's information once it's available.

Remember to wrap your root layout with a provider if you need to access the user data throughout your app:

```javascript
"use client";

import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
```

## 8. Server-Side Authentication

To protect pages on the server-side, you can check the session in `getServerSideProps`:

```javascript
import { getSession } from "@/lib/session";
// Or from "@/lib/session-redis" if using Redis

export const getServerSideProps = async ({ req }) => {
  // Attempt to get the session from the request
  const session = await getSession(req);

  // If there's no session, redirect to the login page
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If there's a valid session, pass the user data to the page
  return {
    props: { user: session },
  };
};
```

## 9. Login endpoint

The last part needed is a login API endpoint to handle the request coming from the login form in our Next.js application. Here's the `/api/login` endpoint code that has the job to authenticate the user and create the session for them:

```javascript
import passport from "passport";
import { localStrategy } from "@/lib/passport/local";
import { setSession } from "@/lib/session";
import { createRouter, expressWrapper } from "next-connect";
import { randomBytes } from "crypto";

const router = createRouter();

passport.use("local", localStrategy);

router.post(async (req, res) => {
  try {
    const user = await new Promise((resolve, reject) => {
      passport.authenticate("local", { session: false }, (error, user) => {
        if (error) {
          reject(error);
        } else if (!user) {
          reject(new Error("Invalid credentials"));
        } else {
          resolve(user);
        }
      })(req, res);
    });

    const session = {
      ...user,
      // Here you can add any useful data about the user session
      csrfToken: randomBytes(32).toString("hex"),
      refreshToken: randomBytes(32).toString("hex"),
    };

    await setSession(res, session);

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        // Add any other non-sensitive user data you want to return
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ success: false, error: error.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).end("Internal Server Error");
  },
});
```

## 10. Conclusion

Authentication is crucial for application security. Stay informed about security practices and regularly audit your system.

As you build an authentication system for production, keep these critical points in mind:

- Use HTTPS in production to secure data in transit.
- Implement CSRF protection and input sanitization.
- Implement rate limiting for endpoints.
- Keep dependencies updated.
- Choose between cookie-based and Redis-based sessions based on your scalability needs.

---

## Notes

Feel free to save or share this article. If you notice a mistake or want to contribute to a revision of the article, contact me at [info@antoniogioia.com](mailto:info@antoniogioia.com).
