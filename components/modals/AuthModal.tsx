
"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import { toast } from "react-hot-toast";
import SignInForm from "../general/SignInForm";

const AuthModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user, signUp, signIn } = auth;

  const handleSignIn = async () => {
    try {
      const user = await signIn("test@email.com", "123456");
      toast.success(`Welcome ${user.uid}`);
      router.push("/mina-sidor");
      onClose();
    } catch (error) {
      toast.error(`Failed to sign in`);
    }
  };

  const handleSignUp = async () => {
    try {
      const user = await signUp("test2@email.com", "123456");
      toast.success(`Welcome ${user.uid}`);
    } catch (error) {
      toast.error(`Failed to sign up`);
    }
  };

  const handleCheckUser = () => {
    if (user) {
      toast.success(`Welcome ${user.uid}`);
    } else {
      toast.error(`Failed to sign in`);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Logga in"
      description="Logga in för att hantera ditt konto."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col w-full gap-4">
        <SignInForm />
        {/* <Button
            onClick={() => {
                handleSignIn();
            }}
        >
            Sign in
        </Button>

        <Button
          onClick={() => {
            handleSignUp();
          }}
        >
          Sign up
        </Button>
        <Button
          onClick={() => {
            handleCheckUser();
          }}
        >
          Status
        </Button> */}
      </div>
    </Modal>
  );
};
export default AuthModal;


// import React, { useEffect } from "react";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import {
//   useSessionContext,
//   useSupabaseClient,
// } from "@supabase/auth-helpers-react";
// import { useRouter } from "next/navigation";

// import useAuthModal from "@/hooks/useAuthModal";
// import Modal from "../ui/Modal";

// const AuthModal = () => {
//   const { session } = useSessionContext();
//   const router = useRouter();
//   const { onClose, isOpen } = useAuthModal();

//   const supabaseClient = useSupabaseClient();

//   useEffect(() => {
//     if (session) {
//       router.refresh();
//       onClose();
//     }
//   }, [session, router, onClose]);

//   const onChange = (open: boolean) => {
//     if (!open) {
//       onClose();
//     }
//   };

//   return (
//     <Modal
//       title="Logga in"
//       description="Hantera ditt abonnemang och lämna kommentarer."
//       isOpen={isOpen}
//       onChange={onChange}
//     >
//       <Auth
//         localization={{
//           variables: swedishLocalization,
//         }}
//         supabaseClient={supabaseClient}
//         providers={["google"]}
//         magicLink={true}
//         appearance={{
//           theme: ThemeSupa,
//           variables: {
//             default: {
//               colors: {
//                 brand: "#f4664a",
//                 brandAccent: "#f3554a",
//               },
//             },
//           },
//         }}
//         theme="light"
//       />
//     </Modal>
//   );
// };

// export default AuthModal;

// const swedishLocalization = {
//   "sign_up": {
//     "email_label": "E-postadress",
//     "password_label": "Skapa ett lösenord",
//     "email_input_placeholder": "Din e-postadress",
//     "password_input_placeholder": "Ditt lösenord",
//     "button_label": "Registrera dig",
//     "loading_button_label": "Registrerar...",
//     "social_provider_text": "Logga in med {{provider}}",
//     "link_text": "Har du inget konto? Registrera dig",
//     "confirmation_text": "Kolla din e-post för bekräftelselänken"
//   },
//   "sign_in": {
//     "email_label": "E-postadress",
//     "password_label": "Ditt lösenord",
//     "email_input_placeholder": "Din e-postadress",
//     "password_input_placeholder": "Ditt lösenord",
//     "button_label": "Logga in",
//     "loading_button_label": "Loggar in...",
//     "social_provider_text": "Logga in med {{provider}}",
//     "link_text": "Har du redan ett konto? Logga in"
//   },
//   "magic_link": {
//     "email_input_label": "E-postadress",
//     "email_input_placeholder": "Din e-postadress",
//     "button_label": "Skicka magisk länk",
//     "loading_button_label": "Skickar magisk länk...",
//     "link_text": "Skicka ett mejl med magisk länk",
//     "confirmation_text": "Kolla din e-post för den magiska länken"
//   },
//   "forgotten_password": {
//     "email_label": "E-postadress",
//     "password_label": "Ditt lösenord",
//     "email_input_placeholder": "Din e-postadress",
//     "button_label": "Skicka instruktioner för att återställa lösenordet",
//     "loading_button_label": "Skickar återställningsinstruktioner...",
//     "link_text": "Glömt ditt lösenord?",
//     "confirmation_text": "Kolla din e-post för länken till återställning av lösenord"
//   },
//   "update_password": {
//     "password_label": "Nytt lösenord",
//     "password_input_placeholder": "Ditt nya lösenord",
//     "button_label": "Uppdatera lösenord",
//     "loading_button_label": "Uppdaterar lösenord...",
//     "confirmation_text": "Ditt lösenord har uppdaterats"
//   },
//   "verify_otp": {
//     "email_input_label": "E-postadress",
//     "email_input_placeholder": "Din e-postadress",
//     "phone_input_label": "Telefonnummer",
//     "phone_input_placeholder": "Ditt telefonnummer",
//     "token_input_label": "Token",
//     "token_input_placeholder": "Ditt OTP-token",
//     "button_label": "Verifiera token",
//     "loading_button_label": "Loggar in ..."
//   }
// }
