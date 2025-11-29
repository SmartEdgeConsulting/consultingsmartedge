import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const DashboardPage = () => {
  return (
   <main className="min-h-screen flex justify-center items-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>DashBoard</CardTitle>
            <CardDescription>

            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Dashboard Content goes here
            </p>

          </CardContent>
        </Card>
      </main>
  )
}

export default DashboardPage
