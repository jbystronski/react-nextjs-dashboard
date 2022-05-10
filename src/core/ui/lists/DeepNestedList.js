import React, { useState, useEffect } from "react";

import { Collapse, List, ListItemButton, ListItemIcon } from "core/ui/_libs";
import { IconMapper } from "..";

import { usePrevious } from "core/hooks";

export default function DeepNestedList({
  nodes,
  listProps,
  listItemProps,
  expansionIndicatorProps,
  onClickCallback,
  getIcon
}) {
  const [nestedListIds, setNestedListIds] = useState([]);
  const prevListIds = usePrevious(prevListIds || nestedListIds);

  useEffect(() => {
    if (!nodes) return;

    function getNestedIds(nodes, container = {}) {
      nodes.map((n) => {
        if (n.hasOwnProperty("children") && n.children.length) {
          container[n.key] = false;

          return getNestedIds(n.children, container);
        }
      });

      return container;
    }
    const submenuIds = getNestedIds(nodes);
    setNestedListIds(submenuIds);
  }, [nodes]);

  const handleSublist = (key) => {
    setNestedListIds({ ...nestedListIds, [key]: !nestedListIds[key] });
  };

  const showExpandIcon = (key) => (
    <IconMapper
      icon={nestedListIds[key] ? "down" : "right"}
      {...expansionIndicatorProps}
    />
  );

  const hasChildren = (node) => {
    return node.hasOwnProperty("children") && node.children.length
      ? true
      : false;
  };

  const renderSublist = (key, nodes) => {
    return (
      <Collapse in={nestedListIds[key]} timeout="auto" unmountOnExit>
        {renderList(nodes)}
      </Collapse>
    );
  };

  const renderListItem = (node) => {
    return (
      <React.Fragment key={node.key}>
        <ListItemButton
          {...listItemProps}
          onClick={
            hasChildren(node)
              ? () => handleSublist(node.key, onClickCallback(node.key))
              : () => onClickCallback(node.key)
          }
        >
          {hasChildren(node) ? showExpandIcon(node.key) : null}
          <ListItemIcon>{getIcon(node.value)}</ListItemIcon>

          {node.value}
        </ListItemButton>
        {hasChildren(node) ? renderSublist(node.key, node.children) : null}
      </React.Fragment>
    );
  };

  const renderList = (nodes) => {
    return <List {...listProps}>{nodes.map((n) => renderListItem(n))}</List>;
  };

  return <>{renderList(nodes)}</>;
}
