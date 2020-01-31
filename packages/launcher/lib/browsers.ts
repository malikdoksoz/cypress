import { log } from './log'
import * as cp from 'child_process'
import { Browser, FoundBrowser } from './types'

/** list of the browsers we can detect and use by default */
export const browsers: Browser[] = [
  {
    name: 'chrome',
    family: 'chromium',
    channel: 'stable',
    displayName: 'Chrome',
    versionRegex: /Google Chrome (\S+)/,
    profile: true,
    binary: ['google-chrome', 'chrome', 'google-chrome-stable'],
  },
  {
    name: 'chromium',
    family: 'chromium',
    // technically Chromium is always in development
    channel: 'stable',
    displayName: 'Chromium',
    versionRegex: /Chromium (\S+)/,
    profile: true,
    binary: ['chromium-browser', 'chromium'],
  },
  {
    name: 'chrome',
    family: 'chromium',
    channel: 'canary',
    displayName: 'Canary',
    versionRegex: /Google Chrome Canary (\S+)/,
    profile: true,
    binary: 'google-chrome-canary',
  },
  {
    name: 'edgeCanary',
    family: 'chrome',
    displayName: 'Edge Canary',
    versionRegex: /Microsoft Edge Canary (\S+)/,
    profile: true,
    binary: 'edge-canary',
  },
  {
    name: 'edge',
    family: 'chrome',
    displayName: 'Edge',
    versionRegex: /Microsoft Edge (\S+)/,
    profile: true,
    binary: 'edge',
  },
]

/** starts a found browser and opens URL if given one */
export function launch (
  browser: FoundBrowser,
  url: string,
  args: string[] = []
) {
  log('launching browser %o to open %s', browser, url)

  if (!browser.path) {
    throw new Error(`Browser ${browser.name} is missing path`)
  }

  if (url) {
    args = [url].concat(args)
  }

  log('spawning browser %o with args %s', browser, args.join(' '))

  return cp.spawn(browser.path, args, { stdio: 'ignore' })
}
