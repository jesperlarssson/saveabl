import { NextResponse } from "next/server";
import { GraphQLClient } from 'graphql-request'

const graphCmsClient = new GraphQLClient(
  process.env.HYGRAPH_PROJECT_API || ""
)

const graphCmsMutationClient = new GraphQLClient(
  "https://api-eu-central-1.graphcms.com/v2/ckli6kx1484ih01xq34wg3e9l/master",
  {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`
    }
  }
)

export { graphCmsClient, graphCmsMutationClient }

export async function POST(request: Request) {
    const body = await request.json();
    const { comment, name, rating, recipeId } = body;
    
  
    try {
      // Ensure customerId is provided
      if (!comment) {
        throw new Error("Comment is required");
      }
  
      const createResponse = await graphCmsMutationClient.request(
        `mutation CreateCommentMutation($name: String!, $rating: Int!, $comment: String!, $authorFirebaseId: String!, $recipeId: ID!) {
            createRecipeComment(data: { name: $name, rating: $rating, comment: $comment, authorFirebaseId: $authorFirebaseId, recipes: { connect: { id: $recipeId } } }) {
              id
            }
          }
          `,
        {
          name: name,
          rating: rating,
          comment: comment,
          authorFirebaseId: "",
          recipeId: recipeId,
        }
      );

      const response = await graphCmsMutationClient
        .request(
          `
        mutation PublishComment($id: ID!) {
          publishRecipeComment(where: {id: $id}, to: PUBLISHED) {
            comment
            id
            name
            authorFirebaseId
            rating
          }
        }
        `,
        {
            id: (createResponse as { createRecipeComment: { id: string } }).createRecipeComment.id,
        }
        )
        .catch(error => console.log(error));
     
  
      return NextResponse.json({ });
    } catch (error) {
      throw error;
    }
  }
  