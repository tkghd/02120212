export const metadata = {
  title: 'TK Global Bank',
  description: '162京円 Imperial Finance System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
