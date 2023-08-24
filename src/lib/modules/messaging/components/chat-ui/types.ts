export interface IChannel {
    id: string;
    caseStatus: 'active' | 'resolved';
    title: string;
    lastMessage: string;
    lastMessageTimestamp: string;
    authorAvatarUrl: string;
    isOnline: boolean;
    authorName: string;
    unreadMessages: number;
}
