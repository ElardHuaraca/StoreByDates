import { ButtonComponent } from "./ButtonComponent"
import CRUDModal from "./CRUDModal"
import TrashIcon from "./svg/TrashIcon"
import WriteIcon from "./svg/WriteIcon"

export default function UDStoreComponent({ id }: { id: string }) {
    return (
        <div className="flex flex-row justify-center">
            <div className="p-2">
                <ButtonComponent textButton={<TrashIcon className="w-full" />}
                    className="bg-red-500 rounded-lg py-2 px-4 w-14 h-10 flex items-center content-center transition hover:bg-red-400 duration-300" />
            </div>
            <div className="p-2">
                <CRUDModal id={id} textButton={<WriteIcon className="w-11/12" />}
                    styleButton="bg-sky-500 rounded-lg py-2 px-4 w-14 h-10 flex items-center content-center transition hover:bg-sky-400 duration-300" />
            </div>
        </div>
    )
}