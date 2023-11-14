const AddFriend = ({state}) => {

    const addFriend = async(event) => {
        const [acc,setAcc]=useState([]);
    const {contract}=state;
    useEffect(()=>{
        const Account = async()=>{
          const acc = await contract.getCreateAccount();
          setAcc(acc)
          //console.log(memos)
        }
        contract && Account()
    },[contract])
    }
    return <>
        <form onSubmit={createAccount}>
            <input id="name" placeholder="Name"></input>
            <button>Create Acc.</button>
        </form>
    </>
}

export default CreateAccount;