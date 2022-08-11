import { Path } from '~/types'
import type { LoaderArgs } from '@remix-run/cloudflare'

export const loader = async ({
  request,
  context: { BASE_WORKER_URL, LIST }
}: LoaderArgs) => {
  if (request.headers.get('Upgrade') !== 'websocket')
    return new Response('Expected "Upgrade: websocket"', {
      status: 426
    })

  const id = LIST.idFromName('SOME_FAIRLY_UNIQUE_STRING')
  const stub = LIST.get(id)

  return stub.fetch(new URL(Path.MAIN, BASE_WORKER_URL))
}
