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

        return res.status(201).json({ message: "Match recorded successfully", success: true, matchRecord });
    } catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
}

export const viewRecord = async (req: Request, res: Response) => {
    const { scheduleId } = req.params;
    try {
        if (!scheduleId) {
            return res.status(400).json({ message: "Missing scheduleId parameter" });
        }

        const record = await db.matchRecord.findFirst({ 
            where: { scheduleId },
            include: {
                schedule: {
                    include: {
                        teamA: true,
                        teamB: true,
                    }
                }
            }
        });

        if (!record) {
            return res.status(404).json({ message: "Match record not found" });
        }

        const winner = {
            name: record.winner === record.schedule.teamA.id
                ? record.schedule.teamA.name
                : record.winner === record.schedule.teamB.id
                ? record.schedule.teamB.name
                : "N/A"
        };
        
        const response = {
            id: record.id,
            scheduleId: record.scheduleId,
            date: record.schedule.date,
            time: record.schedule.time,
            pitch: record.schedule.pitch,
            category: record.schedule.category,
            teamA: record.schedule.teamA.name,
            teamB: record.schedule.teamB.name,
            scoreA: record.scoreA,
            scoreB: record.scoreB,
            scorersA: record.scorersA,
            scorersB: record.scorersB,
            potmA: record.potmA,
            potmB: record.potmB,
            winner: winner.name,
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
}