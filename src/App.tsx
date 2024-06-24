import { useState } from 'react';
import './App.css'
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data } = useFoodData();
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className='container'>
      <h1>Cardapio</h1>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card 
            price={foodData.price} 
            image={foodData.image} 
            title={foodData.title} 
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal}>Cadastrar novo item</button>
    </div>
  )
}

export default App
