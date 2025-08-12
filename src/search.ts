import { debounce } from "./helpers";
import { type AppState } from "./state";

export function initSearch(state: AppState) {
  const searchInput = document.querySelector<HTMLInputElement>(
    "#reader-search-input",
  );
  const clearButton = document.getElementById("reader-search-clear");
  if (!searchInput || !clearButton) return;

  const highlightClass = "json-reader-search-highlight";

  const runSearch = (query: string) => {
    document
      .querySelectorAll<HTMLElement>(`.${highlightClass}`)
      .forEach((el) => el.classList.remove(highlightClass));

    if (!query) {
      clearButton.setAttribute("disabled", "");
      return;
    }

    clearButton.removeAttribute("disabled");
    const lowerQuery = query.toLowerCase();

    document
      .querySelectorAll<HTMLElement>(
        ".json-reader-tree-parent, .json-reader-tree-property",
      )
      .forEach((el) => {
        if (el.textContent?.toLowerCase().includes(lowerQuery)) {
          el.classList.add(highlightClass);
          let parent: HTMLElement | null = el.parentElement;
          while (parent) {
            if (parent.tagName === "DETAILS") {
              (parent as HTMLDetailsElement).open = true;
            }
            parent = parent.parentElement;
          }
        }
      });
  };

  const debouncedSearch = debounce((value: string) => runSearch(value), 200);

  searchInput.addEventListener("input", () => {
    debouncedSearch(searchInput.value);
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    runSearch("");
    searchInput.focus();
  });

  state.subscribe("jsonText", "re-run search when data changes", () => {
    runSearch(searchInput.value);
  });
}
