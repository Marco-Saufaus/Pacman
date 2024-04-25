$(document).ready(function() {

    let score = 0;
    let gameState = false;
    let currentPosition;
    let startingPosition;
    let startTime;
    let intervalId;
    let numberTurns = 0;
    let currentGhosts = 0;

    
    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 0, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 2, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 2, 2, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];


    // Start a timer-interval
    function startTimer() {
        startTime = new Date();
        intervalId = setInterval(updateTimer, 1000);
    };


    // End the timer-interval
    function endTimer() {
        clearInterval(intervalId);
    };


    // Calculate elapsed time and update timer
    function updateTimer() {
        let currentTime = new Date();
        let elapsedTime = Math.floor((currentTime - startTime) / 1000);
        $("#timeElapsed").text(elapsedTime + "s")
        return elapsedTime;
    };


    // Create unique Id's for each generated div
    function getDivId(x, y) {
        return "fill" + (x + y * 28 + 1);
    };


    // Create divs to display the map
    function generateDivs() {
        for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                var id = getDivId(x, y);
                $(".container").append("<div id = '" + id + "' class = 'fill'></div>");
            }
        }
    };


    // Generate map borders
    function generateBorders() {
        for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 1) {
                    $("#fill" + (y * 28 + x + 1)).css("border", "1px solid #2121ff");
                    $("#fill" + (y * 28 + x + 1)).addClass("fill-border");
                }
            }
        }
    };


    // Generate coins
    function generateCoins() {
        for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 0) {
                    $("#fill" + (y * 28 + x + 1)).append("<div class = 'coin' id = 'coin" + (y * 28 + x + 1) + "'></div>");
                } else if (map[y][x] === 3) {
                    $("#fill" + (y * 28 + x + 1)).append("<div class = 'coin-big'></div>");
                }
            }
        }
    };


    // Randomly place pacman on a starting square
    function placePlayer() {
        let startingPositions = [];

        for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 9) {
                    startingPositions.push("#fill" + (y * 28 + x + 1));
                }
            }
        }

        startingPosition = startingPositions[Math.floor(Math.random() * startingPositions.length)];

        map[Math.round(parseInt(startingPosition.substring(5) / 28))][((parseInt(startingPosition.substring(5)) % 28) - 1)] = 4;
        $(startingPosition).append("<div class = 'player' id = 'pacman'></div>");

    };


    // Open and close mouth
    function toggleMouth() {
        var pacman = $("#pacman");
        var mouthOpen = "polygon(0% 0%, 0% 100%, 100% 100%, 100% 50%, 50% 50%, 50% 0%)";

        // Check if pacman's mouth is open
        if (pacman.css("clip-path") === mouthOpen) {
            // If open, set to closed
            pacman.css("clip-path", "none");
        } else {
            // If closed, set to open
            pacman.css({
                "clip-path": mouthOpen,
                "transition": "clip-path 0.4s ease" // Adjust the duration and timing function as needed
            });
        }
    };


    // Function to animate mouth opening and closing
    function animateMouth() {
        setInterval(toggleMouth, 400);
    };


    // Displays Game Over screen
    function gameOver() {
        $("#currentScore").text(score);
        endTimer();
        let elapsedTime = updateTimer();
        $("#winOrLose").text("You lose!")
        $("#popupContainer").show();
        $("#popupScoreValue").text(score);
        $("#popupTimerValue").text(elapsedTime + "s");
        gameState = false;
    };


    // Moves pacman + ghosts and updates map when an arrow key is pressed
    function movePacman(dx, dy) {

        // Start game
        if (!gameState) {
            startTimer();
            currentPosition = startingPosition;
            gameState = true;
            animateMouth();
        }

        let id = parseInt(currentPosition.substring(5));
        let newId = id + dx + 28 * dy; // Calculate new position
        newPosition = "#fill" + newId;
        let newMapCoordinate = map[Math.round(parseInt(newPosition.substring(5) / 28))][((parseInt(newPosition.substring(5)) % 28) - 1)];

        if (newId % 28 !== 0) { // Check collision with map border
            if (newMapCoordinate !== 1) { // Check collision with walls
                if ([5, 6, 7, 8].includes(newMapCoordinate)) { // Check collision with Ghosts
                    gameOver();
                } else {
                    
                    // Remove old position
                    map[Math.round(parseInt(currentPosition.substring(5) / 28))][((parseInt(currentPosition.substring(5)) % 28) - 1)] = 2;
                    $("#pacman").remove();

                    // Update new position
                    currentPosition = newPosition;
                    $(currentPosition).append("<div class = 'player' id = 'pacman'></div>");

                    // Rotate pacman
                    switch (dx) {
                        case -1:
                            $("#pacman").css("transform", "rotate(225deg)");
                            break;
                        case 1:
                            $("#pacman").css("transform", "rotate(45deg)");
                            break;
                        default:
                            break;
                    }
                    switch (dy) {
                        case -1:
                            $("#pacman").css("transform", "rotate(315deg)");
                            break;
                        case 1:
                            $("#pacman").css("transform", "rotate(135deg)");
                            break;
                        default:
                            break;
                    }

                    numberTurns += 1;

                    checkForCoin();

                    // Place pacman on map at new position
                    map[Math.round(parseInt(currentPosition.substring(5) / 28))][((parseInt(currentPosition.substring(5)) % 28) - 1)] = 4;
                    
                    moveGhosts();
                }
            }
        }
    };


    // Pick up coins and increase score
    function checkForCoin() {
        let currentMapCoordinate = map[Math.round(parseInt(currentPosition.substring(5) / 28))][((parseInt(currentPosition.substring(5)) % 28) - 1)];
        if ([0, 50, 60, 70, 80].includes(currentMapCoordinate)) {
            currentMapCoordinate = 2;
            $(currentPosition + " .coin").remove()
            updateScore(1);
        } else if ([3, 53, 63, 73, 83].includes(currentMapCoordinate)) {
            currentMapCoordinate = 2;
            $(currentPosition + " .coin-big").remove();
            updateScore(5);
        }
    };


    function moveGhosts() {
        ghost1Movement();
        ghost2Movement();
        ghost3Movement();
        ghost4Movement();

        // Spawn new ghost after specific number of turns
        if ([20, 40, 60, 80].includes(numberTurns)) {
            spawnGhost();
        }
    };


    function spawnGhost() {
        let startingPositions = [];

        for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 9 || map[y][x] === 2) { // All empty corridors
                    startingPositions.push("#fill" + (y * 28 + x + 1));
                }
            }
        }

        // Choose random position and check if placement is possible
        while (!startingPosition || map[Math.round(parseInt(startingPosition.substring(5) / 28))][((parseInt(startingPosition.substring(5)) % 28) - 1)] !== 2) {
            let randomIndex = Math.floor(Math.random() * startingPositions.length);
            let potentialPosition = startingPositions[randomIndex];
            let y = Math.round(parseInt(potentialPosition.substring(5) / 28));
            let x = ((parseInt(potentialPosition.substring(5)) % 28) - 1);

            if (map[Math.round(parseInt(potentialPosition.substring(5) / 28))][((parseInt(potentialPosition.substring(5)) % 28) - 1)] === 2) {
                if (map[y - 1][x] !== 4 && map[y + 1][x] !== 5 && map[y][x - 1] !== 6 && map[y][x + 1] !== 7) {
                    startingPosition = potentialPosition;
                }   
            } else {
                startingPositions.splice(randomIndex, 1);

                if (startingPositions.length === 0) {
                    console.log("No valid starting position found.")
                    return;
                }
            }
        }

        // Place ghost and increment currentGhosts
        map[Math.round(parseInt(startingPosition.substring(5) / 28))][((parseInt(startingPosition.substring(5)) % 28) - 1)] = currentGhosts + 5;
        currentGhosts += 1;
        $(startingPosition).append("<div class = 'ghost' id = 'ghost" + currentGhosts + "'></div>");
    };


    // Ghost movement function and coin interaction
    function ghostCoin (coinType, ghostNumber, dx, dy, x, y) {
        map[y][x] = coinType;
        let ghost = "ghost" + ghostNumber;
    
        $("#" + ghost).remove();
        console.log("removed");
        if (map[y + dy][x + dx] === 0) {
            map[y + dy][x + dx] = (4 + ghostNumber) * 10;
            $("#fill" + ((x + dx) + (y + dy) * 28 + 1)).append("<div class='ghost' id='" + ghost + "'></div>");
        } else if (map[y + dy][x + dx] === 3) {
            map[y + dy][x + dx] = (4 + ghostNumber) * 10 + 3;
            $("#fill" + ((x + dx) + (y + dy) * 28 + 1)).append("<div class='ghost' id='" + ghost + "'></div>");
        } else {
            map[y + dy][x + dx] = 4 + ghostNumber;
            $("#fill" + ((x + dx) + (y + dy) * 28 + 1)).append("<div class='ghost' id='" + ghost + "'></div>");
        }  
    };

    // Ghost movement logic
    function ghost1Movement() {
        outerLoop: for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 5 || map[y][x] === 50 || map[y][x] == 53) {
                    
                    let possibleDirections = [];

                    if (![1, 6, 7, 8, 60, 70, 80, 63, 73, 83].includes(map[y][x - 1])) {
                        possibleDirections.push("left");
                    }
                    if (![1, 6, 7, 8, 60, 70, 80, 63, 73, 83].includes(map[y][x + 1])) {
                        possibleDirections.push("right");
                    }
                    if (![1, 6, 7, 8, 60, 70, 80, 63, 73, 83].includes(map[y - 1][x])) {
                        possibleDirections.push("up");
                    }
                    if (![1, 6, 7, 8, 60, 70, 80, 63, 73, 83].includes(map[y + 1][x])) {
                        possibleDirections.push("down");
                    }

                    let chosenDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                    let newPosition;

                    switch (chosenDirection) {
                        case "left":
                            if (map[y][x - 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 50) {
                                ghostCoin(0, 1, -1, 0, x, y);                                
                            } else if (map[y][x] === 53) {
                                ghostCoin(3, 1, -1, 0, x, y);
                            } else {
                                ghostCoin(2, 1, -1, 0, x, y);
                            }                            
                            break;
                        case "right":
                            if (map[y][x + 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 50) {
                                ghostCoin(0, 1, 1, 0, x, y);                                
                            } else if (map[y][x] === 53) {
                                ghostCoin(3, 1, 1, 0, x, y);
                            } else {
                                ghostCoin(2, 1, 1, 0, x, y);
                            }                            
                            break;
                        case "up":
                            if (map[y - 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 50) {
                                ghostCoin(0, 1, 0, -1, x, y);                                
                            } else if (map[y][x] === 53) {
                                ghostCoin(3, 1, 0, -1, x, y);
                            } else {
                                ghostCoin(2, 1, 0, -1, x, y);
                            }                            
                            break;
                        case "down":
                            if (map[y + 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 50) {
                                ghostCoin(0, 1, 0, 1, x, y);                                
                            } else if (map[y][x] === 53) {
                                ghostCoin(3, 1, 0, 1, x, y);
                            } else {
                                ghostCoin(2, 1, 0, 1, x, y);
                            }                            
                            break;
                    }
                    
                    break outerLoop;
                }
            }
        }
    };


    function ghost2Movement() {
        outerLoop: for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 6 || map[y][x] === 60 || map[y][x] == 63) {
                    
                    let possibleDirections = [];

                    if (![1, 5, 7, 8, 50, 70, 80, 53, 73, 83].includes(map[y][x - 1])) {
                        possibleDirections.push("left");
                    }
                    if (![1, 5, 7, 8, 50, 70, 80, 53, 73, 83].includes(map[y][x + 1])) {
                        possibleDirections.push("right");
                    }
                    if (![1, 5, 7, 8, 50, 70, 80, 53, 73, 83].includes(map[y - 1][x])) {
                        possibleDirections.push("up");
                    }
                    if (![1, 5, 7, 8, 50, 70, 80, 53, 73, 83].includes(map[y + 1][x])) {
                        possibleDirections.push("down");
                    }
                    let chosenDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                    let newPosition;
                    switch (chosenDirection) {
                        case "left":
                            if (map[y][x - 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 60) {
                                ghostCoin(0, 2, -1, 0, x, y);                                
                            } else if (map[y][x] === 63) {
                                ghostCoin(3, 2, -1, 0, x, y);
                            } else {
                                ghostCoin(2, 2, -1, 0, x, y);
                            }                            
                            break;
                        case "right":
                            if (map[y][x + 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 60) {
                                ghostCoin(0, 2, 1, 0, x, y);                                
                            } else if (map[y][x] === 63) {
                                ghostCoin(3, 2, 1, 0, x, y);
                            } else {
                                ghostCoin(2, 2, 1, 0, x, y);
                            }                            
                            break;
                        case "up":
                            if (map[y - 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 60) {
                                ghostCoin(0, 2, 0, -1, x, y);                                
                            } else if (map[y][x] === 63) {
                                ghostCoin(3, 2, 0, -1, x, y);
                            } else {
                                ghostCoin(2, 2, 0, -1, x, y);
                            }                            
                            break;
                        case "down":
                            if (map[y + 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 60) {
                                ghostCoin(0, 2, 0, 1, x, y);                                
                            } else if (map[y][x] === 63) {
                                ghostCoin(3, 2, 0, 1, x, y);
                            } else {
                                ghostCoin(2, 2, 0, 1, x, y);
                            }                            
                            break;
                    }
                    
                    break outerLoop;
                }
            }
        }
    };


    function ghost3Movement() {
        outerLoop: for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 7 || map[y][x] === 70 || map[y][x] == 73) {
                    
                    let possibleDirections = [];

                    if (![1, 5, 6, 8, 50, 60, 80, 53, 63, 83].includes(map[y][x - 1])) {
                        possibleDirections.push("left");
                    }
                    if (![1, 5, 6, 8, 50, 60, 80, 53, 63, 83].includes(map[y][x + 1])) {
                        possibleDirections.push("right");
                    }
                    if (![1, 5, 6, 8, 50, 60, 80, 53, 63, 83].includes(map[y - 1][x])) {
                        possibleDirections.push("up");
                    }
                    if (![1, 5, 6, 8, 50, 60, 80, 53, 63, 83].includes(map[y + 1][x])) {
                        possibleDirections.push("down");
                    }
                    let chosenDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                    let newPosition;
                    switch (chosenDirection) {
                        case "left":
                            if (map[y][x - 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 70) {
                                ghostCoin(0, 3, -1, 0, x, y);                                
                            } else if (map[y][x] === 73) {
                                ghostCoin(3, 3, -1, 0, x, y);
                            } else {
                                ghostCoin(2, 3, -1, 0, x, y);
                            }                            
                            break;
                        case "right":
                            if (map[y][x + 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 70) {
                                ghostCoin(0, 3, 1, 0, x, y);                                
                            } else if (map[y][x] === 73) {
                                ghostCoin(3, 3, 1, 0, x, y);
                            } else {
                                ghostCoin(2, 3, 1, 0, x, y);
                            }                            
                            break;
                        case "up":
                            if (map[y - 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 70) {
                                ghostCoin(0, 3, 0, -1, x, y);                                
                            } else if (map[y][x] === 73) {
                                ghostCoin(3, 3, 0, -1, x, y);
                            } else {
                                ghostCoin(2, 3, 0, -1, x, y);
                            }                            
                            break;
                        case "down":
                            if (map[y + 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 70) {
                                ghostCoin(0, 3, 0, 1, x, y);                                
                            } else if (map[y][x] === 73) {
                                ghostCoin(3, 3, 0, 1, x, y);
                            } else {
                                ghostCoin(2, 3, 0, 1, x, y);
                            }                            
                            break;
                    }
                    
                    break outerLoop;
                }
            }
        }
    };


    function ghost4Movement() {
        outerLoop: for (let y = 0; y < 31; y++) {
            for (let x = 0; x < 28; x++) {
                if (map[y][x] === 8 || map[y][x] === 80 || map[y][x] == 83) {
                    
                    let possibleDirections = [];

                    if (![1, 5, 6, 7, 50, 60, 70, 53, 63, 73].includes(map[y][x - 1])) {
                        possibleDirections.push("left");
                    }
                    if (![1, 5, 6, 7, 50, 60, 70, 53, 63, 73].includes(map[y][x + 1])) {
                        possibleDirections.push("right");
                    }
                    if (![1, 5, 6, 7, 50, 60, 70, 53, 63, 73].includes(map[y - 1][x])) {
                        possibleDirections.push("up");
                    }
                    if (![1, 5, 6, 7, 50, 60, 70, 53, 63, 73].includes(map[y + 1][x])) {
                        possibleDirections.push("down");
                    }
                    let chosenDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                    let newPosition;
                    switch (chosenDirection) {
                        case "left":
                            if (map[y][x - 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 80) {
                                ghostCoin(0, 4, -1, 0, x, y);                                
                            } else if (map[y][x] === 83) {
                                ghostCoin(3, 4, -1, 0, x, y);
                            } else {
                                ghostCoin(2, 4, -1, 0, x, y);
                            }                            
                            break;
                        case "right":
                            if (map[y][x + 1] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 80) {
                                ghostCoin(0, 4, 1, 0, x, y);                                
                            } else if (map[y][x] === 83) {
                                ghostCoin(3, 4, 1, 0, x, y);
                            } else {
                                ghostCoin(2, 4, 1, 0, x, y);
                            }                            
                            break;
                        case "up":
                            if (map[y - 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 80) {
                                ghostCoin(0, 4, 0, -1, x, y);                                
                            } else if (map[y][x] === 83) {
                                ghostCoin(3, 4, 0, -1, x, y);
                            } else {
                                ghostCoin(2, 4, 0, -1, x, y);
                            }                            
                            break;
                        case "down":
                            if (map[y + 1][x] === 4) {
                                gameOver();
                            }
                            if (map[y][x] === 80) {
                                ghostCoin(0, 4, 0, 1, x, y);                                
                            } else if (map[y][x] === 83) {
                                ghostCoin(3, 4, 0, 1, x, y);
                            } else {
                                ghostCoin(2, 4, 0, 1, x, y);
                            }                            
                            break;
                    }
                    
                    break outerLoop;
                }
            }
        }
    };


    // Update the score whenever a coin is collected and end game if all coins are collected
    function updateScore(x) {
        score += x;
        if (!(score === 304)) {
            $("#currentScore").text(score);
            
        } else {
            $("#currentScore").text(score);
            endTimer();
            let elapsedTime = updateTimer();
            $("#winOrLose").text("You win!")
            $("#popupContainer").show();
            $("#popupScoreValue").text(score);
            $("#popupTimerValue").text(elapsedTime + "s");
            gameState = false;
        }
        
    }


    // Reset the gameboard when Play Again is pressed
    function resetGame() {
        
        // Reset the map
        map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 0, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 2, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 2, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    
        // Clear the container
        $(".container").empty();
    
        // Reset turns, score and ghosts
        numberTurns = 0;
        currentGhosts = 0;
        score = 0;
    
        // Reset timer
        started = false;
        startTime = null;
        $("#timeElapsed").text("0s");
    
        // Clear displayed game statistics
        $("#currentScore").text("0");

        // Update player position
        currentPosition = startingPosition;
    
        // Hide popup window
        $("#popupContainer").hide();

        // Generate new divs
        generateDivs();
        generateBorders();
        generateCoins();
        placePlayer();
        currentPosition = startingPosition;
    };


    $("#playButton").click(function() {
        resetGame();
    });
    $("#closeButton").click(function() {
        $("#popupContainer").hide();
    });


    // Generate game board
    generateDivs();
    generateBorders();
    generateCoins();
    placePlayer();


    // Setup keyboard controls
    $(document).keydown(function(e) {
        if (score < 304 && gameState === true || numberTurns === 0) {
            switch (e.keyCode) {
                case 37: // Left arrow key
                    e.preventDefault();
                    movePacman(-1, 0); // Move left
                    break;
                case 38: // Up arrow key
                    e.preventDefault();
                    movePacman(0, -1); // Move up
                    break;
                case 39: // Right arrow key
                    e.preventDefault();
                    movePacman(1, 0); // Move right
                    break;
                case 40: // Down arrow key
                    e.preventDefault();
                    movePacman(0, 1); // Move down
                    break;
            }
        }
        
    });
})