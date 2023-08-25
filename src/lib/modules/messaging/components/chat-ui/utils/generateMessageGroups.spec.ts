import { faker } from '@faker-js/faker';
import { subSeconds } from 'date-fns';
import { Message } from '../types';
import { generateMessageGroups } from './generateMessageGroups';

const getMockMessage = (authorId: string, secondsAgo?: number): Message => {
    return {
        id: faker.datatype.uuid(),
        authorId,
        timestamp: subSeconds(new Date(), secondsAgo ?? 0).getTime(),
        content: 'Hello world!',
    };
};

describe('generateMessageGroups', () => {
    it('should separate messages by author', () => {
        const author1 = faker.datatype.uuid();
        const author2 = faker.datatype.uuid();
        const messages: Message[] = [
            getMockMessage(author1),
            getMockMessage(author2),
            getMockMessage(author1),
        ];
        const messageGroups = generateMessageGroups(messages);
        expect(messageGroups.length).toEqual(3);
        messageGroups.forEach((group, i) => {
            expect(group.length).toEqual(1);
            expect(group[0].authorId).toBe(messages[i].authorId);
        });
    });

    it('should group messages within time window by author', () => {
        const author1 = faker.datatype.uuid();
        const author2 = faker.datatype.uuid();
        const messages: Message[] = [
            getMockMessage(author1),
            getMockMessage(author1),
            getMockMessage(author2),
        ];
        const messageGroups = generateMessageGroups(messages);
        expect(messageGroups.length).toEqual(2);
        expect(messageGroups[0].length).toEqual(2);
        expect(messageGroups[1].length).toEqual(1);
    });

    it("should separate author's messages when time window is exceeded", () => {
        const authorId = faker.datatype.uuid();
        const messages: Message[] = [
            getMockMessage(authorId),
            getMockMessage(authorId, 61),
            getMockMessage(authorId, 91),
            getMockMessage(authorId, 200),
        ];
        const messageGroups = generateMessageGroups(messages);
        expect(messageGroups.length).toEqual(3);
        expect(messageGroups[0].length).toEqual(1);
        expect(messageGroups[1].length).toEqual(2);
        expect(messageGroups[2].length).toEqual(1);
    });

    it('should work regardless of ascending or decending timestamps', () => {
        const authorId = faker.datatype.uuid();
        const ascendingMessages: Message[] = [
            getMockMessage(authorId, 200),
            getMockMessage(authorId, 91),
            getMockMessage(authorId, 61),
            getMockMessage(authorId),
        ];
        const descendingMessages: Message[] = [
            getMockMessage(authorId),
            getMockMessage(authorId, 61),
            getMockMessage(authorId, 91),
            getMockMessage(authorId, 200),
        ];

        const ascendingGroups = generateMessageGroups(ascendingMessages);
        const descendingGroups = generateMessageGroups(descendingMessages);

        expect(ascendingGroups.length).toEqual(3);
        expect(ascendingGroups[0].length).toEqual(1);
        expect(ascendingGroups[1].length).toEqual(2);
        expect(ascendingGroups[2].length).toEqual(1);

        expect(descendingGroups.length).toEqual(3);
        expect(descendingGroups[0].length).toEqual(1);
        expect(descendingGroups[1].length).toEqual(2);
        expect(descendingGroups[2].length).toEqual(1);
    });
});
