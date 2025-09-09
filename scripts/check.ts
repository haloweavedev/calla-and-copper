#!/usr/bin/env bun

import { spawn } from 'child_process'

console.log('🔍 Running TypeScript type check...\n')

const typecheck = spawn('npx', ['tsc', '--noEmit'], {
  cwd: process.cwd(),
  stdio: ['inherit', 'inherit', 'inherit'],
})

const result = await new Promise((resolve) => {
  typecheck.on('close', (code) => {
    resolve(code)
  })
})

if (result === 0) {
  console.log('\n✅ TypeScript check passed!')
} else {
  console.log('\n❌ TypeScript check failed!')
  process.exit(1)
}