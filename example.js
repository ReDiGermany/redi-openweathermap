const owm = require('./index.js')({
	id: false,
	APPID: false,
	// base: 'https://api.openweathermap.org/data/2.5',
	// units: 'metric',
	// lang: 'de',
	// timer: 10*1000,
	// forecastlen: 5,
})
// const owm = require('redi-openweathermap')({
	// id: false,
	// APPID: false,
	// base: 'https://api.openweathermap.org/data/2.5',
	// units: 'metric',
	// lang: 'de',
	// timer: 10*1000,
	// forecastlen: 5,
// })
owm.weather( data => { console.log('weather',data) })
owm.forecast( data => { console.log('forecast',data) })
