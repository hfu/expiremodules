# expiremodules
## background
a tool to create the list of expired modules from the contents of expiretiles by imposm3

You need to have ./expiretiles to create the list.

## install
```shell
$ git clone git@github.com:hfu/expiremodules
$ cd expiremodules
$ npm install
```

## usage
```shell
$ # get ./expiretiles
```

To make the list of all from expiretiles:
```shell
$ node index.js
```

To make the list of modules expired after a certain day, in the following example 20181201:
```shell
$ node index.js 20181201
```

