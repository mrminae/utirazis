const user = process.env.FLYWHEEL_BASIC_USER;
const password = process.env.FLYWHEEL_BASIC_PASSWORD;
const endpoint = process.env.WPGRAPHQL_URL;

const PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 12) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
        }
        ... on VariableProduct {
          price
        }
      }
    }
  }
`;

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  image?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
  price?: string | null;
};

export async function getProducts(): Promise<StoreProduct[]> {


  if (!user || !password) {
    throw new Error("Flywheel credentials are missing");
  }

  const authorization = Buffer.from(`${user}:${password}`).toString("base64");

  if (!endpoint) {
    throw new Error("WPGRAPHQL_URL is missing in .env.local");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization}`,
    },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GraphQL HTTP error: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors?.length) {
    throw new Error(
      result.errors
        .map((error: { message: string }) => error.message)
        .join("; ")
    );
  }

  if (!result.data?.products?.nodes) {
    throw new Error("GraphQL response does not contain products.nodes");
  }

  return result.data.products.nodes;
}
