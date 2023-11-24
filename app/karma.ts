import {Client, Product} from "@socialbaking/karma/client";

export const karma = new Client({
    accessToken: process.env.KARMA_ACCESS_TOKEN,
    partnerId: process.env.KARMA_PARTNER_ID
})

export interface ProductInfo {
    productName: string;
    productImage: string;
    organisationName: string;
    organisationImage: string;
}

export async function listProducts() {
    return await karma.listProducts();
}

export async function listOrganisations() {
    return await karma.listOrganisations();
}

async function getOrganisations() {
    const organisations = await listOrganisations();
    return Object.fromEntries(
        organisations
            .map(organisation => [organisation.organisationId, organisation] as const)
    )
}

export async function getProductImages(products: Product[]) {
    const images = await Promise.all(
        products.map(
            async (product) => {
                const url = new URL(`/api/version/1/products/${product.productId}/image`, karma.baseUrl);
                url.searchParams.set("index", "0");
                url.searchParams.set("public", "");
                const response = await fetch(
                    url.toString(),
                    {
                        redirect: "manual"
                    }
                );
                const location = response.headers.get("location");
                if (response.status !== 302 || !location) {
                    return undefined;
                }
                return [product.productId, location] as const;
            }
        )
    );
    return Object.fromEntries(
        images
            .filter((entry): entry is [string, string] => !!entry)
    );
}

export async function listProductInfo() {
    const products = await listProducts();
    const organisations = await getOrganisations();
    const images = await getProductImages(products);

    return products
        .filter(product => images[product.productId])
        .map((product): ProductInfo => ({
            productName: product.productName,
            productImage: images[product.productId],
            organisationName: organisations[product.licencedOrganisationId ?? product.organisationId ?? ""]?.organisationName ?? "",
            organisationImage: 'images/wework/medleaf-logo.svg',
        }));
}