using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class AddinsManager
    {

        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "Public Methods"

        public IList<sp_tbl_news_n_SelectRowResult> GetAllAddinsBy(string searchText) // result of search text by user.
        {
            string sql = @"SELECT * FROM tbl_news_n WHERE 1 = 1 " + searchText;

            return ctxRead.ExecuteQuery<sp_tbl_news_n_SelectRowResult>(sql).ToList();
        }
        public sp_tbl_news_n_SelectRowResult GetAddinDetailsById(int Id)
        {
            return ctxRead.sp_tbl_news_n_SelectRow(Id).FirstOrDefault();
        }

        public bool UpdateAddin(tbl_news_n addinToUpdate)
        {
            try
            {
                ctxWrite.sp_tbl_news_n_Update(addinToUpdate.id, addinToUpdate.lang_code, addinToUpdate.news_date, addinToUpdate.news_title, addinToUpdate.news_type,
                    addinToUpdate.link_order, addinToUpdate.news_details, addinToUpdate.view_home, addinToUpdate.view_marquee, addinToUpdate.view_latest, addinToUpdate.main_picture);

                return true;
            }
            catch { return false; }
        }
        public bool DeleteAddin(int Id)
        {
            try
            {
                ctxWrite.sp_tbl_news_n_DeleteRow(Id);
                return true;
            }
            catch { return false; }
        }

        #endregion

    }
}