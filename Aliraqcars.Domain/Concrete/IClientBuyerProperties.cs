using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Aliraqcars.Domain.Concrete
{
    public class IClientBuyerProperties
    {
        public List<IBuyers> Buyers { get; set; }
        public List<IClients> Clients { get; set; }
    }
}
