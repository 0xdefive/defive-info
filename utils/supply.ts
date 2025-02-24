import BigNumber from "bignumber.js";
import { getContract } from "./web3";
import five from "./abis/five.json";
import masterFarmer from "./abis/masterfarmer.json";


const FIVE = "0xb0695ce12c56AAe40894235e2d1888D0b62Dd110";
const MASTER_FARMER = "0x4aDe5608127594CD9eA131f0826AEA02FE517461";

const fiveContract = getContract(five, FIVE);
const masterFarmerContract = getContract(masterFarmer, MASTER_FARMER);


export const getTotalSupply = async (): Promise<BigNumber> => {
  const supply = await fiveContract.methods.totalSupply().call();

  return new BigNumber(supply);
};

export const getLockedSupply = async (): Promise<BigNumber> => {
  const lockedSupply = await masterFarmerContract.methods.totalLockedAmount().call();

  return new BigNumber(lockedSupply);
};

export const getTotalBurned = async (): Promise<BigNumber> => {
  const burnedSupply = await fiveContract.methods.totalBurned().call();

  return new BigNumber(burnedSupply);
};

export const getMaxSupply = async (): Promise<BigNumber> => {
  const maxSupply = await fiveContract.methods.maxSupply().call();

  return new BigNumber(maxSupply);
};