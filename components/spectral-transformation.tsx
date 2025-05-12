"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SpectralTransformation() {
  const [waveletType, setWaveletType] = useState("haar")
  const [scaleRange, setScaleRange] = useState([1, 10])
  const [viewType, setViewType] = useState("2d")

  // Mock heatmap data
  const generateHeatmapData = () => {
    const width = 100
    const height = 20
    const data = []

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Create patterns in the data
        let value = 0

        // Create some zones
        if (x < 20) {
          value = Math.sin(y * 0.5) * 0.5 + 0.5
        } else if (x < 40) {
          value = Math.cos(y * 0.3) * 0.7 + 0.3
        } else if (x < 70) {
          value = y % 5 === 0 ? 0.9 : 0.2
        } else {
          value = Math.random() * 0.3 + 0.1
        }

        data.push({
          x,
          y,
          value,
        })
      }
    }

    return data
  }

  const heatmapData = generateHeatmapData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wavelet-Transformation & Spektraltopographie</CardTitle>
        <CardDescription>
          Transformation des Signals in den Frequenzraum und Visualisierung der Spektraltopographie.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label htmlFor="wavelet-type">Wavelet-Typ</Label>
            <Select value={waveletType} onValueChange={setWaveletType}>
              <SelectTrigger id="wavelet-type">
                <SelectValue placeholder="Wavelet-Typ wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="haar">Haar</SelectItem>
                <SelectItem value="db4">Daubechies 4</SelectItem>
                <SelectItem value="sym4">Symlet 4</SelectItem>
                <SelectItem value="coif1">Coiflet 1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="scale-range">Skalenbereich</Label>
            <Slider
              id="scale-range"
              min={1}
              max={20}
              step={1}
              value={scaleRange}
              onValueChange={setScaleRange}
              className="mt-2"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {scaleRange[0]} - {scaleRange[1]}
            </div>
          </div>

          <div className="flex items-end">
            <Button className="w-full" onClick={() => {}}>
              Transformation durchführen
            </Button>
          </div>
        </div>

        <Tabs value={viewType} onValueChange={setViewType} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="2d">2D Heatmap</TabsTrigger>
            <TabsTrigger value="3d">3D Topographie</TabsTrigger>
          </TabsList>

          <TabsContent value="2d" className="mt-4">
            <div className="relative h-80 w-full border rounded-md overflow-hidden">
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 100 20">
                  {heatmapData.map((point, i) => (
                    <rect
                      key={i}
                      x={point.x}
                      y={point.y}
                      width={1}
                      height={1}
                      fill={`rgba(255, 0, 0, ${point.value})`}
                    />
                  ))}
                </svg>
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 flex flex-col justify-between p-2">
                <span className="text-xs">Hohe Freq.</span>
                <span className="text-xs">Niedrige Freq.</span>
              </div>
              <div className="absolute left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent z-10 flex justify-between items-center px-12">
                <span className="text-xs">Position 0</span>
                <span className="text-xs">Position 100</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="3d" className="mt-4">
            <div className="h-80 w-full border rounded-md flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">3D-Visualisierung wird geladen...</p>
              {/* This would be replaced with a Three.js 3D visualization */}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4">
          <Button variant="outline">Zurück zum Signal</Button>
          <Button>Weiter zur Zonenbildung</Button>
        </div>
      </CardContent>
    </Card>
  )
}
