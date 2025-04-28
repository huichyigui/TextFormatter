/*
Logic for Text Formatter
*/
const inputText = document.getElementById("inputText");
const formatBtn = document.getElementById("formatBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");
const filterType = document.getElementById("filterType");
const itemsPerLine = document.getElementById("itemsPerLine");
const countLabel = document.getElementById("countLabel");
const outputContainer = document.getElementById("outputContainer");

let originalItems = [];
let isAlreadyFormatted = false;

window.onload = function () {
  inputText.focus();
};

inputText.addEventListener("input", () => {
  const hasText = inputText.value.trim() !== "";
  formatBtn.disabled = !hasText;

  if (!hasText) {
    outputContainer.style.display = "none";
    copyBtn.style.display = "none";
  }
});

itemsPerLine.addEventListener("keydown", (e) => {
  const invalidKeys = ["-", "e", "+", ".", "E"];
  if (invalidKeys.includes(e.key)) {
    e.preventDefault();
  }
  if (e.key === "0" && itemsPerLine.value.length === 0) {
    e.preventDefault();
  }
});

function displayFormattedOutput(items) {
  let perLine = parseInt(itemsPerLine.value) || 1;
  let result = "";
  for (let i = 0; i < items.length; i++) {
    result += items[i];
    if ((i + 1) % perLine === 0 && i !== items.length - 1) {
      result += ",<br>";
    } else if (i !== items.length - 1) {
      result += ", ";
    }
  }
  output.innerHTML = result.trim();
}

formatBtn.addEventListener("click", () => {
  let rawText = inputText.value.trim();

  isAlreadyFormatted = /^('.*?'(,\s*'?)*?)+$/.test(rawText);

  if (isAlreadyFormatted) {
    originalItems = rawText.match(/'[^']*'/g) || [];
  } else {
    let lines = rawText.split(/\s+|\n+/).filter((item) => item !== "");

    let filteredLines = [];

    switch (filterType.value) {
      case "P1":
        filteredLines = lines.filter((line) => /^[bB]/.test(line));
        break;
      case "J1":
        filteredLines = lines.filter((line) => /^[jJ]/.test(line));
        break;
      case "F1":
        filteredLines = lines.filter((line) => /^\d+$/.test(line));
        break;
      case "AllBrands":
        filteredLines = lines.filter(
          (line) =>
            /^\d+$/.test(line) || /^[bB]/.test(line) || /^[jJ]/.test(line)
        );
        break;
      case "All":
        filteredLines = lines;
        break;
    }

    filteredLines = filteredLines.map((item) => {
      if (/^[bB]/.test(item)) {
        return "B" + item.slice(1);
      } else if (/^[jJ]/.test(item)) {
        return "J" + item.slice(1);
      } else {
        return item;
      }
    });

    originalItems = filteredLines.map((item) => `'${item}'`);
  }

  countLabel.textContent = `Total: ${originalItems.length}`;

  if (originalItems.length > 0) {
    displayFormattedOutput(originalItems);
    outputContainer.style.display = "block";
    copyBtn.style.display = "block";
    copyBtn.disabled = false;
  } else {
    outputContainer.style.display = "none";
    copyBtn.style.display = "none";
    copyBtn.disabled = true;
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(output.textContent)
    .then(() => {
      alert("Formatted text copied to clipboard!");
    })
    .catch((err) => {
      alert("Failed to copy: " + err);
    });
});

resetBtn.addEventListener("click", () => {
  inputText.value = "";
  inputText.focus();
  output.textContent = "";
  countLabel.textContent = "Total: 0";
  formatBtn.disabled = true;
  outputContainer.style.display = "none";
  copyBtn.style.display = "none";
  originalItems = [];
  filterType.value = "All";
  itemsPerLine.value = 10;
});
