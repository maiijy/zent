---
title: Customize
path: guides/theme
group: Theme
scatter: true
---

## Themes

Zent supports themes, only colors are customizable for now.

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

### Customize through CSS variables

Zent uses [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), so it is possible to customize themes via custom CSS variables.

Each theme color should be provided in both HEX and RGB format, for example:

```css
:root {
	/* Use these when opacity is not needed */
  --theme-primary-1: #252b6e;
  --theme-primary-2: #3c46b1;
  --theme-primary-3: #434fc9;
  --theme-primary-4: #515ff0;
  --theme-primary-5: #6c78f2;
  --theme-primary-6: #7e88f3;
  --theme-primary-7: #b0b6f8;
	--theme-primary-8: #f2f3fe;
	
	/* Values are the same as above, but used when opacity is required */
  --theme-rgb-primary-1: 37, 43, 110;
  --theme-rgb-primary-2: 60, 70, 177;
  --theme-rgb-primary-3: 67, 79, 201;
  --theme-rgb-primary-4: 81, 95, 240;
  --theme-rgb-primary-5: 108, 120, 242;
  --theme-rgb-primary-6: 126, 136, 243;
  --theme-rgb-primary-7: 176, 182, 248;
  --theme-rgb-primary-8: 242, 243, 254;
}
```

These variables can be generated with this code：

```scss
// TODO: define your theme overrides here, and that's all!
$theme-overrides: (
	--theme-primary-1: #252b6e,
	--theme-primary-2: #3c46b1,
	--theme-primary-3: #434fc9,
	--theme-primary-4: #515ff0,
	--theme-primary-5: #6c78f2,
	--theme-primary-6: #7e88f3,
	--theme-primary-7: #b0b6f8,
	--theme-primary-8: #f2f3fe,
);

@mixin theme-css-vars($vars) {
	@each $name, $color in $vars {
		#{$name}: $color;
	}
}

@mixin theme-rgb-css-vars($vars) {
	@each $name, $color in $vars {
		#{str-insert($name, "-rgb", 8)}: to-rgb($color);
	}
}

@function to-rgb($color) {
	@return red($color), green($color), blue($color);
}

:root {
	@include theme-css-vars($theme-overrides);

	// Same but used in rgba contexts
	@include theme-rgb-css-vars($theme-overrides);
}
```

### Customize through rebuilding SCSS

Styles in Zent are written in [scss](https://sass-lang.com), we have a builtin theme extension file to support custom themes. You can build custom styles using this extension file.

This method is non-intrusive, but you have to manually build your custom theme every time you upgrade Zent.

#### Build Steps

1. Clone Zent from [github](https://github.com/youzan/zent) and install dependencies
2. Create a file named [`_override.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_override_.scss) in `packages/zent/assets`, define your custom colors in this file. All customizable colors are defined in [`_default.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_default.scss) within the same directory.
3. Run `yarn theme` within `packages/zent`
4. Your custom theme styles are in `packages/zent/css`.

#### Modify theme color dynamically

Could use `ThemeSDK API`, pass a basic color to update the theme colors. Choose a color with a higher saturation and brightness, please. like: S > 85, B > 80, like the following:

<!-- demo-slot-1 -->

<!-- demo-slot-2 -->

<!-- demo-slot-3 -->

<!-- demo-slot-4 -->

### `ThemeSDK` API

```ts
interface IThemeItem {
  color: string; // color hex value
  name: string; // color css variable name
}

interface IThemeAllItem extends IThemeItem {
  index: number;
  var: string; // css variable
  scene: IThemeScene; // scene
}
```


| 参数                  | 说明                                                                               | 类型                                                  | 默认值             |
| --------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------ |
| getThemeColor         | get current theme color                                                           | () => string                                         |                    |
| generateColors        | base on a color, get all the theme colors                                         | (hex: string) => string[]                            |                    |
| getAllThemeColor      | base on a color, get all the theme colors and it semantic scene, css variable     | (hex: string) => IThemeAllItem[]                     |                    |
| getThemeColorByScene  | get the theme colors and css variable by a specific semantic scene                 | (scene: IThemeScene, hex: string) => IThemeItem[]    |                   |
| setAllThemeColor      | base on a color, set all the theme color css variables                            | (hex: string) => void                                |                   |
| setThemeColorByScene  | base on a color and a specific semantic scene, set the theme color css variables   | (scene: IThemeScene, hex: string)  => void           |                    |

<style>
img[alt='zent-theme'] {
  width: 514px;
  height: 319px;
}
</style>