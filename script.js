const menuItems = [
  {
    id: 1,
    name: "Cappuccino",
    description: "Rich espresso with steamed milk and creamy foam.",
    price: 120,
    icon: "☕"
  },
  {
    id: 2,
    name: "Cafe Latte",
    description: "Smooth espresso blended with warm milk.",
    price: 140,
    icon: "🍵"
  },
  {
    id: 3,
    name: "Cold Coffee",
    description: "Chilled coffee served with creamy ice cream.",
    price: 160,
    icon: "🧋"
  },
  {
    id: 4,
    name: "Chocolate Cake",
    description: "Soft and delicious chocolate cake.",
    price: 180,
    icon: "🍰"
  },
  {
    id: 5,
    name: "Veg Sandwich",
    description: "Fresh vegetables with cheese and herbs.",
    price: 130,
    icon: "🥪"
  },
  {
    id: 6,
    name: "Cheese Pizza",
    description: "Crispy pizza with melted cheese.",
    price: 220,
    icon: "🍕"
  }
];

let nextItemId = Math.max(...menuItems.map(item => item.id)) + 1;

const menuList = document.getElementById("menuList");
const menuForm = document.getElementById("menuForm");
const formTitle = document.getElementById("formTitle");
const itemIdInput = document.getElementById("itemId");
const itemNameInput = document.getElementById("itemName");
const itemDescriptionInput = document.getElementById("itemDescription");
const itemPriceInput = document.getElementById("itemPrice");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEdit");

function createButton(label, action, itemId) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;
  button.dataset.id = itemId;
  return button;
}

function displayMenu() {
  menuList.replaceChildren();

  menuItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const icon = document.createElement("div");
    icon.className = "menu-icon";
    icon.textContent = item.icon;

    const name = document.createElement("h3");
    name.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.description;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `₹${item.price}`;

    const actions = document.createElement("div");
    actions.className = "menu-actions";
    actions.append(
      createButton("Edit", "edit", item.id),
      createButton("Delete", "delete", item.id)
    );

    card.append(icon, name, description, price, actions);
    menuList.append(card);
  });
}

function resetForm() {
  menuForm.reset();
  itemIdInput.value = "";
  formTitle.textContent = "Add a menu item";
  submitButton.textContent = "Add item";
  cancelEditButton.hidden = true;
}

function startEditing(id) {
  const item = menuItems.find(menuItem => menuItem.id === id);
  if (!item) return;

  itemIdInput.value = item.id;
  itemNameInput.value = item.name;
  itemDescriptionInput.value = item.description;
  itemPriceInput.value = item.price;
  formTitle.textContent = "Edit menu item";
  submitButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  itemNameInput.focus();
}

menuForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = itemNameInput.value.trim();
  const description = itemDescriptionInput.value.trim();
  const price = Number(itemPriceInput.value);

  if (!name || !description || !Number.isFinite(price) || price <= 0) {
    return;
  }

  const editingId = Number(itemIdInput.value);
  if (editingId) {
    const item = menuItems.find(menuItem => menuItem.id === editingId);
    if (!item) return;
    item.name = name;
    item.description = description;
    item.price = price;
  } else {
    menuItems.push({
      id: nextItemId++,
      name,
      description,
      price,
      icon: "🍪"
    });
  }

  displayMenu();
  resetForm();
});

menuList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  if (button.dataset.action === "edit") {
    startEditing(id);
  } else if (button.dataset.action === "delete") {
    const index = menuItems.findIndex(item => item.id === id);
    if (index !== -1) {
      menuItems.splice(index, 1);
      displayMenu();
      if (Number(itemIdInput.value) === id) resetForm();
    }
  }
});

cancelEditButton.addEventListener("click", resetForm);

displayMenu();
