import { NextResponse } from "next/server";
import { init, fetchQuery } from "@airstack/node";

import {
  checkIsFollowingFarcasterUser,
  CheckIsFollowingFarcasterUserInput,
  CheckIsFollowingFarcasterUserOutput,
} from "@airstack/frames";

const URL =
  process.env.ENVIRONMENT === "local"
    ? process.env.LOCALHOST
    : process.env.PROD_URL;

init(process.env.AIRSTACK_KEY || "");

const USDCxAddress = process.env.SUPER_TOKEN_ADDRESS as `0x${string}`;

const notFollowingImage = "https://i.imgur.com/noMwIia.png";
const nftImage = "https://i.imgur.com/JTEZZ1C.png";

const _html = (img, msg, action, url,ratio) => `
<!DOCTYPE html>
<html>
  <head>
    <title>Frame</title>
    <mega property="og:image" content="${img}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${img}" />
    <meta property="fc:frame:image:aspect_ratio" content="${ratio}:1" />
    <meta property="fc:frame:button:1" content="${msg}" />
    <meta property="fc:frame:button:1:action" content="${action}" />
    <meta property="fc:frame:button:1:target" content="${url}" />
    <meta property="fc:frame:post_url" content="${url}" />
  </head>
</html>
`;
export async function POST(req) {
  const data = await req.json();

  const { untrustedData } = data;
  const { fid } = untrustedData;

  const input: CheckIsFollowingFarcasterUserInput = {
    fid: fid,
    isFollowing: [315653],
  };
  const { data: data1, error: error1 }: CheckIsFollowingFarcasterUserOutput =
    await checkIsFollowingFarcasterUser(input);

  if (data1 != null && !data1[0].isFollowing) {
    return new NextResponse(
      _html(notFollowingImage, "Retry", "post", `${URL}`,"1.91")
    );
  }


  return new NextResponse(
    _html(
      nftImage,
      "Mint",
      "post",
      `${URL}/check`,
      "1"
    )
  );
}

export const dynamic = "force-dynamic";
