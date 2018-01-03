using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class RegionsManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public Regions_SelectRowResult GetRegion(int Id)
        {
            return ctxWrite.Regions_SelectRow(Id).FirstOrDefault();
        }

        public List<Regions_SelectRowResult> GetRegions(string param)
        {
            string sqlstr = string.Format(@"SELECT * FROM [Regions] WHERE 1=1 {0} ORDER BY RegionID DESC", param);
            return ctxWrite.ExecuteQuery<Regions_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveRegion(Region item)
        {
            try
            {
                ctxWrite.Regions_InsertUpdate(item.RegionID, item.RegionEn, item.RegionAr,
                    item.CostforRegion, item.RegionDescEn, item.RegionDescAr, item.Priority,
                    item.Active, item.RegionCommissionJor);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.Regions_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}
