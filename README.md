<p align="center">
<h1 align="center">mmap.it</h1> 
</p>

<p align="center">
<i>A personal knowledge base to seamlessly store and retrieve information.<br/>Try out mobb.tv at <a href="https://www.mmap.it">www.mmap.it</a>.</i>
<br/>
  <img src="https://user-images.githubusercontent.com/8173045/78063441-35812e80-735e-11ea-94ec-8f02fcaf941c.png" alt="mmap.it" width="800" />
</p>

This is the source code that runs [**mmap.it**](https://mmap.it) and all the associated services. 


## Installation

mmap.it requires the following dependencies:

- Node.js >= 12
- yarn



### Development

In development you can quickly get started by following these steps:

1. Clone this repo
2. `yarn`
3. `yarn start-dev`

To transpile the mixpanel client

```
cd ~/dev/mixpanel

./node_modules/.bin/babel lib -d ./lib/

cp ./lib/* ~/mmap/mmap.it/node_modules/mixpanel/lib/
```

```./node_modules/.bin/babel src -d node_modules/mixpanel/lib```



### Production

For a production release you will have to take these steps:

1. Bump version in `package.json`
2. x



## Releasing
```bash
yarn dist
```



## Contributing

mmap.it is built and maintained by a small team - we'd love your help fixing bugs and adding features!



## License

mmap.it is **license pending**

