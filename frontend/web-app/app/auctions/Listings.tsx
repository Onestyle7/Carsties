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


export default function Listings() {
    const [data, setData] = useState<PageResult<Auction>>();
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm
    })));

    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params});

    function setPageNumber(pageNumber: number){
        setParams({pageNumber: pageNumber});
    }

    useEffect(() => {
        getData(url).then(data => {
           setData(data);
        })
    }, [url])

    if(!data) return <h3>Loading...</h3>
       

    return (
        <>
        <Filters />

        <div className='grid grid-cols-4 gap-6'>
            {data.results.map((auction: any) =>(
                <AuctionCard auction={auction} key={auction.id}/>
            ))}
        </div>
        <div className='flex justify-center mt-4'>
            <AppPagination pageChange={setPageNumber}
             currentPage={params.pageNumber} pageCount={data.pageCount}/>
        </div>
        </>
        
    ) 
}
