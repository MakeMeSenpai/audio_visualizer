// Notes 
// https://www.kkhaydarov.com/audio-visualizer/
// https://medium.com/@duraraxbaccano/computer-art-visualize-your-music-in-javascript-with-your-browser-part-2-fa1a3b73fdc6


// Import a renderer 
import Animal from './animal.js'
import circleRenderer from './radialRayMonoRenderer.js'
import circleGridRenderer from './renderCircleGrid.js'
import circleCenterRenderer from './renderCircleCenter.js'
import verticalBarsRenderer from './verticalBarRenderer.js'
import verticalBarsMonoRenderer from './verticalBarsMonoRenderer.js'
import radialRayRenderer from './radialRayRenderer.js'


// --------------------------------------------------------
// Canvas

// Get reference to the canvas context for use by the 
// renderers below
const background = document.getElementById('background')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


// ----------------------------------------------------------
// Buttons 
const select = document.getElementById('select')
const customSound = document.getElementById('custom-sound')
const clearFile = document.getElementById('clear-file')
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

clearFile.addEventListener('click', (e) => {
	customSound.value = null
})

playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})


// --------------------------------------------------------
// Audio setup

// Defime some variables 
let analyser
let frequencyArray
let audio

// Starts playing the audio
function startAudio() {
	// make a new Audio Object
	audio = new Audio()
	// Get a context 
	const audioContext = new(window.AudioContext || window.webkitAudioContext)()

	// Define a source sound file
	let animal = ""
	console.log()

	if (customSound.value === "") {
		animal = select.value;
		if (animal === "Bird") {
			audio.src = './bird.wav'
		} else if (animal === "Dog") {
			audio.src = './dog.wav'
		} else if (animal === "Hyena") {
			audio.src = './hyena.wav'
		} else if (animal === "Monke") {
			audio.src = './monke.wav'
		} else {
			audio.src = './fox.wav'
		}
	} else {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(customSound.files[0]);
		fileReader.onload = function(e) {
			audio.src = e.target.result
			console.log(("Filename: '" + customSound.files[0].name + "'"), ( "(" + ((Math.floor(customSound.files[0].size/1024/1024*100))/100) + " MB)" ));
		}
	}

	// Make a new analyser
	analyser = audioContext.createAnalyser()
	// Connect the analyser and the audio
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	analyser.connect(audioContext.destination)

	// Get an array of audio data from the analyser
	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	// console.log(frequencyArray.length)

	// Start playing the audio
	audio.play()

	requestAnimationFrame(render)
}

// This function renders the audio to the canvas using a renderer
function render() {
	const centerX = 495 / 2
	const centerY = 500 / 2
	const radius = 500 / 5
	analyser.getByteFrequencyData(frequencyArray)

	let animal = select.value
	if (animal === "Bird") {
		background.style.backgroundImage = "url('https://images8.alphacoders.com/461/461755.jpg')"
	} else if (animal === "Dog") {
		background.style.backgroundImage = "url('https://image.freepik.com/free-photo/pomeranian-dog-with-yellow-background_63176-591.jpg')"
	} else if (animal === "Hyena") {
		background.style.backgroundImage = "url('https://www.fieldmuseum.org/sites/default/files/styles/3x2_1400w/public/jwarchall/2018/05/21/gn92214_007ad-photoarchives_webexport_0.jpg?itok=7h9on2zB')"
	} else if (animal === "Monke") {
		background.style.backgroundImage = "url('https://www.wallpapertip.com/wmimgs/177-1771723_monkey-background-hd-wallpapers-background-images-hd-animals.jpg')"
	} else {
		background.style.backgroundImage = "url('https://eskipaper.com/images/fox-wallpaper-15.jpg')"
	}
	background.style.backgroundSize = "cover"

	Animal(frequencyArray, ctx, centerX, centerY, radius, animal)

	// Use one of the renderers below 
	// radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius)
	// verticalBarsMonoRenderer(frequencyArray, ctx, 12, 300, 300)
	// verticalBarsRenderer(frequencyArray, ctx, 300, 300)
	// circleCenterRenderer(frequencyArray, ctx, centerX, centerY)
	// circleGridRenderer(frequencyArray, ctx, 300, 300)
	// circleRenderer(frequencyArray, ctx, centerX, centerY, radius)

	// Set up the next animation frame
	requestAnimationFrame(render)
}