const treatments = [
  { name: "Corte de flequillo", price: 8000, category: "peluqueria", description: "El flequillo es un elemento clave para cambiar tu look sin comprometer la longitud. Se realiza un corte preciso y adaptado a la forma de tu rostro y el estilo deseado.", image: "../assets/foto-flequillo" },
  { name: "Corte de pelo", price: 17000, category: "peluqueria", description: "Un corte que define la forma y el estilo de tu cabello, eliminando puntas abiertas y aportando cuerpo y movimiento. Perfecto para renovar tu imagen o mantener tu estilo.", image: "../assets/foto-corte" },
  { name: "Alisado", price: 33000, category: "peluqueria", description: "Tratamiento capilar profesional que reduce el encrespamiento y alisa la fibra capilar, dejando el cabello liso, brillante y manejable por un período prolongado.", image: "../assets/foto-alisado" },
  { name: "Claritos", price: 48000, category: "peluqueria", description: "Aplicación estratégica de mechas más claras para iluminar el cabello de forma natural, aportando dimensión y un toque de sol a tu melena.", image: "../assets/foto-claritos" },
  { name: "Tintura completa", price: 40000, category: "peluqueria", description: "Coloración integral que cubre todo el cabello, ideal para cambiar de color completamente o para unificar el tono de la raíz a las puntas.", image: "../assets/foto-tintura-completa" },
  { name: "Tintura raíces", price: 27000, category: "peluqueria", description: "Servicio de coloración enfocado en la zona de las raíces para cubrir canas o igualar el crecimiento con el resto del color del cabello.", image: "../assets/foto-tintura-raices" },
  { name: "Capping gel", price: 25000, category: "uñas", description: "Técnica de uñas que consiste en aplicar una capa de gel protectora sobre la uña natural para fortalecerla, prevenir roturas y mejorar la durabilidad del esmalte.", image: "../assets/foto-capping" },
  { name: "Manicura semipermanente", price: 20000, category: "uñas", description: "Manicura que utiliza un esmalte especial curado con luz UV/LED, ofreciendo un color intenso y un acabado duradero y resistente al descascarillado por varias semanas.", image: "../assets/foto-semipermanente" },
  { name: "Depilación de rostro", price: 12000, category: "depilacion", description: "Eliminación de vello facial no deseado (bozo, mentón, cejas) con cera tibia o productos específicos, dejando la piel suave y limpia.", image: "../assets/foto-depilacion-rostro" },
  { name: "Depilación de piernas", price: 14000, category: "depilacion", description: "Eliminación del vello de las piernas (entera o media pierna) mediante el uso de cera, asegurando una piel tersa y libre de vello por más tiempo.", image: "../assets/foto-depilacion-pierna" }
];

function generateCard(data) {
  const container = document.getElementById("treatments-cards");
  container.innerHTML = "";

  data.forEach(treatment => {
    const card = document.createElement("div");
    card.className = "card w-100 mb-3";

    const row = document.createElement("div");
    row.className = "row g-0";

    const colImg = document.createElement("div");
    colImg.className = "col-md-4";

    const img = document.createElement("img");
    img.src = treatment.image + ".png";
    img.className = "img-fluid card-img-top";
    img.alt = treatment.name;

    colImg.appendChild(img);

    const colContent = document.createElement("div");
    colContent.className = "col-md-8";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = treatment.name;

    const desc = document.createElement("p");
    desc.className = "card-text";
    desc.textContent = treatment.description;

    cardBody.appendChild(title);
    cardBody.appendChild(desc);

    const ul = document.createElement("ul");
    ul.className = "list-group list-group-flush";

    const li1 = document.createElement("li");
    li1.className = "list-group-item";
    li1.textContent = "Categoría: " + treatment.category;

    const li2 = document.createElement("li");
    li2.className = "list-group-item";
    li2.textContent = "Precio: $" + treatment.price;

    ul.appendChild(li1);
    ul.appendChild(li2);

    colContent.appendChild(cardBody);
    colContent.appendChild(ul);

    row.appendChild(colImg);
    row.appendChild(colContent);
    card.appendChild(row);
    container.appendChild(card);
  });
}

const selectFilter = document.getElementById("filter-category");

selectFilter.addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  
  if (selectedCategory === "todos") {
    generateCard(treatments);
  } else {
    const filtered = treatments.filter(t => t.category === selectedCategory);
    generateCard(filtered);
  }
});

generateCard(treatments);