/* ==========================================================
   JariShare — shared shell (auth guard, navbar, footer,
   toast notifications and the confirm dialog)
   ========================================================== */
(function () {
  "use strict";

  const page = (window.location.pathname.split("/").pop() || "").toLowerCase();
  const PUBLIC_PAGES = ["", "index.html", "register.html", "login.html", "about.html"];

  /* ----------------------------------------------------------
     1. Auth guard — protected pages redirect to login
     ---------------------------------------------------------- */
  const sessionEmail = localStorage.getItem("jariCurrentUser");
  if (!PUBLIC_PAGES.includes(page) && !sessionEmail) {
    sessionStorage.setItem("jsNotice", "Please sign in to open that page.");
    window.location.replace("login.html");
    return;
  }

  window.addEventListener("DOMContentLoaded", function () {

    /* --------------------------------------------------------
        2. Toast notifications
       -------------------------------------------------------- */
    function toastWrap() {
      let wrap = document.querySelector(".toast-wrap");
      if (!wrap) {
        wrap = document.createElement("div");
        wrap.className = "toast-wrap";
        document.body.appendChild(wrap);
      }
      return wrap;
    }

    const ICONS = {
      success: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      error: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      info: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6h.01M12 12v6"/></svg>'
    };

    window.Jari = {
      toast: function (message, type) {
        message = String(message).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B00}-\u{2BFF}]/gu, "").trim();
        type = type === "error" ? "error" : type === "info" ? "info" : "success";
        const el = document.createElement("div");
        el.className = "toast toast-" + type;
        el.innerHTML =
          '<span class="toast-icon">' + (ICONS[type] || ICONS.success) + "</span>" +
          '<span class="toast-msg">' + message + "</span>";
        toastWrap().appendChild(el);
        setTimeout(function () {
          el.classList.add("leaving");
          setTimeout(function () { el.remove(); }, 240);
        }, 3400);
      },

      /* Promise-based confirm dialog (replaces window.confirm) */
      confirm: function (title, text, confirmText) {
        return new Promise(function (resolve) {
          const overlay = document.createElement("div");
          overlay.className = "modal-overlay";
          overlay.innerHTML =
            '<div class="modal-card" role="dialog" aria-modal="true">' +
              '<h3 class="modal-title">' + title + "</h3>" +
              '<p class="modal-text">' + text + "</p>" +
              '<div class="modal-actions">' +
                '<button type="button" class="btn btn-ghost" data-act="cancel">Cancel</button>' +
                '<button type="button" class="btn btn-danger-solid" data-act="ok">' + (confirmText || "Confirm") + "</button>" +
              "</div>" +
            "</div>";

          function close(result) {
            overlay.remove();
            document.removeEventListener("keydown", onKey);
            resolve(result);
          }
          function onKey(e) { if (e.key === "Escape") close(false); }

          overlay.addEventListener("click", function (e) {
            if (e.target === overlay) close(false);
            const btn = e.target.closest("[data-act]");
            if (btn) close(btn.dataset.act === "ok");
          });
          document.addEventListener("keydown", onKey);
          document.body.appendChild(overlay);
          overlay.querySelector('[data-act="cancel"]').focus();
        });
      },

      /* Show a message once, on the next page load */
      flash: function (message) {
        localStorage.setItem("jsFlash", message);
      },

      /* Strip pictographs from legacy stored text (older builds wrote emoji) */
      clean: function (text) {
        return String(text).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2B00}-\u{2BFF}]/gu, "").trim();
      }
    };

    /* Replaying flash/notice messages after navigation */
    const flash = localStorage.getItem("jsFlash");
    if (flash) { localStorage.removeItem("jsFlash"); Jari.toast(flash, "success"); }
    const notice = sessionStorage.getItem("jsNotice");
    if (notice) { sessionStorage.removeItem("jsNotice"); Jari.toast(notice, "info"); }

    /* --------------------------------------------------------
        3. Shared assets (inline SVG)
       -------------------------------------------------------- */
    const BRAND_MARK =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/></svg>';

    /* --------------------------------------------------------
        4. Navbar — adapts to the visitor's session state
       -------------------------------------------------------- */
    const logged = !!sessionEmail;

    const links = logged
      ? '<a class="nav-link" href="dashboard.html" data-page="dashboard.html">Dashboard</a>' +
        '<a class="nav-link" href="my-items.html" data-page="my-items.html">My Items</a>' +
        '<a class="nav-link" href="messages.html" data-page="messages.html">Messages</a>' +
        '<a class="nav-link" href="about.html" data-page="about.html">About</a>' +
        '<span class="nav-divider"></span>' +
        '<a class="btn-nav-add" href="add-item.html">Post an Item</a>' +
        '<button type="button" class="nav-logout" id="nav-logout">Sign Out</button>'
      : '<a class="nav-link" href="about.html" data-page="about.html">About</a>' +
        '<a class="nav-link" href="login.html" data-page="login.html">Log in</a>' +
        '<a class="btn-nav-add" href="register.html">Create Account</a>';

    const navbar = document.createElement("header");
    navbar.className = "navbar";
    navbar.innerHTML =
      '<div class="navbar-inner">' +
        '<a class="nav-brand" href="' + (logged ? "dashboard.html" : "register.html") + '">' +
          '<span class="brand-mark">' + BRAND_MARK + "</span>JariShare" +
        "</a>" +
        '<nav class="nav-links" aria-label="Main navigation">' + links + "</nav>" +
      "</div>";
    document.body.prepend(navbar);

    /* Highlight the entry that matches the current page */
    navbar.querySelectorAll(".nav-link").forEach(function (a) {
      if (a.dataset.page === page) a.classList.add("active");
    });

    const logoutBtn = document.getElementById("nav-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        Jari.confirm("Sign out of JariShare?", "You will need to sign in again to manage your items.", "Sign Out")
          .then(function (ok) {
            if (!ok) return;
            localStorage.removeItem("jariCurrentUser");
            Jari.flash("You have been signed out.");
            window.location.href = "login.html";
          });
      });
    }

    /* --------------------------------------------------------
        5. Footer
       -------------------------------------------------------- */
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<div class="footer-inner">' +
        '<span class="footer-brand"><span class="brand-mark">' + BRAND_MARK + "</span>JariShare</span>" +
        '<span class="footer-copy">Neighborhood sharing made simple. &copy; 2026 JariShare.</span>' +
      "</div>";
    document.body.appendChild(footer);
  });
})();
