// Oliver Rayner
// November 2022

// Running matlab through nodejs

const child_process = require('child_process')

function main() {

    console.log(process.env)
    matlab = child_process.exec('matlab', { shell: '/bin/zsh' })
    
    matlab.stdout.on('data', data => console.log(data))
    matlab.stderr.on('data', data => console.error(data))
    matlab.on('exit', exit_code => console.log(exit_code))

}

if (require.main == module) {
    main()
}