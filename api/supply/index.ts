import { VercelRequest, VercelResponse } from "@vercel/node";
import { getLockedSupply, getMaxSupply, getTotalSupply } from "../../utils/supply";

import formatNumber from "../../utils/formatNumber";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  let totalSupply = await getTotalSupply();
  totalSupply = totalSupply.div(1e18);

  let lockedSupply = await getLockedSupply();
  lockedSupply = lockedSupply.div(1e18);

  let totalBurned = 0;

  let maxSupply = await getMaxSupply();
  maxSupply = maxSupply.div(1e18);


  const circulatingSupply = totalSupply.minus(lockedSupply);

  if (req.query?.q === "totalSupply") {
    res.json(totalSupply.toNumber());
  } else if (req.query?.q === "circulatingSupply") {
    res.json(circulatingSupply.toNumber());
  } else if (req.query?.verbose) {
    res.json({
      totalSupply: formatNumber(totalSupply.toNumber()),
      circulatingSupply: formatNumber(circulatingSupply.toNumber()),
      lockedSupply: formatNumber(lockedSupply.toNumber()),
      maxSupply: formatNumber(maxSupply.toNumber()),
    });
  } else {
    res.json({
      totalSupply: totalSupply.toNumber(),
      burnedSupply: totalBurned,
      circulatingSupply: circulatingSupply.toNumber(),
    });
  }
};
