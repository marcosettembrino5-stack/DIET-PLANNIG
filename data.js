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
      },

      /* ==== PRANZO (aggiunte) ==== */
      {
        id: "orzo-pollo-verdure",
        nome: "Orzo con pollo e verdure grigliate",
        tipo: "pranzo",
        icona: "🍛",
        kcal: 390,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua dell'orzo",
        ingredienti: [
          { nome: "Orzo", qta: "60 g" },
          { nome: "Petto di pollo", qta: "90 g" },
          { nome: "Zucchine e melanzane grigliate", qta: "a volontà" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa l'orzo con 1 pizzico di sale.",
          "Griglia il pollo e le verdure a fette.",
          "Unisci tutto e condisci con olio a crudo e spezie."
        ],
        applica: { cereali: 0, secondi: 0, ortaggi: 0 }
      },
      {
        id: "pasta-tonno-olive",
        nome: "Pasta con tonno e olive",
        tipo: "pranzo",
        icona: "🍝",
        kcal: 400,
        sale: "1 pizzico di sale iodato (circa 1 g); attenzione alle olive già sapide",
        ingredienti: [
          { nome: "Pasta", qta: "60 g" },
          { nome: "Tonno al naturale", qta: "90 g" },
          { nome: "Pomodorini e olive", qta: "a volontà" },
          { nome: "Prezzemolo / peperoncino", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa la pasta con 1 pizzico di sale.",
          "Salta pomodorini e olive con poco olio.",
          "Aggiungi il tonno sgocciolato, manteca con la pasta."
        ],
        applica: { cereali: 0, secondi: 3, ortaggi: 0 }
      },
      {
        id: "quinoa-legumi",
        nome: "Quinoa con ceci e verdure",
        tipo: "pranzo",
        icona: "🥗",
        kcal: 380,
        sale: "1 pizzico di sale iodato (circa 1 g) a fine cottura",
        ingredienti: [
          { nome: "Quinoa", qta: "60 g" },
          { nome: "Ceci cotti", qta: "90 g" },
          { nome: "Spinaci e pomodorini", qta: "a volontà" },
          { nome: "Limone / cumino", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Sciacqua e lessa la quinoa con 1 pizzico di sale.",
          "Salta velocemente gli spinaci in padella.",
          "Unisci quinoa, ceci e verdure, condisci con olio e limone."
        ],
        applica: { cereali: 0, secondi: 6, ortaggi: 0 }
      },
      {
        id: "risotto-funghi",
        nome: "Risotto ai funghi",
        tipo: "pranzo",
        icona: "🍄",
        kcal: 400,
        sale: "1 pizzico di sale iodato (circa 1 g) nel brodo vegetale",
        ingredienti: [
          { nome: "Riso", qta: "60 g" },
          { nome: "Funghi", qta: "a volontà" },
          { nome: "Formaggio fresco (per mantecare)", qta: "90 g" },
          { nome: "Prezzemolo / brodo vegetale", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Trifola i funghi con poco olio.",
          "Tosta il riso, aggiungi i funghi e cuoci col brodo poco alla volta.",
          "Manteca a fine cottura con il formaggio fresco."
        ],
        applica: { cereali: 0, secondi: 9, ortaggi: 0 }
      },
      {
        id: "pasta-fredda-verdure",
        nome: "Pasta fredda con verdure e uova sode",
        tipo: "pranzo",
        icona: "🥗",
        kcal: 410,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua di cottura",
        ingredienti: [
          { nome: "Pasta", qta: "60 g" },
          { nome: "Uova", qta: "2 (sode)" },
          { nome: "Pomodorini, mais, rucola", qta: "a volontà" },
          { nome: "Basilico", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa la pasta, scolala e raffreddala.",
          "Rassoda le uova e tagliale a spicchi.",
          "Unisci verdure e uova, condisci con olio a crudo e basilico."
        ],
        applica: { cereali: 0, secondi: 7, ortaggi: 0 }
      },
      {
        id: "gnocchi-pomodoro",
        nome: "Gnocchi al pomodoro e basilico",
        tipo: "pranzo",
        icona: "🥔",
        kcal: 380,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua e nel sugo",
        ingredienti: [
          { nome: "Gnocchi", qta: "80 g" },
          { nome: "Formaggio fresco", qta: "90 g" },
          { nome: "Passata di pomodoro", qta: "q.b." },
          { nome: "Basilico", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Cuoci gli gnocchi in acqua salata finché salgono a galla.",
          "Condisci con sugo di pomodoro e basilico.",
          "Completa con il formaggio fresco a pezzetti."
        ],
        applica: { cereali: 3, secondi: 9, ortaggi: 0 }
      },
      {
        id: "farro-sgombro",
        nome: "Farro con sgombro e rucola",
        tipo: "pranzo",
        icona: "🐟",
        kcal: 380,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua del farro",
        ingredienti: [
          { nome: "Farro", qta: "60 g" },
          { nome: "Sgombro al naturale", qta: "90 g" },
          { nome: "Rucola e pomodorini", qta: "a volontà" },
          { nome: "Limone", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa il farro e raffreddalo.",
          "Sgocciola lo sgombro e sbriciolalo.",
          "Unisci rucola, pomodorini, olio e limone."
        ],
        applica: { cereali: 0, secondi: 3, ortaggi: 0 }
      },
      {
        id: "wrap-tacchino",
        nome: "Wrap di pane con tacchino e verdure",
        tipo: "pranzo",
        icona: "🌯",
        kcal: 350,
        sale: "Non aggiungere sale (l'affettato è già sapido)",
        ingredienti: [
          { nome: "Pane / piadina leggera", qta: "60 g" },
          { nome: "Fesa di tacchino", qta: "80 g" },
          { nome: "Insalata, pomodoro, carote", qta: "a volontà" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Farcisci il pane con tacchino e verdure fresche.",
          "Aggiungi un filo d'olio, arrotola e taglia a metà."
        ],
        applica: { cereali: 1, secondi: 8, ortaggi: 0 }
      },

      /* ==== CENA (aggiunte) ==== */
      {
        id: "spigola-cartoccio",
        nome: "Spigola al cartoccio con verdure",
        tipo: "cena",
        icona: "🐟",
        kcal: 340,
        sale: "1 pizzico di sale iodato (circa 1 g) sul pesce",
        ingredienti: [
          { nome: "Spigola", qta: "100 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Zucchine e pomodorini", qta: "a volontà" },
          { nome: "Limone / prezzemolo", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Adagia la spigola su carta forno con le verdure.",
          "Condisci con olio, sale, limone e chiudi il cartoccio.",
          "Cuoci in forno a 190°C per 20-25 min. Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 2, ortaggi: 0 }
      },
      {
        id: "pollo-limone-insalata",
        nome: "Pollo al limone con insalata",
        tipo: "cena",
        icona: "🍗",
        kcal: 330,
        sale: "1 pizzico di sale iodato (circa 1 g) sul pollo",
        ingredienti: [
          { nome: "Petto di pollo", qta: "90 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Insalata mista", qta: "a volontà" },
          { nome: "Limone / rosmarino", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Cuoci il pollo in padella con succo di limone e rosmarino.",
          "Servi con insalata condita con olio a crudo e il pane."
        ],
        applica: { cereali: 1, secondi: 0, ortaggi: 0 }
      },
      {
        id: "frittata-spinaci",
        nome: "Frittata di spinaci al forno",
        tipo: "cena",
        icona: "🍳",
        kcal: 330,
        sale: "1 pizzico di sale iodato (circa 1 g) nelle uova",
        ingredienti: [
          { nome: "Uova", qta: "2" },
          { nome: "Pane", qta: "60 g (a parte)" },
          { nome: "Spinaci", qta: "a volontà" },
          { nome: "Noce moscata / pepe", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Sbatti le uova con un pizzico di sale e noce moscata.",
          "Unisci gli spinaci lessati e strizzati.",
          "Cuoci in forno a 180°C per 20 min. Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 7, ortaggi: 0 }
      },
      {
        id: "cozze-marinara-pane",
        nome: "Cozze alla marinara con pane",
        tipo: "cena",
        icona: "🦪",
        kcal: 320,
        sale: "Non aggiungere sale (le cozze rilasciano acqua già sapida)",
        ingredienti: [
          { nome: "Cozze", qta: "1 piatto" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Pomodorini", qta: "a volontà" },
          { nome: "Aglio / prezzemolo / pepe", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Fai aprire le cozze in padella con aglio, olio e pomodorini.",
          "Completa con prezzemolo e pepe.",
          "Servi con il pane per la scarpetta."
        ],
        applica: { cereali: 1, secondi: 4, ortaggi: 0 }
      },
      {
        id: "tempeh-verdure-forno",
        nome: "Tempeh con verdure al forno",
        tipo: "cena",
        icona: "🌱",
        kcal: 330,
        sale: "1 pizzico di sale iodato (circa 1 g) sulle verdure",
        ingredienti: [
          { nome: "Tempeh", qta: "90 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Peperoni, zucchine, cipolla", qta: "a volontà" },
          { nome: "Paprika / timo", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Taglia il tempeh a fette e le verdure a tocchetti.",
          "Condisci con olio, sale e spezie, disponi in teglia.",
          "Cuoci in forno a 190°C per 20-25 min. Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 5, ortaggi: 0 }
      },
      {
        id: "burger-legumi",
        nome: "Burger di legumi con insalata",
        tipo: "cena",
        icona: "🍔",
        kcal: 340,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'impasto",
        ingredienti: [
          { nome: "Lenticchie/ceci secchi", qta: "30 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Insalata e pomodoro", qta: "a volontà" },
          { nome: "Cumino / prezzemolo", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Cuoci i legumi, schiacciali e impasta con spezie e un pizzico di sale.",
          "Forma un burger e cuocilo in padella con poco olio.",
          "Servi con pane e insalata."
        ],
        applica: { cereali: 1, secondi: 6, ortaggi: 0 }
      },
      {
        id: "ricotta-verdure-pane",
        nome: "Ricotta con verdure grigliate",
        tipo: "cena",
        icona: "🧀",
        kcal: 330,
        sale: "1 pizzico di sale iodato (circa 1 g) sulle verdure",
        ingredienti: [
          { nome: "Ricotta di mucca", qta: "90 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Zucchine, melanzane, peperoni grigliati", qta: "a volontà" },
          { nome: "Menta / pepe", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Griglia le verdure a fette.",
          "Servi la ricotta accanto alle verdure, condisci con olio e menta.",
          "Accompagna con il pane."
        ],
        applica: { cereali: 1, secondi: 9, ortaggi: 0 }
      },
      {
        id: "passato-verdure-crostini",
        nome: "Passato di verdure con crostini e uovo",
        tipo: "cena",
        icona: "🍲",
        kcal: 310,
        sale: "1 pizzico di sale iodato (circa 1 g) nel passato",
        ingredienti: [
          { nome: "Uovo", qta: "2 (in camicia o sodo)" },
          { nome: "Pane (crostini)", qta: "60 g" },
          { nome: "Verdure miste per passato", qta: "a volontà" },
          { nome: "Pepe / erbe", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa le verdure e frullale in un passato.",
          "Aggiusta con un pizzico di sale e un filo d'olio a crudo.",
          "Servi con crostini e l'uovo."
        ],
        applica: { cereali: 1, secondi: 7, ortaggi: 0 }
      },
      {
        id: "tacchino-verdure",
        nome: "Straccetti di tacchino con verdure",
        tipo: "cena",
        icona: "🦃",
        kcal: 330,
        sale: "1 pizzico di sale iodato (circa 1 g) sul tacchino",
        ingredienti: [
          { nome: "Tacchino", qta: "90 g" },
          { nome: "Pane", qta: "60 g" },
          { nome: "Zucchine e carote", qta: "a volontà" },
          { nome: "Curry / limone", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Taglia il tacchino a straccetti e saltalo in padella con poco olio.",
          "Aggiungi le verdure a julienne e un pizzico di sale.",
          "Insaporisci con curry o limone. Servi con il pane."
        ],
        applica: { cereali: 1, secondi: 0, ortaggi: 0 }
      },

      /* ==== COLAZIONE (aggiunte) ==== */
      {
        id: "porridge-avena",
        nome: "Porridge di avena e latte",
        tipo: "colazione",
        icona: "🥣",
        kcal: 250,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Latte senza lattosio", qta: "1 bicchiere" },
          { nome: "Fiocchi di avena", qta: "3 cucchiai" },
          { nome: "Cannella / stevia", qta: "q.b." }
        ],
        preparazione: [
          "Scalda il latte con i fiocchi di avena mescolando.",
          "Cuoci finché diventa cremoso, aromatizza con cannella e stevia."
        ],
        applica: { scelta: 0 }
      },
      {
        id: "kefir-frutta",
        nome: "Kefir con frutta fresca",
        tipo: "colazione",
        icona: "🫐",
        kcal: 180,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Kefir senza lattosio", qta: "1 bicchiere" },
          { nome: "Frutta fresca (frutti di bosco/banana)", qta: "150 g" }
        ],
        preparazione: [
          "Versa il kefir in una ciotola.",
          "Aggiungi la frutta a pezzi. Dolcifica con stevia se serve."
        ],
        applica: { scelta: 4 }
      },
      {
        id: "pane-nutella",
        nome: "Pane tostato con nutella senza lattosio",
        tipo: "colazione",
        icona: "🍫",
        kcal: 190,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Pane in cassetta", qta: "1 fetta" },
          { nome: "Nutella senza lattosio (o burro di arachidi)", qta: "1 cucchiaino" }
        ],
        preparazione: [
          "Tosta la fetta di pane.",
          "Spalma un velo di crema alle nocciole o burro di arachidi."
        ],
        applica: { scelta: 3 }
      },
      {
        id: "macedonia-frullata",
        nome: "Macedonia frullata col latte",
        tipo: "colazione",
        icona: "🥤",
        kcal: 170,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Frutta mista", qta: "150 g" },
          { nome: "Latte senza lattosio", qta: "q.b." }
        ],
        preparazione: [
          "Frulla la frutta con un po' di latte fino a ottenere un frappè.",
          "Dolcifica con stevia se preferisci."
        ],
        applica: { scelta: 4 }
      },
      {
        id: "yogurt-muesli",
        nome: "Yogurt con muesli",
        tipo: "colazione",
        icona: "🥣",
        kcal: 240,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Yogurt senza lattosio", qta: "1 vasetto" },
          { nome: "Muesli", qta: "3 cucchiai" }
        ],
        preparazione: [
          "Versa lo yogurt in una ciotola e aggiungi il muesli.",
          "Mescola e gusta subito per mantenerlo croccante."
        ],
        applica: { scelta: 0 }
      },
      {
        id: "fette-burro-arachidi",
        nome: "Fette biscottate con burro di arachidi",
        tipo: "colazione",
        icona: "🥜",
        kcal: 200,
        sale: "Scegli burro di arachidi senza sale aggiunto",
        ingredienti: [
          { nome: "Fette biscottate", qta: "2" },
          { nome: "Burro di arachidi (o di mandorle)", qta: "1 cucchiaino" }
        ],
        preparazione: [
          "Spalma un velo di burro di arachidi sulle fette biscottate."
        ],
        applica: { scelta: 1 }
      },

      /* ==== SPUNTINO (aggiunte) ==== */
      {
        id: "spuntino-mandorle",
        nome: "Mandorle o noci",
        tipo: "spuntino",
        icona: "🌰",
        kcal: 120,
        sale: "Scegli frutta secca al naturale, non salata",
        ingredienti: [
          { nome: "Mandorle / noci / nocciole", qta: "20 g" }
        ],
        preparazione: [
          "Porzione da 20 g, ideale da tenere in borsa."
        ],
        applica: { scelta: 0 }
      },
      {
        id: "spuntino-latte",
        nome: "Bicchiere di latte",
        tipo: "spuntino",
        icona: "🥛",
        kcal: 90,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Latte senza lattosio", qta: "1 bicchiere" }
        ],
        preparazione: [
          "Un bicchiere di latte, caldo o freddo a piacere."
        ],
        applica: { scelta: 7 }
      },
      {
        id: "spuntino-gelato",
        nome: "Coppetta di gelato",
        tipo: "spuntino",
        icona: "🍨",
        kcal: 110,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Gelato (cioccolato o frutta)", qta: "1 coppetta piccola" }
        ],
        preparazione: [
          "Una piccola coppetta come sfizio, meglio a gusto frutta o cioccolato fondente."
        ],
        applica: { scelta: 8 }
      },
      {
        id: "spuntino-frutta-disidratata",
        nome: "Frutta disidratata",
        tipo: "spuntino",
        icona: "🍑",
        kcal: 120,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Frutta disidratata (mela, banana, albicocche)", qta: "30-40 g" }
        ],
        preparazione: [
          "Una manciata di frutta disidratata come spuntino dolce e pratico."
        ],
        applica: { scelta: 5 }
      },
      {
        id: "spuntino-succo",
        nome: "Succo di mirtillo o ananas",
        tipo: "spuntino",
        icona: "🧃",
        kcal: 80,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Succo senza zucchero (tappo a vite)", qta: "1 confezione" }
        ],
        preparazione: [
          "Scegli un succo di mirtillo o ananas senza zuccheri aggiunti."
        ],
        applica: { scelta: 3 }
      }
    ]
  },

  /* ---------------------------------------------------------
     PROFILO: MARCO
     Fonte: Dott.ssa Loredana Vesci - 22 settembre 2026
     Modello mediterraneo 1600 kcal/die, SENZA GLUTINE.
     Reattività a grano (classe 3) e graminacee (classe 4):
     vedi lista "evita" per gli alimenti da escludere.
     --------------------------------------------------------- */
  marco: {
    nome: "Marco",
    dottoressa: "Dott.ssa Loredana Vesci",
    data: "22 settembre 2026",
    kcal: 1600,
    macros: { carboidrati: 43, proteine: 24, grassi: 33 },
    pesoAttuale: 93.6,
    pesoObiettivo: 79,
    altezza: 174,

    pastoLiberoOgniGiorni: 20,
    maxCerealiGiornalieri: 140,

    premessa: "BMI 30.9 (obesità di I grado). Massa muscolare 63.9 kg in 174 cm, struttura robusta. Grasso sottocutaneo metainfiammato 28.2%, grasso viscerale in accumulo (grado 11). Peso attuale 93.6 kg, obiettivo 79 kg. Reattività a graminacee (classe 4) e grano triticum (classe 3). Vitamina D insufficiente. Turnista. Modello mediterraneo allo 0.01% di lattosio, senza glutine.",

    // Lista alimenti da evitare (allergeni + cross-reattivi).
    // Usata dalla vista condivisa per segnalare/sostituire.
    evita: {
      titolo: "Alimenti da evitare (reattività grano + graminacee)",
      // parole chiave cercate negli alimenti/ingredienti (lowercase)
      parole: [
        "glutine", "grano", "frumento", "pasta", "pane", "pizza", "biscott",
        "fette biscottate", "gallett", "cracker", "wasa", "tortellini",
        "ravioli", "agnolotti", "lasagna", "gnocch", "cous cous", "couscous",
        "orzo", "farro", "semolino", "muesli", "avena",
        "pomodor", "melanzan", "peperon", "patate", "patata",
        "agrumi", "arance", "arancia", "limon", "mandarin", "mapo",
        "kiwi", "anguria", "melone", "fragol", "pesche", "albicocch", "prugn", "ciliegi",
        "mandorl", "pistacch", "arachid", "noccioline",
        "funghi", "spinaci", "piselli", "basilico", "camomilla",
        "mollusch", "crostace", "cozze", "vongole", "gamber", "lumach",
        "birra"
      ],
      note: "In caso di dubbio, preferire farine tollerate (riso, mais, quinoa, tapioca, castagna, soia) e alimenti senza glutine."
    },

    regoleGenerali: [
      "Bere 2.5 L di acqua al giorno.",
      "Camminare tutti i giorni 30 min consecutivi (tapis roulant o strada): unica pratica riconosciuta anti grasso viscerale.",
      "Salare poco con sale iodato, marino o rosa.",
      "Cuocere a vapore, griglia, forno o microonde.",
      "Fritti ogni tanto con olio EVO (punto di fumo 180°C).",
      "1 cucchiaio di olio EVO a pranzo + 1 a cena.",
      "Dormire 6-8 ore al giorno.",
      "I pesi dei cibi sono a crudo, al netto degli scarti.",
      "Evacuazione irregolare: 1 grano di lunga vita Fiuggi la sera.",
      "Fame fuori pasto: ortaggi consentiti + 1 uovo sodo.",
      "No birra. Ogni tanto un bicchiere di vino. Se beve vino prima dei 20 gg, dimezzare i cereali tra pranzo e cena (140 g).",
      "Pasto libero ogni 20 giorni (shock metabolico, es. pizza o alimenti con grano esclusi).",
      "Se esce spesso: seguire la dieta senza superare 140 g di cereali tra pranzo e cena; può aumentare i secondi.",
      "Assumere vitamina D (2000 UI/die per 3 mesi, Ibsa in film).",
      "SENZA GLUTINE: al posto di pasta/pane usare gli stessi alimenti con farine tollerate (riso, mais, quinoa, tapioca, castagna, soia)."
    ],

    pasti: {
      colazione: {
        titolo: "Colazione",
        icona: "☕",
        istruzioni: "Latte di soia/riso/cocco o yogurt di soia/cocco/accadì o kefir senza lattosio + UNA opzione. Fino a 3 colazioni/die entro le 14.",
        note: "Caffè senza zucchero. Se ha ancora fame: 1 uovo (sodo, coque o strapazzato).",
        opzioni: [
          "3 cucchiai di fiocchi di riso + 100 g di frutta consentita (papaia, mango, cocco, avocado, caki, fichi d'india, datteri, uva, ananas, banana, mela, pera, frutti di bosco, melagrana)",
          "3 cucchiai di fiocchi di mais + 100 g di frutta consentita",
          "3 cucchiai di fiocchi di quinoa + 100 g di frutta consentita",
          "3 biscotti con farine tollerate (riso, tapioca, soia, castagna, senza glutine) + 100 g di frutta consentita",
          "20 g di pane senza glutine con velo di formaggio o marmellata senza zucchero + 100 g di frutta consentita"
        ]
      },
      pranzo: {
        titolo: "Pranzo",
        icona: "🍽️",
        istruzioni: "1 cereale (senza glutine) + 1 secondo + ortaggi a volontà. 1 cucchiaio di olio EVO.",
        composizione: ["cereali", "secondi", "ortaggi"]
      },
      cena: {
        titolo: "Cena",
        icona: "🌙",
        istruzioni: "1 cereale (senza glutine) + 1 secondo + ortaggi a volontà. 1 cucchiaio di olio EVO.",
        composizione: ["cereali", "secondi", "ortaggi"]
      },
      spuntinoDopoCena: {
        titolo: "Spuntino dopo cena",
        icona: "🌜",
        istruzioni: "UNA scelta. NO cereali di alcun tipo.",
        opzioni: [
          "Spremuta di melagrana o succo di mirtillo",
          "Una manciata di lupini",
          "Coppetta media di gelato (frutta consentita e cioccolato fondente)",
          "Una manciata di olive verdi o nere",
          "20 g di parmigiano",
          "Un cappuccino di soia o latte di cocco",
          "1 yogurt senza lattosio (soia, cocco o altro)",
          "1 yogurt kefir o greco senza lattosio",
          "20 g di cioccolato fondente",
          "20 g di semi oleosi (zucca, girasole, pinoli, nocciole, noci)",
          "40 g di frutta disidratata (mirtilli, lamponi, datteri, papaia, zenzero, chips di mela, banana)"
        ]
      }
    },

    categorie: {
      cereali: {
        titolo: "Cereale (senza glutine)",
        icona: "🌾",
        istruzioni: "Scegli UNO. Solo cereali senza glutine.",
        opzioni: [
          "70 g di riso (parboiled, nero...), pasta di mais/riso, amaranto, quinoa, tapioca, manioca o pasta senza glutine",
          "70 g di mais",
          "70 g di piadina senza glutine",
          "70 g di farina di mais (polenta)",
          "70 g di pane con farina tollerata (anche per celiaci)",
          "6 gallette di riso/mais o 6 cracker senza glutine"
        ]
      },
      secondi: {
        titolo: "Secondo",
        icona: "🍗",
        istruzioni: "Scegli UNO (anche metà e metà).",
        opzioni: [
          "120 g di carne rossa (vitello, manzo, ovino, caprino, maiale)",
          "120 g di carne bianca (pollo, tacchino, coniglio)",
          "2 uova",
          "150 g di pesce di qualsiasi tipo o 5 bastoncini al forno senza glutine",
          "120 g di formaggio fresco/caciottine (brie, toma, ricotta, asiago, caciocavallo, caciotta, emmenthal, stracchino, mozzarella, feta, primo sale senza lattosio...)",
          "100 g di affettati (cotto, crudo, bresaola, fesa di tacchino...)",
          "120 g di hamburger di soia, tofu o tempeh",
          "40 g di legumi ad alto carico proteico (ceci, lenticchie, fagioli, soia - NO piselli) oppure 120 g già cotti",
          "120 g di lupini",
          "1 yogurt kefir o greco senza lattosio"
        ]
      },
      ortaggi: {
        titolo: "Ortaggi",
        icona: "🥦",
        istruzioni: "A volontà, crudi o cotti o come passato. (Evitare pomodoro, melanzane, peperoni, patate, funghi, spinaci per cross-reattività.)",
        opzioni: [
          "Zucchine, ravanelli, rape rosse, rucola, indivia, scarola, songino, bietola, cavolo nero, broccoletti, cicoria, carote, finocchi, radicchio, puntarelle...",
          "Passato di verdure consentite"
        ]
      }
    },

    noteCereali: "Può spostare i cereali nella giornata: es. 140 g a pranzo e 0 la sera, oppure 100 g a pranzo e 40 g la sera (max 140 g totali). Non saltare i pasti. Se non mangia il secondo a pranzo, aggiungerlo alla cena (anche due diversi).",

    abitudini: [
      { id: "acqua", label: "Bere 2.5 L di acqua", icona: "💧" },
      { id: "camminata", label: "Camminare 30 min", icona: "🚶" },
      { id: "olioPranzo", label: "Olio EVO a pranzo", icona: "🫒" },
      { id: "olioCena", label: "Olio EVO a cena", icona: "🫒" },
      { id: "vitaminaD", label: "Vitamina D (2000 UI)", icona: "☀️" },
      { id: "sonno", label: "Dormire 6-8 ore", icona: "😴" }
    ],

    // Acqua: obiettivo 2.5 L
    acquaMl: 2500,

    kcalTabella: {
      colazione: [280, 280, 290, 260, 240],
      spuntinoDopoCena: [90, 90, 150, 90, 80, 110, 90, 90, 110, 120, 130],
      cereali: [250, 250, 240, 250, 240, 190],
      secondi: [230, 200, 155, 210, 320, 170, 200, 130, 180, 90],
      ortaggi: [40, 45]
    },

    ricette: [
      {
        id: "m-riso-pollo-zucchine",
        nome: "Riso con pollo e zucchine",
        tipo: "pranzo",
        icona: "🍚",
        kcal: 470,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua del riso",
        ingredienti: [
          { nome: "Riso", qta: "70 g" },
          { nome: "Petto di pollo", qta: "120 g" },
          { nome: "Zucchine", qta: "a volontà" },
          { nome: "Prezzemolo / pepe", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa il riso con 1 pizzico di sale.",
          "Salta le zucchine a rondelle con poco olio.",
          "Aggiungi il pollo a straccetti e cuoci finché dorato.",
          "Unisci al riso e completa con prezzemolo."
        ],
        applica: { cereali: 0, secondi: 1, ortaggi: 0 }
      },
      {
        id: "m-polenta-formaggio",
        nome: "Polenta con formaggio e verdure",
        tipo: "cena",
        icona: "🌽",
        kcal: 460,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g) nella polenta",
        ingredienti: [
          { nome: "Farina di mais (polenta)", qta: "70 g" },
          { nome: "Formaggio fresco", qta: "120 g" },
          { nome: "Cicoria o broccoletti", qta: "a volontà" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Prepara la polenta con acqua e 1 pizzico di sale.",
          "Salta le verdure in padella con poco olio.",
          "Servi la polenta con il formaggio a pezzetti e le verdure."
        ],
        applica: { cereali: 3, secondi: 4, ortaggi: 0 }
      },
      {
        id: "m-quinoa-ceci",
        nome: "Quinoa con ceci e verdure",
        tipo: "pranzo",
        icona: "🥗",
        kcal: 430,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g) a fine cottura",
        ingredienti: [
          { nome: "Quinoa", qta: "70 g" },
          { nome: "Ceci cotti", qta: "120 g" },
          { nome: "Carote e zucchine", qta: "a volontà" },
          { nome: "Cumino / prezzemolo", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Sciacqua e lessa la quinoa con 1 pizzico di sale.",
          "Salta le verdure a dadini in padella.",
          "Unisci quinoa, ceci e verdure, condisci con olio a crudo."
        ],
        applica: { cereali: 0, secondi: 7, ortaggi: 0 }
      },
      {
        id: "m-pesce-gallette",
        nome: "Pesce al forno con gallette e verdure",
        tipo: "cena",
        icona: "🐟",
        kcal: 420,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g) sul pesce",
        ingredienti: [
          { nome: "Pesce (spigola/orata/merluzzo)", qta: "150 g" },
          { nome: "Gallette di riso/mais", qta: "6" },
          { nome: "Zucchine e finocchi", qta: "a volontà" },
          { nome: "Prezzemolo", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Cuoci il pesce al forno con un pizzico di sale e prezzemolo.",
          "Cuoci le verdure al vapore o in padella.",
          "Servi con le gallette."
        ],
        applica: { cereali: 5, secondi: 3, ortaggi: 0 }
      },
      {
        id: "m-colazione-riso-frutta",
        nome: "Fiocchi di riso con frutta",
        tipo: "colazione",
        icona: "🥣",
        kcal: 280,
        senzaGlutine: true,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Latte di soia/riso/cocco", qta: "1 bicchiere" },
          { nome: "Fiocchi di riso", qta: "3 cucchiai" },
          { nome: "Frutta consentita (banana, frutti di bosco...)", qta: "100 g" }
        ],
        preparazione: [
          "Versa il latte vegetale in una ciotola.",
          "Aggiungi i fiocchi di riso e la frutta a pezzi."
        ],
        applica: { scelta: 0 }
      },
      {
        id: "m-spuntino-fondente",
        nome: "Cioccolato fondente e semi",
        tipo: "spuntino",
        icona: "🍫",
        kcal: 130,
        senzaGlutine: true,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Cioccolato fondente", qta: "20 g" },
          { nome: "Semi oleosi (zucca, girasole, noci)", qta: "una piccola porzione" }
        ],
        preparazione: [
          "Uno spuntino post-cena goloso ma senza cereali."
        ],
        applica: { scelta: 8 }
      },
      {
        id: "m-riso-manzo-verdure",
        nome: "Riso con straccetti di manzo e verdure",
        tipo: "pranzo",
        icona: "🥩",
        kcal: 480,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua del riso",
        ingredienti: [
          { nome: "Riso", qta: "70 g" },
          { nome: "Manzo", qta: "120 g" },
          { nome: "Zucchine e carote", qta: "a volontà" },
          { nome: "Rosmarino / pepe", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa il riso con un pizzico di sale.",
          "Salta le verdure a julienne in padella.",
          "Aggiungi il manzo a straccetti e cuoci pochi minuti, unisci al riso."
        ],
        applica: { cereali: 0, secondi: 0, ortaggi: 0 }
      },
      {
        id: "m-polenta-pesce",
        nome: "Polenta con pesce e verdure",
        tipo: "cena",
        icona: "🐟",
        kcal: 450,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g)",
        ingredienti: [
          { nome: "Farina di mais (polenta)", qta: "70 g" },
          { nome: "Pesce (merluzzo/orata)", qta: "150 g" },
          { nome: "Cicoria o broccoletti", qta: "a volontà" },
          { nome: "Prezzemolo", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Prepara la polenta con acqua e un pizzico di sale.",
          "Cuoci il pesce al vapore o in padella.",
          "Servi con le verdure saltate e un filo d'olio."
        ],
        applica: { cereali: 3, secondi: 3, ortaggi: 0 }
      },
      {
        id: "m-pasta-mais-tonno",
        nome: "Pasta di mais con tonno e zucchine",
        tipo: "pranzo",
        icona: "🍝",
        kcal: 460,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g) nell'acqua di cottura",
        ingredienti: [
          { nome: "Pasta di mais/riso", qta: "70 g" },
          { nome: "Tonno al naturale", qta: "120 g" },
          { nome: "Zucchine", qta: "a volontà" },
          { nome: "Prezzemolo / peperoncino", qta: "q.b." },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Lessa la pasta senza glutine con un pizzico di sale.",
          "Salta le zucchine con poco olio.",
          "Unisci il tonno sgocciolato e manteca con la pasta."
        ],
        applica: { cereali: 0, secondi: 3, ortaggi: 0 }
      },
      {
        id: "m-uova-verdure-gallette",
        nome: "Uova con verdure e gallette",
        tipo: "cena",
        icona: "🍳",
        kcal: 400,
        senzaGlutine: true,
        sale: "1 pizzico di sale iodato (circa 1 g) nelle uova",
        ingredienti: [
          { nome: "Uova", qta: "2" },
          { nome: "Gallette di riso/mais", qta: "6" },
          { nome: "Bietola o cicoria", qta: "a volontà" },
          { nome: "Olio EVO", qta: "1 cucchiaio (10 g)" }
        ],
        preparazione: [
          "Prepara le uova (sode, in camicia o strapazzate) con un pizzico di sale.",
          "Salta le verdure in padella.",
          "Servi con le gallette."
        ],
        applica: { cereali: 5, secondi: 2, ortaggi: 0 }
      },
      {
        id: "m-colazione-mais-frutta",
        nome: "Fiocchi di mais con frutta",
        tipo: "colazione",
        icona: "🌽",
        kcal: 280,
        senzaGlutine: true,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Latte di soia/riso/cocco", qta: "1 bicchiere" },
          { nome: "Fiocchi di mais", qta: "3 cucchiai" },
          { nome: "Frutta consentita (banana, uva, mela)", qta: "100 g" }
        ],
        preparazione: [
          "Versa il latte vegetale, aggiungi i fiocchi di mais e la frutta a pezzi."
        ],
        applica: { scelta: 1 }
      },
      {
        id: "m-colazione-biscotti-gf",
        nome: "Biscotti senza glutine e frutta",
        tipo: "colazione",
        icona: "🍪",
        kcal: 260,
        senzaGlutine: true,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Yogurt di soia/cocco senza lattosio", qta: "1 vasetto" },
          { nome: "Biscotti con farine tollerate (riso/castagna)", qta: "3" },
          { nome: "Frutta consentita", qta: "100 g" }
        ],
        preparazione: [
          "Accompagna lo yogurt con i biscotti senza glutine e la frutta."
        ],
        applica: { scelta: 3 }
      },
      {
        id: "m-spuntino-yogurt",
        nome: "Yogurt greco senza lattosio",
        tipo: "spuntino",
        icona: "🥛",
        kcal: 90,
        senzaGlutine: true,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Yogurt greco senza lattosio", qta: "1 vasetto" }
        ],
        preparazione: [
          "Gustalo così com'è, eventualmente con un po' di cannella."
        ],
        applica: { scelta: 7 }
      },
      {
        id: "m-spuntino-frutta-sec",
        nome: "Frutta disidratata e semi",
        tipo: "spuntino",
        icona: "🥜",
        kcal: 120,
        senzaGlutine: true,
        sale: "Non serve sale",
        ingredienti: [
          { nome: "Frutta disidratata (datteri, chips di mela)", qta: "40 g" },
          { nome: "Semi oleosi", qta: "20 g" }
        ],
        preparazione: [
          "Una porzione pratica da portare con te."
        ],
        applica: { scelta: 10 }
      }
    ]
  }

  /* ---------------------------------------------------------
     Per aggiungere altri profili, copiare un blocco esistente,
     rinominare la chiave e sostituire i contenuti.
     --------------------------------------------------------- */

};

/* ============================================================
   MENÙ SETTIMANALE CONDIVISO (default)
   Basato sulle ricette senza glutine (chiavi -> id ricetta di Marco).
   Adatto a Marco; per Caterina valgono le sue porzioni.
   L'utente può cambiare ogni voce dalla schermata Settimana.
   Ordine giorni: 0=lunedì ... 6=domenica
   ============================================================ */
const MENU_SETTIMANALE_DEFAULT = [
  { giorno: "Lunedì",    colazione: "m-colazione-riso-frutta",   pranzo: "m-riso-pollo-zucchine",  cena: "m-pesce-gallette",          spuntino: "m-spuntino-yogurt" },
  { giorno: "Martedì",   colazione: "m-colazione-mais-frutta",   pranzo: "m-quinoa-ceci",          cena: "m-polenta-formaggio",       spuntino: "m-spuntino-frutta-sec" },
  { giorno: "Mercoledì", colazione: "m-colazione-biscotti-gf",   pranzo: "m-pasta-mais-tonno",     cena: "m-uova-verdure-gallette",   spuntino: "m-spuntino-fondente" },
  { giorno: "Giovedì",   colazione: "m-colazione-riso-frutta",   pranzo: "m-riso-manzo-verdure",   cena: "m-polenta-pesce",           spuntino: "m-spuntino-yogurt" },
  { giorno: "Venerdì",   colazione: "m-colazione-mais-frutta",   pranzo: "m-quinoa-ceci",          cena: "m-pesce-gallette",          spuntino: "m-spuntino-frutta-sec" },
  { giorno: "Sabato",    colazione: "m-colazione-biscotti-gf",   pranzo: "m-riso-pollo-zucchine",  cena: "m-polenta-formaggio",       spuntino: "m-spuntino-fondente" },
  { giorno: "Domenica",  colazione: "m-colazione-riso-frutta",   pranzo: "m-pasta-mais-tonno",     cena: "m-uova-verdure-gallette",   spuntino: "m-spuntino-yogurt" }
];
