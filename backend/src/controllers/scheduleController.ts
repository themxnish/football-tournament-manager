import { Request, Response } from "express";
import { db } from '../config/prismaClient';

export const createSchedule = async (req: Request, res: Response) => {
    const body = req.body;
    const { date, time, teamAId, teamBId, category, pitch, status } = body;

    try {
        if (!date || !time || !teamAId || !teamBId || !category || !pitch) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (teamAId === teamBId) {
            return res.status(400).json({ message: "A team cannot play against itself" });
        }

        const teamA = await db.team.findUnique({ where: { id: teamAId } });
        const teamB = await db.team.findUnique({ where: { id: teamBId } });

        if (!teamA || !teamB) {
            return res.status(404).json({ message: "One or both teams not found" });
        }

        const dateTime = new Date(`${date}T${time}:00Z`);

        const schedule = await db.schedule.create({
            data: {
                date: dateTime,
                time,
                pitch,
                status,
                category,
                teamA: {
                    connect: { id: teamAId }
                },
                teamB: {
                    connect: { id: teamBId }
                }
            }
        });
        res.status(201).json(schedule);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: `Failed to create schedule: ${errorMessage}` });
    }
};

export const getSchedules = async (req: Request, res: Response) => {
    try {
        const schedules = await db.schedule.findMany({
            include: {
                teamA: true,
                teamB: true
            }
        });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch schedules" });
    }
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const schedule = await db.schedule.delete({
            where: { id: id }
        });
        res.status(200).json({ message: "Schedule deleted successfully", schedule });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete schedule" });
    }
}