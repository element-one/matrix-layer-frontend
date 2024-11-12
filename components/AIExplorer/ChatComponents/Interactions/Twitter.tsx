import { Tweet } from 'react-tweet'

interface ITwitter {
  id: string
}

export default function Twitter({ id }: ITwitter) {
  return <Tweet id={id} />
}
