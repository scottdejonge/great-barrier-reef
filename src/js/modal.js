/**
 * Requires
 */

import $ from 'jquery'


/**
 * Variables
 */

const $modal = $('[ data-modal]');
const $close = $('[ data-modal-close]');


/**
 * Initialisation
 */

export function initialise() {

	$close.on('click touchstart', function(event) {
		event.preventDefault();

		$modal.addClass('hide');
	})
}