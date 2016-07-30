require('./css/main.css');

/*
 * Requires
 */

import 'babel-polyfill'
import $ from 'jquery'


/*
 * Modules
 */

import * as Toggle from './js/toggle';
import * as ReefMap from './js/map';


/*
 * Initialisation
 */

Toggle.initialise();
ReefMap.initialise();