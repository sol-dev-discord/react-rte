/* @flow */
import React from 'react';
import validator from 'validator';
import {ENTITY_TYPE} from 'draft-js-utils';

import type {ContentBlock, ContentState} from 'draft-js';

type Props = {
  children: ReactNode,
  entityKey: string,
  contentState: ContentState,
};

type EntityRangeCallback = (start: number, end: number) => void;

function Link(props: Props) {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  const isUrl = validator.isURL(url, { protocols: ['http','https'] });
  return (
    <a href={isUrl ? url : null} target={isUrl ? '_blank' : null}>{props.children}</a>
  );
}

function findLinkEntities(contentBlock: ContentBlock, callback: EntityRangeCallback, contentState: ?ContentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      let entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === ENTITY_TYPE.LINK;
    }
    return false;
  }, callback);
}

export default {
  strategy: findLinkEntities,
  component: Link,
};
