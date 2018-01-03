using System;
using System.Collections.Generic;
using System.Linq;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class ModelsManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public CarsModel_SelectRowResult GetCarModel(int Id)
        {
            return ctxWrite.CarsModel_SelectRow(Id).FirstOrDefault();
        }

        public List<CarsModel_SelectRowResult> GetCarModels(string param)
        {
            string sqlstr = string.Format(@"SELECT * FROM View_CarModels WHERE 1=1 {0} ORDER BY ModelID DESC", param);
            return ctxWrite.ExecuteQuery<CarsModel_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveItem(CarsModel item)
        {
            try
            {
                ctxWrite.CarsModel_InsertUpdate(item.ModelID, item.MakerID, item.TypeNameEn, item.TypeNameAr, item.CarSizeID, item.Active);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.CarsModel_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}