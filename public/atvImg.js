function atvImg() {
  const cards = document.querySelectorAll('.atvImg');
  
  cards.forEach(card => {
    
    // Create star particles
    for (let i = 0; i < 10; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      const size = Math.random() * 2 + 1; // 1-3px
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5; // 0-5s delay
      
      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        z-index: 1;
        animation: twinkle 3s infinite ${delay}s;
        pointer-events: none;
      `;
      card.appendChild(star);
    }
    
    // Add a style tag for the animations if not already present
    if (!document.getElementById('cosmic-animations')) {
      const style = document.createElement('style');
      style.id = 'cosmic-animations';
      style.innerHTML = `

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `;
      document.head.appendChild(style);
    }
    
    card.addEventListener('mousemove', e => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Get mouse position relative to card
      const mouseX = e.clientX - cardRect.left;
      const mouseY = e.clientY - cardRect.top;
      
      // Calculate rotation based on mouse position
      const rotateY = ((mouseX / cardWidth) - 0.5) * 20; // -10 to 10 degrees
      const rotateX = ((mouseY / cardHeight) - 0.5) * -20; // 10 to -10 degrees
      
      // Apply rotation to card
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset transform on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}