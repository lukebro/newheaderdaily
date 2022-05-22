import prisma from 'lib/prisma';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import type { Header, Schedule, User } from 'types';

export const getHeader = async (id: number): Promise<Header | null> => {
    const header = await prisma.header.findUnique({
        where: {
            userId: id,
        },
        select: {
            name: true,
            profileImage: true,
            profileLink: true,
            original: true,
        },
    });

    if (!header) {
        return null;
    }

    return header as Header;
};

export const getSchedule = async (id: number): Promise<Schedule | null> => {
    const schedule = await prisma.schedule.findUnique({
        where: {
            userId: id,
        },
        select: {
            frequency: true,
            changeOn: true,
            status: true,
            active: true,
        },
    });

    if (!schedule) {
        return null;
    }

    const now = new Date();
    const hours = differenceInHours(schedule.changeOn, now);
    const minutes = differenceInMinutes(schedule.changeOn, now) - hours * 60;
    const timeTillChange = {
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
    };

    return {
        frequency: schedule.frequency,
        status: schedule.status,
        active: schedule.active,
        timeTillChange,
    } as Schedule;
};
