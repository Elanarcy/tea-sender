const { ethers } = require('ethers');
const readline = require('readline');

// TEA Sepolia Testnet RPC and Explorer
const rpcUrl = 'https://tea-sepolia.g.alchemy.com/public';
const chainId = 10218;
const explorerBaseUrl = 'https://sepolia.tea.xyz/tx/';

// List of recipient addresses (120 addresses)
const recipientAddresses = [
  '0x90AE3c37E580bD09ba62E87426E8dD68CAd23099',
  '0xf2E23196A7d7b8114e3dCAc0e2eEAcb5CD0839De',
  '0xcd64F879030a7a4FE081609E1A9b626BB45b09b3',
  '0xaeb8832a499de2bf255D99D076Cd5869A32ab6D9',
  '0x67327C9a8ACF6ddbe81970262fc0923A00ab4868',
  '0x9947E170A76d466e982CD4FDCF1B662b356F4d6A',
  '0xef323cac89d4759513f10e61c1c0d29db5aa791d',
  '0x1D331DB5BE0B9031De0b5Bf553e333f6a3915c93',
  '0xA624df7f3219f6F76094652a63aA25897fCfd0e6',
  '0x7304A74bF8fAc5ca3fE29C8D26c67225232cf4f6',
  '0xa4b6333440D95d0130999d3627fd1A3953c4609D',
  '0x9fF860aEBC9513ACb66473B0B26f4bF272b3bfB4',
  '0xfc9ae5e1417059d39ac0fef8bf6fb1270cb256e2',
  '0x26a96BFEe7cb6A468e29fBB725f84892393a0D44',
  '0xDA24aA83ef7c1DaAad3e40c8De2e4737908BF636',
  '0x130f76701804fd71696f41f0bb11eb7b3a02914e',
  '0x4d353d2BDF1513B02a1AD1c7912Bb24023BC0367',
  '0x080b31BaF8f12d5f7456fD7A80CBDBa7Ced696D4',
  '0x2497011dcea9b19a04b0272e6b5b062ed0aa10c3',
  '0x202af649C5661cEaCcf3398fA132D641BF6d1f0b',
  '0x5444EaCC3d709ed09BcF6d8621453D8951368B5C',
  '0x389aD3700E5bCcab1f90fbc0B60F6Ee7558952b9',
  '0x4524EF7664C85aB02B0061622A0Ad9d3d78F20Fd',
  '0xa966Dba54Bb0dCbFcd830395994567C0587E3B3e',
  '0xbba952285f6d9f06d15afec0b023161c30c52d60',
  '0x3B5ceA4100Fc3C00d17Ffa96830A1F65aDfF6e49',
  '0xBBEcbeA855f6dACAcaDfdc9107b69D1a470B6d54',
  '0x3F7C14E402fcC3864D6e1aE1C4747ff1805D0512',
  '0xCb433105E076CF42FFAAb1e37e03755287f42DD5',
  '0x7037ec4303dd82ae3c57e37774372591a6d64093',
  '0x905f7a234e28F7B8a47F76B5966061C63C78C8a2',
  '0x65489C0A3b956328A65096988A389fbDD2Dd7e63',
  '0xdcf73c3e4afacf85fa3f75449da14b6ea95a4806',
  '0x3bb60eddda61b8660baa64014ea75d3954d91938',
  '0x39eC6C8027538bEe5Ef64DF6ae2BB4453b4A666c',
  '0x31616764d202bbb17ada860884c9091a92ecae4e',
  '0xbF81b2728aB3f9c1be98c0288ECC0150bF679Fa2',
  '0x0000088605cDdC056Afb18c2db6692D3c4B33eB4',
  '0x112DE0d91a911a56313024B5543BE78cb859aB72',
  '0x7E7C65c3c0FF7b87946655ecbBfbc7af5239700e',
  '0xb2bAb398b9772e0AA7230042a1D39a0694bd7FbA',
  '0xfaa6b114d51bc711589262eebbae4ac798234198',
  '0xcDFb02a11E3D8473Ca11bdA5f2403674192d745C',
  '0x747Aceaa15Ad2Fc1D51B1bb0cC596e7193AE741b',
  '0xB7077251cfD03B188e4BDB97435763f428EAB27f',
  '0x5eda210c390e05d1235835e7d4a511780084b000',
  '0x8B9DE4fcA99D4C95C909A225945497B18C49cD16',
  '0x3EFf5ceDc6Bc976d24B58383f47415253AFD9052',
  '0x3094E92dA20e05b1DC4EB68a0970ad8D23A90B33',
  '0xEe80b0c19AB5f83A149639b8C87df4D18865dfB9',
  '0x8270298Caf64dE076Cb632CDcfDaa80257559D6D',
  '0x5f64e6ae87c8a35d57f045129f1c90b2aad4d9a6',
  '0x64BD67BC509F61D5Ee8cA63b2E90aA8A9e2F6b86',
  '0x9621de4630a891cd494d316dc7a3099b0dcf5474',
  '0xfd80bb57b05ac53916679c1b40e126d6daab2f7a',
  '0x65B89b987AbA2f4489E786da3D2AA29B769bD910',
  '0x9B04fce1ECB14efA25d41b43Ed38dBbB57a32738',
  '0xe169ed3d5bd2fe7a76928b217047644ea9d736de',
  '0xD3377c07bc6f8d382b106Eb2d6722a69feC2887A',
  '0x4aF468EC0C69A043E41e444a6A3f4981DAd776dA',
  '0x64fe5a59d07834e15e22ac1020811a94ba080e20',
  '0x900ab1129a3b983F521A9fB6e248366B1409FB19',
  '0x52912fba2e24d83a90D0fe49F3708026082717e5',
  '0x15d95d0Cc6EEB9C8062A4D96B8547CC6ECe2C579',
  '0x7C2910f47C049484Bf11d87992734713ceA7c896',
  '0xa28ba0d8fefed47fc1accef68faeba3804309480',
  '0x05d89702Ad4b1C8B816E658Ec40b148342c614d4',
  '0x117f1389Dee487F50Ca3480Ba7AdB2D214B9117e',
  '0x887804bD3c919afFD7de5f33778124374dD1A289',
  '0x4447e0a889fa3703b7f91430df34ad7caf152187',
  '0xb7cc24f9ABA08c00bd620Af3D7f9496F2ddCB8Bc',
  '0xA84b32b9Dc28b6AeC1a8F474eB60F3865082D215',
  '0x2350c7fB06933B09f882081BA629e795952356cf',
  '0x8fada3b0d786b6659d82d9c05028426395852650',
  '0x7e59c2E03a87Cf422B862bCe00cc76AB2C4E8a2c',
  '0x212b18f340DEAB8A5C4fa01fF88d0df8C58301df',
  '0xA8525858c72C67Ec30290793095C26AB7E9A4721',
  '0x4A7de5ed0E8C422D98F732482EF307a1a0C3022A',
  '0xA8E45CaF77431182127C8DF10DA2E0D59bF9c507',
  '0x7890dE1c91fd2e1F1BD9fb96c30114Cf93CCECA8',
  '0xf8f5aF3c759EF3ebED83fbE971B2a233F51e517c',
  '0x19E06e9bd4b7252547B131dbb015dF091FE195d9',
  '0x6946FF357fE2625dc928701e6e22cF950Cf3054E',
  '0xaB0671D6C3d789Bf926F66be691f6a1Bdb70562A',
  '0xfCc29E31cf38A3C536E440D9c23C8D137325Addb',
  '0xFa2E79c83A4681C22e02780367f093b75B76FCf2',
  '0x997101c7660db0c2ea36583e6341db23b6beeea1',
  '0x1bA0faC06683E4CeE5720440B3f0b37a8bAB1575',
  '0x2c808c70923176650d86e9CcA4a4E863cb4F8c62',
  '0x1681f6dab7Cf97F3434908dF9d05Eb7895Ad3E53',
  '0x9b850a64Dfd7aDc0aB718Fa1906561118EB4f497',
  '0xcC2CeA353dfcB77Ff48EA9F4FB97863e9d69470c',
  '0x1Ed578007756646B4152d330ae137282233AF06d',
  '0x6f6A09D781FA217aDe765ACa417961544ee57ed0',
  '0x8DFEDB1F62820222eC8Ff4D68dDcD86b71116D37',
  '0x541Aa4259b2a63048DbD0168e67dD3A1f67a282B',
  '0x47339b7c1fd2fe6dfa959485ca6a3a6e9b383b98',
  '0x3600dd43b4f589ce48e707846d33bfb3cee24cfd',
  '0x05bCCc082Af0c969389677A865A5Bc4570Cb0a23',
  '0xE92621a0502b3EdDf2240089D0703C398B5b85c7',
  '0xF7A8B58E1e13C0b58797b7D5FF629f3684DEbcd5',
  '0x404289fE9e860585b867537C91BE231225F69d11',
  '0xb14bFa1ffA3311Ae0901422FA6566B627Afc2d7b',
  '0xf09310b47cC796Ad7f5c8eA8cf2DEf2188178FA8',
  '0x77cEeB34Df72740D9C2cC848F9C7D61720E85A0A',
  '0xDc7d0b3B85eA9232161F3d52E66EAf20ed59964E',
  '0x75b5E4771A20Beb4b2441a8909347d2997332C7b',
  '0x9df5b07e22094c00188c27f3859fecd3428eb17d',
  '0x29cDBeb50b71E085e6255ec716d23527f0044E60',
  '0x000000f7045a8d8f9cf65ae929985bf2cfae2775',
  '0x40536224ef670cA321D5ddE316061A5625C05137',
  '0x06A4D2d2146a027542b7E83C14aeD637b8EBfF84',
  '0xD5Ac2c18ABf6935FFA1FCE042734F91aa78d5C7e',
  '0x754f459FDAB3BA00b72845EDE35101695E519a2',
  '0x111114763659874226785ab7b7dF9E1364Be8332',
  '0x296432b218EcdE0C869D8461b323C6FA2c7392eb',
  '0xbe60cAeF7638612492fEB5B8122A38717ba7b926',
  '0xa3a71c1b7f87573f9b121e5b19fc2ebce4085cf1',
  '0x000000006F457c0f8F560333d9c2877287d92a92'
];

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt user for private key
function promptPrivateKey() {
  return new Promise((resolve) => {
    rl.question('Please enter your private key: ', (answer) => {
      if (answer.startsWith('0x') && answer.length === 66) {
        console.log('Private key accepted.');
        resolve(answer);
      } else {
        console.log('Invalid private key. It should be 64 characters long with "0x" prefix (66 total). Try again.');
        resolve(promptPrivateKey());
      }
    });
  });
}

// Function to send 0.001 TEA to a recipient address with retry logic
async function sendTea(signer, recipientAddress, amountToSendWei, gasReservedWei, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const balance = await signer.provider.getBalance(signer.address);
      const totalCostWei = amountToSendWei + gasReservedWei;

      if (balance < totalCostWei) {
        throw new Error(`Insufficient balance: ${ethers.formatEther(balance)} TEA (required: ${ethers.formatEther(totalCostWei)} TEA)`);
      }

      const nonce = await signer.provider.getTransactionCount(signer.address, 'pending');
      const feeData = await signer.provider.getFeeData();
      const gasPrice = feeData.maxFeePerGas || ethers.parseUnits('20', 'gwei'); // Higher default gas price
      const gasLimit = 21000n;
      const estimatedGasCost = gasPrice * gasLimit;

      if (estimatedGasCost > gasReservedWei) {
        console.warn(`Warning: Estimated gas cost (${ethers.formatEther(estimatedGasCost)} TEA) exceeds reserved 0.1 TEA for ${recipientAddress}.`);
      }

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountToSendWei,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        chainId: chainId,
        nonce: nonce,
      });

      console.log(`Sending 0.001 TEA to ${recipientAddress} (Attempt ${attempt + 1}/${maxRetries})`);
      console.log(`Transaction hash: ${explorerBaseUrl}${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`Transaction confirmed: ${explorerBaseUrl}${receipt.transactionHash}`);
      return true; // Success
    } catch (error) {
      attempt++;
      console.error(`Failed to send to ${recipientAddress} (Attempt ${attempt}/${maxRetries}):`, error.message);
      if (error.code === 'TRANSACTION_REPLACED' || error.code === 'REPLACEMENT_UNDERPRICED') {
        console.log('Retrying due to nonce or gas issue...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
      } else if (attempt === maxRetries) {
        console.error(`Max retries reached for ${recipientAddress}. Skipping.`);
        return false; // Failed after retries
      } else {
        console.log('Retrying due to other error...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
      }
    }
  }
  return false;
}

// Main function to process transactions
async function runBot() {
  const privateKey = await promptPrivateKey();
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);

  console.log(`Sender address: ${signer.address}`);
  const balance = await provider.getBalance(signer.address);
  console.log(`Sender balance: ${ethers.formatEther(balance)} TEA`);

  const amountToSendWei = ethers.parseUnits('0.001', 'ether'); // 0.001 TEA
  const gasReservedWei = ethers.parseUnits('0.1', 'ether');    // 0.1 TEA gas fee per transaction
  const totalRequiredWei = (amountToSendWei + gasReservedWei) * BigInt(recipientAddresses.length);
  console.log(`Total required: ${ethers.formatEther(totalRequiredWei)} TEA for ${recipientAddresses.length} transactions`);

  if (balance < totalRequiredWei) {
    console.error(`Insufficient funds. Required: ${ethers.formatEther(totalRequiredWei)} TEA, Available: ${ethers.formatEther(balance)} TEA`);
    rl.close();
    return;
  }

  const batchSize = 5; // Process 5 addresses at a time
  for (let i = 0; i < recipientAddresses.length; i += batchSize) {
    const batch = recipientAddresses.slice(i, i + batchSize);
    // Process each address in the batch sequentially to avoid nonce conflicts
    for (const address of batch) {
      await sendTea(signer, address, amountToSendWei, gasReservedWei);
    }
    console.log('Waiting 2 seconds before next batch...');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('All transactions completed.');
  rl.close();
}

// Run the bot
runBot().catch((error) => {
  console.error('Bot encountered an error:', error);
  rl.close();
});
