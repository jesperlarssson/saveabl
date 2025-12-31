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
    cache: "no-store",
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
export async function getPaginatedRecipes(
  limit: number,
  offset: number,
  endDate: Date
) {
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
        weekNr
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

/* ========= ADD-ONLY: Helpers för diet-växling (veg ↔ meat) ========= */
/*  Enum-värden i Hygraph: VEG / KOTT  */

const HYGRAPH_DIET_ENUM_MAP: Record<"veg" | "meat", string> = {
  veg: "VEG",
  meat: "KOTT",
};

/** Lättvikt: meta för togglern (normaliserar till "veg" | "meat") */
export async function getRecipeMetaForToggle(
  slug: string
): Promise<{
  id: string;
  slug: string;
  title: string;
  weekNr: number;
  recipeNumber: number;
  diet: "veg" | "meat";
} | null> {
  const data = await fetchAPI(
    `
    query GetRecipeMetaForToggle($slug: String!) {
      recept(where: { slug: $slug }) {
        id
        slug
        title
        weekNr
        recipeNumber
        diet
      }
    }
  `,
    { variables: { slug } }
  );

  const r = data?.recept;
  if (!r) return null;

  const arr: string[] = Array.isArray(r.diet) ? r.diet : [r.diet].filter(Boolean);
  const norm = arr.some((v) => String(v).toLowerCase().startsWith("veg"))
    ? "veg"
    : "meat";

  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    weekNr: r.weekNr,
    recipeNumber: r.recipeNumber,
    diet: norm,
  };
}

/** Hitta syskonrecept (samma vecka + nummer, motsatt diet) via enum-filter */
export async function getSiblingRecipeForToggle(
  slug: string
): Promise<{
  id: string;
  slug: string;
  title: string;
  weekNr: number;
  recipeNumber: number;
  diet: "veg" | "meat";
} | null> {
  const current = await getRecipeMetaForToggle(slug);
  if (!current) return null;

  const targetKey: "veg" | "meat" = current.diet === "veg" ? "meat" : "veg";
  const targetEnum = HYGRAPH_DIET_ENUM_MAP[targetKey];

  const data = await fetchAPI(
    `
    query GetSiblingForToggle($week: Int!, $num: Int!, $diet: Diet!) {
      recepts(
        first: 1
        orderBy: publishedAt_DESC
        where: {
          weekNr: $week
          recipeNumber: $num
          diet_contains_some: [$diet]
        }
      ) {
        id
        slug
        title
        weekNr
        recipeNumber
        diet
      }
    }
  `,
    { variables: { week: current.weekNr, num: current.recipeNumber, diet: targetEnum } }
  );

  const s = data?.recepts?.[0];
  if (!s) return null;

  const arr: string[] = Array.isArray(s.diet) ? s.diet : [s.diet].filter(Boolean);
  const norm = arr.some((v) => String(v).toLowerCase().startsWith("veg"))
    ? "veg"
    : "meat";

  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    weekNr: s.weekNr,
    recipeNumber: s.recipeNumber,
    diet: norm,
  };
}

/* --------------------------- Farm shop products --------------------------- */
/**
 * OBS: jag utgår från att din model i Hygraph heter "farmshopProducts"
 * (API ID), vilket matchar dina befintliga queries.
 */

export type FarmShopProductLocalization = {
  locale: string;
  title?: string | null;
  description?: string | null;
  price?: number | null;
};

// ✅ Enum-typer (matchar Hygraph enums)
export type FarmshopProductType = "STRIPE" | "REQUEST";
export type FarmshopRequestType = "DOUBLE_UP";

export type FarmShopProduct = {
  id: string;
  title: string;
  description?: string | null;
  price?: number | null;
  slug: string;
  soldOut?: boolean | null;
  showInNextWeek?: boolean | null;
  sortOrder?: number | null;
  image?: { url: string } | null;
  stripePriceId?: string | null;

  // ✅ NYA FÄLT
  productType?: FarmshopProductType | null;
  requestType?: FarmshopRequestType | null;

  localizations?: FarmShopProductLocalization[];
};

const FARM_SHOP_PRODUCT_FIELDS = `
  id
  title
  description
  price
  slug
  soldOut
  showInNextWeek
  sortOrder
  stripePriceId

  productType
  requestType

  image {
    url(transformation: { image: { resize: { height: 500, width: 700 }}})
  }
  localizations {
    locale
    title
    description
    price
  }
`;

/** Alla produkter för "Just nu i Gårdsbutiken" */
const FARM_SHOP_PRODUCTS_QUERY = `
  query GetFarmShopProducts {
    farmshopProducts(orderBy: sortOrder_ASC) {
      ${FARM_SHOP_PRODUCT_FIELDS}
    }
  }
`;

export async function getFarmShopProducts(): Promise<FarmShopProduct[]> {
  const data = await fetchAPI(FARM_SHOP_PRODUCTS_QUERY, {});
  return data?.farmshopProducts ?? [];
}

/** Produkter markerade med ShowInNextWeek = true */
const NEXT_WEEK_FARM_SHOP_PRODUCTS_QUERY = `
  query GetNextWeekFarmShopProducts {
    farmshopProducts(
      where: { showInNextWeek: true }
      orderBy: sortOrder_ASC
    ) {
      ${FARM_SHOP_PRODUCT_FIELDS}
    }
  }
`;

export async function getNextWeekFarmShopProducts(): Promise<FarmShopProduct[]> {
  const data = await fetchAPI(NEXT_WEEK_FARM_SHOP_PRODUCTS_QUERY, {});
  return data?.farmshopProducts ?? [];
}
