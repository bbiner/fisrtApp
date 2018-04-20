import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import Navigator from 'react-native-deprecated-custom-components';
import HomePage from './HomePage';
export default class WelcomePage extends Component {
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.props.navigator.resetTo({
                component:HomePage
            })
        }, 2000)
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer)
    }
    render(){
        return (
            <View>
                <Text style={styles.content}>
                    欢迎
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    }
});