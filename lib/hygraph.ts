async function fetchAPI(
    query: string, 
    { variables, preview } : { variables?: any, preview?: boolean } = {}
  ): Promise<any> {
    const res: Response = await fetch(process.env.HYGRAPH_PROJECT_API!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.HYGRAPH_DEV_AUTH_TOKEN
            : process.env.HYGRAPH_PROD_AUTH_TOKEN
        }`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  
    const json: { data?: any, errors?: any } = await res.json();
  
    if (json.errors) {
      console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID);
      console.error(json.errors);
      throw new Error('Failed to fetch API');
    }
  
    return json.data;
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
    tags: string[];  // Update this if the type is different
    coverImage: Picture;
    author: Author;
  }
  
  interface PostsData {
    posts: Post[];
  }

  export async function getAllPostsForHome(preview: boolean): Promise<Post[]>  {
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
      { preview }
    );
    return data.posts;
  }