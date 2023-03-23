import Configuracao from 'pages/Configuracao';
import Sorteio from 'pages/Sorteio';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <BrowserRouter>
    {/* qualquer componente dentro do "recoilroot" terá acesso ao estado que a gente criar */}
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Configuracao/>}/>
          <Route path="/sorteio" element={<Sorteio/>}/>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
