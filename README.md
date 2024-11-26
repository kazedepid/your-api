## YOUR-API

</div>

<p align="center">
<a href="##"><img title="your-api" src="https://img.shields.io/static/v1?label=package&message=your-api&color=red"></a>
</p>

<p align="center">
<a href="#"><img title="mengapi" src="https://img.shields.io/static/v1?label=FREE&message=your-api&color=pink"></a>
</p>

## ```INSTALL And UNINSTALL```
> npm install your-api
>  
> npm uninstall your-api


## AI MENU

### ```BLACKBOX```
``` 
const your = require('your-api')

your.ai.blackbox('halo')
    .then(result => {
     console.log(result)
})
```


## DOWNLOAD MENU

### ```COBALT```(error)
``` 
const your = require('your-api')

your.downloaders.cobalt({
 url: "https://www.tiktok.com/@gawrgura/video/7213728634132073734",
 tiktokH265: true,
 tiktokFullAudio: true
}).then(result => {
     console.log(result)
})
```


## RELIGION MENU

### ```Alkitab```
``` 
const your = require('your-api')

your.religion.alkitab.fetchChapters('tb', 'mat', 4, 4).then(result => {
     console.log(result)
})
```


## SEARCHING MENU

### ```tvOne Search```
``` 
const your = require('your-api')

your.search.tvOneSearch('indonesia').then(result => {
     console.log(result)
})
```

### ```tvOne Latest```
``` 
const your = require('your-api')

your.search.tvOneLatest().then(result => {
     console.log(result)
})
```

### ```Random Cerpen```
``` 
const your = require('your-api')

your.search.randomCerpen().then(result => {
     console.log(result)
})
```


## TOOLS MENU

### ```TTP```
``` 
const your = require('your-api')

your.tools.ttp('hello world')
    .then(result => {
     console.log(result)
})
```

### ```ShortUrl```
``` 
const your = require('your-api')

your.tools.shortenUrl('https://github.com/kazedepid')
    .then(result => {
     console.log(result)
})
```