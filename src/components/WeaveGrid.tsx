'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type WeaveGridProps = {
  className?: string
  cellClassName?: string
  renderCell?: (index: number) => ReactNode
  feature?: ReactNode
}

const cells = Array.from({ length: 16 }, (_, index) => index)

const featureLayoutCells = [
  'col-start-1 row-start-1',
  'col-start-2 row-start-1 max-sm:border-r',
  'hidden sm:block sm:col-start-3 sm:row-start-1 sm:max-lg:border-r',
  'hidden lg:block lg:col-start-4 lg:row-start-1 lg:border-r',
  'hidden lg:block lg:col-start-1 lg:row-start-2',
  'hidden lg:block lg:col-start-1 lg:row-start-3',
  'hidden sm:block sm:col-start-1 sm:row-start-3 sm:max-lg:border-b lg:row-start-4 lg:border-b',
  'hidden sm:block sm:col-start-2 sm:row-start-3 sm:max-lg:border-b lg:row-start-4 lg:border-b',
  'hidden sm:block sm:col-start-3 sm:row-start-3 sm:max-lg:border-r sm:max-lg:border-b lg:row-start-4 lg:border-b',
  'hidden lg:block lg:col-start-4 lg:row-start-4 lg:border-r lg:border-b',
]

function edgeClasses(index: number) {
  const mobileCol = index % 2
  const mobileRow = Math.floor(index / 2)
  const tabletCol = index % 3
  const tabletRow = Math.floor(index / 3)
  const desktopCol = index % 4
  const desktopRow = Math.floor(index / 4)

  return [
    mobileCol === 1 ? 'max-sm:border-r' : '',
    mobileRow === 1 ? 'max-sm:border-b' : '',
    tabletCol === 2 ? 'sm:max-lg:border-r' : '',
    tabletRow === 2 ? 'sm:max-lg:border-b' : '',
    desktopCol === 3 ? 'lg:border-r' : '',
    desktopRow === 3 ? 'lg:border-b' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function visibilityClasses(index: number) {
  if (index > 8) return 'hidden lg:block'
  if (index > 3) return 'hidden sm:block'
  return ''
}

export function WeaveGrid({ className = '', cellClassName = '', renderCell, feature }: WeaveGridProps) {
  const reduceMotion = useReducedMotion()

  if (feature) {
    return (
      <motion.div
        className={`grid grid-cols-2 grid-rows-2 sm:grid-cols-3 sm:grid-rows-3 lg:grid-cols-4 lg:grid-rows-4 ${className}`}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.04,
            },
          },
        }}
      >
        {featureLayoutCells.map((cellClass, index) => (
          <motion.div
            key={cellClass}
            className={`min-h-0 border-l border-t border-hairline-dark ${cellClass} ${cellClassName}`}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.6 } },
            }}
          >
            {renderCell?.(index)}
          </motion.div>
        ))}
        <motion.div
          className="col-span-2 col-start-1 row-start-2 border border-hairline-dark bg-brand-teal-mid sm:col-span-3 lg:col-start-2 lg:row-start-2 lg:col-span-3 lg:row-span-2"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.6 } },
          }}
        >
          {feature}
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`grid grid-cols-2 grid-rows-2 sm:grid-cols-3 sm:grid-rows-3 lg:grid-cols-4 lg:grid-rows-4 ${className}`}
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.04,
          },
        },
      }}
    >
      {cells.map((index) => (
        <motion.div
          key={index}
          className={`min-h-0 border-l border-t border-hairline-dark ${edgeClasses(index)} ${visibilityClasses(
            index,
          )} ${cellClassName}`}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.6 } },
          }}
        >
          {renderCell?.(index)}
        </motion.div>
      ))}
    </motion.div>
  )
}
