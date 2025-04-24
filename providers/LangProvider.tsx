"use client";

import Footer from "@/components/ui/Footer";
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
    about: "Mission",
    faq: "Vanliga frågor",
    recipe: "Menyer",
    news: "Nyheter",
    giftcard: "Presentkort",
    log_in: "Logga in",
    log_out: "Logga ut",
    sign_up: "Registrera dig",
    my_account: "Mina sidor",
    newsletter: ""
  },
  imageDisplay: {
    klimatsmart: "Klimatsmart",
    kockforberedd: "Kockförberedd",
    enkeltgott: "Enkelt & Gott",
  },
  page: {
    hero: {
      title: {
        part1: "Gör din vardagsmat",
        part2: "enkel och hållbar",
      },
      subtitle: {
        part1: "Servera vegetariska måltider på 15 minuter och ge samtidigt",
        part2: "de där överblivna grönsakerna en ny mening med livet.",
      },
      points: {
        cooking_time: "tillagningstid",
        delivery: "leverans till dörren",
        chef_prepared: "kocklagat (sista 20 briljerar du med)",
      },
      order_now: "Beställ Saveabl smartkasse!",
    },    
    usp: {
      title: "Såhär fungerar vår matkasse:",
      points: [
        {
          title: "1. Välj och beställ",
          text: "Välj din Saveabl-plan och bestäm om du vill testa en gång eller prenumerera utan bindningstid och krångel.",
        },
        {
          title: "2. Du räddar, vi levererar",
          text: "Tack vare din beställning kan vi rädda krokiga morötter och sneda potatisar. Vår stjärnkock Emil preppar maten som sedan levereras direkt till din dörr.",
        },
        {
          title: "3. Tillaga och servera på 15 min",
          text: "Ge maten en final touch och njut av en hälsosam, klimatsmart middag - snabbt, enkelt och löjligt gott.",
        },
      ],
    },

    call_to_action: {
      title: [
        "Snabbt. Klimatsmart.",
        "Och förbaskat gott.",
        "Så varför välja?"
      ],
      meals: "Middagar",
      vegetarian: "Vegetariskt",
      price_per_portion: "Lägre klimatavtryck än genomsnittsmiddagen",
      cooking_time: "Min tillagning",
      order_now: "Kom igång",
    },
    news: {
      title: "Följ med på resan - kika in våra senaste nyhetsinlägg!",
      text: "Vi utvecklas och vi testar nytt. Vi expanderar och hittar på nya grejer. Här uppdaterar vi vad som händer i vår värld.",
      title_2: "Följ med på resan - kika in våra senaste nyhetsinlägg!", 
      description: "Vi utvecklas och vi testar nytt. Vi expanderar och hittar på nya grejer. Här uppdaterar vi vad som händer i vår värld.",
    },
    reviews: {
      title: "Våra kunder räddade precis 20 000 middagar. Det här säger de om oss:",
      text: "Såhär säger några av våra miljöhjältar till kunder:",
      read_all_reviews: "Läs alla omdömen",
      read_more: "Läs mer",
      read_less: "Visa mindre",
    content: [
      {
        id: 1,
        name: "Alexander",
        title: "Saveabl är en win-win-win",
        review: "Saveabl är fantastiskt. Sättet det har underlättat vardagspusslet med två barn är otroligt, helt plötsligt har vi tid att hänga med barnen, träna eller bara få egentid på kvällarna. Maten är överlag väldigt god och uppskattad även av de små. Uppskattar att vissa rätter återkommer då och då. Men det kanske bästa är ändå att veta att den här matkassen bidrar till en bättre miljö. Helt enkelt en win-win-win!",
        date: "2024-04-13",
        url: "https://se.trustpilot.com/reviews/661afa5898613cce1ecc71a1",
        rating: 5,
      },
      {
        id: 2,
        name: "Niklas",
        title: "Väldigt god men samtidigt enkel mat",
        review: "Väldigt god men samtidigt enkel mat! Istället för att få alla råvaror och behöva göra det från grunden så är det här ett perfekt substitut för att slänga ihop en snabb middag mitt i vardagen! Och smaker som inte tagit genvägar heller, enkelt och sjukt gott helt enkelt!",
        date: "2024-01-31",
        url: "https://se.trustpilot.com/reviews/65cd1846358cb4bb2f35c5a9",
        rating: 5,
      },
      {
        id: 3,
        name: "Anneli",
        title: "Absolut den bästa matkassen vi testat",
        review: "Absolut den bästa matkassen vi testat. Vet inte hur vi överlevde innan! Jättegoda och varierande smaker, och maten blir klar på max en kvart varje kväll. Fantastiskt under småbarnsåren när maten snabbt ska fram. Generösa portioner också, för oss som är 2 vuxna och 1 barn räcker det ofta till 5-6 måltider.",
        date: "2023-12-18",
        url: "https://se.trustpilot.com/reviews/65804ae9054828d5f4bada17",
        rating: 5,
      },
    ],
  },
  hero_sthlm: {
    launch_offer: "Ange <strong>STHLM</strong> på saveabl varje eller\nvarannan vecka för lanseringsrabatt.",
  }  
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
    faq: "Vanligaste frågorna",
    faqItems: [
      {
        question: "Prenumeration, hur funkar det?",
        answer: "Våra prenumerationer är helt utan bindningstid, vilket innebär att du kan pausa och avbryta när du vill. För att pausa eller avbryta din prenumeration loggar du enkelt in på ditt konto, alternativt kontaktar oss via mejl så ordnar vi det. Pausningar/uppsägningar behöver komma in till oss innan torsdagen inför leverans. Detta då vi bokar leveranserna denna dag, samt så vi ska kunna planera exakt antal matkassar med våra kockar.",
      },
      {
        question: "15 minuter, hur då?",
        answer: "Våra kockar gör de svåraste och mest tidskrävande stegen åt dig, så när matkassen levereras utanför din dörr är den klar till ungefär 70%. Vilket innebär att du endast behöver göra de sista, roliga stegen för att färdigställa middagen! Oftast handlar det om att rosta av något i ugnen, koka upp något eller värma en sås. Och på så vis har du dina kockpreppade middagar klara på endast 15 minuter!",
      },
      {
        question: "Räddad mat? Vad betyder det?",
        answer: "Vi samarbetar med gårdar, matproducenter och grossister och hjälper dem att rädda bra matvaror från att slängas. Ofta handlar det om frukt och grönt som inte uppfyller butikernas krav på storlek, form eller färg. Vi ser till att dessa utmärkta varor inte går till spillo. I många fall är maten i våra kassar till och med färskare än butikens, eftersom den ofta kommer direkt från bonden.",
      },
      {
        question: "Har matens bäst-före datum passerat?",
        answer: "Nej, inget som vi skickar ut har passerat bäst före-datum. All mat som vi skickar ut i matkassen ska hålla i minst 7 dagar från att den når våra kunder, då vi räknar med att maten äts upp inom loppet av en vecka.",
      },
      {
        question: "Behöver jag ha något extra hemma?", 
        answer: "Du behöver bara ha någon typ av matlagningsolja hemma, lite salt och peppar och sen har vi tillsatt ALLT annat! Njut av smidigheten.", 
      },
      {
        question: "Hur mycket av maten är egentligen räddad?", 
        answer: "Du hittar den exakta andelen räddad mat under varje enskilt recept. Vi strävar efter att ungefär 70% av ingredienserna ska vara räddade. Vår målsättning är att hitta den perfekta balansen mellan att skapa fantastiska och fullständiga rätter samtidigt som vi har en positiv inverkan på klimatet. En sammanställning gjord i samarbete med RISE visar att vårt klimatavtryck är hela 5 gånger lägre än en genomsnittlig svensk middag. Så ja, vi är definitivt på rätt väg mot en mer hållbar framtid!", 
      },
      {
        question: "Allergier? Vad gäller?", 
        answer: "Tyvärr kan vi inte lösa alla allergier, skicka oss gärna ett mail så kan vi titta närmare på om vi kan ordna en matkasse som passar just din allergi.", 
      },
      {
        question: "Kan jag välja rätterna själv?", 
        answer: "Inte just nu, men vi hoppas på att kunna erbjuda det i framtiden. Att ge mer valfrihet gör våra inköp mindre förutsägbara och svinnet hamnar hos oss istället. Vi försöker hitta rätt balans mellan valfrihet och hållbarhet för att erbjuda så mycket som möjligt utan att äventyra vårt klimatarbete.", 
      },
      {
        question: "Jag kan inte vara hemma vid leverans?", 
        answer: "Våra matkassar levereras av Gordon Delivery, du får ett sms med uppskattad leveranstid redan 3-4 dagar innan leverans. Skulle du inte vara hemma när kassen levereras kan Gordon lämna den utanför din dörr och då klarar sig maten bra i 1-2 timmar. Vi brukar alltid frysa ner en behållare och på så vis ha något som håller maten kall utan att behöva använda extra material.", 
      },
    ],
    button: "Jag fattar - beställ nu!"
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
    sending_comment: "Skickar...", 
    next_week_order_until: "Går att beställa t.o.m. onsdag v. {week}"
  },

  recipe_slug: {
    contains: "Innehåll",
    how_to: "Gör så här",
    saved_ingredients: "Räddade varor i receptet",
    nutrients: "Näringsvärden",
    ingredients: "Innehåll & allergener",
    comment: "Recensera recept", 
    share: "Dela recept", 
    share_message: "Spana in detta receptet!",
    share_button: "Dela recept",
    share_not_supported: "Delning stöds inte på denna enhet", 
    no_ingredients: "Inga ingredienser listade än - kommer snart!", 
    no_steps: "Inga steg listade än - kommer snart!"
  
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
    type: "Gör dina val - utan bindningstid på samtliga:",
    variant: "Välj hur ofta du vill få din matkasse:",
    urgency: "Fåtal kvar", 
    deliveryDay: "Välj leveransdag:",
    delivery_saturday: "Lördag 3/5",
    delivery_sunday: "Söndag 4/5",
    delivery_monday: "Måndag 5/5",
    saturday_description: "kl. 09-18", 
    sunday_description: "kl. 10-17", 
    monday_description: "kl. 16-22",
    stockholm_sunday: "Söndag 4/5",
    stockholm_monday: "Måndag 5/5",
    sunday_description_stockholm: "kl. 10-17",
    monday_description_stockholm: "kl. 16-22", 
    copenhagen_monday: "Måndag 5/5", 
    monday_description_copenhagen: "kl. 16-22", 
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
    phonenumber_example: "Telefonnummer", 
    email: "E-post",
    email_example: "E-post",
    password: "Lösenord",
    password_example: "Lösenord",
    step1_button: "Leveransdag", 
    back_button: "Tillbaka", 
    step2_button: "Leveransinfo", 
    loading: "Laddar...", 
    pay: "Till betalning", 
    summaryTitle: "Dina val:",
    mealKit: "Matkasse",
    frequency: "Leveransfrekvens",
    deliveryDaysummary: "Leveransdag",
    totalPrice: "Totalpris",
    discountNote: "Eventuella rabattkoder anges i sista steget",
    shipping: "+ frakt", 
    title_familjekassen: "Familjekassen",
    title_sambokassen: "Sambokassen",
    subtitle_familjekassen: "3 recept • 3-4 personer",
    subtitle_sambokassen: "3 recept • 2-3 personer",
    faq: "Frågor som kan uppstå:",
    faqItems: [ 
      {
        question: "Prenumeration, hur funkar det?",
        answer: "Våra prenumerationer är helt utan bindningstid, vilket innebär att du kan pausa och avbryta när du vill. För att pausa eller avbryta din prenumeration loggar du enkelt in på ditt konto, alternativt kontaktar oss via mejl så ordnar vi det. Pausningar/uppsägningar behöver komma in till oss innan torsdagen inför leverans. Detta då vi bokar leveranserna denna dag, samt så vi ska kunna planera exakt antal matkassar med våra kockar.",
      },
      {
        question: "Allergier? Vad gäller", 
        answer: "Tyvärr kan vi inte lösa alla allergier, skicka oss gärna ett mail så kan vi titta närmare på om vi kan ordna en matkasse som passar just din allergi.", 
      },
      {
        question: "Jag kan inte vara hemma vid leverans?", 
        answer: "Våra matkassar levereras av Gordon Delivery, du får ett sms med uppskattad leveranstid redan 3-4 dagar innan leverans. Skulle du inte vara hemma när kassen levereras kan Gordon lämna den utanför din dörr och då klarar sig maten bra i 1-2 timmar. Vi brukar alltid frysa ner en behållare och på så vis ha något som håller maten kall utan att behöva använda extra material.", 
      },
      {
        question: "Behöver jag ha något extra hemma?", 
        answer: "Du behöver bara ha någon typ av matlagningsolja hemma, lite salt och peppar och sen har vi tillsatt ALLT annat! Njut av smidigheten.", 
      },
    ],
  },

  success: {
    title: "Tack för din beställning!",
    description:
      "Vi har nu mottagit din beställning. Leveransinformation kommer att skickas till ditt mobilnummer från vår partner Gordon Delivery när de planerat upp rutten.",
    nextStepsDescription: "Har du startat en prenumeration har du nu ett aktivt konto. Du kan se detaljer och hantera din prenumeration på dina sidor.", 
    button: "Till mina sidor",
    contactTitle: "Några frågor?", 
    contactDescription: "Tveka inte att kontakta oss på ", 
    feedbackTitle: "Hur hittade du oss?",
    feedbackSubtitle: "Vi hade blivit så tacksamma om du vill ange hur du hittade till Saveabl :)",
    options: {
      friend: "Via en vän",
      socialMedia: "Sociala medier",
      other: "Annat"
    },
    placeholderOther: "Ange hur du hittade oss",
    submitButton: "Skicka", 
    thankYouTitle: "Stort tack!", 
    thankYouDescription: "Tusen tack för hjälpen. Njut av middagarna! <3"
  },
  auth: {
    title1: "Logga in",
    title2: "Registrera dig",
    description: "Logga in för att se information om dina beställningar.",
    description2: "Registrera dig för att hantera ditt konto.",
    email: "E-post",
    email_instructions: "OBS! Små bokstäver",
    password: "Lösenord",
    confirm_password: "Bekräfta lösenord",
    password_no_match: "Lösenorden matchar inte",
    account_created: "Ditt konto har skapats!",
    button: "Logga in",
    forgot_password: "Glömt lösenord/Verifiera konto",
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
    pause_until: "Prenumerationen är pausad. Nästa matkasse levereras vecka {week} (leverans lör/sön räknas som nästkommande vecka). ", 
    pause_indefinite: "Kontot är pausat tills vidare.",
    not_in_subscription_prefix: "Matkassen vecka",
    not_in_subscription_suffix: "ingår inte i din prenumeration.",
    add_to_subscription: "Lägg till",
    subscription_details: "Prenumerationsdetaljer",
    billing_frequency: "Faktureringsfrekvens",
    delivery_day: "Leveransdag", 
    active_on: "Aktiv på",
    account_information: "Kontoinformation",
    email: "E-post",
    name: "Namn",
    phone: "Telefon",
    deliveryDay: "Leveransdag",
    address: "Adress",
    manage_account: "Hantera konto",
    paused_until: "Pausad till",
    modalTitle: "Pausa matkassen - tänk på:",
    firstWeekAfterPause: "Välj när du vill få första matkassen efter paus:", 
    modalDescription: [
      "Du kan pausa matkassen t.o.m. onsdag före leverans.",
      "Helgleveranser räknas till veckan därpå."
    ],
    resumeSubscriptionButton: "Återuppta prenumeration",
    pauseOption1: "Lör/sön innan- eller mån",
    pauseOption2: "Lör/sön innan- eller mån",
    pauseOption3: "Lör/sön innan- eller mån",
    weekOption: "vecka",
    pauseButton: "Pausa",
    pauseInfoWithEmail: `Behöver du en längre paus? Kontakta oss på <a href="mailto:hello@saveabl.se?subject=Längre paus från matkasse&body=Hej Saveabl,%0D%0A%0D%0AJag skulle vilja ta en längre paus från matkassen. Kan ni hjälpa mig med det?%0D%0A%0D%0AFörsta matkassen jag vill få efter pausen är vecka: _____%0D%0A%0D%0AMed vänliga hälsningar," class="underline text-[#6E2936]">hello@saveabl.se</a> så hjälper vi dig!`,
    numberOfMealKits: "Antal",
    date: "Datum",
    intervalOption1: "Varje vecka",
    intervalOption2: "Varannan vecka",
    intervalButton: "Ändra",
    intervalModalTitle: "Ändra intervall",
    intervalModalDescription: "Ändringar innan torsdag gäller för kommande matkasse. Därefter gäller det för matkassen därpå. Obs, vid byte till varannan vecka börjar perioden med en matkassevecka.",
    change_delivery_day_button: "Ändra leveransdag",
    dayModalTitle: "Ändra leveransdag",
    dayModalDescription: "Byt leveransdag för kommande matkasse eller välj om du vill att ändringen ska gälla framöver.",
    beforeThursday: "Ändringar innan torsdag gäller för kommande matkasse",
    afterThursday: "Ändringar efter torsdag gäller för matkassen därpå",
    acceptanceNote: "För att vi ska kunna planera behöver vi godkänna ändringen, så det kan ta en liten stund innan den syns på ditt konto. Tack för ditt tålamod! :)",
    always_use_this_day: "Använd den valda leveransdagen framöver.", 
    deliveryDayModalPlaceholder: "Ändra leveransdag till",
    days: {
      saturday: "Lördag",
      sunday: "Söndag",
      monday: "Måndag",
    },
    no_connection: "Ingen aktiv prenumeration",
    no_connection_desc: "Vi stödjer tyvärr inte att visa upp engångsköp ännu.",
    contact_us: "Kontakta oss",
    questions: "Har du några frågor om vår matkasse? Kontakta oss gärna!",
    referral_title: "Tipsa en vän",
    referral_explanation: "Dela din personliga kod med dina vänner för att ge och få 100kr rabatt. Du får automatiskt 100kr rabatt för varje vän du värvar!",
    referral_your_code: "Din personliga kod",
    referral_code_note: "Din kod är giltig för nya kunder", 
    referral_copy_button: "Kopiera kod",
    referral_share_button: "Dela kod", 
    referral_no_code: "Ingen värvningskod tillgänglig", 
    change_address_button: "Uppdatera info", 
    change_address_modal_title: "Uppdatera dina uppgifter",
    change_address_modal_desc: "Ange din nya adress och telefonnummer nedan.",
    street_address: "Gatuadress",
    street_address_placeholder: "Ange gatuadress",
    postal_code: "Postnummer",
    postal_code_placeholder: "Ange postnummer",
    city: "Stad",
    city_placeholder: "Ange stad",
    phone_modal: "Telefonnummer",
    phone_placeholder: "Ange telefonnummer",
    update_button: "Uppdatera",
    address_update_success: "Adress och telefonnummer uppdaterades!",
    address_update_error: "Något gick fel vid uppdatering.", 
    success_title: "Nu är det fixat!", 
    success_description: "Det kan ta ett en liten stund innan det syns på din sida. Hör av dig om du har några frågor, vi hjälper dig gärna på hello@saveabl.se 💌", 
    error_title: "Något gick fel!", 
    error_description: "Försök igen eller kontakta oss om problemet kvarstår!", 
    close_button: "Stäng", 
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
  terms: {
    title: "Villkor",
    subtitle: "Prenumeration", 
    description: "Våra prenumerationer är helt utan bindningstid, vilket innebär att du kan pausa och avbryta när du vill. För att pausa eller avbryta din prenumeration loggar du enkelt in på ditt konto, alternativt kontaktar oss via mejl så ordnar vi det. Pausningar/uppsägningar behöver komma in till oss innan torsdagen inför leverans. Detta då vi bokar leveranserna denna dag, samt så vi ska kunna planera exakt antal matkassar med våra kockar.",
    subtitle1: "Allmänna villkor Saveabl",
    description1: "När du handlar på Saveabls hemsida ingås alla avtal med Foody Impact AB (”Saveabl”, ”vi”, ”vår”, eller ”oss”), organisationsnummer 559266-3149, med adress Övre Kaserngården 12, 415 27 Göteborg. I samband med ett köp hos oss accepterar du de här allmänna villkoren. Enbart privatpersoner, eller representanter för företag, som är över 18 år och har full juridisk rätt att ingå avtal får handla Saveabls produkter.",
    subtitle2: "Betalning, beställning och priser", 
    description2: "Alla priser anges i svenska kronor och är inklusive mervärdesskatt (s.k. moms) och avgifter, om inte annat anges. På Saveabls hemsida kan följande  debit- eller kreditkort användas för betalning: Visa, MasterCard, American Express, Discover & Diners Club och China UnionPay. Därtill acccepteras också betalning via Klarna Bank AB, Sveavägen 46, 111 34 Stockholm (”Klarna”). Om du betalar via Klarna godkänner du också deras villkor, som du hittar här. Efter godkänd betalning skickas en orderbekräftelse till den e-postadress kunden angivit vid beställningen eller vid skapandet av användarkontot. Saveabl tar inget ansvar för om kunden angivit fel e-postadress.",
    subtitle3: "Leverans",
    description3: "Leveransdatum stipuleras på sidan där du gör ditt köp. Leveransen görs till adressen som kunden angivit vid registrering eller köp. Saveabl tar inget ansvar för att hålla uppgifter om kunders adresser uppdaterade och det är kunden själv som ansvarar för att deras adress är korrekt och uppdaterad.", 
    subtitle4: "Reservation för informationsfel",
    description4: "Saveabl reserverar sig för eventuella skrivfel på hemsidan såsom felaktiga priser, fel i produktbeskrivningen och felaktig lagerstatus av matkassar. Saveabl förbehåller sig rätten att korrigera eventuella fel. Om felaktigt pris har angivits på hemsidan förbehåller sig Saveabl rätten att korrigera priset och eventuellt ta bort varan från beställningar. Alla bilder som presenteras på hemsidan ska ses som exempelbilder och garanterar inte att spegla maträtternas exakta utseende.",
    subtitle5: "Reklamation",
    description5: "Om du önskar reklamera en vara på grund av att något fel upptäcks ska du kontakta oss så snart som möjligt. Det här ska dock som senast ske inom 14 dagar. Du når oss på ",
    subtitle6: "Force Majeure",
    description6: "Om Saveabl på grund av någon omständighet eller omständigheter som anses ligga bortom vår kontroll (s.k. ”Force Majeure”) förhindras att utföra våra åtaganden gentemot våra kunder utgör detta inte ett avtalsbrott.", 
    subtitle7: "Tvist",
    description7: "Vid en eventuell tvist hänvisar Saveabl till Allmänna Reklamationsnämnden.", 
    subtitle8: "Behandling av personuppgifter", 
    description8: "Saveabl samlar in och behandlar dina personuppgifter för att skapa en så bra köpupplevelse som möjligt för dig som kund. För att läsa mer om vår behandling av dina personuppgifter, se vår ",
    subtitle9: "Upphovsrätt", 
    description9: "All data och programvara på vår hemsida, tillhör Saveabl och är endast tillgängliga för privat bruk i samband med köp och korrespondens med Saveabl. Annat användande såsom reproduktion, redistribution, ändring, bearbetning eller publicering av innehållet på Saveabls webbplats, såväl för kommersiella som privata syften, är inte tillåtet utan uttryckligt medgivande från Saveabl.",
    subtitle10: "Ångerrätt", 
    description10: "Enligt lagen om distansavtal och avtal utanför affärslokaler (SFS 2005:59) gäller ej ångerrätt för livsmedel eller andra dagligvaror. Du som kund har alltså inte ångerrätt för köpta varor.",
   },
   integrity_policy: {
    introduction: "Integritetspolicy",
    section_1: {
      title: "1. Introduktion",
      description: "Den här integritetspolicyn (”Policyn”) beskriver hur varumärket Saveabl via företaget Foody Impact AB (”Vi”, ”vår” och ”oss”) (organisationsnummer 559266-3149), adress Övre Kaserngården 12, 415 27 Göteborg, hanterar personuppgifter. Vi värnar om våra kunders personliga integritet och är måna om att alla kunder och besökare på hemsidans trygghet i vår behandling av personuppgifter. Vi har i den här policyn samlat information om hur vi hanterar dina personuppgifter som du lämnat till oss i samband med att du använt våra tjänster samt de personuppgifter vi på andra sätt fått tillgång till. Vi har en skyldighet att se till att behandlingen av dina personuppgifter utförs i enlighet med denna Policy och gällande personuppgiftlagstiftning."
    },
    section_2: {
      title: "2. Hur Saveabl behandlar dina personuppgifter",
      description: "Saveabls behandling av dina personuppgifter kan skilja sig åt beroende på din relation till oss. Om du är besökare på vår hemsida utan att skapa ett användarkonto sparar vi enbart cookies, och eventuellt material som uppstått i samband med kontakt med vår kundtjänst.",
      subsection_1: {
        title: "2.1 Varifrån samlar vi in personuppgifter?",
        description: "Vi behandlar personuppgifter som lämnas av dig när du skapar ett användarkonto och handlar via vår hemsida saveabl.se. Uppgifter som vi samlar in i samband med det här inkluderar, men är inte enbart, namn, telefonnummer, adress, e-mailadress m.m. Vidare behandlar vi personuppgifter som uppkommer när du använder vår hemsida för att köpa varor, som t ex köpta varor, belopp, datum för inköp och betalsätt. Vi samlar också in information i samband med inloggningen på ditt användarkonto, såsom besökshistorik. Därtill sparar vi kommentarer som gjorts på hemsidan."
      },
      subsection_2: {
        title: "2.2 Hur länge sparar vi dina personuppgifter?",
        description: "Om inte en särskild lagringsperiod stipuleras i svensk lagstiftning sparar vi dina personuppgifter, till exempel att vi i enlighet med bokföringslagen är skyldiga att spara vissa uppgifter, sparas dina personuppgifter i längst 3 år från ditt senaste inköp. I tidigare nämnda undantagsfall stipulerade av svensk lagstiftning sparas dina personuppgifter i längst 7 år från ditt senaste inköp."
      }
    },
    section_3: {
      title: "3. Dina rättigheter",
      description: "Du har ett antal rättigheter i förhållande till vår behandling av dina personuppgifter. Har du ytterligare frågor rörande dina rättigheter är du välkommen att höra av dig till oss på hello@saveabl.se.",
      subsection_1: {
        title: "3.1 Rätt till tillgång",
        description: "Vi strävar efter att vara så transparenta som möjligt i behandlingen av dina personuppgifter. Om du vill få information om eller insyn i hur vi hanterar dina personuppgifter kan du begära tillgång till uppgifterna. Vid begäran om tillgång kommer vi att fråga om ytterligare uppgifter för att säkerställa att uppgifterna lämnas ut till rätt person samt vilka uppgifter du vill ta del av. En sådan begäran görs lättast till hello@saveabl.se."
      },
      subsection_2: {
        title: "3.2 Rätt till rättelse",
        description: "Du har rätt till att utan onödigt dröjsmål få eventuellt felaktiga uppgifter om dig rättade, samt komplettera onödiga uppgifter."
      },
      subsection_3: {
        title: "3.3 Rätt till radering",
        description: "Du har rätt att begära radering av personuppgifter som vi behandlar om något av följande inträffar: Uppgifterna inte längre är nödvändiga för ändamålen de samlades in för eller på något annat sätt behandlas; Du återkallar ditt samtycke för en behandling av dina personuppgifter som stött sig på ditt tidigare samtycke och det inte finns någon annan typ av rättslig grund för behandlingen; Du invänder mot en intresseavvägning som vi har gjort och berättigat intresse som väger tyngre å vår sida saknas; Personuppgifterna har behandlats eller behandlas på ett olagligt sätt; Personuppgifterna måste raderas för att vi ska uppfylla en rättslig förpliktelse vi omfattas av."
      },
      subsection_4: {
        title: "3.4 Rätt till begränsning",
        description: "Du har rätt att begära att behandlingen av dina personuppgifter begränsas om: Du bestrider personuppgifternas korrekthet, under en tid som ger oss möjlighet att kontrollera om de är korrekta; Behandlingen av personuppgifterna är olaglig och du motsätter dig att de raderas och istället begär en begränsning av vår användning; Vi inte längre behöver personuppgifterna för ändamålen med behandlingen men du behöver dem för att fastställa, göra gällande, eller försvara rättsliga anspråk; Du har invänt mot en intresseavvägd behandling som vi har angivit som ändamål."
      },
      subsection_5: {
        title: "3.5 Rätt att göra invändningar mot behandling av personuppgifter för direktmarknadsföring",
        description: "Du har rätt till att invända mot att dina personuppgifter används för direktmarknadsföring."
      },
      subsection_6: {
        title: "3.6 Rätt till dataportabilitet",
        description: "Om vår personuppgiftsbehandling sker automatiserat och grundar sig på ditt samtycke, alternativt fullgörande av avtal, har du rätt att begära att de uppgifter som berör dig och som du har lämnat till oss ska överföras till en annan personuppgiftsansvarig. Förutsättningen för det här är att behandlingen kan ske automatiserat och är tekniskt möjlig."
      }
    }
  }, 
  blog: {
    title: "Följ med på resan!", 
    description: "Vi utvecklas och vi testar nytt. Vi expanderar och hittar på nya grejer. Här uppdaterar vi vad som händer i vår värld.",
    loadmore: "Ladda fler", 
  },
  newsletter: {
    header_title: "300 000 000 morötter sorteras bort efter skörd varje år?", 
    header_subtitle: "Och det enbart i Sverige... På Saveabl räddar vi mat som vår mästerkock lagar nästintill klar och erbjuder dig fantastiska middagar på bara 15 minuter. Spara tid, hjälp klimatet och njut av kockpreppade måltider – svårare behöver det inte vara!", 
    additional_button: "Till matkassen",
    new_section_title: "Häng med på resan!", 
    new_section_subtitle: "Vi utvecklas och testar nytt. Vi expanderar och hittar på spännande grejer. Häng med på resan och få nyheter, erbjudanden och recept först av alla!", 
    email: "anna.andersson@exempel.com",
    name: "Anna",
    country: "SE eller DK",
    email_label: "Email",
    name_label: "Namn",
    country_label: "Vart bor du? (SE/DK)", 
    consent_text: "Jag vill få nyheter, erbjudanden etc. skickade till mig & kan avprenumerera när jag vill.",
    submit: "Häng med!",
    error_consent: "Fyll i mig", 
    error_submit: "Du har missat något", 
    thank_you_title: "Välkommen!",
    thank_you_message: "Du kommer nu hållas uppdaterad om vad som händer i vår värld! PS. Håll koll på din inkorg, det kan trilla in en överraskning där inom kort :)", 
    consent_error: "Något gick fel!", 
    error_message: "Din mejladress är redan registrerad hos oss, kontakta oss gärna om detta inte skulle stämma!"
},
popup: {
  title: "Vinn en matkasse!",
  description: "Varje månad lottar vi ut en matkasse till en av våra mejlkompisar. Har du redan köpt och vinner återbetalar vi dig.",
  placeholder: "Fyll i din mejladress",
  country_label: "Vart bor du?",
  select_country_error: "Vänligen välj Sverige eller Danmark.",
  sweden: "Sverige",
  denmark: "Danmark",
  consent_text: "Genom att fylla i formuläret anmäler du dig till våra mejlutskick. Du kan när som helst avregistrera dig.",
  submit_button: "Delta",
  thank_you_message: "Tack! Vi kontaktar vinnaren via mejl ✨",
  error_message: "Du är redan en av våra mejlkompisar och därför med i tävlingen <3", 

},

  footer: {
    questions: "Frågor, funderingar?", 
    questions2: "Släng iväg ett mejl så reder vi ut det!",
    faq: "Vanliga frågor",
    terms: "Allmänna villkor", 
    integrity: "Integritetspolicy",
    newsletter: "Håll dig uppdaterad",
  }, 
  footer_newsletter: {
    title: "Bli en del av förändringen",
    placeholder: "Fyll i din mejladress",
    description: "Genom att fylla i formuläret anmäler du dig till våra mejlutskick. Du kan när som helst avregistrera dig.",
    subscribe_button: "Prenumerera",
    error_message: "Du är redan en av våra mejlkompisar <3",
    thank_you_message: "Tack för att du prenumererar!",
    country_label: "Vart bor du?",
    select_country_error: "Vänligen välj Sverige eller Danmark innan du skickar in.",
    sweden: "Sverige",
    denmark: "Danmark",
  }, 
  
  referral: {
    header_title: "Bjud in dina vänner: tjäna 100kr!",
    subtitle: "",
    header_subtitle: "Fyll i dina uppgifter nedan för att hämta och dela din personliga kod. Både du och dina vänner får sedan 100kr rabatt på matkassen!",
    name_label: "Namn",
    name_placeholder: "För- och efternamn",
    email_label: "E-post",
    email_placeholder: "Ange din e-postadress",
    submit_button: "Visa kod",
    code_label: "Din kod är",
    thank_you_subtitle: "Tack för att du hjälper oss att sprida ordet om Saveabl! Dela koden med dina vänner och tjäna 100kr per kund du värvar.", 
    copy_button: "Kopiera kod",
    sms_message: "Hej! Med min kod {referralCode} får du 100kr rabatt på www.saveabl.com. Ange den i checkouten när du gör din beställning :)", 
    not_found: "Vi kunde inte hitta dig som kund :( Kontakta oss gärna om vi har fel!",
    copy_success: "Koden är kopierad!",
    copy_fail: "Misslyckades att kopiera koden"
  }, 
  promotionbanner: {
    promotiontext: "Bästa klimatvänliga matkassen - EU Business news"
  },
  presentkort: {
    title: "Saveabl Presentkort", 
    description: "Vad kan vara bättre att ge till nära och kära än en stressfri vardag? Inget tycker vi!",
    buy: "Köp nu",
    subheading: "Julklappen innehåller:",
      points: [
        "Presentkort på en veckas matkasse + hemleverans",
        "Du väljer om du vill ha det digitalt eller skickat på posten",
        "Pris: 699 SEK",
      ],
  },
  stockholmPopup: {
    title: "Lanseringserbjudande",
    description:
      "För att fira vår lansering i Stockholm får du som startar en prenumeration 100 kr rabatt på dina fyra första matkassar.",
    code_note: "Ange kod STHLM i kassan.",
    save_later: "Spara till senare?",
    save_description: "Fyll i din mejladress så skickar vi koden.",
    placeholder: "Din e-postadress",
    send_button: "Skicka",
    consent_text:
      "Genom att fylla i formuläret anmäler du dig till våra mejlutskick. Du kan när som helst avregistrera dig.",
    error_empty: "Fyll i din e-postadress.",
    error_generic: "Något gick fel. Försök igen.",
    success_message: "Tack! Vi har skickat koden till dig 💌",
  }, 
  
};

const enText = {
  nav: {
    order: "Get started",
    about: "Mission",
    faq: "Common questions",
    recipe: "Our menus",
    news: "News",
    giftcard: "Gift Card",
    log_in: "Log in",
    log_out: "Log out",
    sign_up: "Sign up",
    my_account: "My account",
  },
  imageDisplay: {
    klimatsmart: "Climate friendly",
    kockforberedd: "Chef prepared",
    enkeltgott: "Simple & Tasty",
  },
  page: {
    hero: {
      title: {
        part1: "Make your everyday meals",
        part2: "simple and sustainable",
      },
      subtitle: {
        part1: "Serve vegetarian meals in 15 minutes and at the same time",
        part2: "give those leftover veggies a new meaning in life.",
      },
      points: {
        cooking_time: "cooking time",
        delivery: "delivery to your door",
        chef_prepared: "chef-prepared (you shine during the final 20)",
      },
      order_now: "Order Saveabl smart kit!",
    },    
    usp: {
      title: "How it works",
      points: [
        {
          "title": "1. Choose and order",
          "text": "Select your Saveabl plan and decide whether you want to try it once or subscribe with no commitments or hassle.",
        },
        {
          "title": "2. You save, we deliver",
          "text": "Thanks to your order, we can save crooked carrots and wonky potatoes. Our star chef Emil preps the meals, which are then delivered straight to your door.",
        },
        {
          "title": "3. Cook and serve in 15 min",
          "text": "Give the food a final touch and enjoy a healthy, climate-smart dinner – quick, easy, and ridiculously tasty.",
        },
        
      ],
    },
    call_to_action: {
        title: [
          "Quick. Climate-friendly.",
          "And ridiculously tasty.",
          "So why choose?"
        ],
      meals: "Meals",
      vegetarian: "Vegetarian",
      price_per_portion: "Lower climate footprint than the average meal",
      cooking_time: "Min cooking",
      order_now: "Get started",
    },
    news: {
      title: "Follow the journey - check out our latest news posts!",
      text: "We're constantly evolving, exploring new horizons, and pushing the boundaries. Step into our world and discover the latest developments in our universe",
      title_2: "Follow the journey - check out our latest news posts!",
      description: "We're constantly evolving, exploring new horizons, and pushing the boundaries. Step into our world and discover the latest developments in our universe",
    },
    reviews: {
      title: "Our customers just saved 20 000 dinners. Here's what they say:",
      text: "Here's what our climate-hero-customers think",
      read_all_reviews: "Read all reviews",
      read_more: "Read more",
      read_less: "Read less",
    content: [
      {
        id: 1,
        name: "Alexander",
        title: "Saveabl is a win-win-win",
        review: "Saveabl is amazing. The way it has simplified our daily life with two kids is incredible. Suddenly, we have time to spend with the children, work out, or just enjoy some alone time in the evenings. Overall, the food is very tasty and also appreciated by the little ones. I appreciate that some dishes return now and then. But perhaps the best thing is knowing that this meal kit contributes to a better environment. Simply a win-win-win!",
        date: "2024-04-13",
        url: "https://se.trustpilot.com/reviews/661afa5898613cce1ecc71a1",
        rating: 5
      },
      {
        id: 2,
        name: "Niklas",
        title: "Very tasty yet simple food",
        review: "Very tasty yet simple food! Instead of getting all the ingredients and having to do everything from scratch, this is the perfect substitute for throwing together a quick dinner in the middle of a busy day! And the flavors haven’t taken any shortcuts either, simple and ridiculously delicious!",
        date: "2024-01-31",
        url: "https://se.trustpilot.com/reviews/65cd1846358cb4bb2f35c5a9",
        rating: 5
      },
      {
        id: 3,
        name: "Anneli",
        title: "Absolutely the best meal kit we've tried",
        review: "Absolutely the best meal kit we've tried. I don’t know how we survived before! Very tasty and varied flavors, and the food is ready in just 15 minutes every evening. Fantastic during the toddler years when food needs to be ready quickly. Generous portions too – for us as two adults and one child, it often lasts for 5-6 meals.",
        date: "2023-12-18",
        url: "https://se.trustpilot.com/reviews/65804ae9054828d5f4bada17",
        rating: 5
      }
    ]    
  },
  hero_sthlm: {
    launch_offer: "Enter <strong>STHLM</strong> on saveabl weekly or\nevery other week for launch discount",
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
    faq: "Frequently Asked Questions",
faqItems: [
  {
    question: "Subscription, how does it work?",
    answer: "Our subscriptions are completely without a binding period, meaning you can pause or cancel whenever you want. To pause or cancel your subscription, simply log in to your account or contact us via email, and we'll take care of it. Pauses/cancellations need to be submitted to us by Thursday before the delivery, as we book deliveries on this day and need to plan the exact number of meal kits with our chefs."
  },
  {
    question: "15 minutes, how is that possible?",
    answer: "Our chefs do the hardest and most time-consuming steps for you, so when the meal kit is delivered to your door, it’s about 70% done. This means you only need to do the final, fun steps to finish the meal! It usually involves roasting something in the oven, boiling something, or heating a sauce. This way, you can have your chef-prepared meals ready in just 15 minutes!"
  },
  {
    question: "Resqued food? What does that mean?",
    answer: "We collaborate with farms, food producers, and wholesalers to help them save good food items from being thrown away. It’s often fruits and vegetables that don’t meet store requirements for size, shape, or color. We make sure that these excellent items don’t go to waste. In many cases, the food in our kits is even fresher than what you find in stores because it often comes directly from the farmer."
  },
  {
    question: "Has the food's best-before date passed?",
    answer: "No, nothing we send out has passed its best-before date. All food in our meal kits should last at least 7 days from when it reaches our customers, as we expect the food to be eaten within a week."
  },
  {
    question: "Do I need anything extra at home?",
    answer: "You only need some kind of cooking oil, a little salt and pepper, and we’ve provided EVERYTHING else! Enjoy the convenience."
  },
  {
    question: "How much of the food is actually saved?",
    answer: "You can find the exact percentage of saved food under each individual recipe. We aim for about 70% of the ingredients to be saved. Our goal is to find the perfect balance between creating fantastic and complete dishes while also having a positive impact on the climate. A summary made in collaboration with RISE shows that our carbon footprint is five times lower than an average Swedish dinner. So yes, we are definitely on the right track toward a more sustainable future!"
  },
  {
    question: "Allergies? What’s the deal?",
    answer: "Unfortunately, we can't address all allergies, but feel free to email us, and we’ll take a closer look to see if we can create a meal kit that suits your specific allergy."
  },
  {
    question: "Can I choose the dishes myself?",
    answer: "Not right now, but we hope to offer this in the future. Allowing more choice makes our purchases less predictable, and the waste falls on us instead. We try to find the right balance between choice and sustainability to offer as much as possible without compromising our climate work."
  },
  {
    question: "I can't be home at delivery?",
    answer: "Our meal kits are delivered by Gordon Delivery, and you will receive an SMS with an estimated delivery time 3-4 days before the delivery. If you're not home when the kit is delivered, Gordon can leave it outside your door, and the food will stay good for 1-2 hours. We usually freeze a container, which helps keep the food cold without needing extra materials."
  }
],
button: "Got it - order now!"
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
    send_comment: "Comment", 
    sending_comment: "Sending...",
    next_week_order_until: "Available to order until Wed, w. {week}"
  },
  recipe_slug: {
    contains: "Contains",
    how_to: "How to",
    saved_ingredients: "Saved items in the recipe",
    nutrients: "Nutritional values",
    ingredients: "Contents & allergens",
    comment: "Review recipe", 
    share: "Share recipe", 
    share_message: "Check out this recipe!", 
    share_button: "Share recipe", 
    share_not_supported: "Sharing is not supported on this device", 
    no_ingredients: "No ingredients listed yet - coming soon!", 
    no_steps: "No steps listed yet - coming soon!"
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
    linkDescription: "Choose day of delivery:",
    bullet1: "👨‍🍳 Vegetarian meal kit with the chef included.",
    bullet2: "👨‍👩‍👧‍👦 Dinner for the whole family in just 15 minutes.",
    bullet3: "✅ No binding period, cancel whenever you want.",
    type: "Make your selections - without commitment on any:",
    variant: "Choose how often you want to receive your meal kit:",
    urgency: "Few remaining", 
    deliveryDay: "Choose day of delivery:",
    delivery_saturday: "Saturday 3/5",
    delivery_sunday: "Sunday 4/5",
    delivery_monday: "Monday 5/5",
    saturday_description: "at 09-18", 
    sunday_description: "at 10-17", 
    monday_description: "at 16-22",
    stockholm_sunday: "Sunday 4/5",
    stockholm_monday: "Monday 5/5",
    sunday_description_stockholm: "at 10-17",
    monday_description_stockholm: "at 16-22", 
    copenhagen_monday: "Monday 5/5", 
    monday_description_copenhagen: "at 16-22", 
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
    phonenumber_example: "Phone number",
    email: "Mail address",
    email_example: "Mail address",
    password: "Password",
    password_example: "Password",
    step1_button: "Delivery day", 
    back_button: "Back", 
    step2_button: "Delivery info", 
    loading: "Loading...", 
    pay: "Payment", 
    summaryTitle: "Your choices:",
    mealKit: "Meal kit",
    frequency: "Delivery frequency",
    deliveryDaysummary: "Delivery day",
    totalPrice: "Total price",
    discountNote: "Any discount codes are entered in the final step",
    shipping: "+ shipping",
    title_familjekassen: "Family kit",
    title_sambokassen: "Couple kit",
    subtitle_familjekassen: "3 recipes • 3-4 persons",
    subtitle_sambokassen: "3 recipes • 2-3 persons",
    faq: "Questions that may arise:",
    faqItems: [
      {
        question: "Subscription, how does it work?",
        answer: "Our subscriptions have no binding period, meaning you can pause and cancel whenever you like. To pause or cancel your subscription, simply log in to your account or contact us via email, and we'll take care of it. Pauses/cancellations must be submitted to us before Thursday ahead of delivery. This is when we schedule deliveries and need to plan the exact number of meal kits with our chefs.",
      },
      {
        question: "Allergies? What applies?",
        answer: "Unfortunately, we can’t solve all allergies, but please send us an email, and we’ll see if we can arrange a meal kit that suits your specific allergy.",
      },
      {
        question: "I won’t be home at the time of delivery?",
        answer: "Our meal kits are delivered by Gordon Delivery, and you’ll receive an SMS with the estimated delivery time 3-4 days before delivery. If you're not home when the kit is delivered, Gordon can leave it outside your door, and the food will stay fine for 1-2 hours. We always freeze a container to keep the food cold without needing extra materials.",
      },
      {
        question: "Do I need anything extra at home?",
        answer: "You only need some type of cooking oil, a little salt, and pepper, and we’ve added EVERYTHING else! Enjoy the convenience.",
      },
    ], 
  },

  success: {
    title: "Thanks for your order!",
    description:
      "We have now received your order. Delivery information will be sent to your mobile number from our partner Gordon Delivery when they have planned the route.",
    nextStepsDescription: "If you have started a subscription, you now have an active account. You can view details and manage your subscription on your pages.", 
    button: "To my pages",
    contactTitle: "Any questions?", 
    contactDescription: "Don't hesitate to contact us at ", 
    feedbackTitle: "How did you find us?",
    options: {
      friend: "Through a friend",
      socialMedia: "Social media",
      other: "Other"
    },
    placeholderOther: "Please specify how you found us",
    feedbackSubtitle: "We would be so grateful if you could let us know how you found Saveabl :)", 
    submitButton: "Send", 
    thankYouTitle: "Thank you so much!", 
    thankYouDescription: "We are so happy that you wanted to help us. Enjoy your dinners <3"
  },
  auth: {
    title1: "Log in",
    title2: "Sign up",
    description: "Log in to see information about your orders.",
    description2: "Sign up to manage your account.",
    email: "Email",
    email_instructions: "NB! Small letters",
    password: "Password",
    confirm_password: "Confirm password",
    password_no_match: "Passwords do not match",
    account_created: "Your account has been created!",
    button: "Log in",
    forgot_password: "Forgot password/Verify account",
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
    pause_until: "The subscription is paused. The next meal kit will be delivered in week {week} (deliveries on Sat/Sun count as the following week).", 
    pause_indefinite: "The subscription is paused until further notice.",
    not_in_subscription_prefix: "Meal kit week",
    not_in_subscription_suffix: "Not included in your plan",
    add_to_subscription: "Add",
    pause_subscription: "pause my subscription plan",
    cancel_subscription: "cancel my subscription plan",
    contact_us: "Contact us",
    subscription_details: "Subscription details",
    billing_frequency: "Billing frequency",
    delivery_day: "Delivery day",
    active_on: "Active on",
    account_information: "Account information",
    email: "Email",
    name: "Name",
    phone: "Phone",
    deliveryDay: "Delivery day",
    address: "Address",
    manage_account: "Manage account",
    paused_until: "Paused until",
    modalTitle: "Pause your meal kit – note:",
    firstWeekAfterPause: "Select your first delivery week after the pause:",
    modalDescription: [
      "You can pause your meal kit up until the Wednesday before delivery.",
      "Weekend deliveries count toward the following week."
    ],
    resumeSubscriptionButton: "Resume subscription",
    pauseOption1: "Sat/Sun before- or Monday",
    pauseOption2: "Saturday/Sunday before or Monday",
    pauseOption3: "Saturday/Sunday before or Monday",
    weekOption: "week",
    pauseButton: "Pause",
    pauseInfoWithEmail: `Need a longer pause? Contact us at <a href="mailto:hello@saveabl.se?subject=Longer meal kit pause&body=Hi Saveabl,%0D%0A%0D%0AI would like to take a longer break from the meal kit. Could you help me with that?%0D%0A%0D%0AThe first meal kit I’d like to receive after the break is in week: _____%0D%0A%0D%0ABest regards," class="underline text-[#6E2936]">hello@saveabl.se</a> and we’ll help you out!`,
    numberOfMealKits: "Number of meal kits",
    date: "Date",
    intervalOption1: "Weekly",
    intervalOption2: "Bi weekly",
    intervalButton: "Change",
    intervalModalTitle: "Change interval",
    intervalModalDescription: "Changes made before Thursday apply to the upcoming meal kit. After that, they apply to the following meal kit. Note, when changing to every other week, the period starts with a meal kit week.",
    change_delivery_day_button: "Change delivery day",
    dayModalTitle: "Change delivery day",
    days: {
      saturday: "Saturday",
      sunday: "Sunday",
      monday: "Monday",
    },
    dayModalDescription: "Change the delivery day for your upcoming meal kit or choose if the change should apply going forward.",
    beforeThursday: "Changes made before Thursday apply to the upcoming meal kit",
    afterThursday: "Changes made after Thursday apply to the following meal kit",
    acceptanceNote: "To help us plan, we need to approve the change, so it may take a little while before it appears on your account. Thank you for your patience! :)", 
    always_use_this_day: "Use the selected delivery day going forward.", 
    deliveryDayModalPlaceholder: "Change delivery day to",    
    no_connection: "No active subscription",
    no_connection_desc: "We do not support showing one-time purchases yet.",
    questions: "Do you have any questions about the meal kit? Please feel free to contact us!",
    referral_title: "Invite a friend",
    referral_explanation: "Share your personal code with your friends to give and receive a 100kr discount. You automatically get a 100kr discount for each friend you refer!",
    referral_your_code: "Your personal code",
    referral_code_note: "Your code is valid for new customers", 
    referral_copy_button: "Copy code",
    referral_share_button: "Share code", 
    referral_no_code: "No referral code available", 
    change_address_button: "Update info", 
    change_address_modal_title: "Update your details",
    change_address_modal_desc: "Enter your new address and phone number below.",
    street_address: "Street address",
    street_address_placeholder: "Enter street address",
    postal_code: "Postal code",
    postal_code_placeholder: "Enter postal code",
    city: "City",
    city_placeholder: "Enter city",
    phone_modal: "Phone number",
    phone_placeholder: "Enter phone number",
    update_button: "Update",
    address_update_success: "Address and phone number updated successfully!",
    address_update_error: "Something went wrong during the update.",
    success_title: "Now it's fixed!",
    success_description: "It may take a moment before it shows on your page. Give us a shout if you have any questions, we're happy to help at hello@saveabl.se 💌",
    error_title: "Something went wrong!",
    error_description: "Please try again or contact us if the issue persists!", 
    close_button: "Close"
  },
  terms: {
    title: "Terms",
    subtitle: "Subscription", 
    description: "Our subscriptions are completely commitment-free, which means you can pause or cancel whenever you want. To pause or cancel your subscription, simply log in to your account, or alternatively contact us via email and we'll take care of it. Pauses/cancellations need to be communicated to us before Thursday ahead of the delivery. This is because we schedule deliveries on this day, and so we can plan the exact number of meal kits with our chefs.",
    subtitle1: "General terms of Saveabl",
    description1: "When you shop on Saveabl's website, all agreements are made with Foody Impact AB ('Saveabl', 'we', 'our', or 'us'), organization number 559266-3149, with address Övre Kaserngården 12, 415 27 Gothenburg. By making a purchase from us, you accept these general terms and conditions. Only individuals, or representatives of companies, who are over 18 years old and have full legal capacity to enter into agreements may purchase Saveabl's products.",
    subtitle2: "Payment, ordering, and prices",
    description2: "All prices are stated in Swedish kronor and include value added tax (VAT) and fees, unless otherwise stated. On Saveabl's website, the following debit or credit cards can be used for payment: Visa, MasterCard, American Express, Discover & Diners Club, and China UnionPay. In addition, payment via Klarna Bank AB, Sveavägen 46, 111 34 Stockholm ('Klarna') is accepted. If you pay via Klarna, you also accept their terms, which you can find here. After approved payment, an order confirmation is sent to the email address provided by the customer when ordering or when creating the user account. Saveabl is not responsible if the customer has provided the wrong email address.",
    subtitle3: "Delivery",
    description3: "The delivery date is specified on the page where you make your purchase. The delivery is made to the address provided by the customer at registration or purchase. Saveabl is not responsible for keeping customer address information updated, and it is the customer's responsibility to ensure that their address is correct and up to date.",
    subtitle4: "Disclaimer for errors",
    description4: "Saveabl reserves the right to correct any errors on the website, such as incorrect prices, errors in product descriptions, and incorrect stock status of food packages. Saveabl reserves the right to correct any errors. If an incorrect price has been stated on the website, Saveabl reserves the right to correct the price and possibly remove the item from orders. All images presented on the website should be seen as example images and do not guarantee to reflect the exact appearance of the dishes.",
    subtitle5: "Complaints",
    description5: "If you wish to complain about a product due to any discovered faults, you should contact us as soon as possible. However, this must be done no later than within 14 days. You can reach us at ",
    subtitle6: "Force Majeure",
    description6: "If Saveabl, due to any circumstance or circumstances considered beyond our control ('Force Majeure'), is prevented from fulfilling our obligations to our customers, this does not constitute a breach of contract.",
    subtitle7: "Dispute",
    description7: "In the event of a dispute, Saveabl refers to the Swedish National Board for Consumer Disputes ('Allmänna Reklamationsnämnden').",
    subtitle8: "Processing of personal data",
    description8: "Saveabl collects and processes your personal data to create the best possible shopping experience for you as a customer. To read more about our processing of your personal data, see our ",
    subtitle9: "Copyright",
    description9: "All data and software on our website belong to Saveabl and are only available for private use in connection with purchases and correspondence with Saveabl. Other uses such as reproduction, redistribution, modification, processing, or publication of the content on Saveabl's website, both for commercial and private purposes, are not allowed without explicit consent from Saveabl.",
    subtitle10: "Right of withdrawal",
    description10: "According to the Distance Contracts and Contracts Outside Business Premises Act (SFS 2005:59), there is no right of withdrawal for food or other groceries. Therefore, you as a customer do not have a right of withdrawal for purchased goods.",
    },
    integrity_policy: {
      introduction: "Privacy Policy",
      section_1: {
        title: "1. Introduction",
        description: "This privacy policy ('Policy') describes how the brand Saveabl, through the company Foody Impact AB ('We', 'Our' and 'Us') (registration number 559266-3149), located at Övre Kaserngården 12, 415 27 Gothenburg, handles personal data. We value the personal integrity of our customers and are committed to ensuring the safety of all customers and visitors to our website in our handling of personal data. In this policy, we have collected information on how we handle your personal data that you have provided to us in connection with your use of our services, as well as the personal data we have otherwise accessed. We have an obligation to ensure that the processing of your personal data is carried out in accordance with this Policy and applicable data protection legislation."
      },
      section_2: {
        title: "2. How Saveabl handles your personal data",
        description: "Saveabl's handling of your personal data may vary depending on your relationship with us. If you are a visitor to our website without creating a user account, we only save cookies, and potentially any material that has arisen in connection with contact with our customer service.",
        subsection_1: {
          title: "2.1 Where do we collect personal data from?",
          description: "We process personal data provided by you when you create a user account and make purchases through our website saveabl.se. The information we collect in connection with this includes, but is not limited to, name, phone number, address, email address, etc. Furthermore, we process personal data that arises when you use our website to purchase goods, such as purchased items, amounts, purchase dates, and payment methods. We also collect information related to logging into your user account, such as browsing history. Additionally, we store comments made on the website."
        },
        subsection_2: {
          title: "2.2 How long do we keep your personal data?",
          description: "If no specific storage period is stipulated in Swedish legislation, we retain your personal data for a maximum of 3 years from your last purchase, for example, as required by accounting law. In the previously mentioned exceptional cases stipulated by Swedish legislation, your personal data is retained for a maximum of 7 years from your last purchase."
        }
      },
      section_3: {
        title: "3. Your rights",
        description: "You have a number of rights regarding our processing of your personal data. If you have any further questions regarding your rights, please feel free to contact us at hello@saveabl.se.",
        subsection_1: {
          title: "3.1 Right to access",
          description: "We strive to be as transparent as possible in the processing of your personal data. If you want information about or insight into how we handle your personal data, you can request access to the data. Upon request for access, we will ask for additional information to ensure that the data is provided to the right person and which data you want to access. Such a request is easiest made to hello@saveabl.se."
        },
        subsection_2: {
          title: "3.2 Right to rectification",
          description: "You have the right to have any inaccurate personal data about you corrected without undue delay and to have incomplete personal data completed."
        },
        subsection_3: {
          title: "3.3 Right to erasure",
          description: "You have the right to request the erasure of personal data that we process if any of the following occurs: The data is no longer necessary for the purposes for which it was collected or otherwise processed; You withdraw your consent for processing of your personal data which relied on your prior consent and there is no other legal ground for the processing; You object to a balancing of interests that we have made, and there is no overriding legitimate interest on our part; The personal data has been unlawfully processed or must be erased to comply with a legal obligation to which we are subject."
        },
        subsection_4: {
          title: "3.4 Right to restriction",
          description: "You have the right to request that the processing of your personal data be restricted if: You dispute the accuracy of the personal data, for a period enabling us to verify the accuracy of the data; The processing of the personal data is unlawful, and you oppose the erasure of the data and request the restriction of its use instead; We no longer need the personal data for the purposes of the processing, but you require them for the establishment, exercise, or defense of legal claims; You have objected to processing pending the verification of whether our legitimate grounds override yours."
        },
        subsection_5: {
          title: "3.5 Right to object to the processing of personal data for direct marketing",
          description: "You have the right to object to the use of your personal data for direct marketing."
        },
        subsection_6: {
          title: "3.6 Right to data portability",
          description: "If our processing of personal data is automated and based on your consent or the fulfillment of a contract, you have the right to request that the data concerning you and that you have provided to us be transferred to another data controller. The precondition for this is that the processing can be automated and is technically feasible."
        }
      }
    }, 
    blog: {
      title: "Follow the journey!", 
      description: "We're constantly evolving, exploring new horizons, and pushing the boundaries. Step into our world and discover the latest developments in our universe!",
      loadmore: "Load more", 
    },
    newsletter: {
      header_title: "300 000 000 carrots are sorted out after harvest every year?", 
      header_subtitle: "And that’s just in Sweden. At Saveabl, we save food that our master chef prepares almost to completion and offer you fantastic dinners in just 15 minutes. Save time, help the climate, and enjoy chef-prepped meals – it doesn’t have to be harder than that!", 
      additional_button: "To the meal kit",
      new_section_title: "Join the journey!", 
      new_section_subtitle: "We're evolving and trying new things. We're expanding and coming up with exciting ideas. Join the journey and be the first to get news, offers, and recipes!", 
      email: "anna.andersson@example.com",
      name: "Anna",
      country: "SE or DK",
      email_label: "Email",
      name_label: "Name",
      country_label: "Where do you live? (SE/DK)", 
      consent_text: "I want to receive news, offers, etc. sent to me and can unsubscribe anytime.",
      submit: "Come along!",
      error_consent: "Fill me in", 
      error_submit: "You have missed something", 
      thank_you_title: "Welcome!",
      thank_you_message: "You will now stay updated on what's happening in our world! PS. Keep an eye on your inbox, a surprise might land there soon :)",
      consent_error: "Something went wrong!", 
      error_message: "Your email address is already registered with us, feel free to contact us if this is incorrect!"
    },
    popup: {
      title: "Win a meal kit!",
      description: "Every month, we give away a meal kit to one of our email friends. If you've already purchased and win, we'll refund you.",
      placeholder: "Enter your email address",
      country_label: "Where do you live?",
      select_country_error: "Please select Sweden or Denmark.",
      sweden: "Sweden",
      denmark: "Denmark",
      consent_text: "By filling out the form, you sign up for our email list. You can unsubscribe at any time.",
      submit_button: "Join",
      thank_you_message: "Thank you! We will contact the winner via email ✨",
      error_message: "You're already one of our email friends and are therefore entered into the giveaway <3",
    }, 
    footer: {
      questions: "Questions, concerns?", 
      questions2: "Send us an email, and we'll sort it out!", 
      terms: "Terms and Conditions", 
      integrity: "Privacy Policy",
      newsletter: "Stay updated", 
    }, 
    footer_newsletter: {
      title: "Be part of the change",
      placeholder: "Enter your email address",
      description: "By filling out the form, you subscribe to our newsletter. You can unsubscribe at any time.",
      subscribe_button: "Subscribe",
      error_message: "You're already one of our email buddies <3",
      thank_you_message: "Thank you for subscribing!",
      country_label: "Where do you live?",
      select_country_error: "Please select Sweden or Denmark before submitting.",
      sweden: "Sweden",
      denmark: "Denmark"
    },
    referral: {
      header_title: "Invite your friends: earn 100kr!",
      subtitle: "",
      header_subtitle: "Fill in your details below to retrieve and share your personal code. Both you and your friends will then receive a 100kr discount on the meal kit!",
      name_label: "Name",
      name_placeholder: "First and last name",
      email_label: "Email",
      email_placeholder: "Enter your email address",
      submit_button: "Show code",
      code_label: "Your code is",
      thank_you_subtitle: "Thank you for helping us spread the word about Saveabl! Share the code with your friends and earn 100kr for each customer you refer.", 
      copy_button: "Copy code",
      sms_message: "Hi! With my code {referralCode} you'll get a 100kr discount on www.saveabl.com. Enter it at checkout when you place your order :)", 
      not_found: "We couldn't find you as a customer :( Please contact us if this is a mistake!",
      copy_success: "The code has been copied!",
      copy_fail: "Failed to copy the code"
    },
    promotionbanner: {
      promotiontext: "Best Eco-Friendly meal kit - EU Business news"
    }, 
    presentkort: {
      title: "Saveabl Gift Card", 
      description: "What could be a better gift for your loved ones than a stress-free daily life? Nothing, we think!",
      buy_swedish: "Buy now", 
      buy_danish: "Buy now", 
      subheading: "The gift includes:",
      points: [
      "Gift card for one week of meal kits + home delivery",
      "The gift card will be sent to you digitally after your purchase",
      "Price: 699 SEK/629 DKK",
        ],
    },
    stockholmPopup: {
      title: "Launch Offer",
      description:
        "To celebrate our launch in Stockholm, you get 100 SEK off your first four meal kits when you start a subscription.",
      code_note: "Use code STHLM at checkout.",
      save_later: "Save for later?",
      save_description: "Enter your email and we'll send you the code.",
      placeholder: "Your email address",
      send_button: "Send",
      consent_text:
        "By filling out the form, you agree to receive our emails. You can unsubscribe at any time.",
      error_empty: "Please enter your email address.",
      error_generic: "Something went wrong. Please try again.",
      success_message: "Thanks! We've sent you the code 💌",
    },
    
};

const daText = {
  nav: {
    order: "Bestil nu",
    about: "Mission",
    faq: "Almindelige spørgsmål",
    recipe: "Menuer",
    news: "Nyheder",
    giftcard: "Gavekort",
    log_in: "Log ind",
    log_out: "Log ud",
    sign_up: "Tilmeld dig",
    my_account: "Min konto",
  },
  imageDisplay: {
    klimatsmart: "Klimavenlig",
    kockforberedd: "Kokforberedt",
    enkeltgott: "Enkelt & Lækkert",
  },
  page: {
    hero: {
      title: {
        part1: "Gør dine hverdagsmåltider",
        part2: "enkle og bæredygtige",
      },
      subtitle: {
        part1: "Server vegetariske måltider på 15 minutter og giv samtidig",
        part2: "de overskydende grøntsager en ny mening med livet.",
      },
      points: {
        cooking_time: "tilberedningstid",
        delivery: "levering til døren",
        chef_prepared: "kokketilberedt (de sidste 20 klarer du)",
      },
      order_now: "Bestil Saveabl smartkasse!",
    },    
    usp: {
      title: "Hvad indebærer vores måltidskasse?",
      points: [
        {
          "title": "1. Vælg og bestil",
          "text": "Vælg din Saveabl-plan, og beslut, om du vil prøve én gang eller abonnere uden binding og besvær.",
        },
        {
          "title": "2. Du redder, vi leverer",
          "text": "Takket være din bestilling kan vi redde skæve gulerødder og ujævne kartofler. Vores stjernekok Emil forbereder maden, som derefter leveres direkte til din dør.",
        },
        {
          "title": "3. Tilbered og server på 15 min",
          "text": "Giv maden det sidste touch og nyd en sund, klimavenlig middag – hurtigt, nemt og utroligt lækkert.",
        },        
      ],
    },
    call_to_action: {
      title: [
        "Hurtigt. Klimavenligt.",
        "Og forbandet lækkert.",
        "Så hvorfor vælge?"
      ],
      
      meals: "Måltider",
      vegetarian: "Vegetarisk",
      price_per_portion: "Lavere klimaaftryk end gennemsnitsmiddagen",
      cooking_time: "Min tilberedning",
      order_now: "Bestil nu",
    },
    news: {
      title: "Følg med på rejsen - kig ind på vores seneste nyhedsindlæg!",
      text: "Vi udvikler og tester nyt. Vi ekspanderer og finder på nye ting. Her opdaterer vi, hvad der sker i vores verden.",
    },
    reviews: {
      title: "Vores kunder har lige reddet 20 000 middage. Dette siger de om os:",
      text: "Sådan siger nogle af vores miljøhelte til kunder:",
      read_all_reviews: "Læs alle anmeldelser",
      read_more: "Læs mere",
      read_less: "Vis mindre",
    content: [
      {
        id: 1,
        name: "Alexander",
        title: "Saveabl er en win-win-win",
        review: "Saveabl er fantastisk. Den måde, det har gjort hverdagen lettere med to børn, er utrolig. Pludselig har vi tid til at være sammen med børnene, træne eller bare få lidt alenetid om aftenen. Maden er generelt meget velsmagende og værdsat, også af de små. Jeg sætter pris på, at nogle retter kommer tilbage fra tid til anden. Men det bedste er nok at vide, at dette måltidskit bidrager til et bedre miljø. Simpelthen en win-win-win!",
        date: "2024-04-13",
        url: "https://se.trustpilot.com/reviews/661afa5898613cce1ecc71a1",
        rating: 5
      },
      {
        id: 2,
        name: "Niklas",
        title: "Meget velsmagende, men samtidig enkel mad",
        review: "Meget velsmagende, men samtidig enkel mad! I stedet for at få alle ingredienser og skulle lave alt fra bunden er dette den perfekte erstatning for hurtigt at lave en middag midt i hverdagen! Og smagen er heller ikke gået på kompromis, enkel og utrolig lækker!",
        date: "2024-01-31",
        url: "https://se.trustpilot.com/reviews/65cd1846358cb4bb2f35c5a9",
        rating: 5
      },
      {
        id: 3,
        name: "Anneli",
        title: "Absolut det bedste måltidskit, vi har prøvet",
        review: "Absolut det bedste måltidskit, vi har prøvet. Jeg ved ikke, hvordan vi klarede os før! Meget velsmagende og varierede smagsoplevelser, og maden er klar på blot 15 minutter hver aften. Fantastisk i småbørnsårene, hvor maden hurtigt skal serveres. Generøse portioner også – for os som to voksne og et barn holder det ofte til 5-6 måltider.",
        date: "2023-12-18",
        url: "https://se.trustpilot.com/reviews/65804ae9054828d5f4bada17",
        rating: 5
      }
    ]    
  },
  hero_sthlm: {
    launch_offer: "Angiv <strong>STHLM</strong> på saveabl hver eller\nhver anden uge for lanceringsrabat",
  },
  
},
  about_us: {
    title: "Redningsbar, noget der kan reddes",
    description:
      "Hos Saveabl identificerer vi systematisk spild hos producenter og grossister og laver en færdig måltidskasse baseret på det, der skal reddes! Vores måltidskasse findes i det magiske grænseland mellem en traditionel måltidskasse og færdiglavet takeaway. Ud over klimaspørgsmålet tror vi stærkt på bekvemmelighed og har derfor udviklet en måltidskasse, der er klar på 15 minutter. Utroligt smidigt og utroligt lækkert!",
    sections: [
      {
        title: "Hvem vi er",
        text: "Saveabl bestod af tre studerende og en kok, da vi åbnede dørene i november 2021. Den første idé til det, der skulle komme til at blive Saveabl, var opstået sommeren 2020, da Jeroen og Alexander studerede sammen. De forventede sig mindst sagt en hurtigere og smidigere opstart end virkeligheden viste sig at være. I dag består teamet af Jeroen, der styrer skuden, Emil, der hver uge fremkommer med nye kreative opskrifter og har ansvar for det operationelle. Louise sikrer, at vi når ud til de rigtige kunder og kan ekspandere. Hassan har ansvaret for pakningen og sikrer, at vores kunder mødes af en behagelig syn hver uge. Jesper designer og skaber en identitet for Saveabl, og Alexander sørger for, at vi har styr på juraen.",
      },
      {
        title: "Vores måltidskasse",
        text: "Vores måltidskasse bygger på tre værdier: den skal være klimavenlig, super praktisk og ekstremt lækker, altså næsten ufatteligt lækker. Vi er fuldstændig overbeviste om at det er muligt uden at prisen bliver for høj. Hvordan kan vi gøre det, tænker du måske nu? Vi samarbejder med gårde, producenter og grossister og hjælper dem med at redde madvarer der afviger i form, farve, størrelse, er overskud eller resultatet af logistikfejl. Det betyder at den mad du spiser er mad der ellers ville være blevet kasseret, selvom den smager helt perfekt. Mærkeligt, ikke sandt? Men mere om det længere nede! Måltidskassen er super praktisk da alt er klart inden for 15 minutter, for vores kokke forbereder meget for dig og det er også det der gør den ekstremt lækker!",
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
    faq: "Ofte stillede spørgsmål",
faqItems: [
  {
    question: "Abonnement, hvordan fungerer det?",
    answer: "Vore abonnementer er helt uden bindingstid, hvilket betyder, at du kan pause eller afmelde når som helst. For at pause eller afmelde dit abonnement logger du nemt ind på din konto eller kontakter os via e-mail, så ordner vi det. Pauser/afmeldinger skal indsendes til os senest torsdag før levering, da vi booker leveringer den dag og skal planlægge det præcise antal måltidskasser med vores kokke."
  },
  {
    question: "15 minutter, hvordan kan det lade sig gøre?",
    answer: "Vore kokke laver de sværeste og mest tidskrævende trin for dig, så når måltidskassen leveres udenfor din dør, er den ca. 70% færdig. Det betyder, at du kun skal gøre de sidste, sjove trin for at færdiggøre retten! Det handler ofte om at riste noget i ovnen, koge noget op eller varme en sauce. På den måde har du dine kokkeforberedte måltider klar på kun 15 minutter!"
  },
  {
    question: "Redet mad? Hvad betyder det?",
    answer: "Vi samarbejder med gårde, fødevareproducenter og grossister og hjælper dem med at redde gode fødevarer fra at blive smidt ud. Ofte drejer det sig om frugt og grønt, der ikke opfylder butikkernes krav til størrelse, form eller farve. Vi sørger for, at disse fremragende varer ikke går til spilde. I mange tilfælde er maden i vores kasser faktisk friskere end butikkens, da den ofte kommer direkte fra landmanden."
  },
  {
    question: "Er madens bedst før-dato overskredet?",
    answer: "Nej, intet vi sender ud er overskredet bedst før-dato. Al mad i vores måltidskasser skal holde i mindst 7 dage fra den når vores kunder, da vi regner med, at maden spises indenfor en uge."
  },
  {
    question: "Skal jeg have noget ekstra derhjemme?",
    answer: "Du skal kun have en slags madlavningsolie, lidt salt og peber, og så har vi tilføjet ALT andet! Nyd bekvemmeligheden."
  },
  {
    question: "Hvor meget af maden er egentlig reddet?",
    answer: "Du kan finde den præcise andel reddet mad under hver opskrift. Vi sigter efter, at ca. 70% af ingredienserne skal være reddet. Vores mål er at finde den perfekte balance mellem at skabe fantastiske og komplette retter, samtidig med at vi har en positiv indvirkning på klimaet. Et sammendrag lavet i samarbejde med RISE viser, at vores klimaaftryk er fem gange lavere end et gennemsnitligt svensk måltid. Så ja, vi er bestemt på rette vej mod en mere bæredygtig fremtid!"
  },
  {
    question: "Allergier? Hvad gælder?",
    answer: "Desværre kan vi ikke løse alle allergier, men send os gerne en e-mail, så kigger vi nærmere på, om vi kan lave en måltidskasse, der passer til din specifikke allergi."
  },
  {
    question: "Kan jeg vælge retterne selv?",
    answer: "Ikke lige nu, men vi håber at kunne tilbyde det i fremtiden. At give mere valgfrihed gør vores indkøb mindre forudsigelige, og affaldet ender hos os i stedet. Vi prøver at finde den rette balance mellem valgfrihed og bæredygtighed for at tilbyde så meget som muligt uden at gå på kompromis med vores klimaarbejde."
  },
  {
    question: "Jeg kan ikke være hjemme ved levering?",
    answer: "Vore måltidskasser leveres af Gordon Delivery, og du vil modtage en SMS med estimeret leveringstid 3-4 dage før leveringen. Hvis du ikke er hjemme, når kassen leveres, kan Gordon efterlade den udenfor din dør, og maden holder sig god i 1-2 timer. Vi fryser som regel en beholder ned, hvilket hjælper med at holde maden kold uden at bruge ekstra materialer."
  }
],
button: "Jeg forstår - bestil nu!"
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
    sending_comment: "Sender...", 
    next_week_order_until: "Kan bestilles indtil torsdag kl. 16 uge {week}"
  
  },
  recipe_slug: {
    contains: "Indeholder",
    how_to: "Sådan gør du",
    saved_ingredients: "Gemte varer i opskriften",
    nutrients: "Næringsværdier",
    ingredients: "Indhold & allergener",
    comment: "Anmeld opskrift", 
    share: "Del opskrift", 
    share_message: "Tjek denne opskrift ud!", 
    share_button: "Del opskrift", 
    share_not_supported: "Deling understøttes ikke på denne enhed",
    no_ingredients: "Ingen ingredienser listet endnu - kommer snart!",
    no_steps: "Ingen trin listet endnu - kommer snart!"
  },

  order: {
    title: "Vi lancerer i nye byer!",
    title1:
      "Indtast dit postnummer for at se om vi leverer til dig",
    title2: "Du har fået en særlig gave!",
    text: "Nu er det tid til at lancere i Malmö og København, og vi starter med et specielt tilbud til vores første kunder her! Indtast dit postnummer for at få et tilbud.",
    label: "Indtast dit postnummer for et tilbud",
    label1: "Indtast dit postnummer",
    label2: "Indtast dit postnummer for et tilbud",
    button: "Få et tilbud",
    button1: "Hente",
    button2: "Få et tilbud",
    linkTitle: "Vi kan levere til dig!",
    linkDescription: "om mandagen 5/5 mellem 16.00-22.00.",
    bullet1: "👨‍🍳 Vegetarkassen med kokken inkluderet.",
    bullet2: "👨‍👩‍👧 Aftensmad till hele familien på blot 15 min.",
    bullet3: "✅  Ingen bindingsperiode, opsig når du vil.",
    type: "Gør dine valg - uden bindingstid på alle:",
    variant: "Vælg hvor ofte du vil modtage din madkasse:",
    urgency: "Få tilbage", 
    deliveryDay: "Næste tilgængelige leveringsdato:",
    copenhagen_monday: "Mandag 5/5", 
    monday_description_copenhagen: "kl. 16-22", 
    address: "Leveringsinfo:",
    extra: "Ekstra info:",
    contact: "Kontaktoplysninger:",
    terms: "Jeg godkender vilkårene, og at min konto vil blive oprettet.",
    payButton: "Fortsæt",
    full_name: "Fuldt navn",
    name_example: "Fornavn og efternavn",
    delivery_address: "Adresse", 
    city: "By",
    city_example: "København",
    extra_info: "Ekstra info",
    extra_example: "F.eks. etage, adgangskode eller anden information, som kan være nyttig for os at vide.",
    phonenumber: "Telefonnummer",
    phonenumber_example: "Telefonnummer",
    email: "E-mail",
    email_example: "E-mail",
    password: "Adgangskode",
    password_example: "Adgangskode",
    step1_button: "Leveringsdato", 
    back_button: "Tilbage", 
    step2_button: "Levereringsinfo", 
    loading: "Indlæser...", 
    pay: "Til betaling", 
    summaryTitle: "Dine valg:",
    mealKit: "Måltidskasse",
    frequency: "Leveringsfrekvens",
    deliveryDaysummary: "Leveringsdag",
    totalPrice: "Totalpris",
    discountNote: "Eventuelle rabatkoder angives i sidste trin", 
    shipping: "+ fragt",
    title_familjekassen: "Familjekassen",
    title_sambokassen: "Sambokassen",
    subtitle_familjekassen: "3 opskrifter • 3-4 personer",
    subtitle_sambokassen: "3 opskrifter • 2-3 personer",
    faq: "Spørgsmål der kan opstå:",
    faqItems: [
      {
        question: "Abonnement, hvordan fungerer det?",
        answer: "Vores abonnementer er helt uden bindingsperiode, hvilket betyder, at du kan sætte det på pause eller annullere, når du vil. For at sætte eller annullere dit abonnement, skal du blot logge ind på din konto eller kontakte os via e-mail, så ordner vi det. Pauser/afmeldinger skal sendes til os inden torsdag før leveringen. Det er på denne dag, vi planlægger leverancerne, og vi skal kunne planlægge det præcise antal måltidskasser med vores kokke.",
      },
      {
        question: "Allergier? Hvad gælder?",
        answer: "Desværre kan vi ikke løse alle allergier, men send os gerne en e-mail, så vi kan se, om vi kan arrangere en måltidskasse, der passer til din allergi.",
      },
      {
        question: "Jeg kan ikke være hjemme ved levering?",
        answer: "Vores måltidskasser leveres af Gordon Delivery, og du får en sms med den estimerede leveringstid 3-4 dage før leveringen. Hvis du ikke er hjemme, når kassen leveres, kan Gordon efterlade den udenfor din dør, og maden vil holde sig fint i 1-2 timer. Vi fryser altid en beholder ned og bruger det til at holde maden kold uden at skulle bruge ekstra materialer.",
      },
      {
        question: "Behøver jeg noget ekstra derhjemme?",
        answer: "Du behøver kun at have en form for madlavningsolie, lidt salt og peber, og så har vi tilføjet ALT andet! Nyd bekvemmeligheden.",
      },
    ],    
  },

  success: {
    title: "Tak for din bestilling!",
    description:
      "Vi har nu modtaget din bestilling. Leveringsinformation sendes til dit mobilnummer fra vores partner Gordon Delivery, når de har planlagt ruten.",
    nextStepsDescription: "Har du startet et abonnement, har du nu en aktiv konto. Du kan se detaljer og administrere dit abonnement på dine sider.", 
    button: "Til mine sider",
    contactTitle: "Nogle spørgsmål?", 
    contactDescription: "Tøv ikke med at kontakte os på ", 
    feedbackTitle: "Hvordan fandt du os?",
    feedbackSubtitle: "Vi ville være meget taknemmelige hvis du vil angive hvordan du fandt til Saveabl :)", 
    options: {
      friend: "Gennem en ven",
      socialMedia: "Sociale medier",
      other: "Andet"
    },
    placeholderOther: "Angiv hvordan du fandt os",
    submitButton: "Send", 
    thankYouTitle: "Stort tak!", 
    thankYouDescription: "Vi er så glade for at du ville hjælpe os. Nyd middagerne <3"
  },
  auth: {
    title1: "Log ind",
    title2: "Tilmeld dig",
    description: "Log ind for at se oplysninger om dine ordrer.",
    description2: "Tilmeld dig for at administrere din konto.",
    email: "Email",
    email_instructions: "BEMÆRK! Små bogstaver", 
    password: "Adgangskode",
    confirm_password: "Bekræft adgangskode",
    password_no_match: "Adgangskoderne stemmer ikke overens",
    account_created: "Din konto er oprettet!",
    button: "Log ind",
    forgot_password: "Glemt adgangskode/Bekræft konto",
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
    delivery_day: "Leveringsdag",
    weekly: "Hver uge",
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
    pause_until: "Abonnementet er sat på pause. Den næste måltidskasse leveres i uge {week} (leveringer lørdag/søndag tæller som følgende uge).", 
    pause_indefinite: "Abonnementet er sat på pause indtil videre.",
    modalTitle: "Pause måltidskassen – husk:",
    firstWeekAfterPause: "Vælg din første leveringsuge efter pausen:",
    modalDescription: [
      "Du kan sætte måltidskassen på pause indtil onsdag ugen før levering.",
      "Leveringer i weekenden tæller med i ugen efter."
    ],     
    resumeSubscriptionButton: "Genoptag abonnement",
    pauseOption1: "Mandag",
    pauseOption2: "Mandag",
    pauseOption3: "Mandag",
    weekOption: "uge",
    pauseButton: "Pause",
    pauseInfoWithEmail: `Har du brug for en længere pause? Kontakt os på <a href="mailto:hello@saveabl.se?subject=Længere pause fra måltidskasse&body=Hej Saveabl,%0D%0A%0D%0AJeg vil gerne holde en længere pause fra måltidskassen. Kan I hjælpe mig med det?%0D%0A%0D%0AFørste måltidskasse jeg ønsker at modtage efter pausen er i uge: _____%0D%0A%0D%0AMed venlig hilsen," class="underline text-[#6E2936]">hello@saveabl.se</a>, så hjælper vi dig!`,
    numberOfMealKits: "Antal",
    date: "Dato",
    intervalOption1: "Hver uge",
    intervalOption2: "Hver anden uge",
    intervalButton: "Skift",
    intervalModalTitle: "Skift interval",
    intervalModalDescription: "Ændringer foretaget inden torsdag gælder for den kommende måltidskasse. Herefter gælder det for den næstkommende måltidskasse. Bemærk, når du skifter til hver anden uge, starter perioden med en måltidskasseuge.",
    change_delivery_day_button: "Skift leveringsdag",
    dayModalTitle: "Skift leveringsdag",
    dayModalDescription: "Skift leveringsdag for din kommende måltidskasse, eller vælg om ændringen skal gælde fremover.",
    beforeThursday: "Ændringer foretaget før torsdag gælder for den kommende måltidskasse",
    afterThursday: "Ændringer foretaget efter torsdag gælder for den følgende måltidskasse",
    acceptanceNote: "For at vi kan planlægge, skal vi godkende ændringen, så det kan tage lidt tid, før den vises på din konto. Tak for din tålmodighed! :)", 
    always_use_this_day: "Brug den valgte leveringsdag fremadrettet.", 
    deliveryDayModalPlaceholder: "Skift leveringsdag til",

    days: {
      saturday: "Lørdag",
      sunday: "Søndag",
      monday: "Mandag",
    },
    no_connection: "Ingen aktiv abonnement",
    no_connection_desc: "Vi understøtter desværre ikke visning af engangskøb endnu.",
    sign_out_button: "Log ud",
    contact_button: "Kontakt os",
    questions: "Har du nogen spørgsmål om vores måltidskasse? Kontakt os gerne!", 
    referral_title: "Tip en ven",
    referral_explanation: "Del din personlige kode med dine venner for at give og få 100 kr rabat. Du får automatisk 100 kr rabat for hver ven du henviser!",
    referral_your_code: "Din personlige kode",
    referral_code_note: "Din kode er gyldig for nye kunder", 
    referral_copy_button: "Kopier kode",
    referral_share_button: "Del kode", 
    referral_no_code: "Ingen henvisningskode tilgængelig", 
    change_address_button: "Opdater info", 
    change_address_modal_title: "Opdater dine oplysninger",
    change_address_modal_desc: "Indtast din nye adresse og telefonnummer nedenfor.",
    street_address: "Gadeadresse",
    street_address_placeholder: "Indtast gadeadresse",
    postal_code: "Postnummer",
    postal_code_placeholder: "Indtast postnummer",
    city: "By",
    city_placeholder: "Indtast by",
    phone_modal: "Telefonnummer",
    phone_placeholder: "Indtast telefonnummer",
    update_button: "Opdater",
    address_update_success: "Adresse og telefonnummer blev opdateret!",
    address_update_error: "Noget gik galt ved opdateringen.",
    success_title: "Nu er det fikset!",
    success_description: "Det kan tage et øjeblik, før det vises på din side. Kontakt os, hvis du har spørgsmål, vi hjælper dig gerne på hello@saveabl.se 💌",
    error_title: "Noget gik galt!",
    error_description: "Prøv igen, eller kontakt os, hvis problemet fortsætter!", 
    close_button: "Luk"
  },
  
  terms: {
    title: "Betingelser",
    subtitle: "Abonnement", 
    description: "Vores abonnementer er helt uden forpligtelser, hvilket betyder, at du kan sætte på pause eller annullere, når du ønsker det. For at sætte på pause eller annullere dit abonnement, skal du blot logge ind på din konto, eller alternativt kontakte os via e-mail, og vi sørger for det. Pauser/annulleringer skal kommunikeres til os inden torsdag inden leveringen. Dette skyldes, at vi planlægger leverancer på denne dag, og så vi kan planlægge det præcise antal måltidskasser med vores kokke.",
    subtitle1: "Generelle betingelser for Saveabl",
    description1: "Når du handler på Saveabls hjemmeside, indgås alle aftaler med Foody Impact AB ('Saveabl', 'vi', 'vores' eller 'os'), organisationsnummer 559266-3149, med adresse Övre Kaserngården 12, 415 27 Göteborg. Ved at foretage et køb hos os, accepterer du disse generelle betingelser og vilkår. Kun enkeltpersoner eller repræsentanter for virksomheder, der er over 18 år og har fuld juridisk kapacitet til at indgå aftaler, må købe Saveabls produkter.",
    subtitle2: "Betaling, bestilling og priser",
    description2: "Alle priser er angivet i svenske kroner og inkluderer moms og gebyrer, medmindre andet er angivet. På Saveabls hjemmeside kan følgende debet- eller kreditkort bruges til betaling: Visa, MasterCard, American Express, Discover & Diners Club og China UnionPay. Derudover accepteres betaling via Klarna Bank AB, Sveavägen 46, 111 34 Stockholm ('Klarna'). Hvis du betaler via Klarna, accepterer du også deres vilkår, som du kan finde her. Efter godkendt betaling sendes en ordrebekræftelse til den e-mailadresse, kunden har angivet ved bestillingen eller ved oprettelsen af brugerkontoen. Saveabl påtager sig intet ansvar, hvis kunden har angivet en forkert e-mailadresse.",
    subtitle3: "Levering",
    description3: "Leveringsdatoen er angivet på siden, hvor du foretager dit køb. Leveringen sker til den adresse, kunden har angivet ved registrering eller køb. Saveabl påtager sig intet ansvar for at holde kundeoplysninger opdateret, og det er kundens ansvar at sikre, at deres adresse er korrekt og ajourført.",
    subtitle4: "Ansvarsfraskrivelse for fejl",
    description4: "Saveabl forbeholder sig ret til at rette eventuelle fejl på hjemmesiden, såsom forkerte priser, fejl i produktbeskrivelser og forkert lagerstatus af madpakker. Saveabl forbeholder sig ret til at rette eventuelle fejl. Hvis en forkert pris er angivet på hjemmesiden, forbeholder Saveabl sig ret til at rette prisen og eventuelt fjerne varen fra ordrer. Alle billeder, der præsenteres på hjemmesiden, skal betragtes som eksempelbilleder og garanterer ikke at afspejle retternes nøjagtige udseende.",
    subtitle5: "Klager",
    description5: "Hvis du ønsker at klage over et produkt på grund af opdagede fejl, skal du kontakte os så hurtigt som muligt. Dette skal dog gøres senest inden for 14 dage. Du kan kontakte os på ",
    subtitle6: "Force Majeure",
    description6: "Hvis Saveabl på grund af omstændigheder, der anses for at ligge uden for vores kontrol ('Force Majeure'), forhindres i at opfylde vores forpligtelser over for vores kunder, udgør dette ikke et kontraktbrud.",
    subtitle7: "Tvist",
    description7: "I tilfælde af tvist henviser Saveabl til den svenske Nationale Forbrugerklagenævn ('Allmänna Reklamationsnämnden').",
    subtitle8: "Behandling af personoplysninger",
    description8: "Saveabl indsamler og behandler dine personoplysninger for at skabe den bedst mulige købsoplevelse for dig som kunde. Hvis du vil vide mere om vores behandling af dine personoplysninger, kan du se vores ",
    subtitle9: "Ophavsret",
    description9: "Alle data og software på vores hjemmeside tilhører Saveabl og er kun tilgængelige til privat brug i forbindelse med køb og korrespondance med Saveabl. Anden brug såsom reproduktion, redistribution, ændring, bearbejdning eller offentliggørelse af indholdet på Saveabls hjemmeside, både til kommercielle og private formål, er ikke tilladt uden udtrykkelig tilladelse fra Saveabl.",
    subtitle10: "Fortrydelsesret",
    description10: "Ifølge loven om fjernkontrakter og kontrakter uden for forretningslokaler (SFS 2005:59) gælder der ikke fortrydelsesret for mad eller andre dagligvarer. Derfor har du som kunde ikke fortrydelsesret for købte varer.",
    },
  
integrity_policy: {
  introduction: "Integritetspolitik",
  section_1: {
  title: "1. Introduktion",
  description: "Denne integritetspolitik ('Politik') beskriver, hvordan brandet Saveabl, gennem virksomheden Foody Impact AB ('Vi', 'Vores' og 'Os') (registreringsnummer 559266-3149), beliggende på Övre Kaserngården 12, 415 27 Göteborg, håndterer personoplysninger. Vi værdsætter vores kunders personlige integritet og er forpligtede til at sikre sikkerheden for alle kunder og besøgende på vores hjemmeside i vores håndtering af personoplysninger. I denne politik har vi samlet information om, hvordan vi behandler dine personoplysninger, som du har givet os i forbindelse med din brug af vores tjenester, samt de personoplysninger, vi på anden vis har adgang til. Vi har en forpligtelse til at sikre, at behandlingen af dine personoplysninger udføres i overensstemmelse med denne politik og gældende databeskyttelseslovgivning."
  },
  section_2: {
  title: "2. Hvordan Saveabl håndterer dine personoplysninger",
  description: "Saveabls behandling af dine personoplysninger kan variere afhængigt af din relation til os. Hvis du er en besøgende på vores hjemmeside uden at oprette en brugerkonto, gemmer vi kun cookies og eventuelt materiale, der er opstået i forbindelse med kontakt til vores kundeservice.",
  subsection_1: {
  title: "2.1 Hvor indsamler vi personoplysninger fra?",
  description: "Vi behandler personoplysninger, som du giver os, når du opretter en brugerkonto og foretager køb gennem vores hjemmeside saveabl.se. Oplysninger, vi indsamler i forbindelse med dette, inkluderer, men er ikke begrænset til, navn, telefonnummer, adresse, e-mailadresse osv. Derudover behandler vi personoplysninger, der opstår, når du bruger vores hjemmeside til at købe varer, såsom købte varer, beløb, købsdatoer og betalingsmetoder. Vi indsamler også oplysninger i forbindelse med login på din brugerkonto, såsom gennemsehistorik. Derudover gemmer vi kommentarer, der er foretaget på hjemmesiden."
  },
  subsection_2: {
  title: "2.2 Hvor længe opbevarer vi dine personoplysninger?",
  description: "Hvis der ikke er fastsat en specifik opbevaringsperiode i svensk lovgivning, opbevarer vi dine personoplysninger i højst 3 år fra dit seneste køb, f.eks. som krævet af regnskabsloven. I de tidligere nævnte undtagelsestilfælde fastsat af svensk lovgivning opbevares dine personoplysninger i højst 7 år fra dit seneste køb."
  }
  },
  section_3: {
  title: "3. Dine rettigheder",
  description: "Du har en række rettigheder vedrørende vores behandling af dine personoplysninger. Hvis du har yderligere spørgsmål vedrørende dine rettigheder, er du velkommen til at kontakte os på hello@saveabl.se.",
  subsection_1: {
  title: "3.1 Rettighed til adgang",
  description: "Vi stræber efter at være så gennemsigtige som muligt i behandlingen af dine personoplysninger. Hvis du ønsker oplysninger om eller indsigt i, hvordan vi behandler dine personoplysninger, kan du anmode om adgang til dataene. Ved anmodning om adgang vil vi bede om yderligere oplysninger for at sikre, at dataene gives til den rette person, og hvilke data du ønsker adgang til. En sådan anmodning er nemmest at foretage til hello@saveabl.se."
  },
  subsection_2: {
  title: "3.2 Rettighed til rettelse",
  description: "Du har ret til at få eventuelle unøjagtige personoplysninger om dig rettet uden unødig forsinkelse og til at få ufuldstændige personoplysninger udfyldt."
  },
  subsection_3: {
  title: "3.3 Rettighed til sletning",
  description: "Du har ret til at anmode om sletning af personoplysninger, som vi behandler, hvis en af følgende situationer opstår: Dataene er ikke længere nødvendige til de formål, de blev indsamlet til, eller på anden måde behandlet; Du tilbagekalder dit samtykke til behandling af dine personoplysninger, som støttede sig på dit tidligere samtykke, og der ikke er andre juridiske grundlag for behandlingen; Du gør indsigelse mod en afvejning af interesser, som vi har foretaget, og der ikke er overvejende legitime grunde til vores behandling; De personoplysninger er blevet behandlet ulovligt, eller de skal slettes for at overholde en retlig forpligtelse, som vi er underlagt."
  },
  subsection_4: {
  title: "3.4 Rettighed til begrænsning",
  description: "Du har ret til at anmode om, at behandlingen af dine personoplysninger begrænses, hvis: Du bestrider personoplysningernes nøjagtighed i en periode, der giver os mulighed for at kontrollere nøjagtigheden af dataene; Behandlingen af personoplysningerne er ulovlig, og du modsætter dig sletningen af dataene og i stedet anmoder om begrænsning af deres brug; Vi ikke længere har brug for personoplysningerne til behandlingsformål, men du har brug for dem til etablering, udøvelse eller forsvar af juridiske krav; Du har gjort indsigelse mod behandling i afventning af verifikation af, om vores legitime grunde overstiger dine."
  },
  subsection_5: {
  title: "3.5 Rettighed til at gøre indsigelse mod behandling af personoplysninger til direkte markedsføring",
  description: "Du har ret til at gøre indsigelse mod brugen af dine personoplysninger til direkte markedsføring."
  },
  subsection_6: {
  title: "3.6 Rettighed til databærbarhed",
  description: "Hvis vores behandling af personoplysninger er automatiseret og baseret på dit samtykke eller opfyldelse af en kontrakt, har du ret til at anmode om, at dataene vedrørende dig og de oplysninger, du har givet os, overføres til en anden dataansvarlig. Forudsætningen for dette er, at behandlingen kan automatiseres og er teknisk mulig."
  }
  }
  }, 
  blog: {
    title: "Følg med på rejsen!", 
    description: "Vi udvikler og tester nyt. Vi ekspanderer og finder på nye ting. Her opdaterer vi, hvad der sker i vores verden!",
    loadmore: "Indlæs flere", 
  },
  newsletter: {
    header_title: "300 000 000 gulerødder sorteres fra efter høst hvert år?", 
    header_subtitle: "Og det er kun i Sverige. Hos Saveabl redder vi mad, som vores mesterkok næsten har færdiggjort, og vi tilbyder dig fantastiske middage på bare 15 minutter. Spar tid, hjælp klimaet, og nyd kokkeforberedte måltider – det behøver ikke være sværere end det!", 
    additional_button: "Til måltidskassen",
    new_section_title: "Tag med på rejsen!", 
    new_section_subtitle: "Vi udvikler os og prøver nye ting. Vi ekspanderer og finder på spændende idéer. Tag med på rejsen og få nyheder, tilbud og opskrifter først af alle!", 
    email: "anna.andersson@eksempel.com",
    name: "Anna",
    country: "SE eller DK",
    email_label: "Email",
    name_label: "Navn",
    country_label: "Hvor bor du? (SE/DK)", 
    consent_text: "Jeg vil modtage nyheder, tilbud osv. og kan afmelde når som helst.",
    submit: "Hæng med!",
    error_consent: "Udfyld mig", 
    error_submit: "Du har glemt noget", 
    thank_you_title: "Velkommen!",
    thank_you_message: "Du vil nu blive opdateret om hvad der sker i vores verden! PS. Hold øje med din indbakke, der kan dukke en overraskelse op snart :)",
    consent_error: "Noget gik galt!", 
    error_message: "Din e-mailadresse er allerede registreret hos os, kontakt os gerne hvis dette ikke skulle stemme!"
  },
  popup: {
    title: "Vind en måltidskasse!",
    description: "Hver måned udlodder vi en måltidskasse til en af vores e-mailvenner. Hvis du allerede har købt og vinder, refunderer vi dig.",
    placeholder: "Indtast din e-mailadresse",
    country_label: "Hvor bor du?",
    select_country_error: "Vælg venligst Sverige eller Danmark.",
    sweden: "Sverige",
    denmark: "Danmark",
    consent_text: "Ved at udfylde formularen tilmelder du dig vores nyhedsbrev. Du kan afmelde dig når som helst.",
    submit_button: "Deltag",
    thank_you_message: "Tak! Vi kontakter vinderen via mail ✨",
    error_message: "Du er allerede en af vores mailvenner og er derfor med i konkurrencen <3",
  },  
  footer: {
    questions: "Spørgsmål, overvejelser?", 
    questions2: "Send os en mail så finder vi en løsning!", 
    terms: "Generelle vilkår", 
    integrity: "Integritetspolitik",
    newsletter: "Hold dig opdateret", 
  }, 
  footer_newsletter: {
    title: "Bliv en del af forandringen",
    placeholder: "Indtast din mailadresse",
    description: "Ved at udfylde formularen tilmelder du dig vores nyhedsbrev. Du kan til enhver tid afmelde dig.",
    subscribe_button: "Tilmeld",
    error_message: "Du er allerede en af vores mailvenner <3",
    thank_you_message: "Tak for din tilmelding!",
    country_label: "Hvor bor du?",
    select_country_error: "Vælg venligst Sverige eller Danmark, før du sender.",
    sweden: "Sverige",
    denmark: "Danmark"
  },
  referral: {
    header_title: "Invitér dine venner: tjen 100 kr!",
    subtitle: "",
    header_subtitle: "Udfyld dine oplysninger nedenfor for at hente og dele din personlige kode. Både du og dine venner får derefter 100 kr rabat på madkassen!",
    name_label: "Navn",
    name_placeholder: "Fornavn og efternavn",
    email_label: "E-mail",
    email_placeholder: "Indtast din e-mailadresse",
    submit_button: "Vis kode",
    code_label: "Din kode er",
    thank_you_subtitle: "Tak for at du hjælper os med at sprede budskabet om Saveabl! Del koden med dine venner og tjen 100 kr pr. kunde, du rekrutterer.", 
    copy_button: "Kopiér kode",
    sms_message: "Hej! Med min kode {referralCode} får du 100kr rabat på wwww.saveabl.com. Indtast den ved checkout, når du laver din bestilling :)",
    not_found: "Vi kunne ikke finde dig som kunde :( Kontakt os gerne, hvis vi tager fejl!",
    copy_success: "Koden er kopieret!",
    copy_fail: "Kunne ikke kopiere koden"
  }, 
  promotionbanner: {
    promotiontext: "Bedste miljøvenlige måltidskasse - EU Business news"
  }, 
  presentkort: {
  title: "Saveabl Gavekort",
  description: "Hvad kan være en bedre gave til dine kære end en stressfri hverdag? Intet, synes vi!",
  buy: "Køb nu",
  subheading: "Julegaven indeholder:",
  points: [
"Gavekort til en uges måltidskasse + hjemlevering",
"Vi sender gavekortet digitalt efter dit køb",
"Pris: 629 DKK",
]
  }, 
  stockholmPopup: {
    title: "Lanceringstilbud",
    description:
      "For at fejre vores lancering i Stockholm får du 100 SEK rabat på dine første fire måltidskasser, når du starter et abonnement.",
    code_note: "Brug koden STHLM i kassen.",
    save_later: "Gem til senere?",
    save_description: "Indtast din e-mail, så sender vi dig koden.",
    placeholder: "Din e-mailadresse",
    send_button: "Send",
    consent_text:
      "Ved at udfylde formularen tilmelder du dig vores nyhedsbrev. Du kan til enhver tid afmelde dig.",
    error_empty: "Udfyld din e-mailadresse.",
    error_generic: "Noget gik galt. Prøv igen.",
    success_message: "Tak! Vi har sendt koden til dig 💌",
  },
  
};
