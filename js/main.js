// select
const treatments = [
  { name: "Corte de flequillo", price: 8000 },
  { name: "Corte de pelo", price: 17000 },
  { name: "Alisado", price: 33000 },
  { name: "Claritos", price: 48000 },
  { name: "Tintura completa", price: 40000 },
  { name: "Tintura raices", price: 27000 },
  { name: "Capping gel", price: 25000 },
  { name: "Manicura semipermanente", price: 20000 },
  { name: "Depilación de rostro", price: 12000 },
  { name: "Depilación de piernas", price: 14000 }
];

const selectForm = document.getElementById('options');

selectForm.innerHTML += treatments
  .map(treatement => `<option value="${treatement.name}">${treatement.name} - $${treatement.price}</option>`)
  .join('');


//Shifts list
const asignedShifts = JSON.parse(localStorage.getItem("shifts")) || [];

const showAsignedShifts = document.getElementById(`list-shifts`)

function renderShifts() {
  if (asignedShifts.length === 0) {
    showAsignedShifts.innerHTML = "<p>No hay turnos agendados.</p>";
    return;
  }
  let tableHtml = `
    <table class = "shift-table">
        <thread>
            <tr>
                <th>Nombre y Apellido</th>
                <th>Tratamiento</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
            </tr>
        </thread>
        <tbody>`;

  tableHtml += asignedShifts.map((shift,index) => `
    <tr>
      <td>${shift.name} ${shift.lastname}</td>
      <td>${shift.treatment}</td>
      <td>${shift.date}</td>
      <td>${shift.time}</td>
      <td>
        <button class="btn-velvet" id="modify" onclick="editShift(${index})">Modificar</button>
        <button class="btn-velvet" id="delete" onclick="deleteShift(${index})">Eliminar</button>
      </td>
    </tr>`).join('');

  tableHtml += `
      </tbody>
    </table>`;

  showAsignedShifts.innerHTML = tableHtml;}

//Delete shift
window.deleteShift = function(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este turno?")) {
    asignedShifts.splice(index, 1);
    localStorage.setItem("shifts", JSON.stringify(asignedShifts)); 
    renderShifts(); 
  }
};

//Modify shift
window.editShift = function(index) {
  const shift = asignedShifts[index];

  asignedShifts.splice(index, 1);

  document.getElementById('name').value = shift.name;
  document.getElementById('lastname').value = shift.lastname;
  document.getElementById('options').value = shift.treatment;
  document.getElementById('date').value = shift.date;
  document.getElementById('time').value = shift.time;

  
  alert("Los datos se han cargado en el formulario. Realiza los cambios y presiona 'Reservar turno' para guardar.");
};

renderShifts();

//Validación de la fecha
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

//Save form
const form = document.querySelector('form');

form.addEventListener('submit', function(event){
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const treatment = document.getElementById('options').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  //Validaciones del formulario
  if (!name || !lastname || !treatment || !date || !time) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!soloLetras.test(name)) {
    alert("El nombre solo puede contener letras.");
    return; 
  }
  if (!soloLetras.test(lastname)) {
    alert("El apellido solo puede contener letras.");
    return; 
  }

  const isDuplicate = asignedShifts.some(shift => 
    shift.date === date && shift.time === time
  );

  if (isDuplicate) {
    alert("Lo sentimos, este horario ya está reservado. Por favor elige otro.");
    return;
  }

  const newShift = {
    name: name,
    lastname: lastname,
    treatment: treatment,
    date: date,
    time: time
  };

  asignedShifts.push(newShift);

  localStorage.setItem("shifts", JSON.stringify(asignedShifts));

  renderShifts();

  form.reset();
  alert("¡Turno reservado con éxito!");
})