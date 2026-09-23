// ---------- Menu data & rendering ----------
  const MENU = [
    { name: "Teh Tarik (Panas / Dingin)", price: 7000, cat: "minuman" },
    { name: "Kopi Susu (Panas / Dingin)", price: 7000, cat: "minuman" },
    { name: "Pizza Oriental", price: 13000, cat: "berat" },
    { name: "Pizza Meet", price: 13000, cat: "berat" },
    { name: "Mie Aceh (Rebus / Goreng / Pedas)", price: 15000, cat: "berat" },
    { name: "Kwetiaw Goreng", price: 10000, cat: "berat" },
    { name: "Roti Bakar Cokelat Keju", price: 5000, cat: "roti" },
    { name: "Roti Bakar Kacang Cokelat", price: 5000, cat: "roti" },
  ];
  const CAT_LABEL = { minuman: "Minuman", berat: "Makanan Berat", roti: "Roti Bakar" };
  const WA_NUMBER = "6281315971723";
  const rupiah = n => "Rp" + n.toLocaleString("id-ID");

  const grid = document.getElementById("menuGrid");

  function renderMenu(filter) {
    grid.innerHTML = "";
    MENU.filter(item => filter === "all" || item.cat === filter).forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-card";
      const waText = encodeURIComponent(`Halo, saya mau pesan ${item.name}`);
      card.innerHTML = `
        <div class="menu-card-top">
          <div>
            <span class="cat">${CAT_LABEL[item.cat]}</span>
            <h4>${item.name}</h4>
          </div>
          <span class="price-tag">${rupiah(item.price)}</span>
        </div>
        <a class="menu-card-order" href="https://wa.me/${WA_NUMBER}?text=${waText}" target="_blank" rel="noopener">Pesan item ini →</a>
      `;
      grid.appendChild(card);
    });
  }
  renderMenu("all");

  document.getElementById("menuTabs").addEventListener("click", e => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.cat);
  });

  // ---------- Mobile nav ----------
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  // ---------- Popup promo ----------
  const overlay = document.getElementById("promoOverlay");
  const popupClose = document.getElementById("popupClose");

  function openPopup() {
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
  }
  function closePopup() {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    try { sessionStorage.setItem("kris_promo_shown", "1"); } catch (e) {}
  }
  popupClose.addEventListener("click", closePopup);
  overlay.addEventListener("click", e => { if (e.target === overlay) closePopup(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePopup(); });

  window.addEventListener("load", () => {
    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem("kris_promo_shown") === "1"; } catch (e) {}
    if (!alreadyShown) setTimeout(openPopup, 900);
  });

  // ---------- Footer year ----------
  document.getElementById("year").textContent = new Date().getFullYear();
