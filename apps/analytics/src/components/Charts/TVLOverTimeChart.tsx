import { PrizePool } from '@generationsoftware/hyperstructure-client-js'
import classNames from 'classnames'
import { useMemo } from 'react'
import { useAllVaultTVLsOverTime } from '@hooks/useAllVaultTVLsOverTime'
import { AreaChart, AreaChartProps } from './AreaChart'

interface TVLOverTimeChartProps {
  prizePool: PrizePool
  className?: string
}

export const TVLOverTimeChart = (props: TVLOverTimeChartProps) => {
  const { prizePool, className } = props

  const { data: vaultTVLs } = useAllVaultTVLsOverTime(prizePool)

  const chartData = useMemo(() => {
    const data: AreaChartProps['data'] = []

    if (!!vaultTVLs && !!Object.keys(vaultTVLs).length) {
      const numDrawIds = Object.values(vaultTVLs)[0].length

      for (let i = 0; i < numDrawIds; i++) {
        const drawData: AreaChartProps['data'][number] = { name: i + 1 }

        Object.entries(vaultTVLs).forEach(([vaultId, tvls]) => {
          drawData[vaultId] = tvls[i]?.tvl ?? 0
        })

        data.push(drawData)
      }
    }

    return data
  }, [vaultTVLs])

  const chartAreas = useMemo((): AreaChartProps['areas'] => {
    return Object.keys(vaultTVLs ?? {}).map((vaultId) => ({ id: vaultId, stackId: 1 }))
  }, [vaultTVLs])

  if (!chartData?.length) {
    return <></>
  }

  return (
    <div
      className={classNames('w-full flex flex-col gap-2 font-medium text-pt-purple-200', className)}
    >
      <span className='ml-2'>TVL Over Time</span>
      <AreaChart data={chartData} areas={chartAreas} tooltip={{ show: true }} />
    </div>
  )
}
