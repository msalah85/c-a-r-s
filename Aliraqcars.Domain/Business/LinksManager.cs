using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class LinksManager
    {
        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "Read Methods"

        public sp_web_links_SelectRowResult GetLinkDetails(int _id)
        {
            return ctxRead.sp_web_links_SelectRow(_id).FirstOrDefault();
        }

        public IList<sp_web_links_SelectRowResult> GetLinksList(string sqlParm)
        {
            string sql = @"SELECT * from web_links WHERE 1 = 1  " + sqlParm;
            return ctxRead.ExecuteQuery<sp_web_links_SelectRowResult>(sql).ToList();
        }

        #endregion

        #region "Write Methods"


        public int DeleteLink(int Id)
        {
            try
            {
                return (int)ctxWrite.sp_web_links_DeleteRow(Id);
            }
            catch { return -1; }
        }

        public bool UpdateLinkInfo(web_link linkToUpdate)
        {
            try
            {
                ctxWrite.sp_web_links_Update(linkToUpdate.id, linkToUpdate.link_order, linkToUpdate.link_lang_id,
                    linkToUpdate.link_lang_name, linkToUpdate.link_lang_code, linkToUpdate.link_place, linkToUpdate.link_name,
                    linkToUpdate.link_details, linkToUpdate.main_picture, linkToUpdate.delete_result);

                return true;
            }
            catch { return false; }

        }

        #endregion

    }
}
