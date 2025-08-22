import { ethers } from 'ethers'
import ABI from '../abi/BookNFT.json'

// Replace after deploy
export const CONTRACT_ADDRESS = '0xYourDeployedAddress'

export function getProvider() {
  if (typeof window === 'undefined' || !window.ethereum) return null
  return new ethers.providers.Web3Provider(window.ethereum)
}

export function getSigner() {
  const provider = getProvider()
  if (!provider) return null
  return provider.getSigner()
}

export function getContract() {
  const signer = getSigner()
  if (!signer || !CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0xYourDeployedAddress') return null
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
}

export function parseDataUriJson(dataUri) {
  if (!dataUri || typeof dataUri !== 'string') return null
  const prefix = 'data:application/json;base64,'
  if (!dataUri.startsWith(prefix)) return null
  const jsonStr = atob(dataUri.slice(prefix.length))
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}


