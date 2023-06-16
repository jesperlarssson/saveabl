import { getDatesFromWeek } from "@/helpers/format";

async function fetchAPI(
  query: string,
  { variables, mutation }: { variables?: any; mutation?: boolean } = {}
): Promise<any> {
  const res: Response = await fetch(process.env.HYGRAPH_PROJECT_API!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        mutation
          ? process.env.HYGRAPH_MUTATION_TOKEN
          : process.env.HYGRAPH_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json: { data?: any; errors?: any } = await res.json();

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID);
    console.error(json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export async function sendMutation(
  mutation: string,
  variables: any
): Promise<any> {
  try {
    const response = await fetchAPI(mutation, { variables, mutation: true });
    return response;
  } catch (error) {
    console.error("Error executing mutation:", error);
    throw error;
  }
}

interface Picture {
  url: string;
}

interface Author {
  name: string;
  title: string;
  picture: Picture;
}

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  coverImage: Picture;
  author: Author;
}

interface PostsData {
  posts: Post[];
}

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
              image: {
                resize: {
                  fit:crop,
                  width:2000,
                  height:1000
                }
              }
            })
          }
          author {
            name
            title
            picture {
              url(transformation: {
                image: {
                  resize: {
                    width:200,
                    height:200,
                    fit:crop
                  }
                }
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

export async function getLatestPromotionBanner() {
  const data = await fetchAPI(
    `
      query GetLatestPromotionBanner {
        promotionBanners(first: 1, orderBy: publishedAt_DESC) {
          content {
            html
          }
        }
      }
    `
  );
  return data.promotionBanners;
}

export async function getAllRecipes() {
  const data = await fetchAPI(
    `
    query GetRecipes {
      recepts(orderBy: startDate_DESC) {
        id
        title
        slug
        startDate
        recipeNumber
        steg
        ingredients
        nutritionalValues
        savedIngredients
        contentAllergies
        chef {
          name
          title
        }
        image {
          url(transformation: {image: {resize: {height: 500, width: 700}}})
        }
      }
    }
  `
  );
  return data.recepts;
}

// export async function getPaginatedRecipes(limit: number, offset: number) {
//   const variables = { limit, offset };
//   const data = await fetchAPI(
//     `
//     query GetRecipes($limit: Int!, $offset: Int!) {
//       recepts(orderBy: startDate_DESC, first: $limit, skip: $offset) {
//         id
//         title
//         slug
//         startDate
//         recipeNumber
//         steg
//         ingredients
//         nutritionalValues
//         savedIngredients
//         contentAllergies
//         chef {
//           name
//           title
//         }
//         image {
//           url(transformation: {image: {resize: {height: 500, width: 700}}})
//         }
//       }
//     }
//   `,
//     { variables }
//   );
//   return data.recepts;
// }

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
        where: {startDate_lte: $endDate}
      ) {
        id
        title
        slug
        startDate
        recipeNumber
        chef {
          name
          title
        }
        image {
          url(transformation: {image: {resize: {height: 500, width: 700}}})
        }
      }
    }
  `,
    { variables }
  );
  return data.recepts;
}

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
        includedIn {
          title
        }
        estimatedDuration
        excerpt
        image {
          url(transformation: {image: {resize: {height: 500, width: 700}}})
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
          videoClip {
            title
            video {
              url
            }
          }
        }
        author {
          name
          picture {
            url(transformation: {image: {resize: {height: 40, width: 40}}})
          }
        }
      }
    }
  `,
    { variables }
  );
  return data.publicRecipes;
}

export async function getRecipesForWeek(week: number) {
  const dates = getDatesFromWeek(week);
  console.log(dates);

  const data = await fetchAPI(
    `
    query GetRecipes($dates: [Date!]) {
      recepts(
        orderBy: recipeNumber_ASC, 
        where: {startDate_in: $dates}
      ) {
        id
        title
        slug
        startDate
        recipeNumber
        chef {
          name
          title
        }
        image {
          url(transformation: {image: {resize: {height: 500, width: 700}}})
        }
      }
    }
  `,
    { variables: { dates } }
  );

  return data.recepts;
}

export async function getAllRecipesWithSlug() {
  const data = await fetchAPI(
    `
    query GetSlugs {
      recepts {
        slug
      }
    }
  `
  );
  return data.recepts;
}

export async function getRecipeWithSlug(slug: string) {
  const data = await fetchAPI(
    `
    query GetRecipe($slug: String!) {
      recept(where: {slug: $slug}) {
        id
        title
        slug
        startDate
        recipeNumber
        steg
        ingredients
        nutritionalValues
        savedIngredients
        contentAllergies
        chef {
          name
          title
        }
        image {
          url(transformation: {image: {resize: {height: 800, width: 1200}}})
        }
        freezabl
      }
    }
  `,
    { variables: { slug } }
  );
  return data.recept;
}
