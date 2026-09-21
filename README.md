# 🥗 NutriApp

Web app mobile-first per seguire la dieta personalizzata, con sistema a scambi, checklist abitudini, contatore pasto libero e tracker peso. Tutti i dati restano **sul dispositivo** (localStorage), niente server.

## Come si usa

1. Apri `index.html` in un browser.
2. In alto scegli il profilo (per ora: **Caterina**).
3. Tab in basso:
   - **📅 Oggi** – spunta i pasti. Per pranzo/cena scegli cereale + secondo + ortaggi (sistema a scambi). Vedi la stima dei cereali giornalieri (max 120 g), il **budget calorie** con le kcal rimaste, e puoi aggiungere **pasti extra** con le calorie prese dalla confezione.
   - **🗓️ Settimana** – menù lun-dom con **due scelte indipendenti per pasto** (👨 Marco solo senza glutine · 👩 Caterina anche con glutine), entrambe modificabili con un tocco. Ingredienti sempre **specifici** (frutto fisso, verdure con grammatura). Pulsante **Genera lista spesa** che popola il carrello con i piatti di entrambi: somma le quantità dove il piatto coincide, distingue con etichetta persona dove differisce.
   - **⋯ Altro** – raccoglie Insieme, Statistiche, Peso, Abitudini, Info (per tenere la barra pulita).
   - **👥 Insieme** (dentro Altro) – vista condivisa Marco + Caterina: stesso pasto, porzioni per ciascuno. Gli alimenti non adatti a Marco (senza glutine / allergeni grano e graminacee) sono segnalati con ⚠️ e l'alternativa senza glutine.
   - **📖 Ricette** – ricettario con piatti pronti per ogni pasto: ingredienti, quantità (incluso il sale) e preparazione. **Cerca** per nome o ingrediente, segna le **preferite** con la stella. Tocca una ricetta per applicarla al giorno (compila il pasto e conta le calorie).
   - **🛒 Spesa** – scegli le ricette e l'app genera la **lista della spesa aggregata** (somma le quantità con la stessa unità, es. "Pasta 120 g"). Modalità **Solo** (profilo corrente) o **Condivisa** (Marco + Caterina insieme). Spuntabile al supermercato.
   - **📊 Statistiche** – aderenza pasti, media calorie, giorni con abitudini complete, variazione peso, su 7 o 30 giorni. Con grafico calorie e barre per giorno.
   - **✅ Abitudini** – contatore **acqua a bicchieri** (tocchi +1 fino a 1.8 L), abitudini del giorno e contatore **pasto libero** (ogni 20 giorni).
   - **⚖️ Peso** – aggiungi il peso, vedi il grafico verso l'obiettivo (60 kg).
   - **ℹ️ Info** – premessa, regole, nota cereali, **promemoria** (acqua/peso/pasti con orari), **tema scuro**, e reset giornata.

## Tema scuro, offline e promemoria

- **Tema scuro**: interruttore 🌙 nell'header o in Info → Impostazioni. La scelta viene ricordata.
- **Offline**: un service worker (`sw.js`) mette in cache l'app, così funziona senza rete e si avvia più veloce (serve aprirla via http/https almeno una volta, es. da GitHub Pages).
- **Promemoria**: in Info imposti orari per acqua, peso e pasti. Su Android le notifiche funzionano bene; su iPhone servono iOS 16.4+ e l'app aggiunta alla schermata Home.

## Calorie e pasti extra

- Ogni alimento della dieta ha una **kcal stimata** (valori standard di riferimento, indicativi). L'app somma le scelte del giorno e le scala dal budget (1200 kcal per Caterina).
- I **pasti extra** li aggiungi con nome e calorie manuali (le leggi dalla confezione): vengono sommati al totale. Se superi il budget, l'app te lo segnala senza forzare porzioni "strane" nei pasti (scelta di sicurezza).
- I valori kcal degli alimenti stanno in `data.js` sotto `kcalTabella` (una kcal per ogni opzione, nello stesso ordine). Le **ricette** stanno in `data.js` sotto `ricette`.

## Usarla dal telefono (consigliato)

Serve che il telefono raggiunga i file. Il modo più semplice:

1. Metti la cartella su un servizio (es. GitHub Pages, Netlify — gratis) **oppure** avvia un piccolo server locale sul PC e apri l'indirizzo dal telefono sulla stessa rete Wi-Fi:
   ```powershell
   # dalla cartella del progetto
   python -m http.server 8000
   ```
   Poi sul telefono apri `http://IP-DEL-PC:8000` (trovi l'IP con `ipconfig`).
2. Sul telefono, dal menu del browser scegli **"Aggiungi a schermata Home"**: diventa un'icona come un'app vera (grazie al manifest PWA).

> Nota: aprendo il file con doppio click (`file://`) funziona quasi tutto, ma per la modalità "app installabile" serve aprirla via `http://` o `https://`.

## Aggiungere una nuova dieta (es. la tua, lunedì)

Apri `data.js`, copia il blocco del profilo `caterina`, incollalo dentro `DIETE = { ... }` con una nuova chiave e cambia i contenuti:

```js
const DIETE = {
  caterina: { ... },      // già presente

  matteo: {               // <-- nuovo profilo
    nome: "Matteo",
    kcal: 1800,
    pesoAttuale: 78,
    pesoObiettivo: 72,
    pastoLiberoOgniGiorni: 14,
    maxCerealiGiornalieri: 160,
    // ...stessa struttura: pasti, categorie, abitudini...
  }
};
```

Salva e ricarica: il nuovo profilo compare nel menu in alto. Ogni profilo tiene i propri dati separati.

## File del progetto

| File | Cosa fa |
|------|---------|
| `index.html` | struttura pagina |
| `style.css` | stile mobile-first |
| `app.js` | logica (pasti, scambi, abitudini, peso, pasto libero) |
| `data.js` | **i dati delle diete** (qui si aggiungono i profili) |
| `manifest.webmanifest`, `icon.svg` | installazione come app (PWA) |
