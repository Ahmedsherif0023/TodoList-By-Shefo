// filepath: c:\Users\hp\Desktop\Coding\todolist\src\app\layout.js
export const metadata = {
  title: 'To do app',
  description: 'Developed by SHEFO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}