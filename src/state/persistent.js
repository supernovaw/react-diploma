// cart contents are stored in localStorage

let cartShadow = null;
const match = (id, size, _) => entry => entry.id === id && entry.size === size;
const matchInv = (id, size) => entry => entry.id !== id || entry.size !== size;
const parseCart = () => { if (!cartShadow) cartShadow = JSON.parse(localStorage.getItem("cart") || "[]") };
const writeCart = () => { localStorage.setItem("cart", JSON.stringify(cartShadow)) };
const resetCart = () => { localStorage.removeItem("cart") };

const cart = {
  get: function () {
    parseCart();
    return cartShadow;
  },
  add: function (id, size, price, count, name) {
    parseCart();
    let entry = cartShadow.find(match(id, size)); // find any existing entry
    if (entry) { // edit entry (if found)
      cartShadow = cartShadow.filter(matchInv(id, size)); // remove the existing entry
      entry.price = price;
      entry.count += count;
      entry.name = name;
    } else { // create entry (if not found)
      entry = { id, size, price, count, name };
    }
    cartShadow.push(entry);
    writeCart();
  },
  remove: function ({ id, size }) {
    parseCart();
    cartShadow = cartShadow.filter(matchInv(id, size));
    writeCart();
  },
  clear: function () {
    cartShadow = [];
    resetCart();
  }
};

export { cart };
