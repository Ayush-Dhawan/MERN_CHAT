import React from 'react'
import './Conversation.css'

export default function Conversation() {
  return (
    <div className='w-full h-16 flex items-center justify-start p-2 m-2 rounded-lg convo'>
        <div className="avatar online">
            <div className="w-12 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>

        <div className='ml-4'>
            <span>Username</span>
        </div>
    </div>
  )
}
