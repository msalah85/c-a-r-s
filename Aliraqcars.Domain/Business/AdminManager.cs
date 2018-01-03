
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
    public class AdminManager
    {
        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "Admin Users Methods"

        public IList GetAllAdminUserNames()
        {

            var adminUSers = from user in ctxWrite.tbl_admin_ns
                             select new
                             {
                                 user.id,
                                 user.name
                             };

            return adminUSers.ToList();
        }
        public IList<sp_tbl_admin_n_LoginResult> GetAllAdminUsers(string param)
        {
            string sql = string.Format(@"SELECT * FROM   tbl_admin_n Where delete_result LIKE N'no%' {0}", param);
            return ctxRead.ExecuteQuery<sp_tbl_admin_n_LoginResult>(sql).ToList();
        }
        public sp_tbl_admin_n_LoginResult AdminsLogin(string uName, string Password)
        {
            return ctxRead.sp_tbl_admin_n_Login(uName, Password).FirstOrDefault();
        }
        public sp_tbl_admin_n_PasswordResult GetAdminByEmail(string emailStr)
        {
            return ctxRead.sp_tbl_admin_n_Password(emailStr).FirstOrDefault();
        }
        public sp_tbl_admin_n_SelectRowResult GetAdminInfo(int iD)
        {
            return ctxRead.sp_tbl_admin_n_SelectRow(iD).FirstOrDefault();
        }
        
        
        /*
        public bool AddAdministrator(tbl_admin_n adminToAdd)
        {
            try
            {
                ctxWrite.tbl_admin_ns.InsertOnSubmit(adminToAdd);
                ctxWrite.SubmitChanges();
                return true;
            }
            catch { return false; }

        }
        */
        
        public bool UpdateAdministrator(tbl_admin_n adminToUpdate)
        {
            try
            {
                ctxWrite.sp_tbl_admin_n_Update(adminToUpdate.id, adminToUpdate.user_name, adminToUpdate.user_password,
                    adminToUpdate.user_type, adminToUpdate.user_level, adminToUpdate.name, adminToUpdate.country, adminToUpdate.city, adminToUpdate.address,
                    adminToUpdate.phone, adminToUpdate.fax, adminToUpdate.mobile, adminToUpdate.email, adminToUpdate.delete_result);
                return true;
            }
            catch { return false; }
        }

        public bool DeleteAdministrator(int _Id)
        {
            try
            {
                ctxWrite.sp_tbl_admin_n_DeleteRow(_Id);
                return true;
            }
            catch { return false; }
        }


        #endregion
    }
}
