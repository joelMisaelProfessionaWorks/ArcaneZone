Add-Type -AssemblyName System.Drawing

$bgPath = "C:\Users\norma\.gemini\antigravity\brain\a338adc9-eea0-4b4e-8bd1-a5465257f27b\zona_arcana_logos_v2_1790613141635.jpg"
$fgPath = "C:\Users\norma\.gemini\antigravity\brain\a338adc9-eea0-4b4e-8bd1-a5465257f27b\.user_uploaded\media_1790613171510.png"
$outPath = "C:\Users\norma\.gemini\antigravity\brain\a338adc9-eea0-4b4e-8bd1-a5465257f27b\zona_arcana_logos_v3.jpg"

$bg = [System.Drawing.Image]::FromFile($bgPath)
$fg = [System.Drawing.Image]::FromFile($fgPath)

# Calculate new size for FG
$fgWidth = [int]($bg.Width * 0.23)
$fgHeight = [int]($fg.Height * ($fgWidth / $fg.Width))
$newFg = New-Object System.Drawing.Bitmap $fgWidth, $fgHeight
$gFg = [System.Drawing.Graphics]::FromImage($newFg)
$gFg.DrawImage($fg, 0, 0, $fgWidth, $fgHeight)

$gBg = [System.Drawing.Graphics]::FromImage($bg)
$posX = [int](($bg.Width - $fgWidth) / 2)
$posY = [int](($bg.Height - $fgHeight) / 2)
$gBg.DrawImage($newFg, $posX, $posY)

$bg.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$gFg.Dispose()
$newFg.Dispose()
$gBg.Dispose()
$bg.Dispose()
$fg.Dispose()
