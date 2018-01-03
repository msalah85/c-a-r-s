using System;
using System.Linq;
using System.Text;
using System.Collections;
using Aliraqcars.Domain.Data;
using System.Collections.Generic;

namespace Aliraqcars.Domain.Business
{
    public class ModelManager
    {

        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "Read Methods"

        public IList<sp_car_type_SelectNamesResult> GetModelsNames(int makerID)
        {
            return ctxRead.sp_car_type_SelectNames(makerID).ToList();
        }

        public sp_car_type_SelectRowResult GetModelDetails(int _Id)
        {
            return ctxRead.sp_car_type_SelectRow(_Id).FirstOrDefault();
        }

        public IList<sp_car_type_SelectRowResult> GetModels(string param)
        {
            string sqlstr = @"Select 
		[id],
		[maker_id],
		(SELECT TOP 1 m.maker_name FROM maker m where m.id = maker_id) AS [maker_name],
		[type_name],
		[car_year],
		[delete_result]
	From car_type WHERE 0 = 0 " + param;
            return ctxRead.ExecuteQuery<sp_car_type_SelectRowResult>(sqlstr).ToList();
        }


        #endregion

        #region "Write Methods"

        public bool SaveModel(car_type item)
        {
            try
            {
                ctxWrite.sp_car_type_Update(item.id, item.maker_id, item.maker_name, item.type_name,
                    item.car_year, item.delete_result);
                return true;
            }
            catch { return false; }
        }

        public int DeleteModel(int Id)
        {
            try
            {
                return (int)ctxWrite.sp_car_type_DeleteRow(Id).FirstOrDefault().ChildRows;
            }
            catch { return -1; }
        }

        #endregion

    }
}