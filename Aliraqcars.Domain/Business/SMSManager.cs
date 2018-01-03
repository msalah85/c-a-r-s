
///=================================================================
/// Copyright (c) 2012 Minutes Web Designers Co.
/// Developer: Mohamed Salah Abdullah <dev.msalah@facebook.com>.
/// Last Update: 15-01-2012.
///=================================================================

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class SMSManager
    {
        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "SMS Users Methods"

        public IList<sp_tbl_sms_n_SelectRowResult> GetAllSMSUsers(string param)
        {
            string sql = string.Format(@"SELECT * FROM tbl_sms_n Where delete_result LIKE 'no%' {0}", param);
            return ctxRead.ExecuteQuery<sp_tbl_sms_n_SelectRowResult>(sql).ToList();
        }

        public sp_tbl_sms_n_SelectRowResult GetSMSInfo(int iD)
        {
            return ctxRead.sp_tbl_sms_n_SelectRow(iD).FirstOrDefault();
        }

        public bool UpdateSMSistrator(int iD, string mssage, DateTime dat, string deleted)
        {
            try
            {
                ctxWrite.sp_tbl_sms_n_Update(iD, dat, mssage, deleted);
                return true;
            }
            catch { return false; }
        }

        public bool DeleteSMSistrator(int _Id)
        {
            try
            {
                ctxWrite.sp_tbl_sms_n_DeleteRow(_Id);
                return true;
            }
            catch { return false; }
        }


        #endregion
    }
}
