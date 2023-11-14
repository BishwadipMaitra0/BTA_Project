import { useState,useEffect } from 'react'
import abi from "./contractJson/ChatApp.json"
import {ethers} from "ethers"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CreateAccount from './components/CreateAccount'
import GetUserName from './components/GetUserName'
import './App.css'

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount]=useState('Not connected');
  useEffect(()=>{
    const template=async()=>{
   
      const contractAddres="0x6fb89b812c757b87e4dcc638d284e8735c9229bd";
      const contractABI=abi.abi;
      try{

        const {ethereum}=window;
        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })
 
        window.ethereum.on("accountsChanged",()=>{
         window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer =  provider.getSigner(); //write the blockchain
        
        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        console.log(contract)
      setState({provider,signer,contract});
       
      }catch(error){
        console.log(error)
      }
    }
    template();
  },[])
  return (
    <div className='APP'>
    <Navbar />
    <p>Connected Account - {account}</p>
     
     <CreateAccount state={state}></CreateAccount>
     <GetUserName state={state} userAddress={account}></GetUserName>
   <Footer/>
  </div>

  )
}

export default App