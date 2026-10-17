# 🎂 Bhawani Sweets & Bakery - Start Script
Write-Host ""
Write-Host "🎂 Starting Bhawani Sweets & Bakery..." -ForegroundColor Magenta
Write-Host ""

# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\backend'; node server.js" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "✅ Backend running at: http://localhost:5000" -ForegroundColor Green
Write-Host "✅ Frontend running at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"
