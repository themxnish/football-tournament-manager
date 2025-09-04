import { Request, Response } from "express";
import { db } from '../config/prismaClient';

export const create = async (req: Request, res: Response) => {
    const { name, category, coach } = req.body;
    try {
        if (!name || !category || !coach) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        //have to check for admin role here

        const existingTeam = await db.team.findFirst({ where: { name } });
        if (existingTeam) {
            return res.status(409).json({ message: "Team with this name already exists" });
        }

        const team = await db.team.create({
            data: {
                name,
                category,
                coach
            }
        });
        return res.status(201).json({ team, message: "Team created successfully" });
    } catch (error) {
        console.error("Error creating team:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const teams = async (req: Request, res: Response) => {
    try {
        const teams = await db.team.findMany();
        return res.status(200).json({ teams });
    } catch (error) {
        console.error("Error fetching teams:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};