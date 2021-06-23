const BN = require('bn.js');
const fs = require('fs');
const moment = require('moment');
const Web3 = require('web3');

process.on('unhandledRejection', console.error.bind(console));

const rpcUrl = 'https://mainnet.infura.io/v3/39ed2671c2df4fd786e16fdc7e2749ec';
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

const KyberNetworkProxyABI = [{"constant":false,"inputs":[{"name":"alerter","type":"address"}],"name":"removeAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"},{"name":"hint","type":"bytes"}],"name":"tradeWithHint","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAlerter","type":"address"}],"name":"addAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kyberNetworkContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserCapInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapEtherToToken","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAlerters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"getExpectedRate","outputs":[{"name":"expectedRate","type":"uint256"},{"name":"slippageRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"getUserCapInTokenWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kyberNetworkContract","type":"address"}],"name":"setKyberNetworkContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"field","type":"bytes32"}],"name":"info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"trader","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"actualSrcAmount","type":"uint256"},{"indexed":false,"name":"actualDestAmount","type":"uint256"}],"name":"ExecuteTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newNetworkContract","type":"address"},{"indexed":false,"name":"oldNetworkContract","type":"address"}],"name":"KyberNetworkSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAdmin","type":"address"},{"indexed":false,"name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAlerter","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"AlerterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOperator","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"OperatorAdded","type":"event"}]
const KyberNetworkProxyAddress = '0x9AAb3f75489902f3a48495025729a0AF77d4b11e';
const NetworkProxyInstance = new web3.eth.Contract(KyberNetworkProxyABI, KyberNetworkProxyAddress);



const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';


async function checkPair(args) {
    const {inputAmount,
    expectedRate,slippageRate } = args
    //const uniswapResult = await exchangeContract.methods.getEthToTokenInputPrice(inputAmount).call()
    console.table([{
      'Input Token': 'USDT',
      'Output Token': 'DAI',
      'Input Amount': web3.utils.fromWei(inputAmount, 'Ether'),
      //'Uniswap Return': web3.utils.fromWei(uniswapResult, 'Ether'),
     'Kyber Expected Rate': expectedRate,
      'Kyber Min Return': slippageRate,
    }])
  }

  let priceMonitor
  let monitoringPrice = false
  
  async function monitorPrice() {
    if(monitoringPrice) {
      return
    }
    monitoringPrice = true
    let expectedRate;
    let slippageRate;
    ({ expectedRate,slippageRate } = await NetworkProxyInstance.methods.getExpectedRate(
        ETH_ADDRESS, // srcToken
        DAI_ADDRESS, // destToken
        web3.utils.toWei('1', 'ETHER'), // srcQty
      ).call())
     
    try {
  
      // ADD YOUR CUSTOM TOKEN PAIRS HERE!!!
      await checkPair({inputAmount: '1',
      expectedRate:web3.utils.fromWei(expectedRate,'ether'),
      slippageRate:web3.utils.fromWei(slippageRate,'ether')
    })
    }
    catch (error) {
        console.error(error)
        monitoringPrice = false
        clearInterval(priceMonitor)
        return
      }
    
      monitoringPrice = false
    }
    
    // Check markets every n seconds
    
    priceMonitor = setInterval(async () => { await monitorPrice() }, 10000)



/*async function main() {
  let expectedRate;
  let slippageRate;
  let x;
  stdlog('- START -');
  stdlog(`KyberNetworkProxy (${KyberNetworkProxyAddress})`);

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.methods.getExpectedRate(
    ETH_ADDRESS, // srcToken
    DAI_ADDRESS, // destToken
    web3.utils.toWei('1', 'ETHER'), // srcQty
  ).call());

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.methods.getExpectedRate(
    ETH_ADDRESS, // srcToken
    DAI_ADDRESS, // destToken
    web3.utils.toWei('1', 'ETHER'), // srcQty
  ).call());
  console.log(web3.utils.fromWei(expectedRate,'ether'))
  stdlog(`ETH <-> DAI getExpectedRate() = expectedRate: ${(web3.utils.fromWei(expectedRate,'ether'))}, slippageRate:${(web3.utils.fromWei(expectedRate,'ether'))}`);

  ({ expectedRate, slippageRate } = await NetworkProxyInstance.methods.getExpectedRate(
    DAI_ADDRESS, // srcToken
    ETH_ADDRESS, // destToken
    web3.utils.toWei('1', 'ETHER'), // srcQty
  ).call());

  //console.log(web3.utils.fromWei(expectedRate,'ether'))
  stdlog(`DAI <-> ETH getExpectedRate() = expectedRate: ${(web3.utils.fromWei(expectedRate,'ether'))}, slippageRate:${(web3.utils.fromWei(expectedRate,'ether'))}`)

  stdlog('- END -');
}

// Start the script
main();*/