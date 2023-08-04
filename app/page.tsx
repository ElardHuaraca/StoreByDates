import { ButtonComponent } from './components/ButtonComponent'
import ButtonGenerateReport from './components/ButtonGenerateReportComponent'
import DateTimePicker from './components/DateTimePicker'
import LoadingBar from './components/LoadingBar'
import Stores from './components/Stores'

export default function Home() {
  return (
    <main className="p-8">
      <div className="w-full flex justify-between border-2 border-white rounded-lg p-3">
        <ButtonGenerateReport />
        <div className="w-[65%] flex items-center">
          <div className="flex w-1/5 relative items-center gap-2">
            <DateTimePicker name_input="date_start" content_span="Inicio: " />
            <DateTimePicker name_input="date_end" content_span="Fin: " />
          </div>
          <div className="min-w-[80%]">
            <LoadingBar id="loading_bar" />
          </div>
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
