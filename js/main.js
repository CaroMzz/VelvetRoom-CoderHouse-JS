// select
const treatments = [
  { name: "Corte de flequillo", price: 8000 },
  { name: "Corte de pelo", price: 17000 },
  { name: "Keratina", price: 33000 },
  { name: "Claritos", price: 48000 },
  { name: "Tintura completa", price: 40000 },
  { name: "Tintura raices", price: 27000 }
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
    showAsignedShifts.innerHTML = asignedShifts.map(shift => `
        <div class="shift-item">
            <p><strong>Nombre:</strong> ${shift.name} ${shift.lastname}</p>
            <p><strong>Tratamiento:</strong> ${shift.treatment}</p>
            <p><strong>Fecha:</strong> ${shift.date}</p>
            <p><strong>Hora:</strong> ${shift.time}</p>
            <hr>
        </div>`).join('');}


//Save form
