import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get download URL
  app.get("/api/download-url", (req, res) => {
    const downloadUrl = process.env.DOWNLOAD;
    
    if (!downloadUrl) {
      return res.status(404).json({ 
        error: "Download URL not configured",
        message: "Please configure the DOWNLOAD environment variable" 
      });
    }
    
    res.json({ downloadUrl });
  });

  // API route to download file directly
  app.get("/api/download", async (req, res) => {
    const downloadUrl = process.env.DOWNLOAD;
    
    if (!downloadUrl) {
      return res.status(404).json({ 
        error: "Download URL not configured",
        message: "Please configure the DOWNLOAD environment variable" 
      });
    }

    try {
      // Fetch the file from the external URL
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        return res.status(404).json({
          error: "File not found",
          message: "Could not fetch the file from the configured URL"
        });
      }

      // Get content type and size
      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const contentLength = response.headers.get('content-length');
      
      // Set headers for file download
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', 'attachment; filename="zawixLauncher.apk"');
      
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      // Pipe the file data directly to the response
      if (response.body) {
        const reader = response.body.getReader();
        
        const pump = async () => {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              res.end();
              break;
            }
            
            res.write(Buffer.from(value));
          }
        };
        
        await pump();
      } else {
        res.status(500).json({
          error: "Download failed",
          message: "Could not stream the file"
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({
        error: "Download failed",
        message: "An error occurred while downloading the file"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
