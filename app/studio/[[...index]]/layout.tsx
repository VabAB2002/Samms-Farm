export const metadata = {
  title: 'Samms Studio',
  description: 'Sanity Studio for Samms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
