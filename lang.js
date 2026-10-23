/* ==========================================================
   JariShare — bilingual dictionary & language handling (EN/AR)
   Loaded in <head> so inline scripts can use Jari.t() at once.
   ========================================================== */
(function () {
  "use strict";

  var DICT = {
    en: {
      /* Navigation */
      "nav.dashboard": "Dashboard",
      "nav.myItems": "My Items",
      "nav.messages": "Messages",
      "nav.about": "About",
      "nav.postItem": "Post an Item",
      "nav.signOut": "Sign Out",
      "nav.login": "Log in",
      "nav.createAccount": "Create Account",
      "a11y.mainNav": "Main navigation",
      "a11y.theme": "Switch color theme",
      "a11y.lang": "Change language",
      "a11y.menu": "Open menu",

      /* Notices & dialogs */
      "notice.required": "Please sign in to open that page.",
      "notice.signedOut": "You have been signed out.",
      "confirm.signOutTitle": "Sign out of JariShare?",
      "confirm.signOutText": "You will need to sign in again to manage your items.",
      "confirm.signOut": "Sign Out",
      "confirm.deleteTitle": 'Delete "%s"?',
      "confirm.deleteText": "This listing will be removed permanently. Neighbors can no longer request it.",
      "confirm.delete": "Delete",
      "dialog.cancel": "Cancel",

      /* Toasts */
      "toast.welcomeBack": "Welcome back, %s.",
      "toast.nameShort": "Please enter your full name.",
      "toast.passShort": "Password needs at least 6 characters.",
      "toast.mismatch": "The two passwords don't match. Please check and try again.",
      "toast.emailTaken": "This email is already registered — try logging in instead.",
      "toast.loginError": "Incorrect email or password. Please try again.",
      "toast.nameError": "Please give the item a name.",
      "toast.priceError": "Please set a price per day (0 for free).",
      "toast.deleted": "Item deleted.",
      "toast.statusUpdated": "Status updated to %s.",
      "toast.photoToo": "That image is too large — please keep it under 3 MB.",

      /* Flashes */
      "flash.accountReady": "Your account is ready — welcome to JariShare.",
      "flash.published": "Your item is published and visible to neighbors.",
      "flash.changesSaved": "Changes saved.",

      /* Notifications */
      "notif.added": 'New listing "%s" is now visible to neighbors.',
      "notif.updated": 'Your listing "%s" was updated.',
      "notif.deleted": 'Your listing "%s" was deleted.',
      "notif.status": 'Status of "%s" changed to %s.',

      /* Dashboard */
      "dash.welcome": "Welcome back, %s",
      "dash.subtitle": "Here's what's happening with your listings and requests today.",
      "dash.statItems": "My Items",
      "dash.statActive": "Active Rentals",
      "dash.statPending": "Pending Requests",
      "dash.noteItemsZero": "No listings yet",
      "dash.noteItems": "%s listings total",
      "dash.noteActive": "Listed and available",
      "dash.notePending": "Waiting to be approved",
      "dash.activity": "Recent Activity",
      "dash.viewAll": "View all",
      "dash.activityEmpty": "No activity yet — post your first item to get things moving.",
      "dash.member": "JariShare member",

      /* Status words */
      "status.active": "Active",
      "status.pending": "Pending",
      "status.unavailable": "Unavailable",

      /* Categories */
      "cat.electronics": "Electronics",
      "cat.tools": "Tools",
      "cat.home": "Home & Kitchen",
      "cat.outdoor": "Outdoor",
      "cat.other": "Other",
      "cat.freeBorrow": "Free borrow",
      "items.perDay": "EGP / day",

      /* My Items page */
      "items.backDash": "Dashboard",
      "items.title": "My Items",
      "items.subtitle": "Everything you've listed for your neighbors — switch status, edit details or remove a listing at any time.",
      "items.tabAll": "All",
      "items.a11yStatus": "Item status",
      "items.a11yEdit": "Edit item",
      "items.a11yDelete": "Delete item",
      "items.emptyAllTitle": "No items listed yet",
      "items.emptyAllText": "Post your first item and it will appear here for neighbors to request.",
      "items.emptyFilterTitle": 'Nothing with a "%s" status',
      "items.emptyFilterText": "Try another filter, or post a new item.",

      /* Add Item page */
      "addItem.backMyItems": "My Items",
      "addItem.titleNew": "Post a new item",
      "addItem.titleEdit": "Edit item",
      "addItem.subtitleNew": "Add a clear photo and the essentials — neighbors decide faster when they can see the item.",
      "addItem.subtitleEdit": "Update anything you like — the item keeps its current status.",
      "addItem.photo": "Photo",
      "addItem.uploadTitle": "Upload a photo",
      "addItem.uploadHint": "PNG or JPG — click to browse, or drag an image here",
      "addItem.previewName": "Photo selected",
      "addItem.previewMeta": "Click the box above to replace it",
      "addItem.nameLabel": "Item name",
      "addItem.namePh": "e.g. Cordless Drill, DSLR Camera…",
      "addItem.category": "Category",
      "addItem.selectPh": "Select…",
      "addItem.sharing": "Sharing type",
      "share.rent": "Rent",
      "share.borrow": "Free borrow",
      "addItem.price": "Price per day",
      "addItem.priceHint": "Set 0 if you're offering it for free.",
      "addItem.priceHintZero": "Listed for free — neighbors can borrow it at no cost.",
      "addItem.currency": "EGP",
      "addItem.desc": "Description",
      "addItem.descPh": "Condition, accessories included, pickup spot, any usage rules…",
      "addItem.publish": "Publish Item",
      "addItem.save": "Save Changes",

      /* Messages page */
      "msgs.title": "Messages",
      "msgs.subtitle": "Rental conversations with renters, plus automatic alerts about your listings.",
      "msgs.tabConv": "Conversations",
      "msgs.tabNotif": "Notifications",
      "msgs.emptyConvTitle": "No conversations yet",
      "msgs.emptyConvText": "When someone requests one of your items, their messages will show up here.",
      "msgs.emptyNotifTitle": "No notifications yet",
      "msgs.emptyNotifText": "Listing a new item or changing a status will create an alert automatically.",
      "msgs.footnote": "Requests you receive will start a conversation here automatically.",

      /* Register page */
      "reg.bannerTitle": "Everything you need, already next door.",
      "reg.bannerText": "Rent tools, gear and household items from neighbors you trust — or earn by sharing the things you barely use.",
      "reg.point1": "Lend and borrow within your own neighborhood",
      "reg.point2": "Fair daily pricing, agreed upfront",
      "reg.point3": "Track every item, request and update in one place",
      "reg.foot": "Borrow what you need. Lend what you don't.",
      "auth.badge": "Neighborhood sharing platform",
      "auth.showPass": "Show password",
      "auth.hidePass": "Hide password",
      "reg.statShared": "items shared",
      "reg.statNeighbors": "active neighbors",
      "reg.statRating": "satisfaction score",
      "reg.strength": "Password strength",
      "reg.strengthWeak": "Weak",
      "reg.strengthMedium": "Fair",
      "reg.strengthStrong": "Strong",
      "reg.title": "Create your account",
      "reg.subtitle": "Join your neighborhood on JariShare. It takes less than a minute.",
      "reg.name": "Full name",
      "reg.namePh": "e.g. Ahmed Ali",
      "reg.email": "Email address",
      "reg.emailPh": "you@example.com",
      "reg.phone": "Phone number",
      "reg.phonePh": "01xxxxxxxxx",
      "reg.city": "City",
      "reg.cityPh": "Cairo",
      "reg.district": "District",
      "reg.districtPh": "Nasr City",
      "reg.pass": "Password",
      "reg.passPh": "At least 6 characters",
      "reg.confirm": "Confirm password",
      "reg.confirmPh": "Re-enter your password",
      "reg.btn": "Create Account",
      "reg.alt": "Already have an account?",
      "reg.altLink": "Log in",

      /* Login page */
      "log.bannerTitle": "Welcome back to your neighborhood.",
      "log.bannerText": "Sign in to manage your listings, follow rental requests and stay in touch with your neighbors.",
      "log.foot": "Your items, your neighbors, one platform.",
      "log.title": "Log in",
      "log.subtitle": "Enter your details to continue to your dashboard.",
      "log.passPh": "Your password",
      "log.btn": "Log In",
      "log.alt": "New to JariShare?",
      "log.altLink": "Create an account",

      /* About page */
      "about.kicker": "Our Story",
      "about.title": "Built for neighbors, powered by trust.",
      "about.lead": "JariShare is a community sharing platform that connects people living in the same area. Post the tools, gear and household items you rarely use — let neighbors rent them at a fair daily price or borrow them for free. Less waste, less spending, and a street that actually works together.",
      "about.v1t": "Share & Borrow",
      "about.v1d": "Give the items sitting in your storage a second life. Someone on your street probably needs exactly what you're not using.",
      "about.v2t": "Safe & Local",
      "about.v2d": "Every interaction happens between verified neighbors within the same city and district — real people, real addresses, real accountability.",
      "about.v3t": "Smarter Consumption",
      "about.v3d": "Why buy a drill you'll use twice a year? Sharing cuts household spending and keeps perfectly good items out of the bin.",
      "about.ctaTitle": "Your neighborhood is already sharing.",
      "about.ctaText": "Create a free account in under a minute and see what people around you are offering today.",

      /* Footer */
      "footer.tag": "Neighborhood sharing made simple."
    },

    ar: {
      /* Navigation */
      "nav.dashboard": "لوحة التحكم",
      "nav.myItems": "أغراضي",
      "nav.messages": "الرسائل",
      "nav.about": "من نحن",
      "nav.postItem": "أضف غرضاً",
      "nav.signOut": "تسجيل الخروج",
      "nav.login": "تسجيل الدخول",
      "nav.createAccount": "إنشاء حساب",
      "a11y.mainNav": "التنقل الرئيسي",
      "a11y.theme": "تبديل نمط الألوان",
      "a11y.lang": "تغيير اللغة",
      "a11y.menu": "فتح القائمة",

      /* Notices & dialogs */
      "notice.required": "سجّل الدخول أولاً لفتح هذه الصفحة.",
      "notice.signedOut": "تم تسجيل خروجك.",
      "confirm.signOutTitle": "تسجيل الخروج من JariShare؟",
      "confirm.signOutText": "ستحتاج إلى تسجيل الدخول مرة أخرى لإدارة أغراضك.",
      "confirm.signOut": "تسجيل الخروج",
      "confirm.deleteTitle": "حذف «%s»؟",
      "confirm.deleteText": "سيتم حذف هذا الغرض نهائياً، ولن يستطيع الجيران طلبَه بعد الآن.",
      "confirm.delete": "حذف",
      "dialog.cancel": "إلغاء",

      /* Toasts */
      "toast.welcomeBack": "أهلاً بعودتك، %s.",
      "toast.nameShort": "من فضلك اكتب اسمك بالكامل.",
      "toast.passShort": "كلمة المرور تحتاج 6 أحرف على الأقل.",
      "toast.mismatch": "كلمتا المرور غير متطابقتين. تحقق وحاول مرة أخرى.",
      "toast.emailTaken": "هذا البريد مسجل بالفعل — جرّب تسجيل الدخول بدلاً من ذلك.",
      "toast.loginError": "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى.",
      "toast.nameError": "من فضلك اكتب اسم الغرض.",
      "toast.priceError": "من فضلك حدد سعراً يومياً (0 للمجاني).",
      "toast.deleted": "تم حذف الغرض.",
      "toast.statusUpdated": "تم تحديث الحالة إلى %s.",
      "toast.photoToo": "الصورة كبيرة جداً — من فضلك اجعل حجمها أقل من 3 ميجابايت.",

      /* Flashes */
      "flash.accountReady": "تم إنشاء حسابك — أهلاً بك في JariShare.",
      "flash.published": "تم نشر غرضك وأصبح ظاهراً لجيرانك.",
      "flash.changesSaved": "تم حفظ التعديلات.",

      /* Notifications */
      "notif.added": "غرض جديد «%s» أصبح ظاهراً للجيران.",
      "notif.updated": "تم تحديث غرضك «%s».",
      "notif.deleted": "تم حذف غرضك «%s».",
      "notif.status": "تم تغيير حالة «%s» إلى %s.",

      /* Dashboard */
      "dash.welcome": "أهلاً بعودتك، %s",
      "dash.subtitle": "إليك ملخص أغراضك وطلباتك اليوم.",
      "dash.statItems": "أغراضي",
      "dash.statActive": "أغراض متاحة",
      "dash.statPending": "طلبات معلقة",
      "dash.noteItemsZero": "لا توجد أغراض بعد",
      "dash.noteItems": "الإجمالي: %s غرض",
      "dash.noteActive": "معروضة ومتاحة",
      "dash.notePending": "بانتظار الموافقة",
      "dash.activity": "النشاط الأخير",
      "dash.viewAll": "عرض الكل",
      "dash.activityEmpty": "لا يوجد نشاط بعد — ابدأ بإضافة أول غرض لك.",
      "dash.member": "عضو JariShare",

      /* Status words */
      "status.active": "متاح",
      "status.pending": "قيد المراجعة",
      "status.unavailable": "غير متاح",

      /* Categories */
      "cat.electronics": "إلكترونيات",
      "cat.tools": "أدوات",
      "cat.home": "المنزل والمطبخ",
      "cat.outdoor": "الاستخدام الخارجي",
      "cat.other": "أخرى",
      "cat.freeBorrow": "إعارة مجانية",
      "items.perDay": "ج.م / يوم",

      /* My Items page */
      "items.backDash": "لوحة التحكم",
      "items.title": "أغراضي",
      "items.subtitle": "كل ما نشرته لجيرانك — بدّل الحالة أو عدّل التفاصيل أو احذف أي غرض في أي وقت.",
      "items.tabAll": "الكل",
      "items.a11yStatus": "حالة الغرض",
      "items.a11yEdit": "تعديل الغرض",
      "items.a11yDelete": "حذف الغرض",
      "items.emptyAllTitle": "لا توجد أغراض بعد",
      "items.emptyAllText": "انشر أول غرض لك وسيظهر هنا ليطلبه جيرانك.",
      "items.emptyFilterTitle": "لا يوجد شيء بحالة «%s»",
      "items.emptyFilterText": "جرّب فلتراً آخر أو أضف غرضاً جديداً.",

      /* Add Item page */
      "addItem.backMyItems": "أغراضي",
      "addItem.titleNew": "أضف غرضاً جديداً",
      "addItem.titleEdit": "تعديل الغرض",
      "addItem.subtitleNew": "أضف صورة واضحة والمعلومات الأساسية — الجيران يقررون أسرع عندما يرون الغرض.",
      "addItem.subtitleEdit": "عدّل ما تشاء — سيحتفظ الغرض بحالته الحالية.",
      "addItem.photo": "الصورة",
      "addItem.uploadTitle": "ارفع صورة",
      "addItem.uploadHint": "PNG أو JPG — اضغط للاختيار، أو اسحب الصورة هنا",
      "addItem.previewName": "تم اختيار الصورة",
      "addItem.previewMeta": "اضغط على المربع أعلاه لتغييرها",
      "addItem.nameLabel": "اسم الغرض",
      "addItem.namePh": "مثال: دريل لاسلكي، كاميرا…",
      "addItem.category": "الفئة",
      "addItem.selectPh": "اختر…",
      "addItem.sharing": "نوع المشاركة",
      "share.rent": "إيجار",
      "share.borrow": "إعارة مجانية",
      "addItem.price": "السعر اليومي",
      "addItem.priceHint": "اكتب 0 إذا كنت تقدمه مجاناً.",
      "addItem.priceHintZero": "معروض مجاناً — يستطيع الجيران استعارته بلا مقابل.",
      "addItem.currency": "ج.م",
      "addItem.desc": "الوصف",
      "addItem.descPh": "الحالة، الملحقات المرفقة، مكان الاستلام، أي قواعد استخدام…",
      "addItem.publish": "نشر الغرض",
      "addItem.save": "حفظ التعديلات",

      /* Messages page */
      "msgs.title": "الرسائل",
      "msgs.subtitle": "محادثات الإيجار مع المستأجرين، إضافة إلى تنبيهات تلقائية عن أغراضك.",
      "msgs.tabConv": "المحادثات",
      "msgs.tabNotif": "الإشعارات",
      "msgs.emptyConvTitle": "لا توجد محادثات بعد",
      "msgs.emptyConvText": "عندما يطلب أحدهم أحد أغراضك ستظهر رسائله هنا.",
      "msgs.emptyNotifTitle": "لا توجد إشعارات بعد",
      "msgs.emptyNotifText": "إضافة غرض جديد أو تغيير الحالة ستنشئ تنبيهاً تلقائياً.",
      "msgs.footnote": "الطلبات التي تصلك ستبدأ محادثة هنا تلقائياً.",

      /* Register page */
      "reg.bannerTitle": "كل ما تحتاجه موجود عند جيرانك.",
      "reg.bannerText": "استأجر الأدوات والمعدات وأغراض المنزل من جيران موثوقين — أو اربح من مشاركة ما نادراً ما تستخدمه.",
      "reg.point1": "أعِر واستعر داخل حيّك نفسه",
      "reg.point2": "أسعار يومية عادلة متفق عليها مسبقاً",
      "reg.point3": "تابع كل غرض وطلب وتحديث في مكان واحد",
      "reg.foot": "استعر ما تحتاجه. أعِر ما لا تحتاجه.",
      "auth.badge": "منصة مشاركة الحي",
      "auth.showPass": "إظهار كلمة المرور",
      "auth.hidePass": "إخفاء كلمة المرور",
      "reg.statShared": "غرض تمت مشاركته",
      "reg.statNeighbors": "جار نشط",
      "reg.statRating": "تقييم الرضا",
      "reg.strength": "قوة كلمة المرور",
      "reg.strengthWeak": "ضعيفة",
      "reg.strengthMedium": "متوسطة",
      "reg.strengthStrong": "قوية",
      "reg.title": "أنشئ حسابك",
      "reg.subtitle": "انضم إلى حيّك على JariShare — يستغرق أقل من دقيقة.",
      "reg.name": "الاسم بالكامل",
      "reg.namePh": "مثال: أحمد علي",
      "reg.email": "البريد الإلكتروني",
      "reg.emailPh": "you@example.com",
      "reg.phone": "رقم الهاتف",
      "reg.phonePh": "01xxxxxxxxx",
      "reg.city": "المدينة",
      "reg.cityPh": "القاهرة",
      "reg.district": "الحي",
      "reg.districtPh": "مدينة نصر",
      "reg.pass": "كلمة المرور",
      "reg.passPh": "6 أحرف على الأقل",
      "reg.confirm": "تأكيد كلمة المرور",
      "reg.confirmPh": "أعد إدخال كلمة المرور",
      "reg.btn": "إنشاء حساب",
      "reg.alt": "لديك حساب بالفعل؟",
      "reg.altLink": "سجّل الدخول",

      /* Login page */
      "log.bannerTitle": "أهلاً بعودتك إلى حيّك.",
      "log.bannerText": "سجّل دخولك لإدارة أغراضك ومتابعة طلبات الإيجار والبقاء على تواصل مع جيرانك.",
      "log.foot": "أغراضك، جيرانك، منصة واحدة.",
      "log.title": "تسجيل الدخول",
      "log.subtitle": "أدخل بياناتك للمتابعة إلى لوحة التحكم.",
      "log.passPh": "كلمة المرور",
      "log.btn": "دخول",
      "log.alt": "جديد على JariShare؟",
      "log.altLink": "أنشئ حساباً",

      /* About page */
      "about.kicker": "قصتنا",
      "about.title": "منصة للجيران، يقودها الثقة.",
      "about.lead": "JariShare منصة مشاركة مجتمعية تربط سكان الحي الواحد. انشر الأدوات والمعدات وأغراض المنزل التي نادراً ما تستخدمها — ليستأجرها جيرانك بسعر يومي عادل أو تستعيرها مجاناً. هدر أقل، تكلفة أقل، وحارة تتعاون فعلاً.",
      "about.v1t": "شارك واستعر",
      "about.v1d": "أعِد للأغراض المخزونة عندك حياة ثانية. غالباً ما يحتاج أحد جيرانك بالضبط ما لا تستخدمه.",
      "about.v2t": "آمن ومحلي",
      "about.v2d": "كل تعامل يحدث بين جيران موثوقين في نفس المدينة والحي — ناس حقيقيين، عناوين حقيقية، ومسؤولية واضحة.",
      "about.v3t": "استهلاك أذكى",
      "about.v3d": "لماذا تشتري دريلاً ستستخدمه مرتين في السنة؟ المشاركة تقلل مصروف البيت وتحافظ على الأغراض الصالحة من الضياع.",
      "about.ctaTitle": "حيّك يتشارك بالفعل.",
      "about.ctaText": "أنشئ حساباً مجانياً في أقل من دقيقة وشاهد ما يعرضه من حولك اليوم.",

      /* Footer */
      "footer.tag": "المشاركة بين الجيران، ببساطة."
    }
  };

  function detect() {
    try {
      var saved = localStorage.getItem("jariLang");
      if (saved && DICT[saved]) return saved;
    } catch (e) {}
    var browser = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    return String(browser).toLowerCase().indexOf("ar") === 0 ? "ar" : "en";
  }

  var lang = detect();

  function t(key, vars) {
    var s = (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;
    if (vars) {
      /* Each variable fills the next %s placeholder in order,
         so strings with several %s slots take several params */
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) {
          s = s.replace("%s", String(vars[k]));
        }
      }
    }
    return s;
  }

  function applyStatic() {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    var i, el, nodes;
    nodes = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < nodes.length; i++) nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));

    nodes = document.querySelectorAll("[data-i18n-ph]");
    for (i = 0; i < nodes.length; i++) nodes[i].setAttribute("placeholder", t(nodes[i].getAttribute("data-i18n-ph")));

    nodes = document.querySelectorAll("[data-i18n-aria]");
    for (i = 0; i < nodes.length; i++) nodes[i].setAttribute("aria-label", t(nodes[i].getAttribute("data-i18n-aria")));
  }

  window.Jari = window.Jari || {};
  Jari.t = t;
  Jari.lang = function () { return lang; };
  Jari.setLang = function (next) {
    if (!DICT[next]) return;
    lang = next;
    try { localStorage.setItem("jariLang", next); } catch (e) {}
    applyStatic();
    document.dispatchEvent(new CustomEvent("jari:langchange"));
  };

  /* Apply before first paint (lang.js is loaded in <head>) */
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  window.addEventListener("DOMContentLoaded", applyStatic);
})();
