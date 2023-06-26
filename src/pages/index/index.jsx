import { Component } from 'react';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, MovableArea, MovableView, Text } from '@tarojs/components';
import TreeChartItem from '../../components/family-tree/familyTree.js';
import './index.scss';

export default class TreeS extends Component {
  windowWidth = Taro.getSystemInfoSync().windowWidth;
  windowHeight = Taro.getSystemInfoSync().windowHeight;
  $instance = getCurrentInstance()
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
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
      console.log('windowWidth', windowWidth)
      console.log('windowHeight', windowHeight)
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

  getFamilyTreeData = async () => {
    this.setState({
      familyTreeData: { "id": 123, "pid": 0, "name": "兴", "ranks": "一世", "gender": 1, "childlist": [{ "id": 126, "pid": 123, "name": "山", "ranks": "二世", "gender": 1, "childlist": [] }, { "id": 125, "pid": 123, "name": "推", "ranks": "二世", "gender": 1, "childlist": [{ "id": 152, "pid": 125, "name": "测试", "ranks": "三世", "gender": 0, "childlist": [] }, { "id": 129, "pid": 125, "name": "彦甫", "ranks": "三世", "gender": 1, "childlist": [] }, { "id": 128, "pid": 125, "name": "彦隆", "ranks": "三世", "gender": 1, "childlist": [{ "id": 132, "pid": 128, "name": "堃", "ranks": "四世", "gender": 1, "childlist": [{ "id": 137, "pid": 132, "name": "得心", "ranks": "五世", "gender": 1, "childlist": [] }, { "id": 136, "pid": 132, "name": "得民", "ranks": "五世", "gender": 1, "childlist": [{ "id": 142, "pid": 136, "name": "显忠", "ranks": "六世", "gender": 1, "childlist": [{ "id": 144, "pid": 142, "name": "操", "ranks": "七世", "gender": 1, "childlist": [{ "id": 148, "pid": 144, "name": "无伪", "ranks": "八世", "gender": 1, "childlist": [{ "id": 151, "pid": 148, "name": "重光", "ranks": "九世", "gender": 1, "childlist": [] }, { "id": 150, "pid": 148, "name": "重华", "ranks": "九世", "gender": 1, "childlist": [] }] }] }] }, { "id": 141, "pid": 136, "name": "显孝", "ranks": "六世", "gender": 1, "childlist": [{ "id": 143, "pid": 141, "name": "树", "ranks": "七世", "gender": 1, "childlist": [{ "id": 147, "pid": 143, "name": "虎", "ranks": "八世", "gender": 1, "childlist": [] }, { "id": 146, "pid": 143, "name": "龙", "ranks": "八世", "gender": 1, "childlist": [] }, { "id": 145, "pid": 143, "name": "志", "ranks": "八世", "gender": 1, "childlist": [{ "id": 149, "pid": 145, "name": "懋修", "ranks": "九世", "gender": 1, "childlist": [] }] }] }] }] }] }, { "id": 131, "pid": 128, "name": "垒", "ranks": "四世", "gender": 1, "childlist": [{ "id": 135, "pid": 131, "name": "思恭", "ranks": "五世", "gender": 1, "childlist": [{ "id": 140, "pid": 135, "name": "栋", "ranks": "六世", "gender": 1, "childlist": [] }] }, { "id": 134, "pid": 131, "name": "思正", "ranks": "五世", "gender": 1, "childlist": [{ "id": 139, "pid": 134, "name": "梁", "ranks": "六世", "gender": 1, "childlist": [] }] }, { "id": 133, "pid": 131, "name": "思温", "ranks": "五世", "gender": 1, "childlist": [{ "id": 138, "pid": 133, "name": "柱", "ranks": "六世", "gender": 1, "childlist": [] }] }] }, { "id": 130, "pid": 128, "name": "生", "ranks": "四世", "gender": 1, "childlist": [] }] }, { "id": 127, "pid": 125, "name": "彦德", "ranks": "三世", "gender": 1, "childlist": [] }] }, { "id": 124, "pid": 123, "name": "贯", "ranks": "二世", "gender": 1, "childlist": [] }] }
    });
  };

  handleItemClick(item) {
    // 处理点击事件
  }

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
        >
          <TreeChartItem
            dataSource={familyTreeData}
            onItemClick={this.handleItemClick.bind(this)}
            bgColor="#F7F7F7"
            horizontalLineColor="#E7C48D"
            verticalLineColor="#E7C48D"
            childrenKey="childlist"
            // 自定义样式部分
            renderItem={item => (
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