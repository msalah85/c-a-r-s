
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Ionic.Zip;
using Ionic.Zlib;

public partial class DownloadCarImages : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        string carId = Request.QueryString["id"];


        if (!string.IsNullOrEmpty(carId))
        {
            Response.Clear();
            Response.BufferOutput = false;  // for large files


            string filename = string.Format("AlIraqCars_{0}.zip", carId);
            Response.ContentType = "application/zip";
            Response.AddHeader("content-disposition", "attachment;filename=" + filename);


            using (ZipFile zip = new ZipFile())
            {
                string path = Server.MapPath(string.Format("~/public/cars/{0}/", carId));
                string[] files = Directory.GetFiles(path);

                // add all those files to the ProjectX folder in the zip file
                zip.AddFiles(files, "Images_" + carId);
                zip.Comment = "This zip was created at " + System.DateTime.Now.ToString("G");
                zip.MaxOutputSegmentSize = 25 * 1024 * 1024;   // 25mb

                try
                {
                    zip.Save(Response.OutputStream); //(filename);
                }
                catch
                { }
                finally
                {
                    Response.End();
                    Response.Close();
                }
            }
        }

    }
}