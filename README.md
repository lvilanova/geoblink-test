# Geoblink test

> geoblink test

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

This is a proyect with VUE framework. We server a json file witch contains a list of all the states from USA. 
We make a fake connection from port 3030 in this case to server the file.
See server.js file

We have a dropdown with an autocomplete. We can select any state and a tag is created. The state wich has been selected is removed from the list also, if we delete the tag, the state is added again to the dropdown list.

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
