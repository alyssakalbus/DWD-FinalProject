document.addEventListener('DOMContentLoaded', () => {
    // Constants and Configurations
    const LINE_THICKNESS = '.5px';
    const OFFSET_FROM_CENTER = 200;
    const CIRCLE_PROPERTIES = {
        mainCircle: {
            baseWidth: 750,
            baseHeight: 750,
            widthRatio: 0.9,
            heightRatio: 0.9,
            top: '5%',
            left: '50%'
        },
        secondaryCircle: {
            scale: 0.45
        },
        dotCircle: {
            size: '10px',
            color: '#ffffff'
        }
    };

    // DOM Elements
    const nav = document.querySelector('nav');

    // Helper Functions
    function createCircle({ width, height, top, left, scale, isMainCircle = false }) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = width;
        circle.style.height = height;
        circle.style.position = 'absolute';
        circle.style.top = top;
        circle.style.left = left;
        if (!isMainCircle) circle.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(circle);
        return circle;
    }

    function createDot(x, y) {
        const dot = document.createElement('div');
        dot.classList.add('circle');
        dot.style.width = CIRCLE_PROPERTIES.dotCircle.size;
        dot.style.height = CIRCLE_PROPERTIES.dotCircle.size;
        dot.style.backgroundColor = CIRCLE_PROPERTIES.dotCircle.color;
        dot.style.position = 'absolute';
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(dot);
        return dot;
    }

    function createLine(isHorizontal, position) {
        const line = document.createElement('div');
        line.classList.add('cross-line');
        line.style.position = 'absolute';
        line.style.width = isHorizontal ? '100vw' : LINE_THICKNESS;
        line.style.height = isHorizontal ? LINE_THICKNESS : '100vh';
        line.style.top = isHorizontal ? `${position}px` : '0';
        line.style.left = isHorizontal ? '0' : `${position}px`;
        document.body.appendChild(line);
        return line;
    }

    function calculateCircleSize(viewportWidth, viewportHeight) {
        return Math.min(
            viewportWidth * CIRCLE_PROPERTIES.mainCircle.widthRatio,
            viewportHeight * CIRCLE_PROPERTIES.mainCircle.heightRatio
        );
    }

    function updateCirclePositions(circle1, circle2, line1, line2) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate main circle size
        const mainCircleWidth = calculateCircleSize(viewportWidth, viewportHeight);
        circle1.style.width = `${mainCircleWidth}px`;
        circle1.style.height = `${mainCircleWidth}px`;

        // Get first circle's position
        const circle1Rect = circle1.getBoundingClientRect();
        const circle1CenterX = circle1Rect.left + circle1Rect.width / 2;
        const circle1CenterY = circle1Rect.top + circle1Rect.height / 2;

        // Calculate second circle size and position
        const secondaryCircleSize = mainCircleWidth * CIRCLE_PROPERTIES.secondaryCircle.scale;
        circle2.style.width = `${secondaryCircleSize}px`;
        circle2.style.height = `${secondaryCircleSize}px`;

        // Calculate relative position using the ratio of current size to base size
        const sizeRatio = mainCircleWidth / CIRCLE_PROPERTIES.mainCircle.baseWidth;
        const relativeOffsetX = 570 * sizeRatio;
        const relativeOffsetY = 440 * sizeRatio;

        // Update second circle position maintaining relative distance
        circle2.style.top = `${circle1CenterY + (circle1Rect.height / 2) - relativeOffsetY}px`;
        circle2.style.left = `${circle1CenterX + (circle1Rect.width / 2) - relativeOffsetX}px`;

        // Update second circle center position for lines
        const circle2Rect = circle2.getBoundingClientRect();
        const circle2CenterX = circle2Rect.left + circle2Rect.width / 2;
        const circle2CenterY = circle2Rect.top + circle2Rect.height / 2;

        // Update lines
        line1.style.top = `${circle2CenterY}px`;
        line2.style.left = `${circle2CenterX}px`;

        // Update nav position
        const navOffsetX = circle1Rect.width / 4;
        const navOffsetY = circle1Rect.height / 4;
        nav.style.position = 'absolute';
        nav.style.top = `${circle1CenterY + navOffsetY}px`;
        nav.style.left = `${circle1CenterX + navOffsetX}px`;
        nav.style.transform = 'translate(-50%, -50%)';
    }

    function positionDotsOnCircle(circle, dots, radius, duration) {
        const circleRect = circle.getBoundingClientRect();
        const centerX = circleRect.left + circleRect.width / 2;
        const centerY = circleRect.top + circleRect.height / 2;

        dots.forEach((dot, index) => {
            const angle = (index / dots.length) * 360; // Distribute dots evenly
            const radian = (angle * Math.PI) / 180;

            const x = centerX + radius * Math.cos(radian);
            const y = centerY + radius * Math.sin(radian);

            dot.style.position = 'absolute';
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            dot.style.transform = 'translate(-50%, -50%)';

            // Add rotation animation
            dot.style.animation = `rotate-circle ${duration}s linear infinite`;
            dot.style.transformOrigin = `${centerX - x}px ${centerY - y}px`;
        });
    }

    function animateDotsOnLines(lineDots, isHorizontal, speed) {
        lineDots.forEach((dot) => {
            let position = parseFloat(dot.style[isHorizontal ? 'left' : 'top']) || 0;

            function moveDot() {
                // Increment position
                position += speed;

                // Reset position if the dot goes offscreen
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
    const circle1 = createCircle({
        width: `${CIRCLE_PROPERTIES.mainCircle.baseWidth}px`,
        height: `${CIRCLE_PROPERTIES.mainCircle.baseHeight}px`,
        top: CIRCLE_PROPERTIES.mainCircle.top,
        left: CIRCLE_PROPERTIES.mainCircle.left,
        isMainCircle: true
    });

    const circle1Rect = circle1.getBoundingClientRect();
    const circle1CenterX = circle1Rect.left + circle1Rect.width / 2;
    const circle1CenterY = circle1Rect.top + circle1Rect.height / 2;

    const circle2 = createCircle({
        width: `${circle1Rect.width * CIRCLE_PROPERTIES.secondaryCircle.scale}px`,
        height: `${circle1Rect.height * CIRCLE_PROPERTIES.secondaryCircle.scale}px`,
        top: `${circle1CenterY + circle1Rect.height / 2 - 440}px`,
        left: `${circle1CenterX + circle1Rect.width / 2 - 570}px`
    });

    const circle2Rect = circle2.getBoundingClientRect();
    const circle2CenterX = circle2Rect.left + circle2Rect.width / 2;
    const circle2CenterY = circle2Rect.top + circle2Rect.height / 2;

    // After all initializations (at the bottom of the DOMContentLoaded event listener)
    const line1 = createLine(true, circle2CenterY);
    const line2 = createLine(false, circle2CenterX);

    // Add rotating dots on the main circle
    const rotatingDots = Array.from({ length: 2 }, () => createDot(0, 0));
    positionDotsOnCircle(circle1, rotatingDots, circle1Rect.width / 2, 20);

    // Add moving dots along the lines
    const horizontalDots = Array.from({ length: 2 }, () => createDot(0, circle2CenterY));
    const verticalDots = Array.from({ length: 2 }, () => createDot(circle2CenterX, 0));

    // Initialize positions for horizontal and vertical dots
    horizontalDots.forEach((dot, index) => {
        dot.style.left = `${index * 900}px`;
        dot.style.top = `${circle2CenterY}px`;
    });

    verticalDots.forEach((dot, index) => {
        dot.style.left = `${circle2CenterX}px`;
        dot.style.top = `${index * 400}px`;
    });

    // Animate dots along the lines
    animateDotsOnLines(horizontalDots, true, 2);
    animateDotsOnLines(verticalDots, false, 2);

    // Initial position update
    updateCirclePositions(circle1, circle2, line1, line2);

    // Add resize event listener with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => updateCirclePositions(circle1, circle2, line1, line2), 100);
    });
});