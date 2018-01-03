using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Concrete
{
    public class ICustomInvoices
    {
        public List<CustomsInvoices_PropertiesResult> CustomCompanies { get; set; }
        public List<IContainerNo> Containers { get; set; }
    }
}