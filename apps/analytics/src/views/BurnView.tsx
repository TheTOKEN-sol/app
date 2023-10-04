import { PrizePool } from '@generationsoftware/hyperstructure-client-js'
import { usePrizeTokenData } from '@generationsoftware/hyperstructure-react-hooks'
import { PRIZE_POOLS, SECONDS_PER_DAY } from '@shared/utilities'
import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { currentTimestampAtom } from 'src/atoms'
import { Address } from 'viem'
import { usePublicClient } from 'wagmi'
import { BurnCard } from '@components/Burn/BurnCard'
import { BurnHeader } from '@components/Burn/BurnHeader'
import { useBlockAtTimestamp } from '@hooks/useBlockAtTimestamp'

interface BurnViewProps {
  chainId: number
  className?: string
}

export const BurnView = (props: BurnViewProps) => {
  const { chainId, className } = props

  const publicClient = usePublicClient({ chainId })

  const currentTimestamp = useAtomValue(currentTimestampAtom)

  const prizePool = useMemo(() => {
    const prizePoolInfo = PRIZE_POOLS.find((pool) => pool.chainId === chainId) as {
      chainId: number
      address: Address
      options: { prizeTokenAddress: Address; drawPeriodInSeconds: number; tierShares: number }
    }

    return new PrizePool(
      prizePoolInfo.chainId,
      prizePoolInfo.address,
      publicClient,
      prizePoolInfo.options
    )
  }, [chainId])

  const { data: prizeToken } = usePrizeTokenData(prizePool)

  const { data: minBlock } = useBlockAtTimestamp(chainId, currentTimestamp - SECONDS_PER_DAY)

  if (!!prizeToken) {
    return (
      <div className={classNames('w-full flex flex-col gap-6 items-center', className)}>
        <BurnHeader prizeToken={prizeToken} />
        {!!minBlock && (
          <BurnCard prizeToken={prizeToken} minBlock={minBlock} className='max-w-md' />
        )}
        <BurnCard prizeToken={prizeToken} className='max-w-md' />
      </div>
    )
  }

  return <></>
}