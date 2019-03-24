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
echo 	       HOW TO INSTALL
echo 1. Download EnableNewSteamFriendsSkin.exe
echo 2. Update to the latest version.
echo 3. Copy friends.custom to Steam Directory.
echo 4. Install the Friends Skin for Steam.
echo -------------------------------------------
echo.
echo.

echo Checking for Steam directory...
for /f "tokens=1,2*" %%E in ('reg query HKEY_CURRENT_USER\Software\Valve\Steam\') do if %%E==SteamPath set SteamPath=%%G

if exist "%SteamPath%" (echo Steam directory found! && echo.) else (echo Steam directory not found. && echo Confirm Steam is installed and try running this file as administrator. && pause && goto:eof)
echo.

:start
echo Choose an option:
echo 1. Download EnableNewSteamFriendsSkin.exe
echo 2. Update to latest version.
echo 3. Copy friends.custom to Steam Directory.
echo 4. Install Friends Skin.
echo 5. Exit.
echo.
set /p choice= Your choice: 
if %choice%==1 goto:download
if %choice%==2 goto:update
if %choice%==3 goto:copy
if %choice%==4 goto:install
if %choice%==5 goto:eof
echo Invalid selection, please try again.
goto:start

:download
echo.
echo Downloading File to current folder... 
    powershell -Command "Try{[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;(New-Object Net.WebClient).DownloadFile('https://github.com/PhantomGamers/EnableNewSteamFriendsSkin/releases/download/1.2.1/EnableNewSteamFriendsSkin.exe', 'EnableNewSteamFriendsSkin.exe')}Catch{Write-Warning $($error[0]);pause}"
echo EnableNewSteamFriendsSkin.exe has been downloaded succesfully.
echo.
goto:start

:update
echo.
echo Updating Files to current folder... 
    powershell -Command "Try{[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/AikoMidori/steam-friends-skin/master/README.md', 'README.md')}Catch{Write-Warning $($error[0]);pause}"
    powershell -Command "Try{[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/AikoMidori/steam-friends-skin/master/development.css', 'development.css')}Catch{Write-Warning $($error[0]);pause}"
    powershell -Command "Try{[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/AikoMidori/steam-friends-skin/master/friends.custom.css', 'friends.custom.css')}Catch{Write-Warning $($error[0]);pause}"

echo all files have been updated succesfully.
echo.
goto:start

:copy
echo.
if not exist friends.custom.css (echo  friends.custom.css not found, make sure it's in the same directory as this installer. && echo. && goto:start)

echo Checking for Steam directory...
for /f "tokens=1,2*" %%E in ('reg query HKEY_CURRENT_USER\Software\Valve\Steam\') do (
    if %%E==SteamPath set SteamPath=%%G
    if %%E==FriendsSkin set FriendsSkin=%%G

)

if exist "%SteamPath%" (echo Steam directory found! && echo.) else (echo Steam directory not found. && echo Confirm Steam is installed and try running this file as administrator. && pause && goto:eof)

if [%FriendsSkin%]==[] echo No Friends Skin found... && set FriendsPath=%SteamPath%/clientui/friends.custom.css
if not [%FriendsSkin%]==[] set FriendsPath=%SteamPath%/clientui/friends.custom.css

echo Checking for write access to Steam directory...

mkdir "%SteamPath%/tmp"
if exist "%SteamPath%/tmp" (rmdir "%SteamPath%/tmp" && echo Success! && echo.) else (echo Write access denied, try running this file as administrator. && pause && goto:eof)

echo Copying Steam Friends Skin to Steam directory...
    copy /Y friends.custom.css "%FriendsPath%"
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
goto:restartsteam

:restartsteam
echo.
echo Restarting Steam...
TASKLIST | FIND /I "steam" >nul 2>&1
IF ERRORLEVEL 0 ( start /b /w " " "%SteamPath%/Steam.exe" -shutdown )
goto:LOOP

:startsteam
echo.
start /b " " "%SteamPath%/Steam.exe"
goto:pause

:LOOP
TASKLIST | FIND /I "steam" >nul 2>&1
IF ERRORLEVEL 1 (
  GOTO startsteam
) ELSE (
  TIMEOUT /T 3 >nul 2>&1
  GOTO LOOP
)

:pause
Pause&Exit

echo.
echo You can now close the installer.
echo.
Pause&Exit

