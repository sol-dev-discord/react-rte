/* @flow */
// import ImageSpan from '../ui/ImageSpan';
import React from 'react';
import validator from 'validator';
import {ENTITY_TYPE} from 'draft-js-utils';

import type {ContentBlock, ContentState} from 'draft-js';

type EntityRangeCallback = (start: number, end: number) => void;

function Image(props: Props) {
  const {src} = props.contentState.getEntity(props.entityKey).getData();
  const isUrl = validator.isURL(src, { protocols: ['http','https'] });
  return (
    <span className='react-rte-imgWrap'>
      <a href={isUrl ? src : null} target={isUrl ? '_blank' : null}>
        <img src={isUrl ? src : 'unknown'} />
      </a>
      <span className='react-rte-imgContent'>{props.children}</span>
    </span>
  );
}

function findImageEntities(contentBlock: ContentBlock, callback: EntityRangeCallback, contentState: ?ContentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      let entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === ENTITY_TYPE.IMAGE;
    }
    return false;
  }, callback);
}

export default {
  strategy: findImageEntities,
  component: Image,
};
