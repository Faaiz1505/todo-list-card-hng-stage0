const timeEl = document.querySelector(
  '[data-testid="test-todo-time-remaining"]',
);
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]',
);
const statusBadge = document.querySelector('[data-testid="test-todo-status"]');
const statusControl = document.querySelector(
  '[data-testid="test-todo-status-control"]',
);
const titleEl = document.querySelector('[data-testid="test-todo-title"]');
const card = document.querySelector('[data-testid="test-todo-card"]');
const overdueEl = document.querySelector(
  '[data-testid="test-todo-overdue-indicator"]',
);
const expandBtn = document.querySelector(
  '[data-testid="test-todo-expand-toggle"]',
);
const collapsible = document.querySelector(
  '[data-testid="test-todo-collapsible-section"]',
);
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector(
  '[data-testid="test-todo-delete-button"]',
);
const btnContainer = document.querySelector(".btn");
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector(
  '[data-testid="test-todo-cancel-button"]',
);
const titleInput = document.querySelector(
  '[data-testid="test-todo-edit-title-input"]',
);
const descInput = document.querySelector(
  '[data-testid="test-todo-edit-description-input"]',
);
const prioritySelect = document.querySelector(
  '[data-testid="test-todo-edit-priority-select"]',
);
const dueDateInput = document.querySelector(
  '[data-testid="test-todo-edit-due-date-input"]',
);
const descEl = document.querySelector('[data-testid="test-todo-description"]');
const priorityBadge = document.querySelector(
  '[data-testid="test-todo-priority"]',
);
const priorityIndicator = document.querySelector(
  '[data-testid="test-todo-priority-indicator"]',
);

const dueDateEl = document.querySelector('[data-testid="test-todo-due-date"]');

const state = {
  status: "Pending",
  priority: "High",
  dueDate: new Date("2026-04-17T23:59:00"),
};

function syncStatus(status) {
  state.status = status;
  checkbox.checked = status === "Done";
  statusControl.value = status;
  statusBadge.textContent = status;
  titleEl.classList.toggle("done", status === "Done");
  card.classList.toggle("completed", status === "Done");
}

checkbox.addEventListener("change", () => {
  syncStatus(checkbox.checked ? "Done" : "Pending");
});

statusControl.addEventListener("change", (e) => {
  syncStatus(e.target.value);
});

function updateTime() {
  if (state.status === "Done") {
    timeEl.textContent = "Completed";
    overdueEl.classList.add("hidden");
    return;
  }

  const diff = state.dueDate - new Date();
  if (diff < 0) {
    overdueEl.classList.remove("hidden");
    timeEl.textContent = "Overdue";
    return;
  }

  overdueEl.classList.add("hidden");
  const mins = Math.round(diff / 60000);
  if (mins < 60) timeEl.textContent = `Due in ${mins} minutes`;
  else if (mins < 1440)
    timeEl.textContent = `Due in ${Math.round(mins / 60)} hours`;
  else timeEl.textContent = `Due in ${Math.round(mins / 1440)} days`;
}

function updateDueDate() {
  dueDateEl.textContent = state.dueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

updateDueDate();
updateTime();
setInterval(updateTime, 60000);

expandBtn.addEventListener("click", () => {
  const isExpanded = expandBtn.getAttribute("aria-expanded") === "true";
  expandBtn.setAttribute("aria-expanded", !isExpanded);
  if (isExpanded) {
    expandBtn.textContent = "Show more";
    collapsible.classList.remove("expanded");
  } else {
    expandBtn.textContent = "Show less";
    collapsible.classList.add("expanded");
  }
});

function populateEditForm() {
  titleInput.value = titleEl.textContent;
  descInput.value = descEl.textContent;
  prioritySelect.value = state.priority;
  dueDateInput.value = state.dueDate.toISOString().slice(0, 16);
}

function showEditMode() {
  populateEditForm();
  // Smooth show
  editForm.style.display = "flex";
  editForm.classList.remove("hidden");
  setTimeout(() => {
    editForm.style.opacity = "1";
    editForm.style.transform = "translateY(0)";
  }, 10);
  btnContainer.style.display = "none";
  // Hide actions label too for cleaner edit mode
  document.querySelector(".actions label").style.display = "none";
}

function hideEditMode() {
  // Force hide with animation
  editForm.style.opacity = "0";
  editForm.style.transform = "translateY(-10px)";
  setTimeout(() => {
    editForm.classList.add("hidden");
    editForm.style.display = "none";
    editForm.style.opacity = "";
    editForm.style.transform = "";
  }, 300); // Match transition duration
  btnContainer.style.display = "";
  document.querySelector(".actions label").style.display = "";
}

editBtn.addEventListener("click", showEditMode);

cancelBtn.addEventListener("click", hideEditMode);

saveBtn.addEventListener("click", () => {
  // Update title
  titleEl.textContent = titleInput.value;

  // Update description
  descEl.textContent = descInput.value;

  // Update priority
  state.priority = prioritySelect.value;
  priorityBadge.textContent = prioritySelect.value;
  priorityBadge.className = `badge priority`;
  priorityIndicator.className = `priority-indicator ${prioritySelect.value.toLowerCase()}`;

  // Update due date
  state.dueDate = new Date(`${dueDateInput.value}:00`);
  if (isNaN(state.dueDate.getTime())) {
    state.dueDate = new Date("2026-04-17T23:59:00Z");
  }

  updateDueDate();
  updateTime();

  hideEditMode();
});
