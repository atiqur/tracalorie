// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }

  // Data Structure / State
  const data = {
    items: [
      //   { id: 0, name: "Stake Dinner", calories: 1200 },
      //   { id: 1, name: "Cookie", calories: 300 },
      //   { id: 2, name: "Egg", calories: 200 },
    ],
    currentItem: null,
    totalCalories: 0,
  }

  return {
    getItems: function () {
      return data.items
    },
    addItem: function (name, calories) {
      let ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1
      } else {
        ID = 0
      }

      calories = parseInt(calories)

      newItem = new Item(ID, name, calories)

      data.items.push(newItem)

      data.totalCalories = parseInt(data.totalCalories) + calories

      return newItem
    },
    getTotalCalories: function () {
      //   let total = 0

      //   data.items.forEach(function (item) {
      //     total += item.calories
      //   })

      //   data.totalCalories = total

      return data.totalCalories
    },
    logData: function () {
      return data
    },
  }
})()

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemName: "#item-name",
    itemCalories: "#item-calories",
    totalCalories: ".total-calories",
  }
  return {
    populateItemList: function (items) {
      let html = ""

      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
        </a>
        </li>`
      })

      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    getSelectors: function () {
      return UISelectors
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemName).value,
        calories: document.querySelector(UISelectors.itemCalories).value,
      }
    },
    addListItem: function (item) {
      document.querySelector(UISelectors.itemList).style.display = "block"
      const li = document.createElement("li")
      li.className = "collection-item"
      li.id = `item-${item.id}`
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
      </a>`
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li)
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemName).value = ""
      document.querySelector(UISelectors.itemCalories).value = ""
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none"
    },
  }
})()

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  const loadEventListners = function () {
    const UISelectors = UICtrl.getSelectors()

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit)
  }

  const itemAddSubmit = function (e) {
    const input = UICtrl.getItemInput()

    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      UICtrl.addListItem(newItem)

      const totalCalories = ItemCtrl.getTotalCalories()

      UICtrl.showTotalCalories(totalCalories)

      UICtrl.clearInput()
    }
    e.preventDefault()
  }

  return {
    init: function () {
      const items = ItemCtrl.getItems()

      if (items.length == 0) {
        UICtrl.hideList()
      } else {
        UICtrl.populateItemList(items)
      }

      const totalCalories = ItemCtrl.getTotalCalories()

      UICtrl.showTotalCalories(totalCalories)

      loadEventListners()
    },
  }
})(ItemCtrl, UICtrl)

App.init()
