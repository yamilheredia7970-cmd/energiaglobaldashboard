import './index.css';

declare const Chart: any;

// Configuración global de Chart.js para modo oscuro
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = '"Inter", ui-sans-serif, system-ui, sans-serif';
Chart.defaults.scale.grid.color = '#1e293b';
Chart.defaults.scale.grid.borderColor = '#1e293b';
Chart.defaults.plugins.tooltip.backgroundColor = '#0f172a';
Chart.defaults.plugins.tooltip.titleColor = '#f8fafc';
Chart.defaults.plugins.tooltip.bodyColor = '#cbd5e1';
Chart.defaults.plugins.tooltip.borderColor = '#334155';
Chart.defaults.plugins.tooltip.borderWidth = 1;

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  setupDateFilter();
});

const charts: Record<string, any> = {};

function initCharts() {
  // 1. Regime Shift (Area Chart)
  const ctxRegime = document.getElementById('chartRegime') as HTMLCanvasElement;
  charts.regime = new Chart(ctxRegime, {
    type: 'line',
    data: {
      labels: ['2014', '2016', '2018', '2020', '2022', '2024'],
      datasets: [
        {
          label: 'Renovables',
          data: [15, 18, 22, 26, 28, 32],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Fósiles',
          data: [85, 82, 78, 74, 72, 68],
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: { 
        y: { 
          stacked: true, 
          max: 100, 
          title: { display: true, text: '% del Mix Global' } 
        } 
      }
    }
  });

  // 2. Efficiency vs Wealth (Scatter)
  const ctxEfficiency = document.getElementById('chartEfficiency') as HTMLCanvasElement;
  charts.efficiency = new Chart(ctxEfficiency, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Países',
        data: [
          { x: 48000, y: 32000, r: 10, country: 'UK' },
          { x: 65000, y: 75000, r: 15, country: 'USA' },
          { x: 12500, y: 28000, r: 25, country: 'China' },
          { x: 51000, y: 38000, r: 12, country: 'Alemania' },
          { x: 2500, y: 7000, r: 30, country: 'India' },
          { x: 40000, y: 35000, r: 10, country: 'Francia' }
        ],
        backgroundColor: '#3b82f6',
        borderColor: '#60a5fa',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx: any) => `${ctx.raw.country}: PIB $${ctx.raw.x}, Energía: ${ctx.raw.y} kWh`
          }
        },
        legend: { display: false }
      },
      scales: {
        x: { title: { display: true, text: 'PIB per Cápita ($)' } },
        y: { title: { display: true, text: 'Consumo Energía per Cápita (kWh)' } }
      }
    }
  });

  // 3. Supply Chain Risk (Bar)
  const ctxSupply = document.getElementById('chartSupplyChain') as HTMLCanvasElement;
  charts.supply = new Chart(ctxSupply, {
    type: 'bar',
    data: {
      labels: ['China', 'India', 'USA', 'Alemania', 'Japón'],
      datasets: [
        { label: 'Carbón', data: [61, 73, 19, 28, 32], backgroundColor: '#475569' },
        { label: 'Gas/Petróleo', data: [9, 5, 40, 15, 38], backgroundColor: '#f59e0b' },
        { label: 'Limpia (Renovable/Nuclear)', data: [30, 22, 41, 57, 30], backgroundColor: '#10b981' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: { 
        x: { stacked: true, max: 100, title: { display: true, text: '% Generación Eléctrica' } }, 
        y: { stacked: true } 
      }
    }
  });

  // 4. Investment Momentum (Line)
  const ctxMomentum = document.getElementById('chartMomentum') as HTMLCanvasElement;
  charts.momentum = new Chart(ctxMomentum, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        { label: 'Solar', data: [115, 138, 182, 239, 345, 420], borderColor: '#eab308', backgroundColor: '#eab308', tension: 0.3, borderWidth: 3 },
        { label: 'Eólica', data: [60, 111, 92, 105, 118, 135], borderColor: '#0ea5e9', backgroundColor: '#0ea5e9', tension: 0.3, borderWidth: 3 },
        { label: 'Carbón', data: [45, 20, 38, 15, 8, -12], borderColor: '#64748b', backgroundColor: '#64748b', tension: 0.3, borderDash: [5, 5] }
      ]
    },
    options: { 
      responsive: true, 
      maintainAspectRatio: false,
      scales: {
        y: { title: { display: true, text: 'Adición Neta (TWh)' } }
      }
    }
  });
}

function setupDateFilter() {
  const select = document.getElementById('dateRange') as HTMLSelectElement;
  select.addEventListener('change', (e) => {
    const val = (e.target as HTMLSelectElement).value;
    updateKPIs(val);
    updateCharts(val);
  });
}

function updateKPIs(range: string) {
  const kpiConsumo = document.getElementById('kpi-consumo');
  const kpiMix = document.getElementById('kpi-mix');
  const kpiIntensidad = document.getElementById('kpi-intensidad');

  if (!kpiConsumo || !kpiMix || !kpiIntensidad) return;

  // Simulación de cambio de datos según el filtro
  if (range === '30' || range === '90') {
    kpiConsumo.innerText = '13,500';
    kpiMix.innerText = '31.2';
    kpiIntensidad.innerText = '1.21';
  } else if (range === 'ytd') {
    kpiConsumo.innerText = '45,200';
    kpiMix.innerText = '30.5';
    kpiIntensidad.innerText = '1.22';
  } else if (range === '5y') {
    kpiConsumo.innerText = '158,000';
    kpiMix.innerText = '28.1';
    kpiIntensidad.innerText = '1.26';
  } else {
    kpiConsumo.innerText = '160,000';
    kpiMix.innerText = '29.4';
    kpiIntensidad.innerText = '1.24';
  }
}

function updateCharts(range: string) {
  // Animación simple para simular la actualización de datos al cambiar el filtro
  Object.values(charts).forEach(chart => {
    chart.data.datasets.forEach((ds: any) => {
      if (ds.data[0] !== undefined && typeof ds.data[0] === 'number') {
        ds.data = ds.data.map((v: number) => {
          const variation = (Math.random() * 0.15) - 0.05; // -5% to +10%
          return Number((v * (1 + variation)).toFixed(1));
        });
      } else if (ds.data[0] !== undefined && typeof ds.data[0] === 'object') {
        // Para el scatter plot
        ds.data = ds.data.map((v: any) => ({
          ...v,
          x: Number((v.x * (1 + ((Math.random() * 0.1) - 0.05))).toFixed(0)),
          y: Number((v.y * (1 + ((Math.random() * 0.1) - 0.05))).toFixed(0))
        }));
      }
    });
    chart.update();
  });
}

