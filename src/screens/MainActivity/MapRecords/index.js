import React from 'react';
import {Animated, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import sheet from '../maps/styles/sheet';

import BaseExamplePropTypes from '../maps/common/BaseExamplePropTypes';
import Page from '../maps/common/Page';
import Bubble from '../maps/common/Bubble';
import { Actions } from 'react-native-router-flux';

MapboxGL.setAccessToken("pk.eyJ1IjoiYXJtbnVncmFoYSIsImEiOiJjanRkamVldTgwMmxrNDRxZmEwbHM1em94In0.nyNlO5m2AYIhz4JEm5vesQ");

const ANNOTATION_SIZE = 45;

const styles = StyleSheet.create({
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: ANNOTATION_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.45)',
  },
  annotationFill: {
    width: ANNOTATION_SIZE - 3,
    height: ANNOTATION_SIZE - 3,
    borderRadius: (ANNOTATION_SIZE - 3) / 2,
    backgroundColor: 'orange',
    transform: [{scale: 0.6}],
  },
});

class RecordModes extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,

      backgroundColor: 'blue',
      coordinates: [[107.745091, -6.893077]],
    };

    this._scaleIn = null;
    this._scaleOut = null;

    this.onPress = this.onPress.bind(this);
  }

  onPress(feature) {
    const coords = Object.assign([], this.state.coordinates);
    coords.push(feature.geometry.coordinates);
    this.setState({coordinates: coords});
  }

  onAnnotationSelected(activeIndex, feature) {
    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, {toValue: 1.0, duration: 200}).start();
    this.setState({activeAnnotationIndex: activeIndex});

    if (this.state.previousActiveAnnotationIndex !== -1) {
      this._map.moveTo(feature.geometry.coordinates, 500);
    }
  }

  onAnnotationDeselected(deselectedIndex) {
    const nextState = {};

    if (this.state.activeAnnotationIndex === deselectedIndex) {
      nextState.activeAnnotationIndex = -1;
    }

    this._scaleOut = new Animated.Value(1);
    Animated.timing(this._scaleOut, {toValue: 0.6, duration: 200}).start();
    nextState.previousActiveAnnotationIndex = deselectedIndex;
    this.setState(nextState);
  }

  renderAnnotations() {
    const items = [];

    for (let i = 0; i < this.state.coordinates.length; i++) {
      const coordinate = this.state.coordinates[i];
      const title = `Longitude: ${this.state.coordinates[i][0]} Latitude: ${
        this.state.coordinates[i][1]
      }`;
      const id = `pointAnnotation${i}`;

      const animationStyle = {};
      if (i === this.state.activeAnnotationIndex) {
        animationStyle.transform = [{scale: this._scaleIn}];
      } else if (i === this.state.previousActiveAnnotationIndex) {
        animationStyle.transform = [{scale: this._scaleOut}];
      }

      items.push(
        <MapboxGL.PointAnnotation
          key={id}
          id={id}
          title="Test"
          selected={i === 0}
          onSelected={feature => this.onAnnotationSelected(i, feature)}
          onDeselected={() => this.onAnnotationDeselected(i)}
          coordinate={coordinate}
        >
          <View style={styles.annotationContainer}>
            <Animated.View style={[styles.annotationFill, animationStyle]} />
          </View>

          <MapboxGL.Callout title={title} />
        </MapboxGL.PointAnnotation>,
      );
    }

    return items;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          ref={c => (this._map = c)}
          zoomLevel={16}
          onPress={this.onPress}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          centerCoordinate={this.state.coordinates[0]}
          style={sheet.matchParent}
          styleURL={MapboxGL.StyleURL.Outdoors}
        >
          {this.renderAnnotations()}
        </MapboxGL.MapView>

        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={{borderRadius: 50,
            position: 'absolute',
            bottom: 532,
            top:48,
            left: 16,
            width: 36,
            // paddingVertical: 16,
            height: 36,
            alignItems: 'center',
            alignSelf:"center",
            justifyContent: 'flex-start',
            backgroundColor: 'white',}}>
          
            <Text style={{position:"absolute",marginTop:8}}>X</Text>

        </TouchableOpacity>

      </View>
    );
  }
}

export default RecordModes;