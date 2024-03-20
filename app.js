// Connect Wallet Button
document.getElementById('connectWalletBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to MetaMask");
        } catch (error) {
            console.error("User denied account access:", error);
        }
    } else {
        console.error("MetaMask not detected!");
    }
});

// Contract Address
const contractAddress = "0x90dE76dC9fC454C52B0DF85F318C1a674c2aCa3E";

// Contract ABI (Application Binary Interface)
const contractABI = [
    // Your contract ABI here...
];

// Contract Instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Send Funds to Contract
document.getElementById('sendFundsBtn').addEventListener('click', async () => {
    try {
        await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                to: contractAddress,
                from: window.ethereum.selectedAddress,
                value: web3.utils.toWei("0.1", "ether")
            }]
        });
        console.log("Funds sent to contract");
    } catch (error) {
        console.error("Error sending funds:", error);
    }
});

// Flip Coin
document.getElementById('flipCoinBtn').addEventListener('click', async () => {
    try {
        await contract.methods.flipCoin().send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei("0.1", "ether") });
        console.log("Coin flipped");
        // Display result
        const resultElement = document.getElementById('result');
        const randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 0) {
            resultElement.textContent = "You win!";
        } else {
            resultElement.textContent = "Sorry, you lost!";
        }
    } catch (error) {
        console.error("Error flipping coin:", error);
    }
});

// Withdraw Winnings
document.getElementById('withdrawBtn').addEventListener('click', async () => {
    try {
        await contract.methods.withdrawWinnings().send({ from: window.ethereum.selectedAddress });
        console.log("Winnings withdrawn");
    } catch (error) {
        console.error("Error withdrawing winnings:", error);
    }
});
