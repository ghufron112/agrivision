import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { PlantDistributionRegion } from '../../types/plant';

interface DistributionMapProps {
  regions: PlantDistributionRegion[];
  plantName: string;
}

export const DistributionMap: React.FC<DistributionMapProps> = ({ regions, plantName }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up if already initialized
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map centered on Indonesia
    const map = L.map(mapContainerRef.current, {
      center: [-2.5489, 118.0149],
      zoom: 5,
      zoomControl: true,
      minZoom: 4,
      maxZoom: 10
    });

    mapInstanceRef.current = map;

    // Use OpenStreetMap standard or light tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    // Custom marker creator using SVG divIcon
    const createMarkerIcon = (status: 'Tercatat' | 'Kemungkinan' | 'Tidak Tercatat') => {
      let bg = '#07865B'; // Primary green
      let border = '#FFFFFF';
      let shadow = 'rgba(7, 134, 91, 0.4)';

      if (status === 'Kemungkinan') {
        bg = '#EAB308'; // Amber
        shadow = 'rgba(234, 179, 8, 0.4)';
      } else if (status === 'Tidak Tercatat') {
        bg = '#94A3B8'; // Slate
        shadow = 'rgba(148, 163, 184, 0.4)';
      }

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: 22px;
            height: 22px;
            background-color: ${bg};
            border: 2.5px solid ${border};
            border-radius: 50%;
            box-shadow: 0 0 0 4px ${shadow}, 0 2px 4px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <div style="width: 6px; height: 6px; background-color: white; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12]
      });
    };

    // Add markers for all distribution regions
    regions.forEach((item) => {
      const marker = L.marker([item.lat, item.lng], {
        icon: createMarkerIcon(item.status)
      }).addTo(map);

      const statusBadgeColor =
        item.status === 'Tercatat'
          ? 'background-color: #E5F5EE; color: #07865B;'
          : item.status === 'Kemungkinan'
          ? 'background-color: #FEF9C3; color: #854D0E;'
          : 'background-color: #F1F5F9; color: #475569;';

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 150px;">
          <div style="font-weight: 700; font-size: 13px; color: #172B36; margin-bottom: 4px;">
            ${item.region}
          </div>
          <div style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 6px; ${statusBadgeColor}">
            ${item.status}
          </div>
          ${
            item.observationCount
              ? `<div style="color: #647985; font-size: 11px;">Catatan Observasi: <b>${item.observationCount} spesimen</b></div>`
              : ''
          }
          ${
            item.notes
              ? `<div style="margin-top: 4px; font-size: 11px; color: #475569;">${item.notes}</div>`
              : ''
          }
        </div>
      `);
    });

    // Invalidate map size after a tick to prevent rendering issues inside flex cards
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [regions, plantName]);

  return (
    <div className="relative w-full h-[380px] md:h-[460px] rounded-lg overflow-hidden border border-[#DCE8ED]">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Map Legend (Top Right) */}
      <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-xs border border-[#DCE8ED] rounded-md px-3 py-2 text-xs shadow-sm space-y-1.5 select-none">
        <div className="font-semibold text-[#172B36] text-[11px] uppercase tracking-wider mb-1">
          Status Persebaran
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#07865B] border border-white shadow-xs"></span>
          <span className="text-[#172B36] font-medium">Tercatat</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EAB308] border border-white shadow-xs"></span>
          <span className="text-[#172B36] font-medium">Kemungkinan</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#94A3B8] border border-white shadow-xs"></span>
          <span className="text-[#647985] font-medium">Tidak Tercatat</span>
        </div>
      </div>
    </div>
  );
};
