<%@ WebHandler Language="C#" Class="UploadPicture" %>

using System;
using System.IO;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Xml;
using IraqCars.Business.Business;

public class UploadPicture : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        string obj = "خطأ أثناء عملية رفع الصور.";

        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            HttpPostedFile file = null;
            
            // xml document that will has all picture to save to DB.
            XmlDocument xmldoc = new XmlDocument();
            XmlElement doc = xmldoc.CreateElement("doc");
            xmldoc.AppendChild(doc);
                                  

            for (int i = 0; i < files.Count; i++)
            {
                file = files[i];
                if (file.ContentLength > 0)
                {
                    // upload file to the server.
                    var carId = context.Request["cid"] ?? String.Empty;
                    string path = context.Server.MapPath("~/public/cars/" + carId + "/");
                    string fileName = string.Format("{0}{1}", Guid.NewGuid(), Path.GetExtension(file.FileName));
                    var filePath = Path.Combine(path, fileName);

                    // Ensure cache directory exists
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }

                    // save large image
                    file.SaveAs(filePath);
                    
                    // Save Thumb image //////////////////////////////////
                    // Set image height and width to be loaded on web page
                    byte[] buffer = getResizedImage(filePath, 245, 245);
                    // prepaire thumb folder
                    string pPath = Path.Combine(path, "_thumb\\");
                    if (!Directory.Exists(pPath))
                    {
                        Directory.CreateDirectory(pPath);
                    }
                    // save image in thumb folder
                    File.WriteAllBytes(pPath + fileName, buffer);
                    // end ///////////////////////////////////////////////
                    
                    // add this picture to list to save into DB.
                    XmlElement xmlelement = xmldoc.CreateElement("Pictures");
                    xmlelement.SetAttribute("CarID", carId);
                    xmlelement.SetAttribute("FileName", fileName);
                    xmlelement.SetAttribute("Index", string.Format("{0}", i + 1));
                    doc.AppendChild(xmlelement);
                                        
                    // save into db (none).
                    obj = "تمت عملية رفع الصور بنجاح.";
                }
            }
            
            // start save all into db.
            SaveDB(xmldoc.OuterXml);
        }
        context.Response.Write(obj);
    }

    void SaveDB(string xml)
    {
        string[] names = { "doc" }, values = { xml };
        var saved = new Save().SaveRow("Images_Save", names, values);
    }

    byte[] getResizedImage(String path, int width, int height)
    {
        Bitmap imgIn = new Bitmap(path);
        double y = imgIn.Height;
        double x = imgIn.Width;

        double factor = 1;
        if (width > 0)
        {
            factor = width / x;
        }
        else if (height > 0)
        {
            factor = height / y;
        }
        MemoryStream outStream = new MemoryStream();
        Bitmap imgOut = new Bitmap((int)(x * factor), (int)(y * factor));

        // Set DPI of image (xDpi, yDpi)
        imgOut.SetResolution(96, 96); //72, 72);

        Graphics g = Graphics.FromImage(imgOut);
        g.Clear(Color.White);
        g.DrawImage(imgIn, new Rectangle(0, 0, (int)(factor * x), (int)(factor * y)),
          new Rectangle(0, 0, (int)x, (int)y), GraphicsUnit.Pixel);

        imgOut.Save(outStream, getImageFormat(path));
        outStream.Flush();
        outStream.Close();
        outStream.Dispose();
        return outStream.ToArray();
    }

    string getContentType(String path)
    {
        switch (Path.GetExtension(path))
        {
            case ".bmp": return "Image/bmp";
            case ".gif": return "Image/gif";
            case ".jpg": return "Image/jpeg";
            case ".png": return "Image/png";
            default: break;
        }
        return "";
    }

    ImageFormat getImageFormat(String path)
    {
        switch (Path.GetExtension(path))
        {
            case ".bmp": return ImageFormat.Bmp;
            case ".gif": return ImageFormat.Gif;
            case ".jpg":
            case ".jpeg": return ImageFormat.Jpeg;
            case ".png": return ImageFormat.Png;
            default: break;
        }
        return ImageFormat.Jpeg;
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}