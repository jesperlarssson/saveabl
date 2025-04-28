export const tempRecipes = {
  data: {
    recepts: [

      {
        id: "week19-recipe1",
        weekNr: 19,
        recipeNumber: 1,
        startDate: "2025-05-05", // måndagen i vecka 17
        chef: {
          name: "Anton Mällroth",
          image: "/images/anton_kock.webp"
        },
        title:
          "Oregano-scented mushroom pasta with crispy zucchini.",
        slug: "oregano-scented-mushroom-pasta-crispy-zucchini",
        image: {
          url: "/images/week19-recipe1.jpg", // ← byt till rätt lokal bildsökväg
        },
        ingredients: [
         "1 pack of mushroom sauce",
         "1 pack of spaghetti", 
         "1 zucchini"
      ],
        steg: [
         "Take out a frying pan for the zucchini, a saucepan for the sauce, and a pot for the pasta.",
         "Dice or slice the zucchini and fry it in cooking fat until golden brown. Season with salt and pepper.", 
         "Heat the sauce and dilute to the desired consistency, then taste and adjust. Cook the pasta in salted water until done (about 7-8 minutes)."
        ],
        contentAllergies: [
          "Crème fraîche, cream, mushroom, garlic, onion, spring onion, zucchini, rapeseed oil, durum wheat flour, carrot, leek, celery, fennel, thyme, lovage, black pepper, bay leaf, salt, parsnip, parsley root, tomato, salt, sugar, flavorings, modified starch, vinegar, parsley extract."
        ],
        savedIngredients: "Mushrooms, onion, garlic.", 
        nutritionalValues: "Calculated per portion. 694 kcal, 20g protein, 73g carbohydrates, 34g fat.",
        freezabl: null,
        createdAt: "2025-04-28T12:00:00Z",
        localizations: [
          {
            title: "Oreganodoftande svamppasta med krispig zucchini.",
            ingredients: [
              "1 förpackning svampsås",
              "1 förpackning spaghetti", 
              "1 zucchini"
          ],
            steg: [
              "Ta fram en stekpanna till zucchinin, en kastrull till såsen och en gryta till pastan.", 
              "Tärna eller skiva zucchinin och stek i matfett till gyllenbrun. Krydda med salt och peppar. ", 
              "Värm såsen och späd till önskad konsistens, smaka av. Koka pastan i saltat vatten till klar (ca 7-8 minuter)"
          
          ],
            contentAllergies: [
              "Créme fraiche, grädde, champinjon, VITLÖK, LÖK, salladslök, zucchini, rapsolja, durumvetemjöl, morot, purjolök, SELLERI, fänkål, timjan, libbsticka, svartpeppar, lagerblad, salt, palsternacka, persiljerot, tomat, salt, socker, aromer, modifierad stärkelse, vinäger, persiljeextrakt.              "
            ],
            savedIngredients: "Champinjoner, lök, vitlök.",
            nutritionalValues: "Räknat per portion. Kcal 694. Protein 20g. Kolhydrater 73g. Fett 34g.",
            image: {
              url: "/images/week19-recipe1.jpeg", // ← byt till rätt lokal bildsökväg
            },
            id: "week19-recipe1-sv",
            createdAt: "2025-04-28T12:00:00Z",
            freezabl: null,
            recipeNumber: 1,
            slug: "oreganodoftande-svamppasta-krispig-zucchini"
          },
          {
            title: "Oreganoduftende svampepasta med sprød zucchini.",
            ingredients: [
              "1 pakke svampesauce", 
              "1 pakke spaghetti", 
              "zucchini"
          
          ],
            steg: [
             "Tag en stegepande til zucchini, en kasserolle til saucen og en gryde til pastaen.", 
             "Tern eller skær zucchini i skiver, og steg den i fedtstof, indtil den er gyldenbrun. Krydr med salt og peber.", 
             "Varm saucen op og spæd til ønsket konsistens, smag til. Kog pastaen i saltet vand, indtil den er klar (ca. 7-8 minutter)."
          ],
            contentAllergies: [
              "Crème fraiche, fløde, champignon, hvidløg, løg, forårsløg, zucchini, rapsolie, durumhvedemel, gulerod, porre, selleri, fennikel, timian, løvstikke, sort peber, laurbærblad, salt, pastinak, persillerod, tomat, salt, sukker, aromaer, modificeret stivelse, eddike, persilleekstrakt."
            ],
            savedIngredients: "Champignoner, løg, hvidløg.",
            nutritionalValues: "Beregnede per portion. 694 kcal, 20g protein, 73g kulhydrater, 34g fedt.",
            image: {
              url: "/images/week19-recipe1.jpeg", // ← byt till rätt lokal bildsökväg
            },
            id: "week19-recipe1-da",
            createdAt: "2025-04-28T12:00:00Z",
            freezabl: null,
            recipeNumber: 1,
            slug: "oreganoduftende-svampepasta-sproed-zucchini"
          }
        ]
      }, 
      {
        id: "week19-recipe2",
        weekNr: 19,
        recipeNumber: 2,
        startDate: "2025-05-05",
        chef: {
          name: "Anton Mällroth",
          image: "/images/anton_kock.webp" 
        },
        title:
          "Spicy chili sin carne served with rice, tortilla chips, and cooling sour cream.",
        slug: "spicy-chili-sin-carne-rice-tortilla-chips-sour-cream",
        image: {
          url: "/images/week19-recipe2.jpg", // ← byt till rätt lokal bildsökväg
        },
        ingredients: [
         "1 package of chili sin carne", 
         "1 package of rice", 
         "1 package of sour cream", 
         "1 package of tortilla chips"
        ],
        steg: [
          "Take out a pot and a frying pan. Pour the chili sin carne into the pot and the rice into the frying pan. Dilute the chili with a bit of water to reach the desired consistency. Add half a deciliter of water and a tablespoon of fat to the frying pan. Heat both on medium heat while stirring until everything is warmed through.", 
          "Serve the chili sin carne with rice, a dollop of sour cream, and crispy tortilla chips.", 
      ],
        contentAllergies: ["Soy mince, tomato, ONION, GARLIC, kidney beans, white beans, parsley, SOY, sour cream. Vegetable broth: (onion, carrot, leek, CELERY, fennel), thyme, lovage, black pepper, bay leaf, salt), rehydrated vegetable powder 18.5% (onion, parsnip, parsley root, leek, mushroom, carrot, tomato, garlic), salt, sugar, flavorings, modified starch, vinegar, parsley extract, stabilizer (xanthan gum). Chips: Corn 74%, sunflower oil, cheese seasoning 4.8% (salt, grape sugar, LACTOSE [MILK], CHEESE POWDER [MILK], natural flavoring [MILK], BUTTER OIL [MILK], seasoning, MALTODEXTRIN, MILK PROTEIN)."
          ],
        savedIngredients: "Chili, bell pepper & onion.",
        nutritionalValues:
          "Calculated per portion. 636 kcal, 38g protein, 82g carbohydrates, 14g fat.",
        freezabl: null,
        createdAt: "2025-04-28T12:00:00Z",
        localizations: [
          {
            title:
              "Kryddig chili sin carne serverad med ris, tortillachips & svalkande gräddfil.",
            ingredients: [
            "1 förpackning chili sin carne", 
            "1 förpackning ris", 
            "1 förpackning gräddfil", 
            "1 förpackning tortillachips"
          
          ],
            steg: [
             "Ta fram en gryta och en stekpanna. Häll chilin sin carne i grytan och riset i stekpannan. Späd chilin med lite vatten till önskad konsistens. Tillsätt en halv deciliter vatten och en matsked matfett i stekpannan. Värm båda på medelvärme under omrörning tills allt är genomvarmt.",
             "Servera chili sin carne tillsammans med ris, en klick gräddfil och krispiga tortillachips.", 
            
          ],
            contentAllergies: ["SOJAfärs, tomat, LÖK, VITLÖK, kidneybönor, vita bönor, persilja, SOJA, gräddfil. Grönsaksbuljong: (lök, morot, purjolök, SELLERI, fänkål), timjan, libbsticka, svartpeppar, lagerblad, salt), rehydrerat grönsakspulver 18,5% (lök, palsternacka, persiljerot, purjolök, champinjon, morot, tomat, vitlök), salt, socker, aromer, modifierad stärkelse, vinäger, persiljeextrakt, stabiliseringsmedel (xantangummi). Chips: Majs 74%, solrosolja, ostkrydda 4,8% (salt, druvsocker, LAKTOS [MJÖLK], OSTPULVER [MJÖLK], naturlig arom [MJÖLK], SMÖROLJA [MJÖLK], krydda, MALTODEXTRIN, MJÖLKPROTEIN).          "
              ],
            savedIngredients: "Chili, paprika & lök.",
            nutritionalValues:
          "Räknat per portion. Kcal 636. Protein 38g. Kolhydrater 82g. Fett 14g.",
            image: {
              url: "/images/week19-recipe2.jpg",
            },
            id: "week19-recipe2-sv",
            createdAt: "2025-04-28T12:00:00Z",
            freezabl: null,
            recipeNumber: 2,
            slug: "kryddig-chili-sin-carne-ris-tortillachips-gradfil",
          },
          {
            title:
              "Krydret chili sin carne serveret med ris, tortillachips og kølende creme fraiche.",
            ingredients: [
            "1 pakke chili sin carne", 
            "1 pakke ris", 
            "1 pakke creme fraiche", 
            "1 pakke tortillachips"
          ],
            steg: [
              "Find en gryde og en stegepande frem. Hæld chili sin carne i gryden og risene i stegepanden. Spæd chilien med lidt vand, indtil den ønskede konsistens opnås. Tilsæt en halv deciliter vand og en spiseskefuld fedtstof i stegepanden. Opvarm begge dele ved middel varme under omrøring, indtil alt er gennemvarmt.", 
              "Server chili sin carne med ris, en skefuld rømme og sprøde tortillachips."
          ],
            contentAllergies: ["SOJAfars, tomat, LØG, HVIDLØG, kidneybønner, hvide bønner, persille, SOJA, creme fraiche. Grøntsagsbouillon: (løg, gulerod, porre, SELLERI, fennikel), timian, løvstikke, sort peber, laurbærblad, salt), rehydreret grøntsagspulver 18,5% (løg, pastinak, persillerod, porre, champignon, gulerod, tomat, hvidløg), salt, sukker, aromaer, modificeret stivelse, eddike, persilleekstrakt, stabilisator (xanthangummi). Chips: Majs 74%, solsikkeolie, ostekrydderi 4,8% (salt, druesukker, LAKTOSE [MÆLK], OSTEPULVER [MÆLK], naturlig aroma [MÆLK], SMØROLIE [MÆLK], krydderi, MALTODEXTRIN, MÆLKPROTEIN)."
              
            ],
            savedIngredients: "Chili, paprika og løg.",
            nutritionalValues:
          "Beregnet per portion. 636 kcal, 38g protein, 82g kulhydrater, 14g fedt.",
            image: {
              url: "/images/week19-recipe2.jpg",
            },
            id: "week19-recipe2-da",
            createdAt: "2025-04-28T12:00:00Z",
            freezabl: null,
            recipeNumber: 2,
            slug: "krydret-chili-sin-carne-ris-tortillachips-creme-fraiche",
          },
        ],
      },
{
  id: "week19-recipe3",
  weekNr: 19,
  recipeNumber: 3,
  startDate: "2025-05-05",
  chef: {
    name: "Emil Petzén",
    image: "/images/emil_kock.png" 
  },
  title:
    "Potato gnocchi with a roasted sun-dried tomato pesto sauce, Västerbotten cheese, crushed roasted almonds, haricots verts, and basil.",
  slug: "potato-gnocchi-roasted-sun-dried-tomato-pesto-vasterbotten-cheese-almonds-haricots-verts-basil",
  image: {
    url: "/images/week19-recipe3.jpg",
  },
  ingredients: [
    "Potato gnocchi", 
    "1 jar sun dried tomato pestosauce", 
    "1 jar roasted salted almonds", 
    "1 box haricot verts"
],
  steg: [
   "Take out a frying pan and a large saucepan and boil water for the gnocchi. Fry the haricot verts on a high heat until they have a frying surface and put them aside. Cook the gnocchi in the water for about 2 minutes. Save 1 dl of the water before draining the gnocchi. Drain the gnocchi, but be careful not to break it!", 
   "Fry the gnocchi with a little cooking fat in the frying pan you fried the haricot verts in so that they become a little crispy, then pour the sauce along with the water you saved and let it simmer and get hot. If the sauce is too thick, add more liquid Then serve by sprinkling the toasted crushed almonds and the haricot verts."
],
  contentAllergies: [
    "Sun-dried tomatoes, crème fraîche, vegetable broth, garlic, pecorino, basil, black pepper, salt, almonds, haricots verts. Potato gnocchi: Potato purée 35% (water, dried potato flakes 7%), WHEAT flour, potato starch, rice flour, salt."
],
  savedIngredients: "Haricot greens. Almonds. Cream. Sun-dried tomatoes.",
  nutritionalValues:
  "Calculated per portion. 791 kcal, 16g protein, 84g carbohydrates, 29g fat.", 
  freezabl: null,
  createdAt: "2025-04-28T12:00:00Z",
  localizations: [
    {
      title:
        "Potatisgnocchi med en rostad soltorkad tomatpestosås med västerbottenost, krossade rostade mandlar, haricot verts & basilika.",
      ingredients: [
        "Potatis gnocchi", 
        "1 burk soltorkad tomatpestosås", 
        "1 burk rostade saltade mandlar", 
        "1 låda haricot verts"
    ],
      steg: [
        "Ta fram en stekpanna och en stor kastrull och koka upp vatten till gnocchin. Stek haricot vertsen på hög värme tills den får stekyta och lägg de åt sidan. Koka gnocchin i vattnet i cirka 2 minuter. Spara 1 dl av vattnet innan du häller av gnocchin. Häll av gnocchin, men var försiktig så den inte går sönder!", 
        "Stek gnocchin med lite matfett i stekpannan ni stekte haricot vertsen i så att de blir lite krispiga, häll sedan på såsen tillsammans med vattnet ni sparade och låt det sjuda och bli varmt. Om det blir för tjock sås, tillsätt mer vätska Servera sedan genom att strö över de rostade krossade mandlarna och haricot vertsen."
    ],
      contentAllergies: [
        "Soltorkade tomater, creme fraiche, grönsaksbuljong, vitlök, pecorino, basilika, svartpeppar, salt, mandlar, haricot verts. Potatisgnocchi: Potatispuré 35% (vatten, torkade potatisflingor 7%), VETEmjöl, potatisstärkelse, rismjöl, salt."
      ],
      savedIngredients: "Haricot verts. Mandlar. Grädde. Soltorkade tomater.",
      nutritionalValues:
    "Räknat per portion. Kcal 791. Protein 16g. Kolhydrater 84g. Fett 29g.",
      image: {
        url: "/images/week19-recipe3.jpg",
      },
      id: "week19-recipe3-sv",
      createdAt: "2025-04-28T12:00:00Z",
      freezabl: null,
      recipeNumber: 3,
      slug: "potatisgnocchi-rostad-soltorkad-tomatpestosas-vasterbottenost-mandlar-haricot-verts-basilika",
    },
    {
      title:
        "Kartoffelgnocchi med en ristet soltørret tomatpestosauce med Västerbottenost, knuste ristede mandler, haricots verts og basilikum.",
      ingredients: [
        "Kartoffelgnocchi", 
        "1 dåse soltørret tomatpestosauce", 
        "1 dåse ristede saltede mandler", 
        "1 æske grønne bønner"
    ],
      steg: [
        "Tag en bradepande og en stor gryde ud og kog vand op til gnocchierne. Steg haricot verts ved høj varme til de har en stegeflade og læg dem til side. Kog gnocchierne i vandet i cirka 2 minutter. Gem 1 dl af vandet inden du dræner gnocchierne. Dræn gnocchierne, men pas på ikke at knække den!", 
        "Steg gnocchierne med lidt madfedt i den stegepande du stegte haricot verts i, så de bliver lidt sprøde, hæld derefter saucen sammen med det gemte vand og lad det simre og blive varmt. Hvis saucen er for tyk, tilsæt mere væske. Server derefter ved at drysse de ristede knuste mandler og haricot verts."
      ],
      contentAllergies: [
        "Soltørrede tomater, creme fraiche, grøntsagsbouillon, hvidløg, pecorino, basilikum, sort peber, salt, mandler, haricots verts. Kartoffelgnocchi: Kartoffelpuré 35% (vand, tørrede kartoffelflager 7%), HVEDEMEL, kartoffelstivelse, rismel, salt."
      ],
      savedIngredients: "Haricot greens. Mandler. Fløde. Soltørrede tomater.",
      nutritionalValues:
    "Räknat per portion. 791 kcal, 16g protein, 84g kulhydrater, 29g fedt.",
      image: {
        url: "/images/week19-recipe3.jpg",
      },
      id: "week19-recipe3-da",
      createdAt: "2025-04-28T12:00:00Z",
      freezabl: null,
      recipeNumber: 3,
      slug: "kartoffelgnocchi-ristet-soltorret-tomatpestosauce-vasterbottenost-mandler-haricots-verts-basilikum      ",
    },
  ],
},
      
      {
        id: "week18-recipe1",
        weekNr: 18,
        recipeNumber: 1,
        startDate: "2025-04-28", // måndagen i vecka 17
        chef: {
          name: "Emil Petzén",
          image: "/images/emil_kock.png" 
        },
        title:
          "Vegetarian meatballs with mashed potatoes, cream sauce, stirred lingonberries & pressed cucumber.",
        slug: "vegetarian-meatballs-mashed-potatoes-lingonberries-cucumber",
        image: {
          url: "/images/week18-recipe1.jpeg", // ← byt till rätt lokal bildsökväg
        },
        ingredients: [
         "1 package vegetarian meatballs",
         "1 package mashed potatoes",
         "1 package cream sauce", 
         "1 package sweetened lingonberries", 
         "1 package pressed cucumber"
      ],
        steg: [
         "Take out a frying pan and a larger saucepan. Place the mashed potatoes in the larger saucepan with 1 dl of water, milk or cream. Put it on medium heat and stir occasionally so it doesn't burn at the bottom, make sure the mash gets hot. At the same time, fry the meatballs in a little cooking fat, preferably butter, so they get a nice frying surface.", 
         "When the meatballs have a nice surface and have been fried for a few minutes, pour the cream sauce into the frying pan together with 0.5dl of water, milk or cream. Let the meatballs simmer in the sauce for a few minutes.", 
         "Serving: Put the warm mash on a plate with meatballs, sauce, lingonberry and cucumber.", 
        ],
        contentAllergies: [
          "Meatballs (rehydrated pea protein, water, rapeseed oil, potato, onion, caramelized sugar, citrus fiber, salt, spices, nutmeg, preservative, cayenne pepper) potatoes, MILK, BUTTER, CREAM, SOY, lingonberries, sugar, cucumber, vinegar, dill, carrot, ONION, leek, salt, natural flavor, sugar, parsnip, modified corn starch, garlic powder, sunflower oil.          "
        ],
        savedIngredients: "Potatoes, milk, cream, sugar, dill seeds.", 
        nutritionalValues: "Calculated per portion. Kcal 613. Protein 32g. Carbohydrates 71g. Fat 21g.",
        freezabl: null,
        createdAt: "2025-04-22T12:00:00Z",
        localizations: [
          {
            title: "Vegetariska köttbullar med potatispuré, gräddsås, rårörda lingon & pressgurka.",
            ingredients: [
              "1 förpackning vegetariska köttbullar", 
              "1 förpackning potatismos", 
              "1 förpackning gräddsås", 
              "1 förpackning rårörda lingon", 
              "1 förpackning pressgurka"
          ],
            steg: [
              "Ta fram en stekpanna och en större kastrull. Lägg potatismoset i den större kastrullen med 1 dl vatten, mjölk eller grädde. Sätt den på medelhög värme och rör om då och då så den inte bränner i botten, se till att moset blir varmt. Samtidigt, stek köttbullarna i lite matfett, gärna smör så de får fin stekyta.", 
              "När köttbullarna har fått fin yta och stekts i några minuter, häll på gräddsåsen i stekpannan tillsammans med 0.5dl vatten, mjölk eller grädde. Låt köttbullarna sjuda i såsen i några minuter.", 
              "Servering: Lägg det varma moset på en tallrik med köttbullar, sås, lingon och gurka.", 
          
          ],
            contentAllergies: [
              "Köttbullar (Rehydrerat ärtprotein, vatten, rapsolja, potatis, lök, karamelliserat socker, citrusfiber, salt, kryddor, muskot, konserveringsmedel, cayennepeppar) Potatis, MJÖLK, SMÖR, VISPGRÄDDE, SOJA, lingon, socker, gurka, ättika, dill, morot, LÖK, purjoLÖK, salt, naturlig arom, socker, palsternacka, modifierad majsstärkelse, vitlökspulver, solrosolja."
            ],
            savedIngredients: "Potatis, mjölk, grädde, socker, dillfrö.",
            nutritionalValues: "Räknat per portion. Kcal 613. Protein 32g. Kolhydrater 71g. Fett 21g.",
            image: {
              url: "/images/week18-recipe1.jpeg", // ← byt till rätt lokal bildsökväg
            },
            id: "week18-recipe1-sv",
            createdAt: "2025-04-22T12:00:00Z",
            freezabl: null,
            recipeNumber: 1,
            slug: "vegetariska-kottbullar-potatispure-lingon-pressgurka"
          },
          {
            title: "Vegetariske kødboller med kartoffelmos, flødesovs, rørte tyttebær & presset agurk.",
            ingredients: [
              "1 pakke vegetariske kødboller", 
              "1 pakke kartoffelmos",
              "1 pakke flødesovs",  
              "1 pakke rørte tyttebær", 
              "1 pakke presset agurk", 
          
          ],
            steg: [
              "Tag en stegepande og en større gryde ud. Læg kartoffelmosen i den større gryde med 1 dl vand, mælk eller fløde. Sæt det på middel varme og rør rundt af og til så det ikke brænder på i bunden, sørg for at mosen bliver varm. Steg samtidig frikadellerne i lidt madlavningsfedt, gerne smør, så de får en flot stegeflade.", 
              "Når frikadellerne har fået en flot overflade og har stegt et par minutter, hældes flødesovsen i bradepanden sammen med 0,5 dl vand, mælk eller fløde. Lad frikadellerne simre i saucen et par minutter.", 
              "Servering: Kom den lune mos på en fad med frikadeller, sauce, tyttebær og agurk."
          ],
            contentAllergies: [
              "Kødboller (rehydreret ærteprotein, vand, rapsolie, kartoffel, løg, karamelliseret sukker, citrusfibre, salt, krydderier, muskatnød, konserveringsmiddel, cayennepeber) kartofler, MÆLK, SMØR, FLØDE, SOJA, tyttebær, sukker, agurk, eddike, dild, gulerod, LØG, porre, salt, naturlig aroma, sukker, pastinak, modificeret majsstivelse, hvidløgspulver, solsikkeolie."
            ],
            savedIngredients: "Kartofler, mælk, fløde, sukker, dildfrø.",
            nutritionalValues: "Beregnede per portion. Kcal 613. Protein 32g. Kulhydrater 71g. Fedt 21g.",
            image: {
              url: "/images/week18-recipe1.jpeg", // ← byt till rätt lokal bildsökväg
            },
            id: "week18-recipe1-da",
            createdAt: "2025-04-22T12:00:00Z",
            freezabl: null,
            recipeNumber: 1,
            slug: "vegetariske-kodeboller-kartoffelmos-tyttebaer-agurk"
          }
        ]
      }, 
      {
        id: "week18-recipe2",
        weekNr: 18,
        recipeNumber: 2,
        startDate: "2025-04-28",
        chef: {
          name: "Anton Mällroth",
          image: "/images/anton_kock.webp" 
        },
        title:
          "Roasted root vegetables with tangy bean crème, our focaccia and shaved parmesan.",
        slug: "roasted-root-vegetables-bean-creme-focaccia-parmesan",
        image: {
          url: "/images/week18-recipe2.jpg", // ← byt till rätt lokal bildsökväg
        },
        ingredients: [
          "1 pack roasted potatoes/carrots", 
          "1 pack roasted sweet potatoes/pearl onions/parsnip", 
          "1 pack focaccia", 
          "1 pack bean purée", 
          "1 pack parmesan"
        ],
        steg: [
          "Take out a large frying pan, or two smaller ones. Sauté the root vegetables in a bit of fat until they are heated through and have a nice golden-brown surface.", 
          "To warm the bread, you can either heat it in the oven at 100°C (210°F) for five minutes or in the microwave with a glass of water on full power for 30–60 seconds.", 
          "Serve the root vegetables with the bean purée, focaccia, and parmesan."
      ],
        contentAllergies: ["Carrots, potatoes, sweet potatoes, parsnip, pearl onions, parmesan cheese, white beans, yogurt, WHEAT flour, yeast, thyme, rosemary, rapeseed oil, salt, pepper, lime juice."
          ],
        savedIngredients: "Flour, yeast, carrots, potatoes, yogurt, crème fraîche, lime juice.",
        nutritionalValues:
          "Calculated per portion. Kcal 777. Protein 33g. Carbohydrates 108g. Fat 23g.",
        freezabl: null,
        createdAt: "2025-04-22T12:00:00Z",
        localizations: [
          {
            title:
              "Rostade rotfrukter med syrlig böncrème, vår focaccia och hyvlad parmesan.",
            ingredients: [
              "1 förpackning rostad potatis/morot", 
              "1 förpackning rostad sötpotatis/steklök/palsternacka", 
              "1 förpackning focaccia", 
              "1 förpackning bönkräm", 
              "1 förpackning parmesan"
          
          ],
            steg: [
              "Ta fram en stor stekpanna, eller två små. Stek rotfrukterna i lite matfett så att de blir genomvarma och får lite fin gyllenbrun yta.", 
              "För att värma brödet kan du antingen köra det i ugnen på 100 grader i fem minuter eller i micron tillsammans med ett vattenglas på full effekt i 30-60 sekunder.", 
              "Servera rotfrukterna med bönkrämen, foccacian och parmesanen."
            
          ],
            contentAllergies: ["Morötter, potatis, sötpotatis, palsternacka, steklök, parmesanost, vita bönor, yoghurt, VETEmjöl, jäst, timjan, rosmarin, rapsolja, salt, peppar, limejuice.            "
              ],
            savedIngredients: "Mjöl, jäst, morötter, potatis, yoghurt, creme fraiche, limejuice.",
            nutritionalValues:
          "Räknat per portion. Kcal 777. Protein 33g. Kolhydrater 108g. Fett 23g.",
            image: {
              url: "/images/week18-recipe2.jpg",
            },
            id: "week18-recipe2-sv",
            createdAt: "2025-04-22T12:00:00Z",
            freezabl: null,
            recipeNumber: 2,
            slug: "rostade-rotfrukter-boncreme-focaccia-parmesan",
          },
          {
            title:
              "Ovnbagte rodfrugter med syrlig bønnecreme, vores focaccia og høvlet parmesan.",
            ingredients: [
             "1 pakke ristede kartofler/gulerødder", 
             "1 pakke ristede søde kartofler/perleløg/pastinak", 
             "1 pakke focaccia", 
             "1 pakke bønnecreme", 
             "1 pakke parmesan"
          ],
            steg: [
              "Find en stor stegepande frem, eller to små. Steg rodfrugterne i lidt fedtstof, indtil de er gennemvarme og får en let gyldenbrun overflade.", 
              "For at varme brødet kan du enten sætte det i ovnen ved 100 grader i fem minutter eller i mikroovnen sammen med et glas vand på fuld effekt i 30–60 sekunder.", 
              "Server rodfrugterne med bønnecremen, focacciaen og parmesanen."
          ],
            contentAllergies: ["Gulerødder, kartofler, søde kartofler, pastinak, perleløg, parmesanost, hvide bønner, yoghurt, HVEDEMEL, gær, timian, rosmarin, rapsolie, salt, peber, limesaft."
              
            ],
            savedIngredients: "Mel, gær, gulerødder, kartofler, yoghurt, creme fraiche, limesaft.",
            nutritionalValues:
          "Beregnet per portion. Kcal 777. Protein 33g. Kulhydrater 108g. Fedt 23g.",
            image: {
              url: "/images/week18-recipe2.jpg",
            },
            id: "week18-recipe2-da",
            createdAt: "2025-04-15T12:00:00Z",
            freezabl: null,
            recipeNumber: 2,
            slug: "ovnbagte-rodfrugter-bonnecreme-focaccia-parmesan",
          },
        ],
      },
{
  id: "week18-recipe3",
  weekNr: 18,
  recipeNumber: 3,
  startDate: "2025-04-28",
  chef: {
    name: "Anton Mällroth",
    image: "/images/anton_kock.webp"
  },
  title:
    "Ramen with umami broth, glass noodles, soy-marinated egg, edamame, and spring onion.",
  slug: "ramen-umami-broth-glass-noodles-soy-egg-edamame",
  image: {
    url: "/images/week18-recipe3.jpg",
  },
  ingredients: [
    "1 pack ramen broth", 
    "1 pack glass noodles", 
    "1 pack soy-marinated egg", 
    "1 pack edamame", 
    "Spring onion"
],
  steg: [
   "Take out two pots and one saucepan. Fill one of the pots and the saucepan with salted water and bring to a boil. Pour the ramen broth into the other pot and heat over medium.", 
   "Cook the noodles in the pot of water, but do not cook them all the way through — they will finish cooking in the broth. Half the cooking time is about 3–4 minutes. Boil the edamame beans in the salted water in the saucepan for the same amount of time, about 3–4 minutes.", 
   "Split the spring onion in half and rinse under running water, then finely chop. Remove the eggs from the marinade and set aside.", 
   "When the noodles have cooked for 3–4 minutes, drain them and add them to the broth. Then simmer for roughly the same time, 3–4 minutes. The noodles should be cooked but still slightly firm to the bite.", 
   "Serve the noodles in the broth with the edamame beans, spring onion, and the soy-marinated egg."
],
  contentAllergies: [
    "Egg, soy, chili flakes, green chili, syrup, sesame oil, garlic, sesame seeds, glass noodles (starch from peas, mung beans), miso paste, spring onion, edamame beans. Broth base: Water, maltodextrin, salt, flavorings, sugar, natural lemongrass flavor, modified starch, garlic powder, spices (kaffir lime, turmeric), spice extracts (ginger, white pepper), stabilizer (xanthan gum)."
],
  savedIngredients: "Egg, sesame seeds, spring onion.",
  nutritionalValues:
  "Calculated per portion. Kcal 698. Protein 59g. Carbohydrates 66g. Fat 24g.", 
  freezabl: null,
  createdAt: "2025-04-22T12:00:00Z",
  localizations: [
    {
      title:
        "Ramen på umamibuljong med glasnudlar, sojamarinerat ägg, edamame och salladslök.",
      ingredients: [
        "1 förpackning ramenbuljong", 
        "1 förpackning glasnudlar", 
        "1 förpackning sojamarinerat ägg", 
        "1 förpackning edamame", 
        "Salladslök"
    ],
      steg: [
        "Ta fram två grytor och en kastrull, fyll den ena grytan och kastrullen med saltat vatten och koka upp. Häll ramenbuljongen i den andra grytan och värm till medelvärme.", 
        "Koka nudlarna i den vattenfyllda grytan, koka inte färdig då de ska gå klart i buljongen. Halva koktiden är ca 3-4 minuter. Koka edamamebönorna i kastrullen med saltat vatten lika länge, ca 3-4 minuter.", 
        "Dela salladslöken på mitten och rengör under rinnande vatten, sedan hacka fint. Ta ut äggen ur marinaden och lägg åt sidan.", 
        "När nudlarna har kokat i 3-4 minuter silar du av och lägger ned dem i buljongen. Sjud därefter i ungefär lika lång tid, 3-4 minuter. Nudlarna ska vara klara med ha lite bett kvar.", 
        "Servera nudlarna i buljong med edamamebönorna, salladslöken och det sojamarinerade ägget."
    ],
      contentAllergies: [
        "Ägg, soja, chiliflakes, grön chili, sirap, sesamolja, vitlök, sesamfrön, glasnudlar (stärkelse från ärtor, mungbönor), misopasta, salladslök, edamamebönor. Fond: Vatten, maltodextrin, salt, aromer, socker, naturlig citrongräsarom, modifierad stärkelse, vitløkspulver, kryddor (kaffirlime, gurkmeja), kryddextrakt (ingefära, vitpeppar), stabilisator (xantangummi)."
      ],
      savedIngredients: "Ägg, sesamfrön, salladslök.",
      nutritionalValues:
    "Räknat per portion. Kcal 698. Protein 59g. Kolhydrater 66g. Fett 24g.",
      image: {
        url: "/images/week18-recipe3.jpg",
      },
      id: "week18-recipe3-sv",
      createdAt: "2025-04-22T12:00:00Z",
      freezabl: null,
      recipeNumber: 3,
      slug: "ramen-umamibuljong-glasnudlar-sojaagg-edamame",
    },
    {
      title:
        "Ramen med umamibouillon, glasnudler, sojamarineret æg, edamame og forårsløg.",
      ingredients: [
        "1 pakke ramenbouillon", 
        "1 pakke glasnudler", 
        "1 pakke sojamarineret æg", 
        "1 pakke edamame", 
        "Forårsløg"


    ],
      steg: [
        "Tag to gryder og en kasserolle frem. Fyld den ene gryde og kasserollen med saltet vand og bring i kog. Hæld ramenbouillonen i den anden gryde og varm op til medium varme.", 
        "Kog nudlerne i gryden med vand, men ikke helt færdige – de skal koge færdigt i bouillonen. Halv kogetid er cirka 3-4 minutter. Kog edamamebønnerne i kasserollen med saltet vand i samme tid, cirka 3-4 minutter.", 
        "Del forårsløget på midten og skyl under rindende vand, hak derefter fint. Tag æggene ud af marinaden og læg dem til side.", 
        "Når nudlerne har kogt i 3-4 minutter, sigtes de og lægges ned i bouillonen. Lad derefter simre i cirka samme tid, 3-4 minutter. Nudlerne skal være færdige, men stadig have lidt bid.", 
        "Server nudlerne i bouillonen med edamamebønner, forårsløg og det sojamarinerede æg."
      ],
      contentAllergies: [
        "Æg, soja, chiliflager, grøn chili, sirup, sesamolie, hvidløg, sesamfrø, glasnudler (stivelse fra ærter og mungbønner), misopasta, forårsløg, edamamebønner. Fond: Vand, maltodextrin, salt, aromaer, sukker, naturlig citrongræsaroma, modificeret stivelse, hvidløgspulver, krydderier (kaffir lime, gurkemeje), krydderekstrakter (ingefær, hvid peber), stabilisator (xanthangummi)."
      ],
      savedIngredients: "Æg, sesamfrø, forårsløg.",
      nutritionalValues:
    "Räknat per portion. Kcal 698. Protein 59g. Kulhydrater 66g. Fedt 24g.",
      image: {
        url: "/images/week18-recipe3.jpg",
      },
      id: "week18-recipe3-da",
      createdAt: "2025-04-22T12:00:00Z",
      freezabl: null,
      recipeNumber: 3,
      slug: "ramen-umamibouillon-glasnudler-sojaaeg-edamame",
    },
  ],
},
      {
        id: "week17-recipe1",
        weekNr: 17,
        recipeNumber: 1,
        startDate: "2025-04-22", // måndagen i vecka 17
        chef: {
          name: "Emil Petzén",
          image: "/images/emil_kock.png" 
        },
        title:
          "Creamy tikka masala with lentils. Served with naan bread, basmati rice & herb yoghurt with coriander & mint.",
        slug: "kramig-tikka-masala-med-linser-naan-ris-och-ortyoghurt",
        image: {
          url: "/images/week17-recipe1.jpg", // ← byt till rätt lokal bildsökväg
        },
        ingredients: [
          "1 pack of naan bread",
          "1 pack of tikka dahl",
          "1 pack of coriander/lime yogurt", 
          "1 pack of rice",
      ],
        steg: [
          "Take out a saucepan and a frying pan. Fry the rice in the frying pan and heat the tikka dahl in the saucepan over medium heat, stirring occasionally. Feel free to add some cream, crème fraîche, or butter to the dahl.", 
          "When the rice is fried and hot, slice the naan bread into thin pieces and fry them in a little fat until crispy.", 
          "Stir the yogurt and serve."
        ],
        contentAllergies: [
          "Tikka dahl *Red lentils, cream, sour cream, galangal, chili, ginger, tomato paste, yellow ONION, cinnamon, cardamom, thyme, GARLIC, rapeseed oil, coriander, vegetable stock parsley, ONION, celery, cornstarch.",
          "Naan: WHEAT FLOUR, water, 3% wheat sourdough (water, WHEAT FLOUR, brandy vinegar, WHEAT MALT FLOUR, salt), yeast, rapeseed oil, salt, YOGURT, CORN MALT, vinegar."
        ],
        savedIngredients: "Oat cream, onion, and sourdough bread.",
        nutritionalValues: "Calculated per portion. Calories 743. Protein 33g. Carbohydrates 83g. Fat 23g.",
        freezabl: null,
        createdAt: "2025-04-15T12:00:00Z",
        localizations: [
          {
            title: "Krämig tikka masala med linser. Serveras med naanbröd, basmatiris & örtig yoghurt med koriander och mynta.",
            ingredients: [
              "1 förpackning naanbröd",
              "1 förpackning tikka dahl", 
              "1 förpackning koriander/limeyoghurt", 
              "1 förpackning ris"
          ],
            steg: [
              "Ta fram en kastrull och en stekpanna. Stek riset i stekpannan och värm tikka dahlen i kastrullen på medelvärme, rör om då och då och tillsätt gärna lite grädde, creme fraiche eller smör i den.", 
              "När riset är stekt och varmt, skiva naanbrödet i tunna skivor och stek det i lite matfett så det blir krispigt.", 
              "Rör runt i yoghurten och servera."
          
          ],
            contentAllergies: [
              "Tikka dahl *Röda linser, grädde, creme fraiche, galangal, chili, ingefära, tomatpuré, gul LÖK, kanel, kardemumma, timjan, VITLÖK, rapsolja, koriander, grönsaksfond *persilja, LÖK, selleri, maizena*.",
              "Naan: VETEMJÖL, vatten, 3 % vetesurdeg (vatten, VETEMJÖL, brandyättika, VETEMALTMJÖL, salt), jäst, rapsolja, salt, YOGHURT, KORNMALT, ättika.",
            ],
            savedIngredients: "Havregrädde, lök, surdegsbröd.",
            nutritionalValues: "Räknat per portion. Kcal 743. Protein 33g. Kolhydrater 83g. Fett 23g.",
            image: {
              url: "/images/week17-recipe1.jpg", // ← byt till rätt lokal bildsökväg
            },
            id: "week17-recipe1-sv",
            createdAt: "2025-04-15T12:00:00Z",
            freezabl: null,
            recipeNumber: 1,
            slug: "kramig-tikka-masala-med-linser-naan-ris-och-ortyoghurt"
          },
          {
            title: "Kremet tikka masala med linser. Serveres med naanbrød, basmatiris og urtet yoghurt med koriander og mynte.",
            ingredients: [
              "1 pakke naanbrød", 
              "1 pakke tikka dahl", 
              "1 pakke koriander/limeyoghurt", 
              "1 pakke ris"
          
          ],
            steg: [
              "Tag en gryde og en stegepande frem. Steg riset i stegepanden, og varm tikka dahlen op i gryden ved middel varme. Rør jævnligt rundt, og tilsæt gerne lidt fløde, creme fraiche eller smør.", 
              "Når riset er stegt og varmt, skær naanbrødet i tynde skiver og steg det i lidt fedtstof, indtil det bliver sprødt.", 
              "Rør rundt i yoghurten og server."
          ],
            contentAllergies: [
              "Tikka dahl *Røde linser, fløde, creme fraiche, galangal, chili, ingefær, tomatpuré, løg, kanel, kardemomme, timian, hvidløg, rapsolie, koriander, grøntsagsfond *persille, løg, selleri, maizena*.",
              "Naan: HVEMJØL, vand, surdej (vand, HVEMJØL, brandyeddike, HVEDEMALTMEL, salt), gær, rapsolie, salt, YOGHURT, BYGMALT, eddike.",
            ],
            savedIngredients: "Havrefløde, løg og surdejsbrød.",
            nutritionalValues: "Beregnede per portion. Kalorier 743. Protein 33g. Kulhydrater 83g. Fedt 23g.",
            image: {
              url: "/images/week17-recipe1.jpg", // ← byt till rätt lokal bildsökväg
            },
            id: "week17-recipe1-da",
            createdAt: "2025-04-15T12:00:00Z",
            freezabl: null,
            recipeNumber: 1,
            slug: "kramig-tikka-masala-med-linser-naan-ris-och-ortyoghurt"
          }
        ]
      }, 
      {
        id: "week17-recipe2",
        weekNr: 17,
        recipeNumber: 2,
        startDate: "2025-04-22",
        chef: {
          name: "Emil Petzén",
          image: "/images/emil_kock.png" 
        },
        title:
          "French country-style salad with bulgur, grilled vegetables, coriander-pickled carrots, green olives, feta, croutons, sautéed haricots verts & lime crème fraîche.",
        slug: "fransk-bondsallad-pa-bulgur-grillade-gronsaker-feta-haricot-verts",
        image: {
          url: "/images/week17-recipe2.jpg", // ← byt till rätt lokal bildsökväg
        },
        ingredients: [
          "1 pack of bulgur", 
          "1 pack of grilled vegetables", 
          "1 pack of marinated olives", 
          "1 pack of sourdough croutons", 
          "1 pack of feta cheese", 
          "1 pack of lime crème fraîche", 
          "1 pack of coriander seed-pickled carrots",
          "1 pack of haricot verts"
        ],
        steg: [
          "Take out 2 frying pans. Fry the bulgur in one frying pan so it gets hot and has some frying surface. Fry the haricot verts and the grilled vegetables in the other with a little cooking fat so they have some frying surface.", 
          "Pour off the feta cheese, carrot and olives. Open the crème fraîche jar and serve by layering the bulgur, then the vegetables, drizzle over the crème fraîche, crumble the feta cheese, olives, carrot and then the sourdough croutons."
      
      ],
        contentAllergies: ["Bulgur. Marinated olives olives, garlic, rosemary. Feta cheese. Haricot verts. Grilled vegetables onion, eggplant, bell pepper, zucchini. Sourdough croutons rye flour, wheat flour, water, salt, sourdough. Sour cream, lime. Carrot, vinegar, sugar, salt, coriander seeds."
          ],
        savedIngredients: "Garlic, sourdough bread, vinegar, coriander seeds, and sugar.",
        nutritionalValues:
          "Calculated per portion. Calories 732. Protein 32g. Carbohydrates 79g. Fat 21g.",
        freezabl: null,
        createdAt: "2025-04-15T12:00:00Z",
        localizations: [
          {
            title:
              "Fransk bondsallad på bulgur med grillade grönsaker, korianderfrö-picklad morot, marinerade gröna oliver, smulad fetaost, surdegskrutonger, frästa haricot verts & creme fraiche med lime.",
            ingredients: [
              "1 förpackning bulgur", 
              "1 förpackning grillade grönsaker", 
              "1 förpackning marinerade oliver", 
              "1 förpackning surdegskrutonger", 
              "1 förpackning fetaost", 
              "1 förpackning creme fraiche med lime",
              "1 förpackning korianderfrö-picklad morot", 
              "1 förpackning haricot verts"

          
          ],
            steg: [
              "Ta fram 2 stekpannor. Stek bulguren i ena stekpannan så det blir varmt och får lite stekyta. Stek haricot vertsen och de grillade grönsakerna i den andra med lite matfett så de får stekyta.", 
              "Häll av fetaostspadet, morotsspadet och häll även av spadet från oliverna. Öppna crème fraîche burken och servera sedan med att grunda med bulguren, sedan grönsakerna, ringla över crème fraichen, smula fetaosten, oliverna, moroten och sedan surdegskrutongerna."
            
          ],
            contentAllergies: ["Bulgur. Marinerade oliver *oliver, vitlök, rosmarin*. Fetaost. Haricot verts. Grillade grönsaker *lök, aubergine, paprika, zucchini*. Surdegskrutonger *rågmjöl, vetemjöl, vatten, salt, surdeg*. Creme fraiche, lime. Morot, ättika, socker, salt, korianderfrö"
              ],
            savedIngredients: "Vitlök, surdegsbröd, ättika, korianderfrö, socker.",
            nutritionalValues:
          "Räknat per portion. Kcal 732. Protein 32g. Kolhydrater 79g. Fett 21g.",
            image: {
              url: "/images/week17-recipe2.jpg",
            },
            id: "week17-recipe2-sv",
            createdAt: "2025-04-15T12:00:00Z",
            freezabl: null,
            recipeNumber: 2,
            slug: "fransk-bondsallad-pa-bulgur-grillade-gronsaker-feta-haricot-verts",
          },
          {
            title:
              "Fransk bondesalat med bulgur, grillede grøntsager, koriander-syltede gulerødder, marinerede grønne oliven, smuldret fetaost, surdejscroutoner, sauterede haricots verts & creme fraiche med lime.",
            ingredients: [
              "1 pakke bulgur", 
              "1 pakke grillede grøntsager", 
              "1 pakke marinerede oliven", 
              "1 pakke surdejskrutoner", 
              "1 pakke fetaost", 
              "1 pakke creme fraiche med lime", 
              "1 pakke gulerødder syltet med korianderfrø", 
              "1 pakke haricot verts"
          ],
            steg: [
              "Tag 2 stegepander ud. Steg bulguren i den ene pande, så den bliver varm og får lidt stegeflade. Steg haricot verts og de grillede grøntsager i den anden med lidt madfedt, så de får en stegeflade.", 
              "Hæld fetaostskelen, gulerodsskelen fra og hæld også skevlen fra oliven. Åbn glasset med creme fraiche og server med en bund af bulguren, derefter grøntsagerne, dryp over creme fraichen, smuldr fetaost, oliven, gulerod og derefter surdejscroutoner."
          ],
            contentAllergies: ["Bulgur. Marinerede oliven oliven, hvidløg, rosmarin. Fetaost. Haricot verts. Grillede grøntsager løg, aubergine, peberfrugt, zucchini. Surdejscroutoner rugmel, hvedemel, vand, salt, surdej. Creme fraiche, lime. Gulerod, eddike, sukker, salt, korianderfrø."
              
            ],
            savedIngredients: "Hvidløg, surdejsbrød, eddike, korianderfrø og sukker.",
            nutritionalValues:
          "Beregnet per portion. Kalorier 732. Protein 32g. Kulhydrater 79g. Fedt 21g.",
            image: {
              url: "/images/week17-recipe2.jpg",
            },
            id: "week17-recipe2-da",
            createdAt: "2025-04-15T12:00:00Z",
            freezabl: null,
            recipeNumber: 2,
            slug: "fransk-bondsallad-pa-bulgur-grillade-gronsaker-feta-haricot-verts",
          },
        ],
      },
{
  id: "week17-recipe3",
  weekNr: 17,
  recipeNumber: 3,
  startDate: "2025-04-22",
  chef: {
    name: "Anton Mällroth",
    image: "/images/anton_kock.webp"
  },
  title:
    "Creamy spinach soup with poached egg, roasted sunflower seeds & chili oil.",
  slug: "kramig-spenatsoppa-med-pocherat-agg-solroskarnor-chiliolja",
  image: {
    url: "/images/week17-recipe3.jpg",
  },
  ingredients: [
    "1 pack spinach soup", 
    "1 pack roasted sunflower seeds", 
    "1 pack chili oil", 
    "Eggs"
],
  steg: [
    "Take out two saucepans. Pour all the soup into one of them and dilute with 200–300 ml of milk, cream, or water. Bring to a boil and season with salt and pepper.", 
    "While the soup is heating, bring salted water to a boil in the second saucepan. Add two tablespoons of vinegar to the water – this helps the egg coagulate more easily.", 
    "Crack the eggs into separate bowls. When the water reaches a boil, reduce to medium heat so it stops bubbling, and stir the water to create a whirlpool. Gently pour in the eggs while the water is still swirling. Let the egg simmer for 3–4 minutes before removing it from the pot. For best results, we recommend poaching no more than two eggs at a time. If you prefer not to poach the eggs, you can also boil them – we recommend soft-boiled (6–7 minutes).", 
    "Top the soup with the eggs, sunflower seeds, and chili oil before serving."
],
  contentAllergies: [
    "Spinach, yellow ONION, GARLIC, MILK, CREAM, eggs, sunflower seeds, rapeseed oil, chili pepper, salt, pepper, parsley.",
    "Broth: Vegetable stock 49% (infusion of water, vegetables (onion, carrot, leek, CELERY, fennel), thyme, lovage, black pepper, bay leaves, salt), rehydrated vegetable powder 18.5% (onion, parsnip, parsley root, leek, mushroom, carrot, tomato, garlic), salt, sugar, aromas, modified starch, vinegar, parsley extract, stabilizer (xanthan gum).",
],
  savedIngredients: "Garlic, yellow onion, sunflower seeds, and rapeseed oil.",
  nutritionalValues:
  "Calculated per portion. Calories 769. Protein 33g. Carbohydrates 25g. Fat 57g.", 
  freezabl: null,
  createdAt: "2025-04-15T12:00:00Z",
  localizations: [
    {
      title:
        "Krämig spenatsoppa med pocherat ägg, rostade solroskärnor & chiliolja.",
      ingredients: [
        "1 förpackning spenatsoppa",        
        "1 förpackning rostade solroskärnor", 
        "1 förpackning chiliolja", 
        "Ägg"
    ],
      steg: [
        "Tag fram två kastruller. Häll all soppa i den ena kastrullen och späd med 2-3 dl mjölk, grädde eller vatten. Koka upp och smaka av med salt och peppar.", 
        "Under tiden du värmer soppan, koka upp saltat vatten i den andra kastrullen. Tillsätt gärna två matskedar ättika i vattnet, detta underlättar koaguleringen av ägget.", 
        "Knäck äggen och lägg dem i separata skålar. När vattnet kokat upp, sänk till medelvärme så att vattnet slutar koka och rör runt i vattnet för att skapa en virvel. Häll försiktigt ned äggen medan vattnet fortfarande virvlar runt. Låt sedan ägget sjuda i 3-4 minuter innan du plockar upp det ur kastrullen. För bäst resultat rekommenderar vi att ni pocherar maximalt två ägg åt gången. Om ni inte vill ge er på att pochera ägg går det även fint att koka det som vanligt, då rekommenderar vi löskokt (6-7 min).", 
        "Toppa soppan med äggen, solroskärnorna och chilioljan och servera."
    ],
      contentAllergies: [
        "Spenat, gul LÖK, VITLÖK, MJÖLK, GRÄDDE, ägg, solroskärnor, rapsolja, chilipeppar, salt, peppar, persilja.",
        "Fond: Grönsaksbuljong 49% (avkok av vatten, grönsaker (lök, morot, purjolök, SELLERI, fänkål), timjan, libbsticka, svartpeppar, lagerblad, salt), rehydrerat grönsakspulver 18,5% (lök, palsternacka, persiljerot, purjolök, champinjon, morot, tomat, vitlök), salt, socker, aromer, modifierad stärkelse, vinäger, persiljeextrakt, stabiliseringsmedel (xantangummi).",
      ],
      savedIngredients: "Vitlök, gul lök, solroskärnor, rapsolja.",
      nutritionalValues:
    "Räknat per portion. Kcal 769. Protein 33g. Kolhydrater 25g. Fett 57g.",
      image: {
        url: "/images/week17-recipe3.jpg",
      },
      id: "week17-recipe3-sv",
      createdAt: "2025-04-15T12:00:00Z",
      freezabl: null,
      recipeNumber: 3,
      slug: "kramig-spenatsoppa-med-pocherat-agg-solroskarnor-chiliolja",
    },
    {
      title:
        "Cremet spinatsuppe med pocheret æg, ristede solsikkekerner og chiliolie.",
      ingredients: [
        "1 pakke spinatsuppe", 
        "1 pakke ristede solsikkekerner", 
        "1 pakke chilieolie", 
        "Æg"

    ],
      steg: [
        "Tag to gryder frem. Hæld al suppen i den ene gryde og spæd med 2-3 dl mælk, fløde eller vand. Kog op og smag til med salt og peber.",
        "Mens suppen varmes op, koges vand med salt i den anden gryde. Tilsæt gerne to spiseskefulde eddike i vandet – det gør det nemmere for ægget at koagulere.", 
        "Slå æggene ud i separate skåle. Når vandet koger, sænk varmen til middel, så det holder op med at boble, og rør rundt i vandet for at skabe en hvirvel. Hæld forsigtigt æggene i, mens vandet stadig hvirvler. Lad ægget simre i 3-4 minutter, før du tager det op med en hulske. For det bedste resultat anbefaler vi, at du pocherer maks to æg ad gangen. Hvis du ikke har lyst til at pochere æg, kan du også blot koge dem – vi anbefaler blødkogte (6-7 minutter).", 
        "Top suppen med æggene, solsikkekernerne og chiliolien og server."
      ],
      contentAllergies: [
        "Spinat, løg, hvidløg, mælk, fløde, æg, solsikkekerner, rapsolie, chilipeber, salt, peber, persille.",
        "Fond: Grøntsagsbouillon (vand, grøntsager – løg, gulerod, porre, SELLERI, fennikel – timian, løvstikke, peber, laurbærblad, salt), grøntsagspulver, eddike, sukker, persilleekstrakt, xanthangummi.",
      ],
      savedIngredients: "Vitlök, gul lök, solroskärnor, rapsolja.",
      nutritionalValues:
    "Räknat per portion. Kcal 769. Protein 33g. Kolhydrater 25g. Fett 57g.",
      image: {
        url: "/images/week17-recipe3.jpg",
      },
      id: "week17-recipe3-da",
      createdAt: "2025-04-15T12:00:00Z",
      freezabl: null,
      recipeNumber: 3,
      slug: "kramig-spenatsoppa-med-pocherat-agg-solroskarnor-chiliolja",
    },
  ],
},
      

      
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergies: Gluten in bread. Trace of lactose in cheese can be found. Ingredients: Bread *water, sourdough, salt, flour*. Mushroom confit *Lactose free butter, forest mushrooms, perslay, salt, pepper, chili, rapeseed oil, onion*. Aged hard cheese made from cow. ",
        createdAt: "2023-11-20T14:30:14.015871+00:00",
        freezabl: null,
        id: "clp707fat6hxz0bumqvtwmv3w",
        image: {
          url: "https://media.graphassets.com/Qtpf00U2R6A6iINca7iY",
        },
        ingredients: [
          "4 levain bread ",
          "1 box of mushrooms confité",
          "1 chunk of aged hard cheese",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i levainbröd. Ingredienser: Levainbröd *vatten, salt, surdeg, vetemjöl*. Confiterad svamp: skogschampinjoner, laktosfritt smör, olja, chili, persilja, vitlök, salt, svartpeppar. Gammel knas ost. ",
            createdAt: "2023-11-20T14:30:14.015871+00:00",
            freezabl: null,
            id: "clp707fat6hxz0bumqvtwmv3w",
            image: {
              url: "https://media.graphassets.com/Qtpf00U2R6A6iINca7iY",
            },
            ingredients: [
              "4 st levainbröd",
              "1 låda med confiterad svamp",
              "1 bit lagrad ost (Gammel Knas)",
            ],
            recipeNumber: 1,
            savedIngredients:
              "Svamp, smör, chili, persilja, vitlök, gammel knas ost. ",
            slug: "recept-emils-favorite-sandwich-fried-levain-bread-from-a-local-bakery-thinly-sliced-confit-wild-mushrooms-from-hakaslaett-with-parsley-shallots-garlic-and-grated-aged-cheese-from-arla-unika",
            startDate: "2023-11-27",
            steg: [
              "Ta fram 2 stekpannor. Stek bröden i ena stekpannan på medelhög värme med lite matfett så de får lite stekyta och blir krispiga. Stek svampen i den andra stekpannan hur hårt du önskar att den ska bli stekt. Vi föredrar när den fortfarande är mjuk och inte för hårt stekt för denna rätt.  ",
              "Servera. Bottna med brödet, sedan lägg på rikligt med svamp och sist riv över den lagrade hårdosten.",
            ],
            title:
              "Emils favoritmacka - Stekt levainbröd från Franska Bageriet, tunt skivad confiterad skogssvamp från Hakaslätt med persilja, schallottenlök, vitlök samt riven lagrad ost från Arla Unika. ",
            weekNr: 48,
          },
        ],
        nutritionalValues:
          "Calculated per serving. Kcal 660. Fat 16g. Protein 27g. Carbohydrates 64g",
        recipeNumber: 1,
        savedIngredients:
          "Mushrooms. Butter. Perslay. Chili. Onion. Aged hard cheese. ",
        slug: "recept-emils-favorite-sandwich-fried-levain-bread-from-a-local-bakery-thinly-sliced-confit-wild-mushrooms-from-hakaslaett-with-parsley-shallots-garlic-and-grated-aged-cheese-from-arla-unika",
        startDate: "2023-11-27",
        steg: [
          "Take out 2 frying pans. Fry the bread in one frying pan with a little cooking fat on a medium heat so that they get a little frying surface and become crispy. In the other frying pan, heat the mushrooms so that they get the desired frying surface. In our opinion, it should not be too hard fried.",
          "Serve the sandwich by placing the bread in the bottom, then plenty of mushrooms on top, then grate the aged cheese over the top.",
        ],
        title:
          "Emil's favorite sandwich - Fried levain bread from a local bakery, thinly sliced confit wild mushrooms from Hakaslätt with parsley, shallots, garlic, and grated aged cheese from Arla Unika.",
        weekNr: 48,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergies: Lactos in potato mash. Potatoes, milk, butter, cream sauce *lactose-free cream, cornstarch, mushroom stock, lingonberry, vegetable stock, rosemary, mushroom*, salt, black pepper, cucumber, vinegar, sugar, lingonberry, water, SOYA protein concentrate (18.5%), rapeseed oil, onion, potato flour, spices (onion powder, black pepper, garlic, allspice), tomato puree, salt, apple juice concentrate, natural flavors, gelling agent (methylcellulose), pea fiber, coloring (sugar color).",
        createdAt: "2023-11-20T14:26:59.343951+00:00",
        freezabl: null,
        id: "clp70393d62h50buncrwgplyo",
        image: {
          url: "https://media.graphassets.com/ZcV5FwhRCSAjJzxJOIkX",
        },
        ingredients: [
          "1 box of potato mash",
          '1 box of "meatballs"',
          "1 jar of cream sauce",
          "1 jar of lingonberries",
          "1 jar of pickled cucumber",
        ],
        localizations: [
          {
            contentAllergies:
              "Spår av laktos i potatispuré. Potatis, mjölk, smör, Gräddsås *laktosfri grädde, maizena, svampfond, lingon, grönsaksfond, rosmarin, svamp*, salt, svartpeppar, gurka, ättika, socker, lingon, Vatten, SOJA-proteinkoncentrat (18,5%), rapsolja, lök, potatismjöl, kryddor (lökpulver, svartpeppar, vitlök, allkrydda), tomatpuré, salt, äppeljuicekoncentrat, naturliga aromer, geleringsmedel (metylcellulosa), ärtfibrer, färgämne (sockerkulör).",
            createdAt: "2023-11-20T14:26:59.343951+00:00",
            freezabl: null,
            id: "clp70393d62h50buncrwgplyo",
            image: {
              url: "https://media.graphassets.com/ZcV5FwhRCSAjJzxJOIkX",
            },
            ingredients: [
              '1 låda "kött"bullar',
              "1 låda potatismos",
              "1 burk gräddsås",
              "1 burk rårörda lingon",
              "1 burk inlagd gurka",
            ],
            recipeNumber: 2,
            savedIngredients: "Laktosfri grädde, svamp, köttbullar, lingon\n",
            slug: "recept-vegetarian-meatballs-with-mashed-potatoes-cream-sauce-lingonberry-sauce-and-pickled-cucumber",
            startDate: "2023-11-27",
            steg: [
              "Ta fram en stekpanna och en större kastrull. Lägg potatismoset i den större kastrullen med 0.5dl vatten, mjölk eller grädde. Sätt den på medelhög värme och rör om då och då så den inte bränner i botten, se till att moset blir varmt. Samtidigt, stek köttbullarna i lite matfett, gärna smör så de får fin stekyta.",
              "När köttullarna har fått fin yta och stekts i några minuter, häll på gräddsåsen i stekpannan tillsammans med 0.5dl vatten, mjölk eller grädde. Låt köttbullarna sjuda i såsen i några minuter.",
              "Servering: Lägg det varma moset på en tallrik med köttbullar, sås, lingon och gurka.",
            ],
            title:
              "Vegetariska ”kött”bullar med potatispuré, gräddsås, rårörda lingon och pressgurka. ",
            weekNr: 48,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 740, Fat 28g, Protein 37g, Carbohydrate 81g",
        recipeNumber: 2,
        savedIngredients: '"meatballs", potatoes, lingonberries, cucumber.',
        slug: "recept-vegetarian-meatballs-with-mashed-potatoes-cream-sauce-lingonberry-sauce-and-pickled-cucumber",
        startDate: "2023-11-27",
        steg: [
          "Take out a frying pan and a larger pot. Place the mashed potatoes in the larger saucepan with 0.5dl of water, milk or cream. Put it on medium heat and stir occasionally so it doesn't burn at the bottom, make sure the mash gets hot. At the same time, fry the meatballs in a little cooking fat, preferably butter, so they get a nice frying surface.",
          "When the meatballs have a nice surface and have been fried for a few minutes, pour the cream sauce into the frying pan together with 0.5dl of water, milk or cream. Let the meatballs simmer in the sauce for a few minutes.",
          "Serving: Put the warm mash on a plate with meatballs, sauce, lingonberry and cucumber.",
        ],
        title:
          'Vegetarian "meat"balls with mashed potatoes, cream sauce, lingonberry sauce, and pickled cucumber.',
        weekNr: 48,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in liba bread. green lentils, lactose-free cream, galangal, chilli, ginger, crushed tomato, yellow onion, garlic, liba bread *water, salt, yeast, wheat flour*, thyme, garlic, ginger, coriander, rapeseed oil, vegetable stock *parsley, onion, celery, maizena*, sugar.",
        createdAt: "2023-11-20T14:24:14.756462+00:00",
        freezabl: null,
        id: "clp6zzq805yel0buitwgm84v6",
        image: {
          url: "https://media.graphassets.com/Qtpf00U2R6A6iINca7iY",
        },
        ingredients: [
          "1 box of Tikka masala with lentils ",
          "1 package of libabread",
        ],
        localizations: [
          {
            contentAllergies:
              "Räknat per portion / 4, Kcal 743, Kolhydrat 93g, Protein 33g, Fett 26g",
            createdAt: "2023-11-20T14:24:14.756462+00:00",
            freezabl: null,
            id: "clp6zzq805yel0buitwgm84v6",
            image: {
              url: "https://media.graphassets.com/Qtpf00U2R6A6iINca7iY",
            },
            ingredients: [
              "Allergener: Gluten i libabröd. gröna linser, laktosfri grädde, galangal, chili, ingefära, krossad tomat, gullök , vitlök, tibabröd *vatten, salt, jäst, vetemjöl*, timjan, vitlök, rapsolja, grönsaksfond *persilja, lök, selleri, maizena*, socker.",
            ],
            recipeNumber: 3,
            savedIngredients: "Laktosfri grädde, Tikka Masala, vitlök",
            slug: "recept-tikka-masala-dahl-with-green-lentils-and-fried-libabread",
            startDate: "2023-11-27",
            steg: [
              "Ta fram en kastrull och en stekpanna. Värm Tikka dahlen tillsammans med 1 dl vatten eller grädde i kastrullen på medelhög värme så den blir varm. Tips: När den är varm och klar, sänk värmen och dra ner en matsked smör för att få den ännu godare. Stek libabröden i stekpannan på medelhög värme med lite smör för att göra den ännu godare eller lite matolja. ",
              "Servering: Lägg curry dahlen i halvdjup skål, skopa upp den med brödet, alternativt ät det var för sig.",
            ],
            title: "Tikka masala dahl med gröna linser & stekt libabröd.",
            weekNr: 48,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 743, Carbohydrate 93g, Protein 33g, Fat 19g",
        recipeNumber: 3,
        savedIngredients:
          "lactose-free cream, tikka masala, garlic, vegetables in vegetable stock",
        slug: "recept-tikka-masala-dahl-with-green-lentils-and-fried-libabread",
        startDate: "2023-11-27",
        steg: [
          "Take out a saucepan and a frying pan. Heat the curry dahl together with 1 dl of water or cream in the pan on medium heat so that it becomes warm. Tip: When it's hot and ready, lower the heat and add a tablespoon of butter to make it even tastier. Fry the flat bread in the frying pan on medium heat with a bit of butter to make it taste better, or cooking oil.",
          "Serving: Put the Masala dahl in a half-deep bowl, scoop it up with the bread, alternatively eat it separately.",
        ],
        title: "Tikka masala dahl with green lentils & fried libabread.",
        weekNr: 48,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Chickpeas (37%), onion, potato, gluten-free crust flour (rice flour, chickpea flour, corn starch, dextrose), water, potato flakes, garlic, parsley, thickener. Potato wedges - Potato, sunflower oil, modified starch, rice flour, spices, salt, dextrin, maltodextrin, yeast extract, aroma, malt. Broccoli. Remoulade - egg yolk, rapeseed oil, dijon mustard, white wine vinegar, cayenne pepper, curry madras, yellow onion, pickled cucumber, dill and pickled cauliflower",
        createdAt: "2023-11-13T13:59:22.041606+00:00",
        freezabl: null,
        id: "clowz0rmy2mbs0buln6u4rvrr",
        image: {
          url: "https://media.graphassets.com/03KQtwSZSjCHyMNIyuou",
        },
        ingredients: [
          "1 box of potato wedges",
          "1 box of broccoli",
          "1 box of chickpea patties",
          "1 jar of remoulade",
        ],
        localizations: [
          {
            contentAllergies:
              "Kikärtor (37%), lök, potatis, glutenfritt skorpmjöl (rismjöl, kikärtsmjöl, majsstärkelse, dextros), vatten, potatisflingor, vitlök, persilja, förtjockningsmedel. Potatisklyftor - Potatis, solrosolja, modifierad stärkelse, rismjöl, kryddor, salt, dextrin, maltodextrin, jästextrakt, arom, malt. Broccoli. Remoulade - äggula, rapsolja, dijonsenap, vitvinsvinäger, picklad gurka, picklad blomkål, curry madras, gullök, vitlök, socker, salt.\n",
            createdAt: "2023-11-13T13:59:22.041606+00:00",
            freezabl: null,
            id: "clowz0rmy2mbs0buln6u4rvrr",
            image: {
              url: "https://media.graphassets.com/03KQtwSZSjCHyMNIyuou",
            },
            ingredients: [
              "1 låda kikärtsbiffar",
              "1 låda potatisklyftor ",
              "1 burk remouladesås",
              "1 låda broccoli",
            ],
            recipeNumber: 1,
            savedIngredients:
              "Kikärtsbiffar. Potatisklyftor. Blomkål. Gurka. Vitlök. Broccoli. Gullök.\n",
            slug: "recept-crispy-chickpea-patties-with-onion-and-parsley-served-with-marinated-spicy-potato-wedges-our-remoulade-sauce-and-sauteed-broccoli",
            startDate: "2023-11-06",
            steg: [
              "Ta fram 2 stekpannor. Sätt ugnen på 220 grader varmluft. Lägg potatisklyftorna i en ugnsform. Rosta tills det är knaprigt. Stek under tiden kikärtsbiffarna i någon av stekpannorna med lite fett på medelhög värme tills de är knapriga. Stek broccolin med lite matfett på hög värme tills den fått lite färg och krydda efter behov. ",
              "Rör runt i remouladen och servera!",
            ],
            title:
              "Krispiga kikärtsbiffar med lök & persilja. Serveras med marinerad ”spicy” klyftpotatis, vår remouladsås och sauterad broccoli. ",
            weekNr: 47,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 790, Fat 27g, Protein 32.9g, Carbohydrates 87g",
        recipeNumber: 1,
        savedIngredients:
          "Chickpea patties. Potato wedges. Cauliflower. Garlic. Broccoli. Cucumber. yellow onion.",
        slug: "recept-crispy-chickpea-patties-with-onion-and-parsley-served-with-marinated-spicy-potato-wedges-our-remoulade-sauce-and-sauteed-broccoli",
        startDate: "2023-11-06",
        steg: [
          "Take out 2 frying pans. Set the oven to 220 degrees hot air. Place the potato wedges in a baking dish. Roast until crispy. Meanwhile, fry the chickpea steaks in one of the frying pans with a little fat on medium high heat until they are crispy. Fry the broccoli on a high heat until it gets a little color with a little cooking fat and season to taste.",
          "Stir around in the remoulade sauce and serve!",
        ],
        title:
          'Crispy chickpea patties with onion & parsley. Served with marinated "spicy" potato wedges, our remoulade sauce, and sautéed broccoli.',
        weekNr: 47,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Black beans, *panang; Dried red chili 27%, lemongrass, shallots, garlic, salt, kaffir lime leaves, galangal, cumin powder, coriander seeds. Rapeseed oil. Cauliflower. Red bell peppers. Soy/ginger mayo; egg yolk, rapeseed oil, dijon mustard, soy, tomato puré, ginger, sugar, salt, maizena. \n\n",
        createdAt: "2023-11-13T13:57:28.273456+00:00",
        freezabl: null,
        id: "clowyybtt2rg70bui6efo6wx9",
        image: {
          url: "https://media.graphassets.com/DrzADKwSPWHjwIUbSXog",
        },
        ingredients: [
          "1 box of paneng marinated black beans",
          "1 box of basmati rice",
          "1 jar of soy / ginger mayo",
          "1 box of cauliflower / peppers with garlic",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Soja och sesamolja i sojamayon. , basmatiris, rapsolja, svarta bönor, *panang curry *torkad röd chili 28%, citrongräs, vitlök, schalottenlök, salt, kaffir limeblad, galangal, kryddor (korianderfrön, kumminpulver), äggula, dijonsenap, sojasås, sesamolja, tomatpuré, ingefära, vitlök, socker, maizena, paprika, blomkål",
            createdAt: "2023-11-13T13:57:28.273456+00:00",
            freezabl: null,
            id: "clowyybtt2rg70bui6efo6wx9",
            image: {
              url: "https://media.graphassets.com/DrzADKwSPWHjwIUbSXog",
            },
            ingredients: [
              "1 låda av basmatiris",
              "1 låda av marinerade svarta bönor",
              "1 låda blomkål/paprika",
              "1 burk soja/ingefärsmayo",
            ],
            recipeNumber: 2,
            savedIngredients:
              "Panang currypaste, dijonsenap, paprika, blomkål, ingefära, tomatpuré",
            slug: "recept-fried-rice-with-marinated-curry-panang-beans-tangy-soy-and-ginger-mayonnaise-fried-cauliflower-florets-and-garlic-marinated-bell-pepper",
            startDate: "2023-11-06",
            steg: [
              "Ta fram 2 stekpannor eller 1 wokpanna om ni har det. Stek riset i den ena stekpannan på hög värme, rör om då och då så det inte bränns, stek tills det blir varmt och fått lite stekyta. Stek samtidigt blomkålen/paprikan på medelhög värme så den får lite yta. Tillsätt sedan de marinerade svarta bönorna och stek så de får lite yta och bli varma. ",
              "Rör runt i soja/ingefärsmayon och servera.",
            ],
            title:
              "Fried rice med marinerade ”curry-panangbönor”, syrlig soja- och ingefärsmajonnäs, stekta blomkålsbuketter och vitlöksmarinerad paprika. ",
            weekNr: 47,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4. Energy: 812kcal, Carbohydrate 81g, Fat 21g, Protein 37g",
        recipeNumber: 2,
        savedIngredients:
          "Cauliflower. Bell Peppers. Ginger. Dijon mustard, tomato puré, soy sauce. Paneng currypaste.",
        slug: "recept-fried-rice-with-marinated-curry-panang-beans-tangy-soy-and-ginger-mayonnaise-fried-cauliflower-florets-and-garlic-marinated-bell-pepper",
        startDate: "2023-11-06",
        steg: [
          "Take out 2 frying pans. Fry the rice on a high heat so it gets a little frying surface, make sure to stir it around so it doesn't burn. Also fry the cauliflower and paprika on a medium heat, when the vegetables have a frying surface, pour in the marinated black beans so that they become warm and soften up a little.",
          'Stir around in the soy/ginger mayo and then serve. Notice that the ginger can have some "strings" left in the mayo. ',
        ],
        title:
          'Fried rice with marinated "curry-panang beans," tangy soy and ginger mayonnaise, fried cauliflower florets, and garlic-marinated bell pepper.',
        weekNr: 47,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in brioche bread. Lactose in hamburger buns. , Brioche bread *butter, egg yolk, wheat flour, yeast, sourdough, salt*, halloumi, white cabbage, egg yolk, rapeseed oil, Dijon mustard, chilli, cayenne pepper, pickled cucumber, vinegar, sugar, water, leek, mustard seeds, vegetable stock *celery, parsley, yellow onion, garlic, salt, sugar, maizena*, red onion.",
        createdAt: "2023-11-13T13:55:36.205105+00:00",
        freezabl: null,
        id: "clowyvxdi2cqx0brshu8pvz59",
        image: {
          url: "https://media.graphassets.com/mftSicSEQRuQQZ2TSUuH",
        },
        ingredients: [
          "4 pieces of brioche bread",
          "1 box of coleslaw",
          "red onion",
          "1 jar of pickled cucumber",
          "1 package of halloumi",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i briochebröd. Laktos i hamburgarbröd. , Briochebröd *smör, äggula, vetemjöl, jäst, surdeg, salt*, halloumi, vitkål, äggula, rapsolja, dijonsenap, chili, cayennepeppar, ämnesgurka, ättika, socker, vatten, purjolök, senapsfrön, grönsaksfond *selleri, persilja, gullök, vitlök, salt, socker, maizena*, rödlök.",
            createdAt: "2023-11-13T13:55:36.205105+00:00",
            freezabl: null,
            id: "clowyvxdi2cqx0brshu8pvz59",
            image: {
              url: "https://media.graphassets.com/mftSicSEQRuQQZ2TSUuH",
            },
            ingredients: [
              "4st briochebröd ",
              "1 låda med coleslaw",
              "1 paket halloumi",
              "1 burk dillpicklad gurka",
              "rödlök",
            ],
            recipeNumber: 3,
            savedIngredients:
              "vitkål, ämnesgurka, äggula, dijonsenap, grönsaker i grönsaksfond, gurka\n",
            slug: "recept-halloumiburger-with-brioche-bread-from-a-local-bakery-fried-halloumi-herby-and-spicy-yogurt-based-coleslaw-dill-pickled-cucumber-and-sliced-red-onion",
            startDate: "2023-11-06",
            steg: [
              "Ta fram 2 stekpannor. Dela bröden, stek med snittyta ner på medelvärme tills de blir gyllene och krispiga. Stek samtidigt halloumin på medelhög värme med lite matfett så även de blir gyllene och krispiga.",
              "Skär upp rödlöken så tunt som möjligt. Servering: Bottna med ett generöst lager med coleslaw och rödlöken på bottenbrödet. Sedan den picklade ämnesgurkan, toppa med halloumi och sedan brödets topplock.",
            ],
            title:
              "Halloumiburgare med briochebröd från Franska bageriet, stekt halloumi, örtig och het yoghurtbaserad coleslaw, dillpicklad gurka och skuren rödlök.",
            weekNr: 47,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 810, Fat 21g, Carbohydrates 72g, Protein 33g",
        recipeNumber: 3,
        savedIngredients:
          "white cabbage, cucumber, egg yolk, dijon mustard, vegetables in vegetable stock, cucumber",
        slug: "recept-halloumiburger-with-brioche-bread-from-a-local-bakery-fried-halloumi-herby-and-spicy-yogurt-based-coleslaw-dill-pickled-cucumber-and-sliced-red-onion",
        startDate: "2023-11-06",
        steg: [
          "Take out 2 frying pans. Split the brioche bread, fry the cut side down on medium heat until golden and crispy. At the same time, fry the halloumi on medium heat with a little cooking fat so that they also become golden and crispy.",
          "Slice the red onion as thinly as possible. Serving: Top with a generous layer of coleslaw and the red onion on the base bread. Then the pickled dill cucumber, top with halloumi and then the top lid of the bread.",
        ],
        title:
          "Halloumiburger with brioche bread from a local bakery, fried halloumi, herby and spicy yogurt-based coleslaw, dill-pickled cucumber, and sliced red onion.",
        weekNr: 47,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens in the recipe: Lactose in the yogurt and browned butter. , Vreta Yellow peas, butter, parsley, garlic, chili, yogurt, salt, black pepper, cucumber, vinegar, sugar, water, salt, quinoa , Vegetable stock *celery, onion, garlic, cornstarch, sugar, salt*",
        createdAt: "2023-11-06T16:43:34.640404+00:00",
        freezabl: null,
        id: "clon4szat71ye0bul2d0l6vps",
        image: {
          url: "https://media.graphassets.com/goBHou8sQoCG3yGes0jn",
        },
        ingredients: [
          "1 box of yellow peas with browned butter, parsley and garlic",
          "1 box of quinoa ",
          "1 jar of pickled cucumber",
          "1 jar of chili yoghurt",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener i receptet: Laktos i yoghurten och brynta smöret. , Vreta gulärt, smör, persija, vitlök, chili, yoghurt, salt, svartpeppar, gurka, ättika, socker, vatten, salt, quinoa , Grönsaksfond *selleri, lök, vitlök, maizena, socker, salt*\n",
            createdAt: "2023-11-06T16:43:34.640404+00:00",
            freezabl: null,
            id: "clon4szat71ye0bul2d0l6vps",
            image: {
              url: "https://media.graphassets.com/goBHou8sQoCG3yGes0jn",
            },
            ingredients: [
              "1 låda vreta gulärt med brynt smör/persilja/vitlök ",
              "1 låda quinoa",
              "1 burk chiliyoghurt",
              "1 burk inlagd gurka",
            ],
            recipeNumber: 1,
            savedIngredients: "gurka, chili, vitlök, persilja, gulärt\n",
            slug: "recept-yellow-peas-with-browned-herb-butter-charred-chili-yogurt-flavored-quinoa-and-pickled-cucumber",
            startDate: "2023-11-05",
            steg: [
              "Ta fram 2 stekpannor. Stek quineoan i ena pannan på medelhög värme så den blir varm. Sätt den andra stekpannan på hög värme och stek gulärtorna så de får stekyta.\n\n",
              "Rör runt i chiliyoghurten. Häll av pickellagen från gurkan.",
              "Ta fram ett stort fat. Bottna med chiliyoghurten, strö över de stekta gulärtorna, sedan quinoan och sedan den picklade gurkan, ringla gärna över det brynta smöret från ärtorna.\n",
            ],
            title:
              "Vreta gulärt med brynt örtsmör, sotad chiliyoghurt, smaksatt quinoa & picklad gurka.",
            weekNr: 46,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 649, Fat 19g, Protein 34g, Carbohydrates 77g",
        recipeNumber: 1,
        savedIngredients: "cucumber, chilli, garlic, parsley, yellow onion",
        slug: "recept-yellow-peas-with-browned-herb-butter-charred-chili-yogurt-flavored-quinoa-and-pickled-cucumber",
        startDate: "2023-11-05",
        steg: [
          "Take out 2 frying pans. Fry the quineo in one pan on a medium heat soit becomes warm. Put the other frying pan on a high heat and fry the yellow peas with the butter so that they have a frying surface.",
          "Stir in the chili yogurt. Pour off the pickle juice from the cucumber.",
          "Take out a large dish. Top with the chilli yoghurt, sprinkle over the fried yellow peas, then the quinoa and then the pickled cucumber, drizzle over the browned butter from the peas.",
        ],
        title:
          "Yellow peas with browned herb butter, charred chili yogurt, flavored quinoa, and pickled cucumber.",
        weekNr: 46,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "ALLERGENS: Gluten in liba bread. Lactose in grated cheese and Creme fraiche. Liba bread *Wheat flour, water, yeast, sugar, salt, barley malt*. Creme fraiche, parsley, garlic, black pepper, forest mushrooms, mozzarella (lactose), pumpkin seeds.",
        createdAt: "2023-11-06T16:05:32.956193+00:00",
        freezabl: null,
        id: "clon3g2pf4kq40bt56wlz22c5",
        image: {
          url: "https://media.graphassets.com/0s3mlSKzTDmOhwR0uzgO",
        },
        ingredients: [
          "1 box of sautéed mushrooms with parsley and garlic",
          "1 bag of Liba bread",
          "1 jar of creme fraiche ",
          "1 paper jar of pumpkin seeds",
          "1 box of grated mozzarella",
        ],
        localizations: [
          {
            contentAllergies:
              "ALLERGENER: Gluten i libabröd. Laktos i riven ost och Creme fraiche. Libabröd *Vetemjöl, vatten, jäst, socker, salt, kornmalt*. Creme fraiche, persilja, vitlök, svartpeppar, skogschampinjoner, mozzarella (laktos), pumpakärnor.\n",
            createdAt: "2023-11-06T16:05:32.956193+00:00",
            freezabl: null,
            id: "clon3g2pf4kq40bt56wlz22c5",
            image: {
              url: "https://media.graphassets.com/0s3mlSKzTDmOhwR0uzgO",
            },
            ingredients: [
              "1 påse libabröd",
              "1 burk creme fraiche",
              "1 låda sauterad svamp med persilja och vitlök",
              "1 burk pumpapfrön",
              "1 låda riven mozzarella",
            ],
            recipeNumber: 2,
            savedIngredients: "Svamp, persilja, pumpakärnor, vitlök.\n",
            slug: "recept-pizza-bianco-on-crispy-liba-bread-sauteed-forest-mushrooms-from-hakaslaetts-farm-creme-fraiche-garlic-grated-mozzarella-parsley-and-roasted-pumpkin-seeds",
            startDate: "2023-11-05",
            steg: [
              "Sätt ugnen på 240 grader över och undervärme och förvärm en plåt i ugnen. Om ni har en pizzasten - använd den! Annars går en plåt lika bra.\n\n",
              "Lägg libabrödet på ett bakplåtspapper. Bottna med ett lager av crème fraiche. Disponera ut den rivna mozzarellan och även den sauterade svampen med persilja och vitlök.\n\n",
              "Grädda pizzan i ugnen cirka 7 minuter.",
              "Ta ut pizzan från ugnen. Strö över pumpakärnorna på pizzan och servera!",
            ],
            title:
              "Pizza Bianco på krispigt libabröd. Stekta skogschampinjoner från Hakaslätts gård, creme fraiche, vitlök, riven mozzarella, persilja och rostade pumpakärnor. ",
            weekNr: 46,
          },
        ],
        nutritionalValues:
          "Calculated on 4 portions: Energy: 731kcal / portion, Carbohydrate 72g, Protein 34g, Fat 22g.",
        recipeNumber: 2,
        savedIngredients: "Mushrooms, parsley, pumpkin seeds, garlic.",
        slug: "recept-pizza-bianco-on-crispy-liba-bread-sauteed-forest-mushrooms-from-hakaslaetts-farm-creme-fraiche-garlic-grated-mozzarella-parsley-and-roasted-pumpkin-seeds",
        startDate: "2023-11-05",
        steg: [
          "Set the oven to 240 degrees over and under heat and preheat a tray in the oven. If you have a pizza stone - use it! Otherwise, a oven tray works just as well.",
          "Place the Liba bread on a baking sheet. Top with a layer of crème fraiche. Arrange the grated mozzarella and also the sautéed mushrooms with parsley and garlic.",
          "Bake the pizza in the oven for about 7 minutes.",
          "Take the pizza out of the oven. Sprinkle the pumpkin seeds on the pizza and serve!\n",
        ],
        title:
          "Pizza Bianco on crispy liba bread. Sautéed forest mushrooms from Hakaslätts farm, crème fraiche, garlic, grated mozzarella, parsley, and roasted pumpkin seeds.",
        weekNr: 46,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in foccacia, traces of lactose and milk protein in yogurt. , Goulash soup *diced potatoes, soy mince, tomato puree, crushed tomato, vegetable stock, cayenne pepper, cumin, paprika, paprika, water, cornstarch, salt, black pepper, yellow onion, garlic, jalapeño., Foccacia *wheat flour, salt, water, yeast, sourdough, olive oil, olives*, garlic cream *Greek yogurt, garlic*",
        createdAt: "2023-11-06T15:58:15.659244+00:00",
        freezabl: null,
        id: "clon36payupjh0buurva835k8",
        image: {
          url: "https://media.graphassets.com/5tlWuzeZQ66bQ6N5BI6U",
        },
        ingredients: [
          "1 box of gulasch",
          "1 box of focaccia",
          "1 jar of garlic yoghurt",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i foccacia, spår av laktos och mjölkprotein i yoghurt. , Gulaschsoppa *tärnad potatis, sojafärs, tomatpuré, krossad tomat, grönsaksfond, cayennepeppar, kummin, paprikapulver, paprika, vatten, maizena, salt, svartpeppar, gullök, vitlök, jalapeño., Foccacia *vetemjöl, salt, vatten, jäst, surdeg, olivolja, oliver*, vitlökscreme *grekisk yoghurt, vitlök*\n",
            createdAt: "2023-11-06T15:58:15.659244+00:00",
            freezabl: null,
            id: "clon36payupjh0buurva835k8",
            image: {
              url: "https://media.graphassets.com/5tlWuzeZQ66bQ6N5BI6U",
            },
            ingredients: [
              "1 låda gulasch",
              "1 låda focaccia",
              "1 burk vitlöksyoghurt",
            ],
            recipeNumber: 3,
            savedIngredients:
              "perislja, vitlök, potatis, jalapeño, tomatpuré, jäst, gullök, paprika\n",
            slug: "recept-our-goulash-soup-with-sourdough-focaccia-and-garlic-creme-fraiche",
            startDate: "2023-11-05",
            steg: [
              "Ta fram en större kastrull, häll ner gulaschen, tillsätt 3dl vatten och låt den komma upp i värme och sjuda i några minuter. Häll i mer vatten om ni tycker den är för tjock. Ta fram en stekpanna, skiva foccacian relativt tunt och stek den lite på varje sida med lite matfett så den blir lite krispig. Ta fram vitlöksyoghurten och rör om.",
              "Servera! Gulasch i soppskålar, klicka i yoghurt och ät antingen foccacian med något gott tillbehör eller doppa i soppan.",
            ],
            title:
              "Vår Gulaschsoppa med surdegsfocaccia & vitlöks-creme fraiche",
            weekNr: 46,
          },
        ],
        nutritionalValues:
          "Calculated on 4 portions:, Energy Kcal 721, Carbohydrate 81g, Fat 14.7g, Protein 36.2g",
        recipeNumber: 3,
        savedIngredients:
          "parsley, garlic, potato, jalapeño, tomato puree, yeast, yellow onion, paprika\n",
        slug: "recept-our-goulash-soup-with-sourdough-focaccia-and-garlic-creme-fraiche",
        startDate: "2023-11-05",
        steg: [
          "Take out a larger saucepan, pour in the goulash, add 3dl of water and let it come to a boil and simmer for a few minutes. Pour in more water if you think it is too thick. Take out a frying pan, slice the foccacia relatively thin and fry it a little on each side with a little cooking fat so that it becomes a little crispy. Take out the garlic yogurt and stir.",
          "Serve! Goulash in soup bowls, spoon in yogurt and either eat the foccacia with some tasty sides or dip in the soup.",
        ],
        title:
          "Our Goulash soup with sourdough focaccia & garlic crème fraiche",
        weekNr: 46,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in bao buns. Soy sauce in the teriyaki sauce. , Bao buns *read package*, tofu, teriyaki *soy sauce, sesame oil, garlic, tomato puree, ginger, cornstarch, sugar, rice vinegar*, white cabbage, cayenne pepper, bulgur, pumpkin seeds, sunflower seeds, go-cho-jang, green onions, vinegar.",
        createdAt: "2023-10-31T14:29:16.256518+00:00",
        freezabl: null,
        id: "cloefd5dg793l0buq59vtbzcp",
        image: {
          url: "https://media.graphassets.com/29uRr1ULT3emgvQa6xKx",
        },
        ingredients: [
          "1 bag of bao buns",
          "1 package of tofu",
          "1 box of kimchi",
          "1 jar of teriyaki sauce",
          "1/2 jar of roasted seeds",
          "1 box of flavoured bulgur",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i bao buns. Sojasås i teriyakisåsen. , Bao buns *läs förpackning*, tofu, teriyaki *sojasås, sesamolja, vitlök, tomatpuré, ingefära, maizena, socker, risvinäger*, vitkål, cayennepeppar, bulgur, pumpafrön, solrosfrön, go-cho-jang, salladslök, ättika.\n",
            createdAt: "2023-10-31T14:29:16.256518+00:00",
            freezabl: null,
            id: "cloefd5dg793l0buq59vtbzcp",
            image: {
              url: "https://media.graphassets.com/29uRr1ULT3emgvQa6xKx",
            },
            ingredients: [
              "1 paket bao buns",
              "1 paket tofu",
              "1 låda smaksatt bulgur ",
              "1 låda kimchi",
              "1 burk teriyakisås",
            ],
            recipeNumber: 1,
            savedIngredients:
              "vitkål, solrosfrön, ingefära, sesamolja, tomat, dijonsenap, salladslök\n",
            slug: "recept-our-bao-buns-with-homemade-kimchi-of-shredded-cabbage-crispy-tofu-teriyaki-sauce-garlic-roasted-pumpkin-seeds-and-a-side-of-flavored-fluffy-bulgur-copy",
            startDate: "2023-10-29",
            steg: [
              "Två olika sätt finns. Om ni har micro använd den till att ånga bao bunsen på mellanhög styrka tillsammans med ett glas vatten och täcklock i micron. Micra i cirka 1-1.5 minut. Om ni inte har micro; Sätt ugnen på 200 grader varmluft. Koka upp cirka 5dl vatten. Sätt en ugnsplåt längst ner i ugnen och värm den. Under tiden, skiva tofun tunt och stekt på medelhög värme tills de blir krispiga. Värm den smaksatta bulguren i antingen en kastrull eller i en stekpanna.",
              "Lägg bao bunsen på bakplåtspapper på ett galler och sätt in ovanför ugnsplåten. Häll på kokande vatten på ugnsplåten, stäng ugnen fort och låt de ångas i cirka 3 minuter. Låt det svalna lite innan de tas bort från bakplåtspappret.",
              "Servering: Fyll din bao bun genom att först lägga i tofun, sedan kimchin, teriyakisåsen och strö över de rostade fröna. Servera bulguren vid sidan om.",
            ],
            title:
              "Våra bao buns med egen ”kimchi” på strimlad vitkål, krispig tofu, teriyakisås, vitlöksrostade pumpafrön och en side på smaksatt fluffigt matvete. ",
            weekNr: 45,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 770, Fat 28g, Carbohydrate 98g, Protein 35g. Calculated per portion (if all sauces are fully used)\n",
        recipeNumber: 1,
        savedIngredients:
          "white cabbage, sunflower seeds, ginger, sesame oil, tomato, Dijon mustard, green onion",
        slug: "recept-our-bao-buns-with-homemade-kimchi-of-shredded-cabbage-crispy-tofu-teriyaki-sauce-garlic-roasted-pumpkin-seeds-and-a-side-of-flavored-fluffy-bulgur-copy",
        startDate: "2023-10-29",
        steg: [
          "There are two different ways. If you have a microwave, use it to steam the bao buns on medium power together with a glass of water and cover in the microwave. Micro for about 1-1.5 minutes. If you don't have a microwave; Set the oven to 200 degrees hot air. Boil about 5 dl of water. Place an oven tray at the bottom of the oven and heat it. Meanwhile, slice the tofu thinly and fry on medium heat until crispy. Heat the flavored bulgur in either a saucepan or a frying pan.",
          "Place the bao buns on baking paper on a wire rack and place above the baking sheet. Pour boiling water on the baking sheet, close the oven quickly and let them steam for about 3 minutes. Allow to cool slightly before removing from the baking paper.",
          "Serving: Fill your bao bun by first putting in the tofu, then the kimchi, the teriyaki sauce and sprinkle with the toasted seeds. Serve the bulgur on the side.",
        ],
        title:
          "Our bao buns with homemade 'kimchi' of shredded cabbage, crispy tofu, teriyaki sauce, garlic-roasted pumpkin seeds, and a side of flavored fluffy bulgur.",
        weekNr: 45,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Stew *soy strips, soy sauce, lactose-free cream, tarragon, yellow onion, garlic, mushrooms, mushroom stock, salt, black pepper, thyme, rosemary). Basmati rice, rapeseed oil, salt.",
        createdAt: "2023-10-31T14:28:54.017617+00:00",
        freezabl: null,
        id: "cloefco7l50oy0bun7i0m49d6",
        image: {
          url: "https://media.graphassets.com/dl7LOcAKQq8qKPC2NW2g",
        },
        ingredients: ["1 box of tarragon stew", "1 box of basmati rice"],
        localizations: [
          {
            contentAllergies:
              "Gryta *sojastrips, sojasås, laktosfri grädde, dragon, gullök, vitlök, svamp, svampfond, salt, svartpeppar, timjan, rosmarin). Basmatiris, rapsolja, salt.\n",
            createdAt: "2023-10-31T14:28:54.017617+00:00",
            freezabl: null,
            id: "cloefco7l50oy0bun7i0m49d6",
            image: {
              url: "https://media.graphassets.com/dl7LOcAKQq8qKPC2NW2g",
            },
            ingredients: ["1 låda basmatiris", "1 låda dragongryta"],
            recipeNumber: 2,
            savedIngredients:
              "Sojasås, gullök, dragon, sojastrips, laktosfri grädde, vitlök\n",
            slug: "recept-creamy-mushroom-and-tarragon-stew-with-chili-fried-soy-strips-and-basmati-rice-copy",
            startDate: "2023-10-29",
            steg: [
              "Ta fram en stekpanna och en kastrull. Lägg dragongrytan i kastrullen tillsammans med 2dl vatten, mjölk eller grädde och värm den på medelhög värme. Rör om då och då så den inte bränner i botten. Tillsätt mer vätska om ni önskar få lösare konsistens. Stek riset i stekpannan under tiden.",
              "Servera!",
            ],
            title:
              "Krämig svamp-/dragongryta med chilistekta soja-strips & basmatiris.   ",
            weekNr: 45,
          },
        ],
        nutritionalValues:
          "Kcal 749, Fat 24g, Carbohydrates 93g, Protein 38g. Calculated per portion (if all sauces are fully used)",
        recipeNumber: 2,
        savedIngredients:
          "Soy sauce, yellow onion, tarragon, soy strips, lactose-free cream, garlic\n",
        slug: "recept-creamy-mushroom-and-tarragon-stew-with-chili-fried-soy-strips-and-basmati-rice-copy",
        startDate: "2023-10-29",
        steg: [
          "Take out a frying pan and a saucepan. Put the tarragon stew in the saucepan together with 2dl of water, milk or cream and heat it on medium heat. Stir occasionally so it doesn't burn at the bottom. Add more liquid if you want a looser consistency. Meanwhile, fry the rice in the frying pan.",
          "Serve!",
        ],
        title:
          "Creamy mushroom and tarragon stew with chili-fried soy strips & basmati rice.",
        weekNr: 45,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Gluten in gnocchi, lactose in mozzarella, Gnocchi *read packaging*, tomato sauce *tomatoes, chili, vinegar, sugar, salt, black pepper*, pumpkin seeds, sunflower seeds, mozzarella",
        createdAt: "2023-10-31T14:28:29.129035+00:00",
        freezabl: null,
        id: "cloefc5124zlo0bun0a130pv6",
        image: {
          url: "https://media.graphassets.com/HHlHqObQoOwX95KyFaNg",
        },
        ingredients: [
          "1 package of gnocchi",
          "1 box of tomato sauce",
          "1/2 jar of seeds",
          "1 box of mozzarella",
        ],
        localizations: [
          {
            contentAllergies:
              "Gluten i gnocchi, laktos i mozzarella, Gnocchi *läs förpackning* , tomatsås *tomater, chili, vinäger, socker, salt, svartpeppar*, Pumpafrön, solrosfrön, mozzarella",
            createdAt: "2023-10-31T14:28:29.129035+00:00",
            freezabl: null,
            id: "cloefc5124zlo0bun0a130pv6",
            image: {
              url: "https://media.graphassets.com/HHlHqObQoOwX95KyFaNg",
            },
            ingredients: [
              "1 paket potatisgnocchi",
              "1 låda tomatsås",
              "1 burk mozzarella",
              "1 burk rostade frön",
            ],
            recipeNumber: 3,
            savedIngredients: "potatisgnocchi , tomater, chili\n",
            slug: "recept-potato-gnocchi-with-spicy-herby-tomato-sauce-roasted-seeds-and-grated-mozzarella-copy",
            startDate: "2023-10-29",
            steg: [
              "Ta fram en stor kastrull och koka upp vatten och lite salt till gnocchin. Ta fram 2 stekpannor och värm tomatsåsen på medelvärme i en av stekpannorna, se till att den blir varm, sjuder och reduceras lite grann så den blir lite mer trögflytande. Värm den andra stekpannan med lite matfett på medelvärme. Koka gnocchin i vattnet i cirka 2 minuter. Spara 1 dl vatten innan ni silar av gnocchin. Sila av gnocchin men var försiktiga så den inte går sönder!",
              "Sätt den förvärmda stekpannan på hög värme, stek gnocchin i någon minut så den får lite stekyta. Lägg sedan gnocchin i tomatsåsen. Om det inte får plats i en stekpanna, dela upp det på båda stekpannorna, låt de sedan sjuda så gnocchin suger åt sig såsen lite på medelvärme. Under tiden den sjuder. Riv mozzarellan.",
              "Servera. Bottna med gnocchin i tomatsås, strö över den rivna mozzarellan och de rostade fröna.",
            ],
            title:
              "Potatisgnocchi med het, örtig tomatsås, rostade frön & riven mozzarella.",
            weekNr: 45,
          },
        ],
        nutritionalValues:
          "Energy: Kcal 871, Protein 32g, Fat 21g, Carbohydrates 94g. Calculated per portion (if all sauces are fully used)",
        recipeNumber: 3,
        savedIngredients: "potato gnocchi, tomatoes, chili",
        slug: "recept-potato-gnocchi-with-spicy-herby-tomato-sauce-roasted-seeds-and-grated-mozzarella-copy",
        startDate: "2023-10-29",
        steg: [
          "Take out a large saucepan and boil water and a little salt for the gnocchi. Take out 2 frying pans and heat the tomato sauce on medium heat in one of the frying pans, make sure it gets hot, simmers and reduces a little so it becomes a little more viscous. Heat the other frying pan with a little cooking fat on medium heat. Cook the gnocchi in the water for about 2 minutes. Save 1 dl of water before straining the gnocchi. Strain the gnocchi but be careful not to break it!",
          "Put the preheated frying pan on a high heat, fry the gnocchi for a minute or so so that it gets a little frying surface. Then put the gnocchi in the tomato sauce. If it won't fit in one pan, divide it between both pans, then let them simmer so the gnocchi soaks up the sauce a bit over medium heat. Meanwhile it simmers. Grate the mozzarella.",
          "Serve. Top with gnocchi in tomato sauce, sprinkle with grated mozzarella and roasted seeds.",
        ],
        title:
          "Potato gnocchi with spicy, herby tomato sauce, roasted seeds & grated mozzarella.",
        weekNr: 45,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies: "Coming soon! ",
        createdAt: "2023-10-30T13:50:59.135929+00:00",
        freezabl: null,
        id: "clocyk28ktu6j0buqh73olqt5",
        image: {
          url: "https://media.graphassets.com/29uRr1ULT3emgvQa6xKx",
        },
        ingredients: [],
        localizations: [
          {
            contentAllergies: "Kommer snart! ",
            createdAt: "2023-10-30T13:50:59.135929+00:00",
            freezabl: null,
            id: "clocyk28ktu6j0buqh73olqt5",
            image: {
              url: "https://media.graphassets.com/29uRr1ULT3emgvQa6xKx",
            },
            ingredients: [],
            recipeNumber: 1,
            savedIngredients: "Kommer snart! ",
            slug: "recept-our-bao-buns-with-homemade-kimchi-of-shredded-cabbage-crispy-tofu-teriyaki-sauce-garlic-roasted-pumpkin-seeds-and-a-side-of-flavored-fluffy-wheat",
            startDate: "2023-11-06",
            steg: [],
            title:
              "Våra bao buns med egen ”kimchi” på strimlad vitkål, krispig tofu, teriyakisås, vitlöksrostade pumpafrön och en side på smaksatt fluffigt matvete. ",
            weekNr: 45,
          },
        ],
        nutritionalValues: "Coming soon! ",
        recipeNumber: 1,
        savedIngredients: "Coming soon! ",
        slug: "recept-our-bao-buns-with-homemade-kimchi-of-shredded-cabbage-crispy-tofu-teriyaki-sauce-garlic-roasted-pumpkin-seeds-and-a-side-of-flavored-fluffy-wheat",
        startDate: "2023-11-06",
        steg: [],
        title:
          "Our bao buns with homemade 'kimchi' of shredded cabbage, crispy tofu, teriyaki sauce, garlic-roasted pumpkin seeds, and a side of flavored fluffy bulgur.",
        weekNr: 45,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies: "Coming soon! ",
        createdAt: "2023-10-30T13:49:18.184567+00:00",
        freezabl: null,
        id: "clocyhwd7tcqm0bupzuxogmty",
        image: {
          url: "https://media.graphassets.com/dl7LOcAKQq8qKPC2NW2g",
        },
        ingredients: [],
        localizations: [
          {
            contentAllergies: "Kommer snart! ",
            createdAt: "2023-10-30T13:49:18.184567+00:00",
            freezabl: null,
            id: "clocyhwd7tcqm0bupzuxogmty",
            image: {
              url: "https://media.graphassets.com/dl7LOcAKQq8qKPC2NW2g",
            },
            ingredients: [],
            recipeNumber: 2,
            savedIngredients: "Kommer snart! ",
            slug: "recept-creamy-mushroom-and-tarragon-stew-with-chili-fried-soy-strips-and-basmati-rice",
            startDate: "2023-11-06",
            steg: [],
            title:
              "Krämig svamp-/dragongryta med chilistekta soja-strips & basmatiris.   ",
            weekNr: 45,
          },
        ],
        nutritionalValues: "Coming soon! ",
        recipeNumber: 2,
        savedIngredients: "Coming soon! ",
        slug: "recept-creamy-mushroom-and-tarragon-stew-with-chili-fried-soy-strips-and-basmati-rice",
        startDate: "2023-11-06",
        steg: [],
        title:
          "Creamy mushroom and tarragon stew with chili-fried soy strips & basmati rice.",
        weekNr: 45,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies: "Coming soon! ",
        createdAt: "2023-10-30T13:46:48.721402+00:00",
        freezabl: null,
        id: "clocyep0isa3q0bunk95dh1to",
        image: {
          url: "https://media.graphassets.com/HHlHqObQoOwX95KyFaNg",
        },
        ingredients: [],
        localizations: [
          {
            contentAllergies: "Kommer snart! ",
            createdAt: "2023-10-30T13:46:48.721402+00:00",
            freezabl: null,
            id: "clocyep0isa3q0bunk95dh1to",
            image: {
              url: "https://media.graphassets.com/HHlHqObQoOwX95KyFaNg",
            },
            ingredients: [],
            recipeNumber: 3,
            savedIngredients: "Kommer snart! ",
            slug: "recept-potato-gnocchi-with-spicy-herby-tomato-sauce-roasted-seeds-and-grated-mozzarella",
            startDate: "2023-11-06",
            steg: [],
            title:
              "Potatisgnocchi med het, örtig tomatsås, rostade frön & riven mozzarella.",
            weekNr: 45,
          },
        ],
        nutritionalValues: "Coming soon! ",
        recipeNumber: 3,
        savedIngredients: "Coming soon! ",
        slug: "recept-potato-gnocchi-with-spicy-herby-tomato-sauce-roasted-seeds-and-grated-mozzarella",
        startDate: "2023-11-06",
        steg: [],
        title:
          "Potato gnocchi with spicy, herby tomato sauce, roasted seeds & grated mozzarella.",
        weekNr: 45,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Lactose in halloumi. halloumi, basmati rice, lactose-free cream, tomato puree, tomatoes, yellow onion, garlic, chili, paprika, vegetable stock *parsley, garlic, yellow onion, celery, cornstarch, sugar, salt*, cauliflower",
        createdAt: "2023-10-24T10:25:20.681208+00:00",
        freezabl: null,
        id: "clo46khu8ft8g0atf3ld55mw6",
        image: {
          url: "https://media.graphassets.com/pzhhwcgTFGwGtqHQ29wJ",
        },
        ingredients: [
          "1 box of halloumi/cauliflower stroganoff",
          "1 box of basmati rice",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Laktos i halloumi. , halloumi, basmatiris, laktosfri grädde, tomatpuré, tomater, gullök, vitlök, chili, paprika, Grönsaksfond *persilja, vitlök, gullök, selleri, maizena, socker, salt*, blomkål",
            createdAt: "2023-10-24T10:25:20.681208+00:00",
            freezabl: null,
            id: "clo46khu8ft8g0atf3ld55mw6",
            image: {
              url: "https://media.graphassets.com/pzhhwcgTFGwGtqHQ29wJ",
            },
            ingredients: [
              "1 låda basmatiris",
              "1 låda blomkål-/halloumistroganoff",
            ],
            recipeNumber: 1,
            savedIngredients:
              "grönsaker i fond, chili, vitlök, gullök, tomater, halloumi",
            slug: "recept-halloumi-and-cauliflower-stroganoff-with-flavored-basmati-rice-copy",
            startDate: "2023-10-23",
            steg: [
              "Ta fram 1 stekpanna och en större kastrull. Lägg all stroganoff i den större kastrullen tillsammans med 1dl vatten, mjölk eller grädde. Värm sedan stroganoffen på medelhög värme. Se till att den blir varm. Stek riset i den andra stekpannan på medelhög värme, se till att det blir varmt.",
              "Servering: Bottna med riset i en halvdjup tallrik och lägg sedan över halloumistroganoffen.",
            ],
            title: "Halloumi-/blomkålstrogranoff med smaksatt basmatiris.",
            weekNr: 44,
          },
        ],
        nutritionalValues:
          "Kcal 790, Fat 46g, Protein 36g, Carbohydrate 75g. Calculated per portion (if all sauces are fully used)",
        recipeNumber: 1,
        savedIngredients:
          "vegetables in stock, chilli, garlic, yellow onion, tomatoes, halloumi",
        slug: "recept-halloumi-and-cauliflower-stroganoff-with-flavored-basmati-rice-copy",
        startDate: "2023-10-23",
        steg: [
          "Take out 1 frying pan and a larger saucepan. Put all the stroganoff in the larger saucepan together with 1dl of water, milk or cream. Then heat the stroganoff over medium heat. Make sure it gets warm. Fry the rice in the other frying pan over medium heat, making sure it gets hot.",
          "Serving: Place the bottom of the rice in a half-deep plate and then place the halloumi stroganoff on top.",
        ],
        title:
          "Halloumi and cauliflower stroganoff with flavored basmati rice.",
        weekNr: 44,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in pasta, traces of lactose can be found in mushroom sauce, Penne *wheat flour, water*, lactose-free cream, mushrooms, rosemary, thyme, garlic, mushroom stock *shiitake, karl-johan, onion, mushrooms, maizena*, vegetable stock *, parsley, onion, garlic, maizena, sugar*, pumpkin seeds, chives\n",
        createdAt: "2023-10-24T10:25:15.258938+00:00",
        freezabl: true,
        id: "clo46kdmmtt1b0aup3eas6sw1",
        image: {
          url: "https://media.graphassets.com/R3N7LT8rRha0YuA4IIAK",
        },
        ingredients: [
          "1 bag of pasta",
          "1 box of mushroom sauce",
          "1 paper jar of pumpkin seeds",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i pasta, spår av laktos kan finnas i svampsås, Penne *vetemjöl, vatten*, laktosfri grädde, champinjoner, rosmarin, timjan, vitlök, svampfond *shiitake, karl-johan, lök, champinjoner, maizena*, grönsaksfond *, persilja, lök, vitlök, maizena, socker*, pumpakärnor, gräslök",
            createdAt: "2023-10-24T10:25:15.258938+00:00",
            freezabl: true,
            id: "clo46kdmmtt1b0aup3eas6sw1",
            image: {
              url: "https://media.graphassets.com/R3N7LT8rRha0YuA4IIAK",
            },
            ingredients: [
              "1 påse pasta",
              "1 låda svampsås",
              "1 burk rostade pumpafrön",
            ],
            recipeNumber: 2,
            savedIngredients: "svamp, svampfond, vitlök, grädde",
            slug: "recept-mushroom-and-truffle-pasta-pasta-with-roasted-forest-mushrooms-from-hakaslaetts-gardschampinjoner-in-a-creamy-truffle-garlic-and-herb-sauce-topped-with-roasted-pumpkin-seeds-copy",
            startDate: "2023-10-23",
            steg: [
              "Tag fram 2 kastruller. En stor och en lite mindre. Koka upp vatten och lite salt i den större kastrullen. Värm upp svampsåsen under lock i den mindre kastrullen på medelvärme. Tillsätt pastan när vattnet kokar och låt koka i ca 7 minuter. Spara 1 dl pastavatten i en skål innan pastan silas.",
              "Sila pastan i durkslag och lägg tillbaka i den större kastrullen. Sätt på hög värme på plattan. Tillsätt pastavatten, pastan och den varma svampsåsen i den stora kastrullen. Sätt kastrullen på den varma plattan och rör om konstant i botten i cirka 2 minuter tills det blir en krämig, lite trögflytande pasta. Smaksätt med salt & peppar efter tycke.",
            ],
            title:
              "Svamp- och tryffelpasta. Pasta med rostade skogschampinjoner från Hakaslätt i en krämig tryffel-/vitlök och örtsås, samt rostade pumpakärnor. ",
            weekNr: 44,
          },
        ],
        nutritionalValues:
          "Kcal 789, Protein 33g, Fett 32g, Kolhydrat 81g. Calculated per portion (if all sauces are fully used)",
        recipeNumber: 2,
        savedIngredients: "svamp, svampfond, vitlök, grädde",
        slug: "recept-mushroom-and-truffle-pasta-pasta-with-roasted-forest-mushrooms-from-hakaslaetts-gardschampinjoner-in-a-creamy-truffle-garlic-and-herb-sauce-topped-with-roasted-pumpkin-seeds-copy",
        startDate: "2023-10-23",
        steg: [
          "Take out 2 saucepans. One big and one a little smaller. Boil water and a little salt in the larger pot. Heat the mushroom sauce covered in the smaller saucepan over medium heat. Add the pasta when the water boils and let it boil for about 7 minutes. Save 1 dl pasta water in a bowl before straining the pasta.",
          "Strain the pasta in a colander and return to the larger pot. Put on high heat on the plate. Add the pasta water, the pasta and the hot mushroom sauce to the large saucepan. Put the pan on the hot plate and stir constantly at the bottom for about 2 minutes until it becomes a creamy, slightly viscous cream. Season with salt & pepper to taste.",
        ],
        title:
          "Mushroom and truffle pasta. Pasta with roasted forest mushrooms from Hakaslätts Gårdschampinjoner in a creamy truffle, garlic, and herb sauce, topped with roasted pumpkin seeds.",
        weekNr: 44,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in the wraps and lactose in the coleslaw. Grilled wraps *read packaging*, Falafel (Contains chickpeas, water, onion, rapeseed oil, salt, garlic, bicarbonate, coriander, cumin, parsley, turmeric, fenugreek, cardamom, cayenne pepper), red onion, white cabbage, Greek yogurt, oregano, basil, rosemary, go-chu-jang. Carolina reaper mayonnaise *egg, dijon mustard, go-chujang, tomato puree, carolina reaper chili, salt, green onion*. Mango. sunflower seeds. cucumber *vinegar, sugar, salt, water*",
        createdAt: "2023-10-24T10:25:09.344548+00:00",
        freezabl: null,
        id: "clo46k92ruoil0bur1yxko0s0",
        image: {
          url: "https://media.graphassets.com/rDdOkIvlR5q1OJe7op4T",
        },
        ingredients: [
          "1 bag of falafel",
          "1 bag of grilled wrps",
          "1 jar of caroina reaper mayonaise",
          "1 jar of coleslaw with mango",
          "red onion",
          "1 jar of pickled cucumber",
          "1 paper jar of sunflower seeds",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i wrapsen och laktos i coleslawen. Grilled wraps *läs förpackning*, Falafel (Innehåller kikärtor, vatten, lök, rapsolja, salt, vitlök, bikarbonat, koriander, spiskummin, persilja, gurkmeja, bockhornsklöver, kardemumma, cayennepeppar), rödlök, vitkål, grekisk yoghurt, oregano, basilika, rosmarin, go-chu-jang. Carolina reaper majonnäs *ägg, dijonsenap, go-chujang, tomatpuré, carolina reaper chili, salt, salladslök*. Mango. solrosfrön. gurka *ättika, socker, salt, vatten*",
            createdAt: "2023-10-24T10:25:09.344548+00:00",
            freezabl: null,
            id: "clo46k92ruoil0bur1yxko0s0",
            image: {
              url: "https://media.graphassets.com/rDdOkIvlR5q1OJe7op4T",
            },
            ingredients: [
              "1 påse falafel",
              "1 burk coleslaw med mango",
              "1 burk carolina reaper majonnäs",
              "1 burk solrosfrön",
              "1 påse grilled wraps",
              "rödlök",
              "1 burk inlagd saltgurka",
            ],
            recipeNumber: 3,
            savedIngredients:
              "mango, rödlök, vitkål, carolina reaper, dijonsenap, ägg, gurka,",
            slug: "recept-falafel-roll-in-a-grilled-wrap-with-carolina-reaper-mayonnaise-yogurt-based-coleslaw-with-pickled-mango-roasted-sunflower-seeds-crispy-falafel-sliced-red-onion-and-dill-pickle-copy",
            startDate: "2023-10-23",
            steg: [
              "Ta fram 2 stekpannor. Stek falafeln med lite matolja på medelhög värme så de blir krispiga och får lite färg. Stek samtidigt wrapsen på medelhög värme ett par sekunder på varje sida så de blir varma.",
              "Skiva rödlöken så tunt som möjligt. Häll av gurkspadet, rör runt i coleslawen och i majonnäsen.",
              "Servera: Ta ett wrapbröd, bottna med coleslaw, sedan löken, gurkan, solrosfröna, falafeln och sist ringla över majonnäsen (obs kan upplevas som stark så bestäm hur mycket ni önskar!)",
            ],
            title:
              " Falafelrulle på grilled wrap med carolina reaper majonnäs, yoghurtbaserad coleslaw med picklad mango, rostade solrosfrön, krispig falafel, skivad rödlök & saltgurka.",
            weekNr: 44,
          },
        ],
        nutritionalValues:
          "Kcal 793, Protein 38g, Fat 24g, Carbohydrates 89g. Calculated per portion (if all sauces are fully used)",
        recipeNumber: 3,
        savedIngredients:
          "mango, red onion, white cabbage, carolina reaper, dijon mustard, egg, cucumber,",
        slug: "recept-falafel-roll-in-a-grilled-wrap-with-carolina-reaper-mayonnaise-yogurt-based-coleslaw-with-pickled-mango-roasted-sunflower-seeds-crispy-falafel-sliced-red-onion-and-dill-pickle-copy",
        startDate: "2023-10-23",
        steg: [
          "Take out 2 frying pans. Fry the falafel with a little cooking oil on a medium heat so that they become crispy and get a little color. At the same time, fry the wraps on medium heat for a couple of seconds on each side so that they are warm.",
          "Slice the red onion as thinly as possible. Pour off the cucumber pickle juice, stir in the coleslaw and the mayonnaise.",
          "Serve: Take a wrap bread, cover with coleslaw, then the onion, cucumber, sunflower seeds, falafel and finally drizzle over the mayonnaise (note: it can be perceived as strong, so decide how much you want!)",
        ],
        title:
          "Falafel roll in a grilled wrap with Carolina Reaper mayonnaise, yogurt-based coleslaw with pickled mango, roasted sunflower seeds, crispy falafel, sliced red onion & dill pickle.",
        weekNr: 44,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergies: Traces of lactose in feta cheese and yoghurt. Carrots. Misopaste. Honey. Jalapeño. Quinoa. Rapeseed oil. Greek yoghurt. Dill. Vinegar. Cucumber. Sugar. Feta cheese. Sunflower seeds. Pumpkin seeds. ",
        createdAt: "2023-10-24T10:00:35.665157+00:00",
        freezabl: null,
        id: "clo45oo19tqxn0burerj8os4n",
        image: {
          url: "https://media.graphassets.com/kczpvnZQpiHsNs5OjQ1w",
        },
        ingredients: [
          "1 box of marinated carrots",
          "1 box of quinoa with jalapeño",
          "1 jar of dill yoghurt",
          "1 jar of pickled cucumber",
          "1 jar of feta cheese",
          "1 jar of roasted seeds",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergier: Spår av laktos i fetaost och yoghurt. Morötter. Misopaste. Honung. Jalapeño. Quinoa. Rapsolja. grekisk yoghurt. Dill. Vinäger. Gurka. Socker. Fetaost. Solrosfrön. Pumpafrön.",
            createdAt: "2023-10-24T10:00:35.665157+00:00",
            freezabl: null,
            id: "clo45oo19tqxn0burerj8os4n",
            image: {
              url: "https://media.graphassets.com/kczpvnZQpiHsNs5OjQ1w",
            },
            ingredients: [
              "1 låda fetaost",
              "1 låda quinoa med jalapeño",
              "1 låda marinerade morötter",
              "1 burk picklad gurka",
              "1 burk rostade frön",
            ],
            recipeNumber: 1,
            savedIngredients: "Morötter. Yoghurt. Miso. Dill. Gurka.\n",
            slug: "recept-miso-and-honey-roastted-carrots-with-tangy-dill-yogurt-pickled-cucumber-crumbled-feta-cheese-jalapeno-marinated-quinoa-and-roasted-seeds",
            startDate: "2023-10-02",
            steg: [
              "1. Sätt ugnen på 220 grader varmluft. Lägg morötterna i en ugnsfast form. Rosta av i cirka 12 minuter. Under tiden, värm quinoan i en kastrull med 1dl vatten och värm de under omrörning på medelhög värme tills de blir klara och varma.\n\n",
              "Häll av spadet från fetaosten och gurkan.\n\n",
              "Servering: Ta fram ett stort serveringsfat. Bottna med quinoan, sedan strö över morötterna. Ringla över dillyoghurten, disponera ut den inlagda gurkan, smula över fetaosten och strö sedan över solroskärnorna.",
            ],
            title:
              "Miso och honungsrostade morötter med syrlig dillyoghurt, picklad gurka, smulad fetaost, jalapeñomarinerad quinoa & rostade frön.",
            weekNr: 42,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 721, Fat 26g, Protein 34g, Carbohydrates 88g",
        recipeNumber: 1,
        savedIngredients: "Carrots. Yoghurt. Miso. Dill. Cucumber. ",
        slug: "recept-miso-and-honey-roastted-carrots-with-tangy-dill-yogurt-pickled-cucumber-crumbled-feta-cheese-jalapeno-marinated-quinoa-and-roasted-seeds",
        startDate: "2023-10-02",
        steg: [
          "1. Set the oven to 220 degrees hot air. Place the carrots in an ovenproof tray. Roast for about 12 minutes. In the meantime, heat the quinoa in a pan with 1dl of water and heat while stirring on a medium heat until they become clear and warm.",
          "2. Remove the pickle water from the feta cream jar and the cucumber.",
          "3. Serving: Take out a large serving dish. Ground with the quinoa, then sprinkle over the carrots. Drizzle over the dill yoghurt, spread out the pickled cucumber, crumble over the feta cheese and then sprinkle over the roasted seeds.\n",
        ],
        title:
          "Miso and honey-roasted carrots with tangy dill yogurt, pickled cucumber, crumbled feta cheese, jalapeño-marinated quinoa & roasted seeds.",
        weekNr: 42,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "*chickpea patties are glutenfree aswell.* Patties -Chickpeas (37%), onion, potato, gluten-free crust flour (rice flour, chickpea flour, corn starch, dextrose), water, potato flakes, garlic, parsley, thickener. Potato wedges - Potatoes, sunflower oil, modified starch, rice flour, spices, salt, dextrin, maltodextrin, yeast extract, flavouring, malt. Broccoli. Green garlic mayo - egg yolk, dijon mustard, vinegar, rapeseed oil, onion, green onion, garlic. ",
        createdAt: "2023-10-24T10:00:14.101199+00:00",
        freezabl: null,
        id: "clo45o7c2evkc0atfj2webt43",
        image: {
          url: "https://media.graphassets.com/03KQtwSZSjCHyMNIyuou",
        },
        ingredients: [
          "1 box of chickpea patties",
          "1 box of potato wedges",
          "1 jar of green garlic mayo",
          "1 box of broccoli",
          "1 jar of soy marinade ",
        ],
        localizations: [
          {
            contentAllergies:
              "Kikärtor (37%), lök, potatis, glutenfritt skorpmjöl (rismjöl, kikärtsmjöl, majsstärkelse, dextros), vatten, potatisflingor, vitlök, persilja, förtjockningsmedel. Potatisklyftor - Potatis, solrosolja, modifierad stärkelse, rismjöl, kryddor, salt, dextrin, maltodextrin, jästextrakt, arom, malt. Broccoli. Grön vitlöksmajo - äggula, dijonsenap, vinäger, rapsolja, lök, salladslök, vitlök.",
            createdAt: "2023-10-24T10:00:14.101199+00:00",
            freezabl: null,
            id: "clo45o7c2evkc0atfj2webt43",
            image: {
              url: "https://media.graphassets.com/03KQtwSZSjCHyMNIyuou",
            },
            ingredients: [
              "1 låda kikärtsbiffar",
              "1 låda potatisklyftor",
              "1 burk green garlic majonnäs ",
              "1 låda broccoli",
              "1 burk sojamarinad",
            ],
            recipeNumber: 2,
            savedIngredients:
              "Kikärtsbiffar. Potatisklyftor. Salladslök. Vitlök. Broccoli. ",
            slug: "recept-crispy-chickpea-pattiies-with-onion-and-parsley-served-with-marinated-spicy-potato-wedges-green-garlic-mayo-and-sauteed-broccoli",
            startDate: "2023-10-02",
            steg: [
              "1. Ta fram 2 stekpannor. Sätt ugnen på 220 grader varmluft. Lägg potatisklyftorna i en ugnsform. Rosta tills det är knaprigt. Stek under tiden kikärtsbiffarna i någon av stekpannorna med lite fett på medelhög värme tills de är knapriga. Stek broccolin på hög värme tills den fått lite färg. Sänk värmen till noll och ringla över sojamarinaden och täck broccolin.",
              "2. Rör runt i green garlic majonnäsen och servera! ",
            ],
            title:
              "Krispiga kikärtsbiffar med lök & persilja. Serveras med marinerad ”spicy” klyftpotatis, green garlic mayo & sauterad broccoli. ",
            weekNr: 42,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 890, Fat 34g, Protein 32.9g, Carbohydrates 97g\n\n",
        recipeNumber: 2,
        savedIngredients:
          "Chickpea patties. Spicy potato wedges. Broccoli. Garlic. Green onion. Onion. ",
        slug: "recept-crispy-chickpea-pattiies-with-onion-and-parsley-served-with-marinated-spicy-potato-wedges-green-garlic-mayo-and-sauteed-broccoli",
        startDate: "2023-10-02",
        steg: [
          "1. Bring forward 2 frying pans. Turn the oven to 220 degrees hot air. Place the potato wedges in a oven tray. Bake until crispy. Meanwhile, fry the chickpea patties in one of the frying pan with some grease on medium high heat until cripsy. Fry the broccoli on high heat until it gets some color. Turn down the heat to zero and drizzle over the soy marinade and coat the broccoli. ",
          "2. Stir around the green garlic mayo and then serve!",
        ],
        title:
          "Crispy chickpea patties with onion & parsley. Served with marinated 'spicy' potato wedges, green garlic mayo, and sautéed broccoli. ",
        weekNr: 42,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in pasta. Lactose in the garlic cream, Pasta *wheat flour, water*, minced soy, black pepper, thyme, tomatoes, zucchini, aubergine, parsnip, carrot, onion, garlic, vegetable stock *celery, parsley, garlic, yellow onion, maziena*, chili. Sponge. Sour cream, garlic. Info: The Bolognese has been frozen. We recommend that if you want a lunch box, transfer unheated bolognese to the lunch box before you heat everything, to be on the safe side. Do not refreeze the bolognese.",
        createdAt: "2023-10-24T09:59:49.538798+00:00",
        freezabl: null,
        id: "clo45noeiev430atfsiwozcrq",
        image: {
          url: "https://media.graphassets.com/1hwkJcZQT2C5UXcNYFaf",
        },
        ingredients: [
          "1 box of bolognese",
          "1 bag of pasta",
          "1 jar of garlic sour cream",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i pasta. Laktos i vitlökscrémen, Pasta *vetemjöl, vatten*, sojafärs, svartpeppar, timjan, tomater, zucchini, aubergine, palsternacka, morot, lök, vitlök, grönsaksfond *selleri, persilja, vitlök, gullök, maziena*, chili. Svamp. Gräddfil, vitlök., Info: Bolognesen har varit fryst. Vi rekommenderar om ni önskar matlåda att föra över ovärmd bolognese till matlådan innan ni värmer på allt, för att vara på säkra sidan. Frys helst inte om bolognesen.",
            createdAt: "2023-10-24T09:59:49.538798+00:00",
            freezabl: null,
            id: "clo45noeiev430atfsiwozcrq",
            image: {
              url: "https://media.graphassets.com/1hwkJcZQT2C5UXcNYFaf",
            },
            ingredients: [
              "1 låda bolognese",
              "1 påse pasta",
              "1 burk vitlöksgräddfil",
            ],
            recipeNumber: 3,
            savedIngredients:
              "Tomat, zucchini, vitlök, aubuergine, svamp, grönsaker i fond, maizena.",
            slug: "receptt-our-herby-signature-bolognese-with-penne-pasta-and-garlic-sour-cream",
            startDate: "2023-10-02",
            steg: [
              "1. Lägg bolognese i en kastrull och sätt på medelhög värme, se till att den blir riktigt varm. Sätt på ytterligare en kastrull med pastavatten. När vattnet kokar gå i med pastan och koka i cirka 7 minuter. Spara 2dl pastavatten innan du silar av pastan. Sila av.\n\n",
              "2. Tillsätt 2dl pastavatten i bolognesen. Låt det sjuda tills den blir krämig. Häll sedan ner pastan i bolgonesen och rör om. Rör runt i vitlöksgräddfilen och ringla över. Servera!\n\n",
            ],
            title:
              "Vår örtiga signaturbolognese med pasta Penne & vitlöksgräddfil.",
            weekNr: 42,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 812, Fat 26g, Protein 38.3g, Carbohydrates 112g",
        recipeNumber: 3,
        savedIngredients:
          "Tomato, zucchini, garlic, aubuergine, mushrooms, vegetables in stock, maizena.",
        slug: "receptt-our-herby-signature-bolognese-with-penne-pasta-and-garlic-sour-cream",
        startDate: "2023-10-02",
        steg: [
          "1. Put the bolognese in a saucepan and put on medium heat, make sure it gets really hot. Add another pan of pasta water. When the water boils, add the pasta and cook for about 6 minutes. Save 2dl of pasta water before straining the pasta. Strain off.",
          "2. Add 2dl of pasta water to the bolognese. Let it simmer until it becomes creamy. Then pour the pasta into the bolgonese and stir. Place the bolognese with the pasta in a bowl. Stir the garlic sour cream and ringle over the bolognese in the bowl. Serve!",
        ],
        title:
          "Our herby signature Bolognese with Penne pasta & garlic sour cream. ",
        weekNr: 42,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies: "Coming soon! ",
        createdAt: "2023-10-23T14:36:47.70771+00:00",
        freezabl: null,
        id: "clo3040du5owr0buqy6tg9c3x",
        image: {
          url: "https://media.graphassets.com/pzhhwcgTFGwGtqHQ29wJ",
        },
        ingredients: [],
        localizations: [
          {
            contentAllergies: "Kommer snart! ",
            createdAt: "2023-10-23T14:36:47.70771+00:00",
            freezabl: null,
            id: "clo3040du5owr0buqy6tg9c3x",
            image: {
              url: "https://media.graphassets.com/pzhhwcgTFGwGtqHQ29wJ",
            },
            ingredients: [],
            recipeNumber: 1,
            savedIngredients: "Kommer snart! ",
            slug: "recept-halloumi-and-cauliflower-stroganoff-with-flavored-basmati-rice",
            startDate: "2023-10-16",
            steg: [],
            title: "Halloumi-/blomkålstrogranoff med smaksatt basmatiris.",
            weekNr: 44,
          },
        ],
        nutritionalValues: "Coming soon! ",
        recipeNumber: 1,
        savedIngredients: "Coming soon! ",
        slug: "recept-halloumi-and-cauliflower-stroganoff-with-flavored-basmati-rice",
        startDate: "2023-10-16",
        steg: [],
        title:
          "Halloumi and cauliflower stroganoff with flavored basmati rice.",
        weekNr: 44,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies: "Coming soon! ",
        createdAt: "2023-10-23T14:34:04.1877+00:00",
        freezabl: null,
        id: "clo300i8e5jea0auxju4kgmch",
        image: {
          url: "https://media.graphassets.com/R3N7LT8rRha0YuA4IIAK",
        },
        ingredients: [],
        localizations: [
          {
            contentAllergies: "Kommer snart! ",
            createdAt: "2023-10-23T14:34:04.1877+00:00",
            freezabl: null,
            id: "clo300i8e5jea0auxju4kgmch",
            image: {
              url: "https://media.graphassets.com/R3N7LT8rRha0YuA4IIAK",
            },
            ingredients: [],
            recipeNumber: 2,
            savedIngredients: "Kommer snart! ",
            slug: "recept-mushroom-and-truffle-pasta-pasta-with-roasted-forest-mushrooms-from-hakaslaetts-gardschampinjoner-in-a-creamy-truffle-garlic-and-herb-sauce-topped-with-roasted-pumpkin-seeds",
            startDate: "2023-10-16",
            steg: [],
            title:
              "Svamp- och tryffelpasta. Pasta med rostade skogschampinjoner från Hakaslätt i en krämig tryffel-/vitlök och örtsås, samt rostade pumpakärnor. ",
            weekNr: 44,
          },
        ],
        nutritionalValues: "Coming soon! ",
        recipeNumber: 2,
        savedIngredients: "Coming soon! ",
        slug: "recept-mushroom-and-truffle-pasta-pasta-with-roasted-forest-mushrooms-from-hakaslaetts-gardschampinjoner-in-a-creamy-truffle-garlic-and-herb-sauce-topped-with-roasted-pumpkin-seeds",
        startDate: "2023-10-16",
        steg: [],
        title:
          "Mushroom and truffle pasta. Pasta with roasted forest mushrooms from Hakaslätts Gårdschampinjoner in a creamy truffle, garlic, and herb sauce, topped with roasted pumpkin seeds.",
        weekNr: 44,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies: "Coming soon! ",
        createdAt: "2023-10-23T14:31:23.892304+00:00",
        freezabl: null,
        id: "clo2zx2ig5imo0augse51qqbh",
        image: {
          url: "https://media.graphassets.com/rDdOkIvlR5q1OJe7op4T",
        },
        ingredients: [],
        localizations: [
          {
            contentAllergies: "Kommer snart! ",
            createdAt: "2023-10-23T14:31:23.892304+00:00",
            freezabl: null,
            id: "clo2zx2ig5imo0augse51qqbh",
            image: {
              url: "https://media.graphassets.com/rDdOkIvlR5q1OJe7op4T",
            },
            ingredients: [],
            recipeNumber: 3,
            savedIngredients: "Kommer snart! ",
            slug: "recept-falafel-roll-in-a-grilled-wrap-with-carolina-reaper-mayonnaise-yogurt-based-coleslaw-with-pickled-mango-roasted-sunflower-seeds-crispy-falafel-sliced-red-onion-and-dill-pickle",
            startDate: "2023-10-16",
            steg: [],
            title:
              " Falafelrulle på grilled wrap med carolina reaper majonnäs, yoghurtbaserad coleslaw med picklad mango, rostade solrosfrön, krispig falafel, skivad rödlök & saltgurka.",
            weekNr: 44,
          },
        ],
        nutritionalValues: "Coming soon! ",
        recipeNumber: 3,
        savedIngredients: "Coming soon! ",
        slug: "recept-falafel-roll-in-a-grilled-wrap-with-carolina-reaper-mayonnaise-yogurt-based-coleslaw-with-pickled-mango-roasted-sunflower-seeds-crispy-falafel-sliced-red-onion-and-dill-pickle",
        startDate: "2023-10-16",
        steg: [],
        title:
          "Falafel roll in a grilled wrap with Carolina Reaper mayonnaise, yogurt-based coleslaw with pickled mango, roasted sunflower seeds, crispy falafel, sliced red onion & dill pickle.",
        weekNr: 44,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergies: Lactos in potato mash. Potatoes, milk, butter, cream sauce *lactose-free cream, cornstarch, mushroom stock, lingonberry, vegetable stock, rosemary, mushroom*, salt, black pepper, cucumber, vinegar, sugar, lingonberry, water, SOYA protein concentrate (18.5%), rapeseed oil, onion, potato flour, spices (onion powder, black pepper, garlic, allspice), tomato puree, salt, apple juice concentrate, natural flavors, gelling agent (methylcellulose), pea fiber, coloring (sugar color).",
        createdAt: "2023-10-17T09:01:35.183318+00:00",
        freezabl: null,
        id: "clnu3htkempxb0buu6j1iswqt",
        image: {
          url: "https://media.graphassets.com/ZcV5FwhRCSAjJzxJOIkX",
        },
        ingredients: [
          '1 box of "meatballs"',
          "1 box of potato mash",
          "1 jar of cream sauce",
          "1 jar of lingonberries",
          "1 jar of pickled cucumber",
        ],
        localizations: [
          {
            contentAllergies:
              "Spår av laktos i potatispuré. Potatis, mjölk, smör, Gräddsås *laktosfri grädde, maizena, svampfond, lingon, grönsaksfond, rosmarin, svamp*, salt, svartpeppar, gurka, ättika, socker, lingon, Vatten, SOJA-proteinkoncentrat (18,5%), rapsolja, lök, potatismjöl, kryddor (lökpulver, svartpeppar, vitlök, allkrydda), tomatpuré, salt, äppeljuicekoncentrat, naturliga aromer, geleringsmedel (metylcellulosa), ärtfibrer, färgämne (sockerkulör).\n",
            createdAt: "2023-10-17T09:01:35.183318+00:00",
            freezabl: null,
            id: "clnu3htkempxb0buu6j1iswqt",
            image: {
              url: "https://media.graphassets.com/ZcV5FwhRCSAjJzxJOIkX",
            },
            ingredients: [
              '1 låda "köttbullar"',
              "1 låda potatispuré",
              "1 burk rårörda lingon",
              "1 burk inlagd gurka",
              "1 burk gräddsås",
            ],
            recipeNumber: 1,
            savedIngredients:
              '"köttbullar", potatis, lingon, gurka, laktosfri grädde\n',
            slug: "recept-our-vegetarian-meatballs-with-mashed-potatoes-cream-sauce-lingonberries-and-pickled-cucumber-copy",
            startDate: "2023-10-09",
            steg: [
              "Ta fram en stekpanna och en större kastrull. Lägg potatismoset i den större kastrullen med 0.5dl vatten, mjölk eller grädde. Sätt den på medelhög värme och rör om då och då så den inte bränner i botten, se till att moset blir varmt. Samtidigt, stek köttbullarna i lite matfett, gärna smör så de får fin stekyta.",
              "När köttullarna har fått fin yta och stekts i några minuter, häll på gräddsåsen i stekpannan tillsammans med 0.5dl vatten, mjölk eller grädde. Låt köttbullarna sjuda i såsen i några minuter.\n\n",
              "Servering: Lägg det varma moset på en tallrik med köttbullar, sås, lingon och gurka.",
            ],
            title:
              "Vegetariska köttbullar med potatispuré, gräddsås, rårörda lingon & inlagd gurka. ",
            weekNr: 43,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 740, Fat 28g, Protein 37g, Carbohydrate 81g",
        recipeNumber: 1,
        savedIngredients:
          '"meatballs", potatoes, lingonberries, cucumber, lactose-free cream',
        slug: "recept-our-vegetarian-meatballs-with-mashed-potatoes-cream-sauce-lingonberries-and-pickled-cucumber-copy",
        startDate: "2023-10-09",
        steg: [
          "Take out a frying pan and a larger pot. Place the mashed potatoes in the larger saucepan with 0.5dl of water, milk or cream. Put it on medium heat and stir occasionally so it doesn't burn at the bottom, make sure the mash gets hot. At the same time, fry the meatballs in a little cooking fat, preferably butter, so they get a nice frying surface.",
          "When the meatballs have a nice surface and have been fried for a few minutes, pour the cream sauce into the frying pan together with 0.5dl of water, milk or cream. Let the meatballs simmer in the sauce for a few minutes.",
          "Servering: Lägg det varma moset på en tallrik med köttbullar, sås, lingon och gurka.",
        ],
        title:
          "Our vegetarian meatballs with mashed potatoes, cream sauce, lingonberries, & pickled cucumber.",
        weekNr: 43,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in tortilla. Lactose in cream. , Tortilla *read packaging*, black beans, yellow onion, corn kernels, thyme, garlic, salt, black pepper, rapeseed oil, red onion, red cabbage, carrot, vinegar, sugar, peanuts, egg yolk, dijon mustard, chili, cayenne pepper, crème fraiche, garlic",
        createdAt: "2023-10-17T09:01:20.332889+00:00",
        freezabl: null,
        id: "clnu3hi08mpp30buua7n46kto",
        image: {
          url: "https://media.graphassets.com/jh1NxrLRM6NmI5mspWjo",
        },
        ingredients: [
          "1 bag of grilled tortilla",
          "1 box of black bean frito",
          "1 jar of chilimayo",
          "1 jar of garlic sour cream",
          "1 paper jar of crushed peanuts",
          "1 jar of pickled onion/red cabbage/carrot",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i tortilla. Laktos i créme. , Tortilla *läs förpackning*, svarta bönor , gul lök , majskorn, timjan, vitlök, salt, Svartpeppar, rapsolja, rödlök, rödkål, morot, ättika, socker, jordnötter, äggula, dijonsenap, chili, cayennepeppar, crème fraiche, vitlök,\n",
            createdAt: "2023-10-17T09:01:20.332889+00:00",
            freezabl: null,
            id: "clnu3hi08mpp30buua7n46kto",
            image: {
              url: "https://media.graphassets.com/jh1NxrLRM6NmI5mspWjo",
            },
            ingredients: [
              "1 låda black frito",
              "1 burk chilimajonnäs",
              "1 burk rödkål/morot/rödlök",
              "1 burk vitlöks creme fraiche",
              "1 burk jordnötter",
              "1 paket grillad tortilla",
            ],
            recipeNumber: 2,
            savedIngredients:
              "rödlök, gullök, rödkål, morot, vitlök, majs, persilja, chili, dijonsenap",
            slug: "recept-taco-with-black-bean-frito-fried-yellow-onion-and-herbed-corn-pickled-red-cabbage-and-carrot-crushed-peanuts-garlic-cream-and-chili-mayonnaise-copy",
            startDate: "2023-10-09",
            steg: [
              "Ta fram 2 stekpannor. Sätt den ena på hög värme. När den är varm stek bönorna/majsen/löken så den får lite stekyta och blir varm, rör runt så det inte bränner. Sätt den andra stekpannan på medelhög värme och stek tortillan cirka 10 sekunder på varje sida. Eller värm tortillan i micron.",
              "Servering: Blanda runt i vitlökscrémen. Häll av spadet från rödlöken/rödkålen/moroten. Ta sedan en tortilla, bottna med ett lager chilimayo, sedan bönmixen, lägg på den picklade rödlöken/moroten, ringla över vitlökscrémen och strö sedan över jordnötterna.",
            ],
            title:
              "Taco med black bean Frito med stekt gullök och örtig majs, picklad rödkål- och morot, krossade jordnötter, vitlökscréme och chilimajonnäs.",
            weekNr: 43,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 690, Protein 36g, Fat 42g, Carbohydrates 81g",
        recipeNumber: 2,
        savedIngredients:
          "red onion, yellow onion, red cabbage, carrot, garlic, corn, parsley, chili, Dijon mustard",
        slug: "recept-taco-with-black-bean-frito-fried-yellow-onion-and-herbed-corn-pickled-red-cabbage-and-carrot-crushed-peanuts-garlic-cream-and-chili-mayonnaise-copy",
        startDate: "2023-10-09",
        steg: [
          "Take out 2 frying pans. Put one on high heat. When it's hot, fry the beans/corn/onion so it gets some cooking surface and gets hot, stirring so it doesn't burn. Place the second frying pan on medium heat and fry the tortilla for about 10 seconds on each side. Or heat the tortilla in the microwave.",
          "Serving: Mix in the garlic cream. Remove the pickle juice from the red onion/red cabbage/carrot. Then take a tortilla, cover with a layer of chili mayo, then the bean mix, add the pickled red onion/carrot, drizzle over the garlic cream and then sprinkle over the peanuts.\n",
        ],
        title:
          "Taco with black bean Frito, fried yellow onion and herbed corn, pickled red cabbage & carrot, crushed peanuts, garlic cream, & chili mayonnaise.",
        weekNr: 43,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in liba bread. green lentils, lactose-free cream, galangal, chilli, ginger, crushed tomato, yellow onion, garlic, liba bread *water, salt, yeast, wheat flour*, thyme, garlic, rapeseed oil, vegetable stock *parsley, onion, celery, maizena*, sugar.",
        createdAt: "2023-10-17T09:01:05.43355+00:00",
        freezabl: null,
        id: "clnu3h6izmxev0atebizy2lek",
        image: {
          url: "https://media.graphassets.com/xxaA3rF6RrHoGCDkF6zn",
        },
        ingredients: [
          "1 box of curry dahl",
          "1 bag of flat bread",
          "1 jar of garlic and rosemary oil",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i libabröd. gröna linser, laktosfri grädde, galangal, chili, ingefära, krossad tomat, gullök , vitlök, tibabröd *vatten, salt, jäst, vetemjöl*, timjan, vitlök, rapsolja, grönsaksfond *persilja, lök, selleri, maizena*, socker.",
            createdAt: "2023-10-17T09:01:05.43355+00:00",
            freezabl: null,
            id: "clnu3h6izmxev0atebizy2lek",
            image: {
              url: "https://media.graphassets.com/xxaA3rF6RrHoGCDkF6zn",
            },
            ingredients: [
              "1 låda curry dahl",
              "1 påse libabröd",
              "1 burk vitlöksolja",
            ],
            recipeNumber: 3,
            savedIngredients:
              "laktosfri grädde, grön curry, vitlök, grönsaker i grönsaksfond\n",
            slug: "recept-our-creamy-spicy-curry-dahl-with-green-curry-served-with-fried-garlicherb-bread-copy",
            startDate: "2023-10-09",
            steg: [
              "Ta fram en kastrull och en stekpanna. Värm curry dahlen tillsammans med 1 dl vatten eller grädde i kastrullen på medelhög värme så den blir varm. Tips: När den är varm och klar, sänk värmen och dra ner en matsked smör för att få den ännu godare. Stek libabröden i stekpannan på medelhög värme. Pensla på lite vitlöksoljan och vänd konstant till se blir varma, lägg undan tills alla är stekta.",
              "Servering: Lägg curry dahlen i halvdjup skål, skopa upp den med brödet, alternativt ät det var för sig.\n",
            ],
            title:
              "Vår krämiga heta Curry Dahl på grön curry, serveras med stekt vitlök/-örtbröd.",
            weekNr: 43,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4, Kcal 743, Carbohydrate 93g, Protein 33g, Fat 26g",
        recipeNumber: 3,
        savedIngredients:
          "lactose -free cream, green curry, garlic, vegetables in vegetable stock",
        slug: "recept-our-creamy-spicy-curry-dahl-with-green-curry-served-with-fried-garlicherb-bread-copy",
        startDate: "2023-10-09",
        steg: [
          "Take out a saucepan and a frying pan. Heat the curry dahl together with 1 dl of water or cream in the pan on medium heat so that it becomes warm. Tip: When it's hot and ready, lower the heat and add a tablespoon of butter to make it even tastier. Fry the flat bread in the frying pan on medium heat. Brush on a little garlic oil and turn constantly until hot, set aside until all are fried.",
          "Serving: Put the curry dahl in a half-deep bowl, scoop it up with the bread, alternatively eat it separately.",
        ],
        title:
          "Our creamy spicy Curry Dahl with green curry, served with fried garlic/herb bread.",
        weekNr: 43,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in bulgur. Lactose in halloumi. Traces of lactose in the corn., halloumi, bulgur, vegetable stock *celery, parsley, yellow onion, garlic, maizena*, corn, lactose-free cream, parsley, salt, black pepper, garlic, sugar, vinegar, red onion, mango, chili.",
        createdAt: "2023-09-30T12:51:50.463315+00:00",
        freezabl: false,
        id: "cln618g278ktr0bt3k5mx7x5j",
        image: {
          url: "https://media.graphassets.com/otljdTQw69v2TZqaD6jQ",
        },
        ingredients: [
          "1 box seasoned bulgur",
          "1 jar mango",
          "1 sliced halloumi",
          "Red onion",
          "1 jar creamy corn",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i bulgur. Laktos i halloumi. Spår av laktos i majsen., halloumi, bulgur, grönsaksfond *selleri, persilja, gullök, vitlök, maizena*, majskorn, laktosfri grädde, persilja, salt, svartpeppar, vitlök, socker, ättika, rödlök, mango, chili.",
            createdAt: "2023-10-03T13:50:27.258045+00:00",
            freezabl: false,
            id: "cln618g278ktr0bt3k5mx7x5j",
            image: {
              url: "https://media.graphassets.com/otljdTQw69v2TZqaD6jQ",
            },
            ingredients: [
              "1 låda smaksatt bulgur",
              "1 burk mango",
              "1 skivad halloumi",
              "Rödlök",
              "1 burk creamy corn",
            ],
            recipeNumber: 1,
            savedIngredients: "Halloumi, rödlök, vitlök, majskorn",
            slug: "recept-varm-halloumisallad-med-smaksatt-grovbulgur-creamy-corn-med-oerter-och-chili-hyvlad-roedloek-and-inlagd-mango",
            startDate: "2023-10-02",
            steg: [
              "Ta fram 2 kastruller och en stekpanna. Lägg bulguren i en kastrull och värm den på medelhög värme. Lägg majsen tillsammans med 0.5dl vatten i den andra kastrullen och värm på medelhög värme. Låt det sjuda ett tag. Skär halloumi i önskad form, vi gillar tunna strimlor så det blir krispigt stekt. Stek halloumi med lite olja tills det blir gyllenbrunt på hög värme.",
              "Häll av spadet från mangon, skiva löken så tunt som möjligt.",
              "Servering: Här gör man lite som man känner. Vi hade tagit ett stort fat, bottnat med bulguren, ringlat över majsen, disponerat ut halloumi, löken och sedan strött över mangon.",
            ],
            title:
              "Varm halloumisallad med smaksatt grovbulgur, creamy corn med örter och chili, hyvlad rödlök & inlagd mango.",
            weekNr: 41,
          },
        ],
        nutritionalValues:
          "Calculated per portion / 4: Kcal 748, Fat 41g, Protein 35g, Carbohydrates 74g\n",
        recipeNumber: 1,
        savedIngredients: "Halloumi, red onion, garlic, corn",
        slug: "recept-varm-halloumisallad-med-smaksatt-grovbulgur-creamy-corn-med-oerter-och-chili-hyvlad-roedloek-and-inlagd-mango",
        startDate: "2023-10-02",
        steg: [
          "Take out 2 saucepans and a frying pan. Put the bulgur in a saucepan and heat it over medium heat. Put the creamy corn together with 0.5dl of water in the other pan and heat on medium heat. Let it simmer for a while. Cut the halloumi into the desired shape, we like thin strips so it's fried crispy. Fry halloumi with a little oil until golden brown on high heat.",
          "Remove the pickling liquid from the mango, slice the onion as thinly as possible.",
          "Serving: Here you do as you feel. We would take a large plate, fill the bottom with the bulgur, drizzled over the corn, spread out the halloumi, the onion and then sprinkled the mango.",
        ],
        title:
          "Warm halloumi salad with flavoured coarse bulgur, creamy corn with herbs and chilli, thinly sliced red onion and pickled mango.",
        weekNr: 41,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "ALLERGENS: Gluten in liba bread. Lactose in grated cheese and Creme fraiche. Libaba bread *Wheat flour, water, yeast, sugar, salt, barley malt*. Creme fraiche, parsley, garlic, black pepper, forest mushrooms, mozzarella (lactose), pumpkin seeds.",
        createdAt: "2023-09-30T12:50:32.494511+00:00",
        freezabl: null,
        id: "cln616rxj9ela0cuieb1wruw9",
        image: {
          url: "https://media.graphassets.com/0s3mlSKzTDmOhwR0uzgO",
        },
        ingredients: [
          "1 bag of libabröd",
          "1 box sautéed forest mushrooms with garlic",
          "1 jar shredded mozzarella",
          "1 jar pumpkin seeds",
          "1 jar creme fraiche with parsley",
        ],
        localizations: [
          {
            contentAllergies:
              "ALLERGENER: Gluten i libabröd. Laktos i riven ost och Creme fraiche.  Libabröd *Vetemjöl, vatten, jäst, socker, salt, kornmalt*. Creme fraiche, persilja, vitlök, svartpeppar, skogschampinjoner, mozzarella (laktos), pumpakärnor. ",
            createdAt: "2023-10-03T13:59:08.635084+00:00",
            freezabl: null,
            id: "cln616rxj9ela0cuieb1wruw9",
            image: {
              url: "https://media.graphassets.com/0s3mlSKzTDmOhwR0uzgO",
            },
            ingredients: [
              "1 påse libabröd",
              "1 låda sauterade skogschampinjoner med vitlök",
              "1 burk riven mozzarella",
              "1 burk pumpafrön",
              "1 burk creme fraiche med persilja",
            ],
            recipeNumber: 2,
            savedIngredients: "Svamp, persilja, pumpakärnor, vitlök.",
            slug: "recept-pizza-bianco-stekta-skogschampinjoner-fran-hakaslaetts-gard-creme-fraiche-vitloek-riven-mozzarella-persilja-och-rostade-pumpakaernor",
            startDate: "2023-10-02",
            steg: [
              "Sätt ugnen på 240 grader över och undervärme och förvärm en plåt i ugnen. Om ni har en pizzasten - använd den! Annars går en plåt lika bra.",
              "Lägg libabrödet på ett bakplåtspapper. Bottna med ett lager av crème fraiche som är blandat med persiljan. Disponera ut den rivna mozzarellan och även den sauterade svampen. ",
              "Grädda pizzan i ugnen cirka 7 minuter.",
              "Ta ut pizzan från ugnen. Strö över pumpakärnorna på pizzan och servera!",
            ],
            title:
              "Pizza bianco. Stekta skogschampinjoner från Hakaslätts gård, creme fraiche, vitlök, riven mozzarella, persilja och rostade pumpakärnor. ",
            weekNr: 41,
          },
        ],
        nutritionalValues:
          "Calculated per portion: Energy: 731kcal / portion, Carbohydrates 72g, Protein 34g, Fat 28g.",
        recipeNumber: 2,
        savedIngredients: "Mushrooms, parsley, pumpkin seeds, garlic.\n",
        slug: "recept-pizza-bianco-stekta-skogschampinjoner-fran-hakaslaetts-gard-creme-fraiche-vitloek-riven-mozzarella-persilja-och-rostade-pumpakaernor",
        startDate: "2023-10-02",
        steg: [
          "Set the oven to 240 degrees over and under heat and preheat a tray in the oven. If you have a pizza stone - use it! Otherwise, a plate works just as well.",
          "Place the Liba bread on a baking sheet. Base with a layer of crème fraiche mixed with the parsley. Arrange the grated mozzarella and also the sautéed mushrooms.",
          "Bake the pizza in the oven for about 5-7 minutes.",
          "Take the pizza out of the oven. Sprinkle the pumpkin seeds on the pizza and serve!",
        ],
        title:
          "Pizza bianco. Sautéed forest mushrooms from Hakaslätts farm, crème fraiche, garlic, grated mozzarella, parsley, and roasted pumpkin seeds.",
        weekNr: 41,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergens: Gluten in gnocchi, there may be traces of lactose in the pesto sauce., Gnocchi *read packaging*, Pesto *leaf spinach, basil, sunflower seeds, Västerbotten cheese, salt, pepper, rapeseed oil* lactose-free cream, vegetable stock *celery, parsley, garlic, yellow onion, cornstarch, carrot, sugar, salt*, zucchini, rapeseed oil, jalapeño, salt, carrot, beetroot.",
        createdAt: "2023-09-30T12:48:59.579332+00:00",
        freezabl: false,
        id: "cln614s8a8k2l0bt3p03akg9b",
        image: {
          url: "https://media.graphassets.com/l9TJ8l0PQ2ia8qV5XWI8",
        },
        ingredients: [
          "Zucchini",
          "1 bag of potato gnocchi",
          "1 can of pesto sauce",
          "1 can of jalapeño oil",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i gnocchi, kan finnas spår av laktos i pestosåsen., Gnocchi *läs förpackning*, Pesto *bladspenat, basilika, solroskärnor, västerbottenost, salt, peppar, rapsolja* laktosfri grädde, grönsaksfond *selleri, persilja, vitlök, gullök, maizena, morot, socker, salt*, zucchini, rapsolja, jalapeño, salt, morot, rödbeta.",
            createdAt: "2023-10-03T14:06:23.345588+00:00",
            freezabl: false,
            id: "cln614s8a8k2l0bt3p03akg9b",
            image: {
              url: "https://media.graphassets.com/l9TJ8l0PQ2ia8qV5XWI8",
            },
            ingredients: [
              "1 paket potatisgnocchi",
              "1 burk pestoragusås",
              "Zucchini",
              "1 burk jalapeñoolja",
            ],
            recipeNumber: 3,
            savedIngredients:
              "Basilika, persilja, pumpafrön, jalapeño, grönsaker i grönsaksfond.\n",
            slug: "recept-potatisgnocchi-med-kraemig-pestoragu-pa-morot-and-basilika-hyvlad-zucchini-med-jalapenoolja-och-solrosfroen",
            startDate: "2023-10-02",
            steg: [
              "Ta fram en stor kastrull och koka upp vatten och lite salt till gnocchin. Ta fram 2 stekpannor och värm pestosåsen på medelvärme i en av stekpannorna, se till att den blir varm, sjuder och reduceras lite grann så den blir lite mer trögflytande. Värm den andra stekpannan med lite matfett på medelvärme. Koka gnocchin i vattnet i cirka 2 minuter. Spara 1 dl vatten innan ni silar av gnocchin. Sila av gnocchin men var försiktiga så den inte går sönder!",
              "Sätt den förvärmda stekpannan på hög värme, stek gnocchin i någon minut så den får lite stekyta. Lägg sedan gnocchin i pestosåsen. Om det inte får plats i en stekpanna, dela upp det på båda stekpannorna, låt de sedan sjuda så gnocchin suger åt sig såsen lite på medelvärme. Under tiden den sjuder. Hyvla zucchinin med antingen en mandolin om ni har hemma, eller en osthyvel. Slunga sedan runt zucchinin i en skål med jalapeñooljan - Häll på så mycket ni önskar!",
              "Servera!",
            ],
            title:
              "Potatisgnocchi med krämig pestoragu på morot & basilika, hyvlad zucchini med jalapeñoolja och solrosfrön.",
            weekNr: 41,
          },
        ],
        nutritionalValues:
          "Calculated per portion. Energy: Kcal 871, Protein 32g, Fat 28g, Carbohydrates 87g.",
        recipeNumber: 3,
        savedIngredients:
          "Basil, parsley, pumpkin seeds, jalapeño, vegetables in vegetable stock.",
        slug: "recept-potatisgnocchi-med-kraemig-pestoragu-pa-morot-and-basilika-hyvlad-zucchini-med-jalapenoolja-och-solrosfroen",
        startDate: "2023-10-02",
        steg: [
          "Take out a large saucepan and boil water and a little salt for the gnocchi. Take out 2 frying pans and heat the pesto sauce on medium heat in one of the frying pans, make sure it gets hot, simmers and reduces a little so it becomes a little more viscous. Heat the other frying pan with a little cooking fat on medium heat. Cook the gnocchi in the water for about 2 minutes. Save 1 dl of water before straining the gnocchi. Strain the gnocchi but be careful not to break it!",
          "Put the preheated frying pan on a high heat, fry the gnocchi for a minute or so so that it gets a little frying surface. Then put the gnocchi in the pesto sauce. If it won't fit in one pan, divide it between both pans, then let them simmer so the gnocchi soaks up the sauce a bit over medium heat. Meanwhile it simmers, slice the zucchini with either a mandolin if you have one at home, or a cheese slicer. Then toss the zucchini around in a bowl with the jalapeño oil - Pour as much as you wish!",
          "Serve!",
        ],
        title:
          "Potato gnocchi with creamy pesto ragu of carrot & basil, sliced zucchini with jalapeño oil and sunflower seeds.",
        weekNr: 41,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten i libabröd. Spår av laktos i yoghurt. rapsolja, persilja, grönsaksfond *lök, vitlök, persilja, salt, socker, maizena*, citronjuice, Libabröd *vatten, salt, jäst, vetemjöl*, rödlök, Falafel (Innehåller kikärtor, vatten, lök, rapsolja, salt, vitlök, bikarbonat, koriander, spiskummin, persilja, gurkmeja, bockhornsklöver, kardemumma, cayennepeppar), fetaost, grekisk yoghurt, rapsolja, vitlök, libabröd *se förpackning*, hummus: kikärtor, citronjuice, cayennepeppar, rapsolja, vitlök, paprikapulver, spiskummin, morot.",
        createdAt: "2023-09-30T12:47:06.153828+00:00",
        freezabl: null,
        id: "cln612corl84h0bupub0hxo0l",
        image: {
          url: "https://media.graphassets.com/fEjZ09wmThugOCImy11p",
        },
        ingredients: [
          "1 påse falafel",
          "1 påse libabröd",
          "1 burk vitlöksolja",
          "1 låda citrusmarinerade morötter",
          "1 burk fetaostyoghurt",
          "1 burk hummus",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i libabröd. Spår av laktos i yoghurt. rapsolja, persilja, grönsaksfond *lök, vitlök, persilja, salt, socker, maizena*, citronjuice, Libabröd *vatten, salt, jäst, vetemjöl*, rödlök, Falafel (Innehåller kikärtor, vatten, lök, rapsolja, salt, vitlök, bikarbonat, koriander, spiskummin, persilja, gurkmeja, bockhornsklöver, kardemumma, cayennepeppar), fetaost, grekisk yoghurt, rapsolja, vitlök, libabröd *se förpackning*, hummus: kikärtor, citronjuice, cayennepeppar, rapsolja, vitlök, paprikapulver, spiskummin, morot.",
            createdAt: "2023-10-03T14:09:30.092051+00:00",
            freezabl: null,
            id: "cln612corl84h0bupub0hxo0l",
            image: {
              url: "https://media.graphassets.com/fEjZ09wmThugOCImy11p",
            },
            ingredients: [
              "1 påse falafel",
              "1 påse libabröd",
              "1 burk vitlöksolja",
              "1 låda citrusmarinerade morötter",
              "1 burk fetaostyoghurt",
              "1 burk hummus",
            ],
            recipeNumber: 1,
            savedIngredients: "Morot, timjan, vitlök, citron, kikärtor, chili",
            slug: "recept-meze-var-hummus-krispstekt-falafel-vitloeks-libabroed-citrusmarinerade-steka-moroetter-and-fetaostyoghurt",
            startDate: "2023-09-25",
            steg: [
              "1. Ta fram 2 stekpannor. Stek falafeln med lite matfett i några minuter på varje sida så den blir krispig. Lägg över på en tallrik och stek sedan moroten på hög värme så den får lite stekt yta. Stek samtidigt libabröden på medelvärme och pensla på vitlöksoljan på båda sidor och vänd det då och då tills det blir varmt.",
              "2. Rör runt i fetaostyoghurten och hummusen. Servera sedan allt var för sig, meze är för oss plockmat. Så hugg i och njut!",
            ],
            title:
              "Meze - vår hummus, krispstekt falafel, vitlöks-libabröd, citrusmarinerade steka morötter & fetaostyoghurt.",
            weekNr: 40,
          },
        ],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 763, Protein 33g, Fett 24g, Kolhydrat 79g",
        recipeNumber: 1,
        savedIngredients: "Morot, timjan, vitlök, citron, kikärtor, chili",
        slug: "recept-meze-var-hummus-krispstekt-falafel-vitloeks-libabroed-citrusmarinerade-steka-moroetter-and-fetaostyoghurt",
        startDate: "2023-09-25",
        steg: [
          "1. Ta fram 2 stekpannor. Stek falafeln med lite matfett i några minuter på varje sida så den blir krispig. Lägg över på en tallrik och stek sedan moroten på hög värme så den får lite stekt yta. Stek samtidigt libabröden på medelvärme och pensla på vitlöksoljan på båda sidor och vänd det då och då tills det blir varmt.",
          "2. Rör runt i fetaostyoghurten och hummusen. Servera sedan allt var för sig, meze är för oss plockmat. Så hugg i och njut!",
        ],
        title:
          "Meze - our hummus, crispy falafel, garlic-libabread, citrusmarinared fried carrots & feta cheese-yoghurt.",
        weekNr: 40,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Mjölkprotein i masalasås, Basmatiris, rapsolja, vitlök, grönsaksfond *selleri, gullök, vitlök, maizena, socker, salt*, halloumi, laktosfri grädde, vatten, malda kryddor(koriander, spiskummin, paprika, svartpeppar, kanel, ingefära, kryddnejlika, chil), rapsolja, salt, majsmjöl, ättiksyra, citronsyra, tamarind, vitlökspulver, broccoli, jordnötter",
        createdAt: "2023-09-30T12:41:22.130202+00:00",
        freezabl: null,
        id: "cln60uz9l9alj0cuiy0mueb2z",
        image: {
          url: "https://media.graphassets.com/pzhhwcgTFGwGtqHQ29wJ",
        },
        ingredients: [
          "1 låda halloumi-masala",
          "1 låda basmatiris",
          "1 burk krossade rostade jordnötter",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Mjölkprotein i masalasås, Basmatiris, rapsolja, vitlök, grönsaksfond *selleri, gullök, vitlök, maizena, socker, salt*, halloumi, laktosfri grädde, vatten, malda kryddor(koriander, spiskummin, paprika, svartpeppar, kanel, ingefära, kryddnejlika, chil), rapsolja, salt, majsmjöl, ättiksyra, citronsyra, tamarind, vitlökspulver, broccoli, jordnötter",
            createdAt: "2023-10-03T14:11:27.794503+00:00",
            freezabl: null,
            id: "cln60uz9l9alj0cuiy0mueb2z",
            image: {
              url: "https://media.graphassets.com/pzhhwcgTFGwGtqHQ29wJ",
            },
            ingredients: [
              "1 låda halloumi-masala",
              "1 låda basmatiris",
              "1 burk krossade rostade jordnötter",
            ],
            recipeNumber: 2,
            savedIngredients:
              "jordnötter, broccoli, masalapaste, grönsaker i fond, vitlök",
            slug: "recept-kraemig-halloumi-masala-med-broccoli-krossade-rostade-jordnoetter-and-basmatiris",
            startDate: "2023-09-25",
            steg: [
              "Ta fram en stor kastrull och en stekpanna. Värm halloumi-masalan tillsammans med 2dl vatten på medelhög värme tills den sjuder och är varm. Stek riset i stekpannan.",
              "Servera! Bottna med ris, sedan masalan och sedan strö över jordnötterna.",
            ],
            title:
              "Krämig Halloumi-masala med broccoli, krossade rostade jordnötter & basmatiris.",
            weekNr: 40,
          },
        ],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 796, Fett 28g, Protein 37g, Kolhydrater 77g",
        recipeNumber: 2,
        savedIngredients:
          "jordnötter, broccoli, masalapaste, grönsaker i fond, vitlök",
        slug: "recept-kraemig-halloumi-masala-med-broccoli-krossade-rostade-jordnoetter-and-basmatiris",
        startDate: "2023-09-25",
        steg: [
          "Ta fram en stor kastrull och en stekpanna. Värm halloumi-masalan tillsammans med 2dl vatten på medelhög värme tills den sjuder och är varm. Stek riset i stekpannan.",
          "Servera! Bottna med ris, sedan masalan och sedan strö över jordnötterna.",
        ],
        title:
          "Creamy Halloumi-masala with broccoli, crushed roasted peanuts & basmati rice.",
        weekNr: 40,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten i foccacia, spår av laktos och mjölkprotein i yoghurt. , Gulaschsoppa *tärnad potatis, sojafärs, tomatpuré, krossad tomat, grönsaksfond, cayennepeppar, kummin, paprikapulver, paprika, vatten, maizena, salt, svartpeppar, gullök, vitlök, jalapeño., Foccacia *vetemjöl, salt, vatten, jäst, surdeg, olivolja*, Örtcreme *grekisk yoghurt, persilja, vitlök, rosmarin*",
        createdAt: "2023-09-30T12:35:29.452632+00:00",
        freezabl: null,
        id: "cln60nf4v7xdc0bupq9obs55n",
        image: {
          url: "https://media.graphassets.com/5tlWuzeZQ66bQ6N5BI6U",
        },
        ingredients: [
          "1 låda gulaschsoppa",
          "1 låda foccacia",
          "1 burk örtyoghurt",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten i foccacia, spår av laktos och mjölkprotein i yoghurt. , Gulaschsoppa *tärnad potatis, sojafärs, tomatpuré, krossad tomat, grönsaksfond, cayennepeppar, kummin, paprikapulver, paprika, vatten, maizena, salt, svartpeppar, gullök, vitlök, jalapeño., Foccacia *vetemjöl, salt, vatten, jäst, surdeg, olivolja*, Örtcreme *grekisk yoghurt, persilja, vitlök, rosmarin*",
            createdAt: "2023-10-03T14:13:19.711866+00:00",
            freezabl: null,
            id: "cln60nf4v7xdc0bupq9obs55n",
            image: {
              url: "https://media.graphassets.com/5tlWuzeZQ66bQ6N5BI6U",
            },
            ingredients: [
              "1 låda gulaschsoppa",
              "1 låda foccacia",
              "1 burk örtyoghurt",
            ],
            recipeNumber: 3,
            savedIngredients:
              "persilja, vitlök, potatis, jalapeño, tomatpuré, jäst, gullök, paprika, rosmarin",
            slug: "recept-vegetarisk-gulaschsoppa-med-pannstekt-surdegsfocaccia-and-oertcreme",
            startDate: "2023-09-25",
            steg: [
              "Ta fram en större kastrull, häll ner gulaschen, tillsätt 3dl vatten och låt den komma upp i värme och sjuda i några minuter. Häll i mer vatten om ni tycker den är för tjock. Ta fram en stekpanna, skiva foccacian relativt tunt och stek den lite på varje sida med lite matfett så den blir lite krispig. Ta fram örtyoghurten och rör om.",
              "Servera! Gulasch i soppskålar, klicka i yoghurt och ät antingen foccacian med något gott tillbehör eller doppa i soppan.",
            ],
            title:
              "Vegetarisk gulaschsoppa med pannstekt surdegsfocaccia & örtcréme.",
            weekNr: 40,
          },
        ],
        nutritionalValues:
          "Räknat på 4 portioner:, Energi Kcal 721, Kolhydrat 81g, Fett 18.7g, Protein 36.2g",
        recipeNumber: 3,
        savedIngredients:
          "persilja, vitlök, potatis, jalapeño, tomatpuré, jäst, gullök, paprika, rosmarin",
        slug: "recept-vegetarisk-gulaschsoppa-med-pannstekt-surdegsfocaccia-and-oertcreme",
        startDate: "2023-09-25",
        steg: [
          "Ta fram en större kastrull, häll ner gulaschen, tillsätt 3dl vatten och låt den komma upp i värme och sjuda i några minuter. Häll i mer vatten om ni tycker den är för tjock. Ta fram en stekpanna, skiva foccacian relativt tunt och stek den lite på varje sida med lite matfett så den blir lite krispig. Ta fram örtyoghurten och rör om.",
          "Servera! Gulasch i soppskålar, klicka i yoghurt och ät antingen foccacian med något gott tillbehör eller doppa i soppan.",
        ],
        title:
          "Vegetarian gulasch soup with pan fried sourdough focaccia & harb créme.",
        weekNr: 40,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten, ägg, laktos, MJÖLKPROTEIN i pannkakssmet., vetemjöl , mjölk, ägg, salt, curry *potatis, vreta gulärt, röd curry (galangal, ingefära, vitlök, tomatpuré, salladslök), vatten, grönsaksfond (gullök, vitlök, selleri, persilja, maizena, socker, salt), laktosfritt smör, kantarell/kimchimayo (äggula, dijonsenap, kimchi*, kantarell, rapsolja, rödvinsvinäger). Kimchi* (vitkål, gochujang, socker, salladslök, ättika, salt).",
        createdAt: "2023-09-22T10:33:35.483082+00:00",
        freezabl: null,
        id: "clmugrub00gq709ut7jsa6ou7",
        image: {
          url: "https://media.graphassets.com/SjMQCpvlR4u6pYY6wZR2",
        },
        ingredients: [
          "1 burk pannkakssmet",
          "1 låda potatis/ärtcurry",
          "1 burk kimchi/kantarellmayo",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten, ägg, laktos, MJÖLKPROTEIN i pannkakssmet., vetemjöl , mjölk, ägg, salt, curry *potatis, vreta gulärt, röd curry (galangal, ingefära, vitlök, tomatpuré, salladslök), vatten, grönsaksfond (gullök, vitlök, selleri, persilja, maizena, socker, salt), laktosfritt smör, kantarell/kimchimayo (äggula, dijonsenap, kimchi*, kantarell, rapsolja, rödvinsvinäger). Kimchi* (vitkål, gochujang, socker, salladslök, ättika, salt).",
            createdAt: "2023-10-03T14:19:54.272684+00:00",
            freezabl: null,
            id: "clmugrub00gq709ut7jsa6ou7",
            image: {
              url: "https://media.graphassets.com/SjMQCpvlR4u6pYY6wZR2",
            },
            ingredients: [
              "1 burk pannkakssmet",
              "1 låda potatis/ärtcurry",
              "1 burk kimchi/kantarellmayo",
            ],
            recipeNumber: 1,
            savedIngredients:
              "Gulärt, potatis, röd curry, grönsaksfond, kimchi, kantareller, äggula, dijonsenap",
            slug: "recept-indisk-pannkaka-med-ett-kraemigt-stomp-pa-potatis-var-curry-svenska-aertor-and-marinerade-groena-oliver-serveras-med-en-syrlig-kimchi/kantarellmayo",
            startDate: "2023-09-25",
            steg: [
              "Ta fram 1 kastrull och 1 stekpanna. Värm på curryn i stekpannan på medelvärme så den blir varm. Stek pannkakorna med medföljande smet i stekpannan. Använd gärna lite smör till stekningen av dem.",
              "Rör runt i kimchi/kantarellmayon och servera! Fyll din pannkaka med curryn, ringla över mayon och vik över.",
            ],
            title:
              '”Indisk" pannkaka med ett krämigt stomp på potatis, vår curry, svenska ärtor & marinerade gröna oliver. Serveras med en syrlig kimchi/kantarellmayo.',
            weekNr: 39,
          },
        ],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 782, Protein 38g, Kolhydrater 94g, Fett 22g",
        recipeNumber: 1,
        savedIngredients:
          "Gulärt, potatis, röd curry, grönsaksfond, kimchi, kantareller, äggula, dijonsenap",
        slug: "recept-indisk-pannkaka-med-ett-kraemigt-stomp-pa-potatis-var-curry-svenska-aertor-and-marinerade-groena-oliver-serveras-med-en-syrlig-kimchi/kantarellmayo",
        startDate: "2023-09-25",
        steg: [
          "Ta fram 1 kastrull och 1 stekpanna. Värm på curryn i stekpannan på medelvärme så den blir varm. Stek pannkakorna med medföljande smet i stekpannan. Använd gärna lite smör till stekningen av dem.",
          "Rör runt i kimchi/kantarellmayon och servera! Fyll din pannkaka med curryn, ringla över mayon och vik över.",
        ],
        title:
          '"indian pancake" with a creamy potato stomp, our curry, swedish peas & marinated green olives. Served with a sour kimchi/chanterellemayo.',
        weekNr: 39,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Arborioris, Pumpa (muscat) , skogschampinjoner, grana padano, Grönsaksfond, Svampfond *champinjoner, shiitake, maizena, salt, socker*, rapsolja, salt, edamamebönor, jalapeño, allergener: Spår av laktos kan finnas i risotto",
        createdAt: "2023-09-21T11:29:12.542314+00:00",
        freezabl: null,
        id: "clmt3biiy55mm0ctd5n0x70e7",
        image: {
          url: "https://media.graphassets.com/0i3FFoOZQU6hDx0ChJXE",
        },
        ingredients: [
          "2 lådor risotto",
          "1 låda edamamebönor med jalapeñoolja",
        ],
        localizations: [
          {
            contentAllergies:
              "Arborioris, Pumpa (muscat) , skogschampinjoner, grana padano, Grönsaksfond, Svampfond *champinjoner, shiitake, maizena, salt, socker*, rapsolja, salt, edamamebönor, jalapeño, allergener: Spår av laktos kan finnas i risotto",
            createdAt: "2023-10-03T14:22:58.605009+00:00",
            freezabl: null,
            id: "clmt3biiy55mm0ctd5n0x70e7",
            image: {
              url: "https://media.graphassets.com/0i3FFoOZQU6hDx0ChJXE",
            },
            ingredients: [
              "2 lådor risotto",
              "1 låda edamamebönor med jalapeñoolja",
            ],
            recipeNumber: 2,
            savedIngredients:
              "jalapeño, svampfond, grönsaksfond, grana padano, skogschampoinjoner, pumpa",
            slug: "recept-risotto-pa-hokkaidopumpa-riven-extralagrad-grana-padano-skogschampinjon-and-vitloeksfraest-svartkal-serveras-med-side-pa-edamameboenor-med-jalapenoolja",
            startDate: "2023-09-25",
            steg: [
              'Ta fram en stor kastrull och en stekpanna. Lägg risotton i kastrullen tillsammans med 1dl vatten, värm den på medelhög värme och rör runt då och då. Vi letar efter ett ganska "flytande" och krämigt resultat så tillsätt mer vatten om det behövs. Stek edamamebönorna med jalapeñoolja under tiden. Smaksätt med salt och peppar efter tycke.',
              "Servera! ",
            ],
            title:
              "Risotto på hokkaidopumpa, riven extralagrad grana padano, skogschampinjon & vitlöksfräst svartkål. Serveras med side på edamamebönor med jalapeñoolja.",
            weekNr: 39,
          },
        ],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 780, Fett 27g, Protein 37g, Kolhydrat 71g",
        recipeNumber: 2,
        savedIngredients:
          "jalapeño, svampfond, grönsaksfond, grana padano, skogschampoinjoner, pumpa",
        slug: "recept-risotto-pa-hokkaidopumpa-riven-extralagrad-grana-padano-skogschampinjon-and-vitloeksfraest-svartkal-serveras-med-side-pa-edamameboenor-med-jalapenoolja",
        startDate: "2023-09-25",
        steg: [
          'Ta fram en stor kastrull och en stekpanna. Lägg risotton i kastrullen tillsammans med 1dl vatten, värm den på medelhög värme och rör runt då och då. Vi letar efter ett ganska "flytande" och krämigt resultat så tillsätt mer vatten om det behövs. Stek edamamebönorna med jalapeñoolja under tiden. Smaksätt med salt och peppar efter tycke.',
          "Servera! ",
        ],
        title:
          "Risotto on hokkaido pumpkin, shredded overmatured grana padano, forest mushrooms & garlic fried black cabbage. Served with a side on edamame beans with jalapeño oil.",
        weekNr: 39,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten och spår av ägg i bröd. Sojaprotein i färsen. , sojafärs, tomatpure, vitlök, svamp, gullök, grönsaksfond *selleri, persilja, vitlök, gullök, maizena, morot, socker, salt*, paprika, briochebröd *vetemjöl, surdeg, vatten, jäst, ägg, salt, socker, smör*, chili",
        createdAt: "2023-09-21T11:25:34.29523+00:00",
        freezabl: null,
        id: "clmt36u3i64up0bunqvvxqjgn",
        image: {
          url: "https://media.graphassets.com/nbIowqpQxuxyniPehXgf",
        },
        ingredients: [
          "1 låda sloppy joe",
          "4 briochebröd",
          "1 burk picklad gurka",
        ],
        localizations: [
          {
            contentAllergies:
              "Allergener: Gluten och spår av ägg i bröd. Sojaprotein i färsen. , sojafärs, tomatpure, vitlök, svamp, gullök, grönsaksfond *selleri, persilja, vitlök, gullök, maizena, morot, socker, salt*, paprika, briochebröd *vetemjöl, surdeg, vatten, jäst, ägg, salt, socker, smör*, chili",
            createdAt: "2023-10-03T14:25:35.615364+00:00",
            freezabl: null,
            id: "clmt36u3i64up0bunqvvxqjgn",
            image: {
              url: "https://media.graphassets.com/nbIowqpQxuxyniPehXgf",
            },
            ingredients: [
              "1 låda sloppy joe",
              "4 briochebröd",
              "1 burk picklad gurka",
            ],
            recipeNumber: 3,
            savedIngredients:
              "jalapeño, tomatpuré, tomater, paprika, grönsaksfond, gullök, vitlök",
            slug: "recept-sloppy-joe-handgjort-briochebroed-fran-franska-bageriet-i-goeteborg-med-smakrik-sojafaersragu-pa-gulloek-paprika-tomat-and-med-senapspicklad-vaesterasgurka",
            startDate: "2023-09-25",
            steg: [
              'Lägg färsblandingen i en stekpanna och stek på medelhög värme tills färsen går ihop och man kan bygga ett litet "berg" av det. Dela briochebröden på mitten och stek de med snittytan ner med lite matfett tills de blir krispiga och gyllenbruna.',
              "Servering: Dela upp färsen i briochebröden, lägg i gurkan och lägg på locket.",
            ],
            title:
              '”Sloppy Joe" - Handgjort briochebröd från Franska Bageriet i Göteborg med smakrik sojafärsragu på gullök, paprika, tomat & med senapspicklad västeråsgurka.',
            weekNr: 39,
          },
        ],
        nutritionalValues:
          "Räknat per portion / 4, Energi: Kcal 784, Protein: 36g, Fett 21g, Kolhydrater 58g",
        recipeNumber: 3,
        savedIngredients:
          "jalapeño, tomatpuré, tomater, paprika, grönsaksfond, gullök, vitlök",
        slug: "recept-sloppy-joe-handgjort-briochebroed-fran-franska-bageriet-i-goeteborg-med-smakrik-sojafaersragu-pa-gulloek-paprika-tomat-and-med-senapspicklad-vaesterasgurka",
        startDate: "2023-09-25",
        steg: [
          'Lägg färsblandingen i en stekpanna och stek på medelhög värme tills färsen går ihop och man kan bygga ett litet "berg" av det. Dela briochebröden på mitten och stek de med snittytan ner med lite matfett tills de blir krispiga och gyllenbruna.',
          "Servering: Dela upp färsen i briochebröden, lägg i gurkan och lägg på locket.",
        ],
        title:
          '”Sloppy Joe" - Handmade brioche bread with tasty soya mince ragu on onion, pepper, tomato & with mustard-pickled cucumber.',
        weekNr: 39,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten i pasta, spår av laktos kan finnas i svampsås, Penne *vetemjöl, vatten*, laktosfri grädde, champinjoner, rosmarin, timjan, vitlök, svampfond *shiitake, karl-johan, lök, champinjoner, maizena*, grönsaksfond *, persilja, lök, vitlök, maizena, socker*, pumpakärnor, gräslök",
        createdAt: "2023-09-13T09:13:38.340853+00:00",
        freezabl: null,
        id: "clmhiycsyn9u60bupxo9lahk1",
        image: {
          url: "https://media.graphassets.com/R3N7LT8rRha0YuA4IIAK",
        },
        ingredients: [
          "1 låda svampsås",
          "1 påse pasta",
          "1 burk rostade pumpakärnor",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 789, Protein 33g, Fett 32g, Kolhydrat 81g",
        recipeNumber: 1,
        savedIngredients: "svamp, svampfond, vitlök, grädde, gräslök",
        slug: "recept-svamp-och-tryffelpasta-pasta-med-rostade-skogschampinjoner-fran-hakaslaett-i-en-kraemig-tryffel-vitloek-och-timjansas-samt-rostade-pumpakaernor",
        startDate: "2023-09-18",
        steg: [
          "Ta fram 2 kastruller. En stor och en lite mindre. Koka upp vatten och lite salt i den större kastrullen. Värm upp svampsåsen under lock i den mindre kastrullen på medelvärme. Tillsätt pastan när vattnet kokar och låt koka i ca 7 minuter. Spara 1 dl pastavatten i en skål innan pastan silas.",
          "Sila pastan i durkslag och lägg tillbaka i den större kastrullen. Sätt på hög värme på plattan. Tillsätt pastavatten, pastan och den varma svampsåsen i den stora kastrullen. Sätt kastrullen på den varma plattan och rör om konstant i botten i cirka 2 minuter tills det blir en krämig, lite trögflytande pasta. Smaksätt med salt & peppar efter tycke.",
          "Lägg pastan i en halvdjup tallrik och toppa med de rostade pumpakärnorna.",
        ],
        title:
          "Svamp- och tryffelpasta. Pasta med rostade skogschampinjoner från Hakaslätt i en krämig tryffel- ,vitlök och timjansås, samt rostade pumpakärnor.",
        weekNr: 38,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten i bulgur. Laktos i fetaostkrämen., Bulgur, grönsaksfond *selleri, persilja, vitlök, gullök, maizena, socker, salt*, fetaost, basilika, oregano, rosmarin, broccoli, ättika, socker, chili, rapsolja, oliver, solrosfrön, grekisk yoghurt, solrosfrön.",
        createdAt: "2023-09-13T09:10:48.967006+00:00",
        freezabl: null,
        id: "clmhiuq3dnens0btdddjmmtm8",
        image: {
          url: "https://media.graphassets.com/kczpvnZQpiHsNs5OjQ1w",
        },
        ingredients: [
          "1 låda smaksatt bulgur",
          "1 låda broccoli",
          "1 burk fetaostkräm med jalapeño",
          "1 burk marinerade oliver ",
          "1 burk rostade solrosfrön",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 832, Fett 31g, Protein 32g, Kolhydrat 79g",
        recipeNumber: 2,
        savedIngredients:
          "Grekisk yoghurt, grönsaker i grönsaksfond , solrosfrön, oliver, broccoli, timjan, rosmarin",
        slug: "recept-fransk-bondsallad-angad-grovbulgur-marinerade-groena-oliver-med-basilika-het-fetaostkraem-rostade-solrosfroen-and-stekt-broccoli",
        startDate: "2023-09-18",
        steg: [
          "Ta fram 2 stekpannor. Värm bulguren i ena stekpannan på medelhög värme. Se till att den blir varm. Stek broccolin i den andra stekpannan på hög värme med lite valfri matolja tills den fått lite stekyta och blivit varm.",
          "Servering: Ta fram en stor salladstallrik, bottna med bulguren, disponera ut den stekta broccolin, ringla över fetaostkrämen, disponera ut de marinerade oliverna, sedan strö över de rostade solrosfröna.",
        ],
        title:
          "Fransk bondsallad. Ångad grovbulgur, marinerade gröna oliver med basilika, het fetaostkräm, rostade solrosfrön & stekt broccoli.",
        weekNr: 38,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Gula ärtor, jalapeñoolja , rödbetor, morötter, honungs, rapsolja, kantarellmayo *äggula, kantareller, svampfond, rödvinsvinäger, rapsolja*",
        createdAt: "2023-09-13T09:06:35.910918+00:00",
        freezabl: null,
        id: "clmhipaukmhqp0bt8bk2cb9dw",
        image: {
          url: "https://media.graphassets.com/YSyrNVT92Pf7uqboTH9g",
        },
        ingredients: [
          "1 låda honungsglacerade morötter/rödbetor",
          "1 låda gula ärtor med jalapeñoolja ",
          "1 burk kantarellmayo",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Allergener: Ägg i mayo. Svamp i mayo. , Kcal 682, Fett 33g, Kolhydrater 97g, Protein 31g",
        recipeNumber: 3,
        savedIngredients:
          "kantarell, äggula, svampfond, morötter, rödbetor, jalapeño",
        slug: "recept-honungsglaserade-moroetter-och-roedbetor-kantarellmayo-samt-en-side-pa-gula-aertor-and-jalapeno",
        startDate: "2023-09-18",
        steg: [
          "Sätt ugnen på 220 grader varmluft. Ta fram en stekpanna. Rosta av rödbetorna/morötterna i en ugnsfast form, salta även. Stek sedan de gula ärtorna med jalapeñoolja som de är marinerade i på medelhög värme så de får lite stekt yta. Salta efter behag.",
          "Rör runt i kantarellmayon. Bottna med de gula ärtorna, sedan de honungsglacerade rotfrukterna och dippa dessa i kantarellmayon.",
        ],
        title:
          "Honungsglaserade morötter och rödbetor, kantarellmayo samt en side på gula ärtor & jalapeño.",
        weekNr: 38,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten i bao buns. Sojasås i teriyakisåsen. , Bao buns *läs förpackning*, tofu, teriyaki *sojasås, sesamolja, vitlök, tomatpuré, ingefära, maizena, socker, risvinäger*, vitkål, äggula, dijonsenap, cayennepeppar, färskpotatis, pumpafrön, solrosfrön, go-cho-jang, salladslök, ättika.",
        createdAt: "2023-09-13T09:03:34.642258+00:00",
        freezabl: null,
        id: "clmhileyrlusl0buhoi3cp5he",
        image: {
          url: "https://media.graphassets.com/29uRr1ULT3emgvQa6xKx",
        },
        ingredients: [
          "1 paket bao buns ",
          "1 paket tofu",
          "1 låda potatis",
          "1 burk teriyakimayo",
          "1 burk kimchi",
          "1 burk rostade frön",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 770, Fett 28g, Kolhydrat 98g, Protein 35g ",
        recipeNumber: 1,
        savedIngredients:
          "Vitkål, solrosfrön, ingefära, sesamolja, äggula, dijonsenap, salladslök",
        slug: "recept-bao-buns-med-krispstekt-tofu-teriyakimayo-kimchi-pa-vitkal-rostade-froen-and-rostad-potatis",
        startDate: "2023-09-11",
        steg: [
          "Två olika sätt finns. Om ni har micro använd den till att ånga bao bunsen på mellanhög styrka tillsammans med ett glas vatten och täcklock i micron. Micra i cirka 1-1.5 minut. Om ni inte har micro; Sätt ugnen på 200 grader varmluft. Koka upp cirka 5dl vatten. Sätt en ugnsplåt längst ner i ugnen och värm den. Under tiden, skiva tofun tunt och stekt på medelhög värme tills de blir krispiga. Halvera potatisen och stek den med snittyta ner med lite fett i en annan stekpanna på medelhög värme till den blir klar.",
          "Lägg bao bunsen på bakplåtspapper på ett galler och sätt in ovanför ugnsplåten. Häll på kokande vatten på ugnsplåten, stäng ugnen fort och låt de ångas i cirka 3 minuter. Låt det svalna lite innan de tas bort från bakplåtspappret.",
          "Servering: Fyll din bao bun genom att först lägga i tofun, sedan kimchin, teriyakimayon och strö över de rostade fröna. Servera potatisen vid sidan om.",
        ],
        title:
          "Bao buns med krispstekt tofu, teriyakimayo, kimchi på vitkål, rostade frön & rostad potatis.",
        weekNr: 37,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Soja och gluten i cassoulet. , basmatiris, rapsolja, grönsaksfond *selleri, lök, vitlök, maizena, socker*, tomat, Grönkål, kokt quinoa, vatten, DINKELMJÖL (VETE), solrosolja, potatis, morot, rostad lök (lök, rapsolja), SOJABÖNOR, potatisflinga, VETEMJÖL, puffad quinoa, salt, sojasås (vatten, salt, SOJABÖNOR, VETE), joderat salt, socker, ingefära, jäst, vitlökspulver, gurkmeja, palsternackspulver, lagerblad, lökpulver, svartpepparextrakt, kummin, koriander, bockhornsklöver, cayennepeppar, majsstärkelse, falafel *Innehåller kikärtor, vatten, lök, rapsolja, salt, vitlök, bikarbonat, koriander, spiskummin, persilja, gurkmeja, bockhornsklöver, kardemumma, cayennepeppar., svampfond *shiitake, champinjon, karl-johan, maizena, salt*, grönsakfond *selleri, lök, vitlök, maizena, socker, salt*, sojafärs, vitlök",
        createdAt: "2023-09-13T08:56:30.474944+00:00",
        freezabl: null,
        id: "clmhicbp9m3kx0auic045bbv8",
        image: {
          url: "https://media.graphassets.com/XQFzl998RYGB8iSd1Dyg",
        },
        ingredients: ["1 låda cassoulet", "1 låda smaksatt ris"],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 694, Fett 17g, Kolhydrater 89g, Protein 41g",
        recipeNumber: 2,
        savedIngredients:
          "Grönsaksbiffar, falafel, tomater, sojafärs, edamamebönor",
        slug: "recept-cassoulet-franskinspirerad-groensaksgryta-med-oerter-tomat-edamameboenor-and-falafel-and-smaksatt-basmatiris",
        startDate: "2023-09-11",
        steg: [
          'Ta fram en kastrull och en stekpanna. Lägg cassoulet i kastrullen, värm den på medelhög värme så den blir varm, "hacka sönder" om det är större bitar i den. Stek riset på medelhög värme i stekpannan. Se till att få lite stekt yta på den.',
          "Servera! ",
        ],
        title:
          "”Cassoulet”, franskinspirerad grönsaksgryta med örter, tomat, edamamebönor & falafel & smaksatt basmatiris",
        weekNr: 37,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Laktos i yoghurt och smör till gulärt. , Vit quinoa, grönsakfond *selleri, lök, vitlök, maizena, socker, salt*, vreta gulärt, smör, persilja, rapsolja, gräslök, gurka, ättika, socker, salt, yoghurt, jalapeño",
        createdAt: "2023-09-13T08:53:11.991291+00:00",
        freezabl: null,
        id: "clmhi82jwmqdw0bup9snunxvs",
        image: {
          url: "https://media.graphassets.com/goBHou8sQoCG3yGes0jn",
        },
        ingredients: [
          "1 låda smaksatt quinoa",
          "1 låda gulärt med örtsmör",
          "1 burk jalapenoyoghurt",
          "1 bruk picklad gurka ",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 649, Fett 29g, Protein 37g, Kolhydrater 84g",
        recipeNumber: 3,
        savedIngredients:
          "jalapeño, gurka, gulärt, gräslök, persilja, grönsaker i fond",
        slug: "recept-vreta-gulaert-med-brynt-oertsmoer-sotad-jalapenoyoghurt-smaksatt-quinoa-and-picklad-gurka",
        startDate: "2023-09-11",
        steg: [
          "Ta fram 2 stekpannor. Stek quineoan i ena pannan på medelhög värme så den blir varm. Sätt den andra stekpannan på hög värme och stek gulärtorna så de får stekyta.",
          "Rör runt i jalapenoyoghurten. Häll av pickellagen från gurkan.",
          "Ta fram ett stort fat. Bottna med jalapenoyoghurten, sedan quinoan, strö över de stekta gulärtorna och sist den picklade gurkan.",
        ],
        title:
          "Vreta gulärt med brynt örtsmör, sotad jalapeñoyoghurt, smaksatt quinoa & picklad gurka.",
        weekNr: 37,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Ägg. Sojaprotein i sojafärs., basmatiris, rapsolja, grönsaksfond *selleri, persilja, vitlök, gullök, maizena, morot, socker, salt*, socker, salt, citron, Paprikamayo *grillad marinerad paprika, äggula, dijonsenap, rapsolja*, broccoli, ägg, sojafärs, chili.",
        createdAt: "2023-09-13T08:45:42.185352+00:00",
        freezabl: null,
        id: "clmhhyfg9ldib0buhq6b3xhyz",
        image: {
          url: "https://media.graphassets.com/OBfnO9WoTCSar0o9gR2N",
        },
        ingredients: [
          "1 låda smaksatt ris ",
          "1 låda broccoli",
          "1 låda sojafärs",
          "4 ägg",
          "1 burk paprikamayo",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4. Energi: 880kcal, Kolhydrat 84g, Fett 31g, Protein 39g ",
        recipeNumber: 1,
        savedIngredients: "sojafärs, paprika, broccoli, vitlök, chili",
        slug: "recept-bibimbap-smaksatt-basmatiris-het-stekt-sojafaers-sunny-side-aegg-grillad-paprikamayo-and-stekt-broccoli",
        startDate: "2023-09-04",
        steg: [
          "Sätt 2 stekpannor på medelhög värme. Stek riset i några minuter så det blir varmt och får lite nystekt yta. Stek broccolin på hög värme i den andra stekpannan med lite matfett i någon minut så den bli varm och får yta. När riset och broccolin är klar, dela upp och bottna med det på halvdjupa tallrikar. Använda sedan samma stekpanna, häll i lite olja och stek sojafärsen på medelhög värme tills de blir lite krispigt. Stek äggen i den andra stekpannan så som önskas. Vi gillar sunny side upp till denna rätt! När äggen är klara lägg de på riset. Toppa sist med sojafärsen på tallriken med riset, ägget och broccolin.",
          "Ringla sedan över paprikamayon över allt.",
        ],
        title:
          "Bibimbap, smaksatt basmatiris, het stekt sojafärs, sunny side ägg, grillad paprikamayo & stekt broccoli.",
        weekNr: 36,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten i libabröd. gröna linser, laktosfri grädde, galangal, chili, ingefära, krossad tomat, gullök , vitlök, tibabröd *vatten, salt, jäst, vetemjöl*, timjan, vitlök, rapsolja, grönsaksfond *persilja, lök, selleri, maizena*, socker. ",
        createdAt: "2023-09-13T08:15:00.124763+00:00",
        freezabl: null,
        id: "clmhguy4wkxon0btdavl19ezy",
        image: {
          url: "https://media.graphassets.com/xxaA3rF6RrHoGCDkF6zn",
        },
        ingredients: [
          "1 låda curry dahl",
          "2 påsar libabröd",
          "1 burk vitlöksolja",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 743, Kolhydrat 93g, Protein 33g, Fett 31g",
        recipeNumber: 2,
        savedIngredients:
          "laktosfri grädde, röd curry, vitlök, grönsaker i grönsaksfond",
        slug: "recept-var-kraemiga-heta-curry-dahl-pa-groena-linser-serveras-med-stekt-vitloeksbroed",
        startDate: "2023-09-04",
        steg: [
          "Ta fram en kastrull och en stekpanna. Värm curry dahlen tillsammans med 1 dl vatten eller grädde i kastrullen på medelhög värme så den blir varm. Tips: När den är varm och klar, sänk värmen och dra ner en matsked smör för att få den ännu godare. Stek libabröden i stekpannan på medelhög värme. Pensla på vitlöksoljan och vänd konstant till se blir varma, lägg undan tills alla är stekta.",
          "Servering: Lägg curry dahlen i halvdjup skål, skopa upp den med brödet, alternativt ät det var för sig.",
        ],
        title:
          "Vår krämiga heta Curry Dahl på gröna linser, serveras med stekt vitlöksbröd.",
        weekNr: 36,
      },
      {
        chef: {
          name: "Emil Petzén",
          title: "Kökschef / COO",
        },
        contentAllergies:
          "Allergener: Gluten i briochebröd. Laktos i hamburgarbröd. , Briochebröd *smör, äggula, vetemjöl, jäst, surdeg, salt*, halloumi, vitkål, äggula, rapsolja, dijonsenap, chili, cayennepeppar, ämnesgurka, ättika, socker, vatten, purjolök, senapsfrön, grönsaksfond *selleri, persilja, gullök, vitlök, salt, socker, maizena*, rödlök.",
        createdAt: "2023-09-13T08:05:49.780559+00:00",
        freezabl: null,
        id: "clmhgj5gtj16x0aui9sjkpatw",
        image: {
          url: "https://media.graphassets.com/mftSicSEQRuQQZ2TSUuH",
        },
        ingredients: [
          "4 briochebröd",
          "1 paket halloumi",
          "1 burk coleslaw",
          "1 rödlök",
          "1 burk picklad gurka",
        ],
        localizations: [],
        nutritionalValues:
          "Räknat per portion / 4, Kcal 810, Fett 38g, Kolhydrater 72g, Protein 33g",
        recipeNumber: 3,
        savedIngredients:
          "vitkål, ämnesgurka, äggula, dijonsenap, grönsaker i grönsaksfond, gurka",
        slug: "recept-halloumiburgare-med-briochebroed-fran-franska-bageriet-stekt-halloumi-oertig-och-het-yoghurtbaserad-coleslaw-dillfroepicklad-aemnesgurka-och-skuren-roedloek",
        startDate: "2023-09-04",
        steg: [
          "Ta fram två stekpannor. Dela bröden, stek med snittyta ner på medelvärme tills de blir gyllene och krispiga. Stek samtidigt halloumin på medelhög värme med lite matfett så även de blir gyllene och krispiga.",
          "Skär upp rödlöken så tunt som möjligt. Servering: Bottna med ett generöst lager med coleslaw och rödlöken på bottenbrödet. Sedan den picklade ämnesgurkan, toppa med halloumi och sedan brödets topplock.",
        ],
        title:
          "Halloumiburgare med briochebröd från Franska bageriet, stekt halloumi, örtig och het yoghurtbaserad coleslaw, dillfröpicklad ämnesgurka och skuren rödlök.",
        weekNr: 36,
      },
    ],
  },
};
