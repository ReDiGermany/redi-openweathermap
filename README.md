# Open Weather Map
###### the simple way to stay informed with your weather
Install via NPM:
```npm
npm i redi-openweathermap --save
```
###### requires an API key of [OpenWeatherMap.org](https://openweathermap.org/) and the citycode
Only tested on Raspberry Pi Zero W on NodeJS Version `v10.14.2`
---
## API
###### Configuration
name|type|default|description|info|required
--- | --- | --- | --- | --- | ---
id|int|false|city code|find it [here](https://openweathermap.org/find), eg https://openweathermap.org/city/`2803460`|x
APPID|string|false|OpenWeatherMap API Code|get it [here](https://openweathermap.org/)|x
base|string|https://api.openweathermap.org/data/2.5 |base url||,
units|string|metric|response unit|metric,imperial|
lang|string|de|response language|ar, bg, ca, cz, de, el, en, fa, fi, fr, gl, hr, hu, it, ja, kr, la, lt, mk, nl, pl, pt, ro, ru, se, sk, sl, es, tr, ua, vi, zh_cn, zh_tw|,
timer|int|10*1000|check interval||,
forecastlen|int|5|number of elements in your forecast|limit is 38|,
###### Events
name|description|response
--- | --- | ---
weather|returns current weather|{ main: '', description: '', icon: '', temp: { current: x, min: x, max: x }, wind: x, time: UNIX_TIMESTAMP }
forecast|returns the forecast list|[{ main: '', description: '', icon: '', temp: { current: x, min: x, max: x }, wind: x, time: UNIX_TIMESTAMP },{....}]
---
Full example as in [`example.js`](https://github.com/ReDiGermany/redi-openweathermap/blob/master/example.js)
```javascript
const owm = require('redi-openweathermap')({
	id: false,
	APPID: false,
	// base: 'https://api.openweathermap.org/data/2.5',
	// units: 'metric',
	// lang: 'de',
	// timer: 10*1000,
	// forecastlen: 5,
})
owm.weather( data => { console.log('weather',data) })
owm.forecast( data => { console.log('forecast',data) })

```
