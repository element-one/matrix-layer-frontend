import ChatBox from './ChatBox'
import ScrollArea from './ScrollArea'

const ConversationComponent = () => {
  return (
    <div
      className='w-full h-full border-2 border-[#666] rounded-[32px] flex flex-col
        overflow-hidden'
    >
      <ScrollArea></ScrollArea>
      <ChatBox></ChatBox>
    </div>
  )
}

export default ConversationComponent
