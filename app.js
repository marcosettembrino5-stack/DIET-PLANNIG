/* ============================================================
   NutriApp - Logica applicazione
   Dati salvati in localStorage. Nessun server, tutto sul device.
   ============================================================ */

(function () {
  "use strict";

  // ---------- STATO ----------
  const STORE_KEY = "nutriapp_v1";
  let state = loadState();
  let currentProfile = state.lastProfile && DIETE[state.lastProfile]
    ? state.lastProfile
    : Object.keys(DIETE)[0];
  let currentDate = todayKey();

  // ---------- PERSISTENZA ----------
  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return { lastProfile: null, profiles: {} };
  }
  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (e) { console.warn("Salvataggio fallito", e); }
  }
  // Ritorna (creando se serve) il contenitore dati del profilo corrente
  function profData() {
    if (!state.profiles[currentProfile]) {
      state.profiles[currentProfile] = { days: {}, weights: [], freeMealDates: [] };
    }
    const p = state.profiles[currentProfile];
    if (!p.days) p.days = {};
    if (!p.weights) p.weights = [];
    if (!p.freeMealDates) p.freeMealDates = [];
    if (!p.favorites) p.favorites = [];        // id ricette preferite
    if (!p.shopping) p.shopping = { recipes: [], checked: {} }; // lista spesa
    return p;
  }
  // Menù settimanale condiviso (unico per l'app, non per profilo)
  function weekMenu() {
    if (!state.weekMenu) {
      state.weekMenu = JSON.parse(JSON.stringify(
        typeof MENU_SETTIMANALE_DEFAULT !== "undefined" ? MENU_SETTIMANALE_DEFAULT : []
      ));
    }
    // Migrazione dal vecchio formato (stringa per pasto) al nuovo { marco, caterina }
    state.weekMenu.forEach((day) => {
      ["colazione", "pranzo", "cena", "spuntino"].forEach((slot) => {
        const v = day[slot];
        if (typeof v === "string") day[slot] = { marco: v, caterina: v };
        else if (v && typeof v === "object" && !("marco" in v)) day[slot] = { marco: null, caterina: null };
      });
    });
    return state.weekMenu;
  }
  // Dati del giorno selezionato { meals:{}, habits:{}, extras:[], waterMl:0 }
  function dayData() {
    const p = profData();
    if (!p.days[currentDate]) p.days[currentDate] = { meals: {}, habits: {}, extras: [], waterMl: 0 };
    const d = p.days[currentDate];
    if (!d.meals) d.meals = {};
    if (!d.habits) d.habits = {};
    if (!d.extras) d.extras = [];
    if (typeof d.waterMl !== "number") d.waterMl = 0;
    return d;
  }
  // Impostazioni globali (tema, promemoria)
  function settings() {
    if (!state.settings) state.settings = {};
    const s = state.settings;
    if (!s.theme) s.theme = "light";
    if (!s.reminders) s.reminders = {
      water: { time: "11:00", on: false },
      weight: { time: "08:00", on: false },
      meals: { time: "20:30", on: false }
    };
    return s;
  }

  // ---------- UTIL DATE ----------
  function todayKey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function parseKey(k) {
    const [y, m, day] = k.split("-").map(Number);
    return new Date(y, m - 1, day);
  }
  function shiftDate(key, delta) {
    const d = parseKey(key);
    d.setDate(d.getDate() + delta);
    return todayKey(d);
  }
  function formatLong(key) {
    const d = parseKey(key);
    const giorni = ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"];
    const mesi = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
    return giorni[d.getDay()] + " " + d.getDate() + " " + mesi[d.getMonth()];
  }
  function daysBetween(a, b) {
    return Math.round((parseKey(b) - parseKey(a)) / 86400000);
  }

  // ---------- HELPER DOM ----------
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  // ============================================================
  //  RENDER PRINCIPALE
  // ============================================================
  function renderAll() {
    renderDayBar();
    renderFreeMealBanner();
    renderMeals();
    renderExtras();
    renderKcal();
    renderWater();
    renderHabits();
    renderFreeMealCard();
    renderWeight();
    renderInfo();
    renderRecipes();
    renderSpesa();
    renderShared();
    renderWeek();
    renderReminderSettings();
    updateProgress();
  }

  // ---------- PROFILI ----------
  function renderProfiles() {
    const sel = $("#profileSelect");
    sel.innerHTML = "";
    Object.keys(DIETE).forEach((key) => {
      const o = el("option");
      o.value = key;
      o.textContent = DIETE[key].nome;
      if (key === currentProfile) o.selected = true;
      sel.appendChild(o);
    });
  }

  // ---------- DAY BAR ----------
  function renderDayBar() {
    $("#dayDate").textContent = currentDate === todayKey() ? "Oggi" : formatLong(currentDate);
    const meta = currentDate === todayKey() ? formatLong(currentDate) : "";
    $("#dayMeta").textContent = meta;
  }

  // ============================================================
  //  PASTI
  // ============================================================
  function renderMeals() {
    const diet = DIETE[currentProfile];
    const cont = $("#mealsContainer");
    cont.innerHTML = "";
    const d = dayData();

    Object.keys(diet.pasti).forEach((mealKey) => {
      const meal = diet.pasti[mealKey];
      const saved = d.meals[mealKey] || {};
      const isDone = !!saved.done;

      const card = el("div", "meal-card" + (isDone ? " done" : ""));

      // Testata
      const top = el("div", "meal-top");
      top.appendChild(el("div", "meal-icon", meal.icona || "🍴"));
      const info = el("div", "meal-info");
      info.appendChild(el("div", "meal-name", meal.titolo));
      info.appendChild(el("div", "meal-instr", meal.istruzioni || ""));
      top.appendChild(info);
      const check = el("button", "meal-check", "✓");
      check.addEventListener("click", (ev) => {
        ev.stopPropagation();
        toggleMealDone(mealKey);
      });
      top.appendChild(check);
      card.appendChild(top);

      // Corpo
      const body = el("div", "meal-body");
      if (meal.note) body.appendChild(el("div", "meal-note", meal.note));

      // Badge kcal del pasto (somma degli slot scelti)
      const mealKcal = kcalOfMeal(mealKey);
      if (mealKcal > 0) info.querySelector(".meal-instr").innerHTML =
        (meal.istruzioni || "") + ` <span class="meal-kcal-badge">· ${mealKcal} kcal</span>`;

      if (meal.composizione) {
        // Pasto composto (pranzo/cena): cereali + secondi + ortaggi
        meal.composizione.forEach((catKey) => {
          const cat = diet.categorie[catKey];
          const chosen = saved[catKey];
          const kc = kcalOfChoice(diet, catKey, cat, chosen);
          body.appendChild(buildSlot(mealKey, catKey, cat, chosen, kc));
        });
        // Nota carboidrati
        body.appendChild(buildCarbNote(diet));
      } else if (meal.opzioni) {
        // Pasto a scelta singola (colazione/spuntini)
        const chosen = saved.scelta;
        const kc = kcalOfChoice(diet, mealKey, meal, chosen);
        body.appendChild(buildSlot(mealKey, "scelta", { titolo: "Scelta", icona: "•", istruzioni: meal.istruzioni, opzioni: meal.opzioni, note: meal.note }, chosen, kc));
      }

      card.appendChild(body);
      cont.appendChild(card);
    });
  }

  function buildSlot(mealKey, slotKey, cat, chosenValue, kcal) {
    const slot = el("div", "slot" + (chosenValue ? " filled" : ""));
    slot.appendChild(el("div", "slot-icon", cat.icona || "•"));
    const txt = el("div", "slot-text");
    txt.appendChild(el("b", null, cat.titolo));
    txt.appendChild(el("span", null, chosenValue || "Tocca per scegliere"));
    slot.appendChild(txt);
    if (chosenValue && kcal > 0) slot.appendChild(el("div", "slot-kcal", kcal + " kcal"));
    slot.appendChild(el("div", "slot-arrow", "›"));
    slot.addEventListener("click", () => openPicker(mealKey, slotKey, cat, chosenValue));
    return slot;
  }

  function buildCarbNote(diet) {
    const used = cerealiUsatiOggi();
    const max = diet.maxCerealiGiornalieri;
    const over = used > max;
    const note = el("div", "carb-note" + (over ? " warn" : ""));
    note.innerHTML = over
      ? `⚠️ Cereali stimati oggi: <b>${used} g</b> (max consigliato ${max} g tra pranzo e cena)`
      : `🌾 Cereali stimati oggi: <b>${used} g</b> / max ${max} g. Puoi spostarli tutti a pranzo o dividerli.`;
    return note;
  }

  // Stima i grammi di cereali scelti a pranzo+cena (legge il primo numero della stringa opzione)
  function cerealiUsatiOggi() {
    const d = dayData();
    let tot = 0;
    ["pranzo", "cena"].forEach((mk) => {
      const c = d.meals[mk] && d.meals[mk].cereali;
      if (c) {
        // "g" come parola intera (grammi), non l'inizio di "gallette/gnocchi"
        const m = c.match(/(\d+)\s*g(?![a-z])/i);
        if (m) tot += parseInt(m[1], 10);
      }
    });
    return tot;
  }

  function toggleMealDone(mealKey) {
    const d = dayData();
    if (!d.meals[mealKey]) d.meals[mealKey] = {};
    d.meals[mealKey].done = !d.meals[mealKey].done;
    saveState();
    renderMeals();
    renderKcal();
    updateProgress();
  }

  // ============================================================
  //  MOTORE CALORIE
  // ============================================================
  // kcal di una singola scelta (in base all'indice dell'opzione)
  function kcalOfChoice(diet, key, cat, chosenValue) {
    const tab = diet.kcalTabella;
    if (!chosenValue || !tab || !tab[key] || !cat || !cat.opzioni) return 0;
    const idx = cat.opzioni.indexOf(chosenValue);
    if (idx < 0) return 0;
    const v = tab[key][idx];
    return typeof v === "number" ? v : 0;
  }

  // kcal totali di un pasto (somma degli slot / della scelta)
  function kcalOfMeal(mealKey) {
    const diet = DIETE[currentProfile];
    const meal = diet.pasti[mealKey];
    const saved = (dayData().meals[mealKey]) || {};
    let tot = 0;
    if (meal.composizione) {
      meal.composizione.forEach((catKey) => {
        tot += kcalOfChoice(diet, catKey, diet.categorie[catKey], saved[catKey]);
      });
    } else if (meal.opzioni) {
      tot += kcalOfChoice(diet, mealKey, meal, saved.scelta);
    }
    return tot;
  }

  // kcal dei pasti previsti + extra
  function kcalTotaleOggi() {
    const diet = DIETE[currentProfile];
    let tot = 0;
    Object.keys(diet.pasti).forEach((mk) => { tot += kcalOfMeal(mk); });
    dayData().extras.forEach((e) => { tot += (Number(e.kcal) || 0); });
    return tot;
  }

  function renderKcal() {
    const diet = DIETE[currentProfile];
    const budget = typeof diet.kcal === "number" ? diet.kcal : 1200;
    const used = kcalTotaleOggi();
    const remaining = budget - used;
    const over = remaining < 0;

    $("#kcalUsed").textContent = used;
    $("#kcalBudget").textContent = budget;
    $("#kcalRemaining").textContent = over ? "+" + Math.abs(remaining) : remaining;

    const pct = budget > 0 ? Math.min(100, Math.round((used / budget) * 100)) : 0;
    const fill = $("#kcalFill");
    fill.style.width = pct + "%";
    fill.classList.toggle("over", over);
    $("#kcalCard").classList.toggle("over", over);

    const msg = $("#kcalMsg");
    msg.classList.toggle("over", over);
    if (over) {
      msg.innerHTML = `⚠️ Hai superato il budget di <b>${Math.abs(remaining)} kcal</b>. Se puoi, alleggerisci i pasti non ancora consumati o fai una camminata extra.`;
    } else {
      msg.innerHTML = `Ti restano <b>${remaining} kcal</b> per oggi (budget ${budget}). Le stime dei pasti sono indicative.`;
    }
  }

  // ============================================================
  //  PASTI EXTRA
  // ============================================================
  function renderExtras() {
    const cont = $("#extrasContainer");
    cont.innerHTML = "";
    const extras = dayData().extras;
    if (!extras.length) {
      const empty = el("div", "section-hint", "Nessun pasto extra oggi.");
      empty.style.margin = "0 4px 4px";
      cont.appendChild(empty);
      return;
    }
    extras.forEach((e, i) => {
      const row = el("div", "extra-row");
      row.appendChild(el("div", "ex-name", e.nome || "Extra"));
      row.appendChild(el("div", "ex-kcal", (Number(e.kcal) || 0) + " kcal"));
      const del = el("button", "ex-del", "🗑");
      del.addEventListener("click", () => {
        dayData().extras.splice(i, 1);
        saveState();
        renderExtras();
        renderKcal();
      });
      row.appendChild(del);
      cont.appendChild(row);
    });
  }

  function addExtra() {
    const nameEl = $("#extraName");
    const kcalEl = $("#extraKcal");
    const nome = (nameEl.value || "").trim();
    const kcal = parseInt(kcalEl.value, 10);
    if (isNaN(kcal) || kcal <= 0) { kcalEl.focus(); return; }
    dayData().extras.push({ nome: nome || "Extra", kcal: kcal });
    saveState();
    nameEl.value = "";
    kcalEl.value = "";
    renderExtras();
    renderKcal();
  }

  // ============================================================
  //  RICETTARIO
  // ============================================================
  let recipeFilter = "tutte";
  let recipeSearch = "";
  const TIPI_RICETTA = [
    { key: "tutte", label: "Tutte" },
    { key: "preferiti", label: "★ Preferiti" },
    { key: "colazione", label: "Colazione" },
    { key: "pranzo", label: "Pranzo" },
    { key: "cena", label: "Cena" },
    { key: "spuntino", label: "Spuntino" }
  ];

  function isFavorite(id) { return profData().favorites.indexOf(id) >= 0; }
  function toggleFavorite(id) {
    const favs = profData().favorites;
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1); else favs.push(id);
    saveState();
    renderRecipes();
  }

  function recipeMatchesSearch(r, q) {
    if (!q) return true;
    if ((r.nome || "").toLowerCase().includes(q)) return true;
    return (r.ingredienti || []).some((ing) => (ing.nome || "").toLowerCase().includes(q));
  }

  function renderRecipes() {
    const diet = DIETE[currentProfile];
    const recipes = diet.ricette || [];

    // Filtri
    const filterBox = $("#recipeFilter");
    filterBox.innerHTML = "";
    TIPI_RICETTA.forEach((t) => {
      if (t.key !== "tutte" && t.key !== "preferiti" && !recipes.some((r) => r.tipo === t.key)) return;
      const chip = el("button", "recipe-chip" + (recipeFilter === t.key ? " active" : ""), t.label);
      chip.addEventListener("click", () => { recipeFilter = t.key; renderRecipes(); });
      filterBox.appendChild(chip);
    });

    // Lista filtrata per categoria + ricerca
    const q = recipeSearch.trim().toLowerCase();
    const cont = $("#recipesContainer");
    cont.innerHTML = "";
    const list = recipes.filter((r) => {
      const byCat = recipeFilter === "tutte" ? true
        : recipeFilter === "preferiti" ? isFavorite(r.id)
        : r.tipo === recipeFilter;
      return byCat && recipeMatchesSearch(r, q);
    });
    if (!list.length) {
      cont.appendChild(el("div", "section-hint", q ? "Nessuna ricetta trovata." : "Nessuna ricetta in questa categoria."));
      return;
    }
    list.forEach((r) => {
      const card = el("div", "recipe-card");
      card.appendChild(el("div", "recipe-icon", r.icona || "🍽️"));
      const meta = el("div", "recipe-meta");
      meta.appendChild(el("div", "recipe-name", r.nome));
      meta.appendChild(el("div", "recipe-tag", r.tipo));
      card.appendChild(meta);
      const right = el("div", "recipe-right");
      right.appendChild(el("div", "recipe-kcal", (r.kcal || "?") + " kcal"));
      const fav = el("button", "recipe-fav", isFavorite(r.id) ? "★" : "☆");
      fav.style.color = isFavorite(r.id) ? "var(--accent)" : "var(--text-soft)";
      fav.addEventListener("click", (ev) => { ev.stopPropagation(); toggleFavorite(r.id); });
      right.appendChild(fav);
      card.appendChild(right);
      // click sulla card (non sulla stella) apre il dettaglio
      card.addEventListener("click", () => openRecipe(r));
      cont.appendChild(card);
    });
  }

  function openRecipe(r) {
    const diet = DIETE[currentProfile];
    $("#recipeTitle").textContent = r.nome;
    const body = $("#recipeBody");
    body.innerHTML = "";

    body.appendChild(el("div", "rb-kcal", (r.kcal || "?") + " kcal · " + (r.tipo || "")));

    body.appendChild(el("div", "rb-section", "Ingredienti"));
    const ul = el("ul");
    (r.ingredienti || []).forEach((ing) => {
      const li = el("li", "rb-ing");
      li.appendChild(el("span", null, ing.nome));
      li.appendChild(el("span", null, ing.qta || ""));
      ul.appendChild(li);
    });
    body.appendChild(ul);

    body.appendChild(el("div", "rb-salt", "🧂 <b>Sale:</b> " + (r.sale || "a piacere, con moderazione")));

    body.appendChild(el("div", "rb-section", "Preparazione"));
    const ol = el("ol");
    (r.preparazione || []).forEach((step) => ol.appendChild(el("li", null, step)));
    body.appendChild(ol);

    // Pulsante applica al giorno (solo se la ricetta ha una mappatura)
    if (r.applica) {
      const targetMeal = mealKeyForRecipe(diet, r);
      const btn = el("button", "rb-apply", "➕ Aggiungi a " + (targetMeal ? diet.pasti[targetMeal].titolo : "oggi") + " di " + (currentDate === todayKey() ? "oggi" : formatLong(currentDate)));
      btn.addEventListener("click", () => {
        applyRecipe(diet, r, targetMeal);
        closeRecipe();
        switchTab("oggi");
      });
      body.appendChild(btn);
      body.appendChild(el("div", "rb-apply-note", "Compila automaticamente il pasto con le porzioni della ricetta."));
    }

    $("#recipeModal").classList.remove("hidden");
  }
  function closeRecipe() { $("#recipeModal").classList.add("hidden"); }

  // Determina a quale pasto applicare la ricetta
  function mealKeyForRecipe(diet, r) {
    if (r.tipo === "pranzo" && diet.pasti.pranzo) return "pranzo";
    if (r.tipo === "cena" && diet.pasti.cena) return "cena";
    if (r.tipo === "colazione" && diet.pasti.colazione) return "colazione";
    if (r.tipo === "spuntino") {
      // preferisci lo spuntino non ancora compilato
      const d = dayData();
      if (diet.pasti.spuntinoMattina && !(d.meals.spuntinoMattina && d.meals.spuntinoMattina.scelta)) return "spuntinoMattina";
      if (diet.pasti.spuntinoPomeriggio) return "spuntinoPomeriggio";
      return "spuntinoMattina";
    }
    return null;
  }

  function applyRecipe(diet, r, mealKey) {
    if (!mealKey) return;
    const d = dayData();
    if (!d.meals[mealKey]) d.meals[mealKey] = {};
    const meal = diet.pasti[mealKey];
    const map = r.applica || {};

    if (meal.composizione) {
      meal.composizione.forEach((catKey) => {
        const idx = map[catKey];
        if (idx == null) return; // null/undefined = non impostare
        const opt = diet.categorie[catKey] && diet.categorie[catKey].opzioni[idx];
        if (opt) d.meals[mealKey][catKey] = opt;
      });
    } else if (meal.opzioni && map.scelta != null) {
      const opt = meal.opzioni[map.scelta];
      if (opt) d.meals[mealKey].scelta = opt;
    }
    d.meals[mealKey].done = true;
    d.meals[mealKey].ricetta = r.nome;
    saveState();
    renderMeals();
    renderKcal();
    updateProgress();
  }

  // ============================================================
  //  ACQUA A BICCHIERI
  // ============================================================
  const GLASS_ML = 200;
  function waterGoalMl() {
    // usa l'obiettivo del profilo se definito (Marco 2.5L, Caterina 1.8L)
    const diet = DIETE[currentProfile];
    return (diet && typeof diet.acquaMl === "number") ? diet.acquaMl : 1800;
  }
  function renderWater() {
    const goal = waterGoalMl();
    const d = dayData();
    const ml = d.waterMl || 0;
    const glasses = Math.round(ml / GLASS_ML);
    const totalGlasses = Math.ceil(goal / GLASS_ML);

    $("#waterMl").textContent = ml;
    $("#waterGoal").textContent = goal;
    $("#waterGlasses").textContent = glasses;

    const row = $("#waterGlassesRow");
    row.innerHTML = "";
    for (let i = 0; i < totalGlasses; i++) {
      const g = el("div", "glass" + (i < glasses ? " full" : ""));
      g.addEventListener("click", () => { setWater((i + 1) * GLASS_ML); });
      row.appendChild(g);
    }
  }
  function setWater(ml) {
    const goal = waterGoalMl();
    const d = dayData();
    d.waterMl = Math.max(0, Math.min(goal, ml));
    // sincronizza l'abitudine "acqua" se raggiunto l'obiettivo
    if (d.waterMl >= goal) d.habits.acqua = true;
    else if (d.habits.acqua) d.habits.acqua = false;
    saveState();
    renderWater();
    renderHabits();
  }
  function addWater(delta) {
    const d = dayData();
    setWater((d.waterMl || 0) + delta);
  }

  // ============================================================
  //  VISTA CONDIVISA (INSIEME)
  // ============================================================
  let sharedDate = todayKey();

  // Legge i dati di un giorno per un profilo specifico (senza crearlo)
  function dayDataOf(profileKey, dateKey) {
    const p = state.profiles[profileKey];
    if (!p || !p.days || !p.days[dateKey]) return { meals: {}, habits: {}, extras: [] };
    return p.days[dateKey];
  }

  // Verifica se un testo alimento è da evitare per un profilo (lista "evita")
  function isForbidden(diet, testo) {
    if (!diet || !diet.evita || !testo) return false;
    const t = String(testo).toLowerCase();
    return diet.evita.parole.some((w) => t.includes(w));
  }

  // Suggerisce un'alternativa senza glutine dalla stessa categoria del profilo Marco
  function glutenFreeAlternative(marcoDiet, catKey) {
    const cat = marcoDiet.categorie && marcoDiet.categorie[catKey];
    if (!cat) return null;
    // la prima opzione dei cereali di Marco è già senza glutine (riso/mais/quinoa)
    return cat.opzioni[0] || null;
  }

  function renderShared() {
    const cont = $("#sharedMeals");
    if (!cont) return;
    cont.innerHTML = "";
    $("#sharedDate").textContent = sharedDate === todayKey() ? "Oggi" : formatLong(sharedDate);

    const marco = DIETE.marco, caterina = DIETE.caterina;
    if (!marco || !caterina) {
      cont.appendChild(el("div", "section-hint", "Servono entrambi i profili Marco e Caterina."));
      return;
    }

    const dM = dayDataOf("marco", sharedDate);
    const dC = dayDataOf("caterina", sharedDate);

    // Coppie di pasti da confrontare (chiave Marco, chiave Caterina, titolo, icona)
    const coppie = [
      { m: "colazione", c: "colazione", titolo: "Colazione", icona: "☕" },
      { m: "pranzo", c: "pranzo", titolo: "Pranzo", icona: "🍽️" },
      { m: "cena", c: "cena", titolo: "Cena", icona: "🌙" },
      { m: "spuntinoDopoCena", c: "spuntinoPomeriggio", titolo: "Spuntino", icona: "🍫" }
    ];

    let anyContent = false;

    coppie.forEach((cp) => {
      const mMeal = marco.pasti[cp.m];
      const cMeal = caterina.pasti[cp.c];
      const mSaved = dM.meals[cp.m] || {};
      const cSaved = dC.meals[cp.c] || {};

      const rows = [];

      if (mMeal && mMeal.composizione) {
        // pasto composto: confronta slot per slot (cereali/secondi/ortaggi)
        mMeal.composizione.forEach((catKey) => {
          const mVal = mSaved[catKey];
          const cVal = cSaved[catKey];
          if (!mVal && !cVal) return;
          const label = (marco.categorie[catKey] && marco.categorie[catKey].titolo) || catKey;
          rows.push(buildSharedRow(marco, caterina, catKey, label, mVal, cVal));
        });
      } else {
        // pasto a scelta singola
        const mVal = mSaved.scelta;
        const cVal = cSaved.scelta;
        if (mVal || cVal) rows.push(buildSharedRow(marco, caterina, null, "Scelta", mVal, cVal));
      }

      if (!rows.length) return;
      anyContent = true;

      const card = el("div", "shared-meal");
      const head = el("div", "shared-meal-head");
      head.appendChild(el("span", "sm-icon", cp.icona));
      head.appendChild(el("span", "sm-title", cp.titolo));
      card.appendChild(head);
      const body = el("div", "shared-rows");
      rows.forEach((r) => body.appendChild(r));
      card.appendChild(body);
      cont.appendChild(card);
    });

    if (!anyContent) {
      cont.appendChild(el("div", "section-hint",
        "Nessun pasto ancora compilato per questo giorno. Compila i pasti nei profili Marco e Caterina (tab Oggi) e qui li vedrai affiancati."));
    } else {
      cont.appendChild(el("div", "shared-legend",
        "⚠️ = alimento non adatto a Marco (glutine/allergeni): usa l'alternativa indicata."));
    }
  }

  // Costruisce una riga della vista condivisa per uno slot.
  // Le scelte di Marco vengono dalla SUA dieta (già senza glutine): sempre ok.
  // Le scelte di Caterina, se contengono alimenti vietati a Marco, vengono
  // segnalate con l'alternativa senza glutine da usare per lui.
  function buildSharedRow(marco, caterina, catKey, label, mVal, cVal) {
    const row = el("div", "shared-row");
    row.appendChild(el("div", "shared-food", label));
    const portions = el("div", "shared-portions");

    // Marco (dalla sua dieta, sempre adatto)
    const pM = el("div", "portion");
    pM.appendChild(el("span", "p-who", "Marco"));
    pM.appendChild(el("span", "p-qta", mVal || "—"));
    portions.appendChild(pM);

    // Caterina
    const cForbiddenForMarco = cVal && isForbidden(marco, cVal);
    const pC = el("div", "portion" + (cForbiddenForMarco ? " warn" : ""));
    pC.appendChild(el("span", "p-who", "Caterina"));
    pC.appendChild(el("span", "p-qta", cVal || "—"));
    // Se il piatto di Caterina non va bene per Marco e lui non ha una sua scelta,
    // suggerisci l'alternativa senza glutine.
    if (cForbiddenForMarco && catKey && !mVal) {
      const alt = glutenFreeAlternative(marco, catKey);
      if (alt) pC.appendChild(el("span", "p-alt", "⚠️ per Marco: " + alt));
    }
    portions.appendChild(pC);

    row.appendChild(portions);
    return row;
  }

  // ============================================================
  //  MENÙ SETTIMANALE
  // ============================================================
  const WEEK_SLOTS = [
    { key: "colazione", label: "Colazione", icona: "☕" },
    { key: "pranzo", label: "Pranzo", icona: "🍽️" },
    { key: "cena", label: "Cena", icona: "🌙" },
    { key: "spuntino", label: "Spuntino", icona: "🍫" }
  ];

  // Trova una ricetta per id cercando in tutti i profili (il menù usa quelle di Marco/GF)
  function recipeById(id) {
    for (const pk of Object.keys(DIETE)) {
      const r = (DIETE[pk].ricette || []).find((x) => x.id === id);
      if (r) return r;
    }
    return null;
  }

  // indice del giorno di oggi (0=lunedì ... 6=domenica)
  function todayWeekIndex() {
    const g = parseKey(todayKey()).getDay(); // 0=domenica
    return g === 0 ? 6 : g - 1;
  }

  function renderWeek() {
    const cont = $("#weekContainer");
    if (!cont) return;
    cont.innerHTML = "";
    const menu = weekMenu();
    const oggiIdx = todayWeekIndex();

    menu.forEach((day, dayIdx) => {
      const card = el("div", "week-day" + (dayIdx === oggiIdx ? " today" : ""));
      const head = el("div", "week-day-head");
      head.appendChild(el("span", null, day.giorno + (dayIdx === oggiIdx ? " · oggi" : "")));
      // kcal medie del giorno (media Marco/Caterina, indicativo)
      let kcalM = 0, kcalC = 0;
      WEEK_SLOTS.forEach((s) => {
        const rm = recipeById(day[s.key] && day[s.key].marco);
        const rc = recipeById(day[s.key] && day[s.key].caterina);
        if (rm && rm.kcal) kcalM += rm.kcal;
        if (rc && rc.kcal) kcalC += rc.kcal;
      });
      head.appendChild(el("span", "wd-kcal", (kcalM || kcalC) ? ("👨 " + kcalM + " · 👩 " + kcalC + " kcal") : ""));
      card.appendChild(head);

      WEEK_SLOTS.forEach((slot) => {
        // blocco pasto con etichetta + due righe persona
        const block = el("div", "week-meal-block");
        block.appendChild(el("div", "wm-blocklabel", (slot.icona || "") + " " + slot.label));
        block.appendChild(buildPersonMealRow(dayIdx, slot, "marco", "👨 Marco", day[slot.key].marco));
        block.appendChild(buildPersonMealRow(dayIdx, slot, "caterina", "👩 Caterina", day[slot.key].caterina));
        card.appendChild(block);
      });

      cont.appendChild(card);
    });
  }

  // Riga di un pasto per una persona (piatto proprio, toccabile per cambiare)
  function buildPersonMealRow(dayIdx, slot, persona, etichetta, recipeId) {
    const r = recipeById(recipeId);
    const row = el("div", "week-person-row " + persona + (r ? "" : " empty"));
    row.appendChild(el("div", "wpr-who", etichetta));
    const info = el("div", "wpr-info");
    info.appendChild(el("div", "wpr-name", r ? ((r.icona || "🍽️") + " " + r.nome) : "— tocca per scegliere"));
    if (r && r.kcal) info.appendChild(el("div", "wpr-kcal", r.kcal + " kcal"));
    row.appendChild(info);
    row.appendChild(el("div", "wm-arrow", "›"));
    row.addEventListener("click", () => openWeekPicker(dayIdx, slot, persona));
    return row;
  }

  // Verifica se una ricetta ha almeno un ingrediente con variante per Caterina
  function recipeHasVariant(r) {
    return (r.ingredienti || []).some((ing) => variantForIngredient(ing.nome) !== null);
  }

  // Ritorna la regola variante Caterina per un nome ingrediente, o null
  function variantForIngredient(nome) {
    if (typeof VARIANTI_CATERINA === "undefined") return null;
    const t = (nome || "").toLowerCase();
    for (const v of VARIANTI_CATERINA) {
      if (v.match.some((w) => t.includes(w))) return v;
    }
    return null;
  }

  // Dettaglio ricetta a due colonne (Marco / Caterina) con varianti
  function openSharedRecipe(r, dayIdx, slot) {
    $("#recipeTitle").textContent = r.nome;
    const body = $("#recipeBody");
    body.innerHTML = "";

    body.appendChild(el("div", "rb-kcal", (r.kcal || "?") + " kcal · " + (r.tipo || "") + " · senza glutine"));

    // Intestazione due persone
    const legend = el("div", "sr-legend");
    legend.innerHTML = "<span class='sr-who marco'>👨 Marco</span><span class='sr-who cate'>👩 Caterina</span>";
    body.appendChild(legend);

    body.appendChild(el("div", "rb-section", "Ingredienti"));
    const list = el("div", "sr-ings");
    (r.ingredienti || []).forEach((ing) => {
      const v = variantForIngredient(ing.nome);
      const rowEl = el("div", "sr-ing" + (v ? " diff" : ""));
      rowEl.appendChild(el("div", "sr-ing-name", ing.nome));
      const cols = el("div", "sr-ing-cols");
      // Marco (originale)
      const cM = el("div", "sr-col marco");
      cM.appendChild(el("span", "sr-qta", ing.qta || "q.b."));
      cols.appendChild(cM);
      // Caterina (variante se presente, altrimenti uguale)
      const cC = el("div", "sr-col cate");
      const cateNome = v && v.nome ? v.nome : null;
      const cateQta = v && v.qta ? v.qta : (ing.qta || "q.b.");
      cC.appendChild(el("span", "sr-qta", cateQta));
      if (cateNome) cC.appendChild(el("span", "sr-altname", cateNome));
      cols.appendChild(cC);
      rowEl.appendChild(cols);
      list.appendChild(rowEl);
    });
    body.appendChild(list);

    body.appendChild(el("div", "rb-salt", "🧂 <b>Sale:</b> " + (r.sale || "a piacere, con moderazione")));

    body.appendChild(el("div", "rb-section", "Preparazione"));
    const ol = el("ol");
    (r.preparazione || []).forEach((step) => ol.appendChild(el("li", null, step)));
    body.appendChild(ol);

    // Pulsante per cambiare la ricetta del giorno
    if (dayIdx != null && slot) {
      const btn = el("button", "rb-apply", "🔄 Cambia questo piatto");
      btn.addEventListener("click", () => { closeRecipe(); openWeekPicker(dayIdx, slot); });
      body.appendChild(btn);
    }

    $("#recipeModal").classList.remove("hidden");
  }

  // Sostituzione ricetta di uno slot PER UNA PERSONA (marco/caterina).
  // Marco: solo ricette senza glutine. Caterina: tutte le sue ricette del tipo.
  function openWeekPicker(dayIdx, slot, persona) {
    persona = persona || "marco";
    const candidates = [];
    const seen = new Set();
    if (persona === "marco") {
      // solo ricette senza glutine (da qualsiasi profilo), dello stesso tipo
      Object.keys(DIETE).forEach((pk) => {
        (DIETE[pk].ricette || []).forEach((r) => {
          if (r.tipo === slot.key && r.senzaGlutine && !seen.has(r.id)) { seen.add(r.id); candidates.push(r); }
        });
      });
    } else {
      // Caterina: le sue ricette del tipo + le senza glutine (che può comunque mangiare)
      (DIETE.caterina.ricette || []).forEach((r) => {
        if (r.tipo === slot.key && !seen.has(r.id)) { seen.add(r.id); candidates.push(r); }
      });
      (DIETE.marco.ricette || []).forEach((r) => {
        if (r.tipo === slot.key && r.senzaGlutine && !seen.has(r.id)) { seen.add(r.id); candidates.push(r); }
      });
    }

    const currentId = weekMenu()[dayIdx][slot.key][persona];
    const nomePersona = persona === "marco" ? "Marco" : "Caterina";

    $("#pickerTitle").textContent = slot.label + " · " + nomePersona;
    $("#pickerInstr").textContent = persona === "marco"
      ? "Solo ricette senza glutine (adatte a Marco)."
      : "Ricette per Caterina (anche con glutine, che lei può mangiare).";
    $("#pickerNote").textContent = weekMenu()[dayIdx].giorno;
    const box = $("#pickerOptions");
    box.innerHTML = "";
    candidates.forEach((r) => {
      const tag = r.senzaGlutine ? " · SG" : "";
      const b = el("button", "picker-opt" + (r.id === currentId ? " selected" : ""),
        (r.icona || "🍽️") + " " + r.nome + " · " + (r.kcal || "?") + " kcal" + tag);
      b.addEventListener("click", () => {
        weekMenu()[dayIdx][slot.key][persona] = r.id;
        saveState();
        closePicker();
        renderWeek();
      });
      box.appendChild(b);
    });
    if (!candidates.length) {
      box.appendChild(el("div", "section-hint", "Nessuna ricetta per questo pasto."));
    }
    $("#pickerModal").classList.remove("hidden");
  }

  // Genera la lista della spesa dal menù settimanale.
  // I piatti di Marco vanno nella sua lista, quelli di Caterina nella sua:
  // la spesa condivisa poi somma dove coincidono e distingue dove diversi.
  function generateWeekShopping() {
    const menu = weekMenu();

    // svuota le liste dei due profili
    ["marco", "caterina"].forEach((pk) => {
      profDataFor(pk);
      state.profiles[pk].shopping.recipes = [];
      state.profiles[pk].shopping.checked = {};
    });

    let count = 0;
    menu.forEach((day) => {
      WEEK_SLOTS.forEach((s) => {
        const cell = day[s.key] || {};
        [["marco", cell.marco], ["caterina", cell.caterina]].forEach(([pk, id]) => {
          if (!id) return;
          const shop = state.profiles[pk].shopping;
          if (!shop.recipes.includes(id)) { shop.recipes.push(id); count++; }
        });
      });
    });
    if (!count) { alert("Il menù è vuoto."); return; }

    spesaScope = "condivisa";
    saveState();
    renderSpesa();
    document.querySelectorAll("#spesaScope .scope-chip").forEach((x) => {
      x.classList.toggle("active", x.dataset.scope === "condivisa");
    });
    switchTab("spesa");
  }

  // Assicura l'esistenza del contenitore dati per un profilo qualsiasi
  function profDataFor(pk) {
    if (!state.profiles[pk]) state.profiles[pk] = { days: {}, weights: [], freeMealDates: [], favorites: [], shopping: { recipes: [], checked: {} } };
    const p = state.profiles[pk];
    if (!p.shopping) p.shopping = { recipes: [], checked: {} };
    return p;
  }

  // ============================================================
  //  LISTA DELLA SPESA
  // ============================================================
  let spesaScope = "solo"; // "solo" (profilo corrente) o "condivisa" (Marco + Caterina)

  // Ritorna coppie {profileKey, recipeId} in base allo scope selezionato
  function spesaSelezione() {
    if (spesaScope === "condivisa") {
      const out = [];
      ["marco", "caterina"].forEach((pk) => {
        const pr = state.profiles[pk];
        if (pr && pr.shopping && pr.shopping.recipes) {
          pr.shopping.recipes.forEach((id) => out.push({ profileKey: pk, recipeId: id }));
        }
      });
      return out;
    }
    return profData().shopping.recipes.map((id) => ({ profileKey: currentProfile, recipeId: id }));
  }

  // Cerca la ricetta per id: prima nel profilo indicato, poi in tutti i profili
  // (gli id ricetta sono unici; il menù di Caterina può puntare a ricette di Marco).
  function findRecipe(profileKey, recipeId) {
    const diet = DIETE[profileKey];
    let r = diet && (diet.ricette || []).find((x) => x.id === recipeId);
    if (r) return r;
    for (const pk of Object.keys(DIETE)) {
      r = (DIETE[pk].ricette || []).find((x) => x.id === recipeId);
      if (r) return r;
    }
    return null;
  }

  function renderSpesa() {
    // etichetta scope "solo <profilo>"
    const nameEl = $("#spesaScopeName");
    if (nameEl) nameEl.textContent = DIETE[currentProfile].nome;

    const shop = profData().shopping;
    const selezione = spesaSelezione();

    // Ricette selezionate (chip)
    const sel = $("#spesaSelected");
    sel.innerHTML = "";
    if (!selezione.length) {
      const msg = spesaScope === "condivisa"
        ? "Nessuna ricetta nelle liste di Marco e Caterina. Aggiungine dai rispettivi profili o qui."
        : "Nessuna ricetta selezionata. Tocca “Aggiungi ricette”.";
      sel.appendChild(el("div", "section-hint", msg));
    } else {
      selezione.forEach((item) => {
        const r = findRecipe(item.profileKey, item.recipeId);
        if (!r) return;
        const chip = el("div", "spesa-chip");
        chip.appendChild(el("div", "recipe-icon", r.icona || "🍽️"));
        const nm = el("div", "sc-name");
        nm.appendChild(el("div", null, r.nome));
        nm.appendChild(el("div", "sc-tag", spesaScope === "condivisa"
          ? (DIETE[item.profileKey].nome + " · " + r.tipo)
          : r.tipo));
        chip.appendChild(nm);
        const del = el("button", "sc-del", "🗑");
        del.addEventListener("click", () => {
          const pr = state.profiles[item.profileKey];
          const i = pr.shopping.recipes.indexOf(item.recipeId);
          if (i >= 0) pr.shopping.recipes.splice(i, 1);
          saveState();
          renderSpesa();
        });
        chip.appendChild(del);
        sel.appendChild(chip);
      });
    }

    // Ingredienti aggregati
    const listBox = $("#spesaList");
    listBox.innerHTML = "";
    const aggregated = aggregateIngredients(selezione);
    if (!aggregated.length) {
      listBox.appendChild(el("div", "section-hint", "La lista ingredienti apparirà qui."));
      return;
    }
    aggregated.forEach((item) => {
      const checked = !!shop.checked[item.key];
      const row = el("div", "spesa-item" + (checked ? " checked" : ""));
      row.appendChild(el("div", "si-check", "✓"));
      const nameWrap = el("div", "si-name");
      nameWrap.appendChild(el("span", null, item.nome));
      if (item.who === "Marco") nameWrap.appendChild(el("span", "si-who marco", "👨 Marco"));
      else if (item.who === "Caterina") nameWrap.appendChild(el("span", "si-who cate", "👩 Caterina"));
      else if (item.gf) nameWrap.appendChild(el("span", "si-tag", "senza glutine"));
      row.appendChild(nameWrap);
      row.appendChild(el("div", "si-qta", item.display));
      row.addEventListener("click", () => {
        shop.checked[item.key] = !shop.checked[item.key];
        saveState();
        renderSpesa();
      });
      listBox.appendChild(row);
    });
  }

  // Aggrega ingredienti. Regola (a): stesso alimento (stesso nome) -> quantità
  // sommate in un'unica riga (di entrambi); alimenti diversi tra Marco e Caterina
  // -> righe separate etichettate per persona. Ogni ingrediente è taggato con il
  // profilo da cui proviene (Marco/Caterina) nello scope condiviso.
  function aggregateIngredients(selezione) {
    const map = {}; // key -> { nome, byUnit, testi, gf, persone:Set }
    const condivisa = spesaScope === "condivisa";

    function addEntry(nome, qta, gf, persona) {
      const key = (nome || "").toLowerCase().trim();
      if (!map[key]) map[key] = { nome: nome, byUnit: {}, testi: [], gf: false, persone: new Set() };
      if (gf) map[key].gf = true;
      if (persona) map[key].persone.add(persona);
      const parsed = parseQta(qta);
      if (parsed) map[key].byUnit[parsed.unit] = (map[key].byUnit[parsed.unit] || 0) + parsed.value;
      else if (qta) map[key].testi.push(qta);
    }

    selezione.forEach((sel) => {
      const r = findRecipe(sel.profileKey, sel.recipeId);
      if (!r) return;
      const persona = sel.profileKey === "marco" ? "Marco"
        : sel.profileKey === "caterina" ? "Caterina" : null;
      (r.ingredienti || []).forEach((ing) => {
        addEntry(ing.nome, ing.qta, r.senzaGlutine, condivisa ? persona : null);
      });
    });

    return Object.keys(map).map((key) => {
      const m = map[key];
      const parts = [];
      Object.keys(m.byUnit).forEach((u) => {
        const val = Math.round(m.byUnit[u] * 100) / 100;
        parts.push(u ? (val + " " + u) : String(val));
      });
      [...new Set(m.testi)].forEach((t) => { if (t && !/^q\.?b\.?$/i.test(t)) parts.push(t); });
      // etichetta persona: solo se l'alimento è di uno solo dei due
      let who = null;
      if (condivisa) {
        const hasM = m.persone.has("Marco"), hasC = m.persone.has("Caterina");
        if (hasM && !hasC) who = "Marco";
        else if (hasC && !hasM) who = "Caterina";
      }
      return { key, nome: m.nome, display: parts.length ? parts.join(" + ") : "q.b.", gf: m.gf, who: who };
    }).sort((a, b) => a.nome.localeCompare(b.nome));
  }

  // Estrae valore+unità da una quantità testuale ("60 g", "2", "1 bicchiere",
  // "1 cucchiaio (10 g)" -> preferisce i grammi tra parentesi).
  function parseQta(qta) {
    if (!qta) return null;
    const str = String(qta);
    // se c'è un valore in grammi tra parentesi, usalo (più utile per la spesa)
    const paren = str.match(/\((\d+(?:[.,]\d+)?)\s*(g|gr|grammi|ml)\)/i);
    if (paren) {
      let u = paren[2].toLowerCase();
      if (["g", "gr", "grammi"].includes(u)) u = "g";
      return { value: parseFloat(paren[1].replace(",", ".")), unit: u };
    }
    const m = str.match(/^(\d+(?:[.,]\d+)?)\s*([a-zA-Zàèéìòù]+)?/);
    if (!m) return null;
    const value = parseFloat(m[1].replace(",", "."));
    if (isNaN(value)) return null;
    let unit = (m[2] || "").toLowerCase();
    // normalizza alcune unità
    if (["g", "gr", "grammi"].includes(unit)) unit = "g";
    else if (["l", "litri"].includes(unit)) unit = "L";
    else if (["ml"].includes(unit)) unit = "ml";
    else if (["bicchiere", "bicchieri"].includes(unit)) unit = "bicchieri";
    else if (["vasetto", "vasetti"].includes(unit)) unit = "vasetti";
    else if (["cucchiaio", "cucchiai"].includes(unit)) unit = "cucchiai";
    else if (["fetta", "fette"].includes(unit)) unit = "fette";
    // se non c'è unità è un conteggio (pezzi)
    if (!unit) unit = "pz";
    return { value, unit };
  }

  // Modale selezione ricette per la spesa
  function openSpesaPicker() {
    const diet = DIETE[currentProfile];
    const shop = profData().shopping;
    const box = $("#spesaModalList");
    box.innerHTML = "";
    (diet.ricette || []).forEach((r) => {
      const isSel = shop.recipes.includes(r.id);
      const b = el("button", "picker-opt" + (isSel ? " selected" : ""),
        (r.icona || "🍽️") + " " + r.nome + " · " + r.tipo);
      b.addEventListener("click", () => {
        const i = shop.recipes.indexOf(r.id);
        if (i >= 0) shop.recipes.splice(i, 1); else shop.recipes.push(r.id);
        saveState();
        openSpesaPicker(); // aggiorna selezione nella modale
        renderSpesa();
      });
      box.appendChild(b);
    });
    $("#spesaModal").classList.remove("hidden");
  }
  function closeSpesaPicker() { $("#spesaModal").classList.add("hidden"); }

  // ============================================================
  //  STATISTICHE
  // ============================================================
  let statsRange = 7;
  function renderStats() {
    const diet = DIETE[currentProfile];
    const p = profData();
    const days = lastNDates(statsRange);

    const nMeals = Object.keys(diet.pasti).length;
    const nHabits = (diet.abitudini || []).length;
    let mealsSum = 0, mealsMax = 0;
    let kcalSum = 0, kcalDays = 0;
    let habitsOkDays = 0;
    const perDay = [];

    days.forEach((dk) => {
      const day = p.days[dk];
      let done = 0, kc = 0, habitsDone = 0;
      if (day) {
        Object.keys(diet.pasti).forEach((mk) => { if (day.meals[mk] && day.meals[mk].done) done++; });
        kc = kcalTotaleForDay(diet, day);
        (diet.abitudini || []).forEach((h) => { if (day.habits[h.id]) habitsDone++; });
      }
      mealsSum += done; mealsMax += nMeals;
      if (kc > 0) { kcalSum += kc; kcalDays++; }
      if (nHabits > 0 && habitsDone === nHabits) habitsOkDays++;
      perDay.push({ date: dk, done: done, total: nMeals, kcal: kc });
    });

    const mealsPct = mealsMax > 0 ? Math.round((mealsSum / mealsMax) * 100) : 0;
    const kcalAvg = kcalDays > 0 ? Math.round(kcalSum / kcalDays) : 0;

    $("#statMeals").textContent = mealsPct + "%";
    $("#statKcal").textContent = kcalAvg > 0 ? kcalAvg : "—";
    $("#statHabits").textContent = habitsOkDays + "/" + statsRange;

    // Variazione peso nel periodo
    const weights = p.weights.slice().sort((a, b) => a.date.localeCompare(b.date))
      .filter((w) => days.includes(w.date));
    if (weights.length >= 2) {
      const diff = Math.round((weights[weights.length - 1].kg - weights[0].kg) * 10) / 10;
      $("#statWeight").textContent = (diff > 0 ? "+" : "") + diff + " kg";
    } else {
      $("#statWeight").textContent = "—";
    }

    drawStatsKcalChart(perDay, diet);
    renderMealsBars(perDay);
  }

  function kcalTotaleForDay(diet, day) {
    let tot = 0;
    Object.keys(diet.pasti).forEach((mk) => {
      const meal = diet.pasti[mk];
      const saved = day.meals[mk] || {};
      if (meal.composizione) {
        meal.composizione.forEach((ck) => { tot += kcalOfChoice(diet, ck, diet.categorie[ck], saved[ck]); });
      } else if (meal.opzioni) {
        tot += kcalOfChoice(diet, mk, meal, saved.scelta);
      }
    });
    (day.extras || []).forEach((e) => { tot += (Number(e.kcal) || 0); });
    return tot;
  }

  function lastNDates(n) {
    const arr = [];
    for (let i = n - 1; i >= 0; i--) arr.push(shiftDate(todayKey(), -i));
    return arr;
  }

  function renderMealsBars(perDay) {
    const box = $("#statsMealsBars");
    box.innerHTML = "";
    const giorniBrevi = ["dom","lun","mar","mer","gio","ven","sab"];
    perDay.forEach((d) => {
      const pct = d.total > 0 ? Math.round((d.done / d.total) * 100) : 0;
      const row = el("div", "stat-bar-row");
      const dd = parseKey(d.date);
      row.appendChild(el("div", "sb-day", giorniBrevi[dd.getDay()] + " " + dd.getDate()));
      const track = el("div", "stat-bar-track");
      const fill = el("div", "stat-bar-fill");
      fill.style.width = pct + "%";
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el("div", "sb-val", pct + "%"));
      box.appendChild(row);
    });
  }

  function drawStatsKcalChart(perDay, diet) {
    const canvas = $("#statsKcalChart");
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 320;
    const cssH = 160;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    const budget = typeof diet.kcal === "number" ? diet.kcal : 1200;
    const vals = perDay.map((d) => d.kcal);
    const maxV = Math.max(budget, ...vals, 1) * 1.1;
    const pad = 28;
    const plotW = cssW - pad * 2;
    const plotH = cssH - pad * 2;
    const n = perDay.length;
    const bw = n > 0 ? plotW / n * 0.6 : 0;

    // linea budget
    const yBudget = pad + plotH - (budget / maxV) * plotH;
    ctx.strokeStyle = "#f4a836";
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(pad, yBudget); ctx.lineTo(cssW - pad, yBudget); ctx.stroke();
    ctx.setLineDash([]);

    // barre
    perDay.forEach((d, i) => {
      const x = pad + (plotW / n) * i + (plotW / n - bw) / 2;
      const h = (d.kcal / maxV) * plotH;
      const y = pad + plotH - h;
      ctx.fillStyle = d.kcal > budget ? "#d1495b" : "#2e7d5b";
      ctx.fillRect(x, y, bw, h);
    });
  }

  // ============================================================
  //  PROMEMORIA / NOTIFICHE
  // ============================================================
  let reminderTimers = [];
  function renderReminderSettings() {
    const s = settings();
    const r = s.reminders;
    $("#remWater").value = r.water.time;
    $("#remWaterOn").checked = r.water.on;
    $("#remWeight").value = r.weight.time;
    $("#remWeightOn").checked = r.weight.on;
    $("#remMeals").value = r.meals.time;
    $("#remMealsOn").checked = r.meals.on;

    const status = $("#reminderStatus");
    const supported = ("Notification" in window);
    if (!supported) {
      status.textContent = "⚠️ Questo browser non supporta le notifiche.";
    } else if (Notification.permission === "granted") {
      status.textContent = "✅ Notifiche attive.";
    } else if (Notification.permission === "denied") {
      status.textContent = "🔕 Notifiche bloccate dal browser. Abilitale nelle impostazioni del sito.";
    } else {
      status.textContent = "Tocca “Attiva promemoria” per abilitare le notifiche.";
    }

    const note = $("#reminderNote");
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    note.innerHTML = isiOS
      ? "Su iPhone/iPad le notifiche funzionano solo se aggiungi l'app alla schermata Home e la apri da lì (iOS 16.4+). I promemoria scattano mentre l'app è aperta o installata."
      : "I promemoria scattano quando l'app è aperta in background. Per notifiche sempre attive, aggiungi l'app alla schermata Home.";
  }

  function saveReminderFromUI() {
    const s = settings();
    s.reminders.water = { time: $("#remWater").value || "11:00", on: $("#remWaterOn").checked };
    s.reminders.weight = { time: $("#remWeight").value || "08:00", on: $("#remWeightOn").checked };
    s.reminders.meals = { time: $("#remMeals").value || "20:30", on: $("#remMealsOn").checked };
    saveState();
    scheduleReminders();
  }

  function enableReminders() {
    if (!("Notification" in window)) { renderReminderSettings(); return; }
    Notification.requestPermission().then(() => {
      renderReminderSettings();
      scheduleReminders();
    });
  }

  // Pianifica i timer per la giornata corrente (mentre l'app è aperta)
  function scheduleReminders() {
    reminderTimers.forEach((t) => clearTimeout(t));
    reminderTimers = [];
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const s = settings().reminders;
    const items = [
      { cfg: s.water, title: "💧 Bevi acqua", body: "Ricordati di idratarti verso l'obiettivo di 1.8 L." },
      { cfg: s.weight, title: "⚖️ Pesati", body: "Registra il peso di oggi nell'app." },
      { cfg: s.meals, title: "🍽️ Registra i pasti", body: "Segna i pasti di oggi e controlla le calorie." }
    ];
    items.forEach((it) => {
      if (!it.cfg.on) return;
      const ms = msUntilTime(it.cfg.time);
      if (ms == null) return;
      const timer = setTimeout(() => {
        try { new Notification(it.title, { body: it.body, icon: "icon.svg" }); } catch (e) { /* ignore */ }
        // riprogramma per il giorno dopo
        scheduleReminders();
      }, ms);
      reminderTimers.push(timer);
    });
  }
  // ms da adesso fino al prossimo orario "HH:MM"
  function msUntilTime(hhmm) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
    if (!m) return null;
    const now = new Date();
    const target = new Date();
    target.setHours(Number(m[1]), Number(m[2]), 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    return target - now;
  }

  // ============================================================
  //  TEMA
  // ============================================================
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const toggle = $("#themeToggle");
    if (toggle) toggle.textContent = theme === "dark" ? "☀️" : "🌙";
    const check = $("#themeCheck");
    if (check) check.checked = theme === "dark";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#16211c" : "#2e7d5b");
  }
  function setTheme(theme) {
    settings().theme = theme;
    saveState();
    applyTheme(theme);
  }
  function toggleTheme() {
    setTheme(settings().theme === "dark" ? "light" : "dark");
  }

  // ============================================================
  //  MODALE PICKER
  // ============================================================
  let pickerCtx = null;
  function openPicker(mealKey, slotKey, cat, chosenValue) {
    pickerCtx = { mealKey, slotKey };
    $("#pickerTitle").textContent = cat.titolo;
    $("#pickerInstr").textContent = cat.istruzioni || "";
    $("#pickerNote").textContent = cat.note || "";
    const box = $("#pickerOptions");
    box.innerHTML = "";

    cat.opzioni.forEach((opt) => {
      const b = el("button", "picker-opt" + (opt === chosenValue ? " selected" : ""), opt);
      b.addEventListener("click", () => {
        setSlotValue(mealKey, slotKey, opt);
        closePicker();
      });
      box.appendChild(b);
    });

    if (chosenValue) {
      const clr = el("button", "picker-opt-clear", "✕ Rimuovi scelta");
      clr.addEventListener("click", () => {
        setSlotValue(mealKey, slotKey, null);
        closePicker();
      });
      box.appendChild(clr);
    }

    $("#pickerModal").classList.remove("hidden");
  }
  function closePicker() {
    $("#pickerModal").classList.add("hidden");
    pickerCtx = null;
  }
  function setSlotValue(mealKey, slotKey, value) {
    const d = dayData();
    if (!d.meals[mealKey]) d.meals[mealKey] = {};
    if (value === null) delete d.meals[mealKey][slotKey];
    else d.meals[mealKey][slotKey] = value;
    saveState();
    renderMeals();
    updateProgress();
  }

  // ============================================================
  //  PROGRESSO
  // ============================================================
  function updateProgress() {
    const diet = DIETE[currentProfile];
    const keys = Object.keys(diet.pasti);
    const d = dayData();
    let done = 0;
    keys.forEach((k) => { if (d.meals[k] && d.meals[k].done) done++; });
    $("#mealsDone").textContent = done;
    $("#mealsTotal").textContent = keys.length;
    const pct = keys.length ? Math.round((done / keys.length) * 100) : 0;
    $("#progressFill").style.width = pct + "%";
  }

  // ============================================================
  //  ABITUDINI
  // ============================================================
  function renderHabits() {
    const diet = DIETE[currentProfile];
    const cont = $("#habitsContainer");
    cont.innerHTML = "";
    const d = dayData();
    (diet.abitudini || []).forEach((h) => {
      const done = !!d.habits[h.id];
      const row = el("div", "habit-row" + (done ? " done" : ""));
      row.appendChild(el("div", "habit-icon", h.icona || "•"));
      row.appendChild(el("div", "habit-label", h.label));
      row.appendChild(el("div", "habit-check", "✓"));
      row.addEventListener("click", () => {
        d.habits[h.id] = !d.habits[h.id];
        saveState();
        renderHabits();
      });
      cont.appendChild(row);
    });
  }

  // ============================================================
  //  PASTO LIBERO
  // ============================================================
  function lastFreeMeal() {
    const p = profData();
    if (!p.freeMealDates.length) return null;
    return p.freeMealDates.slice().sort().pop();
  }
  function renderFreeMealBanner() {
    const diet = DIETE[currentProfile];
    const banner = $("#freeMealBanner");
    const last = lastFreeMeal();
    if (!last) { banner.classList.add("hidden"); return; }
    const passed = daysBetween(last, todayKey());
    const remaining = diet.pastoLiberoOgniGiorni - passed;
    if (remaining <= 0) {
      banner.classList.remove("hidden");
      banner.innerHTML = "🎉 Oggi puoi concederti il pasto libero!";
    } else {
      banner.classList.add("hidden");
    }
  }
  function renderFreeMealCard() {
    const diet = DIETE[currentProfile];
    const card = $("#freeMealCard");
    const last = lastFreeMeal();
    card.innerHTML = "";

    let remaining, ready;
    if (!last) {
      remaining = 0; ready = true;
    } else {
      const passed = daysBetween(last, todayKey());
      remaining = Math.max(0, diet.pastoLiberoOgniGiorni - passed);
      ready = remaining <= 0;
    }
    card.classList.toggle("ready", ready);

    card.appendChild(el("div", "fm-big", ready ? "Disponibile!" : remaining + (remaining === 1 ? " giorno" : " giorni")));
    card.appendChild(el("div", "fm-label", ready
      ? "Puoi fare il pasto libero (shock metabolico, es. pizza margherita)."
      : `Mancano al prossimo pasto libero (ogni ${diet.pastoLiberoOgniGiorni} giorni).`));

    const btn = el("button", "btn-free" + (ready ? "" : " disabled"), "🍕 Registra pasto libero di oggi");
    btn.addEventListener("click", () => {
      const p = profData();
      const t = todayKey();
      if (!p.freeMealDates.includes(t)) p.freeMealDates.push(t);
      saveState();
      renderFreeMealCard();
      renderFreeMealBanner();
    });
    card.appendChild(btn);

    if (last) {
      const info = el("div", "fm-label", "Ultimo pasto libero: " + formatLong(last));
      info.style.marginTop = "12px";
      card.appendChild(info);
      const reset = el("button", "fm-reset", "Annulla ultimo pasto libero");
      reset.addEventListener("click", () => {
        const p = profData();
        p.freeMealDates = p.freeMealDates.filter((x) => x !== last);
        saveState();
        renderFreeMealCard();
        renderFreeMealBanner();
      });
      card.appendChild(reset);
    }
  }

  // ============================================================
  //  PESO
  // ============================================================
  function renderWeight() {
    const diet = DIETE[currentProfile];
    const p = profData();
    const weights = p.weights.slice().sort((a, b) => a.date.localeCompare(b.date));
    const latest = weights.length ? weights[weights.length - 1].kg : diet.pesoAttuale;

    $("#weightCurrent").textContent = latest != null ? latest + " kg" : "—";
    $("#weightGoal").textContent = diet.pesoObiettivo != null ? diet.pesoObiettivo + " kg" : "—";

    drawWeightChart(weights, diet);

    const hist = $("#weightHistory");
    hist.innerHTML = "";
    weights.slice().reverse().forEach((w) => {
      const li = el("li");
      const left = el("div");
      left.appendChild(el("span", "wh-val", w.kg + " kg"));
      const right = el("div");
      right.style.display = "flex";
      right.style.alignItems = "center";
      right.style.gap = "12px";
      right.appendChild(el("span", "wh-date", formatLong(w.date)));
      const del = el("button", "wh-del", "🗑");
      del.addEventListener("click", () => {
        p.weights = p.weights.filter((x) => !(x.date === w.date && x.kg === w.kg));
        saveState();
        renderWeight();
      });
      right.appendChild(del);
      li.appendChild(left);
      li.appendChild(right);
      hist.appendChild(li);
    });
  }

  function addWeight() {
    const input = $("#weightInput");
    const val = parseFloat((input.value || "").replace(",", "."));
    if (isNaN(val) || val <= 0 || val > 400) {
      input.focus();
      return;
    }
    const p = profData();
    const t = todayKey();
    // Sostituisce eventuale peso già inserito oggi
    p.weights = p.weights.filter((x) => x.date !== t);
    p.weights.push({ date: t, kg: Math.round(val * 10) / 10 });
    saveState();
    input.value = "";
    renderWeight();
  }

  // Grafico peso su canvas (nessuna libreria esterna)
  function drawWeightChart(weights, diet) {
    const canvas = $("#weightChart");
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 320;
    const cssH = 200;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    if (weights.length === 0) {
      ctx.fillStyle = "#8aa89a";
      ctx.font = "14px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Aggiungi il tuo peso per vedere il grafico", cssW / 2, cssH / 2);
      return;
    }

    const pad = 34;
    const goal = diet.pesoObiettivo;
    const vals = weights.map((w) => w.kg);
    let min = Math.min.apply(null, vals);
    let max = Math.max.apply(null, vals);
    if (goal != null) { min = Math.min(min, goal); max = Math.max(max, goal); }
    if (min === max) { min -= 1; max += 1; }
    min -= 0.5; max += 0.5;

    const plotW = cssW - pad * 2;
    const plotH = cssH - pad * 2;
    const xFor = (i) => pad + (weights.length === 1 ? plotW / 2 : (i / (weights.length - 1)) * plotW);
    const yFor = (v) => pad + plotH - ((v - min) / (max - min)) * plotH;

    // Linea obiettivo
    if (goal != null) {
      ctx.strokeStyle = "#f4a836";
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(pad, yFor(goal));
      ctx.lineTo(cssW - pad, yFor(goal));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#c9851f";
      ctx.font = "11px -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("obiettivo " + goal + "kg", pad + 2, yFor(goal) - 5);
    }

    // Area + linea peso
    ctx.strokeStyle = "#2e7d5b";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    weights.forEach((w, i) => {
      const x = xFor(i), y = yFor(w.kg);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Punti
    ctx.fillStyle = "#2e7d5b";
    weights.forEach((w, i) => {
      ctx.beginPath();
      ctx.arc(xFor(i), yFor(w.kg), 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Etichetta primo e ultimo valore
    ctx.fillStyle = "#1f5c42";
    ctx.font = "bold 12px -apple-system, sans-serif";
    ctx.textAlign = "center";
    const lastI = weights.length - 1;
    ctx.fillText(weights[lastI].kg + "kg", xFor(lastI), yFor(weights[lastI].kg) - 10);
  }

  // ============================================================
  //  INFO
  // ============================================================
  function renderInfo() {
    const diet = DIETE[currentProfile];
    const head = $("#infoHeader");
    head.innerHTML = "";
    head.appendChild(el("h3", null, diet.nome + " · " + diet.kcal + " kcal/die"));
    head.appendChild(el("p", null, (diet.dottoressa || "") + (diet.data ? " · " + diet.data : "")));
    if (diet.macros) {
      const m = el("div", "info-macros");
      m.appendChild(el("div", null, `<b>${diet.macros.carboidrati}%</b><small>Carboidrati</small>`));
      m.appendChild(el("div", null, `<b>${diet.macros.proteine}%</b><small>Proteine</small>`));
      m.appendChild(el("div", null, `<b>${diet.macros.grassi}%</b><small>Grassi</small>`));
      head.appendChild(m);
    }

    $("#infoPremessa").textContent = diet.premessa || "—";

    const reg = $("#infoRegole");
    reg.innerHTML = "";
    (diet.regoleGenerali || []).forEach((r) => reg.appendChild(el("li", null, r)));

    $("#infoCereali").textContent = diet.noteCereali || "—";
  }

  // ============================================================
  //  NAVIGAZIONE TAB
  // ============================================================
  function switchTab(tab) {
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    const panel = $("#tab-" + tab);
    if (panel) panel.classList.add("active");
    const btn = document.querySelector('.nav-btn[data-tab="' + tab + '"]');
    if (btn) btn.classList.add("active");
    if (tab === "peso") renderWeight();  // ridisegna il canvas quando visibile
    if (tab === "stats") renderStats();  // calcola le statistiche all'apertura
    if (tab === "insieme") renderShared();
    if (tab === "settimana") renderWeek();
    // chiudi il menu "Altro" se aperto
    const more = $("#moreModal");
    if (more) more.classList.add("hidden");
    // evidenzia "Altro" nella nav se il tab attivo è uno di quelli nel menu
    const inMore = ["insieme", "stats", "peso", "abitudini", "info"].includes(tab);
    const moreBtn = $("#moreBtn");
    if (moreBtn) moreBtn.classList.toggle("active", inMore);
    window.scrollTo(0, 0);
  }

  // ============================================================
  //  EVENTI GLOBALI
  // ============================================================
  function bindEvents() {
    $("#profileSelect").addEventListener("change", (e) => {
      currentProfile = e.target.value;
      state.lastProfile = currentProfile;
      saveState();
      renderAll();
    });

    $("#prevDay").addEventListener("click", () => {
      currentDate = shiftDate(currentDate, -1);
      renderAll();
    });
    $("#nextDay").addEventListener("click", () => {
      if (currentDate === todayKey()) return; // non oltre oggi
      currentDate = shiftDate(currentDate, 1);
      renderAll();
    });

    document.querySelectorAll(".nav-btn").forEach((b) => {
      if (b.id === "moreBtn") return; // gestito a parte
      b.addEventListener("click", () => switchTab(b.dataset.tab));
    });

    // Menu "Altro"
    $("#moreBtn").addEventListener("click", () => $("#moreModal").classList.remove("hidden"));
    $("#moreClose").addEventListener("click", () => $("#moreModal").classList.add("hidden"));
    $("#moreModal .modal-backdrop").addEventListener("click", () => $("#moreModal").classList.add("hidden"));
    document.querySelectorAll(".more-item").forEach((b) => {
      b.addEventListener("click", () => switchTab(b.dataset.tab));
    });

    // Settimana
    $("#weekShopBtn").addEventListener("click", generateWeekShopping);
    $("#weekResetBtn").addEventListener("click", () => {
      if (!confirm("Ripristinare il menù settimanale predefinito?")) return;
      state.weekMenu = JSON.parse(JSON.stringify(
        typeof MENU_SETTIMANALE_DEFAULT !== "undefined" ? MENU_SETTIMANALE_DEFAULT : []
      ));
      saveState();
      renderWeek();
    });

    $("#weightAddBtn").addEventListener("click", addWeight);
    $("#weightInput").addEventListener("keydown", (e) => { if (e.key === "Enter") addWeight(); });

    $("#extraAddBtn").addEventListener("click", addExtra);
    $("#extraKcal").addEventListener("keydown", (e) => { if (e.key === "Enter") addExtra(); });

    $("#pickerClose").addEventListener("click", closePicker);
    $("#pickerModal .modal-backdrop").addEventListener("click", closePicker);
    $("#recipeClose").addEventListener("click", closeRecipe);
    $("#recipeModal .modal-backdrop").addEventListener("click", closeRecipe);

    // Acqua
    $("#waterPlus").addEventListener("click", () => addWater(GLASS_ML));
    $("#waterMinus").addEventListener("click", () => addWater(-GLASS_ML));

    // Ricerca ricette
    $("#recipeSearch").addEventListener("input", (e) => { recipeSearch = e.target.value; renderRecipes(); });

    // Vista condivisa: navigazione giorni
    $("#prevDayShared").addEventListener("click", () => {
      sharedDate = shiftDate(sharedDate, -1);
      renderShared();
    });
    $("#nextDayShared").addEventListener("click", () => {
      if (sharedDate === todayKey()) return;
      sharedDate = shiftDate(sharedDate, 1);
      renderShared();
    });

    // Lista spesa
    $("#spesaPickBtn").addEventListener("click", openSpesaPicker);
    $("#spesaModalClose").addEventListener("click", closeSpesaPicker);
    $("#spesaModal .modal-backdrop").addEventListener("click", closeSpesaPicker);
    $("#spesaClearBtn").addEventListener("click", () => {
      if (spesaScope === "condivisa") {
        if (!confirm("Svuotare le liste di Marco e Caterina?")) return;
        ["marco", "caterina"].forEach((pk) => {
          const pr = state.profiles[pk];
          if (pr && pr.shopping) { pr.shopping.recipes = []; pr.shopping.checked = {}; }
        });
      } else {
        if (!confirm("Svuotare la lista della spesa?")) return;
        const shop = profData().shopping;
        shop.recipes = []; shop.checked = {};
      }
      saveState();
      renderSpesa();
    });

    // Scope spesa (solo / condivisa)
    document.querySelectorAll("#spesaScope .scope-chip").forEach((c) => {
      c.addEventListener("click", () => {
        document.querySelectorAll("#spesaScope .scope-chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        spesaScope = c.dataset.scope || "solo";
        renderSpesa();
      });
    });

    // Statistiche: range
    document.querySelectorAll("#statsRange .range-chip").forEach((c) => {
      c.addEventListener("click", () => {
        document.querySelectorAll("#statsRange .range-chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        statsRange = Number(c.dataset.range) || 7;
        renderStats();
      });
    });

    // Tema
    $("#themeToggle").addEventListener("click", toggleTheme);
    $("#themeCheck").addEventListener("change", (e) => setTheme(e.target.checked ? "dark" : "light"));

    // Promemoria
    ["remWater","remWaterOn","remWeight","remWeightOn","remMeals","remMealsOn"].forEach((id) => {
      $("#" + id).addEventListener("change", saveReminderFromUI);
    });
    $("#reminderEnableBtn").addEventListener("click", enableReminders);

    $("#resetDayBtn").addEventListener("click", () => {
      if (!confirm("Azzerare pasti e abitudini di " + (currentDate === todayKey() ? "oggi" : formatLong(currentDate)) + "?")) return;
      const p = profData();
      delete p.days[currentDate];
      saveState();
      renderAll();
    });

    window.addEventListener("resize", () => {
      if ($("#tab-peso").classList.contains("active")) renderWeight();
      if ($("#tab-stats").classList.contains("active")) renderStats();
    });
  }

  // ============================================================
  //  AVVIO
  // ============================================================
  function init() {
    if (!currentProfile) {
      document.body.innerHTML = "<p style='padding:20px'>Nessuna dieta configurata in data.js</p>";
      return;
    }
    state.lastProfile = currentProfile;
    applyTheme(settings().theme);
    registerServiceWorker();
    renderProfiles();
    bindEvents();
    renderAll();
    scheduleReminders();
    saveState();
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      // solo su http/https (non su file://)
      if (location.protocol === "http:" || location.protocol === "https:") {
        navigator.serviceWorker.register("sw.js").catch(() => { /* ignore */ });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
