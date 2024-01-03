import Footer from '@/components/Footer';
import '@/styles/globals.css'
import Header from '../components/Header/index';
import "@rainbow-me/rainbowkit/styles.css";
import { useNetwork, useSwitchNetwork } from 'wagmi'

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, bsc, bscTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  // [mainnet, polygon, optimism, arbitrum,bsc],
  [bsc],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})






export default function App({ Component, pageProps }) {
  const { chain } = useNetwork()
  // const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  // const network = useSwitchNetwork({
  //   chainId: 58,
  // })

  return (
    <>
    <WagmiConfig client={wagmiClient}>
  <RainbowKitProvider chains={chains}>
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </RainbowKitProvider>
  </WagmiConfig>
  </>
  )
}
