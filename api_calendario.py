# -*- coding: utf-8 -*-
"""
API para Calendario Amazónico Biosemiótico
Obtiene SOLO datos climáticos en tiempo real
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import requests

app = FastAPI(title="Calendario Amazónico API - Solo Clima")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ubicación del Amazonas (Leticia, Colombia)
AMAZON_LAT = -4.2153
AMAZON_LON = -69.9406

@app.get("/api/v1/climate/{season_id}")
async def obtener_clima_estacion(season_id: int):
    """
    Obtiene datos climáticos en tiempo real para una estación específica
    usando Open-Meteo API
    """
    try:
        # Fecha actual
        today = datetime.now()
        # 10 días hacia adelante
        end_date = today + timedelta(days=10)
        
        # Formatear fechas
        start_date_str = today.strftime("%Y-%m-%d")
        end_date_str = end_date.strftime("%Y-%m-%d")
        
        # Construir URL de Open-Meteo
        url = (
            f"https://api.open-meteo.com/v1/forecast"
            f"?latitude={AMAZON_LAT}&longitude={AMAZON_LON}"
            f"&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,windspeed_10m_max"
            f"&hourly=relative_humidity_2m"
            f"&timezone=America/Bogota"
            f"&start_date={start_date_str}"
            f"&end_date={end_date_str}"
        )
        
        # Hacer petición
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # Procesar datos
        precipitacion = data["daily"]["precipitation_sum"]
        temp_max = data["daily"]["temperature_2m_max"]
        temp_min = data["daily"]["temperature_2m_min"]
        humedad = data["hourly"]["relative_humidity_2m"]
        
        # Calcular promedios
        precip_promedio = sum(precipitacion) / len(precipitacion) if precipitacion else 0
        temp_promedio_max = sum(temp_max) / len(temp_max) if temp_max else 0
        temp_promedio_min = sum(temp_min) / len(temp_min) if temp_min else 0
        humedad_actual = humedad[0] if humedad else 0
        
        # Determinar ciclo ecológico
        if precip_promedio > 8:
            ciclo = "Lluvias intensas 🌧️🌧️🌧️"
        elif precip_promedio > 5:
            ciclo = "Temporada de lluvias 🌧️🌧️"
        elif precip_promedio < 1:
            ciclo = "Sequía intensa ☀️☀️☀️"
        elif precip_promedio < 3:
            ciclo = "Sequía ☀️☀️"
        else:
            ciclo = "Transición ⛅"
        
        return {
            "season_id": season_id,
            "location": "Leticia, Amazonas - Colombia",
            "date": today.strftime("%Y-%m-%d"),
            "climate": {
                "cycle": ciclo,
                "precipitation_today": round(precipitacion[0], 1) if precipitacion else 0,
                "precipitation_avg": round(precip_promedio, 2),
                "temperature_range": f"{round(temp_promedio_min, 1)}-{round(temp_promedio_max, 1)}°C",
                "humidity": f"{round(humedad_actual, 1)}%"
            }
        }
    
    except requests.RequestException as e:
        raise HTTPException(status_code=503, detail=f"Error conectando con Open-Meteo: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error procesando datos climáticos: {str(e)}")

@app.get("/")
async def root():
    """Endpoint raíz con información de la API"""
    return {
        "message": "API del Calendario Amazónico Biosemiótico - Solo Clima",
        "version": "1.0",
        "endpoints": [
            "/api/v1/climate/{season_id} - Datos climáticos en tiempo real por estación"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
