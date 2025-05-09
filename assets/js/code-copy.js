document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-button");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const codeBlock = button
        .closest(".code-block-wrapper")
        .querySelector("pre code");
      const code = codeBlock.textContent;

      try {
        await navigator.clipboard.writeText(code);

        // Visual feedback
        const icon = button.querySelector("i");
        icon.className = "fa fa-check";

        setTimeout(() => {
          icon.className = "fa fa-copy";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    });
  });
});
