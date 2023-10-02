import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userToken = body.token;  // Assuming you pass the user's token in the request body

    const response = await axios.post(
      'https://main-cxgvpi5ruq-ey.a.run.app/api/products',  // Replace with your actual API endpoint
      {
        stripeProductId: "prod_OQvPZP9dhdhGwP",
        type: "subscription",
        schedule: {
          interval: "week",
          intervalCount: body.interval  // Assuming you pass 'interval' in the request body
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,  // Use the user's token
          'Content-Type': 'application/json'
        }
      }
    );

    return new Response(JSON.stringify({ success: true, data: response.data }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: error.response?.status || 500 });
  }
}
