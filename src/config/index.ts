export const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 10000
  },
  auth: {
    tokenKey: 'token',
    tokenPrefix: 'Bearer'
  },
  web3: {
    networkId: process.env.REACT_APP_NETWORK_ID || '1',
    rpcUrl: process.env.REACT_APP_RPC_URL || 'https://mainnet.infura.io/v3/your-project-id',
    contracts: {
      usdc: process.env.REACT_APP_USDC_CONTRACT || '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    }
  }
};