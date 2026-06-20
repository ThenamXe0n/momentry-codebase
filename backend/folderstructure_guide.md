# Backend folder structure guide

## common shared feature and coder are kept in shared folder

>### folder structure we are following is feature based (modules)
>### route connection and middleware and express server creation done in app.js
>### server is listened in server.js file our main file

> Flow of any modules or featur

```
Request
   ↓
Route
   ↓
Validation
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```


### Example :

#1. auth.model.js

write database schema here 
```
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});

module.exports =
  mongoose.model("User", userSchema);
```
---
#2. auth.repository.js
Database queries only like find , findbyId , findbyIdAndDelete etc.

```
const User =
  require("./auth.model");

exports.findByEmail =
  async (email) => {
    return User.findOne({ email });
  };

exports.createUser =
  async (data) => {
    return User.create(data);
  };
```
Responsibility

✅ MongoDB queries

❌ Password hashing

❌ JWT generation

❌ Validation

---
#3. auth.service.js

Business logic like encryption , message emmiting , token generation etc

```
const bcrypt =
  require("bcrypt");

const jwt =
  require("jsonwebtoken");

const authRepository =
  require("./auth.repository");

exports.register =
  async (data) => {

    const existingUser =
      await authRepository.findByEmail(
        data.email
      );

    if (existingUser) {
      throw new Error(
        "Email already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const user =
      await authRepository.createUser({
        ...data,
        password: hashedPassword
      });

    return user;
  };

exports.login =
  async (email, password) => {

    const user =
      await authRepository.findByEmail(
        email
      );

    if (!user) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const token =
      jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET
      );

    return {
      token,
      user
    };
  };
```
Responsibility

✅ Business logic

✅ Password hashing

✅ Password comparison

✅ JWT generation

❌ HTTP response

❌ req.body handling

---
#4. auth.controller.js
Request and response handling.
```
const authService =
  require("./auth.service");

exports.register =
  async (req, res, next) => {
    try {

      const user =
        await authService.register(
          req.body
        );

      res.status(201).json({
        success: true,
        data: user
      });

    } catch (error) {
      next(error);
    }
  };

exports.login =
  async (req, res, next) => {
    try {

      const result =
        await authService.login(
          req.body.email,
          req.body.password
        );

      res.json({
        success: true,
        data: result
      });

    } catch (error) {
      next(error);
    }
  };
```
Responsibility

✅ Read req.body

✅ Call service

✅ Send response

❌ Business logic

❌ Database queries

---

#5. auth.validation.js 
Input validation created here can use Joi or Zod

```
const Joi = require("joi");

exports.registerSchema =
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });

exports.loginSchema =
  Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
  });
```

Responsibility

✅ Validate request payload

❌ Business logic

---

#6. auth.routes.js
Route definitions.

```
const express =
  require("express");

const router =
  express.Router();

const authController =
  require("./auth.controller");

const {
  registerSchema,
  loginSchema
} =
  require("./auth.validation");

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

module.exports = router;
```

Responsibility

✅ Route mapping

❌ Business logic


---

## Real Login Request
User hits:
```
POST /auth/login
```
Body:
```
{
  "email": "nameet@gmail.com",
  "password": "123456"
}
```
##Execution flow
```
auth.routes.js
        ↓
auth.validation.js
        ↓
auth.controller.js
        ↓
auth.service.js
        ↓
auth.repository.js
        ↓
MongoDB
```
>Response comes back the same path.

