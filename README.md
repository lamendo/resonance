# resonance
its all frequency

**Architekturübersicht – UI-gesteuerte Spektraltopographie-Analyse**

---

## 1. Übersicht

Diese Architekturübersicht beschreibt die orchestrierende Struktur deiner UI-Komponenten im System zur spektralanalytischen Parsergenerierung. Sie ordnet jedem UI-Modul seine Rolle, Zustände und Datenflüsse zu und kategorisiert notwendige Visualisierungselemente nach Pflicht, optional und diagnostisch.

---

## 2. Zentrale Komponentenstruktur

| Phase           | Komponente                    | Zweck                                   | Orchestriert durch                                     |
| --------------- | ----------------------------- | --------------------------------------- | ------------------------------------------------------ |
| Dateiimport     | `file-upload.tsx`             | Datei wählen, UTF-8 Bytes erzeugen      | App-Level-Controller (z. B. Zustand `currentStep` = 0) |
| Signalbildung   | `signal-visualization.tsx`    | 1D-Signal anzeigen (Bytewerte)          | Props: Bytearray, optional: Auswahlbereich             |
| Transformation  | `spectral-transformation.tsx` | Wavelet-Config, Frequenzanalyse starten | Props: Signal, Wavelettyp                              |
| Zonenfindung    | `zone-identification.tsx`     | Clusteranalyse, Segmentierung           | Props: Topographie, Clusterparameter                   |
| Parserinduktion | `parser-induction.tsx`        | Regeln aus Zonen vorschlagen            | Props: Zonen, Signalsegmente                           |
| RDF-Export      | `rdf-generation.tsx`          | RDF-Tripel erzeugen, Ontologie wählen   | Props: Objekte + Regelstruktur                         |
| Feedback        | `feedback-loop.tsx`           | SPARQL-Query, Regelanpassung            | Props: RDF-Graph, QueryString                          |

---

## 3. Zustandsmanagement

Empfohlene globale Zustände (z. B. über React Context oder Zustand):

```ts
interface GlobalState {
  fileName: string;
  byteArray: number[];
  normalizedSignal: number[];
  waveletType: string;
  topographyMatrix: number[][];
  zones: ZoneDescriptor[];
  parserRules: RuleSet[];
  rdfTriples: RDFTriple[];
  currentStep: number;
}
```

---

## 4. Visualisierungsklassifikation

| Phase               | Visualisierung                          | Pflicht? | Zweck                             |
| ------------------- | --------------------------------------- | -------- | --------------------------------- |
| Signalbildung       | Liniendiagramm (Byte vs Position)       | ✅        | Rohdatenverständnis               |
| Normalisierung      | Overlay "roh vs. normiert"              | ⭕️       | Validierung der Transformation    |
| Wavelet             | Spektrogramm Heatmap                    | ✅        | Frequenzstruktur sichtbar machen  |
| Zonen               | Farbliche Segmentierung der Heatmap     | ✅        | strukturelle Gliederung           |
| Clusterverlauf      | Parameter-Visualisierung (z. B. eps, k) | ⭕️       | Diagnose der Zonengrenzen         |
| Parser              | Regelvorschau + editierbarer Baum       | ✅        | Kontrolle über Regeln             |
| Strukturierte Daten | Tabelle oder JSON-Tree                  | ✅        | Verständlichkeit des Outputs      |
| RDF-Tripel          | Graph (z. B. force-directed)            | ✅        | Semantische Verbindungen erkennen |
| SPARQL-Resultat     | Tabelle oder Highlight im Ursprung      | ⭕️       | Feedbackabgleich                  |

---

## 5. Steuerlogik (Orchestrierung)

* **Top-Level Zustand `currentStep`**: steuert Fortschritt in UI (Datei → Signal → Topo → Zonen → Parser → RDF)
* Jede Komponente löst bei Abschluss ein **State-Update** aus:

  * z. B. `setWaveletMatrix(matrix)` → aktiviert `zone-identification`
* **Visualisierungskomponenten sind nie nur Output**, sondern auch **manuelle Eingabe-Panels** (Parameter, Auswahlbereiche etc.)

---

## 6. Erweiterbarkeit & Modularität

* Neue Zonentypen → definieren als neue Farbklasse + Regeltyp
* Neue Parserstrategien → an `parser-induction.tsx` anhängen
* Ontologiebasiertes Mapping → zentral in `rdf-generation.tsx`

---

## Zielbild

Ein vollständig UI-gesteuertes, modular steuerbares Verarbeitungssystem, das jeden Analyse- und Parserschritt visuell zugänglich und manuell kontrollierbar macht – **von Byte bis Tripel.**
