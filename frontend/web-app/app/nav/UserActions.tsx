import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

export default function UserActions() {
  return (
    <div>
        <Button>
            <Link href='/session'>Session</Link>
        </Button>
    </div>
  )
}
