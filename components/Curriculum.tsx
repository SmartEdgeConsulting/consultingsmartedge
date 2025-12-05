import React from 'react'
import Heading from './Heading'
import { BookOpen } from 'lucide-react'

const Curriculum = () => {
  return (
    <div id="curriculum" className='scroll-mt-18'>
      <Heading title='Our Curriculum' icon={<BookOpen />}/>
    </div>
  )
}

export default Curriculum

