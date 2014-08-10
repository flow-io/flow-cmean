/**
*
*	STREAM: cmean (chunk mean)
*
*
*	DESCRIPTION:
*		- Transform stream factory to calculate arithmetic means for streamed data arrays (chunks).
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/08/09: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through2
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through module:
		through2 = require( 'through2' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData( data, encoding, clbk )
	*	Data event handler. Calculates the mean.
	*
	* @private
	* @param {Array} data - streamed data array
	* @param {String} encoding
	* @param {Function} clbk - callback to invoke after handling streamed data. Function accepts two arguments: [ error, chunk ].
	*/
	function onData( data, encoding, clbk ) {
		var numData = data.length,
			sum = 0;

		for ( var i = 0; i < numData; i++ ) {
			sum += data[ i ];
		}
		clbk( null, sum/numData );
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: stream()
	*	Returns a through stream for calculating the mean of streamed data arrays (chunks).
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2( {'objectMode': true}, onData );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();