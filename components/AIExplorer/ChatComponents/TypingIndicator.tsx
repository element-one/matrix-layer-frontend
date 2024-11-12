import React from 'react'
import { Avatar } from '@nextui-org/react'

interface TypingIndicatorProps {
  chatLoading: boolean
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ chatLoading }) => {
  const typingDotStyle = {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    margin: '0 2px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    animation: 'typing 1.5s infinite ease-in-out'
  }

  return (
    <div>
      {chatLoading ? (
        <>
          <div className='max-w-[800px] w-[80%] flex flex-col gap-y-1 mt-8'>
            <div className='flex gap-x-5'>
              <Avatar className='w-6 h-6 shrink-0' />
              <div className='whitespace-normal rounded-[24px] px-6 py-4 markdown-body'>
                <div className='flex items-center'>
                  <div style={{ ...typingDotStyle, animationDelay: '0s' }} />
                  <div style={{ ...typingDotStyle, animationDelay: '0.3s' }} />
                  <div style={{ ...typingDotStyle, animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <style>
        {`
          @keyframes typing {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
              opacity: 1;
            }
            40% {
              transform: translateY(-4px);
              opacity: 0.5;
            }
            60% {
              transform: translateY(-2px);
              opacity: 0.75;
            }
          }
        `}
      </style>
    </div>
  )
}

export default TypingIndicator
