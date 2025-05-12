"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileContent(event.target.result as string)
          toast({
            title: "Datei geladen",
            description: `${selectedFile.name} (${selectedFile.size} Bytes) erfolgreich geladen.`,
          })
        }
      }
      reader.readAsText(selectedFile)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dateiimport & Signalbildung</CardTitle>
        <CardDescription>
          Laden Sie eine UTF-8-kodierte Textdatei hoch, um den Analyseprozess zu starten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
          <Label htmlFor="file-upload">Datei auswählen</Label>
          <div className="flex items-center gap-2">
            <Input
              id="file-upload"
              type="file"
              accept=".txt,.csv,.json,.xml,.md"
              onChange={handleFileChange}
              className="flex-1"
            />
            <Button type="button" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {file && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Dateiinformationen:</h3>
            <ul className="text-sm space-y-1">
              <li>
                <span className="font-medium">Name:</span> {file.name}
              </li>
              <li>
                <span className="font-medium">Größe:</span> {file.size} Bytes
              </li>
              <li>
                <span className="font-medium">Typ:</span> {file.type || "Unbekannt"}
              </li>
            </ul>
          </div>
        )}

        {fileContent && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Vorschau:</h3>
            <div className="bg-muted p-2 rounded-md text-xs font-mono overflow-auto max-h-40">
              {fileContent.slice(0, 500)}
              {fileContent.length > 500 && "..."}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
