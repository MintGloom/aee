/* =============================================
   Farm Management Question Paper — Logic
   ============================================= */

const allShown = { A: false, B: false };

function renderSet(setKey) {
  const data = setsData[setKey];
  const container = document.getElementById('set' + setKey);
  let html = '';

  // Instructions
  html += `
    <div class="instructions">
      <strong>Instructions:</strong> Section A contains <strong>30 MCQs</strong> (1 mark each = 30 marks).
      Section B contains <strong>5 long-answer questions</strong> (10 marks each = 50 marks).
      Total marks: <strong>80</strong>. Time allowed: <strong>3 Hours</strong>. Attempt all questions.
    </div>`;

  // Section A header
  html += `
    <div class="section-label">
      <span class="section-title">Section A &mdash; Multiple Choice Questions (30 &times; 1 = 30 marks)</span>
      <button class="toggle-all-btn" id="toggleBtn-${setKey}" onclick="toggleAllAnswers('${setKey}')">Show all answers</button>
    </div>`;

  // MCQs
  data.mcqs.forEach((item, i) => {
    const optHtml = item.opts
      .map(o => `<div class="opt" data-letter="${o[0]}">${o}</div>`)
      .join('');
    html += `
      <div class="q-card" id="${setKey}-q${i}">
        <div class="q-header">
          <span class="q-num">Q${i + 1}</span>
          <span class="q-text">${item.q}</span>
        </div>
        <div class="options-grid" id="${setKey}-opts${i}">${optHtml}</div>
        <div class="q-footer">
          <button class="show-ans-btn" id="${setKey}-btn${i}" onclick="toggleAns('${setKey}', ${i}, '${item.ans}')">
            Show answer
          </button>
        </div>
      </div>`;
  });

  // Section B header
  html += `
    <div class="section-label" style="margin-top: 2rem;">
      <span class="section-title">Section B &mdash; Long Answer Questions (5 &times; 10 = 50 marks)</span>
    </div>`;

  // Long questions
  data.longQ.forEach((item, i) => {
    html += `
      <div class="long-q-card">
        <span class="long-q-num">Q${i + 31}</span>
        <span class="long-q-text">${item.q}</span>
        <span class="marks-badge">[${item.marks} marks]</span>
      </div>`;
  });

  // Answer key
  html += `
    <div class="ans-key-section">
      <div class="ans-key-title">Answer Key &mdash; Set ${setKey}</div>
      <div class="ans-key-grid">`;
  data.mcqs.forEach((item, i) => {
    html += `
        <div class="ak-cell">
          <span class="ak-num">Q${i + 1}</span>
          <span class="ak-ans">${item.ans}</span>
        </div>`;
  });
  html += `
      </div>
    </div>`;

  container.innerHTML = html;
}

function toggleAns(setKey, idx, correctLetter) {
  const optsDiv = document.getElementById(`${setKey}-opts${idx}`);
  const btn = document.getElementById(`${setKey}-btn${idx}`);
  const isShowing = optsDiv.querySelector('.correct') !== null;

  optsDiv.querySelectorAll('.opt').forEach(o => o.classList.remove('correct'));

  if (!isShowing) {
    optsDiv.querySelectorAll('.opt').forEach(o => {
      if (o.dataset.letter === correctLetter) o.classList.add('correct');
    });
    btn.textContent = 'Hide answer';
  } else {
    btn.textContent = 'Show answer';
  }
}

function toggleAllAnswers(setKey) {
  const data = setsData[setKey];
  allShown[setKey] = !allShown[setKey];
  const toggleBtn = document.getElementById(`toggleBtn-${setKey}`);

  data.mcqs.forEach((item, i) => {
    const optsDiv = document.getElementById(`${setKey}-opts${i}`);
    const btn = document.getElementById(`${setKey}-btn${i}`);
    optsDiv.querySelectorAll('.opt').forEach(o => o.classList.remove('correct'));

    if (allShown[setKey]) {
      optsDiv.querySelectorAll('.opt').forEach(o => {
        if (o.dataset.letter === item.ans) o.classList.add('correct');
      });
      btn.textContent = 'Hide answer';
    } else {
      btn.textContent = 'Show answer';
    }
  });

  toggleBtn.textContent = allShown[setKey] ? 'Hide all answers' : 'Show all answers';
}

function switchSet(key) {
  document.querySelectorAll('.set-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('set' + key).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => {
    if (b.dataset.set === key) b.classList.add('active');
  });
}

// Initialise on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderSet('A');
  renderSet('B');
});
