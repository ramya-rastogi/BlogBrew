function convert() {
    const number = document.getElementById("numberInput").value;
    if (number === "") {
        alert("Please enter a number.");
        return;
    }

    // Convert to IEEE 754 using JavaScript
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);
    view.setFloat32(0, parseFloat(number), false); // Big-endian format

    let binary = "";
    for (let i = 0; i < 4; i++) {
        binary += view.getUint8(i).toString(2).padStart(8, "0");
    }

    document.getElementById("result").innerText = "IEEE 754 (Single Precision): " + binary;
}