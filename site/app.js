'use strict';

const $ = (id) => document.getElementById(id);

function setText(id, value) {
  $(id).textContent = value == null ? '—' : String(value);
}

function addCheck(container, label) {
  const item = document.createElement('div');
  item.className = 'check';
  item.textContent = label;
  container.appendChild(item);
}

function renderLedger(ledger) {
  const target = $('ledger-summary');
  const entries = [
    ['Ledger commit', ledger.ledgerCommit],
    ['Source SHA', ledger.sourceHeadSha],
    ['Installer SHA-256', ledger.installerSha256],
    ['Signature status', ledger.signatureStatus],
  ];
  for (const [label, value] of entries) {
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value || '—';
    target.append(term, description);
  }
}

async function loadMetadata() {
  const response = await fetch('./releases.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('metadata unavailable');
  return response.json();
}

async function render() {
  try {
    const metadata = await loadMetadata();
    setText('product-name', metadata.identity.productName);
    setText('app-id', metadata.identity.appId);

    const stable = metadata.channels.stable;
    setText('stable-status', stable.status);
    setText('stable-version', stable.version || 'Stable release');
    setText('stable-summary', stable.message);
    const stableChecks = $('stable-checks');
    for (const check of stable.checks || []) addCheck(stableChecks, check);

    const pilot = metadata.channels.pilot;
    setText('pilot-status', pilot.status);
    setText('pilot-version', pilot.version);
    setText('pilot-summary', pilot.message);
    const pilotChecks = $('pilot-checks');
    for (const check of pilot.checks || []) addCheck(pilotChecks, check);
    const pilotDownload = $('pilot-download');
    pilotDownload.href = pilot.releaseUrl;
    pilotDownload.textContent = pilot.buttonLabel;
    renderLedger(pilot.ledger);
  } catch (_) {
    $('load-error').hidden = false;
    $('pilot-download').classList.add('disabled');
    $('pilot-download').removeAttribute('href');
  }
}

render();
