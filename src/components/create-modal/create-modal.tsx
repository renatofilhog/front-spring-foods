import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate"
import { FoodData } from "../../interface/FoodData"
import './modal.css'

interface InputProps {
    label: string,
    value: string | number,
    updateValue: (value: any) => void
}

const Input = ( { label, value, updateValue }: InputProps) => {
    return (
        <>  
            <label> {label} </label>
            <input value={value} onChange={e => updateValue(e.target.value)} />        
        </>
    )
}

interface CreateModalProps {
    closeModal: () => void
}

export function CreateModal({closeModal}: CreateModalProps) {
    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [image, setImage] = useState<string>('')
    const { mutate, isSuccess, isPending } = useFoodDataMutate()

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }

        mutate(foodData)
    }


    useEffect(()=>{
        if(isSuccess) closeModal()
    }, [isSuccess])
    
    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container" action="">
                    <Input label="title" value={title} updateValue={setTitle} />
                    <Input label="price" value={price} updateValue={setPrice} />
                    <Input label="image" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">{isPending ? 'Cadastrando' : 'Cadastrar'}</button>
            </div>
        </div>
    )
}