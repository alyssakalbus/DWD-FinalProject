document.addEventListener('DOMContentLoaded', () => {
    // Create the first circle
    const circle1 = document.createElement('div');
    circle1.classList.add('circle');
    document.body.appendChild(circle1);

    // Create the second circle
    const circle2 = document.createElement('div');
    circle2.classList.add('circle');
    circle2.style.width = '400px'; // Adjust size for the second circle
    circle2.style.height = '400px'; // Adjust size for the second circle
    circle2.style.top = '40%'; // Adjust position for the second circle
    circle2.style.left = '65.1%'; // Adjust position for the second circle
    document.body.appendChild(circle2);
});