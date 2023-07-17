module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    // 用于排序
    'stylelint-config-hudochenkov/order',
  ],
  rules: {
    'selector-type-no-unknown': null,
    'selector-class-pattern': null,
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
  },
}
