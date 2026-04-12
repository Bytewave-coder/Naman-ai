/**
 * ╔═══════════════════════════════════════════════════════╗
 * ║      NAMAN AI — Ultra Premium Beta Panel v2.0        ║
 * ║      bytewavext@gmail.com                            ║
 * ╚═══════════════════════════════════════════════════════╝
 *  Usage: <script src="beta-panel.js"></script>
 */

(function () {
  'use strict';

  const CFG = {
    appName:    'NAMAN AI',
    version:    'v0.9 Beta',
    email:      'bytewavext@gmail.com',
    storageKey: 'naman_beta_v2',
    alwaysShow: false,
  };

  if (!CFG.alwaysShow && sessionStorage.getItem(CFG.storageKey)) return;

  /* ── Inject Google Fonts (Sora only — icons are now inline SVG) ── */
  ['https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap'
  ].forEach(href => {
    if (!document.querySelector('link[href="' + href + '"]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = href;
      document.head.appendChild(l);
    }
  });

  /* ── Inline SVG icon helper (no external font dependency) ── */
  const ICONS = {
    close:         '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    auto_awesome:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/></svg>',
    construction:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>',
    warning_amber: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>',
    bug_report:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C13 5.06 12.51 5 12 5s-1 .06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-4 4v3c0 2.21-1.79 4-4 4s-4-1.79-4-4v-3c0-2.21 1.79-4 4-4s4 1.79 4 4z"/></svg>',
    mail:          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    rocket_launch: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10l4-4 3.19.35zM10 15l-.54 3.07c.31-.13 3.58-1.53 5.87-3.53L15 14l-5-5-.06.06L10 15zm3.06 3.26C15.38 16.2 18 12.88 18 9c0-.64-.08-1.29-.22-1.93-.64-.14-1.29-.22-1.93-.22-3.85 0-7.2 2.59-9.26 4.97L10.96 15l2.1 3.26zM13 4s3 0 7 4c0 0 1 8-6 12 0 0-1-3-4-5l-3 3-2-2 3-3c-2-3-5-4-5-4 4-7 10-5 10-5zm.5 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>',
  };
  function bpIcon(name, cls) {
    return '<span class="bp-svg-icon' + (cls ? ' ' + cls : '') + '">' + (ICONS[name] || '') + '</span>';
  }

  /* ══════════════════════════════ STYLES ══════════════════════════════ */
  const style = document.createElement('style');
  style.textContent = `
    #bp-overlay *, #bp-overlay *::before, #bp-overlay *::after {
      box-sizing: border-box; margin: 0; padding: 0;
      font-family: 'Sora', 'Segoe UI', sans-serif;
    }

    /* Overlay */
    #bp-overlay {
      position: fixed; inset: 0; z-index: 999999;
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      background: rgba(2, 4, 14, 0.92);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      animation: bpFadeIn .5s ease both;
    }
    @keyframes bpFadeIn { from{opacity:0} to{opacity:1} }

    /* Panel */
    #bp-panel {
      position: relative; width: 100%; max-width: 460px;
      background: radial-gradient(ellipse at 50% -10%, rgba(0,243,255,0.07) 0%, transparent 55%),
                  linear-gradient(170deg, rgba(12,18,38,0.98) 0%, rgba(5,8,20,0.99) 100%);
      border-radius: 32px; overflow: hidden;
      animation: bpPanelIn .65s cubic-bezier(0.34,1.4,0.64,1) both;
      animation-delay: .05s;
      transform-style: preserve-3d;
    }
    @keyframes bpPanelIn {
      from { opacity:0; transform: translateY(60px) scale(0.88); }
      to   { opacity:1; transform: translateY(0)   scale(1); }
    }

    /* Animated gradient border */
    #bp-border-anim {
      position: absolute; inset: 0; border-radius: 32px; z-index: 0;
      padding: 1.5px;
      background: linear-gradient(120deg, #00f3ff, #bc13fe, #00ff87, #00f3ff);
      background-size: 300% 300%;
      animation: bpBorderSpin 4s linear infinite;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
    }
    @keyframes bpBorderSpin {
      0%   { background-position: 0%   50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0%   50%; }
    }

    /* Rainbow glow bar */
    #bp-glow-bar {
      height: 3px; position: relative; z-index: 2;
      background: linear-gradient(90deg, transparent, #00f3ff, #bc13fe, #00ff87, transparent);
      background-size: 200% 100%;
      animation: bpGlowSlide 2.5s linear infinite;
    }
    @keyframes bpGlowSlide {
      0%   { background-position: -200% 0; }
      100% { background-position:  200% 0; }
    }

    /* Particle canvas */
    #bp-canvas { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1; }

    /* Ambient blob */
    #bp-blob {
      position: absolute; width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,243,255,0.07) 0%, transparent 70%);
      top: -90px; left: 50%; transform: translateX(-50%);
      pointer-events: none; z-index: 1;
      animation: bpBlobPulse 4s ease-in-out infinite;
    }
    @keyframes bpBlobPulse {
      0%,100% { transform: translateX(-50%) scale(1);   opacity:.7; }
      50%      { transform: translateX(-50%) scale(1.2); opacity:1;  }
    }

    /* Body */
    #bp-body {
      position: relative; z-index: 3;
      padding: 34px 28px 28px;
      display: flex; flex-direction: column; align-items: center;
    }

    /* Close */
    #bp-close {
      position: absolute; top: 14px; right: 14px; z-index: 10;
      width: 34px; height: 34px; border-radius: 11px;
      border: 1px solid rgba(255,255,255,0.09);
      background: rgba(255,255,255,0.05);
      color: rgba(180,190,220,0.55); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .25s cubic-bezier(0.34,1.5,0.64,1);
      animation: bpFadeUp .3s ease both; animation-delay: .9s;
    }
    #bp-close:hover {
      background: rgba(255,255,255,0.12); color: #fff;
      border-color: rgba(255,255,255,0.22);
      transform: rotate(90deg) scale(1.1);
      box-shadow: 0 0 16px rgba(0,243,255,0.2);
    }
    #bp-close .bp-svg-icon { width: 16px; height: 16px; }

    /* Status chip */
    #bp-chip {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 16px 6px 12px;
      background: rgba(0,255,135,0.08); border: 1px solid rgba(0,255,135,0.25);
      border-radius: 99px; font-size: 10.5px; font-weight: 700;
      letter-spacing: .08em; color: #00ff87; text-transform: uppercase;
      margin-bottom: 22px; position: relative; overflow: hidden;
      animation: bpFadeUp .4s ease both; animation-delay: .3s;
    }
    #bp-chip::after {
      content: ''; position: absolute; top:0; left:-100%; width:60%; height:100%;
      background: linear-gradient(90deg, transparent, rgba(0,255,135,0.25), transparent);
      animation: bpChipShimmer 3s ease-in-out infinite;
    }
    @keyframes bpChipShimmer { 0%{left:-100%} 60%,100%{left:200%} }

    .bp-dot {
      width: 7px; height: 7px; border-radius: 50%; background: #00ff87;
      box-shadow: 0 0 0 0 rgba(0,255,135,0.5); flex-shrink: 0;
      animation: bpDotRing 1.8s ease-in-out infinite;
    }
    @keyframes bpDotRing {
      0%  { box-shadow: 0 0 0 0   rgba(0,255,135,0.6); }
      70% { box-shadow: 0 0 0 8px rgba(0,255,135,0);   }
      100%{ box-shadow: 0 0 0 0   rgba(0,255,135,0);   }
    }

    /* Icon */
    #bp-icon-wrap {
      position: relative; width: 84px; height: 84px; margin-bottom: 18px;
      animation: bpIconIn .6s cubic-bezier(0.34,1.6,0.64,1) both; animation-delay: .2s;
    }
    @keyframes bpIconIn {
      from { opacity:0; transform: scale(0.4) rotate(-20deg); }
      to   { opacity:1; transform: scale(1)   rotate(0deg);   }
    }

    #bp-ring1, #bp-ring2 {
      position: absolute; border-radius: 50%;
      top: 50%; left: 50%; transform: translate(-50%,-50%);
    }
    #bp-ring1 {
      width: 108px; height: 108px;
      border: 1.5px dashed rgba(0,243,255,0.22);
      animation: bpSpin 8s linear infinite;
    }
    #bp-ring2 {
      width: 130px; height: 130px;
      border: 1px dashed rgba(188,19,254,0.15);
      animation: bpSpin 13s linear infinite reverse;
    }
    @keyframes bpSpin { to { transform: translate(-50%,-50%) rotate(360deg); } }

    #bp-orbit-dot {
      position: absolute; width: 7px; height: 7px; border-radius: 50%;
      background: #00f3ff; box-shadow: 0 0 12px #00f3ff;
      top: calc(50% - 54px); left: 50%; margin-left: -3.5px;
      transform-origin: 3.5px 54px;
      animation: bpSpin2 8s linear infinite;
    }
    @keyframes bpSpin2 { to { transform: rotate(360deg); } }

    #bp-icon-bg {
      width: 84px; height: 84px; border-radius: 24px;
      background: linear-gradient(135deg, #00f3ff 0%, #3b82f6 50%, #bc13fe 100%);
      display: flex; align-items: center; justify-content: center;
      position: relative; z-index: 2;
      animation: bpIconGlow 3s ease-in-out infinite;
    }
    @keyframes bpIconGlow {
      0%,100% { box-shadow: 0 8px 32px rgba(0,243,255,0.3), 0 0 0 0   rgba(0,243,255,0.2); }
      50%      { box-shadow: 0 12px 48px rgba(188,19,254,0.4), 0 0 0 12px rgba(188,19,254,0); }
    }
    #bp-icon-bg .bp-svg-icon { width: 38px; height: 38px; color: #000; }

    .bp-spark {
      position: absolute; border-radius: 50%; z-index: 4;
      animation: bpSparkFloat linear infinite;
    }
    @keyframes bpSparkFloat {
      0%   { transform: translateY(0)    scale(1);   opacity:.9; }
      50%  { transform: translateY(-10px) scale(1.4); opacity:1;  }
      100% { transform: translateY(0)    scale(1);   opacity:.9; }
    }

    #bp-badge {
      position: absolute; top: -8px; right: -10px; z-index: 5;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #fff; font-size: 9.5px; font-weight: 800; letter-spacing: .07em;
      text-transform: uppercase; padding: 4px 9px; border-radius: 99px;
      border: 2px solid rgba(5,8,20,1);
      box-shadow: 0 4px 14px rgba(245,158,11,0.5);
      animation: bpBadgeBounce 2.5s ease-in-out infinite;
    }
    @keyframes bpBadgeBounce {
      0%,100% { transform: translateY(0)   rotate(-4deg); }
      50%      { transform: translateY(-4px) rotate(2deg);  }
    }

    /* Title typewriter */
    #bp-title {
      font-size: 28px; font-weight: 800; letter-spacing: -.03em;
      text-align: center; margin-bottom: 5px; min-height: 38px;
      background: linear-gradient(135deg, #fff 0%, rgba(200,220,255,0.85) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    #bp-title-cursor {
      display: inline-block; width: 2px; height: 26px;
      background: #00f3ff; margin-left: 2px; vertical-align: middle;
      animation: bpCursorBlink .8s step-end infinite;
    }
    @keyframes bpCursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }

    #bp-subtitle {
      font-size: 12.5px; color: rgba(140,160,200,0.65);
      text-align: center; letter-spacing: .03em; margin-bottom: 26px;
      animation: bpFadeUp .4s ease both; animation-delay: .6s;
    }

    @keyframes bpFadeUp {
      from { opacity:0; transform: translateY(12px); }
      to   { opacity:1; transform: translateY(0); }
    }

    /* Cards */
    #bp-cards { display:flex; flex-direction:column; gap:9px; width:100%; margin-bottom:22px; }

    .bp-card {
      display: flex; align-items: flex-start; gap: 13px;
      padding: 13px 15px;
      background: rgba(255,255,255,0.035);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 18px; position: relative; overflow: hidden;
      cursor: default;
      transition: transform .25s cubic-bezier(0.34,1.3,0.64,1),
                  border-color .25s, background .25s, box-shadow .25s;
      animation: bpCardSlide .4s ease both;
    }
    .bp-card:nth-child(1){ animation-delay:.5s; }
    .bp-card:nth-child(2){ animation-delay:.58s; }
    .bp-card:nth-child(3){ animation-delay:.66s; }
    @keyframes bpCardSlide {
      from { opacity:0; transform: translateX(-20px); }
      to   { opacity:1; transform: translateX(0); }
    }
    .bp-card::before {
      content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
      transition: left .4s ease; pointer-events:none;
    }
    .bp-card:hover::before { left: 150%; }
    .bp-card:hover {
      transform: translateY(-3px) scale(1.01);
      border-color: rgba(0,243,255,0.2);
      background: rgba(0,243,255,0.04);
      box-shadow: 0 8px 28px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,243,255,0.08);
    }
    .bp-card:nth-child(3):hover { border-color: rgba(188,19,254,0.22); background: rgba(188,19,254,0.04); }

    .bp-card-icon {
      width:38px; height:38px; border-radius:11px;
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
      transition: transform .25s cubic-bezier(0.34,1.5,0.64,1);
    }
    .bp-card:hover .bp-card-icon { transform: scale(1.12) rotate(-5deg); }
    .bp-card-icon .bp-svg-icon { width:19px; height:19px; }
    .ic-amber  { background:rgba(245,158,11,0.12); color:#f59e0b; }
    .ic-cyan   { background:rgba(0,243,255,0.10);  color:#00f3ff; }
    .ic-purple { background:rgba(188,19,254,0.12); color:#bc13fe; }

    .bp-card-title { font-size:12.5px; font-weight:700; color:rgba(225,235,255,0.92); margin-bottom:3px; }
    .bp-card-desc  { font-size:11px; color:rgba(130,145,175,0.72); line-height:1.55; }

    .bp-divider {
      width:100%; height:1px; margin-bottom:18px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
      animation: bpFadeUp .4s ease both; animation-delay:.7s;
    }

    #bp-contact-label {
      font-size:9.5px; font-weight:700; letter-spacing:.16em;
      text-transform:uppercase; color:rgba(120,140,175,0.55);
      margin-bottom:11px;
      animation: bpFadeUp .4s ease both; animation-delay:.72s;
    }

    /* Email */
    #bp-email-btn {
      display:inline-flex; align-items:center; gap:8px; padding:12px 22px;
      background:rgba(0,243,255,0.06); border:1px solid rgba(0,243,255,0.2);
      border-radius:15px; color:#00f3ff; font-size:13px; font-weight:600;
      text-decoration:none; cursor:pointer;
      position:relative; overflow:hidden;
      transition: all .28s cubic-bezier(0.34,1.3,0.64,1);
      margin-bottom:20px;
      animation: bpFadeUp .4s ease both; animation-delay:.76s;
    }
    #bp-email-btn::before {
      content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
      background: linear-gradient(90deg, transparent, rgba(0,243,255,0.12), transparent);
      animation: bpEmailShimmer 2.5s ease-in-out infinite;
    }
    @keyframes bpEmailShimmer { 0%{left:-100%} 70%,100%{left:200%} }
    #bp-email-btn:hover {
      background:rgba(0,243,255,0.13); border-color:rgba(0,243,255,0.5);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 28px rgba(0,243,255,0.2), 0 0 0 1px rgba(0,243,255,0.12);
    }
    #bp-email-btn .bp-svg-icon { width:17px; height:17px; }

    /* CTA */
    #bp-cta {
      width:100%; padding:16px; border-radius:18px; border:none;
      background: linear-gradient(135deg, #00f3ff 0%, #3b82f6 40%, #bc13fe 100%);
      background-size: 200% 200%;
      color:#000; font-size:14.5px; font-weight:800; letter-spacing:.03em;
      cursor:pointer; display:flex; align-items:center; justify-content:center; gap:9px;
      position:relative; overflow:hidden;
      transition: transform .3s cubic-bezier(0.34,1.4,0.64,1), box-shadow .3s;
      animation: bpFadeUp .4s ease both, bpCtaGrad 4s ease infinite;
      animation-delay: .8s, 0s;
      box-shadow: 0 6px 28px rgba(0,243,255,0.3);
    }
    @keyframes bpCtaGrad {
      0%,100%{ background-position: 0%   50%; }
      50%    { background-position: 100% 50%; }
    }
    #bp-cta::before {
      content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
      animation: bpCtaShine 2.8s ease-in-out infinite;
    }
    @keyframes bpCtaShine { 0%{left:-100%} 60%,100%{left:200%} }
    #bp-cta:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 16px 48px rgba(0,243,255,0.4), 0 0 0 1px rgba(255,255,255,0.15);
    }
    #bp-cta:active { transform: translateY(-1px) scale(0.99); }
    #bp-cta .bp-svg-icon { width:19px; height:19px; }
    .bp-svg-icon { display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; vertical-align:middle; }

    .bp-ripple {
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,0.35);
      transform:scale(0); pointer-events:none;
      animation: bpRippleAnim .6s linear;
    }
    @keyframes bpRippleAnim { to { transform:scale(4.5); opacity:0; } }

    #bp-footer {
      margin-top:13px; font-size:10px;
      color:rgba(90,110,145,0.5); text-align:center; line-height:1.6;
      animation: bpFadeUp .4s ease both; animation-delay:.86s;
    }

    /* Exit */
    #bp-overlay.bp-exit { animation: bpOverlayOut .35s ease forwards; }
    #bp-overlay.bp-exit #bp-panel { animation: bpPanelOut .3s ease forwards; }
    @keyframes bpOverlayOut { to { opacity:0; } }
    @keyframes bpPanelOut { to { opacity:0; transform: translateY(36px) scale(0.92); } }

    @media (max-width:440px) {
      #bp-body { padding:28px 18px 22px; }
      #bp-title { font-size:22px; }
      #bp-ring1 { width:96px; height:96px; }
      #bp-ring2 { width:116px; height:116px; }
    }
  `;
  document.head.appendChild(style);

  /* ══════════════════════════════ HTML ══════════════════════════════ */
  const overlay = document.createElement('div');
  overlay.id = 'bp-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  overlay.innerHTML = `
    <div id="bp-panel">
      <div id="bp-border-anim"></div>
      <div id="bp-glow-bar"></div>
      <canvas id="bp-canvas"></canvas>
      <div id="bp-blob"></div>
      <button id="bp-close" title="Dismiss">${bpIcon('close')}</button>

      <div id="bp-body">
        <div id="bp-chip"><div class="bp-dot"></div>System Active &mdash; Beta Phase</div>

        <div id="bp-icon-wrap">
          <div id="bp-ring2"></div>
          <div id="bp-ring1"><div id="bp-orbit-dot"></div></div>
          <div id="bp-icon-bg">${bpIcon('auto_awesome')}</div>
          <div id="bp-badge">BETA</div>
        </div>

        <div id="bp-title"><span id="bp-title-text"></span><span id="bp-title-cursor"></span></div>
        <div id="bp-subtitle">${CFG.version} &nbsp;&middot;&nbsp; Early Access</div>

        <div id="bp-cards">
          <div class="bp-card">
            <div class="bp-card-icon ic-amber">${bpIcon('construction')}</div>
            <div>
              <div class="bp-card-title">Active Development</div>
              <div class="bp-card-desc">Features are being built and improved continuously. You may encounter bugs or incomplete experiences.</div>
            </div>
          </div>
          <div class="bp-card">
            <div class="bp-card-icon ic-cyan">${bpIcon('warning_amber')}</div>
            <div>
              <div class="bp-card-title">Maintenance Mode</div>
              <div class="bp-card-desc">Some features may be temporarily unavailable while the team works on improvements and stability patches.</div>
            </div>
          </div>
          <div class="bp-card">
            <div class="bp-card-icon ic-purple">${bpIcon('bug_report')}</div>
            <div>
              <div class="bp-card-title">Found a Bug?</div>
              <div class="bp-card-desc">Your feedback matters. Report any issue to our team — every report helps us ship faster.</div>
            </div>
          </div>
        </div>

        <div class="bp-divider"></div>
        <div id="bp-contact-label">Contact the Developer</div>

        <a id="bp-email-btn"
           href="mailto:${CFG.email}?subject=Bug%20Report%20%7C%20NAMAN%20AI%20Beta&body=Hi%20team%2C%0A%0AI%20found%20the%20following%20issue%3A%0A"
           target="_blank" rel="noopener">
          ${bpIcon('mail')}${CFG.email}
        </a>

        <button id="bp-cta">
          ${bpIcon('rocket_launch')}
          Continue to ${CFG.appName}
        </button>

        <div id="bp-footer">
          By continuing you acknowledge this is a beta product.<br>
          Unexpected behavior may occur &mdash; thank you for testing!
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  /* ══ Typewriter ══ */
  const titleText = document.getElementById('bp-title-text');
  const titleCursor = document.getElementById('bp-title-cursor');
  let ti = 0;
  const tw = setInterval(() => {
    if (ti < CFG.appName.length) { titleText.textContent += CFG.appName[ti++]; }
    else { clearInterval(tw); setTimeout(() => { titleCursor.style.display = 'none'; }, 2200); }
  }, 68);

  /* ══ Floating sparkles ══ */
  const iconWrap = document.getElementById('bp-icon-wrap');
  [
    { size:5, top:'-8px', left:'12px', color:'#00f3ff', dur:2.2 },
    { size:4, top:'10px', left:'-10px',color:'#bc13fe', dur:2.8 },
    { size:3, top:'55px', left:'-6px', color:'#00ff87', dur:2.0 },
    { size:6, top:'60px', left:'68px', color:'#00f3ff', dur:3.1 },
    { size:3, top:'-4px', left:'58px', color:'#f59e0b', dur:1.9 },
  ].forEach(s => {
    const el = document.createElement('div');
    el.className = 'bp-spark';
    el.style.cssText = 'width:' + s.size + 'px;height:' + s.size + 'px;top:' + s.top + ';left:' + s.left
      + ';background:' + s.color + ';box-shadow:0 0 ' + (s.size*2) + 'px ' + s.color
      + ';animation-duration:' + s.dur + 's;animation-delay:' + (Math.random()*1.5).toFixed(2) + 's;';
    iconWrap.appendChild(el);
  });

  /* ══ Particle system with node connections ══ */
  (function () {
    const canvas = document.getElementById('bp-canvas');
    const panel  = document.getElementById('bp-panel');
    const ctx    = canvas.getContext('2d');
    const COLORS = ['rgba(0,243,255,','rgba(188,19,254,','rgba(0,255,135,','rgba(59,130,246,'];
    const COUNT  = 36, DIST = 88;

    function resize() { canvas.width = panel.offsetWidth; canvas.height = panel.offsetHeight; }
    resize();

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,  y: Math.random() * canvas.height,
      dx:(Math.random()-.5)*.4,         dy:(Math.random()-.5)*.4,
      r: Math.random()*1.6+.5,
      c: COLORS[Math.floor(Math.random()*COLORS.length)],
      a: Math.random()*.45+.15,
    }));

    let raf;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i+1; j < pts.length; j++) {
          const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y;
          const d  = Math.sqrt(dx*dx+dy*dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle = 'rgba(0,243,255,' + ((1-d/DIST)*0.11) + ')';
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.c+p.a+')'; ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0) p.x=canvas.width;  if(p.x>canvas.width)  p.x=0;
        if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
      });
      raf = requestAnimationFrame(tick);
    }
    tick();
    window.addEventListener('resize', resize);
    window._bpStop = () => { cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  })();

  /* ══ Magnetic hover on CTA ══ */
  const cta = document.getElementById('bp-cta');
  cta.addEventListener('mousemove', e => {
    const r = cta.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top  - r.height/2;
    cta.style.transform = 'translateY(-4px) scale(1.02) translate(' + (x*.06) + 'px,' + (y*.06) + 'px)';
  });
  cta.addEventListener('mouseleave', () => { cta.style.transform = ''; });

  /* ══ Ripple on CTA ══ */
  cta.addEventListener('click', function(e) {
    const r = this.getBoundingClientRect();
    const size = Math.max(r.width,r.height)*2.2;
    const rip = document.createElement('span');
    rip.className = 'bp-ripple';
    rip.style.cssText = 'width:'+size+'px;height:'+size+'px;left:'+(e.clientX-r.left-size/2)+'px;top:'+(e.clientY-r.top-size/2)+'px;';
    this.appendChild(rip);
    rip.addEventListener('animationend', () => rip.remove());
  });

  /* ══ 3D tilt on panel ══ */
  const panel = document.getElementById('bp-panel');
  overlay.addEventListener('mousemove', e => {
    const r = panel.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2)  / (r.width/2);
    const dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
    panel.style.transform = 'perspective(900px) rotateY('+dx*3+'deg) rotateX('+(-dy*3)+'deg)';
  });
  overlay.addEventListener('mouseleave', () => {
    panel.style.transition = 'transform .5s cubic-bezier(0.34,1.2,0.64,1)';
    panel.style.transform  = '';
    setTimeout(() => { panel.style.transition = ''; }, 500);
  });

  /* ══ Dismiss ══ */
  function dismiss() {
    if (window._bpStop) window._bpStop();
    overlay.classList.add('bp-exit');
    overlay.addEventListener('animationend', () => overlay.remove(), { once:true });
    sessionStorage.setItem(CFG.storageKey, '1');
  }
  document.getElementById('bp-cta').addEventListener('click', dismiss);
  document.getElementById('bp-close').addEventListener('click', dismiss);
  overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });
  document.addEventListener('keydown', function h(e) {
    if (e.key === 'Escape') { dismiss(); document.removeEventListener('keydown', h); }
  });

})();
