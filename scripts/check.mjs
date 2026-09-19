import { execFileSync } from 'node:child_process'
execFileSync('node',['--check','scripts/build.mjs'],{stdio:'inherit'})
execFileSync('tsc',['-p','tsconfig.json','--noEmit'],{stdio:'inherit'})
console.log('Source and build scripts validated.')
