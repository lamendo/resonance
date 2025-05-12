"use client"

import type * as React from "react"

interface ChartContainerProps {
  className?: string
  xAxisLabel?: string
  yAxisLabel?: string
  children: React.ReactNode
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ className, xAxisLabel, yAxisLabel, children }) => {
  return (
    <div className={className}>
      <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
        {children}
      </svg>
      {xAxisLabel && <div className="text-center text-sm mt-2">{xAxisLabel}</div>}
      {yAxisLabel && (
        <div
          className="text-sm absolute"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "left top",
            left: "10px",
            top: "50%",
          }}
        >
          {yAxisLabel}
        </div>
      )}
    </div>
  )
}

interface ChartLineSeriesProps<T> {
  data: T[]
  xAccessor: (d: T) => number
  yAccessor: (d: T) => number
  name: string
  color?: string
}

export const ChartLineSeries = <T extends object>({
  data,
  xAccessor,
  yAccessor,
  name,
  color = "blue",
}: ChartLineSeriesProps<T>) => {
  if (!data || data.length === 0) {
    return null
  }

  // Calculate the min/max values for scaling
  const xValues = data.map(xAccessor)
  const yValues = data.map(yAccessor)

  const xMin = Math.min(...xValues)
  const xMax = Math.max(...xValues)
  const yMin = Math.min(...yValues)
  const yMax = Math.max(...yValues)

  // Scale the points to fit the SVG viewBox
  const points = data
    .map((d) => {
      const x = ((xAccessor(d) - xMin) / (xMax - xMin || 1)) * 950 + 25
      const y = 375 - ((yAccessor(d) - yMin) / (yMax - yMin || 1)) * 350
      return `${x},${y}`
    })
    .join(" ")

  return (
    <>
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
      <text x="950" y="20" fill={color} fontSize="12" textAnchor="end">
        {name}
      </text>
    </>
  )
}

interface ChartAxisProps {
  position: "bottom" | "left"
}

export const ChartAxis: React.FC<ChartAxisProps> = ({ position }) => {
  if (position === "bottom") {
    return <line x1="25" y1="375" x2="975" y2="375" stroke="currentColor" strokeWidth="1" />
  }

  if (position === "left") {
    return <line x1="25" y1="25" x2="25" y2="375" stroke="currentColor" strokeWidth="1" />
  }

  return null
}

interface ChartProps {
  children: React.ReactNode
}

export const Chart: React.FC<ChartProps> = ({ children }) => {
  return <svg viewBox="0 0 100 100">{children}</svg>
}

export const ChartLine = () => null
