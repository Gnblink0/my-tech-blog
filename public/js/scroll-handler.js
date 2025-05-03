const AUTO_HIDE_TIMEOUT = 10000; // 3 seconds for auto-hide
let lastScrollPosition = 0;
let backButton = null;
let autoHideTimer = null;

// create the back to top button
function createBackButton() {
  if (!backButton) {
    backButton = document.createElement("button");
    backButton.className = "back-to-position";
    backButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 14L4 9l5-5"/>
        <path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
      </svg>
    `;
    backButton.style.display = "none";
    document.body.appendChild(backButton);

    backButton.addEventListener("click", () => {
      window.scrollTo({
        top: lastScrollPosition,
        behavior: "smooth",
      });
      hideBackButton();
    });
  }
}

// save the scroll position
function saveScrollPosition(event) {
  lastScrollPosition = window.scrollY;
  setTimeout(() => {
    showBackButton();
  }, 100); // give the scroll a little time to complete
}

// show the back to top button
function showBackButton() {
  if (backButton) {
    // Clear any existing timer
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
    }

    backButton.style.display = "flex";
    setTimeout(() => {
      backButton.classList.add("visible");
    }, 10);

    // Set new auto-hide timer
    autoHideTimer = setTimeout(() => {
      hideBackButton();
    }, AUTO_HIDE_TIMEOUT);
  }
}

// hide the back to top button
function hideBackButton() {
  if (backButton) {
    // Clear auto-hide timer
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      autoHideTimer = null;
    }

    backButton.classList.remove("visible");
    setTimeout(() => {
      backButton.style.display = "none";
    }, 300);
  }
}

// initialize the back to top button
document.addEventListener("DOMContentLoaded", createBackButton);
