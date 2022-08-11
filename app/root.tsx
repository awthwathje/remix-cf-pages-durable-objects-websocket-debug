import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import { json } from '@remix-run/cloudflare'
import type { LoaderArgs, MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Debugging Durable Object WebSocket in Remix',
  viewport: 'width=device-width,initial-scale=1'
})

export const loader = ({ context: { WEBSOCKET_URL } }: LoaderArgs) => {
  return json({
    ENV: {
      WEBSOCKET_URL
    }
  })
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`
          }}
        />

        <LiveReload />
      </body>
    </html>
  )
}
