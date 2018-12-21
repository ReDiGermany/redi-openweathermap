'use strict'
const request = require('request')
const events = require('events')
let eventEmitter = new events.EventEmitter()
module.exports = function(config){
	let owm = {
		config: {
			base: 'https://api.openweathermap.org/data/2.5',
			id: false,
			APPID: false,
			units: 'metric',
			lang: 'de',
			timer: 10*1000,
			forecastlen: 5,
		},
		timer: {
			weather: false,
			forecast: false
		},
		dtsave: {
			weather: false,
			forecast: false
		},
		save: {
			weather: false,
			forecast: false
		},
		func: {
			objectify: function(inp){
				return {
					main: inp.weather[0].main,
					description: inp.weather[0].description,
					icon: inp.weather[0].icon,
					temp: {
						current: inp.main.temp,
						min: inp.main.temp_min,
						max: inp.main.temp_max
					},
					wind: inp.wind.speed,
					time: inp.dt
				}
			},
			api: function(p,c){
				let url = owm.config.base+p+'?'+['id='+owm.config.id,'APPID='+owm.config.APPID,'units='+owm.config.units,'lang='+owm.config.lang].join('&');
				request(url,function(err,resp,data){
					try{
						data = JSON.parse(data)
						if(data.cod==200) c(data)
					}catch(e){
						console.log(e)
					}
				})
			},
			weather: function(){
				owm.func.api('/weather',function(data){
					if(owm.dtsave.weather != data.dt){
						owm.dtsave.weather = data.dt
						owm.save.weather = owm.func.objectify(data)
						eventEmitter.emit('weather',owm.save.weather)
					}
				})
			},
			forecast: function(){
				owm.func.api('/forecast',function(data){
					if(data.hasOwnProperty('list') && data.list.length){
						let checkid = [];
						let items = [];
						let l = data.list.length;
						if(owm.config.forecastlen<l) l = owm.config.forecastlen
						for( let i=0; i < l; i++ ){
							checkid.push(data.list[i].dt)
							items.push(owm.func.objectify(data.list[i]))
						}
						if(owm.dtsave.forecast != checkid.join(';')){
							owm.dtsave.forecast = checkid.join(';')
							owm.save.forecast = items
							eventEmitter.emit('forecast',owm.save.forecast)
						}
					}
				})
			}
		},
		weather: function(c){
			if(owm.save.weather!==false) c(owm.save.weather)
			eventEmitter.on('weather',c)
			if(owm.timer.weather===false){
				owm.func.weather()
				owm.timer.weather = setInterval(owm.func.weather,owm.config.timer)
			}
		},
		forecast: function(c){
			if(owm.save.forecast!==false) c(owm.save.forecast)
			eventEmitter.on('forecast',c)
			if(owm.timer.forecast===false){
				owm.func.forecast()
				owm.timer.forecast = setInterval(owm.func.forecast,owm.config.timer)
			}
		}
	}
	for( let k in config ){
		if(owm.config.hasOwnProperty(k)) owm.config[k] = config[k]
	}
	if(owm.config.id===false || owm.config.APPID===false) console.log('[REDI:OPENWEATHERMAP]','Wrong config!');
	else return owm
}
