
// *************************************************************
// Draw radial
// This draws lines out from the center circle

function render(frequencyArray, ctx, centerX, centerY, radius, animal) {
	// Clear the canvas
	ctx.beginPath()
	ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
	ctx.fillRect(0, 0, 500, 500)
	ctx.fill()

    // // Draw the circle in the center
	// ctx.beginPath()
	// ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
	// ctx.stroke()

	// Divide the circle into steps equal to the number frequencies
	const bars = frequencyArray.length
	const step = Math.PI * 2 / bars

	// Loop over audio data
	frequencyArray.forEach((f, i) => {
		// calculate the length of the line
		const barLength = f / 360 * bars
		// calculate the starting x and y 
		const x1 = (Math.cos(step * i) * radius) + centerX
		const y1 = (Math.sin(step * i) * radius) + centerY
		// calculate the ending x and y
		const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
		const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

		ctx.beginPath()
		ctx.strokeStyle = `hsl(${598 / 1701 * i}, 100%, 50%)`
		// Move to the starting x and y
		ctx.moveTo(x1, y1)
		// draw a line to the end x and y
		ctx.lineTo(x2, y2)
		ctx.stroke()
	})

    // draws svg file
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 150, 150, 200, 200);
    }

	if (animal === "Bird") {
		img.src = "./bird.svg";
	} else if (animal === "Dog") {
		img.src = "./dog.svg";
	} else if (animal === "Hyena") {
		img.src = "./hyena.svg";
	} else if (animal === "Monke") {
		img.src = "./monke.svg";
	} else { 
		img.src = "./fox.svg";
	}
}

export default render