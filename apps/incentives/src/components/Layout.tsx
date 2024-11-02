import classNames from 'classnames'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
  hideNavbar?: boolean
  className?: string
}

export const Layout = (props: LayoutProps) => {
  const { children, hideNavbar, className } = props

  return (
    <div className='min-h-screen flex flex-col gap-14 overflow-x-hidden'>
      <Head>
        <title>Builders</title>
      </Head>

      {!hideNavbar && <Navbar className='max-w-7xl mx-auto' />}

      <main
        className={classNames(
          'w-full max-w-7xl relative flex flex-col items-center mx-auto pb-40 px-6',
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
