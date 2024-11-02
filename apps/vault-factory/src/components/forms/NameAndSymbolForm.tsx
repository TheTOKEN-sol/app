import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { vaultNameAtom, vaultSymbolAtom } from 'src/atoms'
import { isValidChars } from 'src/utils'
import { NextButton } from '@components/buttons/NextButton'
import { PrevButton } from '@components/buttons/PrevButton'
import { useVaultCreationSteps } from '@hooks/useVaultCreationSteps'
import { useVaultNaming } from '@hooks/useVaultNaming'
import { SimpleInput } from './SimpleInput'

export interface NameAndSymbolFormValues {
  vaultName: string
  vaultSymbol: string
}

interface NameAndSymbolFormProps {
  className?: string
}

export const NameAndSymbolForm = (props: NameAndSymbolFormProps) => {
  const { className } = props

  const formMethods = useForm<NameAndSymbolFormValues>({ mode: 'onChange' })

  const [vaultName, setVaultName] = useAtom(vaultNameAtom)
  const [vaultSymbol, setVaultSymbol] = useAtom(vaultSymbolAtom)

  const { name: defaultName, symbol: defaultSymbol } = useVaultNaming()

  const { nextStep } = useVaultCreationSteps()

  useEffect(() => {
    formMethods.setValue('vaultName', vaultName ?? defaultName, { shouldValidate: true })
    formMethods.setValue('vaultSymbol', vaultSymbol ?? defaultSymbol, {
      shouldValidate: true
    })
  }, [defaultName, defaultSymbol])

  const onSubmit = (data: NameAndSymbolFormValues) => {
    setVaultName(data.vaultName.trim())
    setVaultSymbol(data.vaultSymbol.trim())
    nextStep()
  }

  return (
    <div className={classNames('flex flex-col items-center gap-6', className)}>
      {/* Warning text above the form */}
      <div className="text-white text-lg font-semibold text-center">
        Unacceptable Names will NOT Show in the Front-End and Will NOT Receive Rewards from Us.
      </div>

      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="flex flex-col gap-12 items-center w-full"
        >
          <SimpleInput
            formKey='vaultName'
            validate={{
              isNotFalsyString: (v: string) => !!v || 'Enter a valid name.',
              isValidString: (v: string) =>
                isValidChars(v, { allowSpaces: true }) || 'Invalid characters in name.'
            }}
            defaultValue={defaultName}
            label='Name your Vault (No Personal Info!)'
            needsOverride={true}
            className='w-full max-w-md'
          />
          <SimpleInput
            formKey='vaultSymbol'
            validate={{
              isNotFalsyString: (v: string) => !!v || 'Enter a valid token symbol.',
              isValidString: (v: string) => isValidChars(v) || 'Invalid characters in token symbol.'
            }}
            defaultValue={defaultSymbol}
            label='Vault Symbol (Can Be Same as Name)'
            needsOverride={true}
            className='w-full max-w-md'
          />
          <div className='flex gap-2 items-center'>
            <PrevButton />
            <NextButton disabled={!formMethods.formState.isValid} />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
