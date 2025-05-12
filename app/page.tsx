import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import client components
const FileUpload = dynamic(() => import("@/components/file-upload").then((mod) => ({ default: mod.FileUpload })), {
  ssr: false,
})
const SignalVisualization = dynamic(
  () => import("@/components/signal-visualization").then((mod) => ({ default: mod.SignalVisualization })),
  { ssr: false },
)
const SpectralTransformation = dynamic(
  () => import("@/components/spectral-transformation").then((mod) => ({ default: mod.SpectralTransformation })),
  { ssr: false },
)
const ZoneIdentification = dynamic(
  () => import("@/components/zone-identification").then((mod) => ({ default: mod.ZoneIdentification })),
  { ssr: false },
)
const ParserInduction = dynamic(
  () => import("@/components/parser-induction").then((mod) => ({ default: mod.ParserInduction })),
  { ssr: false },
)
const RdfGeneration = dynamic(
  () => import("@/components/rdf-generation").then((mod) => ({ default: mod.RdfGeneration })),
  { ssr: false },
)
const FeedbackLoop = dynamic(
  () => import("@/components/feedback-loop").then((mod) => ({ default: mod.FeedbackLoop })),
  { ssr: false },
)

// Loading component
const ComponentLoader = () => (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-80 w-full" />
  </div>
)

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Resonanzbasierte Spektraltopographie-Analyse</h1>

      <div className="mb-8 max-w-3xl mx-auto">
        <p className="text-muted-foreground mb-4">
          Dieses System ermöglicht die Analyse von Textdaten durch spektrale Topographie, Zonensegmentierung und
          semantische Extraktion. Jeder Verarbeitungsschritt ist manuell steuerbar und visuell nachvollziehbar.
        </p>
      </div>

      <Tabs defaultValue="file-upload" className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="file-upload">1. Dateiimport</TabsTrigger>
          <TabsTrigger value="transformation">2. Transformation</TabsTrigger>
          <TabsTrigger value="zones">3. Zonenbildung</TabsTrigger>
          <TabsTrigger value="parser">4. Parserinduktion</TabsTrigger>
          <TabsTrigger value="rdf">5. RDF-Generierung</TabsTrigger>
          <TabsTrigger value="feedback">6. Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="file-upload" className="space-y-4">
          <Suspense fallback={<ComponentLoader />}>
            <FileUpload />
            <SignalVisualization />
          </Suspense>
        </TabsContent>

        <TabsContent value="transformation" className="space-y-4">
          <Suspense fallback={<ComponentLoader />}>
            <SpectralTransformation />
          </Suspense>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <Suspense fallback={<ComponentLoader />}>
            <ZoneIdentification />
          </Suspense>
        </TabsContent>

        <TabsContent value="parser" className="space-y-4">
          <Suspense fallback={<ComponentLoader />}>
            <ParserInduction />
          </Suspense>
        </TabsContent>

        <TabsContent value="rdf" className="space-y-4">
          <Suspense fallback={<ComponentLoader />}>
            <RdfGeneration />
          </Suspense>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Suspense fallback={<ComponentLoader />}>
            <FeedbackLoop />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  )
}
