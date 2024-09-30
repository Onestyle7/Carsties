'use server'

import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { Auction, PageResult } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PageResult<Auction>>{
    return await fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest(){
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1
    }

    return await fetchWrapper.put('auctions/1', data);

}

export async function createAuction(data: FieldValues){
    return await fetchWrapper.post('auctions', data);
}