import { ButtonComponent } from './components/ButtonComponent'
import Stores from './components/Stores'

export default function Home() {
  return (
    <main className="p-8">
      <div className="w-full flex justify-between border-2 border-white rounded-lg p-3">
        <ButtonComponent textButton="Generar reporte"
          className="w-auto p-2 bg-sky-400 text-black rounded-lg font-medium transition hover:bg-sky-600  duration-200" />
        <div className="w-[55%]">

        </div>
        <ButtonComponent textButton="Descargar reporte"
          className="w-auto p-2 bg-teal-500 text-black rounded-lg font-medium transition hover:bg-teal-700  duration-200" />
      </div>
      <div className="min-w-full py-4">
        <div className="border-2 border-amber-200 rounded-lg min-h-[80px] p-4 overflow-hidden">
          <Stores type='show' />
        </div>
      </div>
    </main>
  )
}
