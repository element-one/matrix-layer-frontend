import Text from './Text'

export const Heading1 = (props: {
  children: React.ReactNode
  className?: string
}) => (
  <Text color='primary' size='bold' as='h1' className={props.className}>
    {props.children}
  </Text>
)

export const Heading2 = (props: {
  children: React.ReactNode
  className?: string
}) => (
  <Text color='primary' size='semibold' as='h2' className={props.className}>
    {props.children}
  </Text>
)

export const Heading3 = (props: {
  children: React.ReactNode
  className?: string
}) => (
  <Text color='primary' size='medium' as='h3' className={props.className}>
    {props.children}
  </Text>
)
