var eventStream = require( 'event-stream' ),
	chunkStream = require( 'flow-chunkify' ),
	mStream = require( './../lib' );

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