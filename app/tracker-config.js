/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — Engagement Tracker settings

   TO SWITCH THE TRACKER ON
   Paste your Firebase Realtime Database address between the two quote
   marks on the  databaseURL  line below, then commit the file. It looks
   like one of these:

     https://the-chronicles-a1b2c-default-rtdb.europe-west1.firebasedatabase.app
     https://the-chronicles-a1b2c-default-rtdb.firebaseio.com

   Until an address is pasted, the tracker is switched off and its header
   cell stays hidden. Nothing else on the site is affected either way.
   ═══════════════════════════════════════════════════════════════════════ */
window.CHRONICLES_TRACKER_CONFIG = {

  databaseURL: "",


  /* ── Figures carried over from before live tracking began ──────────────
     As supplied on 30 September 2026. Each period figure belongs only to the
     period it describes, and live counts are added on top of it:
       past24h     — the 24 hours before live tracking started (fades out
                     over the first day, as those hours leave the window)
       week        — the week of Monday 28 September to Sunday 4 October 2026
       month       — September 2026
       year        — 2026
       sinceLaunch — all time
     Countries: "GB" is the United Kingdom, "PK" is Pakistan, and "EUROPE"
     is the regional total recorded before country-level tracking existed.
     Set any figure to 0 to remove it. */
  baseline: {
    asOf: "2026-09-30",
    past24h: 21,
    week: 154,
    month: 1021,
    year: 4334,
    sinceLaunch: 4334,
    countries: { "GB": 2185, "PK": 1834, "EUROPE": 315 }
  }
};
