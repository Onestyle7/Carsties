'use client'

import { Button } from 'flowbite-react'
import React from 'react'

type Props ={
    id: string
}

export default function EditButton({id}: Props) {
  return (
    <Button outline>
        <a href={`/auctions/update/${id}`}>Update Auction</a>
    </Button>
)
}
