import { SocialIcon, SocialIconProps } from '@shared/ui'
import { LINKS } from '@shared/utilities'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface FooterProps {
  className?: string
}

export const Footer = (props: FooterProps) => {
  const { className } = props

  return (
    <footer className={classNames('flex flex-col mt-auto pb-24 z-20 md:pb-12', className)}>
      <FooterWave />
      <div className='w-full flex flex-col gap-12 items-center justify-between px-16 bg-pt-purple-700 md:flex-row'>
        <div className='flex flex-col gap-12 px-4 md:flex-row md:px-0'>
          <AuditsBy />
        </div>
        <div className='flex flex-col gap-12 items-center order-first md:flex-row md:gap-6 md:items-end md:order-none'>
          <SocialIcons />
        </div>
      </div>
      <div className='flex flex-col items-center text-center mx-auto mt-20 text-sm text-pt-purple-100'>
        <Link href='/terms' className='hover:underline'>
          Terms and Conditions
        </Link>
        <Link href='/privacy' className='hover:underline'>
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

const FooterWave = () => {
  const router = useRouter()

  return (
    <div
      className={classNames('w-full flex flex-col bg-pt-purple-600 isolate pointer-events-none', {
        'bg-pt-purple-700': router.pathname !== '/'
      })}
    >
      <Image
        src='/footerWave.svg'
        alt='Footer Wave'
        width={1440}
        height={260}
        priority={true}
        className='w-full drop-shadow-[0_-10px_10px_#8050E3] md:drop-shadow-[0_-20px_20px_#8050E3]'
      />
      <span className='w-full h-24 -mt-[1px] bg-pt-purple-700 z-10' />
    </div>
  )
}


const AuditsBy = () => {
  return (
    <div className='flex flex-col gap-3'>
      <span className='text-center text-pt-purple-300 md:text-start'>Audits by</span>
      <div className='flex flex-col gap-6 items-center opacity-50 md:flex-row'>
        <Link href={LINKS.audits} target='_blank'>
          <Image src='/c4Logo.svg' alt='Code Arena' width={257} height={46} />
        </Link>
        <Link href={LINKS.audits} target='_blank'>
          <Image src='/macroLogo.svg' alt='Macro' width={191} height={40} />
        </Link>
      </div>
    </div>
  )
}

const SocialIcons = () => {
  return (
    <div className='flex gap-4 items-center order-last md:order-none'>
      <SimpleSocialIcon platform='twitter' href={LINKS.twitter} />
      <SimpleSocialIcon platform='discord' href={LINKS.discord} />
    </div>
  )
}

interface SimpleSocialIconProps extends SocialIconProps {
  href: string
}

const SimpleSocialIcon = (props: SimpleSocialIconProps) => {
  const { platform, href, className } = props

  return (
    <a
      href={href}
      target='_blank'
      className={classNames(
        'w-12 h-12 flex items-center justify-center rounded-full bg-pt-purple-600',
        'hover:bg-pt-purple-500',
        className
      )}
    >
      <SocialIcon platform={platform} className='w-6 h-auto text-pt-purple-100' />
    </a>
  )
}
