# 微信小程序开发

接口文档

http://192.168.2.127:5603/dgOut/outportal/doc.html

## 使用 npm 包

> https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html
>
> - npm install

> PS：从开发者工具 v1.02.1811150 版本开始，调整为根据 package.json 的 dependencies 字段构建，所以声明在 devDependencies 里的包也可以在开发过程中被安装使用而不会参与到构建中。如果是这之前的版本，则建议使用--production 选项，可以减少安装一些业务无关的 npm 包，从而减少整个小程序包的大小。

- 点击开发者工具中的菜单栏：工具 --> 构建 npm
- 勾选“使用 npm 模块”选项： use npm
- 构建完成后即可使用 npm 包。
- js 中引入 npm 包：

  ```
  const myPackage = require('packageName')
  const packageOther = require('packageName/other')
  使用 npm 包中的自定义组件：

  {
    "usingComponents": {
      "myPackage": "packageName",
      "package-other": "packageName/other"
    }
  }
  PS：此处使用 npm 包时如果只引入包名，则默认寻找包名下的 index.js 文件或者 index 组件。
  ```

## 使用 sass

在 project.config.json 文件中，修改 setting 下的 useCompilerPlugins 字段为 ["typescript"]，即可开启工具内置的 typescript 编译插件。 如需同时开启 less 编译插件，可将该字段修改为 ["typescript", "less"]。 目前支持三个编译插件：typescript、less、sass

```
"useCompilerPlugins": [
  "sass"
],
```

## 按需注入

https://developers.weixin.qq.com/miniprogram/dev/framework/ability/lazyload.html

```json
// app.json

{
  "lazyCodeLoading": "requiredComponents"
}
```

## 配置 eslint

1. 安装 `npm install --save-dev eslint`
2. 设置配置文件 `.eslintrc.js`

```
#.eslintrc.js
/*
 * Eslint config file
 * Documentation: https://eslint.org/docs/user-guide/configuring/
 * Install the Eslint extension before using this feature.
 */
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  ecmaFeatures: {
    modules: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  extends: 'eslint:recommended',
}

```

3. settings.json 中设置

```
{
  "editor.formatOnSave": true,
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
}

```

## 配置 prettierrc

1. 安装 `npm install --save-dev prettier`
2. `.prettierrc` 设置配置文件 配置 `wxml` 语法格式化

```
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "singleAttributePerLine": true,
  "proseWrap": "never",
  "endOfLine": "auto",
  "overrides": [
    {
      "files": "*.wxml",
      "options": {
        "parser": "html"
      }
    },
    {
      "files": "*.wxss",
      "options": {
        "parser": "css"
      }
    },
    {
      "files": "*.wxs",
      "options": { "parser": "babel" }
    },
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    },
    {
      "files": ".lintstagedrc",
      "options": {
        "parser": "json"
      }
    }
  ]
}

```

3. settings.json 中设置

```
{
  "editor.formatOnSave": true,
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[wxml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 添加文件关联
  "prettier.documentSelectors": ["**/*.wxml", "**/*.wxss", "**/*.wxs"]
}
```

## 配置 stylelint

1. 安装 stylelint,和 scss 支持以及排序规则 `npm install --save-dev stylelint stylelint-config-standard-scss stylelint-order stylelint-config-hudochenkov`
2. 创建 `.stylelintrc.js`
3. 配置文件 `.stylelintrc.js`

```
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    // 用于排序
    'stylelint-config-hudochenkov/order',
  ],
  rules: {
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
  },
}

```

## 与 git 工作流结合

### 配置 lint-staged

针对暂存的 git 文件运行 linters,他要配合 Husky 创建钩子 使用

https://github.com/okonet/lint-staged#installation-and-setup

`npm install --save-dev lint-staged`

单独在根目录新建.lintstagedrc 文件

```
{
  "*.{md,json}": ["prettier --write"],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{css,less,scss}": ["stylelint --fix", "prettier --write"]
}
```

### 配置 Husky

https://typicode.github.io/husky/#/?id=usage

1. `npm install husky --save-dev`
2. `npx husky install` (Enable Git hooks)
3. `npm pkg set scripts.prepare="husky install"` (在 package.json 中添加 prepare 脚本，确保另外的人在安装依赖时也能正确安装钩子并初始化钩子文件夹)
4. `npx husky add .husky/pre-commit "npm test"` (创建钩子) 写入的钩子内容如下：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

### 并没有使用到的 CSS 样式文件和组件会不会被打包

最新的微信开发者工具好像会忽略未依赖的 CSS 文件和组件，但是旧版本的开发者工具会打包进去

- 并没有 `import`进入的 CSS 文件，只要其文件存在于小程序根目录（`project.config.json`同级目录），就会被打包进入预览及上传的代码中
- 并没有使用的组件，跟 CSS 一样，只要其存在于小程序根目录，一样会被打包进入上传和预览的代码中

## 关于打包

### 设置打包忽略文件

通过在 `project.config.json`文件中设置 `packOptions`字段，来设置忽略文件

**忽略文件在上传、预览**的打包过程中， 都不会被打包进去![1564539543628](../keyan-market-mp/assets/1564539543628.png)

列如

```json
"packOptions": {
		"ignore": [
		// 设置忽略存于根目录下的mdAssets文件夹
		// 上传预览都不会被打包进去
			{
				"type": "folder",
				"value": "mdAssets"
			}
		]
	}
```

## UI 组件的使用

- weui 纯 ui 版本
  - https://weui.io/
  - https://github.com/Tencent/weui-wxss
- weui 逻辑封装库
  - https://developers.weixin.qq.com/miniprogram/dev/extended/weui/
- iview
  - https://weapp.iviewui.com/docs/guide/start
  - https://github.com/TalkingData/iview-weapp
- vant
  - https://youzan.github.io/vant-weapp/#/intro
  - https://github.com/youzan/vant-weapp
- ColorUi
  - https://www.color-ui.com/
  - https://github.com/weilanwl/ColorUI

## 使用阿里图标

> 使用图标能显著减少包体积，一般使用 fontClass 的方式

> 参考这篇文章使用阿里图标

https://www.jianshu.com/p/f6f25df98d7c

## Tips

- 不要再 view、text、button 等换行插入 `{{ value }}`插值表达式，渲染时会把空格渲染进去

  ```javascript
  // bad
  <text>
  	{{ value }}
  </text>

  // good
  <text>{{ value }}</text>
  ```

## async-validator 使用方法

```javascript
npm i async-validator -S
```

```javascript
import AsyncValidator from 'async-validator'

data: {
    form: {
      // 手机号
      mobile: '',
      // 用户姓名
      username: '',
      // 性别
      gender: '',
      // 学历
      education: '',
      // 研究领域
      research_domain: '',
      // 学校/研究机构
      organization: ''
    }
  },
  // 表单验证
  rules: {
    mobile: [
      { required: true, message: '请先绑定手机号' },
      { pattern: /^1\d{10}$/, message: '请输入正确的手机号' },
    ],
    username: [
      { required: true, message: '请填写用户名' }
    ]
  },


 // 提交表单
  onSubmit (e) {
    let formData = e.detail.value
    let { mobile, gender, education } = this.data.form
    formData.mobile = mobile
    formData.gender = gender
    formData.education = education
    // 根据校验规则构造一个 validator
    new AsyncValidator(this.rules).validate(formData, (errors, fields) => {
      /**
       * 在没有错误的情况下 errors 返回的是 null
       * 有错的情况下 列如name为空 返回：[field: "username", message: "请填写用户名"]
       */
      if (!errors) {
        console.log('成功', formData)
        this.updateUserResearch(formData)
        return
      }
      wx.showToast({
        title: errors[0].message,
        icon: 'none'
      })
    })
  }
```

## 合理使用 setData

https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips/runtime_setData.html

### data 应只包括渲染相关的数据

- 页面或组件的 data 字段，应用来存放和页面或组件渲染相关的数据（即直接在 wxml 中出现的字段）；
- 页面或组件渲染无关的数据，应挂在非 data 的字段下，如 this.userData = {userId: 'xxx'}

### setData 应只传发生变化的数据

- setData 应只传入发生变化的字段；
- 建议以数据路径形式改变数组中的某一项或对象的某个属性，动态的字段名需要使用 `[]`包裹起来，静态的不需要

  - 更新对象中的某一个属性，可以嵌套

  ```javascript
    updateSearchValue (e) {
      let { searchtype, searchvalue } = e.currentTarget.dataset
      let tmp = `search.${searchtype}`
      this.setData({
        [tmp]: searchvalue
      })
    }

    // 嵌套对象
    this.setData({'a.b.c.d': 'newVal'})
  ```

  - 更新数组某一项

  ```javascript

    updateSearchValue (e) {
      let { index } = e.currentTarget.dataset
      let tmp = `list[${index}].checked`
      this.setData({
        [tmp]: !this.data.list[index].checked
      })
    }

    this.setData({
      'A[0].B': 'myPrivateData'
    })

    // 数组元素对象中的某一个属性
    this.setData({
      'array[2].message': 'newVal'
    })
  ```

## 实现过滤器

```javascript
// format.wxs

// 取字符串第一个字
var getStrFirstChar = function (str) {
  if (!str) return ''
  return str.charAt(0)
}

// 格式化分区
var getOtherChar = function (str) {
  if (!str) return ''
  return str.substring(1)
}

module.exports.getStrFirstChar = getStrFirstChar
module.exports.getOtherChar = getOtherChar
```

```html
<wxs
  src="./format.wxs"
  module="format" />

<!-- 案例列表 -->
<view class="case_list">
  <view
    class="case_item"
    wx:for="{{ caseList }}"
    wx:key="title"
    hover-class="case_hover"
    data-case-id="{{item.id}}"
    bind:tap="checkCase">
    <view class="item_title_box">
      <text class="first text_color_active">{{ format.getStrFirstChar(item.title) }}</text>
      <text class="other">{{ format.getOtherChar(item.title) }}</text>
    </view>
    <view class="item_entitle_box">{{ item.enTitle }}</view>
    <image
      class="{{ item.id }}"
      src="{{ item.path }}"></image>
  </view>
</view>
```

## 对于 vant 使用

### 安装

1. 安装 npm i @vant/weapp -S --production
2. 构建

微信开发者工具 -> 工具 -> 构建 npm

### 使用

1. 全局注册

```json
{
  "usingComponents": {
    "van-overlay": "@vant/weapp/overlay/index"
  }
}
```

2. 页面注册

```json
{
  "usingComponents": {
    "van-share-sheet": "@vant/weapp/share-sheet/index"
  }
}
```

### 进行按需引入

- **最新的微信开发者工具好像实现了未依赖的文件不会进行上传的功能**
- **最新的微信开发者工具好像实现了未依赖的文件不会进行上传的功能**

对 packOptions.ignore 进行配置 把不需要的组件进行忽略

先把 vant 组件完全不引入，然后需要什么就从 ignore 数组删除此项

#### 完整的 vant 组件忽略

需要什么组件就从此列表删除组件目录

```json
"packOptions": {
    "ignore": [
      {
        "value": "miniprogram_npm/@vant/weapp/action-sheet",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/area",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/button",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/calendar",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/card",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/cell",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/cell-group",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/checkbox",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/checkbox-group",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/circle",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/col",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/collapse",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/collapse-item",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/count-down",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/datetime-picker",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/dialog",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/divider",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/dropdown-item",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/dropdown-menu",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/empty",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/field",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/goods-action",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/goods-action-button",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/goods-action-icon",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/grid",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/grid-item",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/image",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/index-anchor",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/index-bar",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/loading",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/nav-bar",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/notice-bar",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/notify",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/panel",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/picker",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/picker-column",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/progress",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/radio",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/radio-group",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/rate",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/row",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/search",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/sidebar",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/sidebar-item",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/skeleton",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/slider",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/stepper",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/steps",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/sticky",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/submit-bar",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/swipe-cell",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/switch",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/tab",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/tabbar",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/tabbar-item",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/tabs",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/tag",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/toast",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/tree-select",
        "type": "folder"
      },
      {
        "value": "miniprogram_npm/@vant/weapp/uploader",
        "type": "folder"
      }
    ],
    "include": []
  },
```

#### 公用的组件目录 不能被忽略

此目录都不能进行忽略

```json
[
  {
    "value": "miniprogram_npm/@vant/weapp/common",
    "type": "folder"
  },
  {
    "value": "miniprogram_npm/@vant/weapp/config-provider",
    "type": "folder"
  },
  {
    "value": "miniprogram_npm/@vant/weapp/definitions",
    "type": "folder"
  },
  {
    "value": "miniprogram_npm/@vant/weapp/icon",
    "type": "folder"
  },
  {
    "value": "miniprogram_npm/@vant/weapp/info",
    "type": "folder"
  },
  {
    "value": "miniprogram_npm/@vant/weapp/mixins",
    "type": "folder"
  },
  {
    "value": "miniprogram_npm/@vant/weapp/transition",
    "type": "folder"
  },
  {
    "value": "miniprogram_npm/@vant/weapp/wxs",
    "type": "folder"
  }
]
```

## 对于T-Design的使用

### 安装

- pnpm i tdesign-miniprogram -S --production
- 微信开发者工具 -> 工具 -> 构建 npm

### 使用

1、全局注册

```
{
  "usingComponents": {
    "t-button": "tdesign-miniprogram/button/button"
  }
}
```

2、页面注册 (在每个page的JSON文件中配置即可)

```
{
  "usingComponents": {
    "t-button": "tdesign-miniprogram/button/button"
  }
}
```

3、啦啦啦
