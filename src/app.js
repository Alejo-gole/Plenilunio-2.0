/**
 * CALENDARIO AMAZÓNICO BIOSEMIÓTICO - VERSION 8 ESTACIONES
 * Sistema de comunicación ancestral entre humanos, naturaleza y tiempo
 * Basado en principios biosemióticos y cosmovisión indígena amazónica
 */
const API_BASE_URL = "https://plenilunio-api.onrender.com";
console.log("🔧 API_BASE_URL configurada:", API_BASE_URL);

// Variables globales
let SEASONS_DATA = {};
let currentSeason = null;
let isLoading = true;

// Referencias a elementos DOM
const elements = {
  loadingState: null,
  appMain: null,
  infoPanel: null,
  seasonName: null,
  seasonMonths: null,
  seasonDescription: null,
  spiritMeaning: null,
  biosemioticMeaning: null,
  naturalSigns: null,
  climateGrid: null,
  practicesContainer: null,
  seasonSectors: null,
};

/**
 * Carga los datos de las estaciones desde el archivo JSON
 */
async function loadSeasonsData() {
  try {
    const response = await fetch("./data/seasons.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const seasonsArray = await response.json();

    // Convertir array a objeto con id como clave
    SEASONS_DATA = {};
    seasonsArray.forEach((season) => {
      SEASONS_DATA[season.id] = season;
    });

    console.log("✅ Datos de estaciones cargados:", Object.keys(SEASONS_DATA).length, "estaciones");
    return true;
  } catch (error) {
    console.error("❌ Error cargando seasons.json:", error);
    throw error;
  }
}

/**
 * Obtiene datos climáticos en tiempo real desde la API
 */
// Obtiene datos climáticos en tiempo real desde la API
async function getClimateData(seasonId) {
  try {
    const url = `${API_BASE_URL}/api/v1/climate/${seasonId}`;
    console.log("🌍 Solicitando datos climáticos...");
    console.log("📡 URL:", url);

    // Crear un timeout de 60 segundos para dar tiempo a que Render despierte
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos

    const response = await fetch(url, {
      signal: controller.signal,
      mode: "cors",
    });

    clearTimeout(timeoutId);

    console.log("📨 Respuesta:", response.status, response.statusText);

    if (!response.ok) {
      console.warn("⚠️ No se pudieron obtener datos climáticos en tiempo real");
      return null;
    }

    const data = await response.json();
    console.log("✅ Datos recibidos:", data);
    return data.climate;
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("⏱️ Timeout: La API tardó demasiado en responder");
    } else {
      console.error("❌ Error:", error);
    }
    console.warn("📊 API climática no disponible, usando datos estáticos");
    return null;
  }
}

/**
 * Inicialización principal
 */
async function initializeApp() {
  try {
    console.log("🌿 Iniciando Calendario Amazónico...");

    // Cachear elementos DOM
    cacheElementReferences();

    // Cargar datos desde JSON
    await loadSeasonsData();

    // Configurar event listeners
    setupEventListeners();

    // Simular carga
    await simulateCosmicLoading();

    // Mostrar aplicación
    showMainApp();

    // Seleccionar primera estación por defecto
    selectSeason("1");

    console.log("✨ Aplicación lista");
  } catch (error) {
    console.error("Error inicializando:", error);
    showErrorState(error);
  }
}

/**
 * Cachea referencias DOM
 */
function cacheElementReferences() {
  elements.loadingState = document.getElementById("loading");
  elements.appMain = document.getElementById("app-content");
  elements.seasonName = document.getElementById("season-name");
  elements.seasonMonths = document.getElementById("season-months");
  elements.seasonContent = document.getElementById("season-content");
  elements.seasonSectors = document.querySelectorAll("[data-season]");
}

/**
 * Configura event listeners
 */
function setupEventListeners() {
  elements.seasonSectors.forEach((sector) => {
    // Click
    sector.addEventListener("click", handleSeasonSelection);

    // Teclado
    sector.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSeasonSelection(e);
      }
    });
  });
}

/**
 * Maneja selección de estación
 */
function handleSeasonSelection(event) {
  if (isLoading) return;

  const seasonId = event.target.dataset.season || event.currentTarget.dataset.season;
  if (!seasonId) return;

  selectSeason(seasonId);
}

/**
 * Selecciona y renderiza una estación
 */
// Selecciona y renderiza una estación
async function selectSeason(seasonId) {
  const seasonData = SEASONS_DATA[seasonId];
  if (!seasonData) {
    console.warn("Estación no encontrada:", seasonId);
    return;
  }

  console.log("🌿 Mostrando estación:", seasonData.name);
  currentSeason = seasonId;

  // Actualizar sectores activos
  updateSeasonVisualStates(seasonId);

  // Mostrar mensaje de carga mientras obtiene datos de API
  elements.seasonContent.innerHTML = `
        <div class="text-center text-amber-400 py-8">
            <i class="fa-solid fa-spinner fa-spin text-4xl mb-4"></i>
            <p class="text-lg">Despertando la API del Amazonas...</p>
            <p class="text-sm text-gray-400 mt-2">Puede tardar hasta 60 segundos en la primera carga</p>
        </div>
    `;

  // Obtener datos climáticos en tiempo real
  console.log("🔍 Llamando a getClimateData con seasonId:", seasonId);
  const realtimeClimate = await getClimateData(seasonId);
  console.log("📦 Resultado de getClimateData:", realtimeClimate);

  // Renderizar información
  renderSeasonInformation(seasonData, realtimeClimate);

  // Scroll en móvil
  if (window.innerWidth < 768) {
    elements.appMain.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Actualiza estados visuales
 */
function updateSeasonVisualStates(selectedId) {
  elements.seasonSectors.forEach((sector) => {
    if (sector.dataset.season === selectedId) {
      sector.classList.add("opacity-100", "scale-105");
      sector.setAttribute("aria-selected", "true");
    } else {
      sector.classList.remove("opacity-100", "scale-105");
      sector.setAttribute("aria-selected", "false");
    }
  });
}

/**
 * Renderiza información de la estación
 */
function renderSeasonInformation(seasonData, realtimeClimate = null) {
  // Header
  elements.seasonName.textContent = seasonData.name;
  elements.seasonMonths.textContent = seasonData.months;

  // Usar datos en tiempo real si están disponibles, sino usar datos estáticos
  const climateToShow = realtimeClimate || seasonData.climate;

  // Construir contenido HTML
  let content = `
    <p class="text-base md:text-lg leading-relaxed text-gray-100 italic text-justify mb-6">
      ${seasonData.description}
    </p>

    <!-- Cosmovisión -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-orange-400 uppercase tracking-wide mb-4 pb-2 border-b-2 border-orange-400/30">
        <i class="fa-solid fa-spa"></i> Cosmovisión y Biosemiótica
      </h3>
      <div class="space-y-3">
        <p class="bg-slate-800/40 p-4 rounded-lg border-l-4 border-purple-400 text-gray-300">
          <strong class="text-purple-300">Espíritu:</strong> ${seasonData.cosmovision.spirit}
        </p>
        <p class="bg-slate-800/40 p-4 rounded-lg border-l-4 border-cyan-400 text-gray-300">
          <strong class="text-cyan-300">Biosemiótica:</strong> ${
            seasonData.cosmovision.biosemiotic_meaning
          }
        </p>
      </div>
    </div>

    <!-- Signos Naturales -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-orange-400 uppercase tracking-wide mb-4 pb-2 border-b-2 border-orange-400/30">
        Signos Naturales
      </h3>
      <ul class="space-y-2">
        ${seasonData.cosmovision.natural_signs
          .map(
            (sign) => `
          <li class="bg-slate-800/40 p-3 rounded-lg border-l-4 border-amber-400 text-gray-300 transition-all duration-300 hover:bg-slate-800/60 hover:translate-x-1">
            ${sign}
          </li>
        `
          )
          .join("")}
      </ul>
    </div>

    <!-- Clima -->
<div class="mb-6">
  <h3 class="text-xl font-semibold text-orange-400 uppercase tracking-wide mb-4 pb-2 border-b-2 border-orange-400/30">
    ${realtimeClimate ? "📡 Datos Climáticos en Tiempo Real" : "Datos Climáticos"}
  </h3>
  
  ${
    realtimeClimate
      ? `
    <!-- Contenedor principal con borde -->
    <div class="bg-blue-900/20 p-4 rounded-lg border border-cyan-400/30">
      <!-- Encabezado con ubicación y ciclo -->
      <div class="mb-4">
        <p class="text-cyan-300 text-sm mb-2"><i class="fa-solid fa-earth-americas"></i> Leticia, Amazonas - Colombia</p>
        <p class="text-amber-400 text-lg font-semibold">${realtimeClimate.cycle}</p>
      </div>
      
      <!-- Grid de 3 tarjetas dentro del mismo contenedor -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-slate-800/60 p-4 rounded-lg border border-blue-900/30 text-center">
          <p class="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">Temperatura</p>
          <p class="text-lg font-medium text-amber-400">${realtimeClimate.temperature_range}</p>
        </div>
        <div class="bg-slate-800/60 p-4 rounded-lg border border-blue-900/30 text-center">
          <p class="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">Lluvia</p>
          <p class="text-lg font-medium text-amber-400">${realtimeClimate.precipitation_today} mm hoy</p>
        </div>
        <div class="bg-slate-800/60 p-4 rounded-lg border border-blue-900/30 text-center">
          <p class="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">Humedad</p>
          <p class="text-lg font-medium text-amber-400">${realtimeClimate.humidity}</p>
        </div>
      </div>
    </div>
  `
      : `
    <!-- Vista estática (sin API) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30 text-center">
        <p class="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">Temperatura</p>
        <p class="text-lg font-medium text-amber-400">${seasonData.climate.temperature}</p>
      </div>
      <div class="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30 text-center">
        <p class="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">Lluvia</p>
        <p class="text-lg font-medium text-amber-400">${seasonData.climate.precipitation}</p>
      </div>
      <div class="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30 text-center">
        <p class="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">Humedad</p>
        <p class="text-lg font-medium text-amber-400">${seasonData.climate.humidity}</p>
      </div>
    </div>
  `
  }
</div>


    <!-- Prácticas -->
    <div>
      <h3 class="text-xl font-semibold text-orange-400 uppercase tracking-wide mb-4 pb-2 border-b-2 border-orange-400/30">
        Prácticas Tradicionales
      </h3>
      ${seasonData.practices
        .map(
          (practice) => `
        <div class="bg-amber-900/15 border border-amber-900/30 rounded-xl p-6 mb-4 transition-all duration-300 hover:bg-amber-900/25 hover:border-amber-900/50 hover:-translate-y-1">
          <div class="flex items-center gap-4 mb-4">
            <span class="text-4xl">${practice.icon}</span>
            <h4 class="text-xl font-semibold text-amber-400 uppercase tracking-wide">
              ${practice.name}
            </h4>
          </div>
          <p class="leading-relaxed text-gray-300 mb-4 text-justify">
            ${practice.description}
          </p>
          <blockquote class="bg-amber-400/10 border-l-4 border-amber-400 p-4 rounded-r-lg italic text-gray-300">
            ${practice.biosemiotic_quote}
          </blockquote>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  elements.seasonContent.innerHTML = content;
}

/**
 * Simula carga cósmica
 */
async function simulateCosmicLoading() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

/**
 * Muestra aplicación principal
 */
function showMainApp() {
  elements.loadingState.classList.add("hidden");
  elements.appMain.classList.remove("hidden");
  isLoading = false;
}

/**
 * Muestra estado de error
 */
function showErrorState(error) {
  elements.loadingState.innerHTML = `
    <div class="text-center text-red-400">
      <p class="text-xl mb-4">❌ Error al cargar el calendario</p>
      <p class="text-sm">${error.message}</p>
    </div>
  `;
}

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initializeApp);
