document.addEventListener("DOMContentLoaded", function () {
  const availableNamesObjects = [
    {
      name: "emma jones",
      image:
        "https://source.unsplash.com/i2hoD-C2RUA",
    },
    {
      name: "jim fanges",
      image:
        "https://source.unsplash.com/_SjqhLPYg2w",
    },
    {
      name: "john doe",
      image:
        "https://source.unsplash.com/d2MSDujJl2g",
    },
    {
      name: "jane doe",
      image:
        "https://source.unsplash.com/bqe0J0b26RQ",
    },
    {
      name: "ben dover",
      image:
        "https://source.unsplash.com/X1fKWQM-GXY",
    },
    {
      name: "hugh janus",
      image:
        "https://source.unsplash.com/kMJp7620W6U",
    },
  ];
  const inputEl = document.getElementById("autocomplete");
  const suggestionsEl = document.getElementById("autocomplete-suggestions");
  const bubblesEl = document.getElementById("bubbles");

  function getCurrentWord(inputValue, cursorPosition) {
    const start = inputValue.lastIndexOf(",", cursorPosition - 1) + 1;
    const end = inputValue.indexOf(",", cursorPosition);

    if (start < 0) return "";
    if (end < 0) return inputValue.substring(start).trim();
    return inputValue.substring(start, end).trim();
  }

  function createBubble(name, image) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerText = "";

    const icon = document.createElement("div");
    icon.classList = "bubble-icon";
    icon.style.backgroundImage = "url(" + image + ")";
    bubble.appendChild(icon);

    const bubbleName = document.createElement("span");
    bubbleName.classList = "bubble-name";
    bubbleName.innerText = name;
    bubble.appendChild(bubbleName);

    // Delete icon (optional)
    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = " ×"; // Using a multiplication sign as the "delete" icon
    deleteIcon.style.marginLeft = "5px";
    deleteIcon.style.cursor = "pointer";

    bubble.appendChild(deleteIcon);

    deleteIcon.addEventListener("click", function () {
      bubblesEl.removeChild(bubble);
    });

    bubblesEl.appendChild(bubble);
  }

  inputEl.addEventListener("input", function (e) {
    const cursorPosition = e.target.selectionStart;
    const currentWordRaw = getCurrentWord(e.target.value, cursorPosition);
    const currentWord = currentWordRaw.toLowerCase();

    if (!currentWord) {
      suggestionsEl.innerHTML = "";
      suggestionsEl.classList.remove("active");
      return;
    } else {
      suggestionsEl.classList.add("active");
    }

    const filteredNamesObjects = availableNamesObjects.filter((obj) =>
      obj.name.includes(currentWord)
    );

    suggestionsEl.innerHTML = "";
    for (let obj of filteredNamesObjects) {
      let suggestionEl = document.createElement("div");
      suggestionEl.className = "autocomplete-suggestion";
      suggestionEl.innerText = obj.name;
      suggestionsEl.appendChild(suggestionEl);

      suggestionEl.addEventListener("click", function () {
        createBubble(obj.name, obj.image);
        inputEl.value = ""; // Clear the input field after selection
        suggestionsEl.innerHTML = "";
        suggestionsEl.classList.remove("active");
        
      });
    }
  });

  document.body.addEventListener("click", function (e) {
    if (
      e.target !== inputEl &&
      e.target !== suggestionsEl &&
      !e.target.classList.contains("bubble")
    ) {
      suggestionsEl.innerHTML = "";
      suggestionsEl.classList.remove("active");
    }
  });
});
