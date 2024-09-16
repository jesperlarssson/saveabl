import { NextResponse } from 'next/server';
import axios from 'axios';

// Hämta access token från Gordon API
const getAccessToken = async () => {
  const result = await axios.post(process.env.GORDON_ACCESS_URL!, {
    client_id: process.env.GORDON_CLIENT_ID,
    client_secret: process.env.GORDON_CLIENT_SECRET,
    audience: "https://gordonapi.herokuapp.com/",
    grant_type: "client_credentials",
  });

  return result.data.access_token;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postalCode = searchParams.get('postalCode');

  try {
    // Hämta access token
    const accessToken = await getAccessToken();

    // Gör anrop till Gordon Delivery API
    const response = await axios.get(
      `https://backend.aws.gordondelivery.com/api/deliverywindow/checkout/${postalCode}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Returnera data tillbaka till frontend
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios-specifika fel
      console.error("Error fetching delivery windows from Gordon:", error.response?.data || error.message);
      return NextResponse.json(
        { error: 'Error fetching delivery windows', details: error.response?.data || error.message },
        { status: 500 }
      );
    } else if (error instanceof Error) {
      // Vanligt JavaScript-fel
      console.error("General error fetching delivery windows:", error.message);
      return NextResponse.json(
        { error: 'General error fetching delivery windows', details: error.message },
        { status: 500 }
      );
    } else {
      // Okänt fel
      console.error("Unknown error occurred:", error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

