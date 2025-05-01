// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set effect velocity in ms
    const velocity = 30;
    
    // Get all elements with the shuffle class
    const shuffleElements = document.querySelectorAll('.shuffle');
    
    // Store original text for each element
    shuffleElements.forEach(function(item) {
        item.setAttribute('data-text', item.textContent);
    });
    
    // Shuffle array function
    const shuffle = function(array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;
        
        // While there remain elements to shuffle
        while (currentIndex !== 0) {
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            // Swap it with the current element
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    };
    
    // Text shuffle function
    const shuffleText = function(element, originalText) {
        const elementTextArray = [];
        let randomText = [];
        
        // Split the original text into an array of characters
        for (let i = 0; i < originalText.length; i++) {
            elementTextArray.push(originalText.charAt(i));
        }
        
        // Recursive function to repeat the shuffle effect
        const repeatShuffle = function(times, index) {
            if (index == times) {
                element.textContent = originalText;
                return;
            }
            
            setTimeout(function() {
                randomText = shuffle([...elementTextArray]); // Create a copy to avoid modifying original array
                
                // Keep characters that have already been set
                for (let i = 0; i < index; i++) {
                    randomText[i] = originalText[i];
                }
                
                randomText = randomText.join('');
                element.textContent = randomText;
                index++;
                repeatShuffle(times, index);
            }, velocity);
        }
        
        repeatShuffle(element.textContent.length, 0);
    };
    
    // Add mouseenter event listener to each shuffle element
    shuffleElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            shuffleText(element, element.getAttribute('data-text'));
        });
    });
});