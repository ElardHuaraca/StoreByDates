import ButtonReport from './components/ButtonReport'
import Stores from './components/Stores'

export default function Home() {
  return (
    <main className="p-8">
      <div className="w-full flex justify-between border-2 border-white rounded-lg p-3">
        <ButtonReport textButton="Generar reporte" className="w-auto p-2 bg-sky-400 text-black rounded-lg font-medium" />
        <div className="w-[55%]">

        </div>
        <ButtonReport textButton="Descargar reporte" className="w-auto p-2 bg-teal-500 text-black rounded-lg font-medium" />
      </div>
      <div className="min-w-full py-4">
        <div className="border-2 border-amber-200 rounded-lg min-h-[80px] p-4 overflow-hidden">
          <Stores />
        </div>
      </div>
    </main>
  )
}
