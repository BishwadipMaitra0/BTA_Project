// const GetUserName = ({state}) => {

//     const getUserName = async(event) => {
//         event.preventDefault();
//         const {contract} = state;
//         const name = document.querySelector("#name").value;
//         const transaction = await contract.createAccount(name);
//         await transaction.wait();
//         console.log(name);
//     }
//     return <>
//         <form onSubmit={getUserName}>
//             <input id="name" placeholder="Public Key"></input>
//             <button>UserName</button>
//         </form>
//     </>
// }

// export default GetUserName;



const GetUserName = ({ state, userAddress }) => {
  const getUserName = async (event) => {
    event.preventDefault();
    const { contract } = state;
    try {
      const username = await contract.getUsername(userAddress);
      console.log(username);
    } catch (error) {
      console.error("Error getting username:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={getUserName}>
        <button type="submit">Get UserName</button>
      </form>
    </>
  );
};

export default GetUserName;

