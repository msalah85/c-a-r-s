using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class ColorsManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        #endregion

        #region "Read Methods"
        /*
        public Colors_SelectRowResult GetCarColor(int Id)
        {
            return ctxWrite.Colors_SelectRow(Id).FirstOrDefault();
        }

        public List<Colors_SelectRowResult> GetCarColors(string param)
        {
            string sqlstr = string.Format(@"SELECT * FROM [Colors] WHERE 1=1 {0} ORDER BY ColorID DESC", param);
            return ctxWrite.ExecuteQuery<Colors_SelectRowResult>(sqlstr).ToList();
        }

        public List<Colors_SelectNameResult> GetColors()
        {
            return ctxWrite.Colors_SelectName().ToList();
        }
        */
        #endregion

        #region "Write Methods"

        public bool SaveCarColor(Color item)
        {
            try
            {
                ctxWrite.Colors_Save(item.ColorID, item.ColorNameEn, item.ColorNameAr);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return 1; // return (int)ctxWrite.Colors_Delete(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}