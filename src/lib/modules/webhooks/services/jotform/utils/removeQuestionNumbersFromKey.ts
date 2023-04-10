export const removeQuestionNumbersFromKey = (key: string) => {
    const keyParts = key.split('_');
    if (keyParts.length === 1 || !keyParts[0].startsWith('q')) {
        return key;
    }

    return keyParts.slice(1).join('_');
};
