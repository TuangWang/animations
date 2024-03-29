/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    PanResponder,
    Dimensions
} from 'react-native';

const SQUARE_DIMENSIONS = 100;

const {
    width,
    height
} = Dimensions.get('window');

const SPRING_CONFIG = {tension: 2, friction: 3}

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY()
        }
    }

    componentDidMount() {
        Animated.sequence([
            Animated.spring(this.state.pan, {
               ...SPRING_CONFIG,
               toValue: {x: 0, y: height - SQUARE_DIMENSIONS} //animate to bottom left
            }),
            Animated.spring(this.state.pan, {
                ...SPRING_CONFIG,
                toValue: {x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS} // animated to bottom right
            }),
            Animated.spring(this.state.pan, {
                ...SPRING_CONFIG,
                toValue: {x: width - SQUARE_DIMENSIONS, y: 0} //animate to top right
            }),
            Animated.spring(this.state.pan, {
                ...SPRING_CONFIG,
                toValue: {x: 0, y: 0} // return to start
            })
        ]).start()
    }


    getStyle(){
        return [
            styles.square,
            {
                transform: this.state.pan.getTranslateTransform()
            }
        ]
    }

    render(){
        return (
            <View style={styles.container}>
                <Animated.View
                    style={this.getStyle()}
                >
                </Animated.View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    square: {
        width: SQUARE_DIMENSIONS,
        height: SQUARE_DIMENSIONS,
        backgroundColor: 'blue'
    }
});

AppRegistry.registerComponent('Animations', () => Demo);
