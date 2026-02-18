let fareArr = [];
let minFare, maxFare, medFare, Q1, Q3;
let lowerWhisker, upperWhisker;

function preload() {
    table = loadTable("../titanic.csv", "csv", "header");
}

function getMedian(arr) {
    let x = arr.length;
    if (x % 2 === 0) {
        return (arr[x/2 - 1] + arr[x/2]) / 2;
    } else {
        return arr[Math.floor(x/2)];
    }
}

function setup() {
    createCanvas(1000, 600);
    noLoop();

    // puts all fares into an array
    for (let r = 0; r < table.getRowCount(); r++) {
        let rawValue = table.getString(r, "Fare");
        let fare = Number(rawValue);

        if (!isNaN(fare) && fare >= 0) {
            fareArr.push(fare);
        }
    }

    fareArr.sort((a, b) => a - b);
    console.log("fare arr:", fareArr);

    minFare = fareArr[0];
    maxFare = fareArr[fareArr.length - 1];
    medFare = getMedian(fareArr);
    let lowerHalf = fareArr.slice(0, Math.floor(fareArr.length/2));
    let upperHalf = fareArr.slice(Math.ceil(fareArr.length/2));

    Q1 = getMedian(lowerHalf);
    Q3 = getMedian(upperHalf);

    // calculate whiskers
    let IQR = Q3 - Q1;
    lowerWhisker = Math.max(minFare, Q1 - 1.5 * IQR);
    upperWhisker = Math.min(maxFare, Q3 + 1.5 * IQR);

    console.log('Min:', minFare);
    console.log('Q1:', Q1);
    console.log('Median:', medFare);
    console.log('Q3:', Q3);
    console.log('Max:', maxFare);
    console.log('Lower Whisker:', lowerWhisker);
    console.log('Upper Whisker:', upperWhisker);
}

function draw() {
    background(255);

    let marginLeft = 70;
    let marginBottom = 70;
    let marginTop = 70;

    // y axis
    stroke(0);
    line(marginLeft, marginTop, marginLeft, height - marginBottom);

    // y-axis ticks
    textSize(12);
    textAlign(RIGHT, CENTER);
    for (let yVal = 0; yVal <= 70; yVal += 10) {
        let y = map(yVal, 0, 70, height - marginBottom, marginTop);

        stroke(0);
        line(marginLeft - 6, y, marginLeft, y);

        noStroke();
        text(yVal, marginLeft - 10, y);
    }

    // y-axis label
    push();
    textSize(18);
    translate(30, height / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text("Fare ($)", 0, 0);
    pop();

    // title
    textSize(30);
    textAlign(CENTER);
    text("Box Plot of Fare", width / 2, 30);

    // scales data with graph
    let maxY = map(upperWhisker, 0, 70, height - marginBottom, marginTop);
    let q3Y = map(Q3, 0, 70, height - marginBottom, marginTop);
    let medY = map(medFare, 0, 70, height - marginBottom, marginTop);
    let q1Y = map(Q1, 0, 70, height - marginBottom, marginTop);
    let minY = map(lowerWhisker, 0, 70, height - marginBottom, marginTop);
    let boxX = (width / 2) - 200;
    let boxWidth = 400;

    // box
    fill(0, 220, 0);
    stroke(0);
    rect(boxX, q3Y, boxWidth, q1Y - q3Y);

    // median
    strokeWeight(2.5);
    line(boxX, medY, boxX + boxWidth, medY);

    // whiskers
    strokeWeight(1.5);
    line(boxX + boxWidth / 2, minY, boxX + boxWidth / 2, q1Y);
    line(boxX + boxWidth / 2, q3Y, boxX + boxWidth / 2, maxY);
    line(boxX, minY, boxX + boxWidth, minY);
    line(boxX, maxY, boxX + boxWidth, maxY);
}
