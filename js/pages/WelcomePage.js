/**
 * Created by penn on 2016/12/14.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timer=setTimeout(()=> {
            this.props.navigator.resetTo({
                component: HomePage,
            });
        }, 2000);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.tips}>欢迎</Text>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    tips: {
        fontSize: 10,
    }
})
