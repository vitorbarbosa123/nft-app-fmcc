import './App.css';
import mintExampleAbi from './mintExampleAbi.json'
import { ethers, BigNumber, Signer} from 'ethers';
import { useEffect, useState } from 'react';

const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  // connect to blockchain
  const [accounts, setAccounts] = useState([]);

  async function connectAccounts() {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
    }
  }

  useEffect(() => {
    connectAccounts()
  }, []);

  //Minting
  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint() {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintExampleAbi.abi,
        singer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount))
        console.log("reponse:", response)
      } catch(err) {
        console.log("Tem que ter dinheiro", err)
      }
    }
  }


  return (
    <div className="App">
      <header class="header">
        Simulação de compra de um token
      </header>
      <section>
        <img src="https://64.media.tumblr.com/dc21b60070e82fd7338b12e7cccc3f67/0248f56363acd9c8-94/s1280x1920/ace56a50be882827eef49e27ee7828d724a057e4.jpg" id="image"/>
        <p>Ajude este jovem apaixonado a conquistar o mundo</p>
        <p>Valor: 0.05 ether</p>
        {accounts.length && (
          <div className="Wrapper">
            <div>
            <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
              {mintAmount}
              <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
            </div>
              <button onClick={handleMint} id="btnBuy">Comprar</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
