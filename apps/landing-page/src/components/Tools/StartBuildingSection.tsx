import { LINKS } from '@shared/utilities'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface StartBuildingSectionProps {
  className?: string
}

export const StartBuildingSection = (props: StartBuildingSectionProps) => {
  const { className } = props

  return (
    <section className={classNames('w-full flex flex-col gap-4 items-center md:gap-12', className)}>
      <span className='text-pt-teal md:text-xl'>Start Building Today</span>
      <div className='flex flex-col gap-10 md:flex-row md:flex-wrap md:justify-center'>
        <StartBuildingItem
          href={LINKS.vaultFactory}
          imgSrc='/factoryScreenshot.png'
          title='Factory'
          description='Launch your own prize vaults using the protocol alongside ERC-4626 compatible yield sources.'
        />
        <StartBuildingItem
          href={LINKS.vaultListCreator}
          imgSrc='/listsScreenshot.png'
          title='Lists'
          description='Create and host your own vault lists so users can view, interact with and share your prize vaults on the App.'
        />
        <StartBuildingItem
          href={LINKS.analytics}
          imgSrc='/cabanalyticsScreenshot.png'
          title='Analytics'
          description='View analytics and health metrics.'
        />
        <StartBuildingItem
          href={LINKS.rewardsBuilder}
          imgSrc='/rewardsScreenshot.png'
          title='Rewards Builder'
          description='Create and manage bonus rewards for any prize vault.'
        />
      </div>
    </section>
  )
}

interface StartBuildingItemProps {
  href: string
  imgSrc: string
  title: string
  description: string
  className?: string
}

const StartBuildingItem = (props: StartBuildingItemProps) => {
  const { href, imgSrc, title, description, className } = props

  return (
    <div className={classNames('max-w-md flex flex-col', className)}>
      <Link href={href} target='_blank'>
        <div className='px-8 py-4 bg-pt-purple-200 shadow-lg outline outline-2 outline-transparent hover:outline-pt-purple-400 md:px-12 md:py-11 md:rounded-3xl'>
          <Image
            src={imgSrc}
            alt={title}
            width={288}
            height={162}
            className='w-full h-auto rounded-lg'
          />
        </div>
      </Link>
      <div className='flex flex-col gap-1 mt-3 px-6 text-center md:gap-2 md:mt-6 md:text-start'>
        <span className='text-3xl font-medium'>{title}</span>
        <span className='text-pt-purple-100 md:text-xl'>{description}</span>
      </div>
    </div>
  )
}
