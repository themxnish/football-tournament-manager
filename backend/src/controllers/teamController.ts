import { Request, Response } from "express";
import { db } from '../config/prismaClient';

export const create = async (req: Request, res: Response) => {
    const { name, category, coach } = req.body;
    try {
        if (!name || !category || !coach) {
            return res.status(400).json({ message: "All fields are required" });
        }

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

export const remove = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: "Please provide a team name" });
        }

        const team = await db.team.findFirst({ where: { name } });
        if (!team) return res.status(404).json({ message: "Team not found" });

        const { id } = team;
        await db.team.delete({ where: { id } });
        
        return res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        console.error("Error deleting team:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}