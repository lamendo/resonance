"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function ZoneIdentification() {
  const [clusterMethod, setClusterMethod] = useState("kmeans")
  const [kValue, setKValue] = useState(5)
  const [eps, setEps] = useState(0.5)
  const [minPts, setMinPts] = useState(4)

  // Mock zone data
  const zones = [
    { id: 1, type: "Header", start: 0, end: 15, color: "#FF5733" },
    { id: 2, type: "Tabellenkopf", start: 16, end: 25, color: "#33FF57" },
    { id: 3, type: "Tabellenkörper", start: 26, end: 75, color: "#3357FF" },
    { id: 4, type: "Footer", start: 76, end: 100, color: "#F3FF33" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strukturerkennung & Zonenbildung</CardTitle>
        <CardDescription>Identifikation resonanter Zonen durch Clustering der Spektraltopographie.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="cluster-method">Clustering-Methode</Label>
            <Select value={clusterMethod} onValueChange={setClusterMethod}>
              <SelectTrigger id="cluster-method">
                <SelectValue placeholder="Methode wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kmeans">K-Means</SelectItem>
                <SelectItem value="dbscan">DBSCAN</SelectItem>
                <SelectItem value="hierarchical">Hierarchisch</SelectItem>
                <SelectItem value="none">Keine (manuelle Zonen)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {clusterMethod === "kmeans" && (
            <div>
              <Label htmlFor="k-value">K-Wert (Anzahl Cluster)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="k-value"
                  min={2}
                  max={10}
                  step={1}
                  value={[kValue]}
                  onValueChange={(value) => setKValue(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={kValue}
                  onChange={(e) => setKValue(Number.parseInt(e.target.value))}
                  className="w-16"
                />
              </div>
            </div>
          )}

          {clusterMethod === "dbscan" && (
            <>
              <div>
                <Label htmlFor="eps-value">Epsilon (Nachbarschaftsradius)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="eps-value"
                    min={0.1}
                    max={2}
                    step={0.1}
                    value={[eps]}
                    onValueChange={(value) => setEps(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={eps}
                    onChange={(e) => setEps(Number.parseFloat(e.target.value))}
                    className="w-16"
                    step={0.1}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="minpts-value">MinPts (Mindestpunkte)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="minpts-value"
                    min={1}
                    max={10}
                    step={1}
                    value={[minPts]}
                    onValueChange={(value) => setMinPts(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={minPts}
                    onChange={(e) => setMinPts(Number.parseInt(e.target.value))}
                    className="w-16"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={() => {}}>Clustering durchführen</Button>
        </div>

        <div className="relative h-40 w-full border rounded-md overflow-hidden mb-6">
          <div className="absolute inset-0">
            {zones.map((zone) => (
              <div
                key={zone.id}
                style={{
                  position: "absolute",
                  left: `${zone.start}%`,
                  width: `${zone.end - zone.start}%`,
                  height: "100%",
                  backgroundColor: `${zone.color}40`,
                  borderLeft: `2px solid ${zone.color}`,
                  borderRight: `2px solid ${zone.color}`,
                }}
              >
                <div className="p-2">
                  <Badge style={{ backgroundColor: zone.color }}>{zone.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Erkannte Zonen:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="p-3 border rounded-md flex items-center justify-between"
                style={{ borderLeftColor: zone.color, borderLeftWidth: 4 }}
              >
                <div>
                  <div className="font-medium">{zone.type}</div>
                  <div className="text-sm text-muted-foreground">
                    Position {zone.start} - {zone.end}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Bearbeiten
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline">Zurück zur Transformation</Button>
          <Button>Weiter zur Parserinduktion</Button>
        </div>
      </CardContent>
    </Card>
  )
}
