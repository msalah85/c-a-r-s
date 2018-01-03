<%@ Application Language="C#" %>
<%@ Import Namespace="log4net" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="Aliraqusedcars" %>
<%@ Import Namespace="Settings" %>
<%@ Import Namespace="System.Web.Routing" %>

<script RunAt="server"> 
    void Application_Start(object sender, EventArgs e)
    {
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        log4net.Config.XmlConfigurator.Configure();
    }
    
    // Register errors using log4net.
    void Application_Error(object sender, EventArgs e)
    {
        var logger = LogManager.GetLogger(e.GetType());
        Exception ex = Server.GetLastError();
        logger.Error("Global error", ex);
    }
</script>
