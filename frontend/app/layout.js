import { Toaster } from "react-hot-toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000
          }}
        />

        {children}

      </body>
    </html>
  )
}