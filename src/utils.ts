import fsp from 'fs/promises'
import { dirname } from 'upath'
import mkdirp from 'mkdirp'

export async function ensuredir (path: string) {
  await mkdirp(dirname(path))
}

export async function symlink (from: string, to: string, force: boolean = true) {
  await ensuredir(to)
  if (force) {
    await fsp.unlink(to).catch(() => { })
  }
  await fsp.symlink(from, to)
}

export function dumpObject (obj: Record<string, any>) {
  return '{ ' + Object.keys(obj).map(key => `${key}: ${JSON.stringify(obj[key])}`).join(', ') + ' }'
}