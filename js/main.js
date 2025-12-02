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
  let tableHtml = `
    <table class = "shift-table">
        <thread>
            <tr>
                <th>Nombre y Apellido</th>
                <th>Tratamiento</th>
                <th>Fecha</th>
                <th>Hora</th>
            </tr>
        </thread>
        <tbody>`;

  tableHtml += asignedShifts.map(shift => `
    <tr>
        <td>${shift.name} ${shift.lastname}</td>
        <td>${shift.treatment}</td>
        <td>${shift.date}</td>
        <td>${shift.time}</td>
    </tr>`).join('');

  tableHtml += `
      </tbody>
    </table>`;

  showAsignedShifts.innerHTML = tableHtml}

renderShifts();


//Save form
const form = document.querySelector('form');

form.addEventListener('submit', function(){
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const treatment = document.getElementById('options').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

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
})