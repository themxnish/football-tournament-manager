import { Request, Response } from "express";
import { db } from '../config/prismaClient';
import bcrypt from 'bcrypt';
import { sign, verify } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const isValidPassword = (pwd: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{};:,<.>]).{8,}$/;
      return passwordRegex.test(pwd);
    };

    if (!isValidPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await db.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        role: 'volunteer',
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email, user not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password, please try again." });
    }

    const data = { 
      id: user.id, 
      email: user.email,
      fullName: user.fullName,
      role: user.role
    };
    const token = sign(data, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
      path: "/",
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      message: "user signed in successfully",
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const session = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await db.user.findUnique({ where: { id: (decoded as any).id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ authenticated: true, user: decoded });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie('token', '', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      expires: new Date(0)
    });
    return res.json({ message: "User logged out successfully", success: true }); 
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export const admin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const hash = await bcrypt.hash(adminPassword as string, 10);

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid admin credentials." });
    }
    if (!adminEmail) {
      return res.status(400).json({ message: "ADMIN_EMAIL environment variable is not set." });
    }

    await db.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        fullName: "Super Admin",
        password: hash,
        role: "admin",
      },
    });

    return res.json({ message: "Admin user created successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}