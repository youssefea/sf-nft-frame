import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { followingQuery, walletQuery } from "../api";
import { init, fetchQuery } from "@airstack/node";
import { account, walletClient, publicClient } from "./config";
import ABI from "./abi.json";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK("base", {
  secretKey: process.env.THIRD_WEB_SECRET_KEY,
});

// NFT contract address on Base
const nftAddress = "0x0eBdE67d2DBcf18b66B9b2d6Fa563c56f0e8b834";
const cfaAddress = "0xcfA132E353cB4E398080B9700609bb008eceB125";
const tokenAddress = "0x1efF3Dd78F4A14aBfa9Fa66579bD3Ce9E1B30529";

init(process.env.AIRSTACK_KEY || "");

let image;

const finalImage = "https://i.imgur.com/2LojR00.png";

image = finalImage;

const flowRate = 3272450500000;

const _html = (img, url) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Frame</title>
    <meta property="og:image" content="${img}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${img}" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:post_url" content="${url}" />
    <meta property="fc:frame:button:1" content="See to Dashboard" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta
      property="fc:frame:button:1:target"
      content="${url}"
    />
  </head>
</html>
`;

const _html2=`
<!DOCTYPE html>
<html>
  <head>
    <title>Frame</title>
    <meta property="og:image" content="https://i.imgur.com/BtnPDqR.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://i.imgur.com/BtnPDqR.png" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:post_url" content="${URL}" />
    <meta property="fc:frame:button:1" content="Retry" />
    <meta property="fc:frame:button:1:action" content="post" />
  </head>
</html>
`;

export async function POST(req) {
  const data = await req.json();

  const { untrustedData } = data;
  const { inputText, fid } = untrustedData;

  const _query2 = walletQuery(fid);
  const { data: results2 } = await fetchQuery(_query2, {
    id: fid,
  });

  const socials = results2.Socials.Social;
  const address = socials[0].userAssociatedAddresses[1];

  if (!address) {
    return new NextResponse(
      _html2
    );
  }
  let nonce = await publicClient.getTransactionCount({  
    address: account.address,
  })
  await walletClient.sendTransaction({
    account,
    data: "0x84bb1e42000000000000000000000000063f6e5967cb3808d675613c926cea0d45bb813c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000080ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    to: nftAddress,
    nonce: nonce,
  });
  nonce++
  const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
  await walletClient.writeContract({
    address: cfaAddress,
    abi: ABI,
    functionName: "setFlowrate",
    account,
    args: [tokenAddress, address, flowRate],
    nonce: nonce,
  });

  return new NextResponse(_html(image,`https://app.superfluid.finance/?view=${address}`));
}

export const dynamic = "force-dynamic";
