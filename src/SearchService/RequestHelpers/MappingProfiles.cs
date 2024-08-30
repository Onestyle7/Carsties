using System;
using AutoMapper;
using Contracts;

namespace SearchService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<AuctionCreated, Item>();
    }
}
