"use client";

import React, { useEffect, useState, createContext, ReactNode } from "react";

type Language = "sv" | "en" | "da";

interface LangContextInterface {
  lang: any;
  text: any;
  handleChangeLang: (lang: Language) => void;
}

export const LangContext = createContext<LangContextInterface>({
  lang: null,
  text: null,
  handleChangeLang: () => { },
});

interface TextProviderProps {
  children: ReactNode;
}

export const LangProvider = ({ children }: TextProviderProps) => {
  const [lang, setLang] = useState<string>("sv");
  const [text, setText] = useState<any>(null);

  useEffect(() => {
    const lang = navigator.language;
    if (lang === "sv-SE") {
      setLang("sv");
      setText(svText);
    } else if (lang === "en-GB" || lang === "en-US" || lang === "en") {
      setLang("en");
      setText(enText);
    } else if (lang === "da-DK") {
      setLang("da");
      setText(daText);
    } else {
      setLang("en");
      setText(enText);
    }
  }, []);

  const handleChangeLang = (lang: Language) => {
    if (lang === "sv") {
      setLang("sv");
      setText(svText);
    } else if (lang === "en") {
      setLang("en");
      setText(enText);
    } else if (lang === "da") {
      setLang("da");
      setText(daText);
    } else {
      setLang("sv");
      setText(svText);
    }
    // Store the selected language in localStorage
    localStorage.setItem("selectedLang", lang);
  };

  useEffect(() => {
    // Check if there's a language stored in localStorage
    const storedLang = localStorage.getItem("selectedLang");

    if (storedLang) {
      handleChangeLang(storedLang as Language);
    } else {
      const browserLang = navigator.language;
      if (browserLang === "sv-SE") {
        handleChangeLang("sv");
      } else if (
        browserLang === "en-GB" ||
        browserLang === "en-US" ||
        browserLang === "en"
      ) {
        handleChangeLang("en");
      } else if (browserLang === "da-DK") {
        handleChangeLang("da");
      } else {
        handleChangeLang("en");
      }
    }
  }, []);

  const value = {
    lang,
    text,
    handleChangeLang,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

const svText = {
  nav: {
    order: "Beställ nu",
    about: "Om oss",
    recipe: "Menyer",
    news: "Nyheter",
    log_in: "Logga in",
    log_out: "Logga ut",
    sign_up: "Registrera dig",
    my_account: "Mina sidor",
  },
  page: {
    hero: {
      title: "Kockförberedda matkassen som gör klimatet en tjänst",
      subtitle: "",
      order_now: "Beställ här",
    },
    usp: {
      title: "Såhär fungerar det",
      points: [
        {
          title: "Vi lagar maten åt dig",
          text: "Vi tar fram recept på råvaror som ser lite tokiga ut, sedan gör vår stjärnkock Emil de svåra och tidskrävande momenten i matlagningen åt dig!",
        },
        {
          title: "Flexibla leveranser",
          text: "Du väljer din leveransdag och bestämmer själv om du vill köpa en gång eller prenumerera på vår matkasse, såklart utan bindningstid!",
        },
        {
          title: "Klimatsmart middag på 15 min",
          text: "Du gör de sista stegen i receptet. På 15 minuter kan du servera en hälsosam middag som är snäll mot vårt klimat!",
        },
      ],
    },

    call_to_action: {
      title: "Hjälp oss att rädda bra mat från att slängas, en middag i taget!",
      meals: "Middagar",
      vegetarian: "Vegetariskt",
      price_per_portion: "Lägre klimatavtryck",
      cooking_time: "Min tillagning",
      order_now: "Kom igång",
    },
    news: {
      title: "Följ med på resan - kika in våra senaste nyhetsinlägg!",
      text: "Vi utvecklas och vi testar nytt. Vi expanderar och hittar på nya grejer. Här uppdaterar vi vad som händer i vår värld.",
    },
    reviews: {
      title: "Över 20 000 räddade middagar, tillsammans gör vi skillnad!",
      text: "Såhär säger några av våra miljöhjältar till kunder:",
      read_all_reviews: "Läs alla omdömen",
    },
  },

  about_us: {
    title: "Saveabl - “räddningsbar, något som går att rädda",
    description:
      "På Saveabl. identifierar vi systematiskt svinn hos producenter och grossister, och gör en färdig matkasse baserad på det som behöver räddas! Vår matkasse finns i det magiska gränslandet mellan en traditionell matkasse och färdig hämtmat. Utöver klimatfrågan tror vi starkt på smidighet och har därför tagit fram en matkasse som är klar på 15 minuter. Otroligt smidigt och otroligt gott!",
    sections: [
      {
        title: "Vilka vi är",
        text: "Saveabl bestod av tre studenter och en kock när vi öppnade portarna november 2021. Den första idén till det som skulle komma att bli Saveabl. hade Jeroen och Alexander spånat på redan sommaren 2020 när de båda studerade tillsammans och de förväntade sig minst sagt en snabbare och smidigare uppstart än vad som blev verklighet. Idag består teamet av Jeroen som styr skutan. Emil som varje vecka fram nya kreativa recept och ansvarar för det operativa. Louise som ser till att vi når ut till rätt kunder och att vi kan expandera. Hassan som ansvarar för packningen och säkerställer att våra kunder möts av en trevlig syn varje vecka. Jesper som designar och skapar en identitet åt Saveabl samt Alexander som ser till att vi har koll på juridiken.",
      },
      {
        title: "Vår matkasse",
        text: "Vår matkasse bygger på tre värden: den skall vara klimatsnäll, supersmidig och extremt god, alltså tappa-hakan god. Vi är helt övertygade om att det är möjligt och utan att det ska behöva skena iväg i pris. Hur kan vi göra det tänker du nu. Vi samarbetar med gårdar, producenter och grossister och hjälper dem att rädda matvaror som avviker i form, färg, storlek, är överproduktion eller resultatet av logistik-missar. Det gör att maten du äter är mat som annars hade riskerats att slängas, trots att den smakar helt perfekt. Märkligt va? Men mer om det längre ner! Matkassen är supersmidig då allt är klart inom 15 minuter för att våra kockar förbereder mycket åt dig, det är även det som gör den extremt god!",
      },
      {
        title: "Räddad mat",
        text: "Vad innebär räddad mat kanske du undrar? Vi samarbetar med gårdar, matproducenter och grossister och hjälper dem att rädda bra matvaror från att slängas. Idag slängs 45% av allt frukt och grönt som odlas och mycket av detta är 100% bra varor. De vanligaste anledningarna är att de inte uppfyller storlek, form eller färgkraven som butiker sätter, att gårdarna har odlat mer än vad butikerna behöver just då eller att en matgrossist har fått för mycket eller fel varor. I alla dessa fall har vi täta samarbeten med livsmedelsaktörerna så att vi tar hand om dessa varor långt innan de hinner bli dåliga. I många fall kan varorna i våra kassar till och med vara färskare än de du hittar i butiken då våra ofta kommer direkt från bonden.",
      },
      {
        title: "Vår klimatinsats",
        text: "Klimatfrågan är enormt viktig för oss och vi försöker bidra på alla sätt vi kan. Med hjälp av RISE har det räknats ut att våra middagar har 5 gånger lägre klimatpåverkan än en genomsnittlig svensk middag. Sättet som vi har uppnått det är genom att rädda bra matvaror från att slängas helt i onödan, vilket i sin tur gör att mindre mat behöver odlas, färre transporter behöver rulla och mindre vatten behövs till jordbruken. Genom att visa på hur otroligt gott det kan vara att äta vegetariskt vill vi inspirera till en kost som är mindre baserad på kött vilket även det leder till en lägre klimatpåverkan och vi jobbar just nu på att ta fram ett retursystem för våra plastburkar till såser tillsammans med Gordon Delivery för att ytterligare minska vår påverkan.",
      },
    ],
    faq: "",
  },

  recipes: {
    title: "Menyer",
    next_week: "Nästa vecka:",
    this_week: "Denna vecka:",
    older_recipes: "Hämta äldre recept",
    comment: "Kommentarer",
    comment_name: "Namn",
    rate: "Betyg:",
    write_comment: "Kommentera",
    send_comment: "Kommentera",
  },

  recipe_slug: {
    contains: "Innehåll",
    how_to: "Gör så här",
    saved_ingredients: "Räddade varor i receptet",
    nutrients: "Näringsvärden",
    ingredients: "Innehåll & allergener",
  },

  order: {
    title: "Vi lanserar på nya orter!",
    title1: "Fyll i ditt postnummer för att se om vi levererar till dig",
    title2: "Specialerbjudande för att fira vår lansering!",
    text: "Nu är det dags att köra vår första lansering i Malmö och Köpenhamn och börjar med ett special-erbjudande till våra första kunder här! Fyll i ditt postnummer för att få en erbjudandelänk.",
    label: "Fyll i ditt postnummer för ett erbjudande",
    label1: "Fyll i ditt postnummer",
    label2: "Fyll i ditt postnummer för ett erbjudande",
    button: "Hämta erbjudanden",
    button1: "Hämta",
    button2: "Hämta erbjudanden",
    linkTitle: "Vi levererar till dig!",
    linkDescription: "Välj en av länkarna nedan för att gå vidare.",
    bullet1: "",
    bullet2: "",
    bullet3: "",
    type: "Gör dina val nedan:",
    variant: "Recept utformade för familjer på 3-4 pers:",
    deliveryDay: "Leveransalternativ:",
    delivery_saturday: "Lördag 16/3 kl. 09-18",
    delivery_sunday: "Söndag 17/3 kl. 10-17",
    delivery_monday: "Måndag 18/3 kl. 16-22",
    stockholm_sunday: "Söndag 17/3 kl. 10-17",
    stockholm_monday: "Måndag 18/3 kl. 16-22",
    address: "Leveransinfo:",
    extra: "Extra info",
    contact: "Kontaktuppgifter:",
    terms: "Jag godkänner villkoren och att mitt konto kommer att skapas.",
    payButton: "Gå vidare",
    full_name: "Fullständigt namn",
    name_example: "Förnamn och efternamn",
    delivery_address: "Adress", 
    city: "Ort",
    city_example: "Göteborg",
    extra_info: "Extra info",
    extra_example: "Till exempel våning, portkod eller annan information som kan vara bra för oss att veta.",
    phonenumber: "Telefonnummer",
    email: "E-post",
    email_example: "E-post",
    password: "Lösenord",
    password_example: "Lösenord",
  },

  success: {
    title: "Tack för din beställning!",
    description:
      "Vi har nu mottagit din beställning. Leveransinformation kommer att skickas till ditt mobilnummer från vår partner Gordon Delivery när de planerat upp rutten. Har du frågor? Tveka inte att kontakta oss på hello@saveabl.se.",
    recurring:
      "Du har nu ett aktivt abonnemang. Du kan hantera ditt abonnemang på dina sidor. Leveransinformation kommer att skickas till ditt mobilnummer från vår partner Gordon Delivery när de planerat upp rutten. Har du frågor? Tveka inte att kontakta oss på hello@saveabl.se.",
    button: "Till mina sidor",
  },
  auth: {
    title1: "Logga in",
    title2: "Registrera dig",
    description: "Logga in för att se information om dina beställningar.",
    description2: "Registrera dig för att hantera ditt konto.",
    email: "E-post",
    password: "Lösenord",
    confirm_password: "Bekräfta lösenord",
    password_no_match: "Lösenorden matchar inte",
    account_created: "Ditt konto har skapats!",
    button: "Logga in",
    forgot_password: "Glömt lösenord?",
    no_account: "Har du inget konto?",
    sign_up: "Skapa konto",
    terms:
      "Jag godkänner att ni skickar mig veckans recept och marknadsföring via email.",
    terms_and_conditions: " Genom att skapa ett konto godkänner du våra",
    privacy_policy: "villkor och bestämmelser",
    privacy_policy2: "och vår",
    privacy_policy3: "integritetspolicy",
    logged_in: "Du är nu inloggad!",
    login_failed: "Inloggningen misslyckades!",
    missing_account: "Har du inget konto?",
    has_account: "Har du redan ett konto?",
    email_required: "E-post är obligatoriskt",
    reset_email_sent: "Ett mail har skickats till din e-postadress",
    reset_email_failed: "Det gick inte att skicka mail till din e-postadress",
  },
  my_pages: {
    title_signed_out: "Du är inte inloggad",
    login_instruction: "Logga in för att se information om dina beställningar.",
    greeting_prefix: "Hej!",
    greeting_suffix: "!",
    signed_in_as_prefix: "Du är inloggad som",
    sign_out_button: "Logga ut",
    contact_button: "Kontakta oss",
    current_subscription_status: "Här är din nuvarande prenumerationsstatus:",
    subscription_label: "Prenumeration:",
    weekly: "Varje vecka",
    biweekly: "Varannan vecka",
    biweekly_prefix: "Varannan vecka (",
    biweekly_suffix: ")",
    even_weeks: "Jämna veckor",
    odd_weeks: "Udda veckor",
    monthly: "Varje månad",
    delivery_day_label_suffix: "ar",
    delivery_day_label: "Leveransdag:",
    delivery_address_label: "Leveransadress:",
    change_button: "Ändra",
    next_planned_delivery: "Nästa planerade utkörning",
    mealbox_week_prefix: "Matkasse v.",
    no_recipes_set: "Recepten är inte ännu satta",
    change_mealbox_button: "Ändra intervall",
    pause_mealbox_button: "Pausa",
    resume_mealbox_button: "Återuppta",
    not_in_subscription_prefix: "Matkassen vecka",
    not_in_subscription_suffix: "ingår inte i din prenumeration.",
    add_to_subscription: "Lägg till",
    subscription_details: "Prenumerationsdetaljer",
    billing_frequency: "Faktureringsfrekvens",
    active_on: "Aktiv på",
    account_information: "Kontoinformation",
    email: "E-post",
    name: "Namn",
    phone: "Telefon",
    deliveryDay: "Leveransdag",
    address: "Adress",
    manage_account: "Hantera konto",
    paused_until: "Pausad till",
    modalTitle: "Pausa din leverans",
    modalDescription:
      "Du kan pausa din kommande matkasse till och med onsdagen före leverans. Pausar du efter onsdagen gäller det för matkassen därpå.",
    resumeSubscriptionButton: "Återuppta prenumeration",
    pauseOption1: "Nästkommande matkasse",
    pauseOption2: "Nästa två matkassar",
    pauseOption3: "Nästa tre matkassar",
    pauseButton: "Pausa",
    numberOfMealKits: "Antal",
    date: "Datum",
    intervalOption1: "Varje vecka",
    intervalOption2: "Varannan vecka",
    intervalButton: "Ändra",
    intervalModalTitle: "Ändra intervall",
    intervalModalDescription: "Välj vilket intervall du vill ha.",
    change_delivery_day_button: "Ändra leveransdag",
    dayModalTitle: "Ändra leveransdag",
    dayModalDescription: "Välj vilken leveransdag du vill ha.",
    deliveryDayModalPlaceholder: "Välj leveransdag",
    no_connection: "Ingen aktiv prenumeration",
    no_connection_desc: "Vi stödjer tyvärr inte att visa upp engångsköp ännu.",
    contact_us: "Kontakta oss",
  },
  my_account: {
    account_settings: "Kontoinställningar",
    profile: "Profil",
    change_password: "Byt lösenord",
    personal_information: "Personlig information",
    payment_details: "Betalningsinformation",
    payment_history: "Betalningshistorik",
    invoices: "Fakturor",
    shipping_address: "Leveransadress",
    billing_address: "Fakturaadress",
    update_button: "Uppdatera",
    delete_account: "Radera konto",
    confirm_delete: "Bekräfta radering",
    notifications_settings: "Notifikationsinställningar",
    email_notifications: "E-postnotifikationer",
    sms_notifications: "SMS-notifikationer",
    language_preferences: "Språkinställningar",
    support: "Support",
    faq: "Vanliga frågor",
    terms_and_conditions: "Villkor och bestämmelser",
    privacy_policy: "Integritetspolicy",
    return_policy: "Returpolicy",
    order_history: "Orderhistorik",
    recent_purchases: "Senaste köp",
    wishlist: "Önskelista",
    refer_a_friend: "Tipsa en vän",
    loyalty_program: "Lojalitetsprogram",
    gift_cards: "Presentkort",
    subscriptions: "Prenumerationer",
    apply_promocode: "Använd kampanjkod",
    feedback: "Feedback",
    logout: "Logga ut",
  },
};

const enText = {
  nav: {
    order: "Get started",
    about: "About us",
    recipe: "Our menus",
    news: "News",
    log_in: "Log in",
    log_out: "Log out",
    sign_up: "Sign up",
    my_account: "My account",
  },
  page: {
    hero: {
      title: "The meal kit that benefits the climate",
      subtitle: "",
      order_now: "Get started",
    },
    usp: {
      title: "How it works",
      points: [
        {
          title: "We do the cooking",
          text: "Our michelin experienced chef creates delicious recipes from ingredients that look a bit odd and prepare about 70% of the cooking.",
        },
        {
          title: "Flexible orders and deliveries",
          text: "You choose delivery day and whether you want to try only once or start a subscription, of course you can cancel anytime you want.",
        },
        {
          title: "Climate-friendly meal in 15 min",
          text: "You do the final steps of the recipe. Within 15 minutes, your delicious, climate-friendly dinner is ready to serve!",
        },
      ],
    },
    call_to_action: {
      title:
        "Help us save delicious food from being wasted, one dinner at a time!",
      meals: "Meals",
      vegetarian: "Vegetarian",
      price_per_portion: "Lower footprint",
      cooking_time: "Min cooking",
      order_now: "Get started",
    },
    news: {
      title: "Follow the journey - check out our latest news posts!",
      text: "We're constantly evolving, exploring new horizons, and pushing the boundaries. Step into our world and discover the latest developments in our universe",
    },
    reviews: {
      title: "Over 20,000 saved meals, together we make a difference!",
      text: "Here's what our climate-hero-customers think",
      read_all_reviews: "Read all reviews",
    },
  },
  about_us: {
    title: "Saveabl, capable of being saved or salvaged",
    description:
      "At Saveabl, we identify avoidable and reoccurring food waste within farms, producers and wholesalers. We then create chef-prepared meal kits using this surplus. Our meal kit seamlessly blends the essence of a classic meal kit with the convenience of take-away. We’re firm believers that climate-conscious choices can also be convenient. This conviction led us to create a meal kit that's ready in 15 minutes - incredibly smooth and incredibly tasty!",
    sections: [
      {
        title: "Who we are",
        text: "Saveabl consisted of three students and a chef when they opened their doors in November 2021. The seeds of Saveabl were first sown by Jeroen and Alexander during a summer of shared studies in 2020. They had anticipated a swifter and smoother journey than what unfolded. Today, the team comprises Jeroen, steering the ship. Emil, the creative culinary genius responsible for weekly recipe innovations and operations. Louise, our gatekeeper to the right customers and expansion opportunities. Hassan, who is in charge of packing, ensures that our customers are greeted with a pleasant sight every week. Jesper, the visionary behind Saveabl's identity. And Alexander, our compliance guardian, ensuring we play by the rules and regulations.",
      },
      {
        title: "Our meal kit",
        text: "Our meal kit is designed around three core principles: it has to be climate-friendly, supersmooth and delicious. We’re talking mind-blowingly delicious. You might wonder, \"how do we manage all this without breaking the bank?\" well, here's the scoop: we’ve partnered up with farmers, food producers and wholesalers and help them save items that differ in size, colour, shape, have been overproduced or are the result of logistic blunders. That means the food you're savoring could've been discarded, even though it's delicious! But we'll delve deeper into this topic below! Our meal kit is hassle-free, providing every ingredient, and our expert chefs handle most of the cooking, ensuring each dish is ready to serve in just 15 minutes! That’s why the food is so delicious!",
      },
      {
        title: "Rescued food",
        text: " What does rescued food mean, you might wonder? We collaborate with farms, food producers, and wholesalers to assist them in saving quality food items from being discarded. Today, a staggering 45% of all grown fruits and vegetables are thrown away, and much of this consists of perfectly good products. The most common reasons include not meeting the size, shape, or color standards set by stores, farms producing more than what stores currently require, or a food wholesaler receiving an excess or incorrect shipment. In all these cases, we maintain close partnerships with food industry players to ensure we rescue these items long before they go bad. In many instances, the products in our meal kits can even be fresher than those you find in stores since they often come directly from the farm.",
      },
      {
        title: "Our climate effort",
        text: "The climate issue is enormously important to us, and we are trying to contribute in every way we can. An independent research shows that our meals’ footprint is 5 times lower than the Swedish average. The ways we achieve this is by rescuing good food from being discarded entirely unnecessarily, which in turn reduces the need to cultivate less food, fewer transports are required, and less water is needed for agriculture. By demonstrating how incredibly delicious it can be to eat vegetarian, we aim to inspire a diet that is less dependent on meat which is also a way to achieve a lower climate footprint. Currently we are working on Saveabl Reuse, a return system for our plastic sauce containers in cooperation with Gordon Delivery to further lower our impact.",
      },
    ],
    faq: "",
  },

  recipes: {
    title: "Menus",
    next_week: "Next week:",
    this_week: "This week:",
    older_recipes: "Load older recipes",
    comment: "Comments",
    comment_name: "Name",
    rate: "Rate:", 
    write_comment: "Comment", 
    send_comment: "Comment"
  },
  recipe_slug: {
    contains: "Contains",
    how_to: "How to",
    saved_ingredients: "Saved items in the recipe",
    nutrients: "Nutritional values",
    ingredients: "Contents & allergens",
  },

  order: {
    title: "We're launching in new cities!",
    title1: "Enter your post code to see if you are within our delivery area",
    title2: "You have been awarded a special gift!",
    text: "Now it's time to launch in Malmö and Copenhagen and we're starting with a special offer to our first customers here! Enter your zip code to get an offer link.",
    label: "Enter your zip code for an offer",
    label1: "Enter your zip code",
    label2: "Enter your zip code for an offer",
    button: "Get offer",
    button1: "Get ",
    button2: "Get offer",
    linkTitle: "We deliver to you!",
    linkDescription: "Choose one of the links below to proceed:",
    bullet1: "",
    bullet2: "",
    bullet3: "",
    type: "Make your choices below:",
    variant: "Recipes designed for families of 3-4 people:",
    deliveryDay: "Delivery options:",
    delivery_saturday: "Saturday 9/3 at 09-18",
    delivery_sunday: "Sunday 10/3 at 10-17",
    delivery_monday: "Monday 11/3 at 16-22",
    stockholm_sunday: "Sunday 10/3 at 10-17",
    stockholm_monday: "Monday 11/3 at 16-22",
    address: "Delivery info:",
    extra: "Extra information",
    contact: "Contact details",
    terms: "I accept the terms and understand that an account will be created.",
    payButton: "Register and pay",
    full_name: "Full name",
    name_example: "First and lastname",
    delivery_address: "Address",
    city: "City",
    city_example: "Gothenburg",
    extra_info: "Extra info",
    extra_example: "For example, floor, door code, or any other information that may be useful for us to know.",
    phonenumber:"Phone number",
    email: "Mail address",
    email_example: "Mail address",
    password: "Password",
    password_example: "Password",
  },

  success: {
    title: "Thank you for your order!",
    description:
      "We have now received your order. Delivery information will be sent to your mobile number from our partner Gordon Delivery when they have planned the route. Do you have any questions? Do not hesitate to contact us at hello@saveabl.se",
    recurring:
      "You now have an active subscription. You can manage your subscription on your pages. Delivery information will be sent to your mobile number from our partner Gordon Delivery when they have planned the route. Do you have any questions? Do not hesitate to contact us at hello@saveabl.se",
    button: "To my pages",
  },
  auth: {
    title1: "Log in",
    title2: "Sign up",
    description: "Log in to see information about your orders.",
    description2: "Sign up to manage your account.",
    email: "Email",
    password: "Password",
    confirm_password: "Confirm password",
    password_no_match: "Passwords do not match",
    account_created: "Your account has been created!",
    button: "Log in",
    forgot_password: "Forgot password?",
    no_account: "Don't have an account?",
    sign_up: "Sign up",
    terms: "I agree to receive weekly recipes and marketing via email.",
    terms_and_conditions: "By creating an account you agree to our",
    privacy_policy: "terms and conditions",
    privacy_policy2: "and our",
    privacy_policy3: "privacy policy",
    logged_in: "You are now logged in!",
    login_failed: "Login failed!",
    missing_account: "Don't have an account?",
    has_account: "Already have an account?",
    email_required: "Email is required",
    reset_email_sent: "An email has been sent to your email address",
    reset_email_failed: "Failed to send email to your email address",
  },
  my_pages: {
    title_signed_out: "You have not logged in",
    login_instruction: "Log in to manage your orders",
    greeting_prefix: "Hello!",
    greeting_suffix: "!",
    signed_in_as_prefix: "You are signed in as",
    sign_out_button: "Sign out",
    contact_button: "Contact us",
    current_subscription_status: "Your current subscription plan:",
    subscription_label: "Subscription:",
    weekly: "Weekly",
    biweekly: "Biweekly",
    biweekly_prefix: "Biweekly (",
    biweekly_suffix: ")",
    even_weeks: "Even weeks",
    odd_weeks: "Odd weeks",
    monthly: "Monthly",
    delivery_day_label_suffix: "s",
    delivery_day_label: "Delivery day:",
    delivery_address_label: "Delivery Address:",
    change_button: "Change",
    next_planned_delivery: "Upcoming delivery",
    mealbox_week_prefix: "Meal kit w.",
    no_recipes_set: "We’re still working on the recipes",
    change_mealbox_button: "Change interval",
    pause_mealbox_button: "Pause",
    resume_mealbox_button: "Resume",
    not_in_subscription_prefix: "Meal kit week",
    not_in_subscription_suffix: "Not included in your plan",
    add_to_subscription: "Add",
    pause_subscription: "pause my subscription plan",
    cancel_subscription: "cancel my subscription plan",
    contact_us: "Contact us",
    subscription_details: "Subscription details",
    billing_frequency: "Billing frequency",
    active_on: "Active on",
    account_information: "Account information",
    email: "Email",
    name: "Name",
    phone: "Phone",
    deliveryDay: "Delivery day",
    address: "Address",
    manage_account: "Manage account",
    paused_until: "Paused until",
    modalTitle: "Pause your delivery",
    modalDescription:
      "You can pause your upcoming meal kit until the Wednesday before delivery. If you pause after Wednesday, it will apply to the following meal kit.",
    resumeSubscriptionButton: "Resume subscription",
    pauseOption1: "Next meal kit",
    pauseOption2: "Next two meal kits",
    pauseOption3: "Next three meal kits",
    pauseButton: "Pause",
    numberOfMealKits: "Number of meal kits",
    date: "Date",
    intervalOption1: "Weekly",
    intervalOption2: "Biweekly",
    intervalButton: "Change",
    intervalModalTitle: "Change interval",
    intervalModalDescription: "Choose which interval you want.",
    change_delivery_day_button: "Change delivery day",
    dayModalTitle: "Change delivery day",
    dayModalDescription: "Choose which delivery day you want.",
    deliveryDayModalPlaceholder: "Choose delivery day",
    no_connection: "No active subscription",
    no_connection_desc: "We do not support showing one-time purchases yet.",
  },
};

const daText = {
  nav: {
    order: "Bestil nu",
    about: "Om os",
    recipe: "Menuer",
    news: "Nyheder",
    log_in: "Log ind",
    log_out: "Log ud",
    sign_up: "Tilmeld dig",
    my_account: "Min konto",
  },
  page: {
    hero: {
      title: "Færdiglavede madkasse der gør klimaet en tjeneste",
      subtitle: "",
      order_now: "Bestil nu",
    },
    usp: {
      title: "Hvad indebærer vores madkasse?",
      points: [
        {
          title: "Vores kok skaber opskrifter",
          text: "Vi samler lækre råvarer, der ser lidt skøre ud, og laver lækre opskrifter på det.",
        },
        {
          title: "Mad leveres til dig",
          text: "Du får din reddede madkasse leveret med det meste forberedt for dig.",
        },
        {
          title: "Klimavenligt måltid på 15 min",
          text: "Du hakker og varmer det sidste på 15 minutter, nyd en lækker og klimavenlig middag!",
        },
      ],
    },
    call_to_action: {
      title: "Deltag også og red mad på en nem og klimavenlig måde!",
      meals: "Måltider",
      vegetarian: "Vegetarisk",
      price_per_portion: "Lavere klimaaftryk",
      cooking_time: "Min tilberedning",
      order_now: "Bestil nu",
    },
    news: {
      title: "Følg med på rejsen - kig ind på vores seneste nyhedsindlæg!",
      text: "Vi udvikler og tester nyt. Vi ekspanderer og finder på nye ting. Her opdaterer vi, hvad der sker i vores verden.",
    },
    reviews: {
      title: "Over 20.000 reddede middage, sammen gør vi en forskel!",
      text: "Sådan siger nogle af vores miljøhelte til kunder:",
      read_all_reviews: "Læs alle anmeldelser",
    },
  },
  about_us: {
    title: "Redningsbar, noget der kan reddes",
    description:
      "Hos Saveabl identificerer vi systematisk spild hos producenter og grossister og laver en færdig madpose baseret på det, der skal reddes! Vores madpose findes i det magiske grænseland mellem en traditionel madpose og færdiglavet takeaway. Ud over klimaspørgsmålet tror vi stærkt på bekvemmelighed og har derfor udviklet en madpose, der er klar på 15 minutter. Utroligt smidigt og utroligt lækkert!",
    sections: [
      {
        title: "Hvem vi er",
        text: "Saveabl bestod af tre studerende og en kok, da vi åbnede dørene i november 2021. Den første idé til det, der skulle komme til at blive Saveabl, var opstået sommeren 2020, da Jeroen og Alexander studerede sammen. De forventede sig mindst sagt en hurtigere og smidigere opstart end virkeligheden viste sig at være. I dag består teamet af Jeroen, der styrer skuden, Emil, der hver uge fremkommer med nye kreative opskrifter og har ansvar for det operationelle. Louise sikrer, at vi når ud til de rigtige kunder og kan ekspandere. Hassan har ansvaret for pakningen og sikrer, at vores kunder mødes af en behagelig syn hver uge. Jesper designer og skaber en identitet for Saveabl, og Alexander sørger for, at vi har styr på juraen.",
      },
      {
        title: "Vores madpose",
        text: "Vores madkasse bygger på tre værdier: den skal være klimavenlig, super praktisk og ekstremt lækker, altså næsten ufatteligt lækker. Vi er fuldstændig overbeviste om at det er muligt uden at prisen bliver for høj. Hvordan kan vi gøre det, tænker du måske nu? Vi samarbejder med gårde, producenter og grossister og hjælper dem med at redde madvarer der afviger i form, farve, størrelse, er overskud eller resultatet af logistikfejl. Det betyder at den mad du spiser er mad der ellers ville være blevet kasseret, selvom den smager helt perfekt. Mærkeligt, ikke sandt? Men mere om det længere nede! Madkassen er super praktisk da alt er klart inden for 15 minutter, for vores kokke forbereder meget for dig og det er også det der gør den ekstremt lækker!",
      },
      {
        title: "Reddet mad",
        text: "Hvad betyder reddet mad måske undrer du dig? Vi samarbejder med gårde, madproducenter og grossister for at hjælpe dem med at redde gode madvarer fra at blive smidt ud. I dag smides 45% af al frugt og grønt der dyrkes ud og meget af det er 100% gode varer. De mest almindelige årsager er at de ikke opfylder størrelses, form eller farvekravene som butikker sætter, at gårde har dyrket mere end det butikkerne har brug for på det pågældende tidspunkt eller at en madgrossist har fået for meget eller forkerte varer. I alle disse tilfælde har vi tætte samarbejder med fødevareaktørerne, så vi tager hånd om disse varer længe før de når at blive dårlige. I mange tilfælde kan varerne i vores kasser være friskere end dem du finder i butikken, da vores ofte kommer direkte fra bonden.",
      },
      {
        title: "Vores klimaindsats",
        text: "Klimaspørgsmålet er enormt vigtigt for os og vi forsøger at bidrage på alle måder vi kan. Ved hjælp af RISE er det blevet beregnet at vores middage har en 5 gange lavere klimapåvirkning end en gennemsnitlig svensk middag. Den måde vi har opnået dette på er ved at redde gode madvarer fra at blive smidt ud helt unødvendigt, hvilket igen betyder, at mindre mad behøver dyrkes, færre transporter er nødvendige og mindre vand er nødvendigt til landbruget. Ved at vise hvor utroligt lækkert det kan være at spise vegetarisk ønsker vi at inspirere til en kost der er mindre baseret på kød, hvilket også fører til en lavere klimapåvirkning. Vi arbejder i øjeblikket på at udvikle et retursystem for vores plastikbøtter til saucer i samarbejde med Gordon Delivery for yderligere at mindske vores påvirkning.",
      },
    ],
    faq: "",
  },
  recipes: {
    title: "Menuer",
    next_week: "Næste uge:",
    this_week: "Denne uge:",
    older_recipes: "Hent ældre opskrifter",
    comment: "Kommentarer",
    comment_name: "Navn",
    rate: "Bedømme:",
    write_comment: "Kommentar",
    send_comment: "Kommentere",
  
  },
  recipe_slug: {
    contains: "Indeholder",
    how_to: "Sådan gør du",
    saved_ingredients: "Gemte varer i opskriften",
    nutrients: "Næringsværdier",
    ingredients: "Indhold & allergener",
  },

  order: {
    title: "Vi lancerer i nye byer!",
    title1:
      "Find din levereringsdag",
    title2: "Du har fået en særlig gave!",
    text: "Nu er det tid til at lancere i Malmö og København, og vi starter med et specielt tilbud til vores første kunder her! Indtast dit postnummer for at få et tilbud.",
    label: "Indtast dit postnummer for et tilbud",
    label1: "Indtast dit postnummer",
    label2: "Indtast dit postnummer for et tilbud",

    button: "Få et tilbud",
    button1: "Hente",
    button2: "Få et tilbud",
    linkTitle: "Vi kan levere til dig!",
    linkDescription: "om mandagen 11/3 mellem 16.00-22.00",
    bullet1: "👨‍🍳 Vegetarkassen med kokken inkluderet.",
    bullet2: "👨‍👩‍👧‍👦  Aftensmad till hele familien på blot 15 min.",
    bullet3: "✅  Ingen bindingsperiode, opsig når du vil.",
    type: "Vilken typ?",
    variant: "Välj variant:",
    deliveryDay: "Välj leveransdag:",
    address: "Fyll i din leveransadress:",
    extra: "Extra information",
    contact: "Kontaktuppgifter",
    terms: "Jag godkänner villkoren och förstår att ett konto kommer att skapas.",
    payButton: "Registrera och betala",

  },

  success: {
    title: "Tak for din bestilling!",
    description:
      "Vi har nu modtaget din bestilling. Leveringsinformation sendes til dit mobilnummer fra vores partner Gordon Delivery, når de har planlagt ruten. Har du spørgsmål? Tøv ikke med at kontakte os på",
    recurring:
      "Du har nu et aktivt abonnement. Du kan administrere dit abonnement på dine sider. Leveringsinformation sendes til dit mobilnummer fra vores partner Gordon Delivery, når de har planlagt ruten. Har du spørgsmål? Tøv ikke med at kontakte os på hello@saveabl.se",
    button: "Til mine sider",
  },
  auth: {
    title1: "Log ind",
    title2: "Tilmeld dig",
    description: "Log ind for at se oplysninger om dine ordrer.",
    description2: "Tilmeld dig for at administrere din konto.",
    email: "Email",
    password: "Adgangskode",
    confirm_password: "Bekræft adgangskode",
    password_no_match: "Adgangskoderne stemmer ikke overens",
    account_created: "Din konto er oprettet!",
    button: "Log ind",
    forgot_password: "Glemt adgangskode?",
    no_account: "Har du ikke en konto?",
    sign_up: "Tilmeld dig",
    terms:
      "Jeg accepterer at modtage ugentlige opskrifter og markedsføring via e-mail.",
    terms_and_conditions: "Ved at oprette en konto accepterer du vores",
    privacy_policy: "vilkår og betingelser",
    privacy_policy2: "og vores",
    privacy_policy3: "privatlivspolitik",
    logged_in: "Du er nu logget ind!",
    login_failed: "Login mislykkedes!",
    missing_account: "Har du ikke en konto?",
    has_account: "Har du allerede en konto?",
    email_required: "Email er påkrævet",
    reset_email_sent: "En e-mail er sendt til din e-mail-adresse",
    reset_email_failed: "Det lykkedes ikke at sende e-mail til din e-mail-adresse",
  },
  my_pages: {
    title_signed_out: "Du er ikke logget ind",
    login_instruction: "Log ind for at se information om dine ordrer.",
    signed_in_as_prefix: "Du er logget ind som",
    subscription_details: "Abonnementsdetaljer",
    billing_frequency: "Faktureringsfrekvens",
    weekly: "Ugentlig",
    biweekly: "Hver anden uge",
    active_on: "Aktiv på",
    even_weeks: "Lige uger",
    odd_weeks: "Ulige uger",
    pause_mealbox_button: "Pause",
    resume_mealbox_button: "Genoptag",
    change_mealbox_button: "Skift interval",
    account_information: "Kontooplysninger",
    email: "E-mail",
    name: "Navn",
    phone: "Telefon",
    deliveryDay: "Leveringsdag",
    address: "Adresse",
    manage_account: "Administrer konto",
    paused_until: "Pauset indtil",
    modalTitle: "Pause din levering",
    modalDescription:
      "Du kan sætte din kommende madkasse på pause indtil onsdagen før leveringen. Hvis du sætter den på pause efter onsdag, gælder det for den næste madkasse.",
    resumeSubscriptionButton: "Genoptag abonnement",
    pauseOption1: "Næste madkasse",
    pauseOption2: "Næste to madkasser",
    pauseOption3: "Næste tre madkasser",
    pauseButton: "Pause",
    numberOfMealKits: "Antal",
    date: "Dato",
    intervalOption1: "Ugentlig",
    intervalOption2: "Hver anden uge",
    intervalButton: "Skift",
    intervalModalTitle: "Skift interval",
    intervalModalDescription: "Vælg hvilket interval du ønsker.",
    change_delivery_day_button: "Skift leveringsdag",
    dayModalTitle: "Skift leveringsdag",
    dayModalDescription: "Vælg hvilken leveringsdag du ønsker.",
    deliveryDayModalPlaceholder: "Vælg leveringsdag",
    no_connection: "Ingen aktiv abonnement",
    no_connection_desc: "Vi understøtter desværre ikke visning af engangskøb endnu.",
    sign_out_button: "Log ud",
    contact_button: "Kontakt os",
  },
};
