import ConsultationForm from '@/sections/ConsultationForm'
import ConsultationHero from '@/sections/hero/ConsultationHero'
import React from 'react'

const ConsultationPage = () => {
  return (
    <main className="mt-16 bg-[radial-gradient(circle_at_top,#00f2ff,#09007d)]">
      <ConsultationHero />
      <ConsultationForm />
    </main>
  )
}

export default ConsultationPage
