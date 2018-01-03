using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class MakersManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        #endregion

        #region "Read Methods"

        public CarsMaker_SelectRowResult GetCarMaker(int Id)
        {
            return ctxWrite.CarsMaker_SelectRow(Id).FirstOrDefault();
        }

        public List<CarsMaker_SelectRowResult> GetCarMakers(string param)
        {
            string sqlstr = string.Format(@"SELECT * FROM [CarsMaker] WHERE 1=1 {0} ORDER BY MakerID DESC", param);
            return ctxWrite.ExecuteQuery<CarsMaker_SelectRowResult>(sqlstr).ToList();
        }

        public List<CarsMaker_SelectNameResult> GetMakers()
        {
            return ctxWrite.CarsMaker_SelectName().ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveCarMaker(CarsMaker item)
        {
            try
            {
                ctxWrite.CarsMaker_InsertUpdate(item.MakerID, item.MakerNameEn, item.MakerNameAr, item.Priority, item.Active);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.CarsMaker_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}