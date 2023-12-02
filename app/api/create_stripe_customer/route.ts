import { auth } from "@/firebase/firebaseAdmin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

const createOrUpdateInStripe = async (
  email: string,
  name: string,
  metadata: any,
  description: string,
  phone: string,
  address: any
) => {
  try {
    //Check if customer exist in stripe
    const existingCustomer = await stripe.customers.list({
      email: email,
      limit: 1,
    });
    const recordExistInStripe = existingCustomer.data.length > 0;
    if (recordExistInStripe) {
      //Update customer
      const customer = await stripe.customers.update(
        existingCustomer.data[0].id,
        {
          email,
          name,
          metadata,
          address,
          phone,
          description,
          shipping: {
            name,
            address,
            phone,
          },
        }
      );
      return customer;
    } else {
      //Create customer
      const customer = await stripe.customers.create({
        email,
        name,
        metadata,
        address,
        phone,
        description,
        shipping: {
          name,
          address,
          phone,
        },
      });
      return customer;
    }
  } catch (error) {
    throw error;
  }
};

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name, metadata, description, phone, address } = body;
  const oldMetadata = metadata;

  //Ensure email is provided
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    //Check if custoemr exist in Firebase
    const firebaseUser = await auth.getUserByEmail(email);
    const metadata = {
      ...oldMetadata,
      firebaseUID: firebaseUser.uid,
    };
    const stripeUser = await createOrUpdateInStripe(
      email,
      name,
      metadata,
      description,
      phone,
      address
    );

    return Response.json({ firebaseUser, stripeUser });
  } catch (error) {
    try {
      const firebaseUser = await auth.createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: name,
        disabled: false,
      });
      const metadata = {
        ...oldMetadata,
        firebaseUID: firebaseUser.uid,
      };
      const stripeUser = await createOrUpdateInStripe(
        email,
        name,
        metadata,
        description,
        phone,
        address
      );
      return Response.json({ firebaseUser, stripeUser });
    } catch (error) {
      throw error;
    }
  }
}
