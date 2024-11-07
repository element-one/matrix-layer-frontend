import ConversationComponent from '@components/AIExplorer/ConversationComponent'
import Sidebar from '@components/AIExplorer/Sidebar'
import { Container } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'

const AIExplorer = () => {
  return (
    <Layout className='flex justify-center'>
      <Container
        className='w-[1310px] max-auto h-[100vh] flex justify-center gap-x-8 py-[200px]
          overflow-hidden'
      >
        <Sidebar />
        <ConversationComponent />
      </Container>
    </Layout>
  )
}

export default AIExplorer
