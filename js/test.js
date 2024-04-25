function ghostCoin (coinType, ghostNumber, dx, dy, x, y) {
    let newX = x + dx;
    let newY = y + dy;
    map[y][x] = coinType;

    $("#ghost" + ghostNumber).remove();
    console.log("removed");
    if (map[y + dy][x + dx] === 0) {
        map[y + dy][x + dy] = (4 + ghostNumber) * 10;
        $("#fill" + ((x + dx) + (y + dy) * 28 + 1)).append("<div class='ghost' id='" + ghost + "'></div>");
    } else if (map[y + dy][x + dx] === 3) {
        map[y + dy][x + dx] = (4 + ghostNumber) * 10 + 3;
        $("#fill" + ((x + dx) + (y + dy) * 28 + 1)).append("<div class='ghost' id='" + ghost + "'></div>");
    } else {
        map[y + dy][x + dx] = 4 + ghostNumber;
        $("#fill" + ((x + dx) + (y + dy) * 28 + 1)).append("<div class='ghost' id='" + ghost + "'></div>");
    }  
};