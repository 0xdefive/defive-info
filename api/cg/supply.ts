import { VercelRequest, VercelResponse } from "@vercel/node";
import { getLockedSupply, getTotalSupply } from "../../utils/supply";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {

  let totalSupply = await getTotalSupply();
  totalSupply = totalSupply.div(1e18);

  let lockedSupply = await getLockedSupply();
  lockedSupply = lockedSupply.div(1e18);

  let totalBurned = 0;

  const circulatingSupply = totalSupply.minus(lockedSupply);

  res.json({
    totalSupply: totalSupply.toNumber(),
    burnedSupply: totalBurned,
    circulatingSupply: circulatingSupply.toNumber(),
  });
};
