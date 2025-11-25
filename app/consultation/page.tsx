import ConsultationForm from '@/sections/ConsultationForm'
import ConsultationHero from '@/sections/hero/ConsultationHero'
import React from 'react'

const ConsultationPage = () => {
  return (
    <main className="mt-16 ">
      <ConsultationHero />
      <ConsultationForm />
    </main>
  )
}

export default ConsultationPage
