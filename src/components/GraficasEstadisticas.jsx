import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

export function GraficaBarrasVeredas({ fincas }) {
  // Group by vereda and compute average ISA
  const veredasMap = {};
  fincas.forEach((f) => {
    if (!veredasMap[f.vereda]) {
      veredasMap[f.vereda] = { total: 0, count: 0 };
    }
    veredasMap[f.vereda].total += f.isa;
    veredasMap[f.vereda].count += 1;
  });

  const labels = Object.keys(veredasMap);
  const dataValues = labels.map((v) => Math.round((veredasMap[v].total / veredasMap[v].count) * 10) / 10);

  const data = {
    labels,
    datasets: [
      {
        label: 'Promedio ISA por Vereda',
        data: dataValues,
        backgroundColor: [
          '#734d2e',
          '#8f6339',
          '#059669',
          '#10b981',
          '#d97706',
          '#3b82f6',
          '#f59e0b',
          '#ea580c',
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (c) => `Promedio ISA: ${c.raw} pts`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
        grid: { color: '#f5f5f4' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
}

export function GraficaDonaIetss({ fincas }) {
  let azul = 0, verde = 0, amarillo = 0, naranja = 0, rojo = 0;
  fincas.forEach((f) => {
    if (f.isa > 80) azul++;
    else if (f.isa > 60) verde++;
    else if (f.isa > 40) amarillo++;
    else if (f.isa > 20) naranja++;
    else rojo++;
  });

  const data = {
    labels: ['Azul: Excelente (>80)', 'Verde: Alto (61-80)', 'Amarillo: Medio (41-60)', 'Naranja: Bajo (21-40)'],
    datasets: [
      {
        data: [azul, verde, amarillo, naranja],
        backgroundColor: ['#2563eb', '#059669', '#d97706', '#ea580c'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
    cutout: '65%',
  };

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export function GraficaEvolucionTemporal() {
  const data = {
    labels: ['Ene 2025', 'Abr 2025', 'Jul 2025', 'Oct 2025', 'Ene 2026', 'Abr 2026', 'Ago 2026', 'Sep 2026'],
    datasets: [
      {
        label: 'Promedio Territorial ISA Fusagasugá',
        data: [58.4, 61.2, 63.8, 65.0, 67.5, 69.8, 72.4, 74.1],
        borderColor: '#734d2e',
        backgroundColor: 'rgba(115, 77, 46, 0.1)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#5a3b25',
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      y: { min: 40, max: 90, grid: { color: '#f5f5f4' } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
}
