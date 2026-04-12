/* Beta / Maintenance Notice Panel

Auto-injects a polished full-screen modal when the site opens

Shows beta + maintenance notice

Provides support email and copy-to-clipboard action

Uses Material Icons if available; loads them automatically if missing


Usage: <script src="beta_maintenance_panel.js"></script> */

(() => { 'use strict';

const SUPPORT_EMAIL = 'bytewavext@gmail.com';

const ensureMaterialIcons = () => { const alreadyLoaded = [...document.styleSheets].some(ss => { try { return ss.href && /fonts.googleapis.com/icon/.test(ss.href); } catch { return false; } });

if (!alreadyLoaded) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Round';
  document.head.appendChild(link);
}

};

const injectStyles = () => { if (document.getElementById('beta-maintenance-panel-styles')) return;

const style = document.createElement('style');
style.id = 'beta-maintenance-panel-styles';
style.textContent = `
  :root {
    --bpm-bg: rgba(3, 7, 18, 0.72);
    --bpm-card: rgba(9, 14, 28, 0.78);
    --bpm-border: rgba(255, 255, 255, 0.12);
    --bpm-text: #e5eefb;
    --bpm-muted: rgba(229, 238, 251, 0.72);
    --bpm-accent: #00f3ff;
    --bpm-accent-2: #bc13fe;
    --bpm-success: #00ff87;
    --bpm-shadow: 0 28px 80px rgba(0, 0, 0, 0.56);
  }

  .bpm-overlay {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    display: grid;
    place-items: center;
    padding: 20px;
    background:
      radial-gradient(circle at 20% 20%, rgba(0,243,255,0.18), transparent 26%),
      radial-gradient(circle at 80% 15%, rgba(188,19,254,0.18), transparent 24%),
      radial-gradient(circle at 50% 100%, rgba(0,255,135,0.10), transparent 28%),
      var(--bpm-bg);
    backdrop-filter: blur(28px) saturate(145%);
    -webkit-backdrop-filter: blur(28px) saturate(145%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 280ms ease;
    overflow: hidden;
  }

  .bpm-overlay::before {
    content: '';
    position: absolute;
    inset: -40%;
    background: conic-gradient(
      from 180deg,
      rgba(0,243,255,0.0),
      rgba(0,243,255,0.08),
      rgba(188,19,254,0.08),
      rgba(0,255,135,0.08),
      rgba(0,243,255,0.0)
    );
    filter: blur(40px);
    animation: bpm-spin 18s linear infinite;
    opacity: 0.9;
    pointer-events: none;
  }

  .bpm-overlay[data-open="true"] {
    opacity: 1;
    pointer-events: auto;
  }

  .bpm-card {
    position: relative;
    width: min(760px, 100%);
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(14,18,31,0.88), rgba(8,12,22,0.92));
    border: 1px solid var(--bpm-border);
    box-shadow: var(--bpm-shadow);
    overflow: hidden;
    transform: translateY(18px) scale(0.985);
    opacity: 0;
    transition: transform 420ms cubic-bezier(.2,.9,.2,1), opacity 320ms ease;
  }

  .bpm-overlay[data-open="true"] .bpm-card {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  .bpm-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 10% 10%, rgba(0,243,255,0.10), transparent 30%),
      radial-gradient(circle at 90% 0%, rgba(188,19,254,0.09), transparent 28%),
      linear-gradient(135deg, rgba(255,255,255,0.06), transparent 42%);
    pointer-events: none;
  }

  .bpm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px 0;
  }

  .bpm-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(0,243,255,0.10);
    border: 1px solid rgba(0,243,255,0.18);
    color: var(--bpm-accent);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    box-shadow: 0 0 0 1px rgba(0,243,255,0.03) inset;
  }

  .bpm-badge .material-icons-round {
    font-size: 16px;
  }

  .bpm-close {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    color: rgba(229,238,251,0.88);
    cursor: pointer;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
  }

  .bpm-close:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.07);
    border-color: rgba(0,243,255,0.30);
  }

  .bpm-content {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 18px;
    padding: 18px 20px 20px;
  }

  .bpm-hero {
    position: relative;
    border-radius: 24px;
    padding: 26px;
    background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .bpm-hero::after {
    content: '';
    position: absolute;
    inset: auto -10% -32% auto;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,243,255,0.18), transparent 68%);
    filter: blur(12px);
    animation: bpm-float 6s ease-in-out infinite;
  }

  .bpm-title {
    margin: 12px 0 12px;
    font-size: clamp(28px, 4vw, 42px);
    line-height: 1.05;
    color: var(--bpm-text);
    letter-spacing: -0.04em;
    font-weight: 900;
  }

  .bpm-title span {
    background: linear-gradient(90deg, #fff, #9befff 30%, #d69bff 70%, #fff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .bpm-text {
    color: var(--bpm-muted);
    font-size: 15px;
    line-height: 1.75;
    margin: 0 0 18px;
  }

  .bpm-progress {
    position: relative;
    height: 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .bpm-progress > i {
    display: block;
    width: 64%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--bpm-accent), var(--bpm-accent-2), var(--bpm-success));
    background-size: 200% 100%;
    animation: bpm-shimmer 2.5s linear infinite;
    box-shadow: 0 0 22px rgba(0,243,255,0.28);
  }

  .bpm-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
    color: rgba(229,238,251,0.86);
    font-size: 13px;
    font-weight: 700;
  }

  .bpm-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--bpm-success);
    box-shadow: 0 0 0 0 rgba(0,255,135,0.50);
    animation: bpm-pulse 1.6s ease-in-out infinite;
  }

  .bpm-side {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .bpm-card-mini {
    border-radius: 22px;
    padding: 18px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .bpm-card-mini h3 {
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.01em;
  }

  .bpm-card-mini p {
    margin: 0;
    color: var(--bpm-muted);
    font-size: 13px;
    line-height: 1.65;
  }

  .bpm-mail {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 16px 18px;
    margin-top: 14px;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(0,243,255,0.10), rgba(188,19,254,0.10));
    border: 1px solid rgba(0,243,255,0.16);
  }

  .bpm-mail-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .bpm-mail-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(0,0,0,0.18);
    border: 1px solid rgba(255,255,255,0.10);
    color: var(--bpm-accent);
    flex: 0 0 auto;
  }

  .bpm-mail-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(229,238,251,0.58);
    font-weight: 800;
    margin-bottom: 3px;
  }

  .bpm-mail-value {
    font-size: 16px;
    color: #fff;
    font-weight: 800;
    word-break: break-word;
  }

  .bpm-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .bpm-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: #fff;
    font-weight: 800;
    font-size: 13px;
    cursor: pointer;
    transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease, border-color 160ms ease;
  }

  .bpm-btn:hover {
    transform: translateY(-1px);
    border-color: rgba(0,243,255,0.28);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 12px 30px rgba(0, 243, 255, 0.08);
  }

  .bpm-btn-primary {
    background: linear-gradient(135deg, rgba(0,243,255,0.16), rgba(188,19,254,0.18));
    border-color: rgba(0,243,255,0.18);
  }

  .bpm-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 0 20px 20px;
    color: rgba(229,238,251,0.48);
    font-size: 11px;
  }

  .bpm-kbd {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    color: rgba(229,238,251,0.72);
    font-weight: 700;
  }

  .bpm-toast {
    position: fixed;
    left: 50%;
    bottom: 22px;
    transform: translateX(-50%) translateY(20px);
    z-index: 2147483001;
    opacity: 0;
    pointer-events: none;
    padding: 12px 16px;
    border-radius: 999px;
    background: rgba(6, 10, 18, 0.92);
    border: 1px solid rgba(0,243,255,0.18);
    color: #eaf7ff;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    transition: opacity 220ms ease, transform 220ms ease;
    font-size: 13px;
    font-weight: 700;
  }

  .bpm-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  @keyframes bpm-spin { to { transform: rotate(360deg); } }
  @keyframes bpm-float {
    0%,100% { transform: translateY(0) scale(1); opacity: .85; }
    50% { transform: translateY(-10px) scale(1.03); opacity: 1; }
  }
  @keyframes bpm-shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes bpm-pulse {
    0% { box-shadow: 0 0 0 0 rgba(0,255,135,0.45); }
    70% { box-shadow: 0 0 0 12px rgba(0,255,135,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,255,135,0); }
  }

  @media (max-width: 720px) {
    .bpm-content { grid-template-columns: 1fr; }
    .bpm-mail { align-items: stretch; }
    .bpm-actions { width: 100%; }
    .bpm-btn { flex: 1; justify-content: center; }
    .bpm-footer { flex-direction: column; align-items: flex-start; }
  }
`;
document.head.appendChild(style);

};

const toast = (message) => { let el = document.getElementById('bpm-toast'); if (!el) { el = document.createElement('div'); el.id = 'bpm-toast'; el.className = 'bpm-toast'; document.body.appendChild(el); } el.textContent = message; el.classList.add('show'); clearTimeout(el._timer); el._timer = setTimeout(() => el.classList.remove('show'), 1800); };

const copyEmail = async () => { try { await navigator.clipboard.writeText(SUPPORT_EMAIL); toast('Email copied to clipboard'); } catch { // Fallback for older browsers / restricted clipboard permissions const ta = document.createElement('textarea'); ta.value = SUPPORT_EMAIL; ta.style.position = 'fixed'; ta.style.left = '-9999px'; document.body.appendChild(ta); ta.focus(); ta.select(); try { document.execCommand('copy'); toast('Email copied to clipboard'); } catch { toast('Copy failed. Please select the email manually.'); } ta.remove(); } };

const closePanel = () => { const overlay = document.getElementById('bpm-overlay'); if (!overlay) return; overlay.setAttribute('data-open', 'false'); setTimeout(() => overlay.remove(), 260); };

const createPanel = () => { if (document.getElementById('bpm-overlay')) return;

const overlay = document.createElement('div');
overlay.id = 'bpm-overlay';
overlay.className = 'bpm-overlay';
overlay.setAttribute('data-open', 'false');
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-labelledby', 'bpm-title');

overlay.innerHTML = `
  <div class="bpm-card">
    <div class="bpm-topbar">
      <div class="bpm-badge">
        <span class="material-icons-round">science</span>
        Beta Preview
      </div>
      <button class="bpm-close" type="button" aria-label="Close panel">
        <span class="material-icons-round">close</span>
      </button>
    </div>

    <div class="bpm-content">
      <section class="bpm-hero">
        <div class="bpm-badge" style="margin-bottom:10px; background: rgba(188,19,254,0.10); border-color: rgba(188,19,254,0.18); color: #d8b4fe;">
          <span class="material-icons-round">build_circle</span>
          Maintenance mode
        </div>

        <h1 id="bpm-title" class="bpm-title">
          <span>This AI is under beta.</span>
        </h1>

        <p class="bpm-text">
          We are actively improving performance, design, stability, and response quality. During this phase, some features may behave unexpectedly or show small issues.
        </p>

        <div class="bpm-progress" aria-hidden="true"><i></i></div>
        <div class="bpm-status">
          <span class="bpm-dot"></span>
          Live improvements are in progress
        </div>

        <div class="bpm-mail">
          <div class="bpm-mail-left">
            <div class="bpm-mail-icon">
              <span class="material-icons-round">mail</span>
            </div>
            <div style="min-width:0;">
              <div class="bpm-mail-label">Report issues to</div>
              <div class="bpm-mail-value">${SUPPORT_EMAIL}</div>
            </div>
          </div>

          <div class="bpm-actions">
            <button class="bpm-btn bpm-btn-primary" type="button" id="bpm-copy-btn">
              <span class="material-icons-round" style="font-size:18px;">content_copy</span>
              Copy Email
            </button>
            <a class="bpm-btn" href="mailto:${SUPPORT_EMAIL}?subject=Issue%20Report%20for%20AI%20Beta" style="text-decoration:none;">
              <span class="material-icons-round" style="font-size:18px;">send</span>
              Open Mail
            </a>
          </div>
        </div>
      </section>

      <aside class="bpm-side">
        <div class="bpm-card-mini">
          <h3><span class="material-icons-round" style="font-size:18px; vertical-align:-4px; margin-right:4px; color: var(--bpm-accent);">tips_and_updates</span> What to expect</h3>
          <p>Fast updates, occasional bugs, design refinements, and continuous polishing while we improve the experience.</p>
        </div>

        <div class="bpm-card-mini">
          <h3><span class="material-icons-round" style="font-size:18px; vertical-align:-4px; margin-right:4px; color: #d8b4fe;">report</span> Found a problem?</h3>
          <p>Take a screenshot, note what happened, and send it to us at the support email above. That helps fix it much faster.</p>
        </div>

        <div class="bpm-card-mini">
          <h3><span class="material-icons-round" style="font-size:18px; vertical-align:-4px; margin-right:4px; color: var(--bpm-success);">verified</span> Thanks for testing</h3>
          <p>Your feedback helps shape the final version. Beta users make the product better, cleaner, and more reliable.</p>
        </div>
      </aside>
    </div>

    <div class="bpm-footer">
      <div class="bpm-kbd"><span class="material-icons-round" style="font-size:14px;">keyboard_return</span> Press Esc to close</div>
      <div>Powered by careful testing and continuous improvement</div>
    </div>
  </div>
`;

document.body.appendChild(overlay);

const open = () => overlay.setAttribute('data-open', 'true');
requestAnimationFrame(() => requestAnimationFrame(open));

const closeBtn = overlay.querySelector('.bpm-close');
const copyBtn = overlay.querySelector('#bpm-copy-btn');

closeBtn?.addEventListener('click', closePanel);
copyBtn?.addEventListener('click', copyEmail);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closePanel();
});

window.addEventListener('keydown', function onKey(e) {
  if (e.key === 'Escape') {
    closePanel();
    window.removeEventListener('keydown', onKey);
  }
});

};

const init = () => { ensureMaterialIcons(); injectStyles(); createPanel(); };

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init, { once: true }); } else { init(); } })();
