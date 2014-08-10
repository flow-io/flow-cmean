
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Chunkify streamed data values:
	chunkStream =  require( 'flow-chunkify' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	meanStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-cmean', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( meanStream ).to.be.a( 'function' );
	});

	it( 'should chunk streamed data values', function test( done ) {
		var data, expected, cStream, mStream, NUMVALUES = 2;

		// Simulate some data...
		data = [ 2, 3, 1.5, 2, 10, 15, 100, 102 ];

		// Expected values:
		expected = [ 2.5, 1.75, 12.5, 101 ];

		// Create a new chunkify stream:
		cStream = chunkStream()
			.numValues( NUMVALUES )
			.stream();

		// Create a new mean stream:
		mStream = meanStream().stream();

		// Create the chunkified pipeline:
		cStream.pipe( mStream );

		// Mock reading from the stream:
		utils.readStream( mStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, cStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}

			done();
		} // end FUNCTION onRead()
	});

});