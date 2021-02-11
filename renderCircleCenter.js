// -------------------------------------------------
// Draw circle from center

/**
 * 
 * @param {UINT8 0Array} frequencyArray 
 * @param {canvas context} ctx 
 * @param {number} centerX 
 * @param {number} centerY 
 */

function render(frequencyArray, ctx, centerX, centerY) {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
	ctx.fillRect(0, 0, 500, 500)
	ctx.fill()

	const bars = frequencyArray.length 
	const colorStep = 360 / bars 
	const pi2 = Math.PI * 2

	// Draw circles centered in canvas
	frequencyArray.forEach((f, i) => {
		// scale f to 0 - 300
		const radius = f / 425 * 500
		// Begin a new path
		ctx.beginPath()
		// Draw a circle of radius
		ctx.arc(centerX, centerY, radius, 0, pi2)
		// set stroke color 
		ctx.strokeStyle = `hsla(${colorStep * i}, 100%, 50%, 0.1)`
		// stroke path
		ctx.stroke()
	})
}

export default render