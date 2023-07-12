import axios from "axios";

const getAccessToken = async () => {
  const result = await axios.post(process.env.GORDON_ACCESS_URL!, {
    client_id: process.env.GORDON_CLIENT_ID,
    client_secret: process.env.GORDON_CLIENT_SECRET,
    audience: "https://gordonapi.herokuapp.com/",
    grant_type: "client_credentials",
  });

  return result.data.access_token;
};

export async function POST(request: Request) {
  try {
    const accessToken = await getAccessToken();
    const body = await request.json();

    // If its thursday, friday or saturday we check for deliverydays starting next monday.
    // If not, check from current day.

    const d = new Date();
    const day = d.getDay();

    let startDate = "";
    if (day === 4 || day === 5 || day === 6) {
      d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
      startDate = d.toISOString().split("T")[0];
    }

    const result = await axios.get(
      `https://backend.aws.gordondelivery.com/api/deliverywindow/checkout/${
        body.zipCode
      }${startDate ? `?startdate=${startDate}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return new Response(JSON.stringify(result.data));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}
