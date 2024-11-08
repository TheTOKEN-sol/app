import { Button } from '@shared/ui'
import { LINKS, SECONDS_PER_DAY } from '@shared/utilities'
import classNames from 'classnames'
import { GetStaticProps } from 'next'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { getMessages } from 'src/utils'
import { HomeHeader } from '@components/HomeHeader'
import { Layout } from '@components/Layout'
import { PrizePoolTicker } from '@components/Prizes/PrizePoolTicker'

interface HomePageProps {
  messages: IntlMessages
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  const messages = await getMessages(locale)

  return {
    props: { messages },
    revalidate: SECONDS_PER_DAY
  }
}

export default function HomePage() {
  const t = useTranslations('Common')

  return (
    <Layout className='gap-8'>
      <PrizePoolTicker />
    </Layout>
  )
}
