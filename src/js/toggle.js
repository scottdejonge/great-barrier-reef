/**
 * Requires
 */

import $ from 'jquery'


/**
 * Variables
 */

const $body = $('body');
const $toggle = $('[data-toggle]');


/**
 * Initialisation
 */

export function initialise() {

	$toggle.on('click touchstart', function(event) {
		event.preventDefault();

		$body.toggleClass('toggle-open');
	})
}