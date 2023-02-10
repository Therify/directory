export const getDateFromStripeTimestamp = (timestamp: number): Date => {
    // Stripe timestamps are in seconds, not milliseconds
    return new Date(timestamp * 1000);
};
