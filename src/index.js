const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

// Token endpoint - returns the SHIP_TOKEN from environment variable
app.get("/token", (req, res) => {
  const shipToken = process.env.SHIP_TOKEN;
  
  if (!shipToken) {
    return res.status(500).json({ 
      error: "SHIP_TOKEN not configured",
      message: "Ask a mentor to set the SHIP_TOKEN environment variable"
    });
  }
  
  res.json({ token: shipToken });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Main page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ship It Challenge</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .container {
          text-align: center;
          padding: 40px;
          max-width: 600px;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #00ff88, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .subtitle {
          font-size: 1.2rem;
          color: #888;
          margin-bottom: 2rem;
        }
        .token-box {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 30px;
          margin: 20px 0;
        }
        .token-label {
          font-size: 0.9rem;
          color: #00ff88;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
        .token {
          font-size: 1.5rem;
          font-family: monospace;
          color: #fff;
          padding: 15px 25px;
          background: rgba(0,255,136,0.1);
          border-radius: 8px;
          display: inline-block;
        }
        .info {
          margin-top: 30px;
          padding: 20px;
          background: rgba(0,212,255,0.05);
          border: 1px solid rgba(0,212,255,0.2);
          border-radius: 8px;
          text-align: left;
        }
        .info h3 {
          color: #00d4ff;
          margin-bottom: 10px;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .info p {
          color: #aaa;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .endpoints {
          margin-top: 20px;
          font-size: 0.85rem;
          color: #666;
        }
        .endpoints code {
          background: rgba(255,255,255,0.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 SHIP IT</h1>
        <p class="subtitle">Docker × Jenkins Bootcamp Challenge</p>
        
        <div class="token-box">
          <div class="token-label">Your Deployment Token</div>
          <div class="token" id="token">Loading...</div>
        </div>
        
        <div class="info">
          <h3>✓ Mission Complete</h3>
          <p>Your deployment was successful! Copy your unique SHIP token above and submit it on the Mission Control dashboard to complete M4.</p>
        </div>
        
        <div class="endpoints">
          <p>API: <code>/token</code> <code>/health</code></p>
        </div>
      </div>
      
      <script>
        fetch('/token')
          .then(r => r.json())
          .then(d => {
            document.getElementById('token').textContent = d.token;
          })
          .catch(() => {
            document.getElementById('token').textContent = 'Not configured';
          });
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Ship It Challenge app running on port ${PORT}`);
  console.log(`Token endpoint: http://localhost:${PORT}/token`);
  console.log(`SHIP_TOKEN: ${process.env.SHIP_TOKEN || 'NOT SET'}`);
});
