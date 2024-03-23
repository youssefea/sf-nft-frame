export const runtime = 'edge'
import { URL } from '../constants'

const image = "https://i.imgur.com/EF7kCQW.jpeg"
const buttonText = 'mint'

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
  
    'fc:frame:button:1': buttonText,
    'fc:frame:button:1:action': 'mint',
    'fc:frame:button:1:target': 'eip155:8453:0x5deeee4d0ec3a7ad968529c9ae6aeb6d6930e4ff',
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