/* =====================================================================
   MATHBOUND · LÓGICA DEL JUEGO
   (el motor de audio está al final de este archivo)
   ===================================================================== */
 
/* --- Almacenamiento seguro: si el navegador/editor bloquea localStorage, el juego sigue funcionando --- */
const _memStore = {};
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return (k in _memStore) ? _memStore[k] : null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { _memStore[k] = String(v); } }
function lsRemove(k) { try { localStorage.removeItem(k); } catch (e) { delete _memStore[k]; } }
 
// Todos los códigos dan 200 monedas y 150 XP.
// POLYA01 = recompensa del Gólem · TESIS2026 = recompensa del Devorador
// FRACCION5 y MATH26 quedan reservados para las próximas regiones.
const codigosValidos = {
  'POLYA01': { xp: 150, oro: 200 },
  'TESIS2026': { xp: 150, oro: 200 },
  'FRACCION5': { xp: 150, oro: 200 },
  'MATH26': { xp: 150, oro: 200 }
};
 
// Recompensa al terminar el tutorial
const RECOMPENSA_TUTORIAL = { xp: 100, oro: 200 };
 
const IMAGENES_ESTADO = {
  masculino: {
    base: 'https://i.postimg.cc/1zkqtDXf/cuerpo-removebg-preview.png',
    logico: {
      botas: 'https://i.postimg.cc/9Fwsw7W7/Gemini-Generated-Image-dise7ydise7ydise-removebg-preview-(1).png',
      armadura: 'https://i.postimg.cc/BQPRPKqC/Gemini-Generated-Image-g8mixvg8mixvg8mi-removebg-preview.png',
      ambos: 'https://i.postimg.cc/GhjgyJWG/Captura-de-pantalla-2026-03-13-174143-removebg-preview.png',
      todo: 'https://i.postimg.cc/j2LmXWyx/Captura-de-pantalla-2026-03-13-173012-removebg-preview-(1).png'
    },
    razonamiento: {
      botas: 'https://i.postimg.cc/Y4yQPyQt/image.png',
      armadura: 'https://i.postimg.cc/sQQ5C9JQ/image.png',
      ambos: 'https://i.postimg.cc/zbbTYSky/image.png',
      todo: 'https://i.postimg.cc/7CQSRQSb/image.png'
    },
    calculo: {
      botas: 'https://i.postimg.cc/fkvNVZHj/image.png',
      armadura: 'https://i.postimg.cc/Wt7vdj97/image.png',
      ambos: 'https://i.postimg.cc/dD9YhvWB/image.png',
      todo: 'https://i.postimg.cc/rz9kDchh/image.png'
    }
  },
  femenino: {
    base: 'https://i.postimg.cc/x8wzbm50/p1-removebg-preview.png',
    logico: {
      botas: 'https://i.postimg.cc/sMjHSxyR/image.png',
      armadura: 'https://i.postimg.cc/G4LgYtrc/image.png',
      ambos: 'https://i.postimg.cc/XrsHgW7S/image.png',
      todo: 'https://i.postimg.cc/Mn9PYwK8/image.png'
    },
    razonamiento: {
      botas: 'https://i.postimg.cc/kVhWHhWG/image.png',
      armadura: 'https://i.postimg.cc/SXtcPtcY/image.png',
      ambos: 'https://i.postimg.cc/B8w2zw2F/image.png',
      todo: 'https://i.postimg.cc/Q99cZkqV/image.png'
    },
    calculo: {
      botas: 'https://i.postimg.cc/23YYj3x4/image.png',
      armadura: 'https://i.postimg.cc/9z22XzBt/image.png',
      ambos: 'https://i.postimg.cc/QVDDNVqb/image.png',
      todo: 'https://i.postimg.cc/QVDDNVq0/image.png'
    }
  }
};
 
const catalogoTienda = [
  // SET LÓGICO
  { id: 'logico_botas', set: 'logico', nombre: 'Guantes y Botas Lógicas', precio: 50, img: 'https://i.postimg.cc/8kxfm2Sg/Captura-de-pantalla-2026-03-13-175428-removebg-preview.png', tipo: 'item', desc: 'Canalizan la energía del pensamiento estructurado.', stats: '❤️ +10 HP | ⚔️ +5 Daño Lógico' },
  { id: 'logico_armadura', set: 'logico', nombre: 'Armadura y Sombrero Lógico', precio: 60, img: 'https://i.postimg.cc/DfR4P9TT/Captura-de-pantalla-2026-03-13-175353-removebg-preview.png', tipo: 'item', desc: 'Protege tu mente de falacias matemáticas.', stats: '❤️ +15 HP | ⚔️ +5 Daño Lógico' },
  { id: 'logico_espada', set: 'logico', nombre: 'Espada Lógica (Requiere set)', precio: 90, img: 'https://i.postimg.cc/XJ9yyXBc/espada-removebg-preview.png', tipo: 'item', desc: 'Corta la incertidumbre de tajo.', stats: '⚔️ +15 Daño Lógico' },
 
  // SET DEL RAZONAMIENTO
  { id: 'razon_botas', set: 'razonamiento', nombre: 'Guantes y Botas del Razonamiento', precio: 50, img: 'https://i.postimg.cc/vgg5wLv1/image.png', tipo: 'item', desc: 'Siente las bases de la lógica pura.', stats: '❤️ +10 HP | 🔱 +5 Daño Razonamiento' },
  { id: 'razon_armadura', set: 'razonamiento', nombre: 'Armadura y Casco del Razonamiento', precio: 60, img: 'https://i.postimg.cc/CZ6b26bx/image.png', tipo: 'item', desc: 'Mística protección forjada en la sabiduría.', stats: '❤️ +15 HP | 🔱 +5 Daño Razonamiento' },
  { id: 'razon_arma', set: 'razonamiento', nombre: 'Trinche del Razonamiento (Requiere set)', precio: 90, img: 'https://i.postimg.cc/3yb2qb2w/image.png', tipo: 'item', desc: 'Perfora la ignorancia en tres frentes.', stats: '🔱 +15 Daño Razonamiento' },
 
  // SET DEL CÁLCULO
  { id: 'calculo_botas', set: 'calculo', nombre: 'Guantes y Botas del Cálculo', precio: 50, img: 'https://i.postimg.cc/vDyy8Dvx/image.png', tipo: 'item', desc: 'Siente la precisión de los números.', stats: '❤️ +10 HP | ➗ +5 Daño Cálculo' },
  { id: 'calculo_armadura', set: 'calculo', nombre: 'Pechera y Casco del Cálculo', precio: 60, img: 'https://i.postimg.cc/hhnn4h0V/image.png', tipo: 'item', desc: 'Armadura forjada con ecuaciones exactas.', stats: '❤️ +15 HP | ➗ +5 Daño Cálculo' },
  { id: 'calculo_arma', set: 'calculo', nombre: 'Cetro del Cálculo (Requiere set)', precio: 90, img: 'https://i.postimg.cc/9z22XzBP/image.png', tipo: 'item', desc: 'Canaliza el poder de las matemáticas absolutas.', stats: '➗ +15 Daño Cálculo' }
];
 
let jugador = {
  nombre: '', genero: 'masculino', nivel: 1, xp: 0, xpMax: 100, monedas: 0,
  hp: 10, hpMax: 10,
  inventario: [], equipado: [], codigosUsados: [],
  tutorialCompletado: false, golemDerrotado: false, devoradorDerrotado: false
};
 
window.onload = () => {
  const ultimoUsuario = lsGet('mathbound_last_user');
  if (ultimoUsuario) {
    const datos = lsGet('mathbound_user_v5_' + ultimoUsuario);
    if (datos) {
      jugador = JSON.parse(datos);
      mostrarPantallaApp();
    }
  }
};
 
function iniciarSesion() {
  const nombre = document.getElementById('username-input').value.trim();
  if (nombre.length > 0) {
    const nombreNormalizado = nombre.toLowerCase();
    const datos = lsGet('mathbound_user_v5_' + nombreNormalizado);
 
    if (datos) {
      jugador = JSON.parse(datos);
      lsSet('mathbound_last_user', nombreNormalizado);
      mostrarPantallaApp();
    } else {
      jugador.nombre = nombre;
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('character-selection-screen').style.display = 'flex';
      elegirPersonaje('masculino');
    }
  } else {
    alert('Ingresa tu nombre de héroe.');
  }
}
 
function elegirPersonaje(genero) {
  jugador.genero = genero;
  document.querySelectorAll('.char-option').forEach(el => el.classList.remove('selected'));
  document.getElementById(`char-${genero}`).classList.add('selected');
}
 
function confirmarPersonaje() {
  const nombreNormalizado = jugador.nombre.toLowerCase();
  lsSet('mathbound_last_user', nombreNormalizado);
  guardarDatos();
  document.getElementById('character-selection-screen').style.display = 'none';
  mostrarPantallaApp();
}
 
function cerrarSesion() {
  lsRemove('mathbound_last_user');
  location.reload();
}
 
function mostrarPantallaApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-screen').style.display = 'flex';
  calcularEstadisticas();
  actualizarInterfaz();
}
 
function calcularEstadisticas() {
  let hpExtra = 0; let dmgLogico = 0; let dmgRazon = 0; let dmgCalculo = 0;
 
  // Lógico
  const eqLogBotas = jugador.equipado.includes('logico_botas');
  const eqLogArma = jugador.equipado.includes('logico_armadura');
  const eqLogEspada = jugador.equipado.includes('logico_espada');
 
  if(eqLogBotas) { hpExtra += 10; dmgLogico += 5; }
  if(eqLogArma) { hpExtra += 15; dmgLogico += 5; }
  if(eqLogEspada) { dmgLogico += 15; }
  if(eqLogBotas && eqLogArma && eqLogEspada) { hpExtra += 10; dmgLogico += 10; }
 
  // Razonamiento
  const eqRazBotas = jugador.equipado.includes('razon_botas');
  const eqRazArma = jugador.equipado.includes('razon_armadura');
  const eqRazTrinche = jugador.equipado.includes('razon_arma');
 
  if(eqRazBotas) { hpExtra += 10; dmgRazon += 5; }
  if(eqRazArma) { hpExtra += 15; dmgRazon += 5; }
  if(eqRazTrinche) { dmgRazon += 15; }
  if(eqRazBotas && eqRazArma && eqRazTrinche) { hpExtra += 10; dmgRazon += 10; }
 
  // Cálculo
  const eqCalBotas = jugador.equipado.includes('calculo_botas');
  const eqCalArma = jugador.equipado.includes('calculo_armadura');
  const eqCalCetro = jugador.equipado.includes('calculo_arma');
 
  if(eqCalBotas) { hpExtra += 10; dmgCalculo += 5; }
  if(eqCalArma) { hpExtra += 15; dmgCalculo += 5; }
  if(eqCalCetro) { dmgCalculo += 15; }
  if(eqCalBotas && eqCalArma && eqCalCetro) { hpExtra += 10; dmgCalculo += 10; }
 
  jugador.hpMax = 10 + hpExtra;
  if(jugador.hp > jugador.hpMax) jugador.hp = jugador.hpMax;
  if(!jugador.hp || jugador.hp <= 0) jugador.hp = jugador.hpMax;
 
  jugador.dmgLogico = dmgLogico;
  jugador.dmgRazon = dmgRazon;
  jugador.dmgCalculo = dmgCalculo;
}
 
function obtenerImagenAvatar() {
  const g = jugador.genero || 'masculino';
  let estadoActual = IMAGENES_ESTADO[g].base;
 
  const logBotas = jugador.equipado.includes('logico_botas');
  const logArma = jugador.equipado.includes('logico_armadura');
  const logEspada = jugador.equipado.includes('logico_espada');
 
  const razBotas = jugador.equipado.includes('razon_botas');
  const razArma = jugador.equipado.includes('razon_armadura');
  const razTrinche = jugador.equipado.includes('razon_arma');
 
  const calBotas = jugador.equipado.includes('calculo_botas');
  const calArma = jugador.equipado.includes('calculo_armadura');
  const calCetro = jugador.equipado.includes('calculo_arma');
 
  if (logBotas || logArma || logEspada) {
    if (logEspada && logBotas && logArma) estadoActual = IMAGENES_ESTADO[g].logico.todo;
    else if (logBotas && logArma) estadoActual = IMAGENES_ESTADO[g].logico.ambos;
    else if (logBotas && !logArma) estadoActual = IMAGENES_ESTADO[g].logico.botas;
    else if (!logBotas && logArma) estadoActual = IMAGENES_ESTADO[g].logico.armadura;
  } else if (razBotas || razArma || razTrinche) {
    if (razTrinche && razBotas && razArma) estadoActual = IMAGENES_ESTADO[g].razonamiento.todo;
    else if (razBotas && razArma) estadoActual = IMAGENES_ESTADO[g].razonamiento.ambos;
    else if (razBotas && !razArma) estadoActual = IMAGENES_ESTADO[g].razonamiento.botas;
    else if (!razBotas && razArma) estadoActual = IMAGENES_ESTADO[g].razonamiento.armadura;
  } else if (calBotas || calArma || calCetro) {
    if (calCetro && calBotas && calArma) estadoActual = IMAGENES_ESTADO[g].calculo.todo;
    else if (calBotas && calArma) estadoActual = IMAGENES_ESTADO[g].calculo.ambos;
    else if (calBotas && !calArma) estadoActual = IMAGENES_ESTADO[g].calculo.botas;
    else if (!calBotas && calArma) estadoActual = IMAGENES_ESTADO[g].calculo.armadura;
  }
 
  return estadoActual;
}
 
function actualizarAvatar() {
  const estadoActual = obtenerImagenAvatar();
  const imgElement = document.getElementById('avatar-img');
  imgElement.style.opacity = 0;
  setTimeout(() => { imgElement.src = estadoActual; imgElement.style.opacity = 1; }, 150);
}
 
function actualizarInterfaz() {
  document.getElementById('display-name').innerText = jugador.nombre.toUpperCase();
  document.getElementById('display-level').innerText = jugador.nivel;
  document.getElementById('display-coins').innerText = jugador.monedas;
 
  document.getElementById('display-exp').innerText = jugador.xp;
  document.getElementById('display-exp-max').innerText = jugador.xpMax;
  document.getElementById('exp-bar').style.width = `${(jugador.xp / jugador.xpMax) * 100}%`;
 
  document.getElementById('display-hp').innerText = jugador.hp;
  document.getElementById('display-hp-max').innerText = jugador.hpMax;
  document.getElementById('hp-bar').style.width = `${(jugador.hp / jugador.hpMax) * 100}%`;
 
  document.getElementById('display-dmg-logico').innerText = jugador.dmgLogico;
  document.getElementById('display-dmg-razon').innerText = jugador.dmgRazon;
  document.getElementById('display-dmg-calculo').innerText = jugador.dmgCalculo;
 
  actualizarAvatar();
  renderizarTienda();
}
 
function renderizarTienda() {
  const contenedor = document.getElementById('contenedor-tienda');
  contenedor.innerHTML = '';
 
  const categorias = [
    { id: 'logico', titulo: '🛡️ Set Lógico' },
    { id: 'razonamiento', titulo: '🔱 Set del Razonamiento' },
    { id: 'calculo', titulo: '➗ Set del Cálculo' }
  ];
 
  categorias.forEach(categoria => {
    const titulo = document.createElement('div');
    titulo.className = 'shop-category-title';
    titulo.innerText = categoria.titulo;
    contenedor.appendChild(titulo);
 
    const grid = document.createElement('div');
    grid.className = 'shop-grid';
 
    const itemsCategoria = catalogoTienda.filter(item => item.set === categoria.id);
 
    itemsCategoria.forEach(item => {
      const comprado = jugador.inventario.includes(item.id);
      const equipado = jugador.equipado.includes(item.id);
 
      const esArma = item.id === 'logico_espada' || item.id === 'razon_arma' || item.id === 'calculo_arma';
 
      // Ajuste crucial: El prefix de razonamiento debe coincidir con los IDs del inventario
      let prefix = item.set;
      if (prefix === 'razonamiento') prefix = 'razon';
 
      const botasReq = `${prefix}_botas`;
      const armaduraReq = `${prefix}_armadura`;
 
      const requisitosCompletos = jugador.inventario.includes(botasReq) && jugador.inventario.includes(armaduraReq);
      const bloqueado = esArma && !requisitosCompletos && !comprado;
 
      let botonHTML = '';
      if (bloqueado) {
        botonHTML = `<button class="buy-btn" disabled>🔒 REQUIERE SET</button>`;
      } else if (comprado && equipado) {
        botonHTML = `<button class="buy-btn btn-desequipar" onclick="toggleEquipar('${item.id}')">QUITAR</button>`;
      } else if (comprado && !equipado) {
        botonHTML = `<button class="buy-btn btn-equipar" onclick="toggleEquipar('${item.id}')">EQUIPAR</button>`;
      } else {
        botonHTML = `<button class="buy-btn btn-comprar" onclick="comprarItem('${item.id}', ${item.precio})">COMPRAR</button>`;
      }
 
      const itemDiv = document.createElement('div');
      itemDiv.className = 'shop-item';
      itemDiv.innerHTML = `
        <div class="tooltip-info">
          <img src="${item.img}">
          <h4>${item.nombre}</h4>
          <p>"${item.desc}"</p>
          <div class="stats">${item.stats}</div>
        </div>
        <img src="${item.img}" class="item-preview" style="${bloqueado ? 'filter: grayscale(1); opacity: 0.5;' : ''}">
        <div class="item-name" style="${bloqueado ? 'color: #8b8c9c;' : ''}">${item.nombre}</div>
        ${!comprado && !bloqueado ? `<div class="item-price">🪙 ${item.precio}</div>` : ''}
        ${botonHTML}
      `;
      grid.appendChild(itemDiv);
    });
 
    contenedor.appendChild(grid);
  });
}
 
function comprarItem(id, precio) {
  if (jugador.monedas >= precio) {
    jugador.monedas -= precio;
    jugador.inventario.push(id);
    toggleEquipar(id, true);
  } else {
    mostrarAlerta('Oro insuficiente.', 'error');
  }
}
 
function toggleEquipar(id, forzarEquipar = false) {
  const itemToEquip = catalogoTienda.find(i => i.id === id);
  const index = jugador.equipado.indexOf(id);
 
  if (index > -1 && !forzarEquipar) {
    jugador.equipado.splice(index, 1);
 
    let armaAsociada;
    if (itemToEquip.set === 'logico') armaAsociada = 'logico_espada';
    else if (itemToEquip.set === 'razonamiento') armaAsociada = 'razon_arma';
    else if (itemToEquip.set === 'calculo') armaAsociada = 'calculo_arma';
 
    if (id !== armaAsociada && jugador.equipado.includes(armaAsociada)) {
        jugador.equipado.splice(jugador.equipado.indexOf(armaAsociada), 1);
    }
  } else if (!jugador.equipado.includes(id)) {
    jugador.equipado = jugador.equipado.filter(eqId => {
       const eqItem = catalogoTienda.find(i => i.id === eqId);
       return eqItem && eqItem.set === itemToEquip.set;
    });
    jugador.equipado.push(id);
  }
 
  calcularEstadisticas();
  guardarDatos();
  actualizarInterfaz();
}
 
// Suma XP y oro, y sube de nivel si corresponde. Devuelve el mensaje resultante.
function otorgarRecompensa(xp, oro) {
  jugador.xp += xp;
  jugador.monedas += oro;
 
  let msj = `¡+${xp} XP y +${oro} 🪙!`;
  if (jugador.xp >= jugador.xpMax) {
    jugador.nivel++;
    jugador.xp -= jugador.xpMax;
    jugador.xpMax = Math.floor(jugador.xpMax * 1.5);
    msj += ` ¡Nivel ${jugador.nivel}!`;
  }
  return msj;
}
 
function canjearCodigo() {
  const input = document.getElementById('codigo-input');
  const codigoStr = input.value.trim().toUpperCase();
 
  if (codigoStr === '') return;
  if (jugador.codigosUsados.includes(codigoStr)) {
    mostrarAlerta('Código ya usado.', 'error');
    return;
  }
 
  if (codigosValidos[codigoStr]) {
    const recompensa = codigosValidos[codigoStr];
    jugador.codigosUsados.push(codigoStr);
    const msj = otorgarRecompensa(recompensa.xp, recompensa.oro);
 
    guardarDatos();
    actualizarInterfaz();
    input.value = '';
    mostrarAlerta(msj, 'success');
  } else {
    mostrarAlerta('Código inválido.', 'error');
  }
}
 
function mostrarAlerta(mensaje, tipo) {
  const alerta = document.getElementById('alerta-codigo');
  alerta.innerText = mensaje;
  alerta.className = `alert ${tipo}`;
  alerta.style.display = 'block';
  setTimeout(() => alerta.style.display = 'none', 3000);
}
 
function guardarDatos() {
  const nombreNormalizado = jugador.nombre.toLowerCase();
  lsSet('mathbound_user_v5_' + nombreNormalizado, JSON.stringify(jugador));
}
 
// --- LÓGICA DEL MAPA ---
 
function abrirMapa() {
  document.getElementById('app-screen').style.display = 'none';
  document.getElementById('map-screen').style.display = 'flex';
  actualizarHotspots();
}
 
function volverDeMapa() {
  document.getElementById('map-screen').style.display = 'none';
  document.getElementById('app-screen').style.display = 'flex';
  actualizarInterfaz(); // Refresca los stats al volver
}
 
// Deshabilita Ciudad Central una vez completado el tutorial
function actualizarHotspots() {
  const ciudad = document.getElementById('hotspot-ciudad');
  if (jugador.tutorialCompletado) {
    ciudad.classList.add('disabled');
    ciudad.title = 'Ciudad Central - Misión completada';
  } else {
    ciudad.classList.remove('disabled');
    ciudad.title = 'Ciudad Central - Misión Tutorial';
  }
}
 
// --- PICOS DE CÁLCULO ---
 
// Antes de viajar a otra región hay que haber completado el tutorial
function tutorialCompletadoOMensaje() {
  if (jugador.tutorialCompletado) return true;
  mostrarModalCombate('🔒 Región bloqueada',
    '<p>Debes completar primero el tutorial en la <strong>Ciudad Central</strong> antes de viajar a otras regiones.</p>',
    [{ texto: 'Entendido' }]);
  return false;
}
 
function abrirVerificacionPicos() {
  if (!tutorialCompletadoOMensaje()) return;
  document.getElementById('picos-set-info').innerHTML = htmlInfoSet('calculo');
  document.getElementById('map-screen').style.display = 'none';
  document.getElementById('picos-check-screen').style.display = 'flex';
}
 
// Sirve para Picos de Cálculo y Prados de la Lógica
function volverATienda() {
  document.getElementById('picos-check-screen').style.display = 'none';
  document.getElementById('prados-check-screen').style.display = 'none';
  document.getElementById('app-screen').style.display = 'flex';
  actualizarInterfaz();
}
 
function entrarPicos() {
  document.getElementById('picos-check-screen').style.display = 'none';
  document.getElementById('monster-intro-screen').style.display = 'flex';
}
 
// --- PRADOS DE LA LÓGICA ---
 
function abrirVerificacionPrados() {
  if (!tutorialCompletadoOMensaje()) return;
  document.getElementById('prados-set-info').innerHTML = htmlInfoSet('logico');
  document.getElementById('map-screen').style.display = 'none';
  document.getElementById('prados-check-screen').style.display = 'flex';
}
 
function entrarPrados() {
  document.getElementById('prados-check-screen').style.display = 'none';
  document.getElementById('devorador-intro-screen').style.display = 'flex';
}
 
// --- DATOS DE LA HISTORIA Y EJERCICIOS ---
const loreData = [
  { img: "https://i.postimg.cc/qMkhwkh6/Gemini-Generated-Image-iz7mlqiz7mlqiz7m.jpg", text: "¡Despierta, joven valiente! Mathbound está en grave peligro y la Ciudad Central te necesita con urgencia. Soy tu Tutor Pólya, guardián del conocimiento, y necesito que te unas a los Guardianes de la tierra." },
  { img: "https://i.postimg.cc/L4kgjqs7/Gemini-Generated-Image-jibogbjibogbjibo.jpg", text: "Observa las Cuatro Gemas de las Operaciones: la Suma, la Resta, la Multiplicación y la División. Mientras brillaban en perfecta armonía, todo en Mathbound se contaba, se clasificaba y se cuidaba, y la tierra se mantenía limpia." },
  { img: "https://i.postimg.cc/7P1JSCLj/Gemini-Generated-Image-9sdpqk9sdpqk9sdp.jpg", text: "Pero llegaron los monstruos de la basura y convencieron a la gente de tirar residuos al suelo y mezclarlos sin separar. Con cada mal hábito crecía su fuerza oscura, hasta romper el Gran Algoritmo y dispersar las gemas. ¡Mathbound perdió el equilibrio!" },
  { img: "https://i.postimg.cc/Wb2F82DK/Gemini-Generated-Image-n3c28rn3c28rn3c2.jpg", text: "Sin las gemas, los Prados de la Lógica, el Abismo del Razonamiento, los Picos del Cálculo y los Bosques de la Abstracción han sido invadidos por los monstruos de la basura. ¡Cada residuo mal desechado los hace más fuertes!" },
  { img: "https://i.postimg.cc/ncHj2HjD/Gemini-Generated-Image-agyei5agyei5agye.jpg", text: "Ninguna arma común los daña: las matemáticas son la única herramienta capaz de derrotarlos. Para combatirlos usarás el legendario Método de Pólya, pero antes debes dominar la regla sagrada de este pergamino: la Jerarquía de las Operaciones." },
  { img: "https://i.postimg.cc/wMktzrrW/Briefing-holografico-del-mago.png", text: "¡Este es el simulador del castillo! Su holograma proyecta operaciones combinadas, y si no sabes cuál atacar primero, tus ataques fallarán. Resolveremos unos ejercicios para que entiendas el orden. ¡Prepárate!" }
];
 
// Lore del Gólem de la Chatarra
const loreGolemData = [
  { img: "https://i.postimg.cc/0QHf1czT/Jefe-robot-del-vertedero.png", text: "¡JA, JA, JA, JAAAA!\n\n¿Escuchas ese maravilloso sonido? ¡CLANG, CLANG, CLANG!\n\n¡Son los habitantes de Mathbound regalándome un cuerpo nuevo!" },
  { img: "https://i.postimg.cc/ydNPGwNH/Monstruo-de-basura-pixelado.png", text: "Cada computadora abandonada, cada lata arrojada al barranco, cada cable olvidado… ¡TODO TERMINA AQUÍ, CONMIGO!\n\nAl principio solo era un montón de piezas oxidadas. ¡Mírame ahora! ¡SOY UNA MONTAÑA DE METAL CON PUÑOS!\n\nY cuanto más desorden dejan ustedes, más grande me vuelvo. ¡Más fuerte! ¡Más rápido! ¡MÁS IMPARABLE!" },
  { img: "https://i.postimg.cc/d0jHp2mm/Gigante-de-Chatarra-en-la-Escombrera.png", text: "¿Van a detenerme con sus pequeñas operaciones matemáticas?\n\n¡JA, JA, JA! ¡Adelante, héroes! ¡Veamos si pueden calcular cómo derrotar al monstruo que ustedes mismos ayudaron a crear.\n\n¡BIENVENIDOS A LOS PICOS DE CÁLCULO!" }
];
 
// Lore del Devorador de los Prados
const loreDevoradorData = [
  { img: "https://i.postimg.cc/7bvtpwhW/Monstruo-del-compost-en-el-valle-(1).png", text: "¡ÑAM, ÑAM, ÑAAAAAM! ¡Qué delicioso olor a comida podrida! ¡Cáscaras, frutas pasadas, verduras olvidadas! ¡Todo termina en mi enorme barriga!\n\n¿Ves estas raíces? ¿Estas hojas? ¿Este cuerpo gigantesco? ¡Todo creció gracias a los desperdicios de los habitantes de Mathbound!" },
  { img: "https://i.postimg.cc/MXk3hqHs/Residuos-en-el-prado-de-Mathbound-(1).png", text: "¡Cada resto orgánico me alimenta! ¡Cada bolsa de basura me hace más grande! ¡Y cada día los prados están más llenos de comida para mí!" },
  { img: "https://i.postimg.cc/ZRRQNwXs/Guardian-Golem-del-Compost-(1).png", text: "¡JA, JA, JA! ¿Crees que puedes detenerme? ¡Tendrás que aprender a pensar antes de tirar!" }
];
 
const tutorialLevels = [
  { // 1
    equation: "21 - 2 + 3 × 3",
    choices: [
      { text: "21 - 2", ans: 19, correctOrder: false, next: { equation: "19 + 3 × 3", choices: [
          { text: "19 + 3", ans: 22, correctOrder: false, next: { equation: "22 × 3", choices: [{ text: "22 × 3", ans: 66, correctOrder: false, next: null }] } },
          { text: "3 × 3", ans: 9, correctOrder: true, next: { equation: "19 + 9", choices: [{ text: "19 + 9", ans: 28, correctOrder: true, next: null }] } }
      ]}},
      { text: "2 + 3", ans: 5, correctOrder: false, next: { equation: "21 - 5 × 3", choices: [
          { text: "21 - 5", ans: 16, correctOrder: false, next: { equation: "16 × 3", choices: [{ text: "16 × 3", ans: 48, correctOrder: false, next: null }] } },
          { text: "5 × 3", ans: 15, correctOrder: true, next: { equation: "21 - 15", choices: [{ text: "21 - 15", ans: 6, correctOrder: true, next: null }] } }
      ]}},
      { text: "3 × 3", ans: 9, correctOrder: true, next: { equation: "21 - 2 + 9", choices: [
          { text: "21 - 2", ans: 19, correctOrder: true, next: { equation: "19 + 9", choices: [{ text: "19 + 9", ans: 28, correctOrder: true, next: null }] } },
          { text: "2 + 9", ans: 11, correctOrder: false, next: { equation: "21 - 11", choices: [{ text: "21 - 11", ans: 10, correctOrder: false, next: null }] } }
      ]}}
    ]
  },
  { // 2
    equation: "48 ÷ 2 × 6 - 4",
    choices: [
      { text: "48 ÷ 2", ans: 24, correctOrder: true, next: { equation: "24 × 6 - 4", choices: [
          { text: "24 × 6", ans: 144, correctOrder: true, next: { equation: "144 - 4", choices: [{ text: "144 - 4", ans: 140, correctOrder: true, next: null }] } },
          { text: "6 - 4", ans: 2, correctOrder: false, next: { equation: "24 × 2", choices: [{ text: "24 × 2", ans: 48, correctOrder: false, next: null }] } }
      ]}},
      { text: "2 × 6", ans: 12, correctOrder: false, next: { equation: "48 ÷ 12 - 4", choices: [
          { text: "48 ÷ 12", ans: 4, correctOrder: true, next: { equation: "4 - 4", choices: [{ text: "4 - 4", ans: 0, correctOrder: true, next: null }] } },
          { text: "12 - 4", ans: 8, correctOrder: false, next: { equation: "48 ÷ 8", choices: [{ text: "48 ÷ 8", ans: 6, correctOrder: false, next: null }] } }
      ]}},
      { text: "6 - 4", ans: 2, correctOrder: false, next: { equation: "48 ÷ 2 × 2", choices: [
          { text: "48 ÷ 2", ans: 24, correctOrder: true, next: { equation: "24 × 2", choices: [{ text: "24 × 2", ans: 48, correctOrder: true, next: null }] } },
          { text: "2 × 2", ans: 4, correctOrder: false, next: { equation: "48 ÷ 4", choices: [{ text: "48 ÷ 4", ans: 12, correctOrder: false, next: null }] } }
      ]}}
    ]
  },
  { // 3
    equation: "80 ÷ 4 × 2 + 2",
    choices: [
      { text: "80 ÷ 4", ans: 20, correctOrder: true, next: { equation: "20 × 2 + 2", choices: [
          { text: "20 × 2", ans: 40, correctOrder: true, next: { equation: "40 + 2", choices: [{ text: "40 + 2", ans: 42, correctOrder: true, next: null }] } },
          { text: "2 + 2", ans: 4, correctOrder: false, next: { equation: "20 × 4", choices: [{ text: "20 × 4", ans: 80, correctOrder: false, next: null }] } }
      ]}},
      { text: "4 × 2", ans: 8, correctOrder: false, next: { equation: "80 ÷ 8 + 2", choices: [
          { text: "80 ÷ 8", ans: 10, correctOrder: true, next: { equation: "10 + 2", choices: [{ text: "10 + 2", ans: 12, correctOrder: true, next: null }] } },
          { text: "8 + 2", ans: 10, correctOrder: false, next: { equation: "80 ÷ 10", choices: [{ text: "80 ÷ 10", ans: 8, correctOrder: false, next: null }] } }
      ]}},
      { text: "2 + 2", ans: 4, correctOrder: false, next: { equation: "80 ÷ 4 × 4", choices: [
          { text: "80 ÷ 4", ans: 20, correctOrder: true, next: { equation: "20 × 4", choices: [{ text: "20 × 4", ans: 80, correctOrder: true, next: null }] } },
          { text: "4 × 4", ans: 16, correctOrder: false, next: { equation: "80 ÷ 16", choices: [{ text: "80 ÷ 16", ans: 5, correctOrder: false, next: null }] } }
      ]}}
    ]
  },
  { // 4
    equation: "5 × 2 + 3 × 3",
    choices: [
      { text: "5 × 2", ans: 10, correctOrder: true, next: { equation: "10 + 3 × 3", choices: [
          { text: "10 + 3", ans: 13, correctOrder: false, next: { equation: "13 × 3", choices: [{ text: "13 × 3", ans: 39, correctOrder: false, next: null }] } },
          { text: "3 × 3", ans: 9, correctOrder: true, next: { equation: "10 + 9", choices: [{ text: "10 + 9", ans: 19, correctOrder: true, next: null }] } }
      ]}},
      { text: "2 + 3", ans: 5, correctOrder: false, next: { equation: "5 × 5 × 3", choices: [
          { text: "5 × 5", ans: 25, correctOrder: true, next: { equation: "25 × 3", choices: [{ text: "25 × 3", ans: 75, correctOrder: true, next: null }] } },
          { text: "5 × 3", ans: 15, correctOrder: true, next: { equation: "5 × 15", choices: [{ text: "5 × 15", ans: 75, correctOrder: true, next: null }] } }
      ]}},
      { text: "3 × 3", ans: 9, correctOrder: true, next: { equation: "5 × 2 + 9", choices: [
          { text: "5 × 2", ans: 10, correctOrder: true, next: { equation: "10 + 9", choices: [{ text: "10 + 9", ans: 19, correctOrder: true, next: null }] } },
          { text: "2 + 9", ans: 11, correctOrder: false, next: { equation: "5 × 11", choices: [{ text: "5 × 11", ans: 55, correctOrder: false, next: null }] } }
      ]}}
    ]
  },
  { // 5
    equation: "4 + (49 - 19) ÷ 6 + 1",
    choices: [
      { text: "49 - 19", ans: 30, correctOrder: true, next: { equation: "4 + 30 ÷ 6 + 1", choices: [
          { text: "4 + 30", ans: 34, correctOrder: false, next: { equation: "34 ÷ 6 + 1", choices: [{ text: "34 ÷ 6 (usa 5.66)", ans: 5.66, correctOrder: true, next: { equation: "5.66 + 1", choices: [{ text: "5.66 + 1", ans: 6.66, correctOrder: true, next: null }] } }] } },
          { text: "30 ÷ 6", ans: 5, correctOrder: true, next: { equation: "4 + 5 + 1", choices: [
              { text: "4 + 5", ans: 9, correctOrder: true, next: { equation: "9 + 1", choices: [{ text: "9 + 1", ans: 10, correctOrder: true, next: null }] } },
              { text: "5 + 1", ans: 6, correctOrder: true, next: { equation: "4 + 6", choices: [{ text: "4 + 6", ans: 10, correctOrder: true, next: null }] } }
          ]}},
          { text: "6 + 1", ans: 7, correctOrder: false, next: { equation: "4 + 30 ÷ 7", choices: [{ text: "30 ÷ 7 (usa 4.28)", ans: 4.28, correctOrder: true, next: { equation: "4 + 4.28", choices: [{ text: "4 + 4.28", ans: 8.28, correctOrder: true, next: null }] } }] } }
      ]}},
      { text: "6 + 1", ans: 7, correctOrder: false, next: { equation: "4 + (49 - 19) ÷ 7", choices: [
          { text: "49 - 19", ans: 30, correctOrder: true, next: { equation: "4 + 30 ÷ 7", choices: [{ text: "30 ÷ 7 (usa 4.28)", ans: 4.28, correctOrder: true, next: { equation: "4 + 4.28", choices: [{ text: "4 + 4.28", ans: 8.28, correctOrder: true, next: null }] } }] } }
      ]}}
    ]
  },
  { // 6
    equation: "20 + 4 × 10 - 9 × 2",
    choices: [
      { text: "20 + 4", ans: 24, correctOrder: false, next: { equation: "24 × 10 - 9 × 2", choices: [
          { text: "24 × 10", ans: 240, correctOrder: true, next: { equation: "240 - 9 × 2", choices: [
              { text: "240 - 9", ans: 231, correctOrder: false, next: { equation: "231 × 2", choices: [{ text: "231 × 2", ans: 462, correctOrder: false, next: null }] } },
              { text: "9 × 2", ans: 18, correctOrder: true, next: { equation: "240 - 18", choices: [{ text: "240 - 18", ans: 222, correctOrder: true, next: null }] } }
          ]}}
      ]}},
      { text: "4 × 10", ans: 40, correctOrder: true, next: { equation: "20 + 40 - 9 × 2", choices: [
          { text: "20 + 40", ans: 60, correctOrder: true, next: { equation: "60 - 9 × 2", choices: [
              { text: "60 - 9", ans: 51, correctOrder: false, next: { equation: "51 × 2", choices: [{ text: "51 × 2", ans: 102, correctOrder: false, next: null }] } },
              { text: "9 × 2", ans: 18, correctOrder: true, next: { equation: "60 - 18", choices: [{ text: "60 - 18", ans: 42, correctOrder: true, next: null }] } }
          ]}},
          { text: "9 × 2", ans: 18, correctOrder: true, next: { equation: "20 + 40 - 18", choices: [
              { text: "20 + 40", ans: 60, correctOrder: true, next: { equation: "60 - 18", choices: [{ text: "60 - 18", ans: 42, correctOrder: true, next: null }] } },
              { text: "40 - 18", ans: 22, correctOrder: true, next: { equation: "20 + 22", choices: [{ text: "20 + 22", ans: 42, correctOrder: true, next: null }] } }
          ]}}
      ]}},
      { text: "10 - 9", ans: 1, correctOrder: false, next: { equation: "20 + 4 × 1 × 2", choices: [
          { text: "4 × 1", ans: 4, correctOrder: true, next: { equation: "20 + 4 × 2", choices: [{ text: "4 × 2", ans: 8, correctOrder: true, next: { equation: "20 + 8", choices: [{ text: "20 + 8", ans: 28, correctOrder: true, next: null }] } }] } }
      ]}},
      { text: "9 × 2", ans: 18, correctOrder: true, next: { equation: "20 + 4 × 10 - 18", choices: [
          { text: "4 × 10", ans: 40, correctOrder: true, next: { equation: "20 + 40 - 18", choices: [
              { text: "20 + 40", ans: 60, correctOrder: true, next: { equation: "60 - 18", choices: [{ text: "60 - 18", ans: 42, correctOrder: true, next: null }] } }
          ]}}
      ]}}
    ]
  },
  { // 7
    equation: "32 - 2 × (9 + 11) ÷ 4",
    choices: [
      { text: "32 - 2", ans: 30, correctOrder: false, next: { equation: "30 × (9 + 11) ÷ 4", choices: [
          { text: "9 + 11", ans: 20, correctOrder: true, next: { equation: "30 × 20 ÷ 4", choices: [
              { text: "30 × 20", ans: 600, correctOrder: true, next: { equation: "600 ÷ 4", choices: [{ text: "600 ÷ 4", ans: 150, correctOrder: true, next: null }] } }
          ]}}
      ]}},
      { text: "9 + 11", ans: 20, correctOrder: true, next: { equation: "32 - 2 × 20 ÷ 4", choices: [
          { text: "32 - 2", ans: 30, correctOrder: false, next: { equation: "30 × 20 ÷ 4", choices: [{ text: "30 × 20", ans: 600, correctOrder: true, next: { equation: "600 ÷ 4", choices: [{ text: "600 ÷ 4", ans: 150, correctOrder: true, next: null }] } }] } },
          { text: "2 × 20", ans: 40, correctOrder: true, next: { equation: "32 - 40 ÷ 4", choices: [
              { text: "32 - 40", ans: -8, correctOrder: false, next: { equation: "-8 ÷ 4", choices: [{ text: "-8 ÷ 4", ans: -2, correctOrder: false, next: null }] } },
              { text: "40 ÷ 4", ans: 10, correctOrder: true, next: { equation: "32 - 10", choices: [{ text: "32 - 10", ans: 22, correctOrder: true, next: null }] } }
          ]}},
          { text: "20 ÷ 4", ans: 5, correctOrder: true, next: { equation: "32 - 2 × 5", choices: [
              { text: "2 × 5", ans: 10, correctOrder: true, next: { equation: "32 - 10", choices: [{ text: "32 - 10", ans: 22, correctOrder: true, next: null }] } }
          ]}}
      ]}}
    ]
  },
  { // 8
    equation: "(60 - 30) ÷ 10 × 16 ÷ 8",
    choices: [
      { text: "60 - 30", ans: 30, correctOrder: true, next: { equation: "30 ÷ 10 × 16 ÷ 8", choices: [
          { text: "30 ÷ 10", ans: 3, correctOrder: true, next: { equation: "3 × 16 ÷ 8", choices: [
              { text: "3 × 16", ans: 48, correctOrder: true, next: { equation: "48 ÷ 8", choices: [{ text: "48 ÷ 8", ans: 6, correctOrder: true, next: null }] } },
              { text: "16 ÷ 8", ans: 2, correctOrder: true, next: { equation: "3 × 2", choices: [{ text: "3 × 2", ans: 6, correctOrder: true, next: null }] } }
          ]}},
          { text: "10 × 16", ans: 160, correctOrder: false, next: { equation: "30 ÷ 160 ÷ 8", choices: [
              { text: "30 ÷ 160", ans: 0.1875, correctOrder: true, next: { equation: "0.1875 ÷ 8", choices: [{ text: "0.1875 ÷ 8 (usa 0.0234)", ans: 0.0234, correctOrder: true, next: null }] } }
          ]}},
          { text: "16 ÷ 8", ans: 2, correctOrder: true, next: { equation: "30 ÷ 10 × 2", choices: [
              { text: "30 ÷ 10", ans: 3, correctOrder: true, next: { equation: "3 × 2", choices: [{ text: "3 × 2", ans: 6, correctOrder: true, next: null }] } }
          ]}}
      ]}},
      { text: "10 × 16", ans: 160, correctOrder: false, next: { equation: "(60 - 30) ÷ 160 ÷ 8", choices: [
          { text: "60 - 30", ans: 30, correctOrder: true, next: { equation: "30 ÷ 160 ÷ 8", choices: [
              { text: "30 ÷ 160", ans: 0.1875, correctOrder: true, next: { equation: "0.1875 ÷ 8", choices: [{ text: "0.1875 ÷ 8 (usa 0.0234)", ans: 0.0234, correctOrder: true, next: null }] } }
          ]}}
      ]}},
      { text: "16 ÷ 8", ans: 2, correctOrder: true, next: { equation: "(60 - 30) ÷ 10 × 2", choices: [
          { text: "60 - 30", ans: 30, correctOrder: true, next: { equation: "30 ÷ 10 × 2", choices: [
              { text: "30 ÷ 10", ans: 3, correctOrder: true, next: { equation: "3 × 2", choices: [{ text: "3 × 2", ans: 6, correctOrder: true, next: null }] } }
          ]}}
      ]}}
    ]
  }
];
 
let currentLoreIndex = 0;
let isTyping = false;
let typeInterval;
let currentExerciseIndex = 0;
let currentNode = null;
let selectedChoice = null;
let keptHierarchy = true;
 
// Lore activo (tutorial, Gólem o Devorador), su orador y qué hacer al terminar
let loreActual = loreData;
let loreOrador = 'Tutor Pólya';
let loreAlTerminar = null;
 
// --- FUNCIONES DEL LORE ---
function iniciarMisionTutorial() {
  // Ciudad Central queda deshabilitada tras completar el tutorial
  if (jugador.tutorialCompletado) return;
 
  document.getElementById('map-screen').style.display = 'none';
  document.getElementById('tutorial-screen').style.display = 'flex';
  document.getElementById('tutorial-lore-view').style.display = 'flex';
  document.getElementById('tutorial-game-view').style.display = 'none';
 
  loreActual = loreData;
  loreOrador = 'Tutor Pólya';
  loreAlTerminar = iniciarJuegoTutorial;
  currentLoreIndex = 0;
  mostrarPantallaLore();
}
 
// Lore del Gólem de la Chatarra (se abre desde la ficha del monstruo)
function iniciarLoreGolem() {
  document.getElementById('monster-intro-screen').style.display = 'none';
  document.getElementById('tutorial-screen').style.display = 'flex';
  document.getElementById('tutorial-lore-view').style.display = 'flex';
  document.getElementById('tutorial-game-view').style.display = 'none';
 
  loreActual = loreGolemData;
  loreOrador = 'Gólem de la Chatarra';
  loreAlTerminar = terminarLoreGolem;
  currentLoreIndex = 0;
  mostrarPantallaLore();
}
 
function terminarLoreGolem() {
  iniciarCombate();
}
 
// Lore del Devorador de los Prados (se abre desde la ficha del monstruo)
function iniciarLoreDevorador() {
  document.getElementById('devorador-intro-screen').style.display = 'none';
  document.getElementById('tutorial-screen').style.display = 'flex';
  document.getElementById('tutorial-lore-view').style.display = 'flex';
  document.getElementById('tutorial-game-view').style.display = 'none';
 
  loreActual = loreDevoradorData;
  loreOrador = 'El Devorador de los Prados';
  loreAlTerminar = terminarLoreDevorador;
  currentLoreIndex = 0;
  mostrarPantallaLore();
}
 
function terminarLoreDevorador() {
  iniciarCombate2();
}
 
function mostrarPantallaLore() {
  const data = loreActual[currentLoreIndex];
  document.getElementById('lore-speaker').innerText = loreOrador;
  document.getElementById('lore-image').src = data.img;
  escribirTextoEnCaja(data.text);
}
 
function escribirTextoEnCaja(texto) {
  const textContainer = document.getElementById('dialogue-text');
  textContainer.innerHTML = '';
  clearInterval(typeInterval);
  isTyping = true;
  let i = 0;
 
  typeInterval = setInterval(() => {
    textContainer.innerHTML += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(typeInterval);
      isTyping = false;
    }
  }, 25);
}
 
function avanzarLore() {
  if (isTyping) {
    clearInterval(typeInterval);
    document.getElementById('dialogue-text').innerHTML = loreActual[currentLoreIndex].text;
    isTyping = false;
  } else {
    currentLoreIndex++;
    if (currentLoreIndex < loreActual.length) {
      mostrarPantallaLore();
    } else if (loreAlTerminar) {
      loreAlTerminar();
    }
  }
}
 
// --- FUNCIONES DEL SIMULADOR TUTORIAL ---
function iniciarJuegoTutorial() {
  document.getElementById('tutorial-lore-view').style.display = 'none';
  document.getElementById('tutorial-game-view').style.display = 'flex';
 
  document.getElementById('tut-display-name').innerText = jugador.nombre.toUpperCase();
  document.getElementById('tut-display-level').innerText = jugador.nivel;
  document.getElementById('tut-display-hp').innerText = jugador.hp;
  document.getElementById('tut-hp-bar').style.width = `${(jugador.hp / jugador.hpMax) * 100}%`;
 
  currentExerciseIndex = 0;
  cargarEjercicioTutorial();
}
 
// Entrega la recompensa una sola vez y marca el tutorial como completado
function completarTutorial() {
  let msj = '';
  if (!jugador.tutorialCompletado) {
    jugador.tutorialCompletado = true;
    msj = otorgarRecompensa(RECOMPENSA_TUTORIAL.xp, RECOMPENSA_TUTORIAL.oro);
    guardarDatos();
  }
  return msj;
}
 
function cargarEjercicioTutorial() {
  if(currentExerciseIndex >= tutorialLevels.length) {
    const msjRecompensa = completarTutorial();
    alert("🎉 ¡Entrenamiento completado!\n\nHas dominado la jerarquía de operaciones y estás listo para salir al campo de batalla." +
      (msjRecompensa ? "\n\n" + msjRecompensa + "\n\nVe a la tienda y elige el set con el que iniciarás tu aventura." : ""));
    salirTutorial();
    return;
  }
 
  keptHierarchy = true;
  document.getElementById('current-ex-num').innerText = currentExerciseIndex + 1;
  document.getElementById('exercise-history').innerHTML = '';
 
  currentNode = tutorialLevels[currentExerciseIndex];
  renderizarNodo();
}
 
function renderizarNodo() {
  document.getElementById('current-equation').innerText = currentNode.equation;
  document.getElementById('calculator-panel').style.display = 'none';
  document.getElementById('options-container').style.display = 'flex';
  document.getElementById('instruction-text').style.display = 'block';
 
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
 
  currentNode.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'math-choice-btn';
    btn.innerText = choice.text;
    btn.onclick = () => seleccionarOpcion(index);
    optionsContainer.appendChild(btn);
  });
}
 
function seleccionarOpcion(index) {
  selectedChoice = currentNode.choices[index];
 
  if (!selectedChoice.correctOrder) {
    keptHierarchy = false;
  }
 
  document.getElementById('options-container').style.display = 'none';
  document.getElementById('instruction-text').style.display = 'none';
  document.getElementById('calculator-panel').style.display = 'block';
  document.getElementById('calc-prompt-text').innerText = selectedChoice.text;
  document.getElementById('calc-input').value = '';
  document.getElementById('calc-input').focus();
}
 
function verificarPasoTutorial() {
  const inputEl = document.getElementById('calc-input');
  const userVal = parseFloat(inputEl.value);
  if(isNaN(userVal)) return;
 
  if (userVal === selectedChoice.ans) {
    agregarLineaHistoria(`${selectedChoice.text} = ${selectedChoice.ans}`);
 
    if (selectedChoice.next) {
      currentNode = selectedChoice.next;
      renderizarNodo();
    } else {
      document.getElementById('calculator-panel').style.display = 'none';
      document.getElementById('current-equation').innerHTML = `<span style="color:#2ecc71;">= ${selectedChoice.ans}</span>`;
 
      setTimeout(() => {
        if (keptHierarchy) {
          alert("✅ ¡Perfecto! Respetaste correctamente la jerarquía de las operaciones.");
        } else {
          alert("⚠️ Completaste el ejercicio, PERO alteraste la jerarquía de operaciones (PEMDAS). ¡Recuerda resolver siempre agrupaciones, luego multiplicaciones/divisiones, y al final sumas/restas!");
        }
        currentExerciseIndex++;
        cargarEjercicioTutorial();
      }, 800);
    }
  } else {
    inputEl.style.backgroundColor = '#ff7675';
    inputEl.style.color = '#fff';
    setTimeout(() => { inputEl.style.backgroundColor = ''; inputEl.style.color = ''; inputEl.value = ''; }, 500);
  }
}
 
function agregarLineaHistoria(texto) {
  const div = document.createElement('div');
  div.className = 'math-line';
  div.innerText = texto;
  document.getElementById('exercise-history').appendChild(div);
}
 
function salirTutorial() {
  document.getElementById('tutorial-screen').style.display = 'none';
  // Vuelve a la pantalla de personaje/tienda
  document.getElementById('app-screen').style.display = 'flex';
  actualizarInterfaz();
}
 
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && document.getElementById('tutorial-game-view').style.display === 'flex') {
      verificarPasoTutorial();
    }
  });
});
 
 
 
// Pulsar Enter en el campo del nombre = botón ENTRAR; en el de códigos = CANJEAR
document.addEventListener('DOMContentLoaded', () => {
  const u = document.getElementById('username-input');
  if (u) u.addEventListener('keydown', e => { if (e.key === 'Enter') iniciarSesion(); });
  const c = document.getElementById('codigo-input');
  if (c) c.addEventListener('keydown', e => { if (e.key === 'Enter') canjearCodigo(); });
  // Combate 2: Enter en la modelación = generar ejercicio; Enter en la calculadora = verificar paso
  const m = document.getElementById('in-modelo2');
  if (m) m.addEventListener('keydown', e => { if (e.key === 'Enter') generarEjercicio2(); });
  const k = document.getElementById('combat2-calc-input');
  if (k) k.addEventListener('keydown', e => { if (e.key === 'Enter') verificarPaso2(); });
});
 
// ================== COMBATE: GÓLEM DE LA CHATARRA ==================
const COMBATE_CFG = { danoBase: 40, multMax: 2.5, multPenal: 0.5, multMin: 1, problemasMin: 5, erroresMax: 3 };
const SIMBOLOS_OP = { '+': '+', '-': '−', '*': '×', '/': '÷' };
 
// --- REGLAS DE COMBATE SEGÚN EL SET EQUIPADO ---
// Set completo: 5 problemas perfectos para vencer / 3 fallos para perder.
// Set parcial (al menos 1 pieza): 8 problemas / 2 fallos.
// Sin set: 8 problemas / 1 fallo.
// La vida del monstruo es siempre la misma (500); con menos set el daño por ataque baja
// (para necesitar 8 problemas) y los golpes del monstruo son más fuertes (menos fallos permitidos).
const PIEZAS_SET = {
  calculo: ['calculo_botas', 'calculo_armadura', 'calculo_arma'],
  logico: ['logico_botas', 'logico_armadura', 'logico_espada']
};
const COMBATE_REGLAS = {
  completo: { problemasMin: 5, erroresMax: 3 },
  parcial:  { problemasMin: 8, erroresMax: 2 },
  ninguno:  { problemasMin: 8, erroresMax: 1 }
};
function reglasSet(setId) {
  const piezas = PIEZAS_SET[setId].filter(id => jugador.equipado.includes(id)).length;
  const nivel = piezas === 3 ? 'completo' : (piezas > 0 ? 'parcial' : 'ninguno');
  const r = COMBATE_REGLAS[nivel];
  const monMax = COMBATE_CFG.problemasMin * COMBATE_CFG.danoBase * COMBATE_CFG.multMax; // 500
  const danoBase = monMax / (r.problemasMin * COMBATE_CFG.multMax);
  return { piezas: piezas, nivel: nivel, problemasMin: r.problemasMin, erroresMax: r.erroresMax, monMax: monMax, danoBase: danoBase };
}
// Mensaje que se muestra al ingresar a una región
function htmlInfoSet(setId) {
  const r = reglasSet(setId);
  const nombre = setId === 'calculo' ? 'Set del Cálculo' : 'Set Lógico';
  const estado = r.nivel === 'completo' ? '✅ Tienes el ' + nombre + ' completo equipado.'
    : r.nivel === 'parcial' ? '⚠️ Solo tienes ' + r.piezas + ' de 3 piezas del ' + nombre + ' equipadas.'
    : '❌ No tienes ninguna pieza del ' + nombre + ' equipada.';
  const fila = (clave, texto) => '<div class="set-fila' + (r.nivel === clave ? ' activa' : '') + '">' + texto + '</div>';
  return '<p class="set-estado">' + estado + '</p>' +
    fila('completo', '🛡️ Set completo: se vence con <strong>5 problemas</strong> perfectos y se pierde con <strong>3 fallos</strong>.') +
    fila('parcial', '⚠️ Al menos una pieza: <strong>8 problemas</strong> y <strong>2 fallos</strong>.') +
    fila('ninguno', '❌ Sin ninguna pieza: <strong>8 problemas</strong> y <strong>1 fallo</strong>.') +
    '<p class="set-nota">Sin el set completo harás menos daño y los golpes del monstruo serán más poderosos.</p>';
}
 
// Palabras clave (sin tildes, en minúscula) con las que el estudiante puede nombrar cada operación
// al DESCRIBIR su plan. Basta que aparezca una alternativa de cada operación necesaria.
const PALABRAS_OP = {
  '+': ['sum', 'agreg', 'anad', 'junt', 'adicion', 'aument', 'acumul'],
  '-': ['rest', 'quit', 'descont', 'sustra', 'disminu', 'menos', 'reduc', 'retir'],
  '*': ['multip', 'veces', 'producto', ' por '],
  '/': ['divi', 'repart', 'distribu', 'cociente', ' entre ']
};
 
// expr = modelación correcta (la respuesta se calcula sola)
// kw  = palabras clave que deben aparecer en los datos (cada grupo: basta una alternativa)
// q   = palabras clave que deben aparecer en la pregunta
// plan = palabras clave de contexto que la descripción del plan debe mencionar (basta una por grupo)
const problemasGolem = [
  // ---------- ADITIVOS (suma y resta) ----------
  { tipo: 'aditivo', texto: "En una bodega de reciclaje se recogieron 1250 latas de aluminio el lunes y 980 el martes. Si ya se enviaron a la fábrica 1430 latas, ¿cuántas latas quedan en la bodega?",
    expr: "1250+980-1430", kw: [['lata']], q: [['cuant'], ['lata']], plan: [['lata', 'lunes', 'martes', 'bodega', 'fabrica']] },
  { tipo: 'aditivo', texto: "Un barrio entregó 3450 kg de chatarra en enero, 2780 kg en febrero y 1960 kg en marzo. Si la meta del trimestre era de 9000 kg, ¿cuántos kilos le faltaron para cumplir la meta?",
    expr: "9000-(3450+2780+1960)", kw: [['kg', 'kilo']], q: [['cuant'], ['kilo', 'kg', 'falt', 'meta']], plan: [['kg', 'kilo', 'mes', 'meta', 'chatarra', 'enero', 'febrero', 'marzo']] },
  { tipo: 'aditivo', texto: "Una recicladora recibió 4820 kg de hierro, 3675 kg de cobre y 2905 kg de aluminio. Si ya vendió 6500 kg de metal, ¿cuántos kg le quedan por vender?",
    expr: "4820+3675+2905-6500", kw: [['hierro'], ['cobre']], q: [['cuant'], ['kg', 'kilo', 'vender', 'quedan']], plan: [['hierro', 'cobre', 'aluminio', 'metal', 'kg', 'kilo']] },
  { tipo: 'aditivo', texto: "Un centro de acopio tenía 15600 latas. El lunes recibió 4350 más y el martes 2870 más. Si el miércoles se llevaron 9800 latas y el jueves 5250 latas, ¿cuántas latas quedan?",
    expr: "15600+4350+2870-9800-5250", kw: [['lata']], q: [['cuant'], ['lata']], plan: [['lata', 'lunes', 'martes', 'miercoles', 'jueves', 'acopio']] },
 
  // ---------- MULTIPLICATIVOS (multiplicación y división) ----------
  { tipo: 'multiplicativo', texto: "Una fábrica de reciclaje compacta 45 computadores viejos por hora. Si trabaja 8 horas al día durante 12 días, ¿cuántos computadores compacta en total?",
    expr: "45*8*12", kw: [['computador']], q: [['cuant'], ['computador']], plan: [['computador', 'hora', 'dia']] },
  { tipo: 'multiplicativo', texto: "Un camión recoge 7200 kg de chatarra y los reparte en partes iguales en 9 contenedores. Si cada contenedor se divide en 4 cajas del mismo peso, ¿cuántos kg hay en cada caja?",
    expr: "7200/9/4", kw: [['contenedor'], ['caja']], q: [['cuant'], ['kg', 'kilo', 'caja']], plan: [['kg', 'kilo', 'chatarra', 'contenedor', 'caja', 'camion']] },
  { tipo: 'multiplicativo', texto: "Una fábrica empaca 48 cajas con 25 latas cada una y reparte todas las latas por igual en 20 puntos de recolección. ¿Cuántas latas recibe cada punto?",
    expr: "48*25/20", kw: [['caja'], ['lata']], q: [['cuant'], ['lata', 'punto']], plan: [['caja', 'lata', 'punto']] },
  { tipo: 'multiplicativo', texto: "Un lote de 14400 kg de chatarra se reparte en partes iguales entre 12 camiones. Cada camión descarga su carga en 8 contenedores iguales. ¿Cuántos kg recibe cada contenedor?",
    expr: "14400/12/8", kw: [['camion'], ['contenedor']], q: [['cuant'], ['kg', 'kilo', 'contenedor']], plan: [['kg', 'kilo', 'chatarra', 'camion', 'contenedor', 'lote']] },
 
  // ---------- MIXTOS (combinan ambos tipos) ----------
  { tipo: 'mixto', texto: "En un colegio se recolectan 125 latas cada día durante 6 días. Luego se compran 40 bolsas especiales y en cada una se empacan 15 latas. ¿Cuántas latas quedan sin empacar?",
    expr: "125*6-40*15", kw: [['lata'], ['bolsa']], q: [['cuant'], ['lata']], plan: [['lata', 'dia', 'bolsa']] },
  { tipo: 'mixto', texto: "Un taller recibió 480 piezas metálicas el lunes y 360 el martes. Las piezas se separan en cajas de 24 piezas cada una. Si cada caja se vende a 1500 pesos, ¿cuánto dinero se recibe por todas las cajas?",
    expr: "(480+360)/24*1500", kw: [['pieza'], ['caja']], q: [['cuant'], ['dinero', 'peso', 'recib']], plan: [['pieza', 'caja', 'lunes', 'martes', 'pesos', 'dinero']] },
  { tipo: 'mixto', texto: "Una cooperativa recicla en un mes 480 kg de aluminio y 350 kg de cobre. Cada kilo de aluminio se vende a 2500 pesos y cada kilo de cobre a 4000 pesos. Si gasta 800000 pesos en transporte, ¿cuánto dinero le queda?",
    expr: "480*2500+350*4000-800000", kw: [['aluminio'], ['cobre']], q: [['cuant', 'cual'], ['dinero', 'peso', 'queda', 'ganancia']], plan: [['aluminio', 'cobre', 'kilo', 'kg', 'transporte', 'pesos', 'dinero']] },
  { tipo: 'mixto', texto: "Una fábrica tiene 15 contenedores con 240 kg de chatarra cada uno. Envía 1200 kg a una planta y el resto lo reparte en partes iguales en 8 camiones. ¿Cuántos kg lleva cada camión?",
    expr: "(15*240-1200)/8", kw: [['contenedor'], ['camion']], q: [['cuant'], ['kg', 'kilo', 'camion']], plan: [['contenedor', 'camion', 'kg', 'kilo', 'chatarra', 'planta']] },
  { tipo: 'mixto', texto: "Un centro de acopio recibe cada semana 3 camiones con 850 kg de residuos metálicos cada uno. Durante 4 semanas se recibió la misma cantidad. Del total, 2400 kg eran aluminio y el resto hierro, que se reparte en 6 bodegas por igual. ¿Cuántos kg de hierro quedan en cada bodega?",
    expr: "(3*850*4-2400)/6", kw: [['camion'], ['hierro']], q: [['cuant'], ['hierro', 'bodega', 'kg', 'kilo']], plan: [['camion', 'hierro', 'aluminio', 'kg', 'kilo', 'bodega', 'semana']] },
  { tipo: 'mixto', texto: "Una empresa recicla 1250 kg de metal por día durante 5 días y 950 kg por día durante 4 días. Con todo el metal arma paquetes de 50 kg y vende cada paquete a 8000 pesos, pero paga 120000 pesos en gastos. ¿Cuánto dinero gana la empresa?",
    expr: "(1250*5+950*4)/50*8000-120000", kw: [['paquete'], ['metal', 'kg', 'kilo']], q: [['cuant', 'cual'], ['dinero', 'peso', 'gana', 'ganancia']], plan: [['paquete', 'metal', 'kg', 'kilo', 'dia', 'pesos', 'dinero', 'gastos']] }
];
 
// Orden de tipos de problema:
// - Si el estudiante hizo daño perfecto en el problema anterior: 3 mixtos, 1 aditivo, 1 multiplicativo
// - Si falló o no hizo daño perfecto: 2 aditivos, 2 multiplicativos y 1 mixto (alternando aditivo y multiplicativo)
const SECUENCIA_PERFECTA = ['mixto', 'aditivo', 'mixto', 'multiplicativo', 'mixto'];
const SECUENCIA_REFUERZO = ['aditivo', 'multiplicativo', 'aditivo', 'multiplicativo', 'mixto'];
 
 
function evaluarExpr(e) {
  return Function('"use strict"; return (' + e + ');')();
}
problemasGolem.forEach(p => { p.ans = evaluarExpr(p.expr); });
 
let combate = null;
 
function normalizarTexto(t) {
  return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/(\d)[.,](?=\d{3}(\D|$))/g, '$1');
}
function numerosDe(t) { return (normalizarTexto(t).match(/\d+/g) || []); }
function formatearExpr(e) { return e.replace(/\*/g, ' × ').replace(/\//g, ' ÷ ').replace(/-/g, ' − ').replace(/\+/g, ' + '); }
function formatearNumero(n) { return Number(n).toLocaleString('es-CO'); }
 
function iniciarCombate() {
  document.getElementById('tutorial-screen').style.display = 'none';
  document.getElementById('combat-screen').style.display = 'flex';
  document.getElementById('combat-hero-name').innerText = jugador.nombre.toUpperCase();
  document.getElementById('combat-hero-img').src = obtenerImagenAvatar();
  const reglas = reglasSet('calculo');
  document.getElementById('combat-dano').innerText = +reglas.danoBase.toFixed(1);
 
  const monMax = reglas.monMax;
  combate = {
    heroMax: jugador.hpMax, heroHP: jugador.hpMax,
    monMax: monMax, monHP: monMax,
    idx: 0, mult: COMBATE_CFG.multMax, actual: null, ocupado: false,
    danoBase: reglas.danoBase, erroresMax: reglas.erroresMax, problemasMin: reglas.problemasMin,
    ultimoPerfecto: true, ptrPerfecto: 0, ptrRefuerzo: 0,
    usados: { aditivo: 0, multiplicativo: 0, mixto: 0 }
  };
  cargarProblemaCombate();
}
 
// Elige el siguiente problema según el desempeño anterior (sirve para ambos combates)
function elegirProblemaDe(estado, lista) {
  const perfecto = estado.ultimoPerfecto;
  const secuencia = perfecto ? SECUENCIA_PERFECTA : SECUENCIA_REFUERZO;
  const clave = perfecto ? 'ptrPerfecto' : 'ptrRefuerzo';
  const tipo = secuencia[estado[clave] % secuencia.length];
  estado[clave]++;
 
  // Dentro de cada tipo la dificultad sube gradualmente (y vuelve a empezar si se agotan)
  const pool = lista.filter(p => p.tipo === tipo);
  const p = pool[estado.usados[tipo] % pool.length];
  estado.usados[tipo]++;
  return p;
}
function elegirProblemaCombate() { return elegirProblemaDe(combate, problemasGolem); }
 
function cargarProblemaCombate() {
  const p = elegirProblemaCombate();
  combate.actual = p;
  combate.mult = COMBATE_CFG.multMax;
  combate.ocupado = false;
 
  document.getElementById('combat-problem-num').innerText = 'Problema ' + (combate.idx + 1);
  document.getElementById('combat-problem-text').innerText = p.texto;
  document.getElementById('in-datos').value = '';
  document.getElementById('in-pregunta').value = '';
  document.getElementById('in-descripcion').value = '';
  document.getElementById('in-respuesta').value = '';
  document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('selected'));
  actualizarCombateUI();
}
 
function actualizarCombateUI() {
  document.getElementById('combat-hero-hp').innerText = Math.max(0, combate.heroHP);
  document.getElementById('combat-hero-hp-max').innerText = combate.heroMax;
  document.getElementById('combat-hero-hp-bar').style.width = Math.max(0, (combate.heroHP / combate.heroMax) * 100) + '%';
  document.getElementById('combat-monster-hp').innerText = Math.max(0, Math.round(combate.monHP));
  document.getElementById('combat-monster-hp-max').innerText = combate.monMax;
  document.getElementById('combat-monster-hp-bar').style.width = Math.max(0, (combate.monHP / combate.monMax) * 100) + '%';
  document.getElementById('combat-mult').innerText = String(+combate.mult.toFixed(1));
}
 
function alternarOperacion(btn) {
  btn.classList.toggle('selected');
}
 
// --- VALIDACIONES ---
function validarDatosCombate(p, datos, pregunta) {
  const textoDatos = normalizarTexto(datos);
  const numsDatos = numerosDe(datos);
  const numsReq = p.expr.match(/\d+/g);
  const numerosOk = numsReq.every(n => numsDatos.includes(n));
  const palabrasOk = p.kw.every(grupo => grupo.some(w => textoDatos.includes(w)));
 
  const textoPreg = normalizarTexto(pregunta);
  const preguntaOk = p.q.every(grupo => grupo.some(w => textoPreg.includes(w)));
  return numerosOk && palabrasOk && preguntaOk;
}
 
function validarPlanCombate(p) {
  const elegidas = Array.from(document.querySelectorAll('.op-btn.selected')).map(b => b.dataset.op).sort().join('');
  const requeridas = ['+', '-', '*', '/'].filter(o => p.expr.includes(o)).sort().join('');
  return elegidas === requeridas;
}
 
// Paso 3 (Gólem): el estudiante DESCRIBE su plan con sus palabras.
// Se valida por palabras clave: debe nombrar cada operación necesaria (sumar, restar, multiplicar,
// repartir/dividir...) y mencionar al menos un elemento del contexto del problema.
function validarDescripcionCombate(p, texto) {
  const t = ' ' + normalizarTexto(texto).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ') + ' ';
  if (t.trim().split(' ').length < 5) return false; // debe ser una descripción real, no una palabra suelta
  const ops = ['+', '-', '*', '/'].filter(o => p.expr.includes(o));
  const opsOk = ops.every(o => PALABRAS_OP[o].some(w => t.includes(w)));
  const ctxOk = (p.plan || []).every(grupo => grupo.some(w => t.includes(w)));
  return opsOk && ctxOk;
}
 
// Limpia una expresión escrita por el estudiante (×, x, ÷, −, espacios...)
function limpiarExpr(texto) {
  return normalizarTexto(texto).split('=')[0]
    .replace(/[×x·]/g, '*').replace(/[÷:]/g, '/').replace(/[−–]/g, '-').replace(/\s+/g, '');
}
 
// Modelación: la expresión debe usar los datos del problema y dar la respuesta correcta
function validarModelacionCombate(p, texto) {
  const e = limpiarExpr(texto);
  if (e === '' || !/^[0-9+\-*/().]+$/.test(e)) return false;
  const numsE = (e.match(/\d+/g) || []).sort().join(',');
  const numsReq = p.expr.match(/\d+/g).sort().join(',');
  if (numsE !== numsReq) return false;
  try {
    const val = evaluarExpr(e);
    return typeof val === 'number' && isFinite(val) && Math.abs(val - p.ans) < 1e-9;
  } catch (err) { return false; }
}
 
function validarRespuestaCombate(p, texto) {
  const t = normalizarTexto(texto).trim();
  if (t === '') return false;
  const v = parseFloat(t);
  return !isNaN(v) && Math.abs(v - p.ans) < 1e-9;
}
 
// --- MODALES ---
function mostrarModalCombate(titulo, cuerpoHTML, botones) {
  document.getElementById('combat-modal-title').innerText = titulo;
  document.getElementById('combat-modal-body').innerHTML = cuerpoHTML;
  const cont = document.getElementById('combat-modal-buttons');
  cont.innerHTML = '';
  botones.forEach(b => {
    const btn = document.createElement('button');
    btn.innerText = b.texto;
    if (b.secundario) btn.className = 'btn-secondary';
    btn.onclick = () => { cerrarModalCombate(); if (b.accion) b.accion(); };
    cont.appendChild(btn);
  });
  document.getElementById('combat-modal').style.display = 'flex';
}
 
function cerrarModalCombate() {
  document.getElementById('combat-modal').style.display = 'none';
}
 
// Bloque HTML con el código de recompensa que se muestra al vencer a un monstruo
function htmlCodigoPremio(codigo) {
  const r = codigosValidos[codigo];
  return `<p>🎁 Código de recompensa:</p>
    <div class="codigo-premio">${codigo}</div>
    <p>Canjéalo en la base (<strong>+${r.oro} 🪙</strong> y <strong>+${r.xp} XP</strong>), compra un set nuevo y elige a qué región viajar.</p>`;
}
 
// --- FLUJO DE VERIFICACIÓN ---
function verificarCombate() {
  if (!combate || combate.ocupado) return;
  mostrarModalCombate(
    '🤔 ¿Estás seguro?',
    '<p>¿Estás seguro de que tu respuesta coincide con lo que pregunta el problema?</p>',
    [
      { texto: '✅ Estoy seguro', accion: confirmarVerificacion },
      { texto: '↩ Volver a intentar', secundario: true }
    ]
  );
}
 
function confirmarVerificacion() {
  const p = combate.actual;
  combate.ocupado = true;
 
  const okDatos = validarDatosCombate(p, document.getElementById('in-datos').value, document.getElementById('in-pregunta').value);
  const okPlan = validarPlanCombate(p);
  const okDesc = validarDescripcionCombate(p, document.getElementById('in-descripcion').value);
  const okResp = validarRespuestaCombate(p, document.getElementById('in-respuesta').value);
 
  const fallosPasos = [okDatos, okPlan, okDesc].filter(x => !x).length;
  combate.ultimoPerfecto = okDatos && okPlan && okDesc && okResp;
  combate.mult = Math.max(COMBATE_CFG.multMin, COMBATE_CFG.multMax - fallosPasos * COMBATE_CFG.multPenal);
 
  const marca = ok => ok ? '✅' : '❌';
  let cuerpo = `<p style="text-align:left;line-height:1.8;">
    ${marca(okDatos)} Datos del problema<br>
    ${marca(okPlan)} Concebir un plan<br>
    ${marca(okDesc)} Descripción del plan<br>
    ${marca(okResp)} Ejecutar el plan (respuesta)</p>`;
 
  if (!okDesc) cuerpo += `<p>Recuerda que tu descripción debe nombrar las operaciones que vas a usar (sumar, restar, multiplicar, repartir...) y mencionar de qué cosas se trata el problema.</p>`;
 
  if (okResp) {
    const dano = combate.danoBase * combate.mult;
    combate.monHP -= dano;
    cuerpo += `<p style="color:#2ecc71;">¡Respuesta correcta! Multiplicador ×${+combate.mult.toFixed(1)}<br>Daño al Gólem: <strong>${Math.round(dano)}</strong></p>`;
    if (fallosPasos > 0) cuerpo += `<p>Perdiste ${fallosPasos * COMBATE_CFG.multPenal} de multiplicador por errores en los pasos del método.</p>`;
    golpeAnimacion('combat-monster-img');
  } else {
    const perdida = Math.ceil(combate.heroMax / combate.erroresMax);
    combate.heroHP -= perdida;
    cuerpo += `<p style="color:#e74c3c;">Respuesta incorrecta. Pierdes <strong>${perdida}</strong> HP.</p>
      <p>La respuesta era <strong>${formatearNumero(p.ans)}</strong><br>Operación: ${formatearExpr(p.expr)}</p>`;
    golpeAnimacion('combat-hero-panel');
  }
  actualizarCombateUI();
 
  mostrarModalCombate(okResp ? '⚔️ ¡Ataque exitoso!' : '💥 ¡El Gólem te golpea!', cuerpo, [
    { texto: 'Continuar', accion: continuarCombate }
  ]);
}
 
function golpeAnimacion(id) {
  const el = document.getElementById(id);
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
}
 
function continuarCombate() {
  if (combate.monHP <= 0) {
    jugador.golemDerrotado = true;
    guardarDatos();
    mostrarModalCombate('🎉 ¡Felicitaciones!',
      '<p>¡Has derrotado al <strong>Gólem de la Chatarra</strong>!</p><p>Con tus conocimientos de cálculo y el Método de Pólya, los Picos de Cálculo vuelven a estar a salvo. ¡Gran trabajo, Guardián de la tierra!</p>' +
      htmlCodigoPremio('POLYA01'),
      [{ texto: '🗺️ Volver al mapa', accion: salirCombate }]);
  } else if (combate.heroHP <= 0) {
    mostrarModalCombate('💀 Has sido derrotado',
      '<p>El Gólem de la Chatarra se ríe a carcajadas... ¡pero no te rindas! Repasa el método y vuelve a intentarlo desde el inicio.</p>',
      [{ texto: '🔁 Reiniciar la sección', accion: iniciarCombate }]);
  } else {
    combate.idx++;
    cargarProblemaCombate();
  }
}
 
function salirCombate() {
  cerrarModalCombate();
  document.getElementById('combat-screen').style.display = 'none';
  document.getElementById('map-screen').style.display = 'flex';
  actualizarHotspots();
}
 
 
// ================== COMBATE 2: EL DEVORADOR DE LOS PRADOS ==================
// Aquí se trabaja la MODELACIÓN: el estudiante convierte el problema en una expresión matemática,
// el sistema genera el ejercicio y el estudiante lo resuelve paso a paso (ramificado), como en el tutorial.
const COMBATE2_CFG = { danoBase: 40, multMax: 2.5, problemasMin: 5, erroresMax: 3 };
 
const problemasDevorador = [
  // ---------- ADITIVOS ----------
  { tipo: 'aditivo', texto: "En una huerta comunitaria se recogieron 1850 kg de cáscaras de fruta el lunes y 1240 kg el martes. Si ya se llevaron 1500 kg a la planta de compostaje, ¿cuántos kg de cáscaras quedan en la huerta?",
    expr: "1850+1240-1500" },
  { tipo: 'aditivo', texto: "Un mercado generó 2780 kg de residuos orgánicos en enero, 3150 kg en febrero y 2460 kg en marzo. Si la meta del trimestre era compostar 9000 kg, ¿cuántos kg le faltaron para cumplir la meta?",
    expr: "9000-(2780+3150+2460)" },
  { tipo: 'aditivo', texto: "Una pila de compost recibió 3640 kg de restos de verdura, 2875 kg de hojas secas y 1920 kg de cáscaras. Si se retiraron 5500 kg de abono ya terminado, ¿cuántos kg quedan en la pila?",
    expr: "3640+2875+1920-5500" },
  { tipo: 'aditivo', texto: "Un centro de compostaje tenía 12500 kg de residuos orgánicos. El lunes recibió 3450 kg más y el martes 2760 kg más. Si el miércoles se procesaron 8900 kg y el jueves 4350 kg, ¿cuántos kg quedan sin procesar?",
    expr: "12500+3450+2760-8900-4350" },
 
  // ---------- MULTIPLICATIVOS ----------
  { tipo: 'multiplicativo', texto: "Una planta de compostaje procesa 35 kg de residuos orgánicos por hora. Si trabaja 8 horas al día durante 15 días, ¿cuántos kg procesa en total?",
    expr: "35*8*15" },
  { tipo: 'multiplicativo', texto: "Un camión recoge 6300 kg de restos de comida y los reparte en partes iguales en 9 canecas grandes. Si cada caneca se divide en 5 bolsas del mismo peso, ¿cuántos kg hay en cada bolsa?",
    expr: "6300/9/5" },
  { tipo: 'multiplicativo', texto: "Un restaurante llena 36 baldes con 25 kg de restos de comida cada uno y reparte todo por igual entre 15 composteras. ¿Cuántos kg recibe cada compostera?",
    expr: "36*25/15" },
  { tipo: 'multiplicativo', texto: "Un lote de 9600 kg de residuos orgánicos se reparte en partes iguales entre 12 camiones. Cada camión descarga su carga en 8 composteras iguales. ¿Cuántos kg recibe cada compostera?",
    expr: "9600/12/8" },
 
  // ---------- MIXTOS ----------
  { tipo: 'mixto', texto: "En un colegio se recolectan 85 kg de cáscaras cada día durante 6 días. Luego se compran 30 bolsas biodegradables y en cada una se empacan 12 kg de cáscaras. ¿Cuántos kg quedan sin empacar?",
    expr: "85*6-30*12" },
  { tipo: 'mixto', texto: "Una huerta recibió 360 kg de hojas secas el lunes y 480 kg el martes. Las hojas se separan en sacos de 28 kg cada uno. Si cada saco de abono se vende a 4000 pesos, ¿cuánto dinero se recibe por todos los sacos?",
    expr: "(360+480)/28*4000" },
  { tipo: 'mixto', texto: "Una cooperativa produce en un mes 450 kg de abono de cáscaras y 320 kg de abono de verduras. Cada kilo del primero se vende a 1800 pesos y cada kilo del segundo a 2500 pesos. Si gasta 600000 pesos en transporte, ¿cuánto dinero le queda?",
    expr: "450*1800+320*2500-600000" },
  { tipo: 'mixto', texto: "Una planta tiene 12 tanques con 350 kg de residuos orgánicos cada uno. Envía 1200 kg a otra planta y el resto lo reparte en partes iguales en 8 composteras. ¿Cuántos kg lleva cada compostera?",
    expr: "(12*350-1200)/8" },
  { tipo: 'mixto', texto: "Un centro de acopio recibe cada semana 4 camiones con 750 kg de restos de comida cada uno. Durante 3 semanas se recibió la misma cantidad. Del total, 2400 kg eran cáscaras y el resto verduras, que se reparten en 6 composteras por igual. ¿Cuántos kg de verduras quedan en cada compostera?",
    expr: "(4*750*3-2400)/6" },
  { tipo: 'mixto', texto: "Una empresa composta 1250 kg de residuos por día durante 4 días y 900 kg por día durante 5 días. Con todo el abono arma paquetes de 50 kg y vende cada paquete a 6000 pesos, pero paga 100000 pesos en gastos. ¿Cuánto dinero gana la empresa?",
    expr: "(1250*4+900*5)/50*6000-100000" }
];
problemasDevorador.forEach(p => { p.ans = evaluarExpr(p.expr); });
 
let combate2 = null;
 
function iniciarCombate2() {
  document.getElementById('tutorial-screen').style.display = 'none';
  document.getElementById('combat2-screen').style.display = 'flex';
  document.getElementById('combat2-hero-name').innerText = jugador.nombre.toUpperCase();
  document.getElementById('combat2-hero-img').src = obtenerImagenAvatar();
  const reglas = reglasSet('logico');
  document.getElementById('combat2-dano').innerText = +reglas.danoBase.toFixed(1);
 
  const monMax = reglas.monMax;
  combate2 = {
    heroMax: jugador.hpMax, heroHP: jugador.hpMax,
    monMax: monMax, monHP: monMax,
    idx: 0, mult: COMBATE2_CFG.multMax, actual: null, ocupado: false,
    danoBase: reglas.danoBase, erroresMax: reglas.erroresMax, problemasMin: reglas.problemasMin,
    ultimoPerfecto: true, ptrPerfecto: 0, ptrRefuerzo: 0,
    usados: { aditivo: 0, multiplicativo: 0, mixto: 0 },
    // estado del ejercicio ramificado
    generado: false, toks: null, sel: null, modeloOk: false, jerarquiaOk: true
  };
  cargarProblemaCombate2();
}
 
function cargarProblemaCombate2() {
  const p = elegirProblemaDe(combate2, problemasDevorador);
  combate2.actual = p;
  combate2.ocupado = false;
  combate2.generado = false;
  combate2.toks = null;
  combate2.sel = null;
  combate2.modeloOk = false;
  combate2.jerarquiaOk = true;
 
  document.getElementById('combat2-problem-num').innerText = 'Problema ' + (combate2.idx + 1);
  document.getElementById('combat2-problem-text').innerText = p.texto;
 
  const inp = document.getElementById('in-modelo2');
  inp.value = ''; inp.disabled = false;
  document.getElementById('btn-generar2').disabled = false;
  mostrarMensajeModelo2('');
 
  document.getElementById('combat2-history').innerHTML = '';
  document.getElementById('combat2-equation').innerText = '';
  document.getElementById('combat2-instruction').innerText = 'Escribe tu modelación y pulsa GENERAR EJERCICIO para resolverla paso a paso.';
  document.getElementById('combat2-options').innerHTML = '';
  document.getElementById('combat2-calc-panel').style.display = 'none';
  actualizarCombate2UI();
}
 
function actualizarCombate2UI() {
  const c = combate2;
  document.getElementById('combat2-hero-hp').innerText = Math.max(0, c.heroHP);
  document.getElementById('combat2-hero-hp-max').innerText = c.heroMax;
  document.getElementById('combat2-hero-hp-bar').style.width = Math.max(0, (c.heroHP / c.heroMax) * 100) + '%';
  document.getElementById('combat2-monster-hp').innerText = Math.max(0, Math.round(c.monHP));
  document.getElementById('combat2-monster-hp-max').innerText = c.monMax;
  document.getElementById('combat2-monster-hp-bar').style.width = Math.max(0, (c.monHP / c.monMax) * 100) + '%';
  document.getElementById('combat2-mult').innerText = String(+c.mult.toFixed(1));
}
 
function mostrarMensajeModelo2(msg) {
  document.getElementById('combat2-msg').innerText = msg;
}
 
// --- Motor de pasos: convierte la modelación en un ejercicio ramificado ---
function fmtNum(n) { return String(+Number(n).toFixed(4)); }
 
// Convierte el texto limpio en una lista de fichas; devuelve null si la sintaxis no es válida
function tokenizarExpr(e) {
  if (!/^[0-9+\-*/().]+$/.test(e)) return null;
  const toks = [];
  const re = /(\d+(?:\.\d+)?)|([+\-*/])|([()])/g;
  let m, pos = 0;
  while ((m = re.exec(e)) !== null) {
    if (m.index !== pos) return null;
    pos = re.lastIndex;
    if (m[1] !== undefined) toks.push({ t: 'n', v: parseFloat(m[1]) });
    else if (m[2] !== undefined) toks.push({ t: 'o', v: m[2] });
    else toks.push({ t: m[3] });
  }
  if (pos !== e.length || toks.length === 0) return null;
 
  let depth = 0, prev = null;
  for (const k of toks) {
    if (k.t === 'n') { if (prev === 'n' || prev === ')') return null; }
    else if (k.t === 'o') { if (prev === null || prev === 'o' || prev === '(') return null; }
    else if (k.t === '(') { if (prev === 'n' || prev === ')') return null; depth++; }
    else { if (prev === 'o' || prev === '(' || prev === null) return null; depth--; if (depth < 0) return null; }
    prev = k.t;
  }
  if (depth !== 0 || prev === 'o' || prev === '(') return null;
  return colapsarParentesis(toks);
}
 
// Quita paréntesis que solo rodean un número: ( 5 ) -> 5
function colapsarParentesis(toks) {
  const arr = toks.slice();
  let cambio = true;
  while (cambio) {
    cambio = false;
    for (let k = 0; k + 2 < arr.length; k++) {
      if (arr[k].t === '(' && arr[k + 1].t === 'n' && arr[k + 2].t === ')') {
        arr.splice(k, 3, arr[k + 1]); cambio = true; break;
      }
    }
  }
  return arr;
}
 
function tokensATexto(toks) {
  let s = '';
  toks.forEach(k => {
    if (k.t === 'n') s += fmtNum(k.v);
    else if (k.t === 'o') s += ' ' + SIMBOLOS_OP[k.v] + ' ';
    else s += k.t;
  });
  return s;
}
 
function evalTokens(toks) {
  const s = toks.map(k => k.t === 'n' ? (k.v < 0 ? '(' + k.v + ')' : String(k.v)) : (k.t === 'o' ? k.v : k.t)).join('');
  return evaluarExpr(s);
}
 
function calcularOp(a, o, b) {
  const r = o === '+' ? a + b : o === '-' ? a - b : o === '*' ? a * b : a / b;
  return +r.toFixed(10);
}
 
// Posiciones i donde hay "número operador número" (operaciones que se pueden resolver ahora)
function opcionesPaso(toks) {
  const res = [];
  for (let i = 0; i + 2 < toks.length; i++) {
    if (toks[i].t === 'n' && toks[i + 1].t === 'o' && toks[i + 2].t === 'n') {
      if (toks[i + 1].v === '/' && toks[i + 2].v === 0) continue; // no se divide por cero
      res.push(i);
    }
  }
  return res;
}
 
function aplicarPaso(toks, i, val) {
  const nuevo = toks.slice(0, i).concat([{ t: 'n', v: val }], toks.slice(i + 3));
  return colapsarParentesis(nuevo);
}
 
// Límites del grupo (paréntesis o expresión completa) que contiene la posición i
function limitesGrupo(toks, i) {
  let ini = 0, d = 0;
  for (let k = i; k >= 0; k--) {
    if (toks[k].t === ')') d++;
    else if (toks[k].t === '(') { if (d === 0) { ini = k + 1; break; } d--; }
  }
  let fin = toks.length - 1; d = 0;
  for (let k = i; k < toks.length; k++) {
    if (toks[k].t === '(') d++;
    else if (toks[k].t === ')') { if (d === 0) { fin = k - 1; break; } d--; }
  }
  return [ini, fin];
}
 
// ¿Resolver esta operación ahora respeta la jerarquía?
// 1) paréntesis primero (solo grupos sin paréntesis internos), 2) × y ÷ antes que + y −,
// 3) y el resultado final no debe cambiar respecto a resolver en el orden correcto.
function pasoEsCorrecto(toks, i) {
  const [ini, fin] = limitesGrupo(toks, i);
  const grupo = toks.slice(ini, fin + 1);
  if (grupo.some(k => k.t === '(' || k.t === ')')) return false;
  const prec = o => (o === '*' || o === '/') ? 2 : 1;
  const maxPrec = Math.max(...grupo.filter(k => k.t === 'o').map(k => prec(k.v)));
  if (prec(toks[i + 1].v) !== maxPrec) return false;
  const val = calcularOp(toks[i].v, toks[i + 1].v, toks[i + 2].v);
  const nuevo = aplicarPaso(toks, i, val);
  const a = evalTokens(nuevo), b = evalTokens(toks);
  return Math.abs(a - b) < 1e-6 * Math.max(1, Math.abs(b));
}
 
// --- Generar el ejercicio a partir de la modelación ---
function generarEjercicio2() {
  if (!combate2 || combate2.ocupado || combate2.generado) return;
  const texto = document.getElementById('in-modelo2').value;
  const e = limpiarExpr(texto);
  const toks = tokenizarExpr(e);
 
  if (!toks) {
    mostrarMensajeModelo2('La expresión no es válida. Usa solo números, + − × ÷ y paréntesis bien cerrados.');
    return;
  }
  if (!toks.some(k => k.t === 'o')) {
    mostrarMensajeModelo2('Tu modelación debe incluir al menos una operación.');
    return;
  }
 
  mostrarMensajeModelo2('');
  combate2.modeloOk = validarModelacionCombate(combate2.actual, texto);
  combate2.generado = true;
  combate2.jerarquiaOk = true;
  combate2.toks = toks;
  document.getElementById('in-modelo2').disabled = true;
  document.getElementById('btn-generar2').disabled = true;
  document.getElementById('combat2-history').innerHTML = '';
  renderizarPaso2();
}
 
function renderizarPaso2() {
  const toks = combate2.toks;
  document.getElementById('combat2-equation').innerText = tokensATexto(toks);
  document.getElementById('combat2-calc-panel').style.display = 'none';
 
  const cont = document.getElementById('combat2-options');
  cont.innerHTML = '';
  cont.style.display = 'flex';
  const instr = document.getElementById('combat2-instruction');
  instr.style.display = 'block';
 
  const opciones = opcionesPaso(toks);
  if (opciones.length === 0) {
    // Caso extremo (por ejemplo, una división por cero): no se puede continuar
    instr.innerText = 'No hay operaciones posibles (¿división por cero?).';
    combate2.jerarquiaOk = false;
    combate2.ocupado = true;
    setTimeout(evaluarCombate2, 1200);
    return;
  }
  instr.innerText = '¿Qué parte resolverás ahora?';
  opciones.forEach(i => {
    const btn = document.createElement('button');
    btn.className = 'math-choice-btn';
    btn.innerText = `${fmtNum(toks[i].v)} ${SIMBOLOS_OP[toks[i + 1].v]} ${fmtNum(toks[i + 2].v)}`;
    btn.onclick = () => seleccionarOpcion2(i);
    cont.appendChild(btn);
  });
}
 
function seleccionarOpcion2(i) {
  const toks = combate2.toks;
  const a = toks[i].v, o = toks[i + 1].v, b = toks[i + 2].v;
  const ok = pasoEsCorrecto(toks, i);
  if (!ok) combate2.jerarquiaOk = false;
  combate2.sel = { i, a, o, b, val: calcularOp(a, o, b), texto: `${fmtNum(a)} ${SIMBOLOS_OP[o]} ${fmtNum(b)}` };
 
  document.getElementById('combat2-options').style.display = 'none';
  document.getElementById('combat2-instruction').style.display = 'none';
  document.getElementById('combat2-calc-panel').style.display = 'block';
  document.getElementById('combat2-calc-prompt').innerText = combate2.sel.texto;
  const inp = document.getElementById('combat2-calc-input');
  inp.value = '';
  inp.focus();
}
 
function verificarPaso2() {
  if (!combate2 || !combate2.sel) return;
  const inp = document.getElementById('combat2-calc-input');
  const user = parseFloat(inp.value);
  if (isNaN(user)) return;
 
  const s = combate2.sel;
  const tol = Number.isInteger(s.val) ? 1e-9 : 0.01;
  if (Math.abs(user - s.val) <= tol) {
    const div = document.createElement('div');
    div.className = 'math-line';
    div.innerText = `${s.texto} = ${fmtNum(s.val)}`;
    document.getElementById('combat2-history').appendChild(div);
 
    combate2.toks = aplicarPaso(combate2.toks, s.i, s.val);
    combate2.sel = null;
 
    if (combate2.toks.length === 1) finalizarEjercicio2();
    else renderizarPaso2();
  } else {
    inp.style.backgroundColor = '#ff7675';
    inp.style.color = '#fff';
    setTimeout(() => { inp.style.backgroundColor = ''; inp.style.color = ''; inp.value = ''; }, 500);
  }
}
 
function finalizarEjercicio2() {
  combate2.ocupado = true;
  document.getElementById('combat2-calc-panel').style.display = 'none';
  document.getElementById('combat2-options').style.display = 'none';
  document.getElementById('combat2-instruction').style.display = 'none';
  document.getElementById('combat2-equation').innerHTML = `<span style="color:#2ecc71;">= ${fmtNum(combate2.toks[0].v)}</span>`;
  setTimeout(evaluarCombate2, 800);
}
 
// --- Evaluación final: modelación + procedimiento ---
function evaluarCombate2() {
  const c = combate2, p = c.actual;
  const modeloOk = c.modeloOk, procOk = c.jerarquiaOk;
  c.ultimoPerfecto = modeloOk && procOk;
 
  const marca = ok => ok ? '✅' : '❌';
  let cuerpo = `<p style="text-align:left;line-height:1.8;">
    ${marca(modeloOk)} Modelación del problema<br>
    ${marca(procOk)} Procedimiento (jerarquía de operaciones)</p>`;
  let titulo;
 
  if (modeloOk && procOk) {
    // Todo correcto: daño multiplicado
    const dano = c.danoBase * COMBATE2_CFG.multMax;
    c.mult = COMBATE2_CFG.multMax;
    c.monHP -= dano;
    titulo = '⚔️ ¡Ataque exitoso!';
    cuerpo += `<p style="color:#2ecc71;">¡Modelación y procedimiento perfectos! Multiplicador ×${+c.mult.toFixed(1)}<br>Daño al Devorador: <strong>${Math.round(dano)}</strong></p>`;
    golpeAnimacion('combat2-monster-img');
  } else if (modeloOk) {
    // Modelación correcta, procedimiento con errores: daño sin multiplicador
    const dano = c.danoBase;
    c.mult = 1;
    c.monHP -= dano;
    titulo = '⚔️ Ataque sin multiplicador';
    cuerpo += `<p style="color:#ffb142;">Tu modelación es correcta, pero alteraste la jerarquía de las operaciones, así que no hay multiplicador.<br>Daño al Devorador: <strong>${Math.round(dano)}</strong></p>`;
    golpeAnimacion('combat2-monster-img');
  } else if (procOk) {
    // Modelación incorrecta pero ejercicio bien resuelto: nadie pierde HP
    c.mult = COMBATE2_CFG.multMax;
    titulo = '🤔 Revisa tu modelación';
    cuerpo += `<p style="color:#ffb142;">Resolviste tu ejercicio correctamente, pero tu modelación no corresponde al problema. Nadie recibe daño esta vez.</p>
      <p>Una modelación correcta era: <strong>${formatearExpr(p.expr)}</strong><br>Resultado: <strong>${formatearNumero(p.ans)}</strong></p>`;
  } else {
    // Ambas incorrectas: el estudiante pierde HP
    const perdida = Math.ceil(c.heroMax / c.erroresMax);
    c.mult = COMBATE2_CFG.multMax;
    c.heroHP -= perdida;
    titulo = '💥 ¡El Devorador te golpea!';
    cuerpo += `<p style="color:#e74c3c;">Modelación y procedimiento incorrectos. Pierdes <strong>${perdida}</strong> HP.</p>
      <p>Una modelación correcta era: <strong>${formatearExpr(p.expr)}</strong><br>Resultado: <strong>${formatearNumero(p.ans)}</strong></p>`;
    golpeAnimacion('combat2-hero-panel');
  }
  actualizarCombate2UI();
 
  mostrarModalCombate(titulo, cuerpo, [{ texto: 'Continuar', accion: continuarCombate2 }]);
}
 
function continuarCombate2() {
  if (combate2.monHP <= 0) {
    jugador.devoradorDerrotado = true;
    guardarDatos();
    mostrarModalCombate('🎉 ¡Felicitaciones!',
      '<p>¡Has derrotado al <strong>Devorador de los Prados</strong>!</p><p>Al convertir cada problema en una expresión matemática y resolverla con orden, le quitaste su fuente de alimento. Los Prados de la Lógica vuelven a florecer. ¡Gran trabajo, Guardián de la tierra!</p>' +
      htmlCodigoPremio('TESIS2026'),
      [{ texto: '🗺️ Volver al mapa', accion: salirCombate2 }]);
  } else if (combate2.heroHP <= 0) {
    mostrarModalCombate('💀 Has sido derrotado',
      '<p>El Devorador de los Prados ruge satisfecho... ¡pero no te rindas! Repasa cómo convertir un problema en una expresión y vuelve a intentarlo desde el inicio.</p>',
      [{ texto: '🔁 Reiniciar la sección', accion: iniciarCombate2 }]);
  } else {
    combate2.idx++;
    cargarProblemaCombate2();
  }
}
 
function salirCombate2() {
  cerrarModalCombate();
  document.getElementById('combat2-screen').style.display = 'none';
  document.getElementById('map-screen').style.display = 'flex';
  actualizarHotspots();
}
 
 
/* =====================================================================
   A PARTIR DE AQUÍ: MOTOR DE AUDIO (música + efectos)
   ===================================================================== */
 
/* =====================================================================
   MATHBOUND · MOTOR DE AUDIO 8-BIT (chiptune)
   ---------------------------------------------------------------------
   - Todo se sintetiza con la Web Audio API: no necesita archivos de audio
     ni librerías externas, y funciona sin internet.
   - Música por pantalla (inicio, tienda, mapa, lore del castillo,
     entrenamiento, Gólem, Devorador y combates) + efectos de sonido.
   - Botón 🔊/🔇 (o tecla M) para activar/quitar el sonido. Se recuerda.
   - Se engancha a tus funciones existentes SIN modificar tu código:
     solo debe cargarse DESPUÉS de tu script del juego.
   ===================================================================== */
(function () {
  'use strict';
 
  const AC = window.AudioContext || window.webkitAudioContext;
  const LS_KEY = 'mathbound_sonido';
 
  let ctx = null, master, musicBus, sfxBus, ruidoBuf, onda25;
  let activado = true;
  try { activado = localStorage.getItem(LS_KEY) !== 'off'; } catch (e) {}
 
  let escena = null;        // pista que "debería" sonar según la pantalla
  let pistaAct = null;      // pista que suena ahora
  let tempoMul = 1;         // aceleración de la música (combate)
  let silencioCombate = false; // true tras victoria/derrota
  let timerBlips = null;
 
  /* ------------------------- UTILIDADES MUSICALES ------------------------- */
  const SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  function midi(n) {
    const m = /^([A-G])([#b]?)(-?\d)$/.exec(n);
    return 12 * (+m[3] + 1) + SEMI[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  }
  function freq(n) {
    const m = typeof n === 'number' ? n : midi(n);
    return 440 * Math.pow(2, (m - 69) / 12);
  }
  function acorde(sym, oct) {
    const m = /^([A-G][#b]?)(m?)$/.exec(sym);
    const r = midi(m[1] + oct);
    return [r, r + (m[2] ? 3 : 4), r + 7, r + 12];
  }
  const now = () => ctx.currentTime;
 
  /* ----------------------------- SÍNTESIS BASE ----------------------------- */
  function crearPulso(duty) {
    const n = 32, real = new Float32Array(n), imag = new Float32Array(n);
    for (let k = 1; k < n; k++) real[k] = (2 / (k * Math.PI)) * Math.sin(k * Math.PI * duty);
    return ctx.createPeriodicWave(real, imag);
  }
 
  function tono(t, f, dur, o) {
    o = o || {};
    const vol = o.vol == null ? 0.15 : o.vol;
    const attack = o.attack || 0.004, release = o.release || 0.04;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    if (o.wave) osc.setPeriodicWave(o.wave); else osc.type = o.type || 'square';
    osc.frequency.setValueAtTime(f, t);
    if (o.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, o.slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    g.gain.setValueAtTime(vol, t + Math.max(attack, dur - release));
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(o.bus || sfxBus);
    osc.start(t); osc.stop(t + dur + 0.03);
  }
 
  function ruido(t, dur, o) {
    o = o || {};
    const s = ctx.createBufferSource();
    s.buffer = ruidoBuf; s.loop = true;
    let nodo = s;
    if (o.hp) { const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = o.hp; nodo.connect(f); nodo = f; }
    if (o.lp) { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; nodo.connect(f); nodo = f; }
    const g = ctx.createGain();
    g.gain.setValueAtTime(o.vol || 0.2, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    nodo.connect(g); g.connect(o.bus || sfxBus);
    s.start(t, Math.random() * 0.8); s.stop(t + dur + 0.03);
  }
 
  function bateria(tipo, t, bus) {
    if (tipo === 'k') {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(150, t);
      o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      o.connect(g); g.connect(bus); o.start(t); o.stop(t + 0.18);
    } else if (tipo === 's') {
      ruido(t, 0.13, { vol: 0.26, hp: 1800, bus });
      tono(t, 190, 0.08, { type: 'triangle', vol: 0.18, slide: 110, bus });
    } else if (tipo === 'h') {
      ruido(t, 0.035, { vol: 0.08, hp: 7500, bus });
    }
  }
 
  /* ------------------------------ PISTAS (MÚSICA) ------------------------------
     Cada pista = progresión de acordes (1 compás = 16 pasos de semicorchea)
     + melodía escrita como "NOTA:duración" + estilo de bajo, arpegio y batería. */
  const BAJOS = {
    octavas: [[0, 2, 0], [2, 2, 12], [4, 2, 0], [6, 2, 12], [8, 2, 0], [10, 2, 12], [12, 2, 0], [14, 2, 12]],
    pulso:   [[0, 3, 0], [4, 3, 0], [8, 3, 0], [12, 3, 0]],
    lento:   [[0, 8, 0], [8, 8, 7]],
    golpe:   [[0, 3, 0], [4, 1, 0], [6, 2, 0], [8, 3, 0], [12, 1, 0], [14, 2, 0]]
  };
  const BAT = {
    none: [],
    soft:   [[0, 'k'], [8, 'k'], [4, 'h'], [12, 'h']],
    march:  [[0, 'k'], [4, 's'], [8, 'k'], [12, 's']],
    battle: [[0, 'k'], [4, 's'], [8, 'k'], [10, 'k'], [12, 's'], [2, 'h'], [6, 'h'], [14, 'h'], [15, 'h']],
    heavy:  [[0, 'k'], [3, 'k'], [4, 's'], [8, 'k'], [11, 'k'], [12, 's'], [2, 'h'], [6, 'h'], [10, 'h'], [14, 'h']]
  };
 
  const PISTAS = {
    // Pantalla de inicio / selección de héroe: heroica y alegre (Do mayor)
    inicio: {
      bpm: 104, bajo: 'octavas', bat: 'soft', arp: { paso: 2, vol: 0.05 }, lead: { type: 'square', vol: 0.09 },
      prog: ['C', 'Am', 'F', 'G', 'C', 'Am', 'Dm', 'G'],
      mel: [
        'E5:4 G5:2 C6:2 B5:4 G5:4',
        'A5:4 E5:2 C6:2 B5:2 A5:2 E5:4',
        'F5:4 A5:2 C6:2 A5:4 F5:4',
        'G5:2 B5:2 D6:4 B5:2 G5:2 D5:4',
        'C6:4 B5:2 G5:2 E5:4 G5:4',
        'A5:2 C6:2 E6:4 D6:2 C6:2 A5:4',
        'D6:4 C6:2 A5:2 F5:4 A5:4',
        'G5:4 B5:4 D6:4 -:4'
      ]
    },
    // Tienda / base: saltarina, estilo "pueblo" (Sol mayor)
    tienda: {
      bpm: 120, bajo: 'octavas', bat: 'soft', arp: { paso: 2, vol: 0.045 }, lead: { type: 'square', vol: 0.085 },
      prog: ['G', 'Em', 'C', 'D', 'G', 'Em', 'C', 'D'],
      mel: [
        'B5:2 D6:2 B5:2 G5:2 A5:2 B5:2 D6:2 -:2',
        'E6:2 D6:2 B5:2 G5:2 B5:4 E5:4',
        'C6:2 B5:2 G5:2 E5:2 G5:2 C6:2 E6:2 -:2',
        'D6:2 C6:2 A5:2 F#5:2 A5:4 D6:4',
        'G5:2 B5:2 D6:2 G6:2 F#6:2 D6:2 B5:2 G5:2',
        'E6:4 D6:2 B5:2 G5:4 B5:4',
        'E6:2 D6:2 C6:2 B5:2 C6:4 G5:4',
        'A5:2 D6:2 F#6:2 A6:2 G6:4 -:4'
      ]
    },
    // Mapa del mundo: aventura (Re dórico)
    mapa: {
      bpm: 92, bajo: 'pulso', bat: 'march', arp: { paso: 2, vol: 0.05 }, lead: { type: 'square', vol: 0.09 },
      prog: ['Dm', 'C', 'Bb', 'C', 'Dm', 'Am', 'Bb', 'C'],
      mel: [
        'D5:4 F5:2 A5:2 D6:4 C6:4',
        'C6:2 B5:2 G5:4 E5:4 G5:4',
        'Bb5:4 A5:2 F5:2 D5:4 F5:4',
        'G5:4 E5:2 G5:2 C6:4 -:4',
        'A5:4 D6:2 F6:2 E6:4 D6:4',
        'C6:4 E6:2 C6:2 A5:4 E5:4',
        'D6:4 F6:2 D6:2 Bb5:4 D6:4',
        'E6:2 D6:2 C6:2 G5:2 E5:4 -:4'
      ]
    },
    // Lore del castillo (historia de Pólya): misteriosa y épica (La menor)
    castillo: {
      bpm: 72, bajo: 'lento', bat: 'none', arp: { paso: 2, vol: 0.04 }, lead: { type: 'square', vol: 0.07 },
      prog: ['Am', 'F', 'C', 'E', 'Am', 'Dm', 'F', 'E'],
      mel: [
        'E5:8 A5:4 C6:4',
        'A5:8 F5:4 C5:4',
        'E5:4 G5:4 C6:8',
        'B5:8 G#5:4 B5:4',
        'A5:4 C6:4 E6:8',
        'D6:8 A5:4 F5:4',
        'C6:4 A5:4 F5:4 A5:4',
        'G#5:4 B5:4 E6:8'
      ]
    },
    // Entrenamiento de jerarquía: ligera, tipo puzzle (Fa mayor)
    entrenamiento: {
      bpm: 108, bajo: 'pulso', bat: 'soft', arp: { paso: 2, vol: 0.045 }, lead: { type: 'square', vol: 0.08 },
      prog: ['F', 'Dm', 'Bb', 'C'],
      mel: [
        'A5:2 C6:2 F6:4 E6:2 C6:2 A5:4',
        'D6:2 F6:2 A6:4 F6:2 D6:2 A5:4',
        'Bb5:2 D6:2 F6:4 D6:2 Bb5:2 F5:4',
        'G5:2 C6:2 E6:4 D6:2 C6:2 G5:4'
      ]
    },
    // Ficha y lore del Gólem: industrial y amenazante (Re menor)
    golem: {
      bpm: 88, bajo: 'golpe', bat: 'heavy', arp: { paso: 2, vol: 0.04 }, lead: { type: 'sawtooth', vol: 0.065 },
      prog: ['Dm', 'Dm', 'Bb', 'A', 'Dm', 'Gm', 'Bb', 'A'],
      mel: [
        'D5:3 -:1 D5:2 F5:2 A5:4 G5:2 F5:2',
        'E5:3 -:1 E5:2 G5:2 Bb5:4 A5:2 G5:2',
        'D6:4 Bb5:4 F5:4 D5:4',
        'C#6:4 E6:4 A5:4 -:4',
        'A5:2 A5:2 D6:4 C6:2 Bb5:2 A5:4',
        'G5:2 Bb5:2 D6:4 C6:2 Bb5:2 G5:4',
        'F5:2 Bb5:2 D6:4 F6:4 D6:4',
        'E6:2 D6:2 C#6:2 A5:2 E5:4 -:4'
      ]
    },
    // Combate: rápida y agresiva (La menor)
    combate: {
      bpm: 150, bajo: 'octavas', bat: 'battle', arp: { paso: 1, vol: 0.035 }, lead: { type: 'square', vol: 0.09 },
      prog: ['Am', 'F', 'G', 'Am', 'Am', 'F', 'G', 'E'],
      mel: [
        'A5:2 A5:2 C6:2 A5:2 E6:2 D6:2 C6:2 A5:2',
        'F5:2 F5:2 A5:2 F5:2 C6:2 A5:2 G5:2 F5:2',
        'G5:2 G5:2 B5:2 G5:2 D6:2 B5:2 A5:2 G5:2',
        'E5:2 A5:2 C6:2 E6:2 A6:4 -:4',
        'E6:2 E6:2 D6:2 C6:2 B5:2 C6:2 D6:2 E6:2',
        'F6:2 E6:2 C6:2 A5:2 C6:2 F6:2 E6:2 C6:2',
        'D6:2 G6:2 D6:2 B5:2 G5:2 B5:2 D6:2 G6:2',
        'E6:2 G#5:2 B5:2 E6:2 G#6:4 -:4'
      ]
    },
    // Ficha y lore del Devorador de los Prados: pantanosa y glotona (Mi menor)
    devorador: {
      bpm: 80, bajo: 'golpe', bat: 'march', arp: { paso: 2, vol: 0.04 }, lead: { type: 'square', vol: 0.07 },
      prog: ['Em', 'Em', 'C', 'D', 'Em', 'Am', 'C', 'B'],
      mel: [
        'E5:4 G5:2 B5:2 E6:4 D6:4',
        'E5:3 -:1 E5:2 G5:2 B5:4 A5:4',
        'C6:4 G5:4 E5:4 G5:4',
        'D6:4 F#5:4 A5:4 -:4',
        'E5:2 E5:2 G5:4 B5:2 A5:2 G5:4',
        'A5:4 C6:4 E6:4 C6:4',
        'C6:2 B5:2 G5:4 E5:4 G5:4',
        'B5:4 D#6:4 F#6:4 -:4'
      ]
    },
    // Combate contra el Devorador: rápida y salvaje (Mi menor)
    combateDevorador: {
      bpm: 140, bajo: 'octavas', bat: 'battle', arp: { paso: 1, vol: 0.035 }, lead: { type: 'square', vol: 0.085 },
      prog: ['Em', 'C', 'D', 'Em', 'Em', 'Am', 'B', 'Em'],
      mel: [
        'E5:2 E5:2 G5:2 E5:2 B5:2 A5:2 G5:2 E5:2',
        'C5:2 C5:2 E5:2 C5:2 G5:2 E5:2 D5:2 C5:2',
        'D5:2 D5:2 F#5:2 D5:2 A5:2 F#5:2 E5:2 D5:2',
        'E5:2 G5:2 B5:2 E6:2 G6:4 -:4',
        'B5:2 B5:2 A5:2 G5:2 F#5:2 G5:2 A5:2 B5:2',
        'C6:2 B5:2 A5:2 E5:2 A5:2 C6:2 B5:2 A5:2',
        'B5:2 D#6:2 F#6:2 D#6:2 B5:2 F#5:2 D#5:2 B4:2',
        'E6:2 B5:2 G5:2 E5:2 G5:4 -:4'
      ]
    }
  };
 
  function construir(def) {
    const total = def.prog.length * 16;
    const ev = [];
    for (let i = 0; i < total; i++) ev.push({});
    let s = 0;
    def.mel.forEach(c => c.trim().split(/\s+/).forEach(tok => {
      const p = tok.split(':'), len = parseInt(p[1], 10) || 1;
      if (p[0] !== '-' && s < total) ev[s].lead = { n: p[0], len };
      s += len;
    }));
    def.prog.forEach((sym, b) => {
      const base = b * 16, ac = acorde(sym, 4), raiz = ac[0] - 24;
      BAJOS[def.bajo].forEach(([paso, len, of]) => { ev[base + paso].bajo = { m: raiz + of, len }; });
      if (def.arp) {
        const pat = [0, 1, 2, 3, 2, 1];
        for (let k = 0; k < 16; k += def.arp.paso) ev[base + k].arp = { m: ac[pat[(k / def.arp.paso) % 6]] };
      }
      BAT[def.bat].forEach(([paso, tipo]) => { (ev[base + paso].bat = ev[base + paso].bat || []).push(tipo); });
    });
    return ev;
  }
 
  function tocarPaso(p) {
    const d = 60 / p.def.bpm / 4 / tempoMul, t = p.prox, e = p.ev[p.paso % p.ev.length], L = p.def.lead;
    if (e.lead) tono(t, freq(e.lead.n), Math.max(0.06, e.lead.len * d * 0.92), { type: L.type, vol: L.vol, bus: p.gain });
    if (e.bajo) tono(t, freq(e.bajo.m), Math.max(0.05, e.bajo.len * d * 0.9), { type: 'triangle', vol: 0.2, bus: p.gain });
    if (e.arp) tono(t, freq(e.arp.m), d * p.def.arp.paso * 0.8, { wave: onda25, vol: p.def.arp.vol, bus: p.gain });
    if (e.bat) e.bat.forEach(x => bateria(x, t, p.gain));
    p.prox += d; p.paso++;
  }
 
  function planificar(p) {
    if (ctx.state !== 'running') { p.prox = Math.max(p.prox, ctx.currentTime + 0.05); return; }
    if (p.prox < ctx.currentTime) p.prox = ctx.currentTime + 0.05; // se recupera tras un alert()
    while (p.prox < ctx.currentTime + 0.15) tocarPaso(p);
  }
 
  function iniciarPista(nombre) {
    const def = PISTAS[nombre];
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now());
    g.gain.linearRampToValueAtTime(1, now() + 0.5);
    g.connect(musicBus);
    const p = { nombre, def, ev: def._ev || (def._ev = construir(def)), gain: g, paso: 0, prox: now() + 0.08, timer: null };
    p.timer = setInterval(() => planificar(p), 30);
    pistaAct = p;
  }
 
  function detener(fade) {
    const p = pistaAct;
    if (!p) return;
    pistaAct = null;
    clearInterval(p.timer);
    const t = now();
    p.gain.gain.cancelScheduledValues(t);
    p.gain.gain.setValueAtTime(p.gain.gain.value, t);
    p.gain.gain.linearRampToValueAtTime(0, t + fade);
    setTimeout(() => { try { p.gain.disconnect(); } catch (e) {} }, (fade + 0.3) * 1000);
  }
 
  function sincronizar() {
    if (!ctx) return;
    const meta = activado ? escena : null;
    const act = pistaAct ? pistaAct.nombre : null;
    if (meta === act) return;
    detener(0.35);
    if (meta) iniciarPista(meta);
  }
 
  /* ------------------------------ EFECTOS (SFX) ------------------------------ */
  function notas(lista, o) {
    o = o || {};
    const t0 = now() + 0.005;
    lista.forEach(([n, off, dur]) => tono(t0 + off, freq(n), dur, { type: o.type || 'square', vol: o.vol || 0.13 }));
  }
 
  const SFX = {
    click:       () => tono(now(), 880, 0.05, { vol: 0.12, slide: 1320 }),
    hover:       () => tono(now(), 1400, 0.025, { vol: 0.03 }),
    atras:       () => tono(now(), 700, 0.09, { vol: 0.12, slide: 350 }),
    seleccionar: () => notas([['C6', 0, 0.05], ['E6', 0.05, 0.07]], { vol: 0.11 }),
    confirmar:   () => notas([['E5', 0, 0.07], ['A5', 0.07, 0.07], ['E6', 0.14, 0.16]]),
    comprar:     () => notas([['B5', 0, 0.06], ['E6', 0.06, 0.12], ['B5', 0.2, 0.06], ['E6', 0.26, 0.3]], { vol: 0.12 }),
    moneda:      () => notas([['B5', 0, 0.06], ['E6', 0.06, 0.25]], { vol: 0.12 }),
    equipar:     () => notas([['G4', 0, 0.05], ['C5', 0.05, 0.05], ['E5', 0.1, 0.05], ['G5', 0.15, 0.12]], { vol: 0.12 }),
    quitar:      () => notas([['G5', 0, 0.06], ['E5', 0.06, 0.06], ['C5', 0.12, 0.1]], { type: 'triangle', vol: 0.2 }),
    error:       () => {
      tono(now(), 160, 0.22, { type: 'sawtooth', vol: 0.13, slide: 90 });
      tono(now() + 0.1, 130, 0.22, { type: 'sawtooth', vol: 0.13, slide: 70 });
    },
    aviso:       () => notas([['E4', 0, 0.12], ['C4', 0.12, 0.2]], { vol: 0.12 }),
    exito:       () => notas([['C5', 0, 0.08], ['E5', 0.08, 0.08], ['G5', 0.16, 0.08], ['C6', 0.24, 0.22]]),
    correcto:    () => notas([['C6', 0, 0.06], ['G6', 0.06, 0.14]], { vol: 0.12 }),
    perfecto:    () => notas([['E6', 0, 0.05], ['G6', 0.05, 0.05], ['C7', 0.1, 0.22]], { vol: 0.09 }),
    nivel:       () => notas([['C5', 0, 0.07], ['E5', 0.07, 0.07], ['G5', 0.14, 0.07], ['C6', 0.21, 0.07],
                              ['E6', 0.28, 0.07], ['G6', 0.35, 0.07], ['C7', 0.42, 0.45]], { vol: 0.12 }),
    golpe:       () => {
      const t = now();
      ruido(t, 0.25, { vol: 0.4, lp: 1500 });
      tono(t, 260, 0.25, { type: 'sawtooth', vol: 0.22, slide: 55 });
      tono(t, 900, 0.08, { type: 'square', vol: 0.12, slide: 300 });
    },
    herido:      () => {
      const t = now();
      tono(t, 420, 0.4, { type: 'sawtooth', vol: 0.2, slide: 70 });
      ruido(t, 0.18, { vol: 0.25, lp: 800 });
    },
    rugido:      () => {
      const t = now();
      tono(t, 95, 1.3, { type: 'sawtooth', vol: 0.25, slide: 38 });
      tono(t, 100, 1.3, { type: 'square', vol: 0.1, slide: 42 });
      ruido(t, 1.2, { vol: 0.25, lp: 500 });
    },
    // Devorador: masticar (ñam, ñam, ñam) y eructo final
    masticar:    () => {
      const t = now();
      for (let i = 0; i < 4; i++) {
        ruido(t + i * 0.18, 0.12, { vol: 0.3, lp: 900 });
        tono(t + i * 0.18, 200, 0.12, { type: 'square', vol: 0.12, slide: 90 });
      }
      tono(t + 0.8, 75, 0.8, { type: 'sawtooth', vol: 0.22, slide: 40 });
      ruido(t + 0.8, 0.7, { vol: 0.2, lp: 400 });
    },
    alerta:      () => notas([['A4', 0, 0.09], ['E5', 0.1, 0.09], ['A4', 0.2, 0.09], ['E5', 0.3, 0.09], ['A5', 0.4, 0.3]], { type: 'sawtooth', vol: 0.11 }),
    modal:       () => notas([['E5', 0, 0.05], ['A5', 0.05, 0.08]], { vol: 0.09 }),
    barrido:     () => tono(now(), 250, 0.25, { type: 'sine', vol: 0.14, slide: 900 }),
    // tipo: 'golem' (voz metálica), 'devorador' (voz gutural) o falso (voz normal)
    tipeo:       (tipo) => {
      let f, type, vol = 0.05;
      if (tipo === 'golem') { f = 110 + Math.random() * 90; type = 'sawtooth'; }
      else if (tipo === 'devorador') { f = 130 + Math.random() * 110; type = 'triangle'; vol = 0.1; }
      else { f = 520 + Math.random() * 220; type = 'square'; }
      tono(now(), f, 0.035, { type, vol });
    },
    victoria:    () => {
      notas([['C5', 0, 0.12], ['E5', 0.12, 0.12], ['G5', 0.24, 0.12], ['C6', 0.36, 0.3],
             ['G5', 0.66, 0.1], ['C6', 0.76, 0.7], ['E6', 0.76, 0.7], ['G6', 0.76, 0.7]], { vol: 0.11 });
      notas([['C3', 0, 0.35], ['G3', 0.36, 0.3], ['C3', 0.76, 0.7]], { type: 'triangle', vol: 0.22 });
    },
    derrota:     () => {
      notas([['E4', 0, 0.3], ['D4', 0.3, 0.3], ['C4', 0.6, 0.3], ['A3', 0.9, 0.9]], { type: 'triangle', vol: 0.22 });
      notas([['E3', 0.9, 0.9]], { type: 'sawtooth', vol: 0.08 });
    }
  };
 
  function sfx(nombre, a) {
    if (!activado || !ctx || !SFX[nombre]) return;
    if (ctx.state !== 'running') ctx.resume();
    try { SFX[nombre](a); } catch (e) {}
  }
 
  /* --------------------------- ESCENA SEGÚN LA PANTALLA --------------------------- */
  function visible(id) {
    const el = document.getElementById(id);
    return !!el && getComputedStyle(el).display !== 'none';
  }
 
  function tipoLoreActual() {
    if (typeof loreActual === 'undefined') return false;
    if (loreActual === loreGolemData) return 'golem';
    if (loreActual === loreDevoradorData) return 'devorador';
    return false;
  }
 
  function resolverEscena() {
    if (visible('combat-screen')) return silencioCombate ? null : 'combate';
    if (visible('combat2-screen')) return silencioCombate ? null : 'combateDevorador';
    silencioCombate = false;
    if (visible('tutorial-screen')) {
      if (visible('tutorial-game-view')) return 'entrenamiento';
      const tipo = tipoLoreActual();
      return tipo === 'golem' ? 'golem' : tipo === 'devorador' ? 'devorador' : 'castillo';
    }
    if (visible('monster-intro-screen')) return 'golem';
    if (visible('devorador-intro-screen')) return 'devorador';
    if (visible('map-screen') || visible('picos-check-screen') || visible('prados-check-screen')) return 'mapa';
    if (visible('app-screen')) return 'tienda';
    return 'inicio';
  }
 
  function actualizarEscena() {
    escena = resolverEscena();
    sincronizar();
  }
 
  /* ------------------------------ INICIO DEL AUDIO ------------------------------ */
  function asegurar() {
    if (!AC) return false;
    if (!ctx) {
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      master = ctx.createGain(); master.gain.value = 0.8;
      musicBus = ctx.createGain(); musicBus.gain.value = 0.32;
      sfxBus = ctx.createGain(); sfxBus.gain.value = 0.65;
      musicBus.connect(master); sfxBus.connect(master);
      master.connect(comp); comp.connect(ctx.destination);
      ruidoBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = ruidoBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      onda25 = crearPulso(0.25);
      escena = resolverEscena();
    }
    if (ctx.state === 'suspended') ctx.resume();
    sincronizar();
    return true;
  }
 
  /* ------------------------------- BOTÓN DE SONIDO ------------------------------- */
  let btnSonido = null;
  function crearBoton() {
    const css = document.createElement('style');
    css.textContent =
      '#btn-sonido{position:fixed;left:8px;top:50%;transform:translateY(-50%);z-index:9999;' +
      'width:40px;height:40px;padding:0;font-size:20px;line-height:1;background:rgba(10,10,25,.92);' +
      'border:3px solid #e8e8f0;border-radius:10px;box-shadow:inset 0 0 0 2px #5a5a78,0 4px 14px rgba(0,0,0,.6);' +
      'cursor:pointer;opacity:.85}#btn-sonido:hover{opacity:1}';
    document.head.appendChild(css);
    btnSonido = document.createElement('button');
    btnSonido.id = 'btn-sonido';
    btnSonido.type = 'button';
    btnSonido.addEventListener('click', alternar);
    document.body.appendChild(btnSonido);
    actualizarBoton();
  }
  function actualizarBoton() {
    if (!btnSonido) return;
    btnSonido.textContent = activado ? '🔊' : '🔇';
    btnSonido.title = activado ? 'Quitar sonido (M)' : 'Activar sonido (M)';
  }
  function alternar() {
    activado = !activado;
    try { localStorage.setItem(LS_KEY, activado ? 'on' : 'off'); } catch (e) {}
    actualizarBoton();
    asegurar();
    sincronizar();
    if (activado) sfx('confirmar');
  }
 
  /* ----------------------- EVENTOS GLOBALES (clics, hover, teclas) ----------------------- */
  document.addEventListener('pointerdown', () => { try { asegurar(); } catch (e) {} }, true);
 
  document.addEventListener('click', e => {
    try { asegurar(); } catch (err) {}
    const el = e.target.closest && e.target.closest('button, .char-option, .map-hotspot');
    if (!el || el.id === 'btn-sonido' || el.matches('.buy-btn')) return;
    if (el.matches('.logout-btn, .btn-secondary')) sfx('atras');
    else if (el.matches('.char-option, .op-btn')) sfx('seleccionar');
    else sfx('click');
  }, true);
 
  document.addEventListener('pointerover', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const el = e.target.closest && e.target.closest('button:not(:disabled), .char-option, .shop-item, .map-hotspot');
    if (!el || el.id === 'btn-sonido') return;
    if (e.relatedTarget && el.contains(e.relatedTarget)) return;
    sfx('hover');
  });
 
  document.addEventListener('keydown', e => {
    try { asegurar(); } catch (err) {}
    if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey &&
        !/INPUT|TEXTAREA/.test((e.target && e.target.tagName) || '')) alternar();
  });
 
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else ctx.resume();
  });
 
  let pendiente = false;
  new MutationObserver(() => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; if (ctx) actualizarEscena(); });
  }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['style'] });
 
  /* ------------- ENGANCHES A TUS FUNCIONES (sin tocar tu código original) ------------- */
  function envolver(nombre, antes, despues) {
    const orig = window[nombre];
    if (typeof orig !== 'function') return;
    window[nombre] = function () {
      let previo;
      try { if (antes) previo = antes.apply(null, arguments); } catch (e) {}
      const r = orig.apply(this, arguments);
      try { if (despues) despues(previo, r, arguments); } catch (e) {}
      return r;
    };
  }
 
  // Aviso del navegador (alert): según el emoji del mensaje
  const alertOrig = window.alert.bind(window);
  window.alert = function (msg) {
    const m = String(msg);
    if (m.indexOf('✅') === 0) sfx('exito');
    else if (m.indexOf('⚠️') === 0) sfx('aviso');
    else if (m.indexOf('🎉') === 0) sfx('victoria');
    else sfx('error');
    return alertOrig(msg);
  };
 
  // Login y personaje
  envolver('iniciarSesion',
    () => document.getElementById('username-input').value.trim().length > 0,
    ok => { if (ok) sfx('confirmar'); });
  envolver('confirmarPersonaje', null, () => sfx('confirmar'));
 
  // Alertas del cuadro de códigos (errores como "Oro insuficiente" o "Código inválido")
  envolver('mostrarAlerta', null, (_, __, a) => { if (a[1] === 'error') sfx('error'); });
 
  // Recompensas: moneda o fanfarria de nivel
  envolver('otorgarRecompensa', () => jugador.nivel,
    nivelAntes => sfx(jugador.nivel > nivelAntes ? 'nivel' : 'moneda'));
 
  // Tienda
  envolver('comprarItem', () => jugador.inventario.length,
    antes => { if (jugador.inventario.length > antes) sfx('comprar'); });
  envolver('toggleEquipar', id => jugador.equipado.includes(id),
    (estabaEquipado, _, a) => {
      const ahora = jugador.equipado.includes(a[0]);
      if (ahora && !estabaEquipado) sfx('equipar');
      else if (!ahora && estabaEquipado) sfx('quitar');
    });
 
  // Mapa y zonas
  envolver('abrirMapa', null, () => sfx('barrido'));
  envolver('iniciarMisionTutorial', null, () => { if (!jugador.tutorialCompletado) sfx('barrido'); });
  envolver('abrirVerificacionPicos', null, () => { if (visible('picos-check-screen')) sfx('modal'); });
  envolver('entrarPicos', null, () => sfx('modal'));
  envolver('abrirVerificacionPrados', null, () => { if (visible('prados-check-screen')) sfx('modal'); });
  envolver('entrarPrados', null, () => sfx('modal'));
 
  // Lore: rugido del Gólem / masticar del Devorador y "voz" de máquina de escribir
  envolver('iniciarLoreGolem', null, () => sfx('rugido'));
  envolver('iniciarLoreDevorador', null, () => sfx('masticar'));
  envolver('escribirTextoEnCaja', null, () => {
    clearInterval(timerBlips);
    const tipo = tipoLoreActual();
    timerBlips = setInterval(() => {
      if (typeof isTyping !== 'undefined' && !isTyping) { clearInterval(timerBlips); return; }
      sfx('tipeo', tipo);
    }, 50);
  });
 
  // Entrenamiento de jerarquía
  envolver('verificarPasoTutorial',
    () => ({
      lineas: document.querySelectorAll('#exercise-history .math-line').length,
      vacio: isNaN(parseFloat(document.getElementById('calc-input').value))
    }),
    antes => {
      if (antes.vacio) return;
      const ahora = document.querySelectorAll('#exercise-history .math-line').length;
      sfx(ahora > antes.lineas ? 'correcto' : 'error');
    });
 
  // Combate 1 (Gólem)
  envolver('iniciarCombate', () => { silencioCombate = false; },
    () => { tempoMul = 1; sfx('alerta'); actualizarEscena(); });
 
  // Modales de combate (sirven para ambos combates)
  envolver('mostrarModalCombate', null, (_, __, a) => {
    const titulo = String(a[0]);
    if (titulo.indexOf('🎉') === 0) { silencioCombate = true; actualizarEscena(); sfx('victoria'); }
    else if (titulo.indexOf('💀') === 0) { silencioCombate = true; actualizarEscena(); sfx('derrota'); }
    else if (titulo.indexOf('⚔️') !== 0 && titulo.indexOf('💥') !== 0) sfx('modal');
  });
 
  envolver('confirmarVerificacion',
    () => ({ mon: combate.monHP, her: combate.heroHP }),
    antes => {
      if (combate.monHP < antes.mon) {
        sfx('golpe');
        if (combate.ultimoPerfecto) setTimeout(() => sfx('perfecto'), 200);
      }
      if (combate.heroHP < antes.her) sfx('herido');
      // La música se acelera cuando el Gólem está casi vencido
      tempoMul = (combate.monHP > 0 && combate.monHP < combate.monMax * 0.35) ? 1.12 : 1;
    });
 
  envolver('salirCombate', null, () => { silencioCombate = false; tempoMul = 1; actualizarEscena(); });
 
  // Combate 2 (Devorador de los Prados)
  envolver('iniciarCombate2', () => { silencioCombate = false; },
    () => { tempoMul = 1; sfx('alerta'); actualizarEscena(); });
 
  // Modelación: error de sintaxis (mensaje en pantalla) y ejercicio generado
  envolver('mostrarMensajeModelo2', null, (_, __, a) => { if (a[0]) sfx('error'); });
  envolver('generarEjercicio2', () => !!(combate2 && combate2.generado),
    yaGenerado => { if (!yaGenerado && combate2 && combate2.generado) sfx('confirmar'); });
 
  // Pasos de la resolución ramificada: correcto / incorrecto
  envolver('verificarPaso2',
    () => ({
      lineas: document.querySelectorAll('#combat2-history .math-line').length,
      vacio: isNaN(parseFloat(document.getElementById('combat2-calc-input').value)) || !(combate2 && combate2.sel)
    }),
    antes => {
      if (antes.vacio) return;
      const ahora = document.querySelectorAll('#combat2-history .math-line').length;
      sfx(ahora > antes.lineas ? 'correcto' : 'error');
    });
 
  // Resultado del ataque (modelación + procedimiento)
  envolver('evaluarCombate2',
    () => ({ mon: combate2.monHP, her: combate2.heroHP }),
    antes => {
      if (combate2.monHP < antes.mon) {
        sfx('golpe');
        if (combate2.ultimoPerfecto) setTimeout(() => sfx('perfecto'), 200);
      }
      if (combate2.heroHP < antes.her) sfx('herido');
      // La música se acelera cuando el Devorador está casi vencido
      tempoMul = (combate2.monHP > 0 && combate2.monHP < combate2.monMax * 0.35) ? 1.12 : 1;
    });
 
  envolver('salirCombate2', null, () => { silencioCombate = false; tempoMul = 1; actualizarEscena(); });
 
  /* ------------------------------------ ARRANQUE ------------------------------------ */
  if (document.body) crearBoton();
  else document.addEventListener('DOMContentLoaded', crearBoton);
 
  // API pública por si quieres usarla desde tu código: Sonido.sfx('moneda'), Sonido.alternar()
  window.Sonido = { sfx, alternar, asegurar, actualizarEscena };
})();
 