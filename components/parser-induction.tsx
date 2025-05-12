"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Code } from "lucide-react"

export function ParserInduction() {
  const [selectedZone, setSelectedZone] = useState("3")
  const [parserStrategy, setParserStrategy] = useState("delimiter")
  const [ruleText, setRuleText] = useState(
    '{\n  "delimiter": ",",\n  "hasHeader": true,\n  "columns": ["Name", "Alter", "Stadt"]\n}',
  )

  // Mock zones
  const zones = [
    { id: "1", type: "Header", color: "#FF5733" },
    { id: "2", type: "Tabellenkopf", color: "#33FF57" },
    { id: "3", type: "Tabellenkörper", color: "#3357FF" },
    { id: "4", type: "Footer", color: "#F3FF33" },
  ]

  // Mock extracted data
  const extractedData = [
    { Name: "Max Mustermann", Alter: 42, Stadt: "Berlin" },
    { Name: "Erika Musterfrau", Alter: 38, Stadt: "Hamburg" },
    { Name: "John Doe", Alter: 29, Stadt: "München" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parserinduktion & Regelvorschläge</CardTitle>
        <CardDescription>
          Ableitung von Parserregeln aus den identifizierten Zonen und Anwendung auf die Daten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="zone-select">Zone auswählen</Label>
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger id="zone-select">
                <SelectValue placeholder="Zone wählen" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                      {zone.type}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="parser-strategy">Parserstrategie</Label>
            <Select value={parserStrategy} onValueChange={setParserStrategy}>
              <SelectTrigger id="parser-strategy">
                <SelectValue placeholder="Strategie wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delimiter">Trennzeichenbasiert</SelectItem>
                <SelectItem value="fixedwidth">Feste Breite</SelectItem>
                <SelectItem value="regex">Reguläre Ausdrücke</SelectItem>
                <SelectItem value="custom">Benutzerdefiniert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="rule-editor">Regeleditor</Label>
          <div className="relative">
            <Textarea
              id="rule-editor"
              value={ruleText}
              onChange={(e) => setRuleText(e.target.value)}
              className="font-mono h-40"
            />
            <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={() => {}}>
              <Code className="h-4 w-4 mr-1" />
              Format
            </Button>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={() => {}}>Parser anwenden</Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Extrahierte Daten:</h3>
            <Badge variant="outline">3 Objekte erkannt</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(extractedData[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {extractedData.map((row, i) => (
                <TableRow key={i}>
                  {Object.values(row).map((value, j) => (
                    <TableCell key={j}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline">Zurück zur Zonenbildung</Button>
          <Button>Weiter zur RDF-Generierung</Button>
        </div>
      </CardContent>
    </Card>
  )
}
