export function updateList(collection, updated, reactSetter) {
  const newItems = collection.map(item => {
    if (item.id !== updated.id) return item;
    return updated;
  })
  reactSetter(newItems);
}

export function removeFromList(collection, deleted, reactSetter) {
  const newItems = collection.filter(item => {
    return item.id !== deleted.id;
  })
  reactSetter(newItems);
}

export function money(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
