using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class MarkerManager
    {

        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "Read Methods"

        public IList<sp_maker_SelectNamesResult> GetCarsMarkerNames()
        {
            return ctxRead.sp_maker_SelectNames().ToList();
        }

        public sp_maker_SelectRowResult GetCarsMarkerDetails(int _Id)
        {
            return ctxRead.sp_maker_SelectRow(_Id).FirstOrDefault();
        }

        public IList<sp_maker_SelectRowResult> GetCarsMarker(string param)
        {
            string sqlstr = @"SELECT  * FROM [Maker] WHERE 1 = 1 " + param;
            return ctxRead.ExecuteQuery<sp_maker_SelectRowResult>(sqlstr).ToList();
        }


        #endregion

        #region "Write Methods"

        public bool SaveCarsMarker(maker item)
        {
            try
            {
                ctxWrite.sp_maker_Update(item.id, item.maker_name, item.view_home, item.main_picture, item.delete_result);              
                return true;
            }
            catch { return false; }
        }

        public int DeleteCarsMarker(int Id)
        {
            try
            {
                return (int)ctxWrite.sp_maker_DeleteRow(Id).FirstOrDefault().ChildRows;
            }
            catch { return -1; }
        }

        #endregion

    }
}
