/* ==========================================================
   JariShare — shared shell
   (auth guard, navbar with animated logo / theme switch /
   language switch / mobile menu, footer, toasts, confirm)
   Requires: lang.js (loaded before this file)
   ========================================================== */
(function () {
  "use strict";

  var page = (window.location.pathname.split("/").pop() || "").toLowerCase();
  var PUBLIC_PAGES = ["", "index.html", "register.html", "login.html", "about.html"];

  /* ----------------------------------------------------------
     Data migration — unify formats written by the first
     prototype (missing owner, text/time notifications, emojis)
     ---------------------------------------------------------- */
  function stripSymbols(text) {
    return String(text).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B00}-\u{2BFF}]/gu, "").trim();
  }

  (function migrateLegacyData() {
    try {
      var email = localStorage.getItem("jariCurrentUser") || "";
      var items = JSON.parse(localStorage.getItem("jariItems") || "null");
      if (Array.isArray(items)) {
        var touched = false;
        items.forEach(function (it) {
          if (it && !it.owner) { it.owner = email; touched = true; }
        });
        if (touched) localStorage.setItem("jariItems", JSON.stringify(items));
      }

      var notes = JSON.parse(localStorage.getItem("jariNotifications") || "null");
      if (Array.isArray(notes)) {
        touched = false;
        notes.forEach(function (n) {
          if (!n) return;
          var title = n.title || n.text || "";
          var date = n.date || n.time || "";
          title = stripSymbols(title);
          if (title !== n.title || date !== n.date) {
            n.title = title; n.date = date;
            delete n.text; delete n.time;
            touched = true;
          }
        });
        if (touched) localStorage.setItem("jariNotifications", JSON.stringify(notes));
      }

      var msgs = JSON.parse(localStorage.getItem("jariMessages") || "null");
      if (Array.isArray(msgs)) {
        touched = false;
        msgs.forEach(function (m) {
          if (!m) return;
          var from = m.from || m.name || m.sender || "";
          var text = m.text || m.message || m.content || "";
          var date = m.date || m.time || "";
          if (from !== m.from || text !== m.text || date !== m.date) {
            m.from = from; m.text = text; m.date = date;
            delete m.name; delete m.sender; delete m.message; delete m.content; delete m.time;
            touched = true;
          }
        });
        if (touched) localStorage.setItem("jariMessages", JSON.stringify(msgs));
      }
    } catch (e) {}
  })();

  /* ----------------------------------------------------------
     Theme (light / dark) — applies before first paint
     ---------------------------------------------------------- */
  function currentTheme() {
    try {
      var saved = localStorage.getItem("jariTheme");
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", currentTheme());

  /* ----------------------------------------------------------
     Session & auth guard
     ---------------------------------------------------------- */
  var sessionEmail = localStorage.getItem("jariCurrentUser");
  if (!PUBLIC_PAGES.includes(page) && !sessionEmail) {
    sessionStorage.setItem("jsNotice", "1");
    window.location.replace("login.html");
    return;
  }

  window.addEventListener("DOMContentLoaded", function () {

    /* --------------------------------------------------------
        Toasts
       -------------------------------------------------------- */
    function toastWrap() {
      var wrap = document.querySelector(".toast-wrap");
      if (!wrap) {
        wrap = document.createElement("div");
        wrap.className = "toast-wrap";
        document.body.appendChild(wrap);
      }
      return wrap;
    }

    var ICONS = {
      success: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      error: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      info: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6h.01M12 12v6"/></svg>'
    };

    var SUN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
    var MOON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>';
    var BARS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';

    /* Extend the Jari global from lang.js — never replace it,
       otherwise Jari.lang / Jari.setLang would be lost */
    window.Jari = window.Jari || {};

    if (!Jari.t) Jari.t = function (k) { return k; };

    Jari.toast = function (message, type) {
      message = stripSymbols(message);
      type = type === "error" ? "error" : type === "info" ? "info" : "success";
      var el = document.createElement("div");
      el.className = "toast toast-" + type;
      el.innerHTML =
        '<span class="toast-icon">' + (ICONS[type] || ICONS.success) + "</span>" +
        '<span class="toast-msg"></span>';
      el.querySelector(".toast-msg").textContent = message;
      toastWrap().appendChild(el);
      setTimeout(function () {
        el.classList.add("leaving");
        setTimeout(function () { el.remove(); }, 240);
      }, 3400);
    };

    /* Promise-based confirm dialog (replaces window.confirm) */
    Jari.confirm = function (title, text, confirmText) {
        return new Promise(function (resolve) {
          var overlay = document.createElement("div");
          overlay.className = "modal-overlay";
          overlay.innerHTML =
            '<div class="modal-card" role="dialog" aria-modal="true">' +
              '<h3 class="modal-title"></h3>' +
              '<p class="modal-text"></p>' +
              '<div class="modal-actions">' +
                '<button type="button" class="btn btn-ghost" data-act="cancel"></button>' +
                '<button type="button" class="btn btn-danger-solid" data-act="ok"></button>' +
              "</div>" +
            "</div>";
          overlay.querySelector(".modal-title").textContent = title;
          overlay.querySelector(".modal-text").textContent = text;
          overlay.querySelector('[data-act="cancel"]').textContent = Jari.t("dialog.cancel");
          overlay.querySelector('[data-act="ok"]').textContent = confirmText || Jari.t("dialog.cancel");

          function close(result) {
            overlay.remove();
            document.removeEventListener("keydown", onKey);
            resolve(result);
          }
          function onKey(e) { if (e.key === "Escape") close(false); }

          overlay.addEventListener("click", function (e) {
            if (e.target === overlay) { close(false); return; }
            var btn = e.target.closest("[data-act]");
            if (btn) close(btn.dataset.act === "ok");
          });
          document.addEventListener("keydown", onKey);
          document.body.appendChild(overlay);
          overlay.querySelector('[data-act="cancel"]').focus();
        });
      };

    /* Show a message once, on the next page load */
    Jari.flash = function (message) {
      try { localStorage.setItem("jsFlash", message); } catch (e) {}
    };

    /* Replay flash / notice messages saved before navigation */
    var flashSaved = null, noticeSaved = null;
    try { flashSaved = localStorage.getItem("jsFlash"); } catch (e) {}
    if (flashSaved) {
      try { localStorage.removeItem("jsFlash"); } catch (e) {}
      Jari.toast(flashSaved, "success");
    }
    try { noticeSaved = sessionStorage.getItem("jsNotice"); } catch (e) {}
    if (noticeSaved) {
      try { sessionStorage.removeItem("jsNotice"); } catch (e) {}
      Jari.toast(Jari.t("notice.required"), "info");
    }

    /* --------------------------------------------------------
        Brand (animated) & icons
       -------------------------------------------------------- */
    var BRAND_MARK =
      '<svg class="jari-logo" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path class="logo-house-l" d="M2.5 11.2 6.5 7.8l4 3.4V19h-8z"/>' +
        '<path class="logo-house-r" d="M21.5 11.2 17.5 7.8l-4 3.4V19h8z"/>' +
        '<g class="logo-item"><rect x="10.6" y="9.6" width="2.8" height="2.8" rx="0.7" fill="currentColor" stroke="none"/></g>' +
      "</svg>";

    /* --------------------------------------------------------
        Theme & language switches
       -------------------------------------------------------- */
    function syncThemeToggle(btn) {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      btn.innerHTML = dark ? SUN : MOON;
      btn.setAttribute("aria-label", Jari.t("a11y.theme"));
      btn.title = Jari.t("a11y.theme");
    }

    function syncLangToggle(btn) {
      /* The button shows the language you would switch to */
      btn.textContent = Jari.lang() === "en" ? "عربي" : "EN";
      btn.setAttribute("aria-label", Jari.t("a11y.lang"));
    }

    var tools = document.createElement("div");
    tools.className = "nav-tools";

    var themeBtn = document.createElement("button");
    themeBtn.type = "button";
    themeBtn.className = "theme-toggle";
    syncThemeToggle(themeBtn);
    themeBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("jariTheme", next); } catch (e) {}
      syncThemeToggle(themeBtn);
    });

    var langBtn = document.createElement("button");
    langBtn.type = "button";
    langBtn.className = "lang-toggle";
    syncLangToggle(langBtn);
    langBtn.addEventListener("click", function () {
      Jari.setLang(Jari.lang() === "en" ? "ar" : "en");
      syncLangToggle(langBtn);
      syncThemeToggle(themeBtn); /* aria labels follow the language */
    });

    tools.appendChild(themeBtn);
    tools.appendChild(langBtn);

    /* --------------------------------------------------------
        Page type — auth pages get a minimal brand bar,
        app pages get the full navbar + footer
       -------------------------------------------------------- */
    var isAuth = ["login.html", "register.html"].indexOf(page) !== -1;

    /* Translate every static [data-i18n] element (also re-used below) */
    function applyNavI18n() {
      Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
        el.textContent = Jari.t(el.getAttribute("data-i18n"));
      });
    }

    if (isAuth) {
      var topbar = document.createElement("header");
      topbar.className = "auth-topbar";
      topbar.innerHTML =
        '<div class="auth-topbar-inner">' +
          '<a class="nav-brand" href="about.html">' +
            '<span class="brand-mark">' + BRAND_MARK + "</span>JariShare" +
          "</a>" +
        "</div>";
      topbar.querySelector(".auth-topbar-inner").appendChild(tools);
      document.body.prepend(topbar);

      applyNavI18n();
      setTimeout(applyNavI18n, 0);
      document.dispatchEvent(new CustomEvent("jari:langchange"));
      document.addEventListener("jari:langchange", function () {
        syncLangToggle(langBtn);
        syncThemeToggle(themeBtn);
      });
      return;
    }

    /* --------------------------------------------------------
        Navbar — adapts to visitor state
       -------------------------------------------------------- */
    var logged = !!sessionEmail;

    var links = logged
      ? '<a class="nav-link" href="dashboard.html" data-page="dashboard.html" data-i18n="nav.dashboard">Dashboard</a>' +
        '<a class="nav-link" href="my-items.html" data-page="my-items.html" data-i18n="nav.myItems">My Items</a>' +
        '<a class="nav-link" href="messages.html" data-page="messages.html" data-i18n="nav.messages">Messages</a>' +
        '<a class="nav-link" href="about.html" data-page="about.html" data-i18n="nav.about">About</a>' +
        '<span class="nav-divider"></span>' +
        '<a class="btn-nav-add" href="add-item.html" data-i18n="nav.postItem">Post an Item</a>' +
        '<button type="button" class="nav-logout" id="nav-logout" data-i18n="nav.signOut">Sign Out</button>'
      : '<a class="nav-link" href="about.html" data-page="about.html" data-i18n="nav.about">About</a>' +
        '<a class="nav-link" href="login.html" data-page="login.html" data-i18n="nav.login">Log in</a>' +
        '<a class="btn-nav-add" href="register.html" data-i18n="nav.createAccount">Create Account</a>';

    var navbar = document.createElement("header");
    navbar.className = "navbar";
    navbar.innerHTML =
      '<div class="navbar-inner">' +
        '<a class="nav-brand" href="' + (logged ? "dashboard.html" : "register.html") + '">' +
          '<span class="brand-mark">' + BRAND_MARK + "</span>JariShare" +
        "</a>" +
        '<nav class="nav-links" aria-label="Main navigation">' + links + "</nav>" +
      "</div>";

    var inner = navbar.querySelector(".navbar-inner");
    var burger = document.createElement("button");
    burger.type = "button";
    burger.className = "nav-burger";
    burger.setAttribute("aria-label", Jari.t("a11y.menu"));
    burger.innerHTML = BARS;
    inner.insertBefore(burger, inner.querySelector(".nav-links"));

    document.body.prepend(navbar);

    var linksBox = navbar.querySelector(".nav-links");
    burger.addEventListener("click", function () {
      linksBox.classList.toggle("open");
      burger.setAttribute("aria-label", Jari.t("a11y.menu"));
    });
    linksBox.addEventListener("click", function () { linksBox.classList.remove("open"); });
    document.addEventListener("click", function (e) {
      if (!navbar.contains(e.target)) linksBox.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") linksBox.classList.remove("open");
    });

    /* Insert the tool switches before the main CTA */
    var cta = navbar.querySelector(".btn-nav-add");
    if (cta) cta.parentNode.insertBefore(tools, cta);
    else linksBox.appendChild(tools);

    /* Highlight the entry matching the current page */
    Array.prototype.forEach.call(navbar.querySelectorAll(".nav-link"), function (a) {
      if (a.dataset.page === page) a.classList.add("active");
    });

    /* Re-apply translations once lang.js finishes its DOM pass */
    setTimeout(applyNavI18n, 0);

    var logoutBtn = document.getElementById("nav-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        Jari.confirm(Jari.t("confirm.signOutTitle"), Jari.t("confirm.signOutText"), Jari.t("confirm.signOut"))
          .then(function (ok) {
            if (!ok) return;
            localStorage.removeItem("jariCurrentUser");
            Jari.flash(Jari.t("notice.signedOut"));
            window.location.href = "login.html";
          });
      });
    }

    /* --------------------------------------------------------
        Footer
       -------------------------------------------------------- */
    var footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<div class="footer-inner">' +
        '<span class="footer-brand"><span class="brand-mark">' + BRAND_MARK + "</span>JariShare</span>" +
        '<span class="footer-copy"><span data-i18n="footer.tag">' + Jari.t("footer.tag") + "</span> &copy; 2026 JariShare</span>" +
      "</div>";
    document.body.appendChild(footer);

    /* Translate everything that was just injected */
    applyNavI18n();
    document.dispatchEvent(new CustomEvent("jari:langchange"));

    /* Keep toggle labels in sync when the page re-translates elsewhere */
    document.addEventListener("jari:langchange", function () {
      syncLangToggle(langBtn);
      syncThemeToggle(themeBtn);
    });
  });
})();
