/* NAMAN AI - Beta / Maintenance Panel Drop this file into your site and include it once:

  <script src="./beta_maintenance_panel.js" defer></script>*/

(() => { 'use strict';

const SUPPORT_EMAIL = 'bytewavext@gmail.com'; const PANEL_ID = 'naman-beta-maintenance-panel'; const STYLE_ID = 'naman-beta-maintenance-panel-styles'; const TOAST_ID = 'naman-beta-maintenance-toast';

const loadMaterialIcons = () => { const exists = document.querySelector('link[href*="fonts.googleapis.com/icon?family=Material+Icons+Round"]'); if (exists) return;

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Round';
document.head.appendChild(link);

};

const injectStyles = () => { if (document.getElementById(STYLE_ID)) return;

const style = document.createElement('style');
style.id = STYLE_ID;
style.textContent = `
  :root {
    --bmp-bg: rgba(3, 7, 18, 0.70);
    --bmp-card: rgba(10, 14, 26, 0.78);
    --bmp-card-strong: rgba(12, 18, 34, 0.92);
    --bmp-border: rgba(255, 255, 255, 0.10);
    --bmp-border-strong: rgba(0, 243, 255, 0.20);
    --bmp-text: #eef6ff;
    --bmp-muted: rgba(238, 246, 255, 0.72);
    --bmp-soft: rgba(238, 246, 255, 0.10);
    --bmp-accent: #00f3ff;
    --bmp-accent-2: #bc13fe;
    --bmp-good: #00ff87;
    --bmp-shadow: 0 28px 90px rgba(0, 0, 0, 0.60);
  }

  .bmp-overlay {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    display: grid;
    place-items: center;
    padding: 18px;
    background:
      radial-gradient(circle at 18% 16%, rgba(0,243,255,0.18), transparent 24%),
      radial-gradient(circle at 82% 18%, rgba(188,19,254,0.18), transparent 24%),
      radial-gradient(circle at 50% 92%, rgba(0,255,135,0.09), transparent 26%),
      var(--bmp-bg);
    backdrop-filter: blur(30px) saturate(140%);
    -webkit-backdrop-filter: blur(30px) saturate(140%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 260ms ease;
    overflow: hidden;
  }

  .bmp-overlay[data-open="true"] {
    opacity: 1;
    pointer-events: auto;
  }

  .bmp-overlay::before,
  .bmp-overlay::after {
    content: '';
    position: absolute;
    inset: -30%;
    pointer-events: none;
  }

  .bmp-overlay::before {
    background: conic-gradient(
      from 180deg,
      rgba(0,243,255,0.00),
      rgba(0,243,255,0.08),
      rgba(188,19,254,0.08),
      rgba(0,255,135,0.07),
      rgba(0,243,255,0.00)
    );
    filter: blur(38px);
    opacity: 0.95;
    animation: bmp-spin 18s linear infinite;
  }

  .bmp-overlay::after {
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 22px 22px;
    opacity: 0.09;
    mix-blend-mode: screen;
  }

  .bmp-card {
    position: relative;
    width: min(780px, 100%);
    border-radius: 30px;
    background: linear-gradient(180deg, rgba(15, 20, 36, 0.86), rgba(8, 12, 22, 0.94));
    border: 1px solid var(--bmp-border);
    box-shadow: var(--bmp-shadow);
    overflow: hidden;
    transform: translateY(18px) scale(0.985);
    opacity: 0;
    transition: transform 420ms cubic-bezier(.2,.9,.2,1), opacity 280ms ease;
  }

  .bmp-overlay[data-open="true"] .bmp-card {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  .bmp-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 12% 10%, rgba(0,243,255,0.12), transparent 28%),
      radial-gradient(circle at 88% 6%, rgba(188,19,254,0.10), transparent 24%),
      linear-gradient(135deg, rgba(255,255,255,0.06), transparent 38%);
    pointer-events: none;
  }

  .bmp-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 18px 18px 0;
  }

  .bmp-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(0,243,255,0.18);
    background: rgba(0,243,255,0.10);
    color: var(--bmp-accent);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.10em;
    text-transform: uppercase;
  }

  .bmp-badge.alt {
    color: #d8b4fe;
    background: rgba(188,19,254,0.10);
    border-color: rgba(188,19,254,0.18);
  }

  .bmp-badge .material-icons-round {
    font-size: 16px;
  }

  .bmp-close {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: rgba(238,246,255,0.92);
    cursor: pointer;
    transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
  }

  .bmp-close:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.08);
    border-color: rgba(0,243,255,0.28);
    box-shadow: 0 0 0 3px rgba(0,243,255,0.06);
  }

  .bmp-content {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 18px;
    padding: 18px;
  }

  .bmp-hero {
    position: relative;
    border-radius: 26px;
    padding: 28px;
    background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .bmp-hero::before {
    content: '';
    position: absolute;
    inset: auto -12% -34% auto;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,243,255,0.20), transparent 70%);
    filter: blur(12px);
    animation: bmp-float 6s ease-in-out infinite;
  }

  .bmp-hero::after {
    content: '';
    position: absolute;
    top: 18px;
    right: 18px;
    width: 110px;
    height: 110px;
    border-radius: 32px;
    background: linear-gradient(135deg, rgba(0,243,255,0.10), rgba(188,19,254,0.10));
    border: 1px solid rgba(255,255,255,0.06);
    transform: rotate(18deg);
    opacity: 0.5;
  }

  .bmp-icon-shell {
    width: 86px;
    height: 86px;
    border-radius: 26px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, rgba(0,243,255,0.18), rgba(59,130,246,0.16), rgba(188,19,254,0.18));
    border: 1px solid rgba(0,243,255,0.24);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 12px 30px rgba(0,243,255,0.08);
    position: relative;
  }

  .bmp-icon-shell::after {
    content: '';
    position: absolute;
    inset: 14px;
    border-radius: 20px;
    background: rgba(8,12,22,0.40);
    filter: blur(12px);
    opacity: 0.35;
  }

  .bmp-icon-shell .material-icons-round {
    position: relative;
    z-index: 1;
    font-size: 36px;
    color: #041018;
    text-shadow: 0 0 20px rgba(255,255,255,0.22);
  }

  .bmp-title {
    margin: 18px 0 12px;
    font-size: clamp(28px, 4.6vw, 44px);
    line-height: 1.02;
    letter-spacing: -0.05em;
    color: var(--bmp-text);
    font-weight: 900;
  }

  .bmp-title span {
    background: linear-gradient(90deg, #ffffff, #7be9ff 25%, #d48bff 70%, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .bmp-text {
    margin: 0 0 18px;
    color: var(--bmp-muted);
    font-size: 15px;
    line-height: 1.78;
  }

  .bmp-progress-wrap {
    margin-top: 18px;
  }

  .bmp-progress {
    height: 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .bmp-progress > i {
    display: block;
    width: 68%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--bmp-accent), var(--bmp-accent-2), var(--bmp-good));
    background-size: 200% 100%;
    box-shadow: 0 0 22px rgba(0,243,255,0.28);
    animation: bmp-shimmer 2.7s linear infinite;
  }

  .bmp-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    color: rgba(238,246,255,0.86);
    font-size: 13px;
    font-weight: 700;
  }

  .bmp-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--bmp-good);
    box-shadow: 0 0 0 0 rgba(0,255,135,0.45);
    animation: bmp-pulse 1.6s ease-in-out infinite;
  }

  .bmp-mail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 18px;
    padding: 16px 18px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(0,243,255,0.10), rgba(188,19,254,0.10));
    border: 1px solid rgba(0,243,255,0.16);
  }

  .bmp-mail-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .bmp-mail-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(0,0,0,0.18);
    border: 1px solid rgba(255,255,255,0.10);
    color: var(--bmp-accent);
    flex: 0 0 auto;
  }

  .bmp-mail-label {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(238,246,255,0.60);
    font-weight: 800;
    margin-bottom: 3px;
  }

  .bmp-mail-value {
    color: #fff;
    font-weight: 850;
    font-size: 16px;
    word-break: break-word;
  }

  .bmp-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  .bmp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
    color: #fff;
    font-weight: 800;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
    transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
  }

  .bmp-btn:hover {
    transform: translateY(-1px);
    border-color: rgba(0,243,255,0.28);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 12px 28px rgba(0,243,255,0.08);
  }

  .bmp-btn-primary {
    background: linear-gradient(135deg, rgba(0,243,255,0.16), rgba(188,19,254,0.18));
    border-color: rgba(0,243,255,0.18);
  }

  .bmp-side {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .bmp-mini {
    position: relative;
    border-radius: 24px;
    padding: 18px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .bmp-mini::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.05), transparent 45%);
    pointer-events: none;
  }

  .bmp-mini h3 {
    margin: 0 0 8px;
    color: #fff;
    font-size: 14px;
    font-weight: 850;
    letter-spacing: -0.01em;
  }

  .bmp-mini p {
    margin: 0;
    color: var(--bmp-muted);
    font-size: 13px;
    line-height: 1.7;
  }

  .bmp-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 0 18px 18px;
    color: rgba(238,246,255,0.48);
    font-size: 11px;
  }

  .bmp-kbd {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    color: rgba(238,246,255,0.72);
    font-weight: 700;
  }

  .bmp-toast {
    position: fixed;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%) translateY(18px);
    z-index: 2147483647;
    opacity: 0;
    pointer-events: none;
    padding: 12px 16px;
    border-radius: 999px;
    background: rgba(6, 10, 18, 0.94);
    border: 1px solid rgba(0,243,255,0.18);
    color: #ebfbff;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    transition: opacity 220ms ease, transform 220ms ease;
    font-size: 13px;
    font-weight: 750;
  }

  .bmp-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  @keyframes bmp-spin { to { transform: rotate(360deg); } }
  @keyframes bmp-float {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.85; }
    50% { transform: translateY(-10px) scale(1.03); opacity: 1; }
  }
  @keyframes bmp-shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes bmp-pulse {
    0% { box-shadow: 0 0 0 0 rgba(0,255,135,0.45); }
    70% { box-shadow: 0 0 0 12px rgba(0,255,135,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,255,135,0); }
  }

  @media (max-width: 780px) {
    .bmp-content {
      grid-template-columns: 1fr;
    }
    .bmp-mail {
      align-items: stretch;
    }
    .bmp-actions {
      width: 100%;
    }
    .bmp-btn {
      flex: 1;
      min-width: 0;
    }
    .bmp-footer {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
document.head.appendChild(style);

};

const showToast = (message) => { let toast = document.getElementById(TOAST_ID); if (!toast) { toast = document.createElement('div'); toast.id = TOAST_ID; toast.className = 'bmp-toast'; document.body.appendChild(toast); }

toast.textContent = message;
toast.classList.add('show');

clearTimeout(showToast._timer);
showToast._timer = setTimeout(() => {
  toast.classList.remove('show');
}, 1800);

};

const copyEmail = async () => { try { await navigator.clipboard.writeText(SUPPORT_EMAIL); showToast('Email copied to clipboard'); return; } catch (error) { const ta = document.createElement('textarea'); ta.value = SUPPORT_EMAIL; ta.setAttribute('readonly', 'true'); ta.style.position = 'fixed'; ta.style.left = '-9999px'; ta.style.top = '0'; document.body.appendChild(ta); ta.focus(); ta.select(); try { document.execCommand('copy'); showToast('Email copied to clipboard'); } catch (fallbackError) { showToast('Copy failed. Please select the email manually.'); } ta.remove(); } };

const restoreScroll = () => { document.documentElement.style.overflow = ''; document.body.style.overflow = ''; };

const closePanel = () => { const overlay = document.getElementById(PANEL_ID); if (!overlay) return;

overlay.setAttribute('data-open', 'false');
restoreScroll();

window.removeEventListener('keydown', onKeyDown, true);

setTimeout(() => {
  if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
}, 280);

};

function onKeyDown(event) { if (event.key === 'Escape') closePanel(); }

const createPanel = () => { if (document.getElementById(PANEL_ID)) return;

const overlay = document.createElement('div');
overlay.id = PANEL_ID;
overlay.className = 'bmp-overlay';
overlay.setAttribute('data-open', 'false');
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-labelledby', 'bmp-title');

overlay.innerHTML = `
  <div class="bmp-card">
    <div class="bmp-topbar">
      <div class="bmp-badge">
        <span class="material-icons-round">science</span>
        Beta Preview
      </div>
      <button class="bmp-close" type="button" aria-label="Close maintenance panel">
        <span class="material-icons-round">close</span>
      </button>
    </div>

    <div class="bmp-content">
      <section class="bmp-hero">
        <div class="bmp-icon-shell" aria-hidden="true">
          <span class="material-icons-round">auto_awesome</span>
        </div>

        <h1 id="bmp-title" class="bmp-title"><span>This AI is in beta and maintenance.</span></h1>
        <p class="bmp-text">
          The experience is actively being refined. Some features may change, improve, or temporarily behave unexpectedly while we keep polishing the system.
        </p>

        <div class="bmp-badge alt" style="margin-bottom: 12px;">
          <span class="material-icons-round">build_circle</span>
          Active maintenance
        </div>

        <div class="bmp-progress-wrap">
          <div class="bmp-progress" aria-hidden="true"><i></i></div>
          <div class="bmp-status">
            <span class="bmp-dot"></span>
            Live fixes and improvements are running
          </div>
        </div>

        <div class="bmp-mail">
          <div class="bmp-mail-left">
            <div class="bmp-mail-icon">
              <span class="material-icons-round">mail</span>
            </div>
            <div style="min-width:0;">
              <div class="bmp-mail-label">Report any issue to</div>
              <div class="bmp-mail-value">${SUPPORT_EMAIL}</div>
            </div>
          </div>

          <div class="bmp-actions">
            <button class="bmp-btn bmp-btn-primary" type="button" id="bmp-copy-btn">
              <span class="material-icons-round" style="font-size:18px;">content_copy</span>
              Copy Email
            </button>
            <a class="bmp-btn" href="mailto:${SUPPORT_EMAIL}?subject=Issue%20Report%20for%20NAMAN%20AI%20Beta">
              <span class="material-icons-round" style="font-size:18px;">send</span>
              Open Mail
            </a>
          </div>
        </div>
      </section>

      <aside class="bmp-side">
        <div class="bmp-mini">
          <h3><span class="material-icons-round" style="font-size:18px; vertical-align:-4px; margin-right:4px; color: var(--bmp-accent);">tips_and_updates</span> What to expect</h3>
          <p>Fast improvements, occasional rough edges, design refinements, and constant stability work behind the scenes.</p>
        </div>

        <div class="bmp-mini">
          <h3><span class="material-icons-round" style="font-size:18px; vertical-align:-4px; margin-right:4px; color: #d8b4fe;">report</span> Found a bug?</h3>
          <p>Send a screenshot and a short note about what happened. That helps us reproduce and fix it much faster.</p>
        </div>

        <div class="bmp-mini">
          <h3><span class="material-icons-round" style="font-size:18px; vertical-align:-4px; margin-right:4px; color: var(--bmp-good);">verified</span> Thank you for testing</h3>
          <p>Your feedback matters. Beta users help shape the final version into something cleaner, smoother, and better.</p>
        </div>
      </aside>
    </div>

    <div class="bmp-footer">
      <div class="bmp-kbd">
        <span class="material-icons-round" style="font-size:14px;">keyboard_return</span>
        Press Esc to close
      </div>
      <div>Built to feel native to your app</div>
    </div>
  </div>
`;

document.body.appendChild(overlay);

const closeBtn = overlay.querySelector('.bmp-close');
const copyBtn = overlay.querySelector('#bmp-copy-btn');

closeBtn.addEventListener('click', closePanel);
copyBtn.addEventListener('click', copyEmail);

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) closePanel();
});

document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

window.addEventListener('keydown', onKeyDown, true);

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    overlay.setAttribute('data-open', 'true');
  });
});

};

const init = () => { loadMaterialIcons(); injectStyles(); createPanel(); };

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init, { once: true }); } else { init(); } })();
