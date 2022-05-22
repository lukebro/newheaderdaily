export type Schedule = {
    frequency: string;
    changeOn: string;
    status: string;
    active: boolean;
    timeTillChange: {
        hours: number;
        minutes: number;
    };
};

export type User = {
    username: string;
    name: string;
    avatar: string;
    utcOffset: number;
};

export type Header = {
    name: string;
    profileImage: string;
    profileLink: string;
    original: string;
};
