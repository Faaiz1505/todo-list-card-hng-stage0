const timeEl = document.querySelector(
  '[data-testid="test-todo-time-remaining"]',
);
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]',
);
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const titleEl = document.querySelector('[data-testid="test-todo-title"]');
const descEl = document.querySelector('[data-testid="test-todo-description"]');
const status = document.querySelector('[data-testid="test-todo-status"]');
const card = document.querySelector('[data-testid="test-todo-card"]');

const dueDate = new Date("2026-04-16T18:00:00Z");

function updateTimeRemaining() {
  const now = new Date();
  const diffMs = dueDate - now;

  if (diffMs <= 0) {
    timeEl.textContent = "Due now!";
    return;
  }

  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 60) {
    timeEl.textContent = `Due in ${diffMin} minutes`;
  } else if (diffMin < 1440) {
    timeEl.textContent = `Due in ${Math.round(diffMin / 60)} hours`;
  } else if (diffMin < 2880) {
    timeEl.textContent = "Due tomorrow";
  } else {
    timeEl.textContent = `Due in ${Math.round(diffMin / 1440)} days`;
  }
}

updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    titleEl.classList.add("done");
    status.textContent = "Done";
    status.classList.add("done");
    card.classList.add("completed");
  } else {
    titleEl.classList.remove("done");
    status.textContent = "Pending";
    status.classList.remove("done");
    card.classList.remove("completed");
  }
});

editBtn.addEventListener("click", () => {
  const newTitle = prompt("Edit task title:", titleEl.textContent.trim());

  if (newTitle !== null && newTitle.trim() !== "") {
    titleEl.textContent = newTitle.trim();
  }

  const newDescription = prompt(
    "Edit task description:",
    descEl.textContent.trim(),
  );

  if (newDescription !== null && newDescription.trim() !== "") {
    descEl.textContent = newDescription.trim();
  }
});
