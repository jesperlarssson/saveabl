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
  handleChangeLang: () => {},
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
      setLang("sv");
      setText(svText);
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
  };

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
    recipe: "Recept",
    news: "Nyheter",
    log_in: "Logga in",
    log_out: "Logga ut",
    sign_up: "Registrera dig",
    my_account: "Mina sidor",
  },
  page: {
    hero: {
      title: "Färdiga matkassen som gör klimatet en tjänst",
      subtitle: "Klimatvänligt på en helt ny nivå.",
      order_now: "Beställ nu",
    },
    usp: {
      title: "Vad innebär vår matkasse?",
      points: [
        {
          title: "Vår kock skapar recept",
          text: "Vi samlar ihop jättegoda råvaror som ser lite tokiga ut och gör goda recept på det.",
        },
        {
          title: "Maten skickas till dig",
          text: "Du får din räddade matkasse hemlevererad med det mesta förberett åt dig.",
        },
        {
          title: "Klimatsmart måltid på 15 min",
          text: "Du hackar och värmer det sista på 15 minuter, njut av en god och klimatsmart middag!",
        },
      ],
    },
    call_to_action: {
      title:
        "Var med du också och rädda mat på ett enkelt och klimatsmart sätt!",
      meals: "Måltider",
      vegetarian: "Vegetariskt",
      price_per_portion: "Kr/portion",
      cooking_time: "Min tillagning",
      order_now: "Beställ nu",
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
    title: "Räddningsbar, något som går att rädda",
    description:
      "På Saveabl. identifierar vi systematiskt svinn hos producenter och grossister, och gör en färdig matkasse baserad på det som behöver räddas! Vår matkasse finns i det magiska gränslandet mellan en traditionell matkasse och färdig hämtmat. Utöver klimatfrågan tror vi starkt på smidighet och har därför tagit fram en matkasse som är klar på 15 minuter. Otroligt smidigt och otroligt gott!",
    sections: [
      {
        title: "Vilka vi är",
        text: "",
      },
      {
        title: "Vår matkasse",
        text: "",
      },
      {
        title: "Räddad mat",
        text: "",
      },
      {
        title: "Vår klimatinsats",
        text: "",
      },
    ],
    faq: "Vanliga frågor",
  },
};

const enText = {
  nav: {
    order: "Order now",
    about: "About us",
    recipe: "Recipe",
    news: "News",
    log_in: "Log in",
    log_out: "Log out",
    sign_up: "Sign up",
    my_account: "My account",
  },
  page: {
    hero: {
      title: "Ready-made food bag that does the climate a favor",
      subtitle: "Environmentally friendly on a whole new level.",
      order_now: "Order now",
    },
    usp: {
      title: "What does our food bag mean?",
      points: [
        {
          title: "Our chef creates recipes",
          text: "We gather delicious ingredients that look a bit quirky and create tasty recipes from them.",
        },
        {
          title: "The food is sent to you",
          text: "You get your rescued food bag delivered with most things prepared for you.",
        },
        {
          title: "Climate-smart meal in 15 min",
          text: "You chop and heat the last part in 15 minutes, enjoy a delicious and climate-smart dinner!",
        },
      ],
    },
    call_to_action: {
      title: "Join us and save food in an easy and climate-smart way!",
      meals: "Meals",
      vegetarian: "Vegetarian",
      price_per_portion: "Kr/portion",
      cooking_time: "Min cooking",
      order_now: "Order now",
    },
    news: {
      title: "Follow the journey - check out our latest news posts!",
      text: "We develop and test new things. We expand and come up with new stuff. Here we update what's happening in our world.",
    },
    reviews: {
      title: "Over 20,000 saved dinners, together we make a difference!",
      text: "Here's what some of our environmental heroes say to customers:",
      read_all_reviews: "Read all reviews",
    },
  },

  about_us: {
    title: "Rescuable, something that can be saved",
    description:
      "At Saveabl, we systematically identify waste among producers and wholesalers, and create a ready-made food bag based on what needs to be rescued! Our food bag exists in the magical borderland between a traditional food bag and ready-made takeaway. In addition to the climate issue, we strongly believe in convenience and have therefore developed a food bag that is ready in 15 minutes. Incredibly smooth and incredibly tasty!",
    sections: [
      {
        title: "Who we are",
        text: "",
      },
      {
        title: "Our food bag",
        text: "",
      },
      {
        title: "Rescued food",
        text: "",
      },
      {
        title: "Our climate effort",
        text: "",
      },
    ],
    faq: "Frequently Asked Questions",
  },
};

const daText = {
  nav: {
    order: "Bestil nu",
    about: "Om os",
    recipe: "Opskrift",
    news: "Nyheder",
    log_in: "Log ind",
    log_out: "Log ud",
    sign_up: "Tilmeld dig",
    my_account: "Min konto",
  },
  page: {
    hero: {
      title: "Færdiglavede madkasse der gør klimaet en tjeneste",
      subtitle: "Miljøvenlig på et helt nyt niveau.",
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
      price_per_portion: "Kr/portion",
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
        text: "Her opstod den første idé til det, der skulle blive til Saveabl. Jeroen og Alexander spekulerede på, om de kunne gøre det endnu lettere for kunder at redde god mad fra at blive smidt væk. Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre med maden, der var på Matsmart, der var begrænsede varer, og drengenes løsning ville være at forbinde et af de nye supermarkeders sortiment med Matsmart. Kunden kunne nemt indtaste deres indkøbsliste, og de varer, der var på Matsmart, og hvad der ikke var der, ville blive suppleret med varer fra f.eks. Coops online butik! Fantastisk tænkte Jeroen og Alexander! Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre.",
      },
      {
        title: "Vores madpose",
        text: "Her opstod den første idé til det, der skulle blive til Saveabl. Jeroen og Alexander spekulerede på, om de kunne gøre det endnu lettere for kunder at redde god mad fra at blive smidt væk. Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre med maden, der var på Matsmart, der var begrænsede varer, og drengenes løsning ville være at forbinde et af de nye supermarkeders sortiment med Matsmart. Kunden kunne nemt indtaste deres indkøbsliste, og de varer, der var på Matsmart, og hvad der ikke var der, ville blive suppleret med varer fra f.eks. Coops online butik! Fantastisk tænkte Jeroen og Alexander! Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre.",
      },
      {
        title: "Reddet mad",
        text: "Her opstod den første idé til det, der skulle blive til Saveabl. Jeroen og Alexander spekulerede på, om de kunne gøre det endnu lettere for kunder at redde god mad fra at blive smidt væk. Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre med maden, der var på Matsmart, der var begrænsede varer, og drengenes løsning ville være at forbinde et af de nye supermarkeders sortiment med Matsmart. Kunden kunne nemt indtaste deres indkøbsliste, og de varer, der var på Matsmart, og hvad der ikke var der, ville blive suppleret med varer fra f.eks. Coops online butik! Fantastisk tænkte Jeroen og Alexander! Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre.",
      },
      {
        title: "Vores klimaindsats",
        text: "Her opstod den første idé til det, der skulle blive til Saveabl. Jeroen og Alexander spekulerede på, om de kunne gøre det endnu lettere for kunder at redde god mad fra at blive smidt væk. Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre med maden, der var på Matsmart, der var begrænsede varer, og drengenes løsning ville være at forbinde et af de nye supermarkeders sortiment med Matsmart. Kunden kunne nemt indtaste deres indkøbsliste, og de varer, der var på Matsmart, og hvad der ikke var der, ville blive suppleret med varer fra f.eks. Coops online butik! Fantastisk tænkte Jeroen og Alexander! Problemet, de så, var, at det var lidt svært at vide, hvad man skulle gøre.",
      },
    ],
    faq: "Ofte stillede spørgsmål",
  },
};
