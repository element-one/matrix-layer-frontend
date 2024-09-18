import { FC, useEffect, useState } from 'react'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'

import Button from '@components/Button/Button'
import { LeftArrowIcon } from '@components/Icon/LeftArrowIcon'
import { RightArrowIcon } from '@components/Icon/RightArrowIcon'
import {
  CompletedIcon,
  CurrentIcon,
  UndoIcon
} from '@components/Icon/StepStatusIcon'

type StepItem = {
  label: string
}

interface StepsProps {
  steps: StepItem[]
  currentStep: number
  onStepChange?: (index: number, step: StepItem) => Promise<void>
  disabled?: boolean
  nextButtonDisabled?: boolean
  stopSteping?: boolean
}

const Steps: FC<StepsProps> = ({
  currentStep,
  onStepChange,
  steps,
  disabled,
  nextButtonDisabled
}) => {
  const [current, setCurrent] = useState(currentStep)
  const nextClickHandler = async () => {
    const step = current + 1

    if (step >= steps.length) return

    await onStepChange?.(step, steps[step])
    setCurrent(step)
  }

  const previousClickHandler = async () => {
    const step = current - 1

    if (step < 0) return

    await onStepChange?.(step, steps[step])
    setCurrent(step)
  }

  useEffect(() => {
    setCurrent((cur) => {
      if (cur === currentStep) return cur

      return currentStep
    })
  }, [currentStep])

  return (
    <div className='flex justify-between mt-8 items-center'>
      <div className='flex gap-1'>
        {steps.map((item, index) => {
          const isCompleted = current > index
          const isCurrent = current === index
          const isUndo = current < index

          return (
            <div
              key={item.label}
              className='flex items-center justify-start gap-2'
            >
              <div
                className={`flex items-center py-[10px] px-4 rounded-full gap-2 ${
                  isCurrent ? 'bg-co-primary-opacity-60' : ''
                }`}
              >
                {isCompleted && <CompletedIcon />}
                {isCurrent && <CurrentIcon />}
                {isUndo && <UndoIcon />}
                <div>{item.label}</div>
              </div>
              <ChevronRightIcon width={12} height={12} />
            </div>
          )
        })}
      </div>

      {!disabled && (
        <div className='flex gap-6'>
          {current > 0 && (
            <Button
              color='ghost'
              className='font-medium h-9 px-[20px]'
              variant='bordered'
              onClick={previousClickHandler}
            >
              <LeftArrowIcon />
              Last step
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              color='primary'
              className='font-medium h-9 px-[20px]'
              onClick={nextClickHandler}
              disabled={nextButtonDisabled}
              style={{
                opacity: nextButtonDisabled
                  ? 'var(--nextui-disabled-opacity)'
                  : ''
              }}
            >
              Next step
              <RightArrowIcon />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default Steps
