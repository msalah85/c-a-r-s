using System;
using System.IO.Compression;
using System.Web.UI;

public partial class SiteAr : MasterPage
{
    protected object LoadPageStateFromPersistenceMedium()
    {
        return null;
    }

    protected void SavePageStateToPersistenceMedium(object state)
    { }

    protected override void OnLoad(EventArgs e)
    {
        Response.Filter = new GZipStream(Response.Filter, CompressionMode.Compress);
        Response.AddHeader("Content-Encoding", "gzip");
    }    
}
