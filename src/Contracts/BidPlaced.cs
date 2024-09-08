using System;

namespace Contracts;

public class BidPlaced
{
    public string id { get; set; }
    public string AuctionId { get; set; }
    public string Bidder { get; set; }
    public DateTime BidTime { get; set; }
    public string BidStatus { get; set; }
}
