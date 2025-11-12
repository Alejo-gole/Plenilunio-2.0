# 🌿 Plenilunio: Calendario Amazónico Biosemiótico

Sistema exploratorio cultural que visualiza el tiempo cíclico de los pueblos amazónicos a través de una espiral interactiva de 8 estaciones semióticas. Cada sector representa redes de comunicación ancestral entre humanos y naturaleza, integrando datos climáticos en tiempo real con saberes originarios.

## ✨ Propósito

- Explorar la cosmovisión amazónica del tiempo circular y las estaciones bioculturales
- Conectar ciclos naturales (lluvias, floración, cosechas) con prácticas ceremoniales ancestrales
- Visualizar la biosemiótica: cómo plantas, animales, agua y aire se comunican en lenguajes de signos
- Integrar tecnología contemporánea con sabiduría tradicional de manera respetuosa

## 🌐 Sitio en Vivo

**Demo en línea:** [https://plenilunio.lahuelladeloso.com](https://plenilunio.lahuelladeloso.com)

## 🛠️ Stack Tecnológico

### Frontend

- **HTML5** con estructura semántica y accesibilidad (ARIA)
- **Tailwind CSS** para diseño responsivo y estilización
- **JavaScript Vanilla** (sin frameworks) para máxima eficiencia
- **Font Awesome 6.5.0** para iconografía (viento, sol, agua, luna, etc.)

### Backend

- **FastAPI** (Python) para API REST ligera y moderna
- **Open-Meteo API** para datos climáticos en tiempo real de la Amazonía
- **Uvicorn** como servidor ASGI

### Datos

- **JSON** estructurado con información de las 8 estaciones
- Sin base de datos (arquitectura minimalista)

### Infraestructura

- **GitHub** para control de versiones
- **Render** para despliegue automático (frontend y backend)
- **GoDaddy** para gestión de dominio personalizado

## 🚀 Cómo Ejecutar Localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/Alejo-gole/plenilunio.git
cd plenilunio
```

### 2. Crear entorno virtual (recomendado)

```python
python3 -m venv venv
source venv/bin/activate # En Windows: venv\Scripts\activate
```

### 3. Instalar dependencias

```python
pip install -r requirements.txt
```

### 4. Ejecutar el servidor backend

```python
uvicorn api_calendario:app --reload --host 0.0.0.0 --port 8000
```

La API estará disponible en: `http://localhost:8000`

### 5. Abrir el frontend

Abre el archivo `index.html` en tu navegador o usa un servidor local como Live Server (VS Code).

**Nota:** Asegúrate de que la variable `API_BASE_URL` en `src/app.js` apunte a `http://localhost:8000` para desarrollo local.

## 🌀 Las 8 Estaciones del Calendario

1. **YACHAY PACHA** - Tiempo del conocimiento ancestral (Diciembre - Enero)
2. **INTI RAYMI** - Celebración del sol y la abundancia (Febrero - Marzo)
3. **WAYRA TIEMPO** - Tiempo de los vientos y la dispersión (Abril - Mayo)
4. **PUQUIO PACHA** - Tiempo de las fuentes sagradas (Junio - Julio)
5. **SARA TIEMPO** - Tiempo de la siembra (Agosto - Septiembre)
6. **COYA RAYMI** - Celebración de la Luna y lo femenino (Octubre - Noviembre)
7. **AWPA PACHA** - Tiempo del retorno y cierre de ciclos (Diciembre inicio)
8. **KALLARI TIEMPO** - Tiempo del principio eterno (Fin de año)

Cada estación incluye:

- Cosmovisión y significado espiritual
- Signos naturales observables
- Datos climáticos en tiempo real
- Prácticas ceremoniales tradicionales
- Citas de sabiduría ancestral

# 📄 Licencias y Atribuciones

## 🔧 Código del Proyecto

El código fuente de este proyecto está licenciado bajo **GNU General Public License v3.0 (GPL-3.0)**.

Eres libre de:

- Usar, estudiar y modificar el código
- Distribuirlo y compartir tus cambios
- Usar comercialmente bajo los mismos términos

Siempre que distribuyas modificaciones bajo la misma licencia.

### 🎨 Contenido Cultural y Creativo

Todo el contenido simbólico, reflexiones textuales, estructura narrativa, metáforas visuales, conceptos filosóficos y conocimientos ancestrales son obras originales protegidas por derechos de autor © 2025 Alejandro González.

**No están bajo licencia libre.** No reproducir, adaptar o usar sin permiso explícito.

### 📦 Dependencias de Terceros

Este proyecto utiliza las siguientes bibliotecas con sus respectivas licencias:

- **FastAPI** - [Licencia MIT](https://opensource.org/licenses/MIT) - [Repositorio](https://github.com/tiangolo/fastapi)
- **Uvicorn** - [Licencia BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause) - [Repositorio](https://github.com/encode/uvicorn)
- **Requests** - [Licencia Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- **Tailwind CSS** - [Licencia MIT](https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE)
- **Font Awesome 6.5.0** - [Licencia gratuita para web](https://fontawesome.com/license/free) - Iconos usados para representar elementos naturales (sol, luna, viento, agua, plantas, animales)

### 🌐 Datos Climáticos

Los datos meteorológicos en tiempo real son proporcionados por [Open-Meteo API](https://open-meteo.com/) bajo licencia CC BY 4.0.

## 🙏 Créditos

**Creado con cuidado y respeto por la vida amazónica**

**Alejandro González (Alejo-gole)**
Comunicador visual · Defensor del diseño consciente con la vida

**Ubicación de datos climáticos:** Leticia, Amazonas, Colombia (coordenadas: -4.2153, -69.9406)

## 🌱 Filosofía

Plenilunio es más que código, es un gesto contemplativo digital. Vive en el ritmo cíclico de la naturaleza amazónica, no en scrolls infinitos ni feeds algorítmicos. Diseñado con mínimo impacto ambiental y máxima intención poética.

Este proyecto honra las formas ancestrales de leer el tiempo, donde cada señal natural es un mensaje y cada ciclo una oportunidad para la renovación colectiva.

---

**⭐ Si este proyecto te inspira, considera darle una estrella en GitHub**

**📧 Contacto:** contacto@lahuelladeloso.com

**🔗 Portafolio:** en construcción...
