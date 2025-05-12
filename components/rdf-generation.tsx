"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Check, Copy, Download } from "lucide-react"

export function RdfGeneration() {
  const [rdfFormat, setRdfFormat] = useState("turtle")
  const [copied, setCopied] = useState(false)

  // Mock RDF data
  const rdfTurtle = `@prefix : <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

:fileX a :CSVFile ;
    :hasEntity :Person_1, :Person_2, :Person_3 .

:Person_1 a :Person ;
    :hasName "Max Mustermann" ;
    :hasAge 42 ;
    :livesIn :Berlin .

:Person_2 a :Person ;
    :hasName "Erika Musterfrau" ;
    :hasAge 38 ;
    :livesIn :Hamburg .

:Person_3 a :Person ;
    :hasName "John Doe" ;
    :hasAge 29 ;
    :livesIn :München .

:Berlin a :City .
:Hamburg a :City .
:München a :City .`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rdfTurtle)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>RDF-Tripelgenerierung</CardTitle>
        <CardDescription>Überführung der extrahierten Strukturen in ein semantisches RDF-Modell.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="ontology-prefix">Ontologie-Präfix</Label>
            <Input id="ontology-prefix" defaultValue="http://example.org/" placeholder="URI für Ontologie-Präfix" />
          </div>

          <div>
            <Label htmlFor="rdf-format">RDF-Format</Label>
            <Select value={rdfFormat} onValueChange={setRdfFormat}>
              <SelectTrigger id="rdf-format">
                <SelectValue placeholder="Format wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="turtle">Turtle</SelectItem>
                <SelectItem value="jsonld">JSON-LD</SelectItem>
                <SelectItem value="rdfxml">RDF/XML</SelectItem>
                <SelectItem value="ntriples">N-Triples</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={() => {}}>RDF generieren</Button>
        </div>

        <Tabs defaultValue="code" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">RDF-Code</TabsTrigger>
            <TabsTrigger value="graph">Graph-Visualisierung</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-4">
            <div className="relative">
              <Textarea value={rdfTurtle} readOnly className="font-mono h-80" />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Kopiert" : "Kopieren"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => {}}>
                  <Download className="h-4 w-4 mr-1" />
                  Herunterladen
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="graph" className="mt-4">
            <div className="h-80 w-full border rounded-md flex items-center justify-center bg-muted">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">RDF-Graph-Visualisierung</p>
                <Button variant="outline" size="sm">
                  Graph laden
                </Button>
              </div>
              {/* This would be replaced with a D3.js graph visualization */}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline">Zurück zum Parser</Button>
          <Button>Weiter zum Feedback</Button>
        </div>
      </CardContent>
    </Card>
  )
}
