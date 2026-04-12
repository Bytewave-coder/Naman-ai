/**
 * ╔══════════════════════════════════════════════════╗
 * ║         NAMAN AI — Beta Maintenance Panel        ║
 * ║         bytewavext@gmail.com                     ║
 * ╚══════════════════════════════════════════════════╝
 *
 * Drop this script anywhere in your HTML:
 *   <script src="beta-panel.js"></script>
 *
 * It auto-injects Google Material Icons if not already loaded.
 */

(function () {
  'use strict';

  /* ─── CONFIG ─────────────────────────────────────── */
  const CFG = {
    appName:      'NAMAN AI',
    version:      'v0.9 Beta',
    email:        'bytewavext@gmail.com',
    storageKey:   'naman_beta_dismissed',
    // Set to true to always show (ignore dismiss), false to respect dismiss
    alwaysShow:   false,
  };

  /* ─── SKIP IF ALREADY DISMISSED ─────────────────── */
  if (!CFG.alwaysShow && sessionStorage.getItem(CFG.storageKey)) return;

  /* ─── INJECT MATERIAL ICONS IF MISSING ──────────── */
  if (!document.querySelector('link[href*="Material+Icons"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Round';
    document.head.appendChild(link);
  }

  /* ─── INJECT STYLES ──────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* Reset scope */
    #bp-overlay *, #bp-overlay *::before, #bp-overlay *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ── Overlay ── */
    #bp-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background: rgba(4, 6, 16, 0.88);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      animation: bp-overlay-in 0.45s cubic-bezier(0.16,1,0.3,1) both;
    }

    @keyframes bp-overlay-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ── Panel ── */
    #bp-panel {
      position: relative;
      width: 100%;
      max-width: 480px;
      background: linear-gradient(160deg, rgba(10,16,34,0.97) 0%, rgba(6,10,24,0.99) 100%);
      border: 1px solid rgba(0,243,255,0.18);
      border-radius: 28px;
      overflow: hidden;
      box-shadow:
        0 0 0 1px rgba(0,243,255,0.05),
        0 30px 80px rgba(0,0,0,0.7),
        0 0 60px rgba(0,243,255,0.06),
        inset 0 1px 0 rgba(255,255,255,0.05);
      animation: bp-panel-in 0.55s cubic-bezier(0.34,1.30,0.64,1) both;
      animation-delay: 0.08s;
    }

    @keyframes bp-panel-in {
      from { opacity:0; transform: translateY(40px) scale(0.93); }
      to   { opacity:1; transform: translateY(0)   scale(1);    }
    }

    /* ── Animated top glow bar ── */
    #bp-glow-bar {
      height: 3px;
      background: linear-gradient(90deg, #00f3ff, #bc13fe, #00f3ff, #bc13fe);
      background-size: 300% 100%;
      animation: bp-glow-slide 3s linear infinite;
    }
    @keyframes bp-glow-slide {
      0%   { background-position: 0%   0; }
      100% { background-position: 300% 0; }
    }

    /* ── Background particles canvas ── */
    #bp-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.35;
    }

    /* ── Body content ── */
    #bp-body {
      position: relative;
      z-index: 1;
      padding: 36px 32px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    /* ── Status chip ── */
    #bp-status-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 14px 5px 10px;
      background: rgba(0,255,135,0.08);
      border: 1px solid rgba(0,255,135,0.22);
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #00ff87;
      text-transform: uppercase;
      margin-bottom: 24px;
      animation: bp-chip-in 0.4s ease both;
      animation-delay: 0.35s;
    }
    @keyframes bp-chip-in {
      from { opacity:0; transform: translateY(-8px); }
      to   { opacity:1; transform: translateY(0); }
    }

    #bp-status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #00ff87;
      box-shadow: 0 0 8px #00ff87;
      animation: bp-dot-pulse 1.6s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes bp-dot-pulse {
      0%,100% { transform: scale(1);   opacity: 1; }
      50%      { transform: scale(1.4); opacity: 0.6; }
    }

    /* ── App icon ── */
    #bp-icon-wrap {
      position: relative;
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
      animation: bp-icon-in 0.5s cubic-bezier(0.34,1.5,0.64,1) both;
      animation-delay: 0.25s;
    }
    @keyframes bp-icon-in {
      from { opacity:0; transform: scale(0.5) rotate(-15deg); }
      to   { opacity:1; transform: scale(1)   rotate(0deg); }
    }

    #bp-icon-bg {
      width: 80px;
      height: 80px;
      border-radius: 22px;
      background: linear-gradient(135deg, #00f3ff 0%, #bc13fe 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 1px rgba(0,243,255,0.3), 0 12px 36px rgba(0,243,255,0.3);
      animation: bp-icon-glow 2.5s ease-in-out infinite;
    }
    @keyframes bp-icon-glow {
      0%,100% { box-shadow: 0 0 0 1px rgba(0,243,255,0.3), 0 12px 36px rgba(0,243,255,0.25); }
      50%      { box-shadow: 0 0 0 1px rgba(188,19,254,0.4), 0 12px 48px rgba(188,19,254,0.35); }
    }

    #bp-icon-bg .material-icons-round {
      font-size: 36px;
      color: #000;
    }

    /* ── Badge on icon ── */
    #bp-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #fff;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 7px;
      border-radius: 99px;
      border: 2px solid rgba(6,10,24,1);
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(245,158,11,0.4);
    }

    /* ── Title ── */
    #bp-title {
      font-family: 'Sora', 'Segoe UI', sans-serif;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-align: center;
      background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 6px;
      animation: bp-fade-up 0.4s ease both;
      animation-delay: 0.38s;
    }

    #bp-subtitle {
      font-size: 13px;
      color: rgba(150,165,200,0.7);
      text-align: center;
      letter-spacing: 0.02em;
      margin-bottom: 28px;
      animation: bp-fade-up 0.4s ease both;
      animation-delay: 0.44s;
    }

    @keyframes bp-fade-up {
      from { opacity:0; transform: translateY(10px); }
      to   { opacity:1; transform: translateY(0); }
    }

    /* ── Info cards ── */
    #bp-cards {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      margin-bottom: 24px;
    }

    .bp-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      transition: border-color 0.2s, background 0.2s;
      animation: bp-card-in 0.4s ease both;
    }
    .bp-card:hover {
      border-color: rgba(0,243,255,0.18);
      background: rgba(0,243,255,0.04);
    }

    .bp-card:nth-child(1) { animation-delay: 0.48s; }
    .bp-card:nth-child(2) { animation-delay: 0.54s; }
    .bp-card:nth-child(3) { animation-delay: 0.60s; }

    @keyframes bp-card-in {
      from { opacity:0; transform: translateX(-12px); }
      to   { opacity:1; transform: translateX(0); }
    }

    .bp-card-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .bp-card-icon .material-icons-round { font-size: 18px; }

    .bp-card-icon.amber  { background: rgba(245,158,11,0.12); color: #f59e0b; }
    .bp-card-icon.cyan   { background: rgba(0,243,255,0.10);  color: #00f3ff; }
    .bp-card-icon.purple { background: rgba(188,19,254,0.10); color: #bc13fe; }

    .bp-card-text-wrap { flex: 1; min-width: 0; }

    .bp-card-title {
      font-size: 12px;
      font-weight: 700;
      color: rgba(220,230,255,0.9);
      letter-spacing: 0.01em;
      margin-bottom: 2px;
    }
    .bp-card-desc {
      font-size: 11px;
      color: rgba(130,145,175,0.75);
      line-height: 1.55;
    }

    /* ── Divider ── */
    .bp-divider {
      width: 100%;
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin-bottom: 20px;
      animation: bp-fade-up 0.4s ease both;
      animation-delay: 0.64s;
    }

    /* ── Contact section ── */
    #bp-contact-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(130,145,175,0.6);
      margin-bottom: 10px;
      animation: bp-fade-up 0.4s ease both;
      animation-delay: 0.68s;
    }

    #bp-email-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 20px;
      background: rgba(0,243,255,0.07);
      border: 1px solid rgba(0,243,255,0.22);
      border-radius: 14px;
      color: #00f3ff;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
      margin-bottom: 24px;
      animation: bp-fade-up 0.4s ease both;
      animation-delay: 0.72s;
    }
    #bp-email-btn:hover {
      background: rgba(0,243,255,0.14);
      border-color: rgba(0,243,255,0.45);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,243,255,0.18);
    }
    #bp-email-btn:active {
      transform: translateY(0);
    }
    #bp-email-btn .material-icons-round {
      font-size: 17px;
    }

    /* ── CTA Button ── */
    #bp-cta {
      width: 100%;
      padding: 15px;
      border-radius: 16px;
      border: none;
      background: linear-gradient(135deg, #00f3ff 0%, #3b82f6 50%, #bc13fe 100%);
      background-size: 200% 100%;
      color: #000;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: all 0.28s cubic-bezier(0.34,1.2,0.64,1);
      box-shadow: 0 4px 24px rgba(0,243,255,0.25);
      animation: bp-btn-in 0.4s ease both, bp-btn-gradient 4s linear infinite;
      animation-delay: 0.78s, 0s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      position: relative;
      overflow: hidden;
    }

    @keyframes bp-btn-in {
      from { opacity:0; transform: translateY(10px); }
      to   { opacity:1; transform: translateY(0); }
    }
    @keyframes bp-btn-gradient {
      0%   { background-position: 0%   0; }
      50%  { background-position: 100% 0; }
      100% { background-position: 0%   0; }
    }

    #bp-cta:hover {
      transform: translateY(-3px) scale(1.01);
      box-shadow: 0 12px 40px rgba(0,243,255,0.35), 0 0 0 1px rgba(255,255,255,0.12);
    }
    #bp-cta:active {
      transform: translateY(-1px) scale(0.99);
    }
    #bp-cta .material-icons-round { font-size: 18px; }

    /* ── Ripple on CTA ── */
    .bp-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      animation: bp-ripple-anim 0.55s linear;
      pointer-events: none;
    }
    @keyframes bp-ripple-anim {
      to { transform: scale(4); opacity: 0; }
    }

    /* ── Footer note ── */
    #bp-footer {
      margin-top: 14px;
      font-size: 10px;
      color: rgba(100,115,145,0.55);
      text-align: center;
      letter-spacing: 0.02em;
      animation: bp-fade-up 0.4s ease both;
      animation-delay: 0.82s;
    }

    /* ── Close button ── */
    #bp-close {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.05);
      color: rgba(180,190,210,0.6);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.18s;
      animation: bp-fade-up 0.3s ease both;
      animation-delay: 0.9s;
    }
    #bp-close:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
      border-color: rgba(255,255,255,0.2);
      transform: rotate(90deg);
    }
    #bp-close .material-icons-round { font-size: 16px; }

    /* ── Exit animation ── */
    #bp-overlay.bp-exit {
      animation: bp-overlay-out 0.35s cubic-bezier(0.4,0,1,1) forwards;
    }
    #bp-overlay.bp-exit #bp-panel {
      animation: bp-panel-out 0.32s cubic-bezier(0.4,0,1,1) forwards;
    }
    @keyframes bp-overlay-out {
      to { opacity: 0; }
    }
    @keyframes bp-panel-out {
      to { opacity: 0; transform: translateY(30px) scale(0.94); }
    }

    /* ── Mobile ── */
    @media (max-width: 480px) {
      #bp-body      { padding: 28px 20px 24px; }
      #bp-title     { font-size: 22px; }
      #bp-icon-wrap { width: 68px; height: 68px; }
      #bp-icon-bg   { width: 68px; height: 68px; border-radius: 18px; }
      #bp-icon-bg .material-icons-round { font-size: 30px; }
    }
  `;
  document.head.appendChild(style);

  /* ─── BUILD HTML ─────────────────────────────────── */
  const overlay = document.createElement('div');
  overlay.id = 'bp-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Beta Version Notice');

  overlay.innerHTML = `
    <div id="bp-panel">
      <div id="bp-glow-bar"></div>
      <canvas id="bp-canvas"></canvas>

      <button id="bp-close" title="Dismiss">
        <span class="material-icons-round">close</span>
      </button>

      <div id="bp-body">

        <!-- Status chip -->
        <div id="bp-status-chip">
          <div id="bp-status-dot"></div>
          System Active — Beta Phase
        </div>

        <!-- Icon -->
        <div id="bp-icon-wrap">
          <div id="bp-icon-bg">
            <span class="material-icons-round">auto_awesome</span>
          </div>
          <div id="bp-badge">BETA</div>
        </div>

        <!-- Titles -->
        <div id="bp-title">${CFG.appName}</div>
        <div id="bp-subtitle">${CFG.version} &nbsp;·&nbsp; Early Access</div>

        <!-- Info cards -->
        <div id="bp-cards">

          <div class="bp-card">
            <div class="bp-card-icon amber">
              <span class="material-icons-round">construction</span>
            </div>
            <div class="bp-card-text-wrap">
              <div class="bp-card-title">Active Development</div>
              <div class="bp-card-desc">Features are being built and improved continuously. You may encounter bugs or incomplete experiences.</div>
            </div>
          </div>

          <div class="bp-card">
            <div class="bp-card-icon cyan">
              <span class="material-icons-round">warning_amber</span>
            </div>
            <div class="bp-card-text-wrap">
              <div class="bp-card-title">Maintenance Mode</div>
              <div class="bp-card-desc">Some features may be temporarily unavailable while the team works on improvements and stability patches.</div>
            </div>
          </div>

          <div class="bp-card">
            <div class="bp-card-icon purple">
              <span class="material-icons-round">bug_report</span>
            </div>
            <div class="bp-card-text-wrap">
              <div class="bp-card-title">Found a Bug?</div>
              <div class="bp-card-desc">Your feedback matters. Report any issue directly to our team — every report helps us improve.</div>
            </div>
          </div>

        </div><!-- /cards -->

        <div class="bp-divider"></div>

        <div id="bp-contact-label">Contact the Developer</div>

        <a id="bp-email-btn" href="mailto:${CFG.email}?subject=Bug%20Report%20%7C%20NAMAN%20AI%20Beta&body=Hi%20team%2C%0A%0AI%20found%20the%20following%20issue%3A%0A%0A" target="_blank" rel="noopener">
          <span class="material-icons-round">mail</span>
          ${CFG.email}
        </a>

        <button id="bp-cta">
          <span class="material-icons-round">rocket_launch</span>
          Continue to ${CFG.appName}
        </button>

        <div id="bp-footer">
          By continuing you acknowledge this is a beta product.<br>
          Unexpected behavior may occur &mdash; thank you for testing!
        </div>

      </div><!-- /body -->
    </div><!-- /panel -->
  `;

  document.body.appendChild(overlay);

  /* ─── PARTICLE CANVAS ────────────────────────────── */
  (function initParticles() {
    const canvas = document.getElementById('bp-canvas');
    const panel  = document.getElementById('bp-panel');
    const ctx    = canvas.getContext('2d');

    function resize() {
      canvas.width  = panel.offsetWidth;
      canvas.height = panel.offsetHeight;
    }
    resize();

    const COLORS = ['rgba(0,243,255,', 'rgba(188,19,254,', 'rgba(0,255,135,'];
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15,
    }));

    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', resize);

    /* expose cancel so we can stop on close */
    window._bpCancelParticles = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  })();

  /* ─── RIPPLE EFFECT ──────────────────────────────── */
  document.getElementById('bp-cta').addEventListener('click', function (e) {
    const btn = this;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const rip  = document.createElement('span');
    rip.className = 'bp-ripple';
    rip.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top  - size/2}px;
    `;
    btn.appendChild(rip);
    rip.addEventListener('animationend', () => rip.remove());
  });

  /* ─── DISMISS LOGIC ──────────────────────────────── */
  function dismiss() {
    if (window._bpCancelParticles) window._bpCancelParticles();
    overlay.classList.add('bp-exit');
    overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
    sessionStorage.setItem(CFG.storageKey, '1');
  }

  document.getElementById('bp-cta').addEventListener('click', dismiss);
  document.getElementById('bp-close').addEventListener('click', dismiss);

  /* Close on overlay click (outside panel) */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismiss();
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', escHandler); }
  });

})();
