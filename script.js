fetch("data/items.json")
  .then(res => res.json())
  .then(data => {
    items = data;
    buildCatalog();
  });
