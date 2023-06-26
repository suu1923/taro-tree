import React from 'react';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import './FamilyTree.scss';

const TreeChartItem = ({
  dataSource,
  isRoot,
  childrenKey,
  onItemClick,
  renderItem,
  itemMargin,
  bgColor,
  bgImage, // 未实现该方法
  horizontalLineColor,
  verticalLineColor,
}) => {
  const handleItemClick = (item) => {
    onItemClick(item);
  };

  /**
   * @desc 渲染子节点
   * @param {*} children 
   * @returns 
   */
  const renderChildren = (children) => {
    const hasMultipleChildren = children.length > 1;

    return children.map((item, index) => (
      <View className="children-super" key={item.id}>
        {/* 画线部分 */}
        {index === 0 && (
          <View
            className={hasMultipleChildren ? 'first-line' : 'first-line none-height'}
            style={{ backgroundColor: horizontalLineColor }}
          ></View>
        )}
        {index === children.length - 1 && (
          <View
            className={hasMultipleChildren ? 'last-line' : 'last-line none-width'}
            style={{ backgroundColor: horizontalLineColor }}
          ></View>
        )}
        {index !== 0 && index !== children.length - 1 && (
          <View className="item-none" style={{ backgroundColor: horizontalLineColor }}></View>
        )}
        <TreeChartItem
          dataSource={item}
          isRoot={false}
          childrenKey={childrenKey}
          onItemClick={handleItemClick}
          renderItem={renderItem}
          itemMargin={itemMargin}
          horizontalLineColor={horizontalLineColor}
          verticalLineColor={verticalLineColor}
        />
      </View>
    ));
  };

  return (
    <View className="tree-container" style={{ backgroundColor: bgColor }}>
      <View className="user-super-container">
        <View className="user-sons-container" style={{ paddingLeft: itemMargin, paddingRight: itemMargin }}>
          <View className="user-container">
            {!isRoot && <View className="root-line" style={{ backgroundColor: verticalLineColor }}></View>}
            <View className="user-info" onClick={() => handleItemClick(dataSource)}>
              {/* 渲染内容 */}
              {renderItem(dataSource)}
            </View>
            {dataSource[childrenKey]?.length > 1 && (
              <View className="root-line" style={{ backgroundColor: verticalLineColor }}></View>
            )}
          </View>
        </View>
      </View>
      {dataSource[childrenKey] && (
        <View className="children-container">
          {renderChildren(dataSource[childrenKey])}
        </View>
      )}
    </View>
  );
};

TreeChartItem.propTypes = {
  dataSource: PropTypes.object.isRequired,
  isRoot: PropTypes.bool,
  childrenKey: PropTypes.string,
  onItemClick: PropTypes.func,
  renderItem: PropTypes.func,
  itemMargin: PropTypes.string,
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  horizontalLineColor: PropTypes.string,
  verticalLineColor: PropTypes.string,
};

TreeChartItem.defaultProps = {
  isRoot: true,
  childrenKey: 'children',
  onItemClick: (item) => {
    console.log('点击了:', item);
  },
  renderItem: (dataSource) => {
    return (
      <View className="user-name">
        <View className="user-name-text">{dataSource.username}</View>
      </View>
    );
  },
  itemMargin: '150rpx',
  horizontalLineColor: '#000',
  verticalLineColor: '#000',
};

export default TreeChartItem;
