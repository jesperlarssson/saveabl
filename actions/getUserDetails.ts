import axios from 'axios';

export async function fetchUserDetails(token: string | undefined) {
  const url = 'http://127.0.0.1:5001/saveabl-development/europe-west3/main/api/me'; // Change this to your actual API endpoint

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`, // Assuming you are using a bearer token for authentication
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Assuming the user details are in the response data
  } catch (error: any) {
    console.error('An error occurred while fetching user details:', error);
    throw error; // You can handle the error as needed in your application
  }
}
