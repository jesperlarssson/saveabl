import { getDatesFromWeek } from "@/helpers/format";
import { Post, PostsData } from "@/types";
import { tempRecipes } from "./tempRecipes";
import { tempHomePosts, tempPostSlugs, tempPosts } from "./tempPosts";
import { tempFaq } from "./tempFaq";

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

export async function getAllPostsForHome(mutation: boolean): Promise<Post[]> {
  // const posts: Post[] = tempHomePosts;
  // return posts;
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

export async function getAllPostsWithSlug() {
  const slugs = tempPostSlugs;
  return slugs;
  const data = await fetchAPI(
    `
    query GetSlugs {
      posts {
        slug
      }
    }
  `
  );
  return data.posts;
}

export async function getPostWithSlug(slug: string) {
  // const post = tempPosts.find((post) => post.slug === slug);
  // return post;
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
        content {
          html
        }
        date
        postComment(orderBy: publishedAt_DESC) {
          name
          id
          comment
        }
        ogImage: coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        author {
          name
          title
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
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
  // const posts = tempPosts.slice(offset, offset + limit);
  // return posts;
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
    { variables }
  );
  return data.posts;
}

export async function getLatestPromotionBanner() {
//  const banner = [
//     {
//       "id": "clippe5kmy1t50bt2s6pkbz7y",
//       "content": {
//         "html": "<p>Thank you for choosing 5 x lower carbon footprint &lt;3</p>"
//       },}
//   ];
//   return banner;
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
  // const recipes = tempRecipes.data.recepts;
  // return recipes;
  const data = await fetchAPI(
    `
    query GetRecipes {
      recepts(orderBy: startDate_DESC) {
        id
        title
        slug
        startDate
        weekNr
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
        localizations {
          contentAllergies
          ingredients
          nutritionalValues
          steg
          title
        }
      }
    }
  `
  );
  return data.recepts;
}

export async function getPaginatedRecipes(
  limit: number,
  offset: number,
  endDate: Date
) {
  const variables = { limit, offset, endDate };

  // const recipes = tempRecipes.data.recepts.slice(offset, offset + limit);
  // return recipes;
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
        weekNr
        recipeNumber
        chef {
          name
          title
        }
        image {
          url(transformation: {image: {resize: {height: 500, width: 700}}})
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

export async function getPaginatedOldRecipes(limit: number, offset: number) {
  // return [];
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

  // const recipes = tempRecipes.data.recepts.filter((recipe) => recipe.weekNr === week);
  // return recipes;

  const data = await fetchAPI(
    `
    query GetRecipes($week: Int!) {
      recepts(
        orderBy: recipeNumber_ASC, 
        where: {weekNr: $week}
      ) {
        id
        title
        slug
        startDate
        weekNr
        recipeNumber
        chef {
          name
          title
        }
        image {
          url(transformation: {image: {resize: {height: 500, width: 700}}})
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


export async function getAllFAQ() {
  // const faqs = tempFaq;
  // return faqs;
  const data = await fetchAPI(`
    {
      faqs {
        answer
        question
      }
    }
  `);
  return data.faqs;
}

// export async function getRecipesForWeek(week: number) {
//   const dates = getDatesFromWeek(week);
//   console.log(dates);

//   const data = await fetchAPI(
//     `
//     query GetRecipes($dates: [Date!]) {
//       recepts(
//         orderBy: recipeNumber_ASC,
//         where: {startDate_in: $dates}
//       ) {
//         id
//         title
//         slug
//         startDate
//         weekNr
//         recipeNumber
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
//     { variables: { dates } }
//   );

//   return data.recepts;
// }

export async function getAllRecipesWithSlug() {
  // const slugs = tempRecipes.data.recepts.map((recipe) => recipe.slug);
  // return slugs;

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
  // const recipe = tempRecipes.data.recepts.find((recipe) => recipe.slug === slug);
  // return recipe;
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
          picture {
            url
          }
        }
        image {
          url(transformation: {image: {resize: {height: 800, width: 1200}}})
        }
        localizations {
          contentAllergies
          ingredients
          nutritionalValues
          savedIngredients
          ingredients
          steg
          title
        }
        recipeComments {
          comment
          createdAt
          name
          rating
        }
        freezabl
      }
    }
  `,
    { variables: { slug } }
  );
  return data.recept;
}