/* ============================================================
   DATI DIETE - NutriApp
   Ogni profilo è un oggetto autonomo.
   Per aggiungere una nuova dieta (es. la tua lunedì) basta
   copiare la struttura di "caterina" e cambiare i contenuti.
   ============================================================ */

const DIETE = {

  /* ---------------------------------------------------------
     PROFILO: CATERINA
     Fonte: Dott.ssa Loredana Vesci - 15 settembre 2026
     Dieta bilanciata 1200 kcal/die (Carbo 40% / Prot 24% / Grassi 36%)
     --------------------------------------------------------- */
  caterina: {
    nome: "Caterina",
    dottoressa: "Dott.ssa Loredana Vesci",
    data: "15 settembre 2026",
    kcal: 1200,
    macros: { carboidrati: 40, proteine: 24, grassi: 36 },
    pesoAttuale: 67.4,
    pesoObiettivo: 60,
    altezza: 170,

    // Ogni quanti giorni è concesso il pasto libero
    pastoLiberoOgniGiorni: 20,

    // Grammatura massima di cereali tra pranzo e cena
    maxCerealiGiornalieri: 120,

    premessa: "BMI 23.3 (normopeso). Massa muscolare normale 44.2 kg in 170 cm. Massa grassa sottocutanea superiore alla norma 30.8%, grasso viscerale normale (grado 3). Peso attuale 67.4 kg, obiettivo 60 kg.",

    regoleGenerali: [
      "Bere 1.8 L di acqua al giorno, anche come tisane calde o fredde a piacere.",
      "Camminare tutti i giorni 30 min consecutivi (tapis roulant o strada). Può saltare i 2 giorni di palestra.",
      "Salare poco con sale iodato, marino o rosa.",
      "Cuocere a vapore, griglia, forno, microonde o padella.",
      "Fritti ogni tanto con olio EVO o olio di semi di arachidi (punto di fumo 180°C).",
      "Odori e spezie a piacere, sempre liberi.",
      "1 cucchiaio di olio EVO a pranzo + 1 a cena.",
      "Dormire 6-8 ore al giorno.",
      "Condire verdure/secondi con spezie, limone, aceto di mele. Verdure anche centrifugate o come passato.",
      "I pesi dei cibi sono a crudo, al netto degli scarti.",
      "Contro la costipazione: 1 grano di lunga vita Fiuggi tutte le sere.",
      "Fame fuori pasto: finocchi, cetrioli, carote + tisana (camomilla/melissa). Eventuale 1 uovo sodo/die e fettine di avocado.",
      "Dolcificante: stevia. NO zucchero, neppure di canna.",
      "Coca Cola solo Zero. NO succhi di frutta.",
      "Pasto libero ogni 20 giorni (shock metabolico, es. pizza margherita).",
      "Se esce a cena prima dei 20 gg: alimenti indicati anche con più secondi (es. bistecca + patatine, o frittura di pesce), ma NO pizza e max 120 g di cereali tra pranzo e cena.",
      "Se mangia sushi prima dei 20 gg: max 12 rotolini di riso a cena (no cereali a pranzo), ok più sashimi."
    ],

    pasti: {
      colazione: {
        titolo: "Colazione",
        icona: "☕",
        istruzioni: "Un bicchiere di latte senza lattosio, o yogurt/kefir senza lattosio (anche con frutta) + UNA delle opzioni seguenti.",
        note: "NO plumcake. Se ha ancora fame: aggiungere 1 uovo (sodo, alla coque o strapazzato).",
        // Scegliere UNA opzione da questa lista
        opzioni: [
          "3 cucchiai di muesli o fiocchi di avena/riso/mais",
          "2 fette biscottate o 2 gallette con marmellata senza zucchero / burro senza lattosio / burro di arachidi o mandorle / nutella senza lattosio",
          "3 biscotti senza lattosio",
          "1 fetta di pane in cassetta tostata con una fettina di affettato o nutella senza lattosio",
          "150 g di frutta a piacere (intera, macedonia mista o frullata col latte)",
          "In alternativa a tutto: spremuta di 2 arance + 20 g di semi oleosi (zucca, girasole, mandorle, noccioline, nocciole)"
        ]
      },

      spuntinoMattina: {
        titolo: "Spuntino mattutino",
        icona: "🍎",
        istruzioni: "UNA scelta a piacere dalla lista.",
        opzioni: [
          "20 g di semi oleosi sgusciati (noci, noccioline, nocciole, mandorle, semi di zucca/girasole, pistacchi, pinoli...)",
          "Una manciatina (nel palmo) di lupini o olive verdi/nere",
          "1 yogurt / kefir / yogurt greco senza lattosio",
          "1 succo (tappo a vite) di mirtillo o ananas senza zucchero",
          "100 g di frutta a piacere (lamponi, mirtilli, papaia, mango, pompelmo, uva, cocco, mela, pera, avocado, arancia, banana, mandarini, mapo, caki, kiwi...)",
          "30-40 g di frutta disidratata (chips di mela, banana, prugne, albicocche, pomelo, zenzero, mirtilli...)",
          "30-40 g di frutta disidratata mista a semi oleosi",
          "Un bicchiere di latte senza lattosio",
          "Una coppetta piccola di gelato (cioccolato o frutta)"
        ]
      },

      pranzo: {
        titolo: "Pranzo",
        icona: "🍽️",
        istruzioni: "1 cereale + 1 secondo + ortaggi a volontà. 1 cucchiaio di olio EVO.",
        composizione: ["cereali", "secondi", "ortaggi"]
      },

      spuntinoPomeriggio: {
        titolo: "Spuntino pomeridiano",
        icona: "🥜",
        istruzioni: "UNA scelta a piacere dalla lista (stesse opzioni dello spuntino mattutino).",
        opzioni: [
          "20 g di semi oleosi sgusciati (noci, noccioline, nocciole, mandorle, semi di zucca/girasole, pistacchi, pinoli...)",
          "Una manciatina (nel palmo) di lupini o olive verdi/nere",
          "1 yogurt / kefir / yogurt greco senza lattosio",
          "1 succo (tappo a vite) di mirtillo o ananas senza zucchero",
          "100 g di frutta a piacere",
          "30-40 g di frutta disidratata",
          "30-40 g di frutta disidratata mista a semi oleosi",
          "Un bicchiere di latte senza lattosio",
          "Una coppetta piccola di gelato (cioccolato o frutta)"
        ]
      },

      cena: {
        titolo: "Cena",
        icona: "🌙",
        istruzioni: "1 cereale + 1 secondo + ortaggi a volontà. 1 cucchiaio di olio EVO.",
        composizione: ["cereali", "secondi", "ortaggi"]
      }
    },

    // Categorie di scambio usate da pranzo e cena
    categorie: {
      cereali: {
        titolo: "Cereale",
        icona: "🌾",
        istruzioni: "Scegli UNO. Si può mescolare con verdure, pomodoro, olio e parmigiano o col secondo.",
        // La grammatura base è riferita a pranzo/cena singola.
        opzioni: [
          "60 g di pasta / farro / orzo / riso / pastina / amaranto / grano saraceno / miglio / quinoa / tapioca / cous cous / farina di mais / semolino",
          "60 g di pane di qualsiasi tipo",
          "4 gallette o 4 cracker o 4 wasa",
          "80 g di tortellini / ravioli / agnolotti / lasagna / gnocchi"
        ]
      },
      secondi: {
        titolo: "Secondo",
        icona: "🍗",
        istruzioni: "Scegli UNO (anche metà di uno e metà di un altro).",
        opzioni: [
          "90 g di carne bianca (pollo, tacchino, coniglio - qualsiasi taglio)",
          "90 g di carne rossa (vitello, manzo, maiale, ovino, agnello)",
          "100 g di pesce a piacere (spada, acciughe, sarde, gamberi, triglia, sogliola, orata, spigola, merluzzo, salmone...) o 3 bastoncini al forno",
          "90 g di tonno o sgombro al naturale",
          "1 piatto di cozze o vongole",
          "90 g di seitan / muscolo di grano / tofu / tempeh",
          "30 g di legumi secchi (fagioli, ceci, lenticchie, cicerchie, soia) oppure 90 g già cotti in barattolo",
          "2 uova",
          "80 g di affettati (bresaola, crudo, cotto, fesa di tacchino, salmone affumicato, pesce spada...)",
          "90 g di formaggio fresco/caciottine (brie, toma, ricotta di mucca, asiago, caciocavallo, caciotta, certosino, emmenthal, stracchino, yocca, mozzarella, feta, primo sale senza lattosio...)",
          "1 bicchiere di yogurt/kefir senza lattosio o 1 yogurt greco senza lattosio"
        ]
      },
      ortaggi: {
        titolo: "Ortaggi",
        icona: "🥦",
        istruzioni: "A volontà, crudi o cotti o come passato.",
        opzioni: [
          "Zucchine, zucca, broccoli, cavoli, insalata iceberg, asparagi, fiori di zucca, funghi, finocchi, cetrioli, ravanelli, rape rosse, cicoria, spinaci, rucola, pomodori, carciofi, indivia, scarola...",
          "Fagiolini (ok anche se legumi, basso carico proteico)",
          "Patate come contorno: 150 g"
        ]
      }
    },

    noteCereali: "Si possono spostare i cereali della sera a pranzo: es. 120 g a pranzo e 0 la sera, oppure 100 g a pranzo e 20 g la sera (max 120 g totali). Se non mangia il secondo a pranzo, aggiungerlo alla cena (anche due diversi).",

    abitudini: [
      { id: "acqua", label: "Bere 1.8 L di acqua", icona: "💧" },
      { id: "camminata", label: "Camminare 30 min", icona: "🚶‍♀️" },
      { id: "olioPranzo", label: "Olio EVO a pranzo", icona: "🫒" },
      { id: "olioCena", label: "Olio EVO a cena", icona: "🫒" },
      { id: "fiuggi", label: "Grano di lunga vita Fiuggi (sera)", icona: "🌙" },
      { id: "sonno", label: "Dormire 6-8 ore", icona: "😴" }
    ],

    /* -------------------------------------------------------
       CALORIE STIMATE (valori standard di riferimento)
       Ogni chiave corrisponde a un pasto o categoria; l'array
       ha una kcal per ogni opzione, NELLO STESSO ORDINE delle
       opzioni definite sopra. Sono stime medie della porzione
       indicata (include il condimento tipico: 1 cucchiaio olio
       EVO ~90 kcal è già considerato nei pasti principali).
       Valori arrotondati, servono da guida non da bilancia.
       ------------------------------------------------------- */
    kcalTabella: {
      colazione: [130, 160, 150, 170, 90, 230],
      spuntinoMattina: [120, 90, 90, 80, 60, 120, 150, 90, 110],
      spuntinoPomeriggio: [120, 90, 90, 80, 60, 120, 150, 90, 110],
      cereali: [210, 160, 130, 220],   // pasta/pane/gallette/tortellini (porzione indicata)
      secondi: [150, 190, 140, 110, 90, 160, 110, 155, 130, 240, 90],
      ortaggi: [40, 45, 115]           // verdure libere ~40, fagiolini, patate 150g
    },

    /* -------------------------------------------------------
       RICETTARIO
       Ricette pronte per ciascun tipo di pasto, coerenti con
       le porzioni della dieta. Ogni ricetta:
       - tipo: a quale pasto appartiene (colazione/pranzo/cena/spuntino)
       - kcal: totale stimato
       - sale: indicazione esplicita del sale
       - ingredienti: [{ nome, qta }]
       - preparazione: passi
       - applica: (opzionale) come compila gli slot del pasto
         { cereali:<indice opzione>, secondi:<indice>, ortaggi:<indice> }
         oppure { scelta:<indice> } per colazione/spuntini
       ------------------------------------------------------- */
    ricette: [
      {
        id: "pasta-zucchine-pollo",
        nome: "Pasta con zucchine e petto di pollo",
        tipo: "pranzo",
        icona: "🍝",
        kcal: 400,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua di cottura",
        ingredienti: [
          { nome: "Pasta", qta: "60 g" },
          { nome: "Petto di pollo", qta: "90 g" },
          { nome: "Zucchine", qta: "150 g (a volontà)" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" },
          { nome: "Aglio / basilico / pepe", qta: "q.b." }
        ],
        preparazione: [
          "Lessa la pasta in acqua con 1 pizzico di sale.",
          "Taglia le zucchine a rondelle e saltale in padella con poco olio e aglio.",
          "Aggiungi il pollo a straccetti e cuoci finché è dorato.",
          "Scola la pasta, mantecala con zucchine e pollo, completa con basilico."
        ],
        applica: { cereali: 0, secondi: 0, ortaggi: 0 }
      },
      {
        id: "orata-forno-patate",
        nome: "Orata al forno con patate",
        tipo: "cena",
        icona: "🐟",
        kcal: 350,
        sale: "1 pizzico di sale iodato (circa 1 g) sul pesce e sulle patate",
        ingredienti: [
          { nome: "Orata (o spigola/merluzzo)", qta: "100 g" },
          { nome: "Patate", qta: "150 g" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" },
          { nome: "Limone / rosmarino / prezzemolo", qta: "q.b." }
        ],
        preparazione: [
          "Taglia le patate a fette sottili, condiscile con olio, sale e rosmarino.",
          "Adagia l'orata pulita in teglia con le patate intorno.",
          "Irrora con succo di limone e un filo d'olio.",
          "Cuoci in forno a 190°C per circa 25-30 minuti."
        ],
        applica: { cereali: null, secondi: 2, ortaggi: 2 }
      },
      {
        id: "riso-legumi-verdure",
        nome: "Riso con lenticchie e verdure",
        tipo: "pranzo",
        icona: "🍚",
        kcal: 360,
        sale: "1 pizzico di sale iodato (circa 1 g) a fine cottura",
        ingredienti: [
          { nome: "Riso", qta: "60 g" },
          { nome: "Lenticchie secche", qta: "30 g" },
          { nome: "Verdure miste (carote, sedano, spinaci)", qta: "a volontà" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Ammolla/cuoci le lenticchie finché tenere.",
          "Lessa il riso con 1 pizzico di sale.",
          "Salta le verdure in padella con poco olio.",
          "Unisci riso, lenticchie e verdure, completa con un filo d'olio a crudo."
        ],
        applica: { cereali: 0, secondi: 6, ortaggi: 0 }
      },
      {
        id: "frittata-verdure",
        nome: "Frittata di verdure al forno",
        tipo: "cena",
        icona: "🍳",
        kcal: 330,
        sale: "1 pizzico di sale iodato (circa 1 g) nelle uova sbattute",
        ingredienti: [
          { nome: "Uova", qta: "2" },
          { nome: "Pane", qta: "60 g (a parte)" },
          { nome: "Zucchine / spinaci / cipolla", qta: "a volontà" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Sbatti le uova con 1 pizzico di sale e pepe.",
          "Unisci le verdure tagliate fini.",
          "Versa in una teglia unta e cuoci in forno a 180°C per 20 min.",
          "Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 7, ortaggi: 0 }
      },
      {
        id: "yogurt-avena-frutta",
        nome: "Yogurt con avena e frutta",
        tipo: "colazione",
        icona: "🥣",
        kcal: 260,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Yogurt senza lattosio", qta: "1 vasetto" },
          { nome: "Fiocchi di avena", qta: "3 cucchiai" },
          { nome: "Frutta fresca a pezzi", qta: "100-150 g" }
        ],
        preparazione: [
          "Versa lo yogurt in una ciotola.",
          "Aggiungi i fiocchi di avena.",
          "Completa con la frutta a pezzi. Dolcifica con stevia se serve."
        ],
        applica: { scelta: 0 }
      },
      {
        id: "toast-bresaola",
        nome: "Toast con affettato magro",
        tipo: "colazione",
        icona: "🍞",
        kcal: 200,
        sale: "Non aggiungere sale (l'affettato è già sapido)",
        ingredienti: [
          { nome: "Pane in cassetta", qta: "1 fetta" },
          { nome: "Bresaola / fesa di tacchino", qta: "1 fettina" }
        ],
        preparazione: [
          "Tosta la fetta di pane.",
          "Aggiungi la fettina di affettato magro."
        ],
        applica: { scelta: 3 }
      },
      {
        id: "semi-frutta-disidratata",
        nome: "Mix semi e frutta disidratata",
        tipo: "spuntino",
        icona: "🥜",
        kcal: 150,
        sale: "Non serve sale (scegli semi al naturale, non salati)",
        ingredienti: [
          { nome: "Semi oleosi misti", qta: "20 g" },
          { nome: "Frutta disidratata", qta: "20 g" }
        ],
        preparazione: [
          "Unisci semi e frutta disidratata in una piccola porzione da portare con te."
        ],
        applica: { scelta: 6 }
      },

      /* ---- PRANZO ---- */
      {
        id: "farro-tonno-pomodorini",
        nome: "Insalata di farro con tonno e pomodorini",
        tipo: "pranzo",
        icona: "🥗",
        kcal: 370,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua del farro",
        ingredienti: [
          { nome: "Farro", qta: "60 g" },
          { nome: "Tonno al naturale", qta: "90 g" },
          { nome: "Pomodorini", qta: "a volontà" },
          { nome: "Rucola / basilico", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa il farro in acqua con 1 pizzico di sale, poi raffreddalo.",
          "Sgocciola il tonno e sbriciolalo.",
          "Taglia i pomodorini a metà.",
          "Unisci tutto con rucola, olio a crudo e basilico."
        ],
        applica: { cereali: 0, secondi: 3, ortaggi: 0 }
      },
      {
        id: "pasta-pomodoro-mozzarella",
        nome: "Pasta al pomodoro con mozzarella",
        tipo: "pranzo",
        icona: "🍅",
        kcal: 420,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua di cottura",
        ingredienti: [
          { nome: "Pasta", qta: "60 g" },
          { nome: "Mozzarella (o formaggio fresco)", qta: "90 g" },
          { nome: "Passata di pomodoro", qta: "q.b." },
          { nome: "Basilico", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa la pasta con 1 pizzico di sale.",
          "Scalda la passata di pomodoro con un filo d'olio e basilico.",
          "Condisci la pasta con il sugo e aggiungi la mozzarella a pezzetti."
        ],
        applica: { cereali: 0, secondi: 9, ortaggi: 0 }
      },
      {
        id: "riso-gamberi-zucchine",
        nome: "Riso con gamberi e zucchine",
        tipo: "pranzo",
        icona: "🦐",
        kcal: 390,
        sale: "1 pizzico di sale iodato (circa 1 g) a fine cottura",
        ingredienti: [
          { nome: "Riso", qta: "60 g" },
          { nome: "Gamberi", qta: "100 g" },
          { nome: "Zucchine", qta: "a volontà" },
          { nome: "Aglio / prezzemolo / limone", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa il riso con 1 pizzico di sale.",
          "Salta le zucchine a dadini con aglio e poco olio.",
          "Aggiungi i gamberi e cuoci pochi minuti.",
          "Manteca col riso, completa con prezzemolo e succo di limone."
        ],
        applica: { cereali: 0, secondi: 2, ortaggi: 0 }
      },
      {
        id: "couscous-verdure-ceci",
        nome: "Cous cous con verdure e ceci",
        tipo: "pranzo",
        icona: "🌱",
        kcal: 380,
        sale: "1 pizzico di sale iodato (circa 1 g) nel brodo/acqua",
        ingredienti: [
          { nome: "Cous cous", qta: "60 g" },
          { nome: "Ceci cotti", qta: "90 g" },
          { nome: "Verdure miste (peperoni, zucchine, carote)", qta: "a volontà" },
          { nome: "Curcuma / paprika / menta", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Reidrata il cous cous con acqua calda leggermente salata e un filo d'olio.",
          "Salta le verdure a dadini in padella con le spezie.",
          "Unisci i ceci e le verdure al cous cous, mescola bene."
        ],
        applica: { cereali: 0, secondi: 6, ortaggi: 0 }
      },
      {
        id: "insalatona-pollo",
        nome: "Insalatona con pollo e gallette",
        tipo: "pranzo",
        icona: "🥬",
        kcal: 320,
        sale: "1 pizzico di sale iodato (circa 1 g) sul pollo",
        ingredienti: [
          { nome: "Petto di pollo", qta: "90 g" },
          { nome: "Gallette", qta: "4" },
          { nome: "Insalata mista, pomodori, cetrioli", qta: "a volontà" },
          { nome: "Aceto di mele / limone", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Cuoci il pollo alla griglia o in padella con 1 pizzico di sale.",
          "Prepara un'insalata abbondante e taglia il pollo a strisce.",
          "Condisci con olio, aceto di mele e servi con le gallette."
        ],
        applica: { cereali: 2, secondi: 0, ortaggi: 0 }
      },

      /* ---- CENA ---- */
      {
        id: "salmone-broccoli-pane",
        nome: "Salmone al vapore con broccoli",
        tipo: "cena",
        icona: "🐠",
        kcal: 360,
        sale: "1 pizzico di sale iodato (circa 1 g) sul salmone",
        ingredienti: [
          { nome: "Salmone", qta: "100 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Broccoli", qta: "a volontà" },
          { nome: "Limone / aneto", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Cuoci il salmone al vapore con un pizzico di sale e aneto.",
          "Lessa o cuoci al vapore i broccoli.",
          "Condisci con olio a crudo e limone. Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 2, ortaggi: 0 }
      },
      {
        id: "vitello-insalata",
        nome: "Fettina di vitello con insalata",
        tipo: "cena",
        icona: "🥩",
        kcal: 340,
        sale: "1 pizzico di sale iodato (circa 1 g) sulla carne",
        ingredienti: [
          { nome: "Vitello (fettina)", qta: "90 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Insalata mista e pomodori", qta: "a volontà" },
          { nome: "Rosmarino / limone", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Scotta la fettina in padella antiaderente con un pizzico di sale.",
          "Prepara un'insalata fresca condita con olio a crudo.",
          "Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 1, ortaggi: 0 }
      },
      {
        id: "tofu-verdure-saltate",
        nome: "Tofu saltato con verdure",
        tipo: "cena",
        icona: "🥢",
        kcal: 330,
        sale: "Poca salsa di soia al posto del sale (usa con moderazione)",
        ingredienti: [
          { nome: "Tofu", qta: "90 g" },
          { nome: "Riso", qta: "60 g" },
          { nome: "Verdure miste (peperoni, carote, cavolo)", qta: "a volontà" },
          { nome: "Zenzero / salsa di soia", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa il riso.",
          "Taglia il tofu a cubetti e rosolalo in padella.",
          "Aggiungi le verdure a julienne e lo zenzero, salta a fuoco vivo.",
          "Sfuma con poca salsa di soia e servi col riso."
        ],
        applica: { cereali: 0, secondi: 5, ortaggi: 0 }
      },
      {
        id: "merluzzo-patate-forno",
        nome: "Merluzzo al forno con patate",
        tipo: "cena",
        icona: "🍽️",
        kcal: 330,
        sale: "1 pizzico di sale iodato (circa 1 g) su pesce e patate",
        ingredienti: [
          { nome: "Merluzzo", qta: "100 g" },
          { nome: "Patate", qta: "150 g" },
          { nome: "Prezzemolo / aglio / limone", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Taglia le patate a tocchetti e condiscile con olio, sale, aglio.",
          "Adagia il merluzzo in teglia con le patate.",
          "Cuoci in forno a 190°C per 25-30 min, completa con prezzemolo e limone."
        ],
        applica: { cereali: null, secondi: 2, ortaggi: 2 }
      },
      {
        id: "caprese-pane",
        nome: "Caprese di mozzarella con pane",
        tipo: "cena",
        icona: "🧀",
        kcal: 340,
        sale: "Solo un pizzico di sale sui pomodori (circa 0.5 g)",
        ingredienti: [
          { nome: "Mozzarella / primo sale senza lattosio", qta: "90 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Pomodori", qta: "a volontà" },
          { nome: "Basilico / origano", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Affetta mozzarella e pomodori e alternali sul piatto.",
          "Condisci con olio, basilico e un pizzico di sale.",
          "Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 9, ortaggi: 0 }
      },
      {
        id: "zuppa-legumi-crostini",
        nome: "Zuppa di lenticchie con crostini",
        tipo: "cena",
        icona: "🍲",
        kcal: 320,
        sale: "1 pizzico di sale iodato (circa 1 g) a fine cottura",
        ingredienti: [
          { nome: "Lenticchie secche", qta: "30 g" },
          { nome: "Pane (per crostini)", qta: "60 g" },
          { nome: "Sedano, carota, cipolla", qta: "a volontà" },
          { nome: "Alloro / pepe", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Prepara un soffritto leggero di sedano, carota e cipolla con poco olio.",
          "Aggiungi le lenticchie e acqua, cuoci finché tenere.",
          "Aggiusta con un pizzico di sale, servi con crostini di pane tostato."
        ],
        applica: { cereali: 1, secondi: 6, ortaggi: 0 }
      },

      /* ---- COLAZIONE ---- */
      {
        id: "latte-biscotti",
        nome: "Latte con biscotti",
        tipo: "colazione",
        icona: "🥛",
        kcal: 220,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Latte senza lattosio", qta: "1 bicchiere" },
          { nome: "Biscotti senza lattosio", qta: "3" }
        ],
        preparazione: [
          "Scalda il latte a piacere.",
          "Accompagna con i biscotti. Dolcifica con stevia se serve."
        ],
        applica: { scelta: 2 }
      },
      {
        id: "spremuta-semi",
        nome: "Spremuta d'arancia con semi oleosi",
        tipo: "colazione",
        icona: "🍊",
        kcal: 230,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Arance", qta: "2 (spremuta)" },
          { nome: "Semi oleosi (mandorle/noci)", qta: "20 g" }
        ],
        preparazione: [
          "Spremi le arance al momento.",
          "Accompagna con una porzione di semi oleosi."
        ],
        applica: { scelta: 5 }
      },
      {
        id: "gallette-marmellata",
        nome: "Gallette con marmellata senza zucchero",
        tipo: "colazione",
        icona: "🍓",
        kcal: 160,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Gallette (o fette biscottate)", qta: "2" },
          { nome: "Marmellata senza zucchero", qta: "q.b." },
          { nome: "Yogurt senza lattosio", qta: "1 (a parte)" }
        ],
        preparazione: [
          "Spalma la marmellata senza zucchero sulle gallette.",
          "Accompagna con uno yogurt senza lattosio."
        ],
        applica: { scelta: 1 }
      },

      /* ---- SPUNTINO ---- */
      {
        id: "yogurt-greco",
        nome: "Yogurt greco senza lattosio",
        tipo: "spuntino",
        icona: "🥛",
        kcal: 90,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Yogurt greco senza lattosio", qta: "1 vasetto" }
        ],
        preparazione: [
          "Gustalo così com'è, eventualmente con stevia o un po' di cannella."
        ],
        applica: { scelta: 2 }
      },
      {
        id: "frutta-fresca",
        nome: "Frutta fresca di stagione",
        tipo: "spuntino",
        icona: "🍏",
        kcal: 60,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Frutta a piacere", qta: "100 g" }
        ],
        preparazione: [
          "Scegli la frutta che preferisci (mela, pera, agrumi, frutti di bosco...)."
        ],
        applica: { scelta: 4 }
      },
      {
        id: "olive-lupini",
        nome: "Olive o lupini",
        tipo: "spuntino",
        icona: "🫒",
        kcal: 90,
        sale: "Scegli olive/lupini poco salati; sciacquali se troppo sapidi",
        ingredienti: [
          { nome: "Olive verdi/nere o lupini", qta: "una manciata (nel palmo)" }
        ],
        preparazione: [
          "Porzione che sta nel palmo della mano, come spuntino salato."
        ],
        applica: { scelta: 1 }
      }
    ]
  }

  /* ---------------------------------------------------------
     PROFILO: (LA TUA DIETA - da aggiungere lunedì)
     Copiare il blocco "caterina" qui sotto, rinominare la
     chiave (es. "matteo") e sostituire i contenuti.
     --------------------------------------------------------- */

};
