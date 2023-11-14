const CreateAccount = ({state}) => {

    const g = async(event) => {
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const transaction = await contract.createAccount(name);
        await transaction.wait();
        console.log(name);
    }
    return <>
        <form onSubmit={getUserName}>
            <input id="name" placeholder="Public Key"></input>
            <button>UserName</button>
        </form>
    </>
}

export default GetUserName;