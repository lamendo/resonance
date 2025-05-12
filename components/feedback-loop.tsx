"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"

export function FeedbackLoop() {
  const [sparqlQuery, setSparqlQuery] = useState(`SELECT ?person ?name ?age ?city
WHERE {
  ?person a :Person ;
          :hasName ?name ;
          :hasAge ?age ;
          :livesIn ?city .
}`)

  // Mock query results
  const queryResults = [
    { person: ":Person_1", name: "Max Mustermann", age: "42", city: ":Berlin" },
    { person: ":Person_2", name: "Erika Musterfrau", age: "38", city: ":Hamburg" },
    { person: ":Person_3", name: "John Doe", age: "29", city: ":München" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedbackschleife über SPARQL</CardTitle>
        <CardDescription>Abfrage des RDF-Modells und Rückführung der Ergebnisse in den Analyseprozess.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="sparql-editor">SPARQL-Abfrage</Label>
          <div className="relative">
            <Textarea
              id="sparql-editor"
              value={sparqlQuery}
              onChange={(e) => setSparqlQuery(e.target.value)}
              className="font-mono h-40"
            />
            <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={() => {}}>
              <Play className="h-4 w-4 mr-1" />
              Ausführen
            </Button>
          </div>
        </div>

        <Tabs defaultValue="results" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Ergebnisse</TabsTrigger>
            <TabsTrigger value="projection">Rückprojektion</TabsTrigger>
            <TabsTrigger value="history">Verlauf</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Abfrageergebnisse:</h3>
                <Badge variant="outline">{queryResults.length} Ergebnisse</Badge>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(queryResults[0]).map((key) => (
                      <TableHead key={key}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queryResults.map((row, i) => (
                    <TableRow key={i}>
                      {Object.values(row).map((value, j) => (
                        <TableCell key={j}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="projection" className="mt-4">
            <div className="h-60 w-full border rounded-md flex items-center justify-center bg-muted">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Rückprojektion auf Originaldaten</p>
                <Button variant="outline" size="sm">
                  Projektion anzeigen
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Abfrageverlauf:</h3>

              <div className="space-y-2">
                {[
                  { timestamp: "10:15:32", query: "SELECT ?person WHERE { ?person a :Person }" },
                  { timestamp: "10:14:18", query: "SELECT ?city WHERE { ?person :livesIn ?city }" },
                  { timestamp: "10:12:05", query: sparqlQuery },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline">{item.timestamp}</Badge>
                      <Button size="sm" variant="ghost">
                        Laden
                      </Button>
                    </div>
                    <div className="text-xs font-mono truncate">{item.query}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-medium">Feedback anwenden auf:</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              Zonenbildung anpassen
            </Button>
            <Button variant="outline" className="justify-start">
              Parserregeln optimieren
            </Button>
            <Button variant="outline" className="justify-start">
              Neue Datei analysieren
            </Button>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline">Zurück zur RDF-Generierung</Button>
          <Button variant="default">Analyse abschließen</Button>
        </div>
      </CardContent>
    </Card>
  )
}
