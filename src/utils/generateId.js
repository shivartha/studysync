// crypto.randomUUID() is built into all modern browsers — no extra
// package needed just to generate unique IDs.
function generateId() {
  return crypto.randomUUID();
}

export default generateId;