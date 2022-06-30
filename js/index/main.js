// Oliver Rayner
// June 2022

// Main es6 package

import { main as cli } from './cli.js'
import { main as scroll_fade } from './scroll_fade.js'
import { main as auto_type } from './auto_type.js'
import { main as transition_fade } from './transition_fade.js'
import { main as navbar } from './navbar.js'


window.onload = () => {
    cli()
    scroll_fade()
    auto_type()
    // transition_fade()
    navbar()
}