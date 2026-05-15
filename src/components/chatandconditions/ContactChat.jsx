// ContactChat.jsx
import React, { useState, useRef, useEffect } from 'react'
import { fontSize, fontWeight, fontFamily, textColor } from '../../components/styles/theme'
import SendIcon from '../../assets/icons/send.png'
import HeadIcon from "../../assets/icons/Headset.png"
import ChatPro from "../../assets/icons/chathead.png"
import Wrapper from "../wrapper/Wrapper"

const ContactChat = ({
  title = 'Contact Us',
  subtitle = "We're here to help! Reach out to us anytime for support, questions, or feedback.",
  initialMessages = [
    { type: 'agent', text: 'Hi! How can we help you today?' }  
  ],
}) => {
  const [messages, setMessages] = useState(initialMessages)
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { type: 'user', text: text.trim() }])
    setText('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'agent',
        text: 'Thanks for reaching out! Our team will get back to you shortly.',
      }])
    }, 800)
  }

  return (
    <Wrapper>  
      <div className={`flex flex-col ${fontFamily.main} bg-white px-20 py-10 rounded-[20px]`}>

        {/* Header */}
        <h1 className={`${fontSize['2xl']} ${fontWeight.semibold} ${textColor.primary}`}>{title}</h1>
        <p className={`${fontSize.sm} ${textColor.secondary} mt-1 mb-6 max-w-[320px] leading-relaxed`}>{subtitle}</p>

        {/* Messages */}
        <div className='flex flex-col gap-5 min-h-70 mb-6 overflow-y-auto'>
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-end gap-2.5 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

           
              {/* Avatar */}
<div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden
  ${msg.type === 'agent' ? 'bg-gray-100' : 'bg-[#e8eeff]'}`}>
  <img
    src={msg.type === 'agent' ? HeadIcon : ChatPro}
    alt={msg.type}
    className={`${msg.type === 'agent' ? 'w-4 h-4 brightness-0 opacity-50' : 'w-8 h-8 object-cover rounded-full'}`}
  />
</div>

              {/* Bubble */}
              <div className={`max-w-[72%] px-4 py-3 text-sm leading-relaxed ${textColor.primary}
                bg-gray-100 rounded-2xl
                ${msg.type === 'agent' ? 'rounded-bl-sm' : 'rounded-br-sm'}`}>
                {msg.text}
              </div>

            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className='flex items-center gap-2.5 w-full max-w-175 mx-auto bg-gray-200 rounded-xl px-4 py-2.5'>
          <input
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send() }}
            placeholder='Text'
            className={`flex-1 border-none outline-none bg-transparent text-sm ${fontFamily.main} ${textColor.primary} placeholder:text-gray-300`}
          />
          <button
            onClick={send}
            className='w-10 h-10 rounded-[10px] bg-[#05062F] flex items-center justify-center cursor-pointer hover:bg-[#1a2352] transition shrink-0'
            aria-label='Send message'
          >
            <img src={SendIcon} alt='' className='w-4 h-4 brightness-0 invert' />
          </button>
        </div>

      </div>
    </Wrapper>
  )
}

export default ContactChat