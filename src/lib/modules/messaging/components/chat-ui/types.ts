export interface Channel {
    id: string;
    caseStatus: 'active' | 'resolved';
    title: string;
    lastMessage: string;
    lastMessageTimestamp: string;
    authorAvatarUrl: string;
    authorStatus: ChatUser['status'];
    authorName: string;
    unreadMessages: number;
}

export interface Message {
    id: string;
    content: string;
    timestamp: number;
    authorId: string;
}

export interface ChatUser {
    userId: string;
    givenName: string;
    surname: string;
    avatarUrl?: string;
    status: 'online' | 'away' | 'offline';
}
