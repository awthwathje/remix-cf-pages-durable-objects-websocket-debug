import { useEffect, useRef, useState } from 'react'
import { Action } from '~/types'
import type { WindowWithEnv } from '~/types/client'

export default function Index(): JSX.Element {
  const socket = useRef<WebSocket | null>(null)
  const [list, setList] = useState([])

  useEffect(() => {
    if (socket.current === null) {
      const url = new URL((window as WindowWithEnv).ENV.WEBSOCKET_URL)

      socket.current = new WebSocket(url)

      socket.current.addEventListener('open', () => {
        console.log('WEBSOCKET OPENED', socket.current)

        socket.current?.send(
          JSON.stringify({
            action: Action.LIST
          })
        )
      })

      socket.current.addEventListener('message', ({ data }: MessageEvent) => {
        console.log('WEBSOCKET MESSAGE', socket.current)

        const { action, payload } = JSON.parse(data)

        if (action === Action.LIST) setList(payload)
      })

      socket.current.addEventListener('close', () => {
        console.log('WEBSOCKET CLOSED', socket.current)
      })

      socket.current.addEventListener('error', () => {
        console.log('WEBSOCKET ERRORED', socket.current)
      })
    }

    return function cleanup() {
      console.log('WEBSOCKET CLEANUP', socket.current)

      socket.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <h1>Items received from the Durable Object:</h1>

      {list.length > 0 && (
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </main>
  )
}
