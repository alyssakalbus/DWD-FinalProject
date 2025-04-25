// DOM Elements
const cardContainer = document.querySelector('.card-container');
const output = document.getElementById('output');
const tarotTitle = document.getElementById('tarot-title');
const tarotContent = document.getElementById('tarot-content');

// Initialize Tarot
fetch('https://tarotapi.dev/api/v1/cards/random?n=3')
  .then(response => response.json())
  .then(data => displayTarotCards(data.cards));

function displayTarotCards(cards) {
  cardContainer.innerHTML = '';
  
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'atvImg tarot-card';
    cardElement.dataset.name = card.name_short;
    
    const isReversed = Math.random() < 0.5;
    if (isReversed) {
      cardElement.classList.add('reversed');
      cardElement.dataset.orientation = 'reversed';
    } else {
      cardElement.dataset.orientation = 'upright';
    }
    
    cardContainer.appendChild(cardElement);
  });

  atvImg();
}

// Card Click
cardContainer.addEventListener('click', e => {
  const target = e.target.closest('.tarot-card');
  if (!target) return;

  document.querySelectorAll('.atvImg')
    .forEach(card => card.classList.remove('active'));
  target.classList.add('active');

  fetchTarotCardDetails(target.dataset.name, target.dataset.orientation === 'reversed');
});

// Fetch Card
function fetchTarotCardDetails(cardName, isReversed) {
  fetch(`https://tarotapi.dev/api/v1/cards/${cardName}`)
    .then(response => response.json())
    .then(data => {
      const card = data.card;
      output.classList.remove('hidden');
      tarotTitle.textContent = `${card.name}${isReversed ? ' (Reversed)' : ''}`;
      tarotContent.innerHTML = `
        <p><span class="highlight">${isReversed ? 'Reversed Meaning' : 'Meaning'}:</span> 
           ${isReversed ? (card.meaning_rev || 'N/A') : card.meaning_up}</p>
        <p><span class="highlight">Description:</span> ${card.desc}</p>
      `;
    });
}

// Mobile Support
function initializeMobileSupport() {
  document.querySelectorAll('.atvImg').forEach(card => {
    card.addEventListener('touchstart', () => card.style.transform = 'scale(0.97)');
    card.addEventListener('touchend', () => card.style.transform = '');
  });
}

initializeMobileSupport();