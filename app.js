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
    return p;
  }
  // Dati del giorno selezionato { meals:{}, habits:{} }
  function dayData() {
    const p = profData();
    if (!p.days[currentDate]) p.days[currentDate] = { meals: {}, habits: {} };
    const d = p.days[currentDate];
    if (!d.meals) d.meals = {};
    if (!d.habits) d.habits = {};
    return d;
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
    renderHabits();
    renderFreeMealCard();
    renderWeight();
    renderInfo();
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

      if (meal.composizione) {
        // Pasto composto (pranzo/cena): cereali + secondi + ortaggi
        meal.composizione.forEach((catKey) => {
          const cat = diet.categorie[catKey];
          const chosen = saved[catKey];
          body.appendChild(buildSlot(mealKey, catKey, cat, chosen));
        });
        // Nota carboidrati
        body.appendChild(buildCarbNote(diet));
      } else if (meal.opzioni) {
        // Pasto a scelta singola (colazione/spuntini)
        const chosen = saved.scelta;
        body.appendChild(buildSlot(mealKey, "scelta", { titolo: "Scelta", icona: "•", istruzioni: meal.istruzioni, opzioni: meal.opzioni, note: meal.note }, chosen));
      }

      card.appendChild(body);
      cont.appendChild(card);
    });
  }

  function buildSlot(mealKey, slotKey, cat, chosenValue) {
    const slot = el("div", "slot" + (chosenValue ? " filled" : ""));
    slot.appendChild(el("div", "slot-icon", cat.icona || "•"));
    const txt = el("div", "slot-text");
    txt.appendChild(el("b", null, cat.titolo));
    txt.appendChild(el("span", null, chosenValue || "Tocca per scegliere"));
    slot.appendChild(txt);
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
    updateProgress();
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
    $("#tab-" + tab).classList.add("active");
    document.querySelector('.nav-btn[data-tab="' + tab + '"]').classList.add("active");
    if (tab === "peso") renderWeight(); // ridisegna il canvas quando visibile
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
      b.addEventListener("click", () => switchTab(b.dataset.tab));
    });

    $("#weightAddBtn").addEventListener("click", addWeight);
    $("#weightInput").addEventListener("keydown", (e) => { if (e.key === "Enter") addWeight(); });

    $("#pickerClose").addEventListener("click", closePicker);
    $(".modal-backdrop").addEventListener("click", closePicker);

    $("#resetDayBtn").addEventListener("click", () => {
      if (!confirm("Azzerare pasti e abitudini di " + (currentDate === todayKey() ? "oggi" : formatLong(currentDate)) + "?")) return;
      const p = profData();
      delete p.days[currentDate];
      saveState();
      renderAll();
    });

    window.addEventListener("resize", () => {
      if ($("#tab-peso").classList.contains("active")) renderWeight();
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
    renderProfiles();
    bindEvents();
    renderAll();
    saveState();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
