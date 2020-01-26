/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
require('colors')

const { exec, spawn } = require('child_process')

// const { log } = console
const reset = spawn('prisma', ['reset', 'y'])

// reset.stdout.on('data', (data) => {
//   log(`stdout:`.yellow, data)
// })

reset.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`)
})

reset.on('error', (error) => {
  console.log(`error: ${error.message}`)
})

reset.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})

exec('ls,', reset)
// exec('prisma reset', (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error}`)
//     return
//   }
//   if (stderr) {
//     console.log(`stderr: ${stderr}`)
//     return
//   }
//   console.log(`stdout: ${stdout}`)
// })
