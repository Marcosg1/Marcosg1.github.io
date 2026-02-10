let table;
let survivalCounts = {
    0: 0, // died
    1: 0  // survived
};

function preload() {
    table = loadTable('../titanic.csv', 'csv', 'header');
}

function setup() {
    createCanvas(600, 600);
    textSize(20);
    fill(0);

    // counts survivors and non-survivors
    for (let r = 0; r < table.getRowCount(); r++) {
        let survived = table.getNum(r, "Survived");
        survivalCounts[survived]++;
    }
}

function draw() {
    background(240);
    text("P5 Graph", width / 2, 20);

    let Xcategories = ["Died", "Survived"];
    let maxCount = max(Object.values(survivalCounts));
    let barWidth = width / Xcategories.length;

    for (let i = 0; i < Xcategories.length; i++) {
        let passengerCount = survivalCounts[i];
        let barHeight = map(passengerCount, 0, maxCount, 0, height - 100);

        let x = i * barWidth + 50;
        let y = height - barHeight - 30;

        fill(90, 130, 180);
        rect(x, y, barWidth - 100, barHeight);

        // labeling X-axis with count above bars
        fill(0);
        textAlign(CENTER, CENTER);
        text(Xcategories[i], x + (barWidth - 100) / 2, height - 15);
        text(passengerCount, x + (barWidth - 100) / 2, y - 15);

        // Y-axis label
        textAlign(CENTER, CENTER);
        push(); // saves current drawing state
        rotate(-HALF_PI);
        text("Number of Passengers", -height / 2, 20);
        pop(); // restores original drawing state
    }
}
