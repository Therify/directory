import { trpc } from '@therify/client/data/trpc-client';

export const useSubscriptionProducts = () => {
    const {
        data: productsResponse,
        isLoading,
        isRefetching,
        error,
        refetch: refetchProducts,
    } = trpc.useQuery(
        ['accounts.v1.billing.products.get-subscription-products', {}],
        {
            refetchOnWindowFocus: false,
        }
    );
    const [getProductsErrorMessage] = productsResponse?.errors ?? [];

    return {
        productGroups: productsResponse?.productGroups ?? [],
        error: error?.message || getProductsErrorMessage,
        isLoading: isLoading || isRefetching,
        refetchProducts,
    };
};
