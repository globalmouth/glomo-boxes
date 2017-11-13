import React, { Component } from 'react';
import PropType from 'prop-types';

import styles from './ShowcaseTileGroup.css';
import ShowcaseTile from './ShowcaseTile';

import { resize } from '../../utils/helpers';

const BREAKPOINT = 900;

export default class ShowcaseTileGroup extends Component {
   static propTypes = {
      tileItems: PropType.arrayOf(PropType.shape(ShowcaseTile.propTypes))
         .isRequired,
      style: PropType.shape({}),
      height: PropType.string,
   };

   constructor() {
      super();

      this.state = {
         isDesktop: window.innerWidth < BREAKPOINT ? false : true,
      };
   }

   componentDidMount() {
      resize.add(this.resize);
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({ isDesktop: true });
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({ isDesktop: false });
      }
      console.log('showcaseTileGroup resizing');
   };

   generateStyles = () => {
      const { isDesktop } = this.state;

      let style = {
         display: 'flex',
         flexDirection: 'column',
         height: parseInt(this.props.height) * 2,
      };

      if (isDesktop) {
         style = {
            ...style,
            flexDirection: 'row',
            height: this.props.height,
         };
      }

      return style;
   };

   render() {
      const { tileItems, style } = this.props;

      if (tileItems == null || tileItems.length < 0) {
         return;
      }

      let compStyles = this.generateStyles();

      return (
         <section
            style={{ ...compStyles, ...style }}
            className={styles['showcase-tile-group']}
            id="showcase-tile-group"
            ref={node => (this.showcaseTileGroup = node)}
         >
            {tileItems.map((item, index) => (
               <ShowcaseTile key={`tile-item-${index}`} {...item} />
            ))}
         </section>
      );
   }
}