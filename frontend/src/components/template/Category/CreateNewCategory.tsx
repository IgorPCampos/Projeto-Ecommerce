import { FormEvent } from "react";
import { api } from "@/lib/api";
import useFlashMessage from '../../../lib/useFlashMessage'
import CreateButton from "../CreateButton";
import Input from "../Input";
import showInformation from '../../../lib/showInformations'

export default function CreateNewCategory() {
    const { categories, loadCategories } = showInformation();
    const { setFlashMessage } = useFlashMessage()

    async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        let msgType = 'success'

        const data = await api.post('/categories', {
            name: formData.get('name'),
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        if (msgType == 'success') {
            setFlashMessage(data.message, msgType)

        } else {
            const parsedData = JSON.parse(data.message)
            setFlashMessage(parsedData[0]?.message, msgType)
        }
        loadCategories()
    }

    return (
        <>
            <form onSubmit={handleCreateCategory} className='flex flex-1 flex-col gap-2 border-2 bg-white rounded-lg px-4 pt-6 pb-4 mb-4'>
                <div className='flex flex-col gap-4'>
                    <label htmlFor="" className='items-center gap-1.5 dark:text-gray-800 text-gray-900'>
                        Nome:
                        <Input type="text" name="name" id="name" />
                    </label>
                </div>
                <CreateButton type="submit" texto="Criar" />
            </form>
            
            <div className="overflow-x-hidden">
                <table className="min-w-full w-full border border-gray-400">
                    <thead>
                        <tr className="bg-blue-700 dark:bg-blue-600">
                            <th className="py-2 px-2 text-left dark:text-gray-800">Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={index} className={(index % 2 === 0) ? "bg-gray-50 dark:bg-gray-100 dark:text-black" : ""}>
                                <td className="py-2 px-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-sm">
                                    {category.name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}