import { PrizePool } from '@generationsoftware/hyperstructure-client-js'
import { usePrizeTokenData } from '@generationsoftware/hyperstructure-react-hooks'
import { ExternalLink, Spinner } from '@shared/ui'
import { formatBigIntForDisplay, getBlockExplorerUrl, shorten } from '@shared/utilities'
import classNames from 'classnames'
import { formatUnits } from 'viem'
import { useDrawRelayFeePercentage } from '@hooks/useDrawRelayFeePercentage'
import { useRngTxs } from '@hooks/useRngTxs'
import { DrawCardItemTitle } from './DrawCardItemTitle'

interface DrawRelayFeeProps {
  prizePool: PrizePool
  drawId: number
  className?: string
}

export const DrawRelayFee = (props: DrawRelayFeeProps) => {
  const { prizePool, drawId, className } = props

  const { data: allRngTxs, isFetched: isFetchedAllRngTxs } = useRngTxs(prizePool)
  const rngTxs = allRngTxs?.find((txs) => txs.rng.drawId === drawId)
  const relayTx = rngTxs?.relay

  const rngTxFeeFraction = !!rngTxs
    ? parseFloat(formatUnits(rngTxs.rng.feeFraction, 18))
    : undefined

  const { data: prizeToken } = usePrizeTokenData(prizePool)

  const { data: currentFeePercentage } = useDrawRelayFeePercentage(prizePool)

  return (
    <div className={classNames('flex flex-col gap-3', className)}>
      <DrawCardItemTitle>
        {isFetchedAllRngTxs && !relayTx ? 'Current ' : ''}Relay Fee
      </DrawCardItemTitle>
      <div className='flex flex-col gap-1 text-sm text-pt-purple-700 whitespace-nowrap'>
        {isFetchedAllRngTxs && !!prizeToken ? (
          <>
            <span>
              {!!relayTx ? (
                <>
                  <span className='text-xl font-semibold'>
                    {formatBigIntForDisplay(relayTx.fee, prizeToken.decimals, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>{' '}
                  {prizeToken.symbol}{' '}
                  {!!relayTx.feeFraction && (
                    <>
                      (
                      {formatBigIntForDisplay(relayTx.feeFraction, 16, {
                        maximumFractionDigits: 0
                      })}
                      %)
                    </>
                  )}
                </>
              ) : !!currentFeePercentage && !!rngTxFeeFraction ? (
                <>
                  <span className='text-xl font-semibold'>
                    {((1 - rngTxFeeFraction) * currentFeePercentage).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                  %
                </>
              ) : (
                <span>-</span>
              )}
            </span>
            {!!relayTx ? (
              <ExternalLink href={getBlockExplorerUrl(prizePool.chainId, relayTx.hash, 'tx')}>
                {shorten(relayTx.hash, { short: true })}
              </ExternalLink>
            ) : (
              !!currentFeePercentage && !!rngTxs && <span>Not Yet Awarded</span>
            )}
          </>
        ) : (
          <Spinner className='after:border-y-pt-purple-800' />
        )}
      </div>
    </div>
  )
}