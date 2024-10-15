'use server'

import { fetchWrapper } from "@/app/lib/fetchWrapper";
import { Auction, Bid, PageResult } from "@/types";
import { revalidatePath } from "next/cache";
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

export async function getDetailedViewData(id: string): Promise<Auction> {
    try {
      return await fetchWrapper.get(`auctions/${id}`);
    } catch (error) {
      console.error('Error fetching auction details:', error);
      throw error;  // Wyrzuć błąd, jeśli chcesz go dalej obsłużyć
    }
  }

export async function UpdateAuction(data:FieldValues, id: string) {
  const res = await fetchWrapper.put(`auctions/${id}`, data);
  revalidatePath(`/auctions/details/${id}`);
  return res;
}

export async function deleteAuction(id: string){
  return await fetchWrapper.del(`auctions/${id}`);
}

export async function getBidsForAuction(id: string): Promise<Bid[]>{
  return await fetchWrapper.get(`bids/${id}`);
}

export async function placeBidForAuction(auctionId: string, amount: number){
  return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {});
}