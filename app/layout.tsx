export const metadata = {
  title: 'OrderMade',
  description: 'Dynamic order management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
