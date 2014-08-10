flow-cmean
==========




## Installation

``` bash
$ npm install flow-cmean
```

## API

To create a stream factory,

``` javascript
var meanStream = require( 'flow-cmean' );

// Create a new factory:
var mStream = meanStream();
```

### mStream.stream()

To create a new mean stream,

``` javascript
var stream = mStream.stream();
```


## Usage

Methods are chainable.

``` javascript
meanStream()
	.stream()
	.pipe( /* writable stream */ );
```



## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	chunkStream = require( 'flow-chunkify' ),
	mStream = require( 'flow-cmean' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new chunkify stream (chunk the data into groups of 100; i.e., 10 chunks):
var cStream = chunkStream()
	.numValues( 100 )
	.stream();

// Create a new mean stream:
var stream = mStream().stream();

// Pipe the data:
readStream
	.pipe( cStream )
	.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ){
		clbk( null, JSON.stringify( d )+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have globally installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

