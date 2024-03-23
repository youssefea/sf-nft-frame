export const runtime = 'edge'
import { URL } from '../constants'

const image = "https://i.imgur.com/EF7kCQW.jpeg"
const buttonText = 'Check your number'

export default function Home() {
  return (
    <div>
      <a href="https://nader.codes" target="_blank" rel="no-opener">
      <img
        src={image}
        width={400}
        height={400}
        alt='Hello world.'
      />
      </a>
    </div>
  );
}

export async function generateMetadata() {
  const meta = {
    'og:image': image,
    'fc:frame': 'vNext',
    'fc:frame:image': image,
    'fc:frame:image:aspect_ratio': '1:1',
  
    'fc:frame:post_url': `https://zora.co/collect/base:0xf5606b4e3f8bf0b158756ffe4c64a1ea37f77168/1`,
    'fc:frame:button:1': buttonText,
    'fc:frame:button:1:action': 'mint',
    'fc:frame:button:1:target': 'eip155:8453:0xf5a3b6dee033ae5025e4332695931cadeb7f4d2b:1',
  }

  return {
    openGraph: {
      images: [
        {
          url: image,
          width: '1000',
          height: '1000'
        }
      ]
    },
    other: {
      ...meta
    },
  }
}