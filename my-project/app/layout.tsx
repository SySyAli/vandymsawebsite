import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <link rel="shortcut icon" href="/MSA.png" />
      <head />
      <body>
        
        <Navbar/>
        <div>
        {children}
        </div>
        <Footer/>

      </body>
    </html>
  )
}
