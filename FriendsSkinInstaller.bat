@echo off
title Steam Friends Skin Installer

echo Welcome to the Steam Friends Skin Installer.
echo Made by Shiina.
echo Version 1.0
echo.
echo This tool helps you to install the new Friends Skin for Steam!
echo If you have any questions, Leave a message on our Discord: https://discord.gg/UZvkvkh
echo.
echo.
echo -------------------------------------------
echo 	HOW TO INSTALL
echo 1. Update friends.custom.
echo 2. Copy friends.custom to Steam Directory.
echo 3. Install the Friends Skin for Steam.
echo -------------------------------------------
echo.
echo.

:start
echo Choose an option:
echo 1. Update friends.custom.
echo 2. Copy friends.custom to Steam Directory.
echo 3. Install Friends Skin.
echo 4. Exit.
echo.
set /p choice= Your choice: 
if %choice%==1 goto:update
if %choice%==2 goto:copy
if %choice%==3 goto:install
if %choice%==4 goto:eof
echo Invalid selection, please try again.
goto:start

:update
echo.
echo Updating Files to current folder... 
    powershell -Command "Try{[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/AikoMidori/steam-dark-mode/master/SteamDarkModeTool.bat',    'SteamDarkModeTool.bat')}Catch{Write-Warning $($error[0]);pause}"
echo friends.custom.css updated.
echo.
goto:start

:copy
echo.
if not exist friends.custom.css (echo  friends.costum.css not found, make sure it's in the same directory as this installer. && echo. && goto:start)

echo Checking for Steam directory...
for /f "tokens=1,2*" %%E in ('reg query HKEY_CURRENT_USER\Software\Valve\Steam\') do (
    if %%E==SteamPath set SteamPath=%%G
)

if exist "%SteamPath%" (echo Steam directory found! && echo.) else (echo Steam directory not found. && echo Confirm Steam is installed and try running this file as administrator. && pause && goto:eof)

echo Checking for write access to Steam directory...

mkdir "%SteamPath%/tmp"
if exist "%SteamPath%/tmp" (rmdir "%SteamPath%/tmp" && echo Success! && echo.) else (echo Write access denied, try running this file as administrator. && pause && goto:eof)

echo Copying Steam Friends Skin to Steam directory...
if [%FriendsSkin%]==[] (
    copy /Y friends.custom.css "%FriendsPath%" >nul
)
if not [%FriendsSkin%]==[] copy /Y friends.custom.css "%FriendsPath%" >nul
echo.
goto:start

:install
echo.
if not exist EnableNewSteamFriendsSkin.exe (echo EnableNewSteamFriendsSkin.exe not found, make sure sfk.exe is in the same directory as this batch file! && pause && goto:start)
pushd %~dp0
EnableNewSteamFriendsSkin.exe
popd
echo succesfully installed!
echo Steam will now restart to apply changes.
echo.
echo You can now close the installer.
echo.
Pause&Exit

