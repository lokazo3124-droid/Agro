import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarMiesa({ dimensiones, nombre = "Predio Evaluado" }) {
  const data = {
    labels: [
      'PS: Productivo (25%)',
      'GA: Ambiental (30%)',
      'DS: Social (15%)',
      'GC: Comercial (10%)',
      'AT: Turismo (20%)',
    ],
    datasets: [
      {
        label: `${nombre} (Escala 1-5)`,
        data: [
          dimensiones.PS || 0,
          dimensiones.GA || 0,
          dimensiones.DS || 0,
          dimensiones.GC || 0,
          dimensiones.AT || 0,
        ],
        backgroundColor: 'rgba(15, 56, 44, 0.22)', // Deep Montane Emerald
        borderColor: '#0F382C',
        borderWidth: 2.5,
        pointBackgroundColor: '#184E3F',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
      {
        label: 'Benchmark Territorial Sumapaz',
        data: [4.2, 4.3, 4.0, 3.8, 4.4],
        backgroundColor: 'rgba(139, 90, 43, 0.06)', // Coffee Loam
        borderColor: 'rgba(139, 90, 43, 0.5)',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 3,
        pointBackgroundColor: '#8B5A2B',
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: '#E2E8F0',
        },
        grid: {
          color: '#F1F5F9',
        },
        suggestedMin: 1,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          font: { size: 10, family: "'JetBrains Mono', monospace" },
          backdropColor: 'transparent',
          color: '#64748B',
        },
        pointLabels: {
          font: {
            size: 11,
            weight: '700',
            family: "'Plus Jakarta Sans', sans-serif"
          },
          color: '#0F172A',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          font: { size: 11, family: "'Plus Jakarta Sans', sans-serif", weight: '600' },
          color: '#334155',
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: "'Plus Jakarta Sans', sans-serif", weight: '700' },
        bodyFont: { family: "'JetBrains Mono', monospace" },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${context.raw} / 5.0`
        }
      }
    },
  };

  return (
    <div className="w-full h-72">
      <Radar data={data} options={options} />
    </div>
  );
}
