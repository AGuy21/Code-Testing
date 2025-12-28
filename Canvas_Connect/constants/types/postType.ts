export type postType = {
    id: string;
    title: string;
    description: string;
    image: string;
    creatorEmail: string;
    likes: number;
    likedBy?: string[];
    commentsCount?: number;
    createdAt?: any;
};