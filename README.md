
# react-native-shimmer-effect ⚡
⚡⚡ A Shimmer Effect | Skeleton component written with reanimated V2 ⚡⚡

<p align="center">
<img src="https://github.com/tomzaku/react-native-shimmer-placeholder/blob/master/example.gif?raw=true">
</p>

## Installation

```sh
npm install react-native-shimmer-effect --save
```

## Usage

```js
import { View } from 'react-native'
import ShimmerEffect from "react-native-shimmer-effect";

const Component = () => {
  return (
    <View>
      <ShimmerEffect width={100} height={15} colorsMode="light" borderRadius={5}/>
    </View>
  )
}

```

## Props
| Prop                         | Description                                                                                            | Type      | Default                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------------- |
| **`width`**                  | Width                                                                                            | number    | 200                                               |
| **`height`**                 | Height                                                                                           | number    | 50                                                |
| **`duration`**               | Duration of shimmer over a row                                                                         | number    | 1000                                              |
| **`reverse`**             | Reverse direction of animation                                                                         | boolean   | false                                           |
| **`style`**                  | Shimmer style                                                                                        | Style     | {} |
| **`colorsMode`**                | Gradient colors type                                                                               | light dark     | light                                        |
| **`opacityDuration`**           | Gradient duration opacity                                                                                    | number     | 1000                                                |
| **`borderRadius`**           | Shimmer border-radius                                                                             | number     | 10                                                |


## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
