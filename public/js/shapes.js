document.addEventListener('DOMContentLoaded', () => {
    // Constants and Configurations
    const CONFIG = {
        lines: {
            thickness: '.5px'
        },
        circles: {
            main: {
                baseWidth: 750,
                baseHeight: 750,
                widthRatio: 0.9,
                heightRatio: 0.9,
                top: '5%',
                left: '50%'
            },
            secondary: {
                scale: 0.45
            },
            dot: {
                size: '10px',
                color: '#ffffff'
            }
        },
        animation: {
            rotationDuration: 20,
            dotSpeed: 2,
            dotsCount: {
                rotating: 2,
                horizontal: 2,
                vertical: 2
            }
        }
    };

    // DOM Elements
    const nav = document.querySelector('nav');

    // Helper Functions
    function createCircle({ width, height, top, left, isMainCircle = false }) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        
        Object.assign(circle.style, {
            width,
            height,
            position: 'absolute',
            top,
            left
        });
        
        if (!isMainCircle) circle.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(circle);
        return circle;
    }

    function createDot(x, y) {
        const dot = document.createElement('div');
        dot.classList.add('circle');
        
        Object.assign(dot.style, {
            width: CONFIG.circles.dot.size,
            height: CONFIG.circles.dot.size,
            backgroundColor: CONFIG.circles.dot.color,
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)'
        });
        
        document.body.appendChild(dot);
        return dot;
    }

    function createLine(isHorizontal, position) {
        const line = document.createElement('div');
        line.classList.add('cross-line');
        
        Object.assign(line.style, {
            position: 'absolute',
            width: isHorizontal ? '100vw' : CONFIG.lines.thickness,
            height: isHorizontal ? CONFIG.lines.thickness : '100vh',
            top: isHorizontal ? `${position}px` : '0',
            left: isHorizontal ? '0' : `${position}px`
        });
        
        document.body.appendChild(line);
        return line;
    }

    function calculateCircleSize(viewportWidth, viewportHeight) {
        return Math.min(
            viewportWidth * CONFIG.circles.main.widthRatio,
            viewportHeight * CONFIG.circles.main.heightRatio
        );
    }

    function updateCirclePositions(circle1, circle2, line1, line2) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const mainCircleWidth = calculateCircleSize(viewportWidth, viewportHeight);
        circle1.style.width = `${mainCircleWidth}px`;
        circle1.style.height = `${mainCircleWidth}px`;

        const circle1Rect = circle1.getBoundingClientRect();
        const circle1CenterX = circle1Rect.left + circle1Rect.width / 2;
        const circle1CenterY = circle1Rect.top + circle1Rect.height / 2;

        const secondaryCircleSize = mainCircleWidth * CONFIG.circles.secondary.scale;
        circle2.style.width = `${secondaryCircleSize}px`;
        circle2.style.height = `${secondaryCircleSize}px`;

        const sizeRatio = mainCircleWidth / CONFIG.circles.main.baseWidth;
        const relativeOffsetX = 570 * sizeRatio;
        const relativeOffsetY = 440 * sizeRatio;

        circle2.style.top = `${circle1CenterY + (circle1Rect.height / 2) - relativeOffsetY}px`;
        circle2.style.left = `${circle1CenterX + (circle1Rect.width / 2) - relativeOffsetX}px`;

        const circle2Rect = circle2.getBoundingClientRect();
        const circle2CenterX = circle2Rect.left + circle2Rect.width / 2;
        const circle2CenterY = circle2Rect.top + circle2Rect.height / 2;

        line1.style.top = `${circle2CenterY}px`;
        line2.style.left = `${circle2CenterX}px`;

        const navOffsetX = circle1Rect.width / 4;
        const navOffsetY = circle1Rect.height / 4;
        
        Object.assign(nav.style, {
            position: 'absolute',
            top: `${circle1CenterY + navOffsetY}px`,
            left: `${circle1CenterX + navOffsetX}px`,
            transform: 'translate(-50%, -50%)'
        });
    }

    function animateDotsAroundCircle(circle, dots, radius, rotationSpeed) {
        let startTime = null;

        function animate(time) {
            if (!startTime) startTime = time;
            const elapsed = (time - startTime) / 1000;

            const circleRect = circle.getBoundingClientRect();
            const centerX = circleRect.left + circleRect.width / 2;
            const centerY = circleRect.top + circleRect.height / 2;

            dots.forEach((dot, index) => {
                const angleOffset = (index / dots.length) * 2 * Math.PI;
                const angle = (elapsed * rotationSpeed) + angleOffset;

                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                Object.assign(dot.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });
            });

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    function animateDotsOnLines(lineDots, isHorizontal, speed) {
        lineDots.forEach((dot) => {
            let position = parseFloat(dot.style[isHorizontal ? 'left' : 'top']) || 0;

            function moveDot() {
                position += speed;

                if (isHorizontal) {
                    if (position > window.innerWidth) position = 0;
                    dot.style.left = `${position}px`;
                } else {
                    if (position > window.innerHeight) position = 0;
                    dot.style.top = `${position}px`;
                }

                requestAnimationFrame(moveDot);
            }

            moveDot();
        });
    }

    // Initialization
    function initialize() {
        const circle1 = createCircle({
            width: `${CONFIG.circles.main.baseWidth}px`,
            height: `${CONFIG.circles.main.baseHeight}px`,
            top: CONFIG.circles.main.top,
            left: CONFIG.circles.main.left,
            isMainCircle: true
        });

        const circle1Rect = circle1.getBoundingClientRect();
        const circle1CenterX = circle1Rect.left + circle1Rect.width / 2;
        const circle1CenterY = circle1Rect.top + circle1Rect.height / 2;

        const circle2 = createCircle({
            width: `${circle1Rect.width * CONFIG.circles.secondary.scale}px`,
            height: `${circle1Rect.height * CONFIG.circles.secondary.scale}px`,
            top: `${circle1CenterY + circle1Rect.height / 2 - 418}px`,
            left: `${circle1CenterX + circle1Rect.width / 2 - 570}px`
        });

        const circle2Rect = circle2.getBoundingClientRect();
        const circle2CenterX = circle2Rect.left + circle2Rect.width / 2 + 13.5;
        const circle2CenterY = circle2Rect.top + circle2Rect.height / 2;

        const line1 = createLine(true, circle2CenterY);
        const line2 = createLine(false, circle2CenterX);

        const rotatingDots = Array.from(
            { length: CONFIG.animation.dotsCount.rotating }, 
            () => createDot(0, 0)
        );
        
        animateDotsAroundCircle(
            circle1, 
            rotatingDots, 
            circle1Rect.width / 2 + 26, 
            (2 * Math.PI) / CONFIG.animation.rotationDuration
        );

        const horizontalDots = Array.from(
            { length: CONFIG.animation.dotsCount.horizontal }, 
            () => createDot(0, circle2CenterY)
        );
        const verticalDots = Array.from(
            { length: CONFIG.animation.dotsCount.vertical }, 
            () => createDot(circle2CenterX, 0)
        );

        horizontalDots.forEach((dot, index) => {
            dot.style.left = `${index * 900}px`;
            dot.style.top = `${circle2CenterY}px`;
        });

        verticalDots.forEach((dot, index) => {
            dot.style.left = `${circle2CenterX}px`;
            dot.style.top = `${index * 400}px`;
        });

        animateDotsOnLines(horizontalDots, true, CONFIG.animation.dotSpeed);
        animateDotsOnLines(verticalDots, false, CONFIG.animation.dotSpeed);

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => updateCirclePositions(circle1, circle2, line1, line2), 100);
        });

        updateCirclePositions(circle1, circle2, line1, line2);
    }
    
    initialize();
});

// DNA Animation
document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll("#dna div");
    const delayStep = 0.15; // seconds
    bars.forEach((bar, i) => {
      bar.style.animationDelay = `${(i * delayStep).toFixed(2)}s`;
    });
  });
