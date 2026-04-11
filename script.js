let items = [];
let currentFile = "";

// Elementos
const catalog = document.getElementById("catalog");
const detail = document.getElementById("detail");
const detailContent = document.getElementById("detail-content");

// Cargar JSON
fetch("data/items.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("No se pudo cargar el JSON");
    }
    return res.json();
  })
  .then(data => {
    console.log("JSON cargado:", data);

    // Seguridad: asegurar que es array
    if (!Array.isArray(data)) {
      console.error("El JSON NO es un array:", data);
      return;
    }

    items = data;
    buildCatalog();
  })
  .catch(err => {
    console.error("Error cargando JSON:", err);
  });

// Crear catálogo
function buildCatalog() {
  catalog.innerHTML = "";

  items.forEach((item, index) => {
    catalog.innerHTML += `
      <div class="card" onclick="openDetail(${index})">
        <img src="${item.image}">
        <div class="title">${item.name}</div>
        <div class="rating">⭐ 4.5</div>
      </div>
    `;
  });
}

// Abrir detalle
function openDetail(index) {
  const item = items[index];

  catalog.style.display = "none";
  detail.style.display = "block";

  detailContent.innerHTML = `
    <img src="${item.image}">
    <h2>${item.name}</h2>
    <div class="date">📅 Creado en ${item.date}</div>
    <div class="desc">${item.description}</div>
    <div class="download-btn" onclick="openModal('${item.file}','${item.image}')">
      Obtener
    </div>
  `;
}

// Modal
function openModal(file, img) {
  currentFile = file;
  document.getElementById("modal-img").src = img;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Descargar
function downloadFile() {
  window.location.href = currentFile;
}
