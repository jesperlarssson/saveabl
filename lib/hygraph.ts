import { Post, PostsData } from "@/types";

/**
 * Single source of truth for all Hygraph requests.
 * - No caching: always fetch fresh content (no redeploy needed after CMS publish)
 */
async function fetchAPI(
  query: string,
  { variables, mutation }: { variables?: any; mutation?: boolean } = {}
): Promise<any> {
  const res: Response = await fetch(process.env.HYGRAPH_PROJECT_API!, {
    method: "POST",
    cache: "no-store",            // ⬅️ disable Next.js cache
    next: { revalidate: 0 },      // ⬅️ disable ISR revalidation
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        mutation
          ? process.env.HYGRAPH_MUTATION_TOKEN
          : process.env.HYGRAPH_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: { data?: any; errors?: any } = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export async function sendMutation(mutation: string, variables: any): Promise<any> {
  return await fetchAPI(mutation, { variables, mutation: true });
}

/* -------------------------------- Posts ---------------------------------- */

export async function getAllPostsForHome(mutation: boolean): Promise<Post[]> {
  const data: PostsData = await fetchAPI(
    `
      {
        posts(orderBy: date_DESC, first: 8) {
          title
          slug
          excerpt
          date
          tags
          coverImage {
            url(transformation: {
              image: { resize: { fit: crop, width: 2000, height: 1000 } }
            })
          }
          author {
            name
            title
            picture {
              url(transformation: {
                image: { resize: { width: 200, height: 200, fit: crop } }
              })
            }
          }
        }
      }
    `,
    { mutation }
  );
  return data.posts;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    query GetSlugs {
      posts { slug }
    }
  `);
  return data.posts;
}

export async function getPostWithSlug(slug: string) {
  const data = await fetchAPI(
    `
    query GetPost($slug: String!) {
      post(where: {slug: $slug}) {
        id
        title
        excerpt
        slug
        tags
        seoKeywords
        content { html }
        date
        postComment(orderBy: publishedAt_DESC) {
          name
          id
          comment
        }
        ogImage: coverImage {
          url(transformation: { image: { resize: { fit: crop, width: 2000, height: 1000 }}})
        }
        coverImage {
          url(transformation: { image: { resize: { fit: crop, width: 2000, height: 1000 }}})
        }
        author {
          name
          title
          picture {
            url(transformation: { image: { resize: { fit: crop, width: 100, height: 100 }}})
          }
        }
      }
    }
  `,
    { variables: { slug } }
  );
  return data.post;
}

export async function getPaginatedPosts(limit: number, offset: number) {
  const variables = { limit, offset };
  const data = await fetchAPI(
    `
    query GetPosts($limit: Int!, $offset: Int!) {
      posts(orderBy: createdAt_DESC, first: $limit, skip: $offset) {
        title
        slug
        excerpt
        date
        tags
        coverImage {
          url(transformation: {
            image: { resize: { fit: crop, width: 2000, height: 1000 } }
          })
        }
        author {
          name
          title
          picture {
            url(transformation: {
              image: { resize: { width: 200, height: 200, fit: crop } }
            })
          }
        }
      }
    }
  `,
    { variables }
  );
  return data.posts;
}

/* -------------------------- Promotion banners ---------------------------- */

export async function getLatestPromotionBanner() {
  const data = await fetchAPI(`
    query GetLatestPromotionBanner {
      promotionBanners(first: 1, orderBy: publishedAt_DESC) {
        content { html }
      }
    }
  `);
  return data.promotionBanners;
}

/* -------------------------------- Recipes -------------------------------- */

/**
 * Legacy: alla recept (behövs av vissa vyer)
 */
export async function getAllRecipes() {
  const data = await fetchAPI(`
    query GetRecipes {
      recepts(orderBy: startDate_DESC) {
        id
        title
        slug
        startDate
        weekNr
        recipeNumber
        diet
        steg
        ingredients
        nutritionalValues
        savedIngredients
        contentAllergies
        chef { name title }
        image {
          url(transformation: { image: { resize: { height: 500, width: 700 }}})
        }
        localizations {
          contentAllergies
          ingredients
          nutritionalValues
          steg
          title
        }
      }
    }
  `);
  return data.recepts;
}

/**
 * Används av "Äldre recept" (serverpaginering – legacy)
 */
export async function getPaginatedRecipes(limit: number, offset: number, endDate: Date) {
  const variables = { limit, offset, endDate };
  const data = await fetchAPI(
    `
    query GetRecipes($limit: Int!, $offset: Int!, $endDate: Date!) {
      recepts(
        orderBy: startDate_DESC,
        first: $limit,
        skip: $offset,
        where: { startDate_lte: $endDate }
      ) {
        id
        title
        slug
        startDate
        weekNr
        recipeNumber
        diet
        chef { name title picture { url } }
        image {
          url(transformation: { image: { resize: { height: 500, width: 700 }}})
        }
        localizations {
          contentAllergies
          ingredients
          nutritionalValues
          steg
          title
        }
      }
    }
  `,
    { variables }
  );
  return data.recepts;
}

/**
 * Legacy: äldre publika recept (annan modell)
 */
export async function getPaginatedOldRecipes(limit: number, offset: number) {
  const variables = { limit, offset };
  const data = await fetchAPI(
    `
    query GetRecipes($limit: Int!, $offset: Int!) {
      publicRecipes(orderBy: createdAt_DESC, first: $limit, skip: $offset) {
        createdAt
        slug
        ingredients
        nutritionalValues
        savedIngredients
        comments(orderBy: publishedAt_DESC) {
          name
          rating
          id
          comment
          authorFirebaseId
        }
        includedIn { title }
        estimatedDuration
        excerpt
        image {
          url(transformation: { image: { resize: { height: 500, width: 700 }}})
        }
        title
        recipeSteps(orderBy: stepNumber_ASC) {
          description
          extra
          ingredients {
            amount
            text
            unit
            item {
              isRescued
              expireDate
              inStock
              category
              itemName
            }
          }
          stepNumber
          timerMinutes
          videoClip { title video { url } }
        }
        author {
          name
          picture {
            url(transformation: { image: { resize: { height: 40, width: 40 }}})
          }
        }
      }
    }
  `,
    { variables }
  );
  return data.publicRecipes;
}

/**
 * Legacy: hämta recept för en given vecka (används ev. av gamla endpoints)
 */
export async function getRecipesForWeek(week: number) {
  const data = await fetchAPI(
    `
    query GetRecipes($week: Int!) {
      recepts(orderBy: recipeNumber_ASC, where: { weekNr: $week }) {
        id
        title
        slug
        startDate
        weekNr
        recipeNumber
        diet
        chef { name title picture { url } }
        image {
          url(transformation: { image: { resize: { height: 500, width: 700 }}})
        }
        localizations {
          contentAllergies
          ingredients
          nutritionalValues
          steg
          title
        }
      }
    }
  `,
    { variables: { week } }
  );

  return data.recepts;
}

/**
 * Ny: hämta senaste recepten i publiceringsordning (för rullande flödet)
 * returnerar fält som behövs för listor/tiles och gruppering
 */
export async function getLatestRecipes(limit: number = 120) {
  const data = await fetchAPI(
    `
    query GetLatestRecipes($limit: Int!) {
      recepts(orderBy: publishedAt_DESC, first: $limit) {
        id
        title
        slug
        startDate
        weekNr
        recipeNumber
        diet
        image {
          url(transformation: { image: { resize: { height: 500, width: 700 }}})
        }
        chef { name title picture { url } }
        # localizations med locale valfri – om du vill slå upp språk i klient
        localizations {
          locale
          title
          ingredients
          nutritionalValues
          steg
          savedIngredients
          contentAllergies
          spicyIngredients
        }
        publishedAt
      }
    }
  `,
    { variables: { limit } }
  );
  return data.recepts;
}

export async function getAllFAQ() {
  const data = await fetchAPI(`
    { faqs { answer question } }
  `);
  return data.faqs;
}

export async function getAllRecipesWithSlug() {
  const data = await fetchAPI(`
    query GetSlugs {
      recepts { slug }
    }
  `);
  return data.recepts;
}

export async function getRecipeWithSlug(slug: string) {
  const data = await fetchAPI(
    `
    query GetRecipe($slug: String!) {
      recept(where: { slug: $slug }) {
        id
        title
        slug
        startDate
        recipeNumber
        diet
        steg
        ingredients
        spicyIngredients
        nutritionalValues
        savedIngredients
        contentAllergies
        chef { name title picture { url } }
        image {
          url(transformation: { image: { resize: { height: 800, width: 1200 }}})
        }
        localizations {
          locale
          contentAllergies
          ingredients
          nutritionalValues
          savedIngredients
          steg
          title
          spicyIngredients
        }
        recipeComments { comment createdAt name rating }
        freezabl
      }
    }
  `,
    { variables: { slug } }
  );

  return data.recept;
}

/* ----------------------- Singleton: RecipeWeekConfig ---------------------- */

export type RecipeWeekConfig = { nextWeekOrderUntil: number };

export async function getRecipeWeekConfig(): Promise<RecipeWeekConfig | null> {
  const data = await fetchAPI(`
    query GetRecipeWeekConfig {
      recipeWeekConfigs(first: 1, orderBy: updatedAt_DESC) {
        nextWeekOrderUntil
      }
    }
  `);
  return data?.recipeWeekConfigs?.[0] ?? null;
}

/* ------------------------ Delivery dates by product ----------------------- */

export type ProductDates = {
  product: string;
  saturday?: string | null; // yyyy-mm-dd
  sunday?: string | null;
  monday?: string | null;
  soldOut?: boolean | null;
};

const DELIVERY_DATE_BY_PRODUCT = /* GraphQL */ `
  query DeliveryDateByProduct($product: String!) {
    deliveryDates(
      first: 1
      orderBy: updatedAt_DESC
      where: { product: $product }
    ) {
      product
      saturday
      sunday
      monday
      soldOut
    }
  }
`;

/**
 * Hämtar datum-posten för en given produkt (t.ex. "Saveabl Gård" eller "Saveabl Grön").
 * Returnerar null om det inte finns någon post.
 */
export async function getDeliveryDatesForProduct(
  product: string
): Promise<ProductDates | null> {
  const data = await fetchAPI(DELIVERY_DATE_BY_PRODUCT, {
    variables: { product },
  });
  return (data?.deliveryDates && data.deliveryDates[0]) || null;
}

/* --------------------------- Pause week options --------------------------- */

export type PauseWeekOptions = {
  weeks: number[];
  enabled?: boolean | null;
};

const PAUSE_WEEKS_QUERY = /* GraphQL */ `
  query GetPauseWeeks {
    pauseWeekOptions(stage: PUBLISHED, first: 1, orderBy: updatedAt_DESC) {
      weeks
      enabled
      updatedAt
    }
  }
`;

/**
 * Hämtar hela objektet (weeks + enabled).
 */
export async function getPauseWeekSettings(): Promise<PauseWeekOptions | null> {
  const data = await fetchAPI(PAUSE_WEEKS_QUERY, {});
  const item = data?.pauseWeekOptions?.[0];
  if (!item) return null;
  return {
    weeks: Array.isArray(item.weeks) ? item.weeks : [],
    enabled: item.enabled ?? true,
  };
}

/**
 * Smidig hjälpare om du bara vill ha veckorna.
 */
export async function getPauseWeeks(): Promise<number[]> {
  const settings = await getPauseWeekSettings();
  return settings?.weeks ?? [];
}
