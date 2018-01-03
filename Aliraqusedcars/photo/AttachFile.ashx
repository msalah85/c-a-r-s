<%@ WebHandler Language="C#" Class="AttachFile" %>

using System;
using System.IO;
using System.Web;
using System.Net;
using System.Drawing;
using System.Drawing.Imaging;
using System.Xml;
using IraqCars.Business.Business;

public class AttachFile : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        //object obj;

        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            HttpPostedFile file = null;


            for (int i = 0; i < files.Count; i++)
            {
                file = files[i];
                if (file.ContentLength > 0)
                {
                    // upload file to the server.
                    string path = context.Server.MapPath("~/public/notes/"),
                     fileName = string.Format("{0}{1}", Guid.NewGuid(), Path.GetExtension(file.FileName));
                    var filePath = Path.Combine(path, fileName);


                    // Ensure cache directory exists
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }


                    // save large image
                    file.SaveAs(filePath);


                    context.Response.Write(fileName);
                }
            }

        }
        else
        {
            context.Response.Write("");
        }
    }


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}