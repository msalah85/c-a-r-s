using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Aliraqcars.Domain.Concrete
{
    public class ICarSaleInvoiceProperties
    {
        public List<IClients> Clients { get; set; }
        public List<IDistinations> Distinations { get; set; }
        public List<IChassisNo> ChassisNo { get; set; }
        public List<ILotNo> LotNo { get; set; }
    }

    public class IClients
    {
        public int ClientID { get; set; }
        public string full_name { get; set; }
    }

    public class ILotNo
    {
        public long CarID { get; set; }
        public string LotNo { get; set; }
    }

}
