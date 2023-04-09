/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './lib/',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  testPathIgnorePatterns: ['./lib/__tests__/data/'],
  maxWorkers: 1,
  globals: {
    '*.ts': ['ts-jest', { isolatedModules: false }],
  },
}

export default config
