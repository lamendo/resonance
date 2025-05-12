"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartLineSeries, ChartAxis } from "@/components/ui/chart"

export function SignalVisualization() {
  const [normalizationType, setNormalizationType] = useState("none")
  const [windowSize, setWindowSize] = useState(256)
  const [stride, setStride] = useState(128)

  // Mock data for visualization
  const generateMockData = () => {
    const data = []
    for (let i = 0; i < 1000; i++) {
      data.push({
        position: i,
        raw: Math.floor(Math.random() * 256),
        normalized: Math.random() * 2 - 1,
      })
    }
    return data
  }

  const mockData = generateMockData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signalvisualisierung</CardTitle>
        <CardDescription>
          Visualisierung der Byte-Folge als Signal und Konfiguration der Vorverarbeitung.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label htmlFor="normalization">Normalisierung</Label>
            <Select value={normalizationType} onValueChange={setNormalizationType}>
              <SelectTrigger id="normalization">
                <SelectValue placeholder="Normalisierungstyp wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Keine</SelectItem>
                <SelectItem value="mean">Mittelwertzentrierung</SelectItem>
                <SelectItem value="zscore">Z-Score</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="window-size">Fenstergröße: {windowSize} Bytes</Label>
            <Slider
              id="window-size"
              min={32}
              max={1024}
              step={32}
              value={[windowSize]}
              onValueChange={(value) => setWindowSize(value[0])}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="stride">Schrittweite: {stride} Bytes</Label>
            <Slider
              id="stride"
              min={1}
              max={windowSize}
              step={1}
              value={[stride]}
              onValueChange={(value) => setStride(value[0])}
              className="mt-2"
            />
          </div>
        </div>

        <div className="h-80 w-full mt-6 relative">
          <ChartContainer className="h-full" xAxisLabel="Position" yAxisLabel="Bytewert">
            <ChartAxis position="bottom" />
            <ChartAxis position="left" />
            <ChartLineSeries data={mockData} xAccessor={(d) => d.position} yAccessor={(d) => d.raw} name="Rohsignal" />
            {normalizationType !== "none" && (
              <ChartLineSeries
                data={mockData}
                xAccessor={(d) => d.position}
                yAccessor={(d) => d.normalized}
                name="Normalisiert"
                color="red"
              />
            )}
          </ChartContainer>
        </div>

        <div className="flex justify-end mt-4">
          <Button>Signalbildung anwenden</Button>
        </div>
      </CardContent>
    </Card>
  )
}
