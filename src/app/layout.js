// filepath: c:\Users\hp\Desktop\Coding\todolist\src\app\layout.js
export const metadata = {
  title: 'Focus Flow',
  description: 'Developed by SHEFO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon2.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}