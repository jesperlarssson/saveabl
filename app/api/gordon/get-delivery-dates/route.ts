import axios from "axios";

const getAccessToken = async () => {
  try {
    const result = await axios.post(
      "https://backend.staging.gordondelivery.com/oauth/token", // Uppdatera här med den nya Token URL:en
      {
        client_id: process.env.GORDON_CLIENT_ID,
        client_secret: process.env.GORDON_CLIENT_SECRET,
        audience: "https://gordonapi.herokuapp.com/",
        grant_type: "client_credentials",
      }
    );

    return result.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
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

    let weekAfterStartDate = "";
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    weekAfterStartDate = newStartDate.toISOString().split("T")[0];

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

    const resultNextWeek = await axios.get(
      `https://backend.aws.gordondelivery.com/api/deliverywindow/checkout/${
        body.zipCode
      }${weekAfterStartDate ? `?startdate=${weekAfterStartDate}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return new Response(
      JSON.stringify({ thisWeek: result.data, nextWeek: resultNextWeek.data })
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error));
  }
}
