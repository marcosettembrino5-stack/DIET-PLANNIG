# 🥗 NutriApp

Web app mobile-first per seguire la dieta personalizzata, con sistema a scambi, checklist abitudini, contatore pasto libero e tracker peso. Tutti i dati restano **sul dispositivo** (localStorage), niente server.

## Come si usa

1. Apri `index.html` in un browser.
2. In alto scegli il profilo (per ora: **Caterina**).
3. Tab in basso:
   - **📅 Oggi** – spunta i pasti. Per pranzo/cena scegli cereale + secondo + ortaggi (sistema a scambi). Vedi la stima dei cereali giornalieri (max 120 g), il **budget calorie** con le kcal rimaste, e puoi aggiungere **pasti extra** con le calorie prese dalla confezione.
   - **📖 Ricette** – ricettario con piatti pronti per ogni pasto: ingredienti, quantità (incluso il sale) e preparazione. Tocca una ricetta per applicarla al giorno (compila il pasto e conta le calorie).
   - **✅ Abitudini** – acqua, camminata, olio, sonno, integratore. E il contatore del **pasto libero** (ogni 20 giorni).
   - **⚖️ Peso** – aggiungi il peso, vedi il grafico verso l'obiettivo (60 kg).
   - **ℹ️ Info** – premessa, regole generali, nota cereali. Pulsante per azzerare la giornata.

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
