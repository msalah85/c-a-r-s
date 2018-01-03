using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Concrete
{
    public class IBuyerAssest
    {
        public List<Auctions_SelectNamesResult> Auctions { get; set; }
        public List<Clients_SelectNamesResult> Clients { get; set; }
        public List<AuctionsTypes_SelectNamesResult> AuctionTypes { get; set; }
    }
}
