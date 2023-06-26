### 基于MovableArea和MovableView实现族谱树展示

#### demo

![Alt Text](https://github.com/suu1923/taro-tree/raw/master/readme-demo.gif)

#### 使用
> 在调用页面嵌入MovableArea和MovableView,如下:

```javasript

import { Component } from 'react';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, MovableArea, MovableView, Text, ScrollView } from '@tarojs/components';
import TreeChartItem from '../../components/family-tree/familyTree.js';
import './index.scss';

export default class TreeS extends Component {
	windowWidth = Taro.getSystemInfoSync().windowWidth;
	windowHeight = Taro.getSystemInfoSync().windowHeight;
	$instance = getCurrentInstance()
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			familyTreeData: null
		};
	}
	// 初始化获取数据
	componentDidMount() {

		const onReadyEventId = this.$instance.router.onReady
		eventCenter.once(onReadyEventId, () => {
			this.getFamilyTreeData();
			// onReady 触发后才能获取小程序渲染层的节点
			const { windowWidth, windowHeight } = this;

			setTimeout(() => {
				Taro.createSelectorQuery()
					.select('#rootTree ')
					.boundingClientRect((rect) => {
						console.log('rect', rect)
						this.setState({
							width: rect.width > windowWidth ? rect.width : windowWidth,
							height: rect.height > windowHeight ? rect.height : windowHeight,
						});
					})
					.exec((res) => {
						console.log('exec:', res)
					});
			}, 1000);
		})
	}

    // 获取接口数据
	getFamilyTreeData = async () => {};

    // 处理点击事件
	handleItemClick(item) {}

	render() {
		const { width, height, familyTreeData } = this.state;
		console.log('width', width)
		console.log('height', height)
		if (!familyTreeData) {
			return null;
		}
		return (
			<MovableArea className="movable-area">
				<MovableView
					scale
					inertia
					direction="all"
					id="rootTree"
					style={{
						width: (width === 0 ? 'auto' : `${width}rpx`),
						height: (height === 0 ? 'auto' : `${height}rpx`)
					}}
					x={- width / 2 + this.state.windowWidth / 2}

				>           
					<TreeChartItem
						dataSource={familyTreeData}
						onItemClick={this.handleItemClick.bind(this)}
						bgColor="#F7F7F7"
						horizontalLineColor="#E7C48D"
						verticalLineColor="#E7C48D"
						childrenKey="childlist"
						renderItem={item => (
                            <!-- 自定义样式即可 -->
							<View className="custom-user-info">
								<View class="info-spouse-box">
									<Text lines="1" class="info-spouse-text">{item.spouse}</Text>
								</View>
								<View class="info-family-number-box">
									<View class="dot" style={{ backgroundColor: 'rgba(29, 61, 99, 1.000000)' }}></View>
									<Text lines="1" class="info-family-number-text" style={item.gender === 1 ? 'color: rgba(29, 61, 99, 1);' : 'color: rgba(156,0,0,1);'}>长子</Text>
								</View>
								<View class="info-name">
									<View class="dot" style={{ backgroundColor: 'rgba(130, 69, 4, 1.000000)' }}></View>
									<Text lines="1" class="info-name-text">{item.name}</Text>
								</View>
								<View style={{ borderLeft: '2px dashed #824504', marginLeft: '12rpx' }}>
								</View>
								<View class="info-rank-box">
									<View class="info-rank-box-dot"></View>
									<Text lines="1" class="info-rank-text">{item.ranks}</Text>
									<View class="info-gender-box">
										<Text lines="1" class="info-gender-text">{item.gender === 1 ? '男' : '女'}</Text>
									</View>
								</View>
							</View>
						)}
						itemMargin="100px"
					/>

				</MovableView>
			</MovableArea >
		);
	}
}
```

#### TreeChartItem参数

| 参数                | 类型     | 是否必填 | 默认值                                               | 描述                 |
| ------------------- | -------- | -------- | ---------------------------------------------------- | -------------------- |
| dataSource          | object   | 是       | -                                                    | 数据源               |
| childrenKey         | string   | 否       | children                                             | 子集的键名           |
| onItemClick         | function | 否       | ``` (item) => { console.log('点击了:', item);}   ``` | 点击项的回调函数     |
| renderItem          | function | 否       | -                                                    | 自定义渲染样式的函数 |
| itemMargin          | string   | 否       | -                                                    | 项之间的间隔         |
| bgColor             | string   | 否       | -                                                    | 背景颜色             |
| ~~bgImage~~         | string   | 否       | -                                                    | 背景图片(暂未实现)   |
| horizontalLineColor | string   | 否       | #000                                                 | 水平线的颜色         |
| verticalLineColor   | string   | 否       | #000                                                 | 垂直线的颜色         |
