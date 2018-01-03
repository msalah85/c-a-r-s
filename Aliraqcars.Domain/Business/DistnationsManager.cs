using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class DistnationsManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        
        #endregion

        #region "Read Methods"

        public Distinations_SelectRowResult GetDistination(int Id)
        {
            return ctxWrite.Distinations_SelectRow(Id).FirstOrDefault();
        }

        public List<Distinations_SelectRowResult> GetDistinations(string param)
        {
            string sqlstr = @"SELECT * FROM [Distinations] WHERE 1=1 " + param;
            return ctxWrite.ExecuteQuery<Distinations_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveDistination(Distination item)
        {
            try
            {
                ctxWrite.Distinations_InsertUpdate(item.DistinationID, item.DistinationNameEn, item.DistinationNameAr, item.Active);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.Distinations_DeleteRow(Id);
            }
            catch { return -1; }
        }
        
        #endregion

    }
}
