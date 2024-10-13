'use client'

import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PageResult } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../Actions/auctionActions';
import Filters from './Filters';
import { useParams } from 'next/navigation';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useShallow } from 'zustand/react/shallow';
import qs from 'query-string';
import { url } from 'inspector';
import EmptyFilter from '../components/EmptyFilter';
import { WiMoonNew } from 'react-icons/wi';
import { shallow } from 'zustand/shallow';
import { useAuctionStore } from '@/hooks/useAuctionStore';


export default function Listings() {
    const [loading, setLoading] = useState(true);
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner
    })));

    const data = useAuctionStore(useShallow(state => ({
        auctions: state.auctions,
        totalCount: state.totalCount,
        pageCount: state.pageCount
    })))

    const setData = useAuctionStore(state => state.setData);
    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params});

    function setPageNumber(pageNumber: number){
        setParams({pageNumber: pageNumber});
    }

    useEffect(() => {
        getData(url).then(data => {
           setData(data);
           setLoading(false);
        })
    }, [url])

    if(loading) return <h3>Loading...</h3>
       

    return (
        <>
        <Filters />
        {data.totalCount === 0 ? (
            <EmptyFilter showReset/>
        ) : (
            <>
             <div className='grid grid-cols-4 gap-6'>
            {data.auctions.map((auction: any) =>(
                <AuctionCard auction={auction} key={auction.id}/>
            ))}
            </div>
            <div className='flex justify-center mt-4'>
                <AppPagination pageChange={setPageNumber}
                currentPage={params.pageNumber} pageCount={data.pageCount}/>
            </div>
            </>
        )}
       
        </>
        
    ) 
}
