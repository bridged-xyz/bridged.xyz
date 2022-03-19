---
title: "Automatic property interfacing strategy for Components"
version: 0.1.0
revision: 1
---

# Automatic property interfacing strategy for Components

> Learn more at [support-components](https://github.com/gridaco/designto-code/blob/main/packages/support-components/README.md)

We support automatic property interfacing for Components, which means that we automatically extracts a dynamic property so that you can expect the output component code to be ready to be extended.

This is based on diff checking of master `A` and instance `A'`, supporting below interfacing

- text data
- color on **single fill**
- image as src uri on **single image fill**
- item spacing
- margin / padding

## Reference

- [Design diff - `@design-sdk/diff`](https://github.com/gridaco/design-sdk/tree/main/design-diff)
- [Code Features Components - `@code-features/components`](https://github.com/gridaco/designto-code/tree/main/packages/support-components)
