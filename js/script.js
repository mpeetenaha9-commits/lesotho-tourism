/* ============================================================
   LESOTHO TOURISM - JavaScript
   Contains: Form Validation + Image Gallery (lightbox)
   ============================================================ */

/* ------------------------------------------------------------
   PART 1: IMAGE GALLERY (only runs on gallery.html)
   ------------------------------------------------------------ */
const galleryImages = [
  { src: "images/maletsunyane.jpg", title: "Maletsunyane Falls" },
  { src: "images/sani.jpg",         title: "Sani Pass" },        // Fixed extension to .jpg
  { src: "images/village.jpg",      title: "Basotho Village" },  // Fixed extension to .jpg
  { src: "images/maseru.jpg",       title: "Maseru City" },
  { src: "images/katse.jpg",        title: "Katse Dam" },
  { src: "images/pony.jfif",        title: "Basotho Pony" }
];

let currentIndex = 0;

/* Show a specific image in the modal */
function showImage(index) {
  currentIndex = index;
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalEl = document.getElementById("imageModal");

  if (!modalImage || !modalEl) return; // skip if not on gallery page

  modalImage.src = galleryImages[index].src;
  modalImage.alt = galleryImages[index].title;
  modalTitle.textContent = galleryImages[index].title;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

/* Previous button */
function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById("modalImage").src = galleryImages[currentIndex].src;
  document.getElementById("modalImage").alt = galleryImages[currentIndex].title; // Added for accessibility
  document.getElementById("modalTitle").textContent = galleryImages[currentIndex].title;
}

/* Next button */
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  document.getElementById("modalImage").src = galleryImages[currentIndex].src;
  document.getElementById("modalImage").alt = galleryImages[currentIndex].title; // Added for accessibility
  document.getElementById("modalTitle").textContent = galleryImages[currentIndex].title;
}


/* ------------------------------------------------------------
   PART 2: FORM VALIDATION (only runs on contact.html)
   ------------------------------------------------------------ */
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop normal submit
    let isValid = true;

    // --- Clear old error messages ---
    clearErrors();

    // --- Get values ---
    const fullName = document.getElementById("fullName").value.trim();
    const email    = document.getElementById("email").value.trim();
    const phone    = document.getElementById("phone").value.trim();
    const gender   = document.querySelector('input[name="gender"]:checked');
    const dest     = document.getElementById("destination").value;
    const date     = document.getElementById("travelDate").value;
    const password = document.getElementById("password").value;
    const confirm  = document.getElementById("confirmPassword").value;

    // --- Full name ---
    if (fullName.length < 3) {
      showError("nameError", "Please enter your full name (at least 3 letters).");
      isValid = false;
    }

    // --- Email (simple pattern) ---
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    // --- Phone (digits, +, spaces, at least 8 digits) ---
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      showError("phoneError", "Please enter a valid phone number (at least 8 digits).");
      isValid = false;
    }

    // --- Gender ---
    if (!gender) {
      showError("genderError", "Please choose your gender.");
      isValid = false;
    }

    // --- Destination ---
    if (dest === "") {
      showError("destinationError", "Please choose a destination.");
      isValid = false;
    }

    // --- Travel date ---
    if (date === "") {
      showError("dateError", "Please choose your travel date.");
      isValid = false;
    }

    // --- Password ---
    if (password.length < 6) {
      showError("passwordError", "Password must be at least 6 characters.");
      isValid = false;
    }

    // --- Confirm password ---
    if (confirm !== password) {
      showError("confirmError", "Passwords do not match.");
      isValid = false;
    }

    // --- Success ---
    if (isValid) {
      document.getElementById("successMessage").classList.remove("d-none");
      bookingForm.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/* Show error text under a field */
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

/* Clear all error messages */
function clearErrors() {
  const errorIds = [
    "nameError", "emailError", "phoneError", "genderError",
    "destinationError", "dateError", "passwordError", "confirmError"
  ];
  errorIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
  const success = document.getElementById("successMessage");
  if (success) success.classList.add("d-none");
}
