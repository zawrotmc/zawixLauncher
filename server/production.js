import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Serve static files from dist/public
const distPath = path.resolve(__dirname, "..", "dist", "public");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Fall through to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
} else {
  // Fallback - try just dist folder
  const altDistPath = path.resolve(__dirname, "..", "dist");
  if (fs.existsSync(altDistPath)) {
    app.use(express.static(altDistPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(altDistPath, "index.html"));
    });
  } else {
    app.get("*", (req, res) => {
      res.status(404).send("Build files not found. Run 'npm run build' first.");
    });
  }
}

const httpServer = createServer(app);

const port = parseInt(process.env.PORT || '5000', 10);
httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});