/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

import Navigator from 'react-native-deprecated-custom-components';
import WelcomePage from './js/pages/WelcomePage';
import HomePage from "./js/pages/HomePage";
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{
                        component: HomePage
                    }}
                    renderScene={(route, navigator) => {
                        let Component=route.component;
                        return <Component {...route.params} navigator={navigator}/>
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 22,
        width: 22,
    }
});

/*import Navigator from './Navigator';
export default Navigator;*/
