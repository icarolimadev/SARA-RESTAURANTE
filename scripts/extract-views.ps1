# Extrai seções do GRA TESTE.HTML para partials MVC (por linhas)
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root "GRA TESTE.HTML"
$viewsDir = Join-Path $root "views\html"
$lines = Get-Content $src -Encoding UTF8

function Get-Lines($start, $end) {
    return ($lines[($start - 1)..($end - 1)] -join "`n")
}

function Save-Partial {
    param([string]$relativePath, [string]$text)
    $path = Join-Path $viewsDir $relativePath
    $dir = Split-Path $path -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    $text = $text -replace '<selection class="page"', '<section class="page"'
    $text = $text -replace '</selection>', '</section>'
    [System.IO.File]::WriteAllText($path, $text.Trim(), [System.Text.UTF8Encoding]::new($false))
    Write-Host "  -> $relativePath"
}

Write-Host "Extraindo partials por linha..."

Save-Partial "auth\login.html" (Get-Lines 13 134)
Save-Partial "auth\modal-cadastro.html" (Get-Lines 138 384)
Save-Partial "auth\modal-recuperacao.html" (Get-Lines 386 460)
Save-Partial "layout\sidebar.html" (Get-Lines 488 546)
Save-Partial "layout\topbar.html" (Get-Lines 548 559)

$pageRanges = [ordered]@{
    "aluno\dash-aluno.html" = @(605, 638)
    "aluno\reserva-refeicoes.html" = @(643, 668)
    "aluno\nutricao.html" = @(674, 705)
    "aluno\ranking.html" = @(712, 726)
    "aluno\feedback.html" = @(738, 838)
    "aluno\votacao.html" = @(845, 945)
    "aluno\desperdicio-aluno.html" = @(964, 984)
    "aluno\financeiro-aluno.html" = @(989, 1013)
    "aluno\perfil-aluno.html" = @(1022, 1218)
    "nutri\gerenciar-tickets.html" = @(1236, 1280)
    "nutri\dash-nutri.html" = @(1285, 1320)
    "nutri\gerir-cardapio.html" = @(1325, 1354)
    "nutri\registrar-desp.html" = @(1359, 1415)
    "nutri\financeiro-nutri.html" = @(1420, 1451)
    "nutri\analise.html" = @(1456, 1491)
    "nutri\relatorios.html" = @(1496, 1536)
    "nutri\aprova-cadastros.html" = @(1541, 1580)
    "nutri\gerenciar-ranking.html" = @(1585, 1616)
    "nutri\perfil-nutri.html" = @(1624, 1786)
}

foreach ($entry in $pageRanges.GetEnumerator()) {
    Save-Partial $entry.Key (Get-Lines $entry.Value[0] $entry.Value[1])
}

Save-Partial "modals\app-modals.html" (Get-Lines 1796 2094)
Save-Partial "shared\notifications.html" (Get-Lines 2118 2126)

Write-Host "Extração concluída."
