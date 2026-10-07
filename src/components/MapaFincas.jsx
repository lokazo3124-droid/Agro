import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { clasificarIETSS } from '../utils/miesaCalculator';

// Fix default Leaflet icon paths in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapaFincas({ fincas, onSelectFinca, fincaSeleccionada, height = "480px" }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered at Fusagasugá, Cundinamarca
      const map = L.map(mapContainerRef.current, {
        center: [4.3400, -74.3640],
        zoom: 13,
        zoomControl: true,
      });

      // Add clean CartoDB / OSM tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> • Agro Fusagasugá MIESA',
        maxZoom: 18,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when fincas change or selected farm changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    fincas.forEach((finca) => {
      const ietss = clasificarIETSS(finca.isa);
      const isSelected = fincaSeleccionada && fincaSeleccionada.id === finca.id;

      // Custom SVG Pin based on IETSS color
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${ietss.hex};
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2.5px solid white;
            box-shadow: 0 4px 12px rgba(15, 56, 44, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          ">
            <span style="
              transform: rotate(45deg);
              font-size: ${isSelected ? '11px' : '9px'};
              font-weight: 800;
              font-family: 'JetBrains Mono', monospace;
              color: white;
            ">${Math.round(finca.isa)}</span>
          </div>
        `,
        iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
        iconAnchor: [isSelected ? 18 : 14, isSelected ? 36 : 28],
        popupAnchor: [0, -30],
      });

      const marker = L.marker(finca.coordenadas, { icon: customIcon });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans text-slate-800';
      popupContent.innerHTML = `
        <div style="width: 220px;">
          <img src="${finca.imagen}" alt="${finca.nombre}" style="width: 100%; height: 95px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <h4 style="font-weight: 700; font-size: 14px; margin: 0 0 2px 0; color: #0F382C;">${finca.nombre}</h4>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 6px 0; font-family: 'JetBrains Mono', monospace;">📍 Vereda ${finca.vereda} • ${finca.altitud} msnm</p>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 11px; font-weight: 600; color: #475569;">Puntaje ISA:</span>
            <span style="background-color: ${ietss.badgeBg}; color: ${ietss.badgeText}; border: 1px solid ${ietss.badgeBorder}; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: 800; font-family: 'JetBrains Mono', monospace;">
              ${finca.isa} (${ietss.codigo})
            </span>
          </div>
          <button id="btn-ver-finca-${finca.id}" style="
            width: 100%;
            background-color: #0F382C;
            color: white;
            border: none;
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 700;
            border-radius: 6px;
            cursor: pointer;
            font-family: 'Plus Jakarta Sans', sans-serif;
          ">
            Ver Dossier Completo
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-ver-finca-${finca.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectFinca) onSelectFinca(finca);
          };
        }
      });

      marker.addTo(markersGroup);

      if (isSelected) {
        marker.openPopup();
        map.setView(finca.coordenadas, 14, { animate: true });
      }
    });
  }, [fincas, fincaSeleccionada, onSelectFinca]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-glass-card border border-slate-200">
      <div ref={mapContainerRef} style={{ height }} className="w-full z-0" />
      {/* Semaphoric Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-glass-subtle border border-slate-200 text-xs z-[1000] flex flex-wrap items-center gap-3 font-mono-code">
        <span className="font-bold text-slate-800">SEMÁFORO IETSS:</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-hydro inline-block"></span> &gt;80 Sobresaliente</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> 61-80 Alto</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> 41-60 Moderado</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span> 21-40 Alerta</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> ≤20 Crítico</span>
      </div>
    </div>
  );
}
