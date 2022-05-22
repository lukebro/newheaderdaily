export type Schedule = {
    frequency: string;
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
};

export type Header = {
    name: string;
    profileImage: string;
    profileLink: string;
    original: string;
};
