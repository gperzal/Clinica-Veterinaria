import catalogo from "./catalogo.json";
import citas from "./citas.json";

export async function processUserMessage(message) {
  const lowercaseMessage = message.toLowerCase();

  // Respuesta a saludo
  if (lowercaseMessage.includes("hola")) {
    return `
      <b>¡Hola!</b> esperamos que tengas un buen día. ☺️<br />
      ¿En qué puedo ayudarte?<br />
      <ul>
        <li><b>Productos</b> disponibles en nuestra tienda.</li>
        <li><b>Horarios</b> de atención.</li>
        <li><b>Servicios</b> ofrecidos.</li>
        <li><b>Información</b> de citas médicas.</li>
      </ul>
    `;
  }

  // Respuesta sobre productos
  if (lowercaseMessage.includes("producto")) {
    return `
      <b>Productos disponibles:</b><br />
      <ul>
        ${catalogo.productos
        .map(
          (p) => `
            <li>
              <b>${p.nombre}</b> - <i>$${p.precio}</i><br />
              ${p.descripcion}<br />
              <small>${p.disponibilidad ? "✅ Disponible" : "❌ No disponible"}</small>
            </li>
          `
        )
        .join("")}
      </ul>
    `;
  }

  // Respuesta sobre horarios
  if (lowercaseMessage.includes("horario")) {
    return `
      <b>Horarios de atención:</b><br />
      <ul>
        <li>Lunes a Viernes: 🕒 ${citas.horarios.lunes_viernes}</li>
        <li>Sábado: 🕒 ${citas.horarios.sabado}</li>
        <li>Domingo: 🕒 ${citas.horarios.domingo}</li>
      </ul>
    `;
  }

  // Respuesta sobre citas
  if (lowercaseMessage.includes("cita")) {
    return `
      <b>Servicios disponibles para citas:</b><br />
      <ul>
        ${citas.servicios
        .map(
          (s) => `
            <li>
              <b>${s.nombre}</b> (ID: ${s.id})<br />
              🕒 Duración: ${s.duracion}<br />
              💰 Precio: $${s.precio}<br />
              📋 ${s.descripcion}
            </li>
          `
        )
        .join("")}
      </ul>
    `;
  }

  // Respuesta sobre servicios
  if (lowercaseMessage.includes("servicio")) {
    return `
      <b>Nuestros servicios:</b><br />
      <ul>
        ${citas.servicios
        .map(
          (s) => `
            <li>
              <b>${s.nombre}</b><br />
              🕒 Duración: ${s.duracion}<br />
              💰 Precio: $${s.precio}<br />
              📋 ${s.descripcion}
            </li>
          `
        )
        .join("")}
      </ul>
    `;
  }

  // Respuesta predeterminada
  return `
    <b>Lo siento, no entendí tu mensaje.</b><br />
    Intenta preguntar sobre:<br />
    <ul>
      <li>Productos.</li>
      <li>Horarios.</li>
      <li>Servicios.</li>
      <li>Citas médicas.</li>
    </ul>
  `;
}
