import ButtonDownloadFile from './components/ButtonDownloadFileComponent'
import ButtonGenerateReport from './components/ButtonGenerateReportComponent'
import Stores from './components/Stores'

export default function Home() {

  return (
    <main className="p-8">
      <div className="w-full flex justify-between border-2 border-white rounded-lg p-3">
        <ButtonGenerateReport />
        <div className="w-[65%] flex px-4">
          <div className="w-full flex items-center gap-4">
            <div className="w-full" id="loading_container"></div>
          </div>
        </div>
        <ButtonDownloadFile />
      </div>
      <div className="min-w-full py-4">
        <div className="border-2 border-amber-200 rounded-lg min-h-[80px] p-4 overflow-auto">
          <Stores type='show' />
        </div>
      </div>
    </main>
  )
}
