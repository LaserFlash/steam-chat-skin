[![CI/CD](https://github.com/LaserFlash/steam-chat-skin/workflows/CI/badge.svg)](https://github.com/LaserFlash/steam-chat-skin/actions)

# Steam Friends / Chat Skin

Check out <https://steamchatskinning.tk> to see the skin in action.
Also provides a visual way to customise the appearance.

## Installation

### Prerequisite

**Steam Friends Patcher:** <https://github.com/PhantomGamers/SteamFriendsPatcher/releases>

This is required to apply the theme to the Steam Friends UI. Setting the patcher to run in the background will automatically patch the UI whenever Valve releases a new update for the Friends UI.

### Theme Installation

- Copy [`friends.custom.css`](https://raw.githubusercontent.com/LaserFlash/steam-chat-skin/master/friends.custom.css) to `Steam/clientui` and read it
- Copy [`ofriends.custom.css`](https://raw.githubusercontent.com/LaserFlash/steam-chat-skin/master/ofriends.custom.css) to `Steam/clientui` and read it

## Preview

![Skin Image](https://laserflash.tk/assets/images/steam-chat-full.png)

## Customisation

[`friends.custom.css`](https://raw.githubusercontent.com/LaserFlash/steam-chat-skin/master/friends.custom.css) can be customised to apply different styles to the theme. This customisation is performed in the that file

### Theme Options:

#### Theme Colour:

- Discord Theme
- Dark Theme
- Light Theme

#### Status Styles:

- Discord status or dot status
- Border status (outline around the avatar)

#### Avatar Styles:

- Round Avatar
- Square Avatar
- Squircle Avatar

#### Visual Effects:

- Glow Effects
- Shadows
- Blur

#### Font Customisation

You can change the font used, either read the comment block in [`friends.custom.css`](https://raw.githubusercontent.com/LaserFlash/steam-chat-skin/master/friends.custom.css) or add something like the following:

```css
* {
  font-family: <Replace me with your font> !important;
}
```

Just make sure you either use a web safe font or one that is installed on your system

- https://www.w3schools.com/cssref/css_websafe_fonts.asp
- https://fonts.google.com/?selection.family=Big+Shoulders+Text (also a good resource, use the `@IMPORT` option)

# Contributing

Contributions of any sort are always welcome.

If you have problems or suggestions I would recommend you create an [Issue](https://github.com/LaserFlash/steam-chat-skin/issues) with a clear explanation and ideally a relevant screenshot.

#### Code

Code contributions are also welcome (less work for me). Just put in a [Merge Request](https://github.com/LaserFlash/steam-chat-skin/pulls). I'm slowly working on creating a solid project structure, but for now just be sensible with the code changes.

# Credits

- PhantomGamers <https://github.com/PhantomGamers> for their work on the patcher.
- Originally a fork of <https://github.com/AikoMidori/steam-friends-skin>
