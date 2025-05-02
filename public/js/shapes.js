document.addEventListener('DOMContentLoaded', () => {
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
                size: '6px',
                color: '#ffffff'
            }
        },
        animation: {
            rotationDuration: 20,
            dotSpeed: 2,
            dotsCount: {
                rotating: 20,
                horizontal: 2,
                vertical: 2
            }
        }
    };

    const nav = document.querySelector('nav');

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

    function updateCirclePositions(circle1, circle2, hLineLeft, hLineRight, vLineTop, vLineBottom) {
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
    
        const secondaryWidth = circle2Rect.width;
        const secondaryHeight = circle2Rect.height;
    
        // Split line positions
        hLineLeft.style.top = `${circle2CenterY}px`;
        hLineLeft.style.left = `0`;
        hLineLeft.style.width = `${circle2CenterX - (secondaryWidth / 2)}px`;
    
        hLineRight.style.top = `${circle2CenterY}px`;
        hLineRight.style.left = `${circle2CenterX + (secondaryWidth / 2)}px`;
        hLineRight.style.width = `${viewportWidth - (circle2CenterX + (secondaryWidth / 2))}px`;
    
        vLineTop.style.left = `${circle2CenterX}px`;
        vLineTop.style.top = `0`;
        vLineTop.style.height = `${circle2CenterY - (secondaryHeight / 2)}px`;
    
        vLineBottom.style.left = `${circle2CenterX}px`;
        vLineBottom.style.top = `${circle2CenterY + (secondaryHeight / 2)}px`;
        vLineBottom.style.height = `${viewportHeight - (circle2CenterY + (secondaryHeight / 2))}px`;
    
        const navOffsetX = circle1Rect.width / 4;
        const navOffsetY = circle1Rect.height / 4;
    
        Object.assign(nav.style, {
            position: 'absolute',
            top: `${circle1CenterY + navOffsetY}px`,
            left: `${circle1CenterX + navOffsetX}px`,
            transform: 'translate(-50%, -50%)'
        });
    
        const dna = document.querySelector('#dna');
        if (dna) {
            const dnaScale = secondaryCircleSize / (CONFIG.circles.main.baseWidth * CONFIG.circles.secondary.scale) / 2.5;
            Object.assign(dna.style, {
                position: 'absolute',
                top: `${circle2CenterY}px`,
                left: `${circle2CenterX}px`,
                transform: `translate(-50%, -50%) scale(${dnaScale})`,
                transformOrigin: 'center center'
            });
        }
    }
    

    function animateDotsAroundCircle(circle, dots, baseRadiusOffset, rotationSpeed) {
        let startTime = null;

        function animate(time) {
            if (!startTime) startTime = time;
            const elapsed = (time - startTime) / 1000;

            const circleRect = circle.getBoundingClientRect();
            const centerX = circleRect.left + circleRect.width / 2;
            const centerY = circleRect.top + circleRect.height / 2;
            const radius = (circleRect.width / 2) + baseRadiusOffset;

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

    function animateDotsOnLines(lineDots, isHorizontal, speed, getFixedPosition) {
        lineDots.forEach((dot) => {
            let position = parseFloat(dot.style[isHorizontal ? 'left' : 'top']) || 0;

            function moveDot() {
                position += speed;
                if (isHorizontal) {
                    if (position > window.innerWidth) position = 0;
                } else {
                    if (position > window.innerHeight) position = 0;
                }

                const fixedPos = getFixedPosition();
                if (isHorizontal) {
                    dot.style.left = `${position}px`;
                    dot.style.top = `${fixedPos}px`;
                } else {
                    dot.style.left = `${fixedPos}px`;
                    dot.style.top = `${position}px`;
                }

                requestAnimationFrame(moveDot);
            }

            moveDot();
        });
    }

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
    
        // Create split lines
        const horizontalLineLeft = createLine(true, 0);
        const horizontalLineRight = createLine(true, 0);
        const verticalLineTop = createLine(false, 0);
        const verticalLineBottom = createLine(false, 0);
    
        const rotatingDots = Array.from(
            { length: CONFIG.animation.dotsCount.rotating },
            () => createDot(0, 0)
        );
    
        animateDotsAroundCircle(
            circle1,
            rotatingDots,
            0,
            (2 * Math.PI) / CONFIG.animation.rotationDuration
        );
    
        const circle2Rect = circle2.getBoundingClientRect();
        const circle2CenterX = circle2Rect.left + circle2Rect.width / 2 + 13.5;
        const circle2CenterY = circle2Rect.top + circle2Rect.height / 2;
    
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
    
        animateDotsOnLines(horizontalDots, true, CONFIG.animation.dotSpeed, () => {
            const rect = circle2.getBoundingClientRect();
            return rect.top + rect.height / 2;
        });
    
        animateDotsOnLines(verticalDots, false, CONFIG.animation.dotSpeed, () => {
            const rect = circle2.getBoundingClientRect();
            return rect.left + rect.width / 2;
        });
    
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() =>
                updateCirclePositions(
                    circle1,
                    circle2,
                    horizontalLineLeft,
                    horizontalLineRight,
                    verticalLineTop,
                    verticalLineBottom
                ), 100);
        });
    
        updateCirclePositions(circle1, circle2, horizontalLineLeft, horizontalLineRight, verticalLineTop, verticalLineBottom);
    }    

    initialize();

    // DNA Animation Delay
    const bars = document.querySelectorAll("#dna div");
    const delayStep = 0.15;
    bars.forEach((bar, i) => {
        bar.style.animationDelay = `${(i * delayStep).toFixed(2)}s`;
    });
});
