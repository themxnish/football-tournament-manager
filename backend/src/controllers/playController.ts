import { Request, Response } from "express";
import { db } from '../config/prismaClient';

export const recordMatch = async (req: Request, res: Response) => {
    const { scheduleId, teamAId, teamBId, scoreA, scoreB, scorersA, scorersB, potmA, potmB, winner } = req.body;
    try {
        if (!scheduleId || !teamAId || !teamBId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingRecord = await db.matchRecord.findFirst({ where: { scheduleId } });
        if (existingRecord)
        return res.status(409).json({ message: "Match record already exists for this schedule" });

        const matchRecord = await db.matchRecord.create({
            data: {
                scheduleId, teamAId, teamBId, scoreA, scoreB, scorersA, scorersB, potmA, potmB, winner
            }
        });

        await db.schedule.update({
            where: { id: scheduleId },
            data: { status: true }
        });

        return res.status(201).json(matchRecord);
    } catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
}