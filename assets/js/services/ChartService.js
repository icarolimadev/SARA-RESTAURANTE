/** Serviço de gráficos Canvas (sem dependências externas) */
export class ChartService {
  static drawBar(canvasId, labels, values, color = '#16a34a') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.parentElement?.clientWidth || 400;
    const h = parseInt(canvas.getAttribute('height') || '200', 10);
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);

    const max = Math.max(...values, 1);
    const pad = 30;
    const barW = (w - pad * 2) / values.length - 8;

    values.forEach((v, i) => {
      const barH = ((h - pad * 2) * v) / max;
      const x = pad + i * (barW + 8);
      const y = h - pad - barH;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 4);
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barW / 2, h - 8);
    });
  }

  static drawLine(canvasId, labels, values, color = '#0284c7') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.parentElement?.clientWidth || 400;
    const h = parseInt(canvas.getAttribute('height') || '200', 10);
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);

    const max = Math.max(...values, 1);
    const pad = 30;
    const step = (w - pad * 2) / (values.length - 1 || 1);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = pad + i * step;
      const y = h - pad - ((h - pad * 2) * v) / max;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = color;
    values.forEach((v, i) => {
      const x = pad + i * step;
      const y = h - pad - ((h - pad * 2) * v) / max;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  static drawDonut(canvasId, segments) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = Math.min(canvas.parentElement?.clientWidth || 220, 220);
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 20;
    const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
    let angle = -Math.PI / 2;

    segments.forEach(seg => {
      const slice = (seg.value / total) * Math.PI * 2;
      ctx.fillStyle = seg.color;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + slice);
      ctx.closePath();
      ctx.fill();
      angle += slice;
    });

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }
}
