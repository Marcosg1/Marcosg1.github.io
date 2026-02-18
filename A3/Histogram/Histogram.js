let ages = [];
let ageArr = [];
let bins = [];
let numBins = 20;
let maxCount = 0;
let roundedMax = 0;

function preload() {
    table = loadTable("../titanic.csv", "csv", "header");
}
function setup() {
    createCanvas(1000, 600);
    noLoop();

    // rounds and gets ages into an array
    for (let r = 0; r < table.getRowCount(); r++) {
        let rawValue = table.getString(r, "Age");
        let age = Number(rawValue);

        if (!isNaN(age) && age > 0) {
            ageArr.push(Math.ceil(age));
        }
    }

    console.log("ages arr:", ageArr);

    let minAge = min(ageArr);
    let maxAge = max(ageArr);

    let binWidth = (maxAge - minAge) / numBins;

    // initializing bins
    for (let i = 0; i < numBins; i++) {
        bins[i] = 0;
    }

    // filling data in bins
    for (let age of ageArr) {
        let index = floor((age - minAge) / binWidth);

        if (index >= numBins) {
            index = numBins - 1;
        }

        bins[index]++;
        console.log(age, " goes into bin:", index);
    }

    maxBinCount = max(bins);
    roundedMax = ceil(maxBinCount / 20) * 20;

    console.log("Max bin count:", maxBinCount);
    console.log("Rounded max:", roundedMax);
}

function draw() {
    background(255);

    let marginLeft = 70;
    let marginBottom = 70;
    let marginTop = 70;
    let marginRight = 70;

    let graphWidth = width - marginLeft - marginRight;
    let graphHeight = height - marginTop - marginBottom;

    // x-axis grid
    stroke(200);
    for (let yVal = 0; yVal <= roundedMax; yVal += 20) {
        let y = height - marginBottom - (yVal / roundedMax) * graphHeight;
        line(marginLeft, y, width - marginRight, y);
    }
    // y-axis grid
    for (let xVal = 0; xVal <= 80; xVal += 10) {
        let x = marginLeft + (xVal / 80) * graphWidth;
        line(x, marginTop, x, height - marginBottom);
    }

    // x,y axis lines
    stroke(0);
    line(marginLeft, height - marginBottom, width - marginRight, height - marginBottom);
    line(marginLeft, marginTop, marginLeft, height - marginBottom);

    // creating bars
    let barWidth = graphWidth / numBins;
    fill(0, 180, 180, 200);
    for (let i = 0; i < bins.length; i++) {
        let count = bins[i];
        let barHeight = (count / roundedMax) * graphHeight;
        let x = marginLeft + i * barWidth;
        let y = height - marginBottom - barHeight;

        rect(x, y, barWidth, barHeight);
    }

    // title
    noStroke();
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text("Distribution of Passenger Ages", width / 2, 50);

    // axis labels
    textSize(20);
    text("Age (Years)", width / 2, height - 20);
    push();
    translate(30, height / 2);
    rotate(-HALF_PI);
    text("Number of Passengers", 0, 0);
    pop();

    // y-axis ticks
    textSize(12);
    for (let yVal = 0; yVal <= roundedMax; yVal += 20) {
        let y = height - marginBottom - (yVal / roundedMax) * graphHeight;

        stroke(0);
        line(marginLeft - 6, y, marginLeft, y);

        noStroke();
        textAlign(RIGHT, CENTER);
        text(yVal, marginLeft - 10, y);
    }

    // x-axis ticks
    for (let xVal = 0; xVal <= 80; xVal += 10) {
        let x = marginLeft + (xVal / 80) * graphWidth;

        stroke(0);
        line(x, height - marginBottom, x, height - marginBottom + 6);

        noStroke();
        textAlign(CENTER, TOP);
        text(xVal, x, height - marginBottom + 10);
    }
}
