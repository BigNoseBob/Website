// Oliver Rayner
// June 2022

// Main es6 package

import { main as cli } from './cli.js'
import { main as scroll_fade } from './scroll_fade.js'


window.onload = () => {
    cli()
    scroll_fade()
}