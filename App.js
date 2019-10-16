import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  StyleSheet,
  Switch,
  Text,
  View,
  findNodeHandle,
  Button,
  TextInput,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { BlurView } from '@react-native-community/blur';

const BLUR_TYPES = ['xlight', 'light', 'dark'];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showBlur: false,
      viewRef: null,
      activeSegment: 2,
      blurType: 'dark',
    };
  }

  imageLoaded() {
    // Workaround for a tricky race condition on initial load.
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.setState({ viewRef: findNodeHandle(this.refs.backgroundImage) });
      }, 500);
    });
  }

  _onChange(selected) {
    this.setState({
      activeSegment: selected,
      blurType: BLUR_TYPES[selected],
    });
  }

  componentDidMount(){
    this.imageLoaded();
  }

  renderBlurView() {
    const tintColor = ['#ffffff', '#000000'];
    if (this.state.blurType === 'xlight') {tintColor.reverse();}

    return (
      <View style={styles.container}>
        {this.state.viewRef && <BlurView
          viewRef={this.state.viewRef}
          style={styles.blurView}

          blurRadius={9}
          blurType={this.state.blurType}

          // The following props are also available on Android:

          // blurRadius={20}
          // downsampleFactor={10}
          // overlayColor={'rgba(0, 0, 255, .6)'}   // set a blue overlay
        />}

        {/*<SegmentedControlTab
          tintColor={tintColor}
          style={{
            width: Dimensions.get('window').width,
            height: 28,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          values={BLUR_TYPES}
          orientation="horizontal"
          selectedIndex={this.state.activeSegment}
          onTabPress={this._onChange.bind(this)} />*/}

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<Image
          source={require('./bgimage.jpeg')}
          style={styles.image}
          ref={'backgroundImage'}
          onLoadEnd={this.imageLoaded.bind(this)} />*/}


          <View>
          <TextInput
            ref={'backgroundImage'}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={'value'}
          />
          <TextInput
            ref={'backgroundImage'}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={'bruno1'}
          />
          </View>

        { this.state.showBlur ? this.renderBlurView() : null }

        {/*<View ref={'backgroundImage'}>
          <Text
            style={styles.image}
            onPress={this.imageLoaded.bind(this)}
          >
            bruno
          </Text>
          <Text onPress={this.imageLoaded.bind(this)}>skjdhdf</Text>
          <Button title={'submit'}>
              <Text>
               Button
             </Text>
           </Button>
        </View>*/}
        <View
          style={styles.blurToggle}>
          <Switch
            onValueChange={(value) => this.setState({showBlur: value})}
            value={this.state.showBlur} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    position: 'absolute',
    left: 90,
    top: 200,
    bottom: 0,
    right: 0,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  blurView: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  blurToggle: {
    position: 'absolute',
    top: 30,
    right: 10,
    alignItems: 'flex-end',
  },
});
