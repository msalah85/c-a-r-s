using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class UsersManager
    {
        #region "Private Declaration"

        WriterDataContext ctx = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public IList<Jobs_SelectResult> GetJobs()
        {
            return ctx.Jobs_Select().ToList();
        }

        // Select custom records.
        public IList<Users_SelectRowResult> GetUsers(string param)
        {
            string sql = string.Format("SELECT * FROM View_Users WHERE 1=1 {0} ORDER BY UserFullName", param);
            return ctx.ExecuteQuery<Users_SelectRowResult>(sql).ToList();
        }

        public List<User> GetUsers() // get all table
        {
            return ctx.Users.ToList();
        }

        public Users_SelectRowResult GetUsers(int UserID)
        {
            return ctx.Users_SelectRow(UserID).FirstOrDefault();
        }

        // Users login
        public Users_LoginResult UserLogin(string uName, string Password)
        {
            return ctx.Users_Login(uName, Password).FirstOrDefault();
        }

        #endregion

        #region "Write Methods"

        public bool SaveUser(User item)
        {
            try
            {
                ctx.Users_Save(item.UserID, item.UserFullName, item.Phone, item.Email, item.Username, item.Password, item.IsActive,
                    item.JobID, item.Mobile, item.JoinDate, item.Nationality, item.EmpID);
                return true;
            }
            catch { return false; }
        }

        public int DeleteUser(int itemID)
        {
            try
            {
                return (int)ctx.Users_DeleteRow(itemID);
            }
            catch { return -1; } // Error
        }

        #endregion

    }
}
